// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import RNModal from "react-native-modal";
import React, { Component } from "react";
import { Icon, Button } from "react-native-elements";
import {
  AccessibilityInfo,
  Linking,
  Text,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";

import config from "../../config/configProvider";

let localStyle;

/***********************************************************************************************
component:
generates a modal-view which redirects the user to his/her browser and opens up a uri provided
by the property "modalLink"
***********************************************************************************************/

class RedirectModal extends Component {
  // public members
  /*-----------------------------------------------------------------------------------*/

  /**
   * reference for the scrollView component
   * @type {object}
   */
  scrollViewRef;

  /**
   * holds the current y-offset of the scrollView
   * @type {number}
   */
  scrollOffset;

  /**
   * tells us if the screen reader is enabled
   * @type {boolean}
   */
  isAccessibilityOn = false;

  /**
	* @constructor
	* @param  {object}	props
	* @param  {object}	props.actions redux-actions of the currently active screen
	* @param  {boolean}	props.showModal if true the modal will be rendered
	* @param  {{
		title: string,
		subTitle: string,
		text: string,
		uri: string,
		iconTitle: string,
		iconType: string
    }}	props.modalLink holds the strings and the link to open in the webView
	*/
  constructor(props) {
    super(props);
    this.scrollViewRef = React.createRef();
    this.scrollOffset = 0;

    // check if accessibility-features are enabled
    AccessibilityInfo.isScreenReaderEnabled().then((screenReaderEnabled) => {
      this.isAccessibilityOn = screenReaderEnabled;
    });
  }

  // rendering
  /*-----------------------------------------------------------------------------------*/

  /**
   * renders a modal that redirects the user to his/her webbrowser and opens a website
   * defined
   */
  render = () => {
    const { actions, showModal, modalLink } = this.props;
    return (
      <RNModal
        avoidKeyboard
        scrollOffsetMax={50}
        style={localStyle.modal}
        scrollTo={this.handleScrollTo}
        scrollOffset={this.scrollOffset}
        isVisible={showModal}
        onBackdropPress={actions.hideModal}
        onSwipeComplete={actions.hideModal}
        onBackButtonPress={actions.hideModal}
      >
        {/* content of the modal */}
        <View style={localStyle.content}>
          <ScrollView
            ref={this.scrollViewRef}
            onScroll={this.handleOnScroll}
            scrollEventThrottle={16}
          >
            {/* renders a title and an example text */}
            <View style={localStyle.modalViewWrapper}>
              <View style={localStyle.modalTitleWrapper}>
                <Text style={localStyle.modalTitle}>{modalLink.title}</Text>
              </View>
              <Text style={localStyle.welcomeText}>{modalLink.text}</Text>
            </View>
          </ScrollView>
        </View>

        {/* separator between content and bottom-bar */}
        <View style={localStyle.separator} />

        {/* the navigation bar at the bottom of the modal */}
        <View style={localStyle.bottomBarWrapper}>
          <View style={localStyle.modalPaginationButton} />

          <Button
            type="clear"
            accessibilityLabel={config.text.accessibility.accept}
            accessibilityRole={config.text.accessibility.types.button}
            accessibilityHint={config.text.accessibility.acceptHint}
            onPress={() => {
              Linking.openURL(modalLink.uri);
              actions.hideModal();
            }}
            icon={
              <Icon
                name="check"
                reverse
                type="material-community"
                color={config.theme.colors.primary}
              />
            }
          />

          {this.isAccessibilityOn && (
            <Button
              type="clear"
              accessibilityLabel={config.text.accessibility.cancel}
              accessibilityRole={config.text.accessibility.types.button}
              accessibilityHint={config.text.accessibility.closeHint}
              onPress={() => {
                actions.hideModal();
              }}
              icon={
                <Icon
                  name="close"
                  reverse
                  type="material-community"
                  color={config.theme.colors.primary}
                />
              }
            />
          )}
          <View style={localStyle.modalPaginationButton} />
        </View>
      </RNModal>
    );
  };

  // modal events
  /*-----------------------------------------------------------------------------------*/

  /**
   * handles the scroll-event of the scrollView
   * @param {object} event scroll event
   */
  handleOnScroll = (event) => event.nativeEvent.contentOffset.y;

  /**
   * @param {HTMLElement} element UI element that RNModal will scroll to (for example if the software-keyboard is shown)
   */
  handleScrollTo = (element) => {
    if (this.scrollViewRef.current)
      this.scrollViewRef.current.scrollTo({ ...element, animated: true });
  };
}

/***********************************************************************************************
local styling
***********************************************************************************************/

localStyle = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
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
    height: "auto",
    maxHeight: "90%",
    borderTopLeftRadius: config.theme.values.defaultModalBorderRadius,
    borderTopRightRadius: config.theme.values.defaultModalBorderRadius,
    borderColor: config.theme.colors.white,
  },

  modalViewWrapper: {
    paddingTop: 20,
    paddingBottom: 20,
  },

  bottomBarWrapper: {
    flexWrap: "nowrap",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
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
  },

  modalPaginationButton: {
    width: 44,
    height: "auto",
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
