// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { PureComponent } from "react";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

import config from "../../config/configProvider";

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
          navigation.navigate("WebView");
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
            color: config.theme.values.defaultListLinkIconColor,
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
    width: "100%",
    borderBottomColor: config.theme.colors.accent3,
    borderBottomWidth: 1,
    backgroundColor: config.theme.values.defaultListLinkBackgroundColor,
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
