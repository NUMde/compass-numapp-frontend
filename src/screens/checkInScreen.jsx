import React, { useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// custom components
import { Spinner, Banner, ScrollIndicatorWrapper } from '../components/shared';
import {
  CheckInWelcomeText,
  CheckInListView,
  CheckInTiles,
} from '../components/checkIn';

// redux actions
import { getLanguages } from '../store/globals.slice';
import { updateUser, updateFCMToken } from '../store/user.slice';
import { deleteQuestionnaire } from '../store/questionnaire.slice';
import { sendQuestionnaireResponse, sendReport } from '../store/sharedActions';

// services & config
import translate from '../services/localization';
import config from '../config/configProvider';
import exportService from '../services/questionnaireAnalyzer';

/***********************************************************************************************
 * component
 * renders the checkIn-screen, which is basically the core of the app
 * displays information about the current or next questionnaire
 * contains a banner element to navigate to the survey screen
 * as well buttons to send out the questionnaire or a special report
 *
 * @param  {object}    props
 * @param  {object}    props.navigation the navigation object provided by 'react-navigation'
 ***********************************************************************************************/
function CheckInScreen({ navigation }) {
  const dispatch = useDispatch();

  // get data from global state
  const { error, loading } = useSelector((state) => state.Globals);

  const {
    status,
    subjectId,
    certificate,
    firstTime,
    due_date,
    start_date,
    current_questionnaire_id,
    additional_iterations_left,
  } = useSelector((state) => state.User);

  const {
    itemMap,
    categories,
    FHIRmetadata: metadata,
  } = useSelector((state) => state.Questionnaire);

  // trigger user update when app is opened and user was logged in
  useEffect(() => {
    if (subjectId) {
      dispatch(updateUser(subjectId));
      if (config.appConfig.connectToFCM) {
        dispatch(updateFCMToken(subjectId));
      }
      dispatch(getLanguages());
    }
  }, [dispatch, subjectId]);

  // check if the currently persisted questionnaire is outdated
  // if so, alert user and delete data
  useEffect(() => {
    if (
      !!metadata &&
      current_questionnaire_id !== `${metadata.url}|${metadata.version}`
    ) {
      Alert.alert(
        translate('generic').info,
        translate('generic').infoRemoval,
        [
          {
            text: translate('generic').ok,
            onPress: () => dispatch(deleteQuestionnaire()),
          },
        ],
        { cancelable: false },
      );
    }
  }, [current_questionnaire_id, metadata, dispatch]);

  const noNewQuestionnaireAvailableYet = new Date() < new Date(start_date);
  const categoriesLoaded = categories && categories.length > 0;

  // check if at least one category of the questionnaire has been started
  const started = categories?.some(
    (category) => itemMap[category.linkId].started,
  );
  // check if all categories of the current questionnaire have been completed
  const done = categories?.every((category) => itemMap[category.linkId].done);

  // #################### event & button handlers ####################

  /**
   * handle submission of questionnaire response
   */
  const handleSubmit = () => {
    Alert.alert(
      translate('generic').info,
      translate('survey').sendFinishedMessage,
      [
        {
          text: translate('survey').sendFinished,
          onPress: () =>
            dispatch(
              sendQuestionnaireResponse({
                body: exportService.createResponseJSON(
                  itemMap,
                  categories,
                  metadata,
                ),
              }),
            ),
        },
        {
          text: translate('generic').abort,
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };

  /**
   * handle submission of special report
   */
  const handleReport = () => {
    if (subjectId && additional_iterations_left) {
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
    } else if (!noNewQuestionnaireAvailableYet) {
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
    } else {
      Alert.alert(
        translate('reporting').symptoms_header,
        translate('reporting').symptoms_question,
        [
          {
            text: translate('reporting').symptoms_yes,
            onPress: () => {
              // send out the report
              dispatch(sendReport({ subjectId, certificate }));
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

  return loading ? (
    <Spinner />
  ) : (
    <View style={localStyle.wrapper}>
      {/* banner at the top */}
      <Banner
        nav={navigation}
        title={translate('survey').titleCheckIn}
        subTitle={translate('survey').subTitleCheckIn}
        updateUser={() => dispatch(updateUser(subjectId))}
        isCheckIn
        noWayBack
        noRefresh={status === 'off-study'}
      />

      {/*  center content */}
      <View style={[localStyle.flexi, localStyle.wrapper]}>
        <ScrollIndicatorWrapper
          contentData={
            <View style={localStyle.wrapper}>
              {/* renders the listview item representing the questionnaire */}
              {!noNewQuestionnaireAvailableYet && status !== 'off-study' && (
                <CheckInListView
                  firstTime={firstTime}
                  navigation={navigation}
                  dueDate={due_date}
                  done={done}
                  started={started}
                />
              )}
              {/* welcome text with due-date information */}
              <CheckInWelcomeText
                error={error}
                status={status}
                noNewQuestionnaireAvailableYet={noNewQuestionnaireAvailableYet}
                firstTime={firstTime}
                dueDate={due_date}
                startDate={start_date}
                categoriesLoaded={categoriesLoaded}
              />
              {/* renders the button at the bottom */}
              {!error && (
                <CheckInTiles
                  done={done}
                  status={status}
                  iterationsLeft={additional_iterations_left}
                  categoriesLoaded={categoriesLoaded}
                  noNewQuestionnaireAvailableYet={
                    noNewQuestionnaireAvailableYet
                  }
                  sendReport={handleReport}
                  deleteLocalDataAndLogout={() => {
                    /* TODO */
                  }}
                  exportAndUploadQuestionnaireResponse={handleSubmit}
                />
              )}
            </View>
          }
        />
      </View>
    </View>
  );
}
/***********************************************************************************************
localStyle
***********************************************************************************************/

const localStyle = StyleSheet.create({
  wrapper: {
    height: '100%',
    flexDirection: 'column',
    backgroundColor: config.theme.values.defaultBackgroundColor,
  },

  flexi: {
    flex: 1,
  },
});

export default CheckInScreen;
