// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet } from 'react-native';

// custom components
import { Banner } from '~components/shared';

// services & config
import config from '~config/configProvider';

/**
 * component:
 * renders the webview screen which displays a website within the app
 *
 * @param  {object}    props
 * @param  {object}    props.route the route object provided by 'react-navigation'
 * @param  {object}    props.navigation the navigation object provided by 'react-navigation'
 */
function WebViewScreen({ route, navigation }) {
  // retrieve params passed via navigation
  const { title, screenSubTitle, uri } = route.params;
  return (
    <View>
      <View style={localStyle.wrapper}>
        {/* banner */}
        <Banner nav={navigation} title={title} subTitle={screenSubTitle} />

        {/* content */}
        <View style={[localStyle.flexi, localStyle.wrapper]}>
          <WebView originWhitelist={['*']} source={{ uri }} />
        </View>
      </View>
    </View>
  );
}

/***********************************************************************************************
localStyle
***********************************************************************************************/

const localStyle = StyleSheet.create({
  wrapper: {
    height: '100%',
    flexDirection: 'column',
    backgroundColor: config.theme.values.defaultBackgroundColor,
  },

  flexi: {
    flex: 1,
  },
});

/***********************************************************************************************
export
***********************************************************************************************/

export default WebViewScreen;
