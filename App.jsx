// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { useEffect } from 'react';
import { StyleSheet, View, StatusBar, LogBox, Platform } from 'react-native';
import { URL as nativeURL } from 'react-native-url-polyfill/auto';
import * as RNLocalize from 'react-native-localize';

// components
import SplashScreen from 'react-native-splash-screen';

// redux & store
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, reduxStore } from './src/store';

// navigation setup
import AppNavigator from './src/navigation/appNavigator';

// config
import kioskMode from './src/config/kioskApiConfig';
import config from './src/config/configProvider';

// redux actions
import { updateLanguage } from './src/store/user.slice';

// custom components
import { Spinner } from './src/components/shared';

// services
import localStorage from './src/services/localStorage';
import {
  availableLanguages,
  initLocalization,
} from './src/services/localization';

/***********************************************************************************************
Component
***********************************************************************************************/

function App() {
  /**
   * handler for when the user changes the system language
   */
  const handleLocalizationChange = () => {
    reduxStore.dispatch(
      updateLanguage(
        RNLocalize.findBestAvailableLanguage(Object.keys(availableLanguages)),
      ),
    );
  };

  useEffect(() => {
    RNLocalize.addEventListener('change', handleLocalizationChange);

    // load user language from localStorage and initialize localization
    localStorage.loadUserLanguage().then((langCode) => {
      initLocalization(langCode);

      SplashScreen.hide();
    });

    return () => {
      // removeEventListener when unmounting
      RNLocalize.removeEventListener('change', handleLocalizationChange);
    };
  }, []);

  // should this be a demo init kiosk mode
  if (kioskMode.active) kioskMode.initKioskMode();

  // return the basic view that contains the navigator
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

      <Provider store={reduxStore}>
        <PersistGate loading={<Spinner />} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    </View>
  );
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

// polyfill for iOS
global.URL = nativeURL;

// deactivates the logbox-warning about the debugger running in the background
LogBox.ignoreLogs(['Remote debugger']);

/***********************************************************************************************
export
***********************************************************************************************/

export default App;
