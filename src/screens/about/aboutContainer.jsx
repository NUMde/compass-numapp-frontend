// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import { Alert } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import RNRestart from 'react-native-restart';

import AboutScreen from './aboutScreen';
import WebViewScreen from './webViewScreen';
import LegalInformationScreen from './legalInformationScreen';
import translate, { setI18nConfig } from '../../services/localization';
import localStorage from '../../services/localStorage';
import * as aboutActions from './aboutActions';
import store from '../../store';

/***********************************************************************************************
component:
container for the about screen
***********************************************************************************************/

class AboutContainer extends Component {
  /**
   * @constructor
   * @param  {object}    props
   * @param  {object}    props.actions holds actions for the component (./aboutActions.js)
   */

  // class methods
  /*-----------------------------------------------------------------------------------*/

  /**
   * shows a confirmation-dialog. if confirmed, it deletes the local data, logs the user
   * out and navigates back to the landing-screen.
   */
  clearAll = () => {
    const { actions } = this.props;
    Alert.alert(
      translate('generic').warning,
      translate('generic').eraseAllWarning,
      [
        {
          text: translate('generic').delete,
          onPress: () => {
            actions.logout();
            actions.deleteLocalData();
            setTimeout(() => {
              RNRestart.Restart();
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

  /**
   * shows a confirmation-dialog. if confirmed, it logs the user
   * out and navigates back to the landing-screen.
   */
  logout = () => {
    const { actions } = this.props;
    Alert.alert(
      translate('generic').warning,
      translate('generic').logoutWarning,
      [
        {
          text: translate('generic').goBack,
          onPress: () => {
            actions.logout();
            setTimeout(() => {
              RNRestart.Restart();
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

  changeLanguage = (languageTag) => {
    if (
      store.getState().CheckIn.questionnaireItemMap &&
      store.getState().CheckIn.questionnaireItemMap.started
    ) {
      Alert.alert(
        translate('generic').warning,
        translate('about').languageWarning +
          translate('about').languageWarningAddition,
        [
          {
            text: translate('generic').delete,
            onPress: () => {
              // deletes the local questionnaire - which will trigger the app to download a new one in the correct language
              this.setLanguage(languageTag);
            },
          },
          {
            text: translate('generic').abort,
            style: 'cancel',
          },
        ],
        { cancelable: false },
      );
    } else {
      this.setLanguage(languageTag);
    }
  };

  setLanguage = (languageTag) => {
    const { actions } = this.props;
    if (store.getState().CheckIn.questionnaireItemMap) {
      actions.deleteLocalQuestionnaire();
    }
    setTimeout(async () => {
      setI18nConfig(languageTag);
      await localStorage.persistLocalizationSettings(
        languageTag,
        store.getState().Login.subjectId,
      );
      RNRestart.Restart();
    }, 0);
  };

  // events
  /*-----------------------------------------------------------------------------------*/

  render() {
    const { navigation, showModal, modalLink, actions, route } = this.props;
    // checks if the currently selected route equals 'About'
    if (route.name === 'About') {
      // then renders the About Screen
      return (
        <AboutScreen
          navigation={navigation}
          logout={this.logout}
          clearAll={this.clearAll}
          showModal={showModal}
          modalLink={modalLink}
          actions={actions}
          changeLanguage={this.changeLanguage}
        />
      );
    }
    // checks if the currently selected route equals 'LegalInformation'
    if (route.name === 'LegalInformation') {
      // then renders the LegalInformation Screen
      return <LegalInformationScreen navigation={navigation} />;
    }
    // if on WebView route
    return <WebViewScreen navigation={navigation} />;
  }
}

/***********************************************************************************************
redux
***********************************************************************************************/

// connects the redux-state with the local props and enables dispatching actions from it.
// updated properties are then available from the state. actions can be accessed through
// props.actions.

const mapStateToProps = (state) => state.About;

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(aboutActions, dispatch),
});

/***********************************************************************************************
export
***********************************************************************************************/

export default connect(mapStateToProps, mapDispatchToProps)(AboutContainer);
