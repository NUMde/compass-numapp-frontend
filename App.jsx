// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import { Provider } from 'react-redux';
import React, { PureComponent } from 'react';
import * as RNLocalize from 'react-native-localize';
import SplashScreen from 'react-native-splash-screen';
import { StyleSheet, View, StatusBar, LogBox, Platform } from 'react-native';
import RNRestart from 'react-native-restart';
import localization from './src/services/localization/localization';

import reduxStore from './src/store';
import config from './src/config/configProvider';
import kioskMode from './src/config/kioskApiConfig';
import createAppNavigator from './src/navigation/appNavigator';

/***********************************************************************************************
Component
***********************************************************************************************/

class App extends PureComponent {
  /**
   * creates the appNavigator and provides the initial view
   * @constructor
   * @param  {object} props
   */
  constructor(props) {
    super(props);
    localization.init();
  }

  // just in case the device language is changed while the app is running
  componentDidMount() {
    RNLocalize.addEventListener('change', this.handleLocalizationChange);
  }

  // just in case the device language is changed while the app is running
  componentWillUnmount() {
    RNLocalize.removeEventListener('change', this.handleLocalizationChange);
  }

  // fires after the device language was changed while the app is running
  handleLocalizationChange = () => {
    localization.setI18nConfig();
    RNRestart.Restart();
  };

  render() {
    // hides the splash screen
    SplashScreen.hide();

    // should this be a demo
    if (kioskMode.active) kioskMode.initKioskMode();

    // and returns the basic view that contains the navigator
    return (
      <View style={localStyle.container}>
        {Platform.OS === 'ios' && (
          <StatusBar barStyle={config.theme.values.defaultStatusBarStyleIos} />
        )}

        {Platform.OS === 'android' && (
          <StatusBar
            barStyle={config.theme.values.defaultStatusBarStyleAndroid}
            backgroundColor={
              config.theme.values.defaultStatusBarAndroidBackgroundColor
            }
          />
        )}

        <Provider store={reduxStore}>{createAppNavigator()}</Provider>
      </View>
    );
  }
}

/***********************************************************************************************
local styling
***********************************************************************************************/

const localStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

/***********************************************************************************************
global variables / settings
***********************************************************************************************/

// needed by node-forge for the encryption functionality
global.Buffer = require('buffer').Buffer;

// deactivates the logbox-warning about the debugger running in the background
LogBox.ignoreLogs(['Remote debugger']);

/***********************************************************************************************
export
***********************************************************************************************/

export default App;
