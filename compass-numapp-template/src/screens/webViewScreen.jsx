// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { navigationPropType } from '~propTypes';

// components
import { WebView } from 'react-native-webview';
// custom components
import { Banner } from '~components/shared';

// services & config
import { theme } from '~config';

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

WebViewScreen.propTypes = {
  navigation: PropTypes.shape(navigationPropType).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      title: PropTypes.string.isRequired,
      screenSubTitle: PropTypes.string,
      uri: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

/***********************************************************************************************
localStyle
***********************************************************************************************/

const localStyle = StyleSheet.create({
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
