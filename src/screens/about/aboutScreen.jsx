// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import { ListItem } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import store from '../../store';
import config from '../../config/configProvider';
import Banner from '../../components/banner/banner';
import kioskMode from '../../config/kioskApiConfig';
import RedirectModal from '../../components/modal/redirectModal';
import AboutListItem from '../../components/about/aboutListItem';
import AboutListLink from '../../components/about/aboutListLink';
import localization from '../../services/localization/localization';
import ScrollIndicatorWrapper from '../../components/scrollIndicatorWrapper/scrollIndicatorWrapper';

let localStyle;

/***********************************************************************************************
Component
***********************************************************************************************/

class AboutScreen extends PureComponent {
  selectedLanguage = '';

  /**
   * renders the About-Screen
   * @constructor
   * @param  {object}    props
   * @param  {object}    props.navigation the navigation object provided by 'react-navigation'
   * @param  {function}  props.logout logs out the user
   * @param  {function}  props.clearAll deletes all local data
   * @param  {function}  props.changeLanguage updates the currentlyChosenLangugage
   */

  // rendering
  /*-----------------------------------------------------------------------------------*/

  render() {
    const {
      navigation,
      actions,
      clearAll,
      logout,
      showModal,
      modalLink,
      changeLanguage,
    } = this.props;
    return (
      <View style={localStyle.wrapper}>
        {/* top banner */}
        <Banner
          nav={navigation}
          title={localization.translate('about').title}
          subTitle={localization.translate('about').subTitle}
          noMenu
        />

        {/* the modal to be opened */}
        <RedirectModal
          showModal={showModal}
          modalLink={modalLink}
          actions={actions}
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
                          {localization.translate('about').legal.title}
                        </ListItem.Title>

                        <ListItem.Subtitle style={localStyle.subTitle}>
                          {localization.translate('about').legal.subTitle}
                        </ListItem.Subtitle>
                      </ListItem.Content>

                      {/* the icon on the right-hand-side */}
                      <ListItem.Chevron
                        {...{
                          type: localization.translate('about').legal.iconType,
                          name: localization.translate('about').legal.iconTitle,
                          color: config.theme.values.legalListLinkIconColor,
                          reverse: true,
                          size: 12,
                        }}
                      />
                    </ListItem>
                  )}

                  {/* iterates over all items in localization.translate('wevViews') */}
                  {localization.translate('webViews').map((webView) => (
                    // navigates to the webview screen
                    <AboutListLink
                      key={webView.title}
                      // {...this.props}
                      actions={actions}
                      navigation={navigation}
                      webView={webView}
                    />
                  ))}

                  {/* iterates over all items in localization.translate('modalLinks') */}
                  {localization.translate('modalLinks').map((_modalLink) => (
                    // navigates to the webview screen
                    <AboutListItem
                      actions={actions}
                      key={_modalLink.title}
                      modalLink={_modalLink}
                    />
                  ))}
                </View>

                {/* optional buttons on the bottom of the screen - JUST FOR DEVELOPMENT*/}
                <View style={localStyle.bottom}>
                  {/* language picker */}
                  <View style={localStyle.languagePickerWrapper}>
                    <Text style={localStyle.title}>
                      {localization.translate('about').languageSelection}
                    </Text>

                    {store.getState().CheckIn.questionnaireItemMap &&
                      store.getState().CheckIn.questionnaireItemMap.started && (
                        <Text style={localStyle.warningSubTitle}>
                          {localization.translate('about').languageWarning}
                        </Text>
                      )}

                    <Picker
                      style={localStyle.picker}
                      mode="dropdown"
                      selectedValue={localization.getLanguageTag()}
                      onValueChange={(itemValue) => {
                        if (localization.getLanguageTag() !== itemValue) {
                          changeLanguage(itemValue);
                        }
                      }}
                    >
                      {Object.keys(localization.availableLanguages).map(
                        (key) => (
                          <Picker.Item
                            key={key}
                            label={localization.availableLanguages[key].title}
                            value={key}
                          />
                        ),
                      )}
                    </Picker>
                  </View>

                  {/* logout button */}
                  {config.appConfig.showLogout && !kioskMode.active && (
                    <TouchableOpacity
                      style={localStyle.button}
                      onPress={logout}
                      accessibilityLabel={
                        localization.translate('about').logout
                      }
                      accessibilityRole={
                        localization.translate('accessibility').types.button
                      }
                      accessibilityHint={
                        localization.translate('accessibility').logoutHint
                      }
                    >
                      <Text style={localStyle.buttonLabel}>
                        {localization.translate('about').logout}
                      </Text>
                    </TouchableOpacity>
                  )}

                  {/* delete-all-data button */}
                  {(config.appConfig.showEraseAll || kioskMode.active) && (
                    <TouchableOpacity
                      style={localStyle.buttonAlert}
                      onPress={clearAll}
                      accessibilityLabel={
                        localization.translate('about').delete
                      }
                      accessibilityRole={
                        localization.translate('accessibility').types.button
                      }
                      accessibilityHint={
                        localization.translate('accessibility').logoutHint
                      }
                    >
                      <Text style={localStyle.buttonLabel}>
                        {kioskMode.active
                          ? localization.translate('about').demoDelete
                          : localization.translate('about').delete}
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

export default AboutScreen;
