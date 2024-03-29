// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React from 'react';
import {
  TouchableOpacity,
  Linking,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { modalLinkPropType } from '~propTypes';

// components
import { Icon, Button } from 'react-native-elements';
import RNModal from 'react-native-modal';

// services & config
import { theme } from '~config';
import translate from '~services/localization';

/***********************************************************************************************
 * component:
 * generates a modal-view which redirects the user to his/her browser and opens up a uri provided
 * by the property "modalLink"
 *
 * @param  {object}	props
 * @param  {function}	props.hideModal callback ti dismissing the modal
 * @param  {boolean}	props.showModal if true the modal will be rendered
 * @param  {{
 *	title: string,
 *	text: string,
 *	uri: string,
 *  }}	props.modalLink holds the strings and the link to open in the webView
 **********************************************************************************************/
function RedirectModal({ showModal, hideModal, modalLink }) {
  return (
    <RNModal
      avoidKeyboard
      scrollOffsetMax={50}
      style={localStyle.modal}
      isVisible={showModal}
      onBackdropPress={hideModal}
      onSwipeComplete={hideModal}
      onBackButtonPress={hideModal}
      testID="redirectModal"
    >
      {/* content of the modal */}
      <View style={localStyle.content}>
        {/* renders a title and an example text */}
        <View style={localStyle.modalViewWrapper}>
          <View style={localStyle.modalTitleWrapper}>
            <Text style={localStyle.modalTitle} testID="RM_title">
              {modalLink?.title}
            </Text>
            {/* button to close the modal */}
            <TouchableOpacity
              style={localStyle.closeButton}
              onPress={hideModal}
              accessibilityRole={translate('accessibility').types.button}
              accessibilityLabel={translate('accessibility').close}
              accessibilityHint={translate('accessibility').closeHint}
            >
              <Icon
                name="close"
                type="material-community"
                color={theme.colors.accent4}
                accessible={false}
              />
            </TouchableOpacity>
          </View>
          <Text style={localStyle.welcomeText} testID="RM_text">
            {modalLink?.text}
          </Text>
        </View>
      </View>

      {/* separator between content and bottom-bar */}
      <View style={localStyle.separator} />

      {/* the navigation bar at the bottom of the modal */}
      <View style={localStyle.bottomBarWrapper}>
        <View style={localStyle.modalPaginationButton} />

        <Button
          type="clear"
          accessibilityLabel={translate('accessibility').accept}
          accessibilityRole={translate('accessibility').types.button}
          accessibilityHint={translate('accessibility').acceptHint}
          onPress={() => {
            Linking.openURL(modalLink.uri);
            hideModal();
          }}
          icon={
            <Icon
              name="check"
              reverse
              type="material-community"
              color={theme.colors.primary}
            />
          }
          testID="redirectBtn"
        />
        <View style={localStyle.modalPaginationButton} />
      </View>
    </RNModal>
  );
}

RedirectModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
  modalLink: PropTypes.shape(modalLinkPropType),
};

RedirectModal.defaultProps = { modalLink: null };

/***********************************************************************************************
local styling
***********************************************************************************************/

const localStyle = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    borderRadius: theme.values.defaultModalBorderRadius,
    borderColor: theme.colors.white,
    marginTop: 80,
  },
  content: {
    backgroundColor: theme.values.defaultModalContentBackgroundColor,
    paddingLeft: 20,
    paddingRight: 20,
    height: 'auto',
    maxHeight: '90%',
    borderTopLeftRadius: theme.values.defaultModalBorderRadius,
    borderTopRightRadius: theme.values.defaultModalBorderRadius,
    borderColor: theme.colors.white,
  },

  modalViewWrapper: {
    paddingTop: 20,
    paddingBottom: 20,
  },

  bottomBarWrapper: {
    flexWrap: 'nowrap',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.values.defaultModalBottomBarBackgroundColor,
  },

  modalTitle: {
    fontSize: 24,
    marginBottom: 5,
    ...theme.fonts.title,
    color: theme.values.defaultModalTitleColor,
  },

  modalTitleWrapper: {
    borderBottomColor: theme.colors.white,
    borderBottomWidth: 1,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  modalPaginationButton: {
    width: 44,
    height: 'auto',
    margin: 10,
  },

  welcomeText: {
    ...theme.fonts.body,
    color: theme.values.defaultModalContentTextColor,
  },

  separator: {
    height: 1,
    backgroundColor: theme.values.defaultModalSeparatorBackgroundColor,
  },
});

/***********************************************************************************************
export
***********************************************************************************************/

export default RedirectModal;
