// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React from 'react';
import { StyleSheet } from 'react-native';

// components
import { ListItem } from 'react-native-elements';

// config
import config from '../../config/configProvider';

/***********************************************************************************************
 * component:
 * renders a ListItem which will open the Modal (src/components/modal/redirectModal.js) when clicked on
 *
 * @param  {object}    props
 * @param  {function}  props.showModal callback to show the redirectModal
 * @param  {{
 *    title: string,
 *	  subTitle: string,
 * 	  text: string,
 *    uri: string,
 *	  iconTitle: string,
 *	  iconType: string
 *	}}	props.modalLink holds the strings and the link to open in the browser
 ***********************************************************************************************/
function AboutListItem({ showModal, modalLink }) {
  return (
    <ListItem
      containerStyle={localStyle.containerStyle}
      onPress={showModal}
      testID="aboutListItem"
    >
      {/* title & subtitle of the listItem */}
      <ListItem.Content>
        <ListItem.Title style={localStyle.title} testID="ALI_title">
          {modalLink.title}
        </ListItem.Title>

        {modalLink.subTitle && (
          <ListItem.Subtitle style={localStyle.subTitle} testID="ALI_subTitle">
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

/***********************************************************************************************
local styling
***********************************************************************************************/

const localStyle = StyleSheet.create({
  containerStyle: {
    width: '100%',
    borderBottomColor: config.theme.colors.accent3,
    borderBottomWidth: 1,
    backgroundColor: config.theme.values.defaultListItemBackgroundColor,
    padding: 15,
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
