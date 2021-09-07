// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { Component } from "react";
import { Icon } from "react-native-elements";
import {
  AccessibilityInfo,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

import config from "../../config/configProvider";

let localStyle;

/***********************************************************************************************
component
***********************************************************************************************/

export default class ScrollIndicatorWrapper extends Component {
  // public members
  /*-----------------------------------------------------------------------------------*/

  /**
   * used to persist the state of the indicator (show/no show)
   * @type {boolean}
   */
  showIndicator;

  /**
   * reference for the scrollView component
   * @type {object}
   */
  scrollViewRef;

  /**
   * tells us if the screen reader is enabled
   * @type {boolean}
   */
  isAccessibilityOn;

  /**
   * holds the position where to scroll next (when hitting the scrollIndicator-Button)
   * @type {number}
   */
  nextScrollValue;

  /**
   * adds a scroll-indicator button at the bottom of a ScrollView. this can be de-activated by
   * manipulating the property 'allowScrollIndicators' in src/config/developmentConfig.js
   * @constructor
   * @param  {object}      props
   * @param  {JSX.Element} props.contentData react-native content to be rendered
   */
  constructor(props) {
    super(props);
    this.showIndicator = false;
    this.scrollViewRef = React.createRef();
    // hides the accessibility indicator when voice over is activated
    AccessibilityInfo.isScreenReaderEnabled().then((screenReaderEnabled) => {
      this.isAccessibilityOn = screenReaderEnabled;
    });
  }

  // class events
  /*-----------------------------------------------------------------------------------*/

  /**
   * just executes the scroll-event after the component mounted (so that the indicator
   * will be rendered)
   */
  componentDidMount = () => this.scrollElement();

  // modal events
  /*-----------------------------------------------------------------------------------*/

  /**
   * basically, a scroll-to-top function
   */
  scrollElement() {
    window.requestAnimationFrame(() => {
      const node = this.scrollViewRef;
      if (node !== undefined) {
        if (node.current) node.current.scrollTo({ x: 0, y: 1, animated: true });
      }
    });
  }

  // rendering
  /*-----------------------------------------------------------------------------------*/

  render() {
    const { contentData } = this.props;
    return (
      <KeyboardAvoidingView style={localStyle.wrapper}>
        {/* the regular ScrollView & content */}
        <ScrollView
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...this.props}
          enableOnAndroid
          ref={this.scrollViewRef}
          style={localStyle.wrapper}
          innerRef={(ref) => (this.scroll = ref)}
          contentContainerStyle={localStyle.contentContainerStyle}
          onScroll={(event) => {
            // calculating the next scroll-position
            const bannerHeight =
              Platform.OS === "ios"
                ? config.appConfig.scaleUiFkt(290, 0.7)
                : config.appConfig.scaleUiFkt(290, 0.6);
            const contentHeight =
              Dimensions.get("window").height - bannerHeight;
            this.nextScrollValue =
              event.nativeEvent.contentOffset.y +
              contentHeight -
              localStyle.indicator.height -
              localStyle.indicator.bottom -
              20;

            // determines if the indicator should be displayed or not
            this.showIndicator =
              event.nativeEvent.layoutMeasurement.height <
                event.nativeEvent.contentSize.height &&
              event.nativeEvent.contentSize.height -
                event.nativeEvent.layoutMeasurement.height -
                event.nativeEvent.contentOffset.y >
                30;

            // applies the updates
            this.forceUpdate();
          }}
        >
          {/* the content */}
          {contentData}
        </ScrollView>

        {/* if "allowScrollIndicators" is true and the situation calls for a scroll indicator ("showIndicator") and
				we are not in accessibility-mode */}
        {config.theme.ui.allowScrollIndicators &&
          this.showIndicator &&
          !this.isAccessibilityOn && (
            <TouchableOpacity
              accessibilityRole={config.text.accessibility.types.button}
              style={localStyle.indicator}
              onPress={() => {
                this.scrollViewRef.current.scrollTo({
                  x: 0,
                  y: this.nextScrollValue,
                  animated: true,
                });
              }}
            >
              <Icon
                name="chevron-down"
                type="font-awesome"
                color={config.theme.values.defaultScrollIndicatorIconColor}
                size={15}
              />
            </TouchableOpacity>
          )}
      </KeyboardAvoidingView>
    );
  }
}

/***********************************************************************************************
localStyle
***********************************************************************************************/

localStyle = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },

  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    overflow: "hidden",
  },

  wrapper: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
  },

  indicator: {
    backgroundColor: config.theme.values.defaultScrollIndicatorBackgroundColor,
    width: config.appConfig.scaleUiFkt(75),
    height: config.appConfig.scaleUiFkt(75),
    position: "absolute",
    borderRadius: 100,
    left:
      Dimensions.get("window").width / 2 - config.appConfig.scaleUiFkt(75) / 2,
    bottom: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
