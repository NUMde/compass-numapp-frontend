// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

import { theme } from '../../config';

let localStyle;

/***********************************************************************************************
component:
Renders a ListItem which will navigate to another screen when clicked on
***********************************************************************************************/
class AboutListLink extends PureComponent {
  /**
	* @param  {object}	props
	* @param  {object}	props.actions redux-actions of the currently active screen
	* @param  {object}  props.navigation the navigation object provided by 'react-navigation'
	* @param  {{
			title:string,
			subTitle: string,
			uri: string
		}}	props.webView holds the strings and the link to open in the webView
	*/

  // rendering
  /*-----------------------------------------------------------------------------------*/

  render() {
    const { actions, navigation, webView } = this.props;
    return (
      <ListItem
        containerStyle={localStyle.containerStyle}
        onPress={() => {
          actions.setCurrentWebView(webView);
          navigation.navigate('WebView');
        }}
      >
        {/* title & subtitle of the listItem - the strings a identified by the webView*/}
        <ListItem.Content>
          <ListItem.Title style={localStyle.title}>
            {webView.title}
          </ListItem.Title>

          {webView.subTitle && (
            <ListItem.Subtitle style={localStyle.subTitle}>
              {webView.subTitle}
            </ListItem.Subtitle>
          )}
        </ListItem.Content>

        {/* the icon on the right-hand-side */}
        <ListItem.Chevron
          {...{
            type: webView.iconType,
            name: webView.iconTitle,
            color: theme.values.ListLinkIconColor,
            reverse: true,
            size: 12,
          }}
        />
      </ListItem>
    );
  }
}

/***********************************************************************************************
local styling
***********************************************************************************************/

localStyle = StyleSheet.create({
  containerStyle: {
    width: '100%',
    borderBottomColor: theme.colors.accent3,
    borderBottomWidth: 1,
    backgroundColor: theme.values.ListLinkBackgroundColor,
  },

  subTitle: {
    color: theme.colors.accent4,
    ...theme.fonts.body,
  },

  title: {
    ...theme.fonts.title2,
  },
});

/***********************************************************************************************
export
***********************************************************************************************/

export default AboutListLink;
