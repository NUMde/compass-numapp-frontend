// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import { Alert } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import messaging from '@react-native-firebase/messaging';
import store from '../../store';

import { loggedInClient } from '../../services/rest';
import localStorage from '../../services/localStorage';
import translate, { getLanguageTag } from '../../services/localization';
import documentCreator from '../../services/questionnaireAnalyzer';

import SurveyScreen from './surveyScreen';
import * as checkInActions from './checkInActions';
import CheckInScreen from './checkInScreen';
import config from '../../config/configProvider';

/***********************************************************************************************
component:
container for the login screen.
this container provides two screens: CheckInScreen and SurveyScreen - based on the current route.
those components therefor use the same actions and properties
***********************************************************************************************/

class CheckInContainer extends Component {
  // class events
  /*-----------------------------------------------------------------------------------*/

  /**
   * triggers the update of the user after mounting the checkIn-template
   */
  componentDidMount() {
    const { route } = this.props;
    if (route.name === 'CheckIn') {
      setTimeout(async () => {
        await this.updateUser();
        this.updateUserLanguage();
      }, 500);
    }
  }

  /**
   * re-routes to the checkIn-screen should no questionnaire be available after the
   * component updated. When there is no questionnaire the survey-screen does not has
   * any content to render
   */
  componentDidUpdate() {
    const { questionnaireItemMap, navigation } = this.props;
    setTimeout(() => {
      if (!questionnaireItemMap) navigation.navigate('CheckIn');
    }, 0);
  }

  // methods: push
  /*-----------------------------------------------------------------------------------*/

  /**
   * initializes the push-service-registration
   *
   * @param {string} subjectId
   */
  initPush = async (subjectId) => {
    const { actions } = this.props;

    // gets the current user
    const sessionData = store.getState().CheckIn.user;

    // gets the FCMToken that was persisted last time - if there was no
    // last time then the initial value is FALSE
    const FCMToken = await localStorage.loadFCMToken();

    // if there is a user and no FCMToken (or you just want to redo this over and over...)
    if (
      config.appConfig.reconnectOnEachUserUpdate ||
      (sessionData && (!FCMToken || !FCMToken.length))
    ) {
      // requests the permission and gets the token
      const authStatus = await messaging().requestPermission();
      const newlyGeneratedToken = await messaging().getToken();

      // if the authStatus checks out...
      if (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        // ... check if there is a new token
        if (newlyGeneratedToken !== FCMToken) {
          // redux output
          actions.setupPushServiceStart();

          // ...updates the device token
          await loggedInClient
            .updateDeviceToken(subjectId, newlyGeneratedToken)
            .then((response) => {
              // persists the response as new FCMToken.
              // this also contains the deviceId which prohibits the registration from
              // being triggered the next time
              localStorage.persistFCMToken(newlyGeneratedToken);

              // redux output
              actions.setupPushServiceSuccess(response, newlyGeneratedToken);
            })
            .catch((error) => {
              // logs out the error
              actions.setupPushServiceFail(error);
            });

          return;
        }

        // in case there is nothing to update
        actions.setupPushServiceNoUpdate(FCMToken);
      }
    }
  };

  // methods: procuring questionnaire
  /*-----------------------------------------------------------------------------------*/

  /**
   * tries to procure the current questionnaire
   */
  getQuestionnaire = async () => {
    const { actions, user } = this.props;
    let response;

    // redux output
    actions.getQuestionnaireStart();

    // gets the questionnaire with the correct id
    await loggedInClient
      .getBaseQuestionnaire(user.current_questionnaire_id, getLanguageTag())
      // success
      .then((resp) => {
        setTimeout(async () => {
          // persists the questionnaire
          actions.getQuestionnaireSuccess(resp.data || {});
        }, 0);

        response = resp.data;
      })
      // fail: displays an alert window with an error output and updates the state on button-click
      .catch((error) => {
        Alert.alert(
          translate('generic').errorTitle,
          translate('generic').sendError,
          [
            {
              text: translate('generic').ok,
              onPress: () => {
                actions.getQuestionnaireFail(error || 'n/a');
              },
            },
          ],
          { cancelable: false },
        );

        response = error;
      });

    return response;
  };

  // methods: updating user
  /*-----------------------------------------------------------------------------------*/

  /** transmits the currently chosen language settings of the user to the backend.
   * @param  {object} [userdata]
   */
  updateUserLanguage = async () => {
    const { actions, user } = this.props;
    if (user) {
      // redux output
      actions.updateLanguageStart();
      // sends the data
      await loggedInClient
        .updateLanguageCode(user.subjectId, getLanguageTag())
        .then(
          () => actions.updateLanguageSuccess(),
          (error) => this.updateLanguageFail(error),
        );
    }
  };

  // methods: updating user
  /*-----------------------------------------------------------------------------------*/

  /**
   * displays an alert-window after failing to update the user
   * @param  {object} error httperror
   */
  updateUserFail = (error) => {
    const { actions } = this.props;
    Alert.alert(
      translate('generic').info,
      translate('generic').updateError,
      [
        {
          text: translate('generic').ok,
          onPress: () => {
            actions.updateUserFail(error);
          },
        },
      ],
      { cancelable: false },
    );
  };

  /**
   * is executed after the user was successfully received from the server.
   * it triggers
   * @param {any} data
   */
  updateUserSuccess = async (data) => {
    const { user, actions } = this.props;
    const newData = data;

    newData.subjectId = data.subjectId || null;

    // procures the id of the questionnaire used by the last active user
    const lastQuestionnaireId = await localStorage.loadLastQuestionnaireId();

    // checks if the current due date is still not reached
    if (user && user.due_date && new Date(user.due_date) < new Date()) {
      // deletes the questionnaire if it is reached
      await actions.deleteLocalQuestionnaire();
    }
    // persists the new data
    actions.updateUserSuccess(newData);

    // tries to init the push service
    if (config.appConfig.connectToFCM) {
      setTimeout(() => this.initPush(newData.subjectId), 0);
    }

    // updates the chosen language settings of the user (backend-side)
    this.updateUserLanguage();

    setTimeout(async () => {
      const { noNewQuestionnaireAvailableYet } = this.props;
      // if we have locally persisted questionnaire
      if (lastQuestionnaireId && !noNewQuestionnaireAvailableYet) {
        // checks if the id of the persisted questionnaire matches the one of the
        // questionnaire the user is supposed to look at now
        const lastLang = await localStorage.loadLastQuestionnaireLanguage();
        if (
          config.appConfig.skipIncomingQuestionnaireCheck ||
          (lastQuestionnaireId === newData.current_questionnaire_id &&
            lastLang === getLanguageTag())
        ) {
          // loads the persisted questionnaire
          this.checkForCachedData();
        } else {
          // deletes the locally persisted questionnaire, as it does not matches
          // the one the user is supposed to look at
          setTimeout(() => {
            this.deleteLocalQuestionnaireData(
              lastLang !== getLanguageTag() ??
                translate('generic').wrongLanguageVersionDetected,
            );
          }, 0);
        }
      } else {
        // deletes the local questionnaire data if the data from the server shows
        // a due date that lies behind the current data
        if (newData.due_date && newData.due_date < new Date()) {
          this.deleteLocalQuestionnaireData();
        }
        // tries to procure a new questionnaire if possible
        if (!noNewQuestionnaireAvailableYet) {
          setTimeout(async () => {
            await this.getQuestionnaire();
          }, 0);
        } else {
          actions.removeLoadingScreen();
        }
      }
    }, 0);
  };

  /** updates the current user. if a userdata object is used with the function
   * it will just take that one and trigger updateUserSuccess() with it
   * @param  {object} [userdata]
   */
  updateUser = (userdata) => {
    const { actions } = this.props;
    // redux output
    actions.updateUserStart();

    if (userdata) {
      // skips the rest call
      this.updateUserSuccess(userdata);
    } else {
      // gets the user from the server
      loggedInClient.getUserUpdate().then(
        (res) => this.updateUserSuccess(res.data),
        (error) => this.updateUserFail(error),
      );
    }
  };

  // methods: cache data handling
  /*-----------------------------------------------------------------------------------*/

  /**
   * checks if a questionnaire and its answers might have been persisted in a previous
   * session. if so it will be loaded, if not a new one from the server procured
   */
  checkForCachedData = async () => {
    const { actions } = this.props;

    // gets the locally persisted questionnaireItemMap (if there is one)
    const map = await localStorage.loadQuestionnaireItemMap();
    // gets the locally persisted categories-set (if there is one)
    const list = await localStorage.loadCategories();

    // loads it as current questionnaire including answers (if both objects are present)
    if (map && list) {
      actions.loadLocalQuestionnaire(map, list);
    }
    // loads the current questionnaire from the server
    else {
      setTimeout(() => {
        this.getQuestionnaire();
      }, 250);
    }
  };

  /**
   * displays an alert and triggers the deletion of the local questionnaire
   */
  deleteLocalQuestionnaireData = async (message) => {
    const { actions } = this.props;
    setTimeout(() => {
      Alert.alert(
        translate('generic').info,
        message
          ? message + translate('generic').infoRemoval
          : translate('generic').infoRemoval,
        [
          {
            text: translate('generic').ok,
            onPress: async () => {
              await actions.deleteLocalQuestionnaire();

              setTimeout(() => {
                this.getQuestionnaire();
              }, 0);
            },
          },
        ],
        { cancelable: false },
      );
    }, 0);
  };

  // methods: export
  /*-----------------------------------------------------------------------------------*/

  /**
   * triggers the action to handle the failure of the export and shows an alert window
   * with an error message
   * @param  {object} error http error
   */
  exportAndUploadQuestionnaireResponseFail = (error) => {
    const { actions } = this.props;

    actions.sendQuestionnaireResponseFail(error);
    if (error.response.status === 409) {
      // deletes the locally persisted questionnaire, as it does not matches
      // the one the user is supposed to look at
      setTimeout(() => {
        this.deleteLocalQuestionnaireData(
          translate('generic').sendErrorTwoDevices,
        );
      }, 0);
    } else {
      setTimeout(() => {
        Alert.alert(
          translate('generic').errorTitle,
          translate('generic').sendError,
        );
      }, 0);
    }
  };

  /**
   * handles the export success, deletes the local questionnaire and then updates the user
   * @param  {object} response http response
   */
  exportAndUploadQuestionnaireResponseSuccess = async (response) => {
    const { actions } = this.props;
    actions.sendQuestionnaireResponseSuccess(response);
    actions.deleteLocalQuestionnaire();

    setTimeout(async () => {
      await this.updateUser(response.data);
    }, 0);

    setTimeout(() => {
      Alert.alert(
        translate('generic').successTitle,
        translate('generic').sendSuccess,
      );
    }, 0);
  };

  /**
   * creates the questionnaire-response and sends it out
   */
  exportAndUploadQuestionnaireResponseStart = async () => {
    const { actions, user, categories, questionnaireItemMap } = this.props;
    // redux output
    actions.sendQuestionnaireResponseStart();

    /** generates the response-json
     * @type {ExportData}
     */
    const exportData = documentCreator.createResponseJSON(
      questionnaireItemMap,
      categories,
    );

    // sends the questionnaire
    await loggedInClient
      .sendQuestionnaire(
        exportData.body,
        exportData.triggerMap,
        user.subjectId,
        user.current_questionnaire_id,
        user.current_instance_id,
      )
      .then(
        (response) =>
          this.exportAndUploadQuestionnaireResponseSuccess(response),
        (error) => this.exportAndUploadQuestionnaireResponseFail(error),
      );
  };

  /**
   * checks if the questionnaire was completed and if true triggers the export
   */
  exportAndUploadQuestionnaireResponse = () => {
    const { questionnaireItemMap } = this.props;

    // if the questionnaire was NOT completed
    if (questionnaireItemMap && !questionnaireItemMap.done) {
      // shows a message remembering the user to complete the questionnaire
      Alert.alert(
        translate('generic').info,
        translate('survey').sendUnfinishedMessageDenied,
        [
          {
            text: translate('generic').ok,
          },
        ],
        { cancelable: false },
      );
    }
    // shows a confirmation dialog if the questionnaire is completed.
    // triggers the call if confirmed
    else {
      Alert.alert(
        translate('generic').info,
        translate('survey').sendFinishedMessage,
        [
          {
            text: translate('survey').sendFinished,
            onPress: this.exportAndUploadQuestionnaireResponseStart,
          },
          {
            text: translate('generic').abort,
            style: 'cancel',
          },
        ],
        { cancelable: false },
      );
    }
  };

  // methods: special report
  /*-----------------------------------------------------------------------------------*/

  /**
   * handles the failure after sending a report
   * @param  {object} error http error
   */
  sendReportFail = (error) => {
    const { actions, navigation } = this.props;
    actions.sendReportFail(error);

    setTimeout(() => {
      Alert.alert(
        translate('generic').info,
        translate('generic').sendError,
        [
          {
            text: translate('generic').ok,
            onPress: () => {
              setTimeout(() => navigation.navigate('CheckIn'), 0);
            },
          },
        ],
        { cancelable: false },
      );
    }, 0);
  };

  /**
   * handles the success after sending a report
   * @param  {object} response http response
   */
  sendReportSuccess = (response) => {
    const { actions, navigation } = this.props;
    actions.sendReportSuccess(response);

    setTimeout(() => {
      Alert.alert(
        translate('reporting').symptoms_success_header,
        translate('reporting').symptoms_success_message,
        [
          {
            text: translate('reporting').symptoms_success_ok,
            onPress: () => {
              setTimeout(() => navigation.navigate('CheckIn'), 0);
              this.updateUser();
            },
          },
        ],
        { cancelable: false },
      );
    }, 0);
  };

  /**
   * just sends out the report
   */
  sendReportStart = () => {
    const { user, actions } = this.props;
    actions.sendReportStart();

    loggedInClient.sendReport(user.subjectId).then(
      (response) => this.sendReportSuccess(response),
      (error) => this.sendReportFail(error),
    );
  };

  /**
   * shows the user an alert window to confirm the action, then sends the report.
   * is only available if there is no current questionnaire available and if the user is not
   * already on a special iteration
   */
  sendReport = () => {
    const { user, noNewQuestionnaireAvailableYet } = this.props;
    // if the user is still on a special iteration
    if (user && user.additional_iterations_left) {
      // shows a dialog telling the user that he/she already send out a report
      Alert.alert(
        translate('generic').info,
        translate('generic').reportWhileInIteratedMode,
        [
          {
            text: translate('generic').ok,
          },
        ],
        { cancelable: false },
      );
    }
    // if there is a questionnaire available right now
    else if (!noNewQuestionnaireAvailableYet) {
      // dialog telling the user to use the current questionnaire
      Alert.alert(
        translate('generic').info,
        translate('generic').reportWhileQuestionnaire,
        [
          {
            text: translate('generic').ok,
          },
        ],
        { cancelable: false },
      );
    }
    // shows an alert and sends out the report
    else {
      Alert.alert(
        translate('reporting').symptoms_header,
        translate('reporting').symptoms_question,
        [
          {
            text: translate('reporting').symptoms_yes,
            onPress: () => {
              // sends out the report
              this.sendReportStart();
            },
          },
          {
            text: translate('reporting').symptoms_no,
            style: 'cancel',
          },
        ],
        { cancelable: false },
      );
    }
  };

  // support
  /*-----------------------------------------------------------------------------------*/

  /**
   * shows a confirmation-dialog. if confirmed, it deletes the local data, logs the user
   * out and navigates back to the landing-screen.
   */
  deleteLocalDataAndLogout = () => {
    const { actions, navigation } = this.props;
    Alert.alert(
      translate('generic').warning,
      translate('generic').eraseLocalDataAtEndOfStudyText,
      [
        {
          text: translate('generic').delete,
          onPress: () => {
            actions.deleteLocalData();

            setTimeout(() => {
              actions.logout();
              navigation.navigate('Landing');
            }, 0);
          },
        },
        {
          text: translate('generic').abort,
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };

  // rendering
  /*-----------------------------------------------------------------------------------*/

  /**
   * checks the current route name and renders the appropriate template
   */
  render() {
    const {
      actions,
      navigation,
      user,
      loading,
      categories,
      categoriesLoaded,
      currentPageIndex,
      currentCategoryIndex,
      questionnaireItemMap,
      error401,
      showDatePicker,
      questionnaireError,
      showQuestionnaireModal,
      noNewQuestionnaireAvailableYet,
      route,
    } = this.props;
    return route.name === 'CheckIn' ? (
      // if on CheckIn route
      <CheckInScreen
        navigation={navigation}
        loading={loading}
        categoriesLoaded={categoriesLoaded}
        error401={error401}
        questionnaireError={questionnaireError}
        user={user}
        noNewQuestionnaireAvailableYet={noNewQuestionnaireAvailableYet}
        questionnaireItemMap={questionnaireItemMap}
        getQuestionnaire={this.getQuestionnaire}
        deleteLocalDataAndLogout={this.deleteLocalDataAndLogout}
        exportAndUploadQuestionnaireResponse={
          this.exportAndUploadQuestionnaireResponse
        }
        sendReport={this.sendReport}
        updateUser={this.updateUser}
      />
    ) : (
      // if on Survey route
      <SurveyScreen
        navigation={navigation}
        actions={actions}
        user={user}
        categories={categories}
        currentPageIndex={currentPageIndex}
        currentCategoryIndex={currentCategoryIndex}
        showDatePicker={showDatePicker}
        questionnaireItemMap={questionnaireItemMap}
        showQuestionnaireModal={showQuestionnaireModal}
        exportAndUploadQuestionnaireResponse={
          this.exportAndUploadQuestionnaireResponse
        }
      />
    );
  }
}

/***********************************************************************************************
redux
***********************************************************************************************/

const mapStateToProps = (state) => state.CheckIn;

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(checkInActions, dispatch),
});

const ConnectedCheckIn = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckInContainer);

/***********************************************************************************************
export
***********************************************************************************************/

export { ConnectedCheckIn as CheckIn, CheckInContainer };
