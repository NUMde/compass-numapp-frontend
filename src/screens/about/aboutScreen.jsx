// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import { Picker } from '@react-native-picker/picker';
import React, { Component } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import RNRestart from 'react-native-restart';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  AboutListItem,
  AboutListLink,
  RedirectModal,
} from '../../components/about';
import { Banner, ScrollIndicatorWrapper } from '../../components/shared';
import config from '../../config/configProvider';
import kioskMode from '../../config/kioskApiConfig';
import translate, {
  availableLanguages,
  getLanguageTag,
  setI18nConfig,
} from '../../services/localization';
import localStorage from '../../services/localStorage';
import store from '../../store';
import * as aboutActions from './aboutActions';

let localStyle;

/***********************************************************************************************
component:
container for the about screen
***********************************************************************************************/

class AboutScreen extends Component {
  /**
   * @constructor
   * @param  {object}    props
   * @param  {object}    props.actions holds actions for the component (./aboutActions.js)
   */
  constructor(props) {
    super(props);
    this.state = { showRedirectModal: false, modalLink: '' };
  }

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
            RNRestart.Restart();
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
    const { navigation, actions } = this.props;
    const { showRedirectModal, modalLink } = this.state;
    // checks if the currently selected route equals 'About'
    // then renders the About Screen
    return (
      <View style={localStyle.wrapper}>
        {/* top banner */}
        <Banner
          nav={navigation}
          title={translate('about').title}
          subTitle={translate('about').subTitle}
          noMenu
        />

        {/* the modal to be opened */}
        <RedirectModal
          showModal={showRedirectModal}
          modalLink={modalLink}
          actions={actions}
          hideModal={(state) =>
            this.setState({
              ...state,
              showRedirectModal: false,
              modalLink: '',
            })
          }
        />

        {/* ScrollView with content */}
        <View style={localStyle.wrapper}>
          <ScrollIndicatorWrapper
            contentData={
              <View style={localStyle.wrapper}>
                {/* holds the list-items */}
                <View style={localStyle.wrapper}>
                  {/* links to the LegalInformationScreen */}
                  {config.appConfig.allowAccessToLegalInformationScreen && (
                    <ListItem
                      containerStyle={localStyle.containerStyle}
                      onPress={() => navigation.navigate('LegalInformation')}
                    >
                      {/* title & subtitle of the listItem - the strings a identified by the webView*/}
                      <ListItem.Content>
                        <ListItem.Title style={localStyle.title}>
                          {translate('about').legal.title}
                        </ListItem.Title>

                        <ListItem.Subtitle style={localStyle.subTitle}>
                          {translate('about').legal.subTitle}
                        </ListItem.Subtitle>
                      </ListItem.Content>

                      {/* the icon on the right-hand-side */}
                      <ListItem.Chevron
                        {...{
                          type: translate('about').legal.iconType,
                          name: translate('about').legal.iconTitle,
                          color: config.theme.values.legalListLinkIconColor,
                          reverse: true,
                          size: 12,
                        }}
                      />
                    </ListItem>
                  )}

                  {/* iterates over all items in translate('wevViews') */}
                  {translate('webViews').map((webView) => (
                    // navigates to the webview screen
                    <AboutListLink
                      key={webView.title}
                      navigation={navigation}
                      webView={webView}
                    />
                  ))}

                  {/* iterates over all items in translate('modalLinks') */}
                  {translate('modalLinks').map((modalLink) => (
                    // navigates to the webview screen
                    <AboutListItem
                      showModal={(state) =>
                        this.setState({
                          ...state,
                          showRedirectModal: true,
                          modalLink,
                        })
                      }
                      key={modalLink.title}
                      modalLink={modalLink}
                    />
                  ))}
                </View>

                {/* optional buttons on the bottom of the screen - JUST FOR DEVELOPMENT*/}
                <View style={localStyle.bottom}>
                  {/* language picker */}
                  <View style={localStyle.languagePickerWrapper}>
                    <Text style={localStyle.title}>
                      {translate('about').languageSelection}
                    </Text>

                    {store.getState().CheckIn.questionnaireItemMap &&
                      store.getState().CheckIn.questionnaireItemMap.started && (
                        <Text style={localStyle.warningSubTitle}>
                          {translate('about').languageWarning}
                        </Text>
                      )}

                    <Picker
                      style={localStyle.picker}
                      mode="dropdown"
                      selectedValue={getLanguageTag()}
                      onValueChange={(itemValue) => {
                        if (getLanguageTag() !== itemValue) {
                          this.changeLanguage(itemValue);
                        }
                      }}
                    >
                      {Object.keys(availableLanguages).map((key) => (
                        <Picker.Item
                          key={key}
                          label={availableLanguages[key].title}
                          value={key}
                        />
                      ))}
                    </Picker>
                  </View>

                  {/* logout button */}
                  {config.appConfig.showLogout && !kioskMode.active && (
                    <TouchableOpacity
                      style={localStyle.button}
                      onPress={this.logout}
                      accessibilityLabel={translate('about').logout}
                      accessibilityRole={
                        translate('accessibility').types.button
                      }
                      accessibilityHint={translate('accessibility').logoutHint}
                    >
                      <Text style={localStyle.buttonLabel}>
                        {translate('about').logout}
                      </Text>
                    </TouchableOpacity>
                  )}

                  {/* delete-all-data button */}
                  {(config.appConfig.showEraseAll || kioskMode.active) && (
                    <TouchableOpacity
                      style={localStyle.buttonAlert}
                      onPress={this.clearAll}
                      accessibilityLabel={translate('about').delete}
                      accessibilityRole={
                        translate('accessibility').types.button
                      }
                      accessibilityHint={translate('accessibility').logoutHint}
                    >
                      <Text style={localStyle.buttonLabel}>
                        {kioskMode.active
                          ? translate('about').demoDelete
                          : translate('about').delete}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            }
          />
        </View>
      </View>
    );
  }
}

/***********************************************************************************************
local styling
***********************************************************************************************/

localStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: config.theme.colors.accent0,
  },

  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
    height: '100%',
    marginTop: 5,
    width: '100%',
    padding: 15,
  },

  button: {
    ...config.theme.classes.buttonPrimary,
    bottom: 0,
    marginTop: 10,
  },

  buttonAlert: {
    ...config.theme.classes.buttonAlert,
    bottom: 0,
    marginTop: 20,
  },

  buttonLabel: {
    ...config.theme.classes.buttonLabel,
  },

  containerStyle: {
    width: '100%',
    borderBottomColor: config.theme.colors.accent3,
    borderBottomWidth: 1,
    backgroundColor: config.theme.values.defaultListLinkBackgroundColor,
    padding: 15,
  },

  subTitle: {
    color: config.theme.colors.accent4,
    ...config.theme.fonts.body,
  },

  warningSubTitle: {
    color: config.theme.colors.alert,
    ...config.theme.fonts.body,
  },

  title: {
    ...config.theme.fonts.title2,
  },

  titleText: {
    width: '80%',
    textAlign: 'center',
    alignSelf: 'center',
    ...config.theme.fonts.header2,
  },

  languagePickerWrapper: {
    borderWidth: 3,
    borderColor: config.theme.colors.white,
    borderRadius: 4,
    padding: 10,
  },
});

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

export default connect(mapStateToProps, mapDispatchToProps)(AboutScreen);
