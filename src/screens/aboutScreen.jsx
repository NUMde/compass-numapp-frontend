// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// components
import { Picker } from '@react-native-picker/picker';
import { ListItem } from 'react-native-elements';

// custom components
import {
  AboutListItem,
  AboutListLink,
  RedirectModal,
} from '../components/about';
import { Banner, Spinner, ScrollIndicatorWrapper } from '../components/shared';

// redux actions
import { reset } from '../store/sharedActions';
import { updateLanguage } from '../store/user.slice';

// services & config
import config from '../config/configProvider';
import kioskMode from '../config/kioskApiConfig';
import translate, {
  availableLanguages,
  getLanguageTag,
} from '../services/localization';
import { Routes, Stacks } from '../navigation/constants';

/***********************************************************************************************
 * component:
 * renders the about screen which contains information about the app as well as some links to
 * websites and the screen with legal information necessary in some regions
 *
 * @param  {object}    props
 * @param  {object}    props.navigation the navigation object provided by 'react-navigation'
 **********************************************************************************************/
function AboutScreen({ navigation }) {
  const dispatch = useDispatch();

  // internal state for the redirect modal
  const [modalState, setModalState] = useState({
    hidden: true,
    modalLink: null,
  });

  // get data from global state
  const started = useSelector((state) => state.Questionnaire.started);
  const subjectId = useSelector((state) => state.User.subjectId);
  const loading = useSelector((state) => state.Globals.loading);

  useEffect(() => {
    // got lo landing screen when reset was successful
    if (!subjectId) {
      navigation.navigate(Stacks.SIGNED_OUT, { screen: Routes.LANDING });
    }
  });

  /**
   * shows a confirmation-dialog. if confirmed, it deletes the local data, logs the user
   * out and navigates back to the landing-screen.
   */
  const clearAll = () => {
    Alert.alert(
      translate('generic').warning,
      translate('generic').eraseAllWarning,
      [
        {
          text: translate('generic').delete,
          onPress: () => {
            dispatch(reset());
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

  // handler for the 'change language' spinner/menu
  const changeLanguage = (languageTag) => {
    // in case some some questions of the current questionnaire have been answered,
    // warn the user that those answers will be lost when changing the language
    if (started) {
      Alert.alert(
        translate('generic').warning,
        translate('about').languageWarning +
          translate('about').languageWarningAddition,
        [
          {
            text: translate('generic').delete,
            onPress: () => {
              dispatch(updateLanguage({ languageTag, subjectId }));
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
      dispatch(updateLanguage({ languageTag, subjectId }));
    }
  };

  return loading ? (
    <Spinner />
  ) : (
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
        showModal={!modalState.hidden}
        modalLink={modalState.modalLink}
        hideModal={() => {
          setModalState({ hidden: true, modalLink: null });
        }}
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
                    onPress={() =>
                      navigation.navigate(Routes.LEGAL_INFORMATION)
                    }
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
                    showModal={() =>
                      setModalState({ hidden: false, modalLink })
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

                  {started && (
                    <Text style={localStyle.warningSubTitle}>
                      {translate('about').languageWarning}
                    </Text>
                  )}

                  <Picker
                    testID="languagePicker"
                    style={localStyle.picker}
                    mode="dropdown"
                    selectedValue={getLanguageTag()}
                    onValueChange={(itemValue) => {
                      if (getLanguageTag() !== itemValue) {
                        changeLanguage(itemValue);
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

                {/* delete-all-data button */}
                {(config.appConfig.showEraseAll || kioskMode.active) && (
                  <TouchableOpacity
                    style={localStyle.buttonAlert}
                    onPress={clearAll}
                    accessibilityLabel={translate('about').delete}
                    accessibilityRole={translate('accessibility').types.button}
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

/***********************************************************************************************
local styling
***********************************************************************************************/

const localStyle = StyleSheet.create({
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
export
***********************************************************************************************/

export default AboutScreen;
