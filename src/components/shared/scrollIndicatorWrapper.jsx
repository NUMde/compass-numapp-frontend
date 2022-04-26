// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { useState, useEffect, useRef } from 'react';
import {
  AccessibilityInfo,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import PropTypes from 'prop-types';

// components
import { Icon } from 'react-native-elements';

// services & config
import config from '~config/configProvider';
import translate from '~services/localization';

/***********************************************************************************************
 * component
 * wraps a scrollView and shows an indicator button when there is something to scroll
 * when clicking that indicator button the scroll view is scroll by the height of the viewport
 *
 * @param {object}          props
 * @param {[JSX.Element]}   props.children the content to be wrapped in this component
 **********************************************************************************************/
export default function ScrollIndicatorWrapper({ children }) {
  // internal state
  const [showIndicator, setShowIndicator] = useState(false);
  const [nextScrollValue, setNextScrollValue] = useState(0);
  const [isAccessibilityOn, setIsAccessibilityOn] = useState(false);
  const scrollViewRef = useRef();

  // setup when component is mounted
  useEffect(() => {
    AccessibilityInfo.isScreenReaderEnabled().then((screenReaderEnabled) => {
      setIsAccessibilityOn(screenReaderEnabled);
    });
    // trigger scroll on mount to show indicator
    const node = scrollViewRef?.current;
    node?.scrollTo({ x: 0, y: 1, animated: false });
  }, []);

  return (
    <KeyboardAvoidingView style={localStyle.wrapper}>
      {/* the regular ScrollView & content */}
      <ScrollView
        enableOnAndroid
        ref={scrollViewRef}
        style={localStyle.wrapper}
        contentContainerStyle={localStyle.contentContainerStyle}
        scrollEventThrottle={16}
        onScroll={(event) => {
          // calculating the next scroll-position
          const bannerHeight =
            Platform.OS === 'ios'
              ? config.appConfig.scaleUiFkt(290, 0.7)
              : config.appConfig.scaleUiFkt(290, 0.6);
          const contentHeight = Dimensions.get('window').height - bannerHeight;
          setNextScrollValue(
            event.nativeEvent.contentOffset.y +
              contentHeight -
              localStyle.indicator.height -
              localStyle.indicator.bottom -
              20,
          );

          // determines if the indicator should be displayed or not
          setShowIndicator(
            event.nativeEvent.layoutMeasurement.height <
              event.nativeEvent.contentSize.height &&
              event.nativeEvent.contentSize.height -
                event.nativeEvent.layoutMeasurement.height -
                event.nativeEvent.contentOffset.y >
                30,
          );
        }}
      >
        {/* the content */}
        {children}
      </ScrollView>

      {/* if "allowScrollIndicators" is true and the situation calls for a scroll indicator ("showIndicator") and
				we are not in accessibility-mode */}
      {config.theme.ui.allowScrollIndicators &&
        showIndicator &&
        !isAccessibilityOn && (
          <TouchableOpacity
            accessibilityRole={translate('accessibility').types.button}
            style={localStyle.indicator}
            onPress={() => {
              scrollViewRef.current.scrollTo({
                x: 0,
                y: nextScrollValue,
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

ScrollIndicatorWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

/***********************************************************************************************
localStyle
***********************************************************************************************/

const localStyle = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },

  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    overflow: 'hidden',
  },

  wrapper: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  },

  indicator: {
    backgroundColor: config.theme.values.defaultScrollIndicatorBackgroundColor,
    width: config.appConfig.scaleUiFkt(75),
    height: config.appConfig.scaleUiFkt(75),
    position: 'absolute',
    borderRadius: 100,
    left:
      Dimensions.get('window').width / 2 - config.appConfig.scaleUiFkt(75) / 2,
    bottom: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
