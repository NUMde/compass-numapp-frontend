// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { PureComponent } from "react";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

import "../../typedef";
import config from "../../config/configProvider";

let localStyle;

/***********************************************************************************************
component:
renders a ListItem which will open the Modal (src/components/modal/redirectModal.js) when clicked on 
***********************************************************************************************/
class AboutListItem extends PureComponent {
  /**
	* @constructor
	* @param  {object}    props
	* @param  {object}  props.actions redux-actions of the 'about'-component
	* @param  {object}    props.navigation the navigation object provided by 'react-navigation'
	* @param  {object[]}  props.modalLink holds the current content information (defined by 
	  src/config/textConfig.js)
	* @param  {{
		title: string,
		subTitle: string,
		text: string,
		uri: string,
		iconTitle: string,
		iconType: string
	}}	props.modalLink holds the strings and the link to open in the webView
	*/

  // rendering
  /*-----------------------------------------------------------------------------------*/

  render() {
    const { actions, modalLink } = this.props;
    return (
      <ListItem
        containerStyle={localStyle.containerStyle}
        onPress={() => actions.showModal(modalLink)}
      >
        {/* title & subtitle of the listItem */}
        <ListItem.Content>
          <ListItem.Title style={localStyle.title}>
            {modalLink.title}
          </ListItem.Title>

          {modalLink.subTitle && (
            <ListItem.Subtitle style={localStyle.subTitle}>
              {modalLink.subTitle}
            </ListItem.Subtitle>
          )}
        </ListItem.Content>

        {/* the icon on the right-hand-side */}
        <ListItem.Chevron
          {...{
            type: modalLink.iconType,
            name: modalLink.iconTitle,
            color: config.theme.values.defaultListItemIconColor,
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
    backgroundColor: config.theme.values.defaultListItemBackgroundColor,
  },

  title: {
    ...config.theme.fonts.title2,
  },

  subTitle: {
    color: config.theme.colors.accent4,
    ...config.theme.fonts.body,
  },
});

/***********************************************************************************************
export
***********************************************************************************************/

export default AboutListItem;
