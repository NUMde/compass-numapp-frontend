// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import { ListItem } from 'react-native-elements';
import RedirectModal from '../../components/modal/redirectModal';
import Banner from '../../components/banner/banner';
import AboutListItem from '../../components/about/aboutListItem';
import AboutListLink from '../../components/about/aboutListLink';
import ScrollIndicatorWrapper from '../../components/scrollIndicatorWrapper/scrollIndicatorWrapper';

import { appConfig, theme, strings } from '../../config';

let localStyle;

/***********************************************************************************************
Component
***********************************************************************************************/

class AboutScreen extends PureComponent {
  /**
   * renders the About-Screen
   * @constructor
   * @param  {object}    props
   * @param  {object}    props.navigation the navigation object provided by 'react-navigation'
   * @param  {function}  props.logout logs out the user
   * @param  {function}  props.clearAll deletes all local data
   */

  // rendering
  /*-----------------------------------------------------------------------------------*/

  render() {
    const { navigation, actions, clearAll, logout, showModal, modalLink } =
      this.props;
    return (
      <View style={localStyle.wrapper}>
        {/* top banner */}
        <Banner
          nav={navigation}
          title={strings.about.title}
          subTitle={strings.about.subTitle}
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
                  {appConfig.allowAccessToLegalInformationScreen && (
                    <ListItem
                      containerStyle={localStyle.containerStyle}
                      onPress={() => navigation.navigate('LegalInformation')}
                    >
                      {/* title & subtitle of the listItem - the strings a identified by the webView*/}
                      <ListItem.Content>
                        <ListItem.Title style={localStyle.title}>
                          {strings.about.legal.title}
                        </ListItem.Title>

                        <ListItem.Subtitle style={localStyle.subTitle}>
                          {strings.about.legal.subTitle}
                        </ListItem.Subtitle>
                      </ListItem.Content>

                      {/* the icon on the right-hand-side */}
                      <ListItem.Chevron
                        {...{
                          type: strings.about.legal.iconType,
                          name: strings.about.legal.iconTitle,
                          color: theme.values.legalListLinkIconColor,
                          reverse: true,
                          size: 12,
                        }}
                      />

                      {/* the icon on the right-hand-side */}
                    </ListItem>
                  )}

                  {/* iterates over all items in strings.wevViews */}
                  {strings.webViews.map((webView) => (
                    // navigates to the webview screen
                    <AboutListLink
                      key={webView.title}
                      // {...this.props}
                      actions={actions}
                      navigation={navigation}
                      webView={webView}
                    />
                  ))}

                  {/* iterates over all items in strings.modalLinks */}
                  {strings.modalLinks.map((_modalLink) => (
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
                  {/* logout button */}
                  {appConfig.showLogout && (
                    <TouchableOpacity
                      style={localStyle.button}
                      onPress={logout}
                      accessibilityLabel={strings.about.logout}
                      accessibilityRole={strings.accessibility.types.button}
                      accessibilityHint={strings.accessibility.logoutHint}
                    >
                      <Text style={localStyle.buttonLabel}>
                        {strings.about.logout}
                      </Text>
                    </TouchableOpacity>
                  )}

                  {/* delete-all-data button */}
                  {appConfig.showEraseAll && (
                    <TouchableOpacity
                      style={localStyle.buttonAlert}
                      onPress={clearAll}
                      accessibilityLabel={strings.about.delete}
                      accessibilityRole={strings.accessibility.types.button}
                      accessibilityHint={strings.accessibility.logoutHint}
                    >
                      <Text style={localStyle.buttonLabel}>
                        {strings.about.delete}
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
    backgroundColor: theme.values.defaultBackgroundColor,
  },

  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
    height: '100%',
    marginTop: 20,
    width: '80%',
  },

  button: {
    ...theme.classes.buttonPrimary,
    bottom: 0,
    marginTop: 10,
  },

  buttonAlert: {
    ...theme.classes.buttonAlert,
    bottom: 0,
    marginTop: 10,
  },

  buttonLabel: {
    ...theme.classes.buttonLabel,
  },

  containerStyle: {
    width: '100%',
    borderBottomColor: theme.colors.accent3,
    borderBottomWidth: 1,
    backgroundColor: theme.values.defaultListLinkBackgroundColor,
  },

  subTitle: {
    color: theme.colors.accent4,
    ...theme.fonts.body,
  },

  title: {
    ...theme.fonts.title2,
  },
});

export default AboutScreen;
