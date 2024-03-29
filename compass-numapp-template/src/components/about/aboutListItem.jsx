// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { modalLinkPropType } from '~propTypes';

// components
import { ListItem } from 'react-native-elements';

// config
import { theme } from '~config';

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
          color: theme.values.defaultListItemIconColor,
          reverse: true,
          size: 12,
        }}
      />
    </ListItem>
  );
}

AboutListItem.propTypes = {
  showModal: PropTypes.func.isRequired,
  modalLink: PropTypes.shape(modalLinkPropType),
};

AboutListItem.defaultProps = {
  modalLink: null,
};

/***********************************************************************************************
local styling
***********************************************************************************************/

const localStyle = StyleSheet.create({
  containerStyle: {
    width: '100%',
    borderBottomColor: theme.colors.accent3,
    borderBottomWidth: 1,
    backgroundColor: theme.values.defaultListItemBackgroundColor,
    padding: 15,
  },

  title: {
    ...theme.fonts.title2,
  },

  subTitle: {
    color: theme.colors.accent4,
    ...theme.fonts.body,
  },
});

/***********************************************************************************************
export
***********************************************************************************************/

export default AboutListItem;
