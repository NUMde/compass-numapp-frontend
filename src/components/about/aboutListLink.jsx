// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React from 'react';
import { StyleSheet } from 'react-native';

// components
import { ListItem } from 'react-native-elements';

// config
import config from '~config/configProvider';
import { Routes } from '~navigation/constants';

/***********************************************************************************************
 * component:
 * Renders a ListItem which will navigate to another screen when clicked on
 *
 * @param  {object}	props
 * @param  {object} props.navigation the navigation object provided by 'react-navigation'
 * @param  {{
 *			title:string,
 *			subTitle: string,
 *      iconType: string,
 *      iconTitle: string,
 *			uri: string
 * }}	props.webView holds the strings and the link to open in the webView
 ***********************************************************************************************/
function AboutListLink({ navigation, webView }) {
  return (
    <ListItem
      containerStyle={localStyle.containerStyle}
      onPress={() => {
        navigation.navigate(Routes.WEBVIEW, { ...webView });
      }}
      testID="aboutListLink"
    >
      {/* title & subtitle of the listItem - the strings a identified by the webView*/}
      <ListItem.Content>
        <ListItem.Title style={localStyle.title} testID="ALL_title">
          {webView.title}
        </ListItem.Title>

        {webView.subTitle && (
          <ListItem.Subtitle style={localStyle.subTitle} testID="ALL_subTitle">
            {webView.subTitle}
          </ListItem.Subtitle>
        )}
      </ListItem.Content>

      {/* the icon on the right-hand-side */}
      <ListItem.Chevron
        {...{
          type: webView.iconType,
          name: webView.iconTitle,
          color: config.theme.values.defaultListLinkIconColor,
          reverse: true,
          size: 12,
        }}
      />
    </ListItem>
  );
}

/***********************************************************************************************
local styling
***********************************************************************************************/

const localStyle = StyleSheet.create({
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

  title: {
    ...config.theme.fonts.title2,
  },
});

/***********************************************************************************************
export
***********************************************************************************************/

export default AboutListLink;
