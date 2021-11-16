// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { PureComponent } from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet } from 'react-native';

import store from '../../store';
import { theme } from '../../config';
import Banner from '../../components/banner/banner';

let localStyle;

/***********************************************************************************************
component:
renders the webView screen
***********************************************************************************************/

class WebViewScreen extends PureComponent {
  /**
   * @constructor
   * @param  {object}    props
   * @param  {object}    props.navigation the navigation object provided by 'react-navigation'
   */

  // rendering
  /*-----------------------------------------------------------------------------------*/

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <View style={localStyle.wrapper}>
          {/* banner */}
          <Banner
            nav={navigation}
            title={store.getState().About.currentWebView.title}
            subTitle={store.getState().About.currentWebView.screenSubTitle}
          />

          {/* content */}
          <View style={{ ...localStyle.flexi, ...localStyle.wrapper }}>
            <WebView
              originWhitelist={['*']}
              source={{ uri: store.getState().About.currentWebView.uri }}
            />
          </View>
        </View>
      </View>
    );
  }
}

/***********************************************************************************************
localStyle
***********************************************************************************************/

localStyle = StyleSheet.create({
  wrapper: {
    height: '100%',
    flexDirection: 'column',
    backgroundColor: theme.values.defaultBackgroundColor,
  },

  flexi: {
    flex: 1,
  },
});

/***********************************************************************************************
export
***********************************************************************************************/

export default WebViewScreen;
