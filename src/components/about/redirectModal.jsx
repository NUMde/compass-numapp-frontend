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

// components
import { Icon, Button } from 'react-native-elements';
import RNModal from 'react-native-modal';

// services & config
import config from '../../config/configProvider';
import translate from '../../services/localization';

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
                color={config.theme.colors.accent4}
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
              color={config.theme.colors.primary}
            />
          }
          testID="redirectBtn"
        />
        <View style={localStyle.modalPaginationButton} />
      </View>
    </RNModal>
  );
}

/***********************************************************************************************
local styling
***********************************************************************************************/

const localStyle = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    borderRadius: config.theme.values.defaultModalBorderRadius,
    borderColor: config.theme.colors.white,
    marginTop: 80,
  },
  content: {
    backgroundColor: config.theme.values.defaultModalContentBackgroundColor,
    paddingLeft: 20,
    paddingRight: 20,
    height: 'auto',
    maxHeight: '90%',
    borderTopLeftRadius: config.theme.values.defaultModalBorderRadius,
    borderTopRightRadius: config.theme.values.defaultModalBorderRadius,
    borderColor: config.theme.colors.white,
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
    backgroundColor: config.theme.values.defaultModalBottomBarBackgroundColor,
  },

  modalTitle: {
    fontSize: 24,
    marginBottom: 5,
    ...config.theme.fonts.title,
    color: config.theme.values.defaultModalTitleColor,
  },

  modalTitleWrapper: {
    borderBottomColor: config.theme.colors.white,
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
    ...config.theme.fonts.body,
    color: config.theme.values.defaultModalContentTextColor,
  },

  separator: {
    height: 1,
    backgroundColor: config.theme.values.defaultModalSeparatorBackgroundColor,
  },
});

/***********************************************************************************************
export
***********************************************************************************************/

export default RedirectModal;
