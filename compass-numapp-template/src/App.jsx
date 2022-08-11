// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { useEffect } from 'react';
import { StyleSheet, View, StatusBar, LogBox, Platform } from 'react-native';
import * as RNLocalize from 'react-native-localize';

// components
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

// redux & store
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, reduxStore } from '~store';

// navigation setup
import AppNavigator from '~navigation/appNavigator';

// config
import kioskMode from '~config/kioskApiConfig';
import { theme } from '~config';

// redux actions
import { updateLanguage } from '~store/user.slice';
import { init } from '~store/globals.slice';

// custom components
import { Spinner } from '~components/shared';

// services
import localStorage from '~services/localStorage';
import { availableLanguages, initLocalization } from '~services/localization';

/***********************************************************************************************
global variables / settings
***********************************************************************************************/

// needed by node-forge for the encryption functionality
global.Buffer = require('buffer').Buffer;

// deactivates the logbox-warning about the debugger running in the background
LogBox.ignoreLogs(['Remote debugger']);

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
      reduxStore.dispatch(init());
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
        <StatusBar barStyle={theme.values.defaultStatusBarStyleIos} />
      )}

      {Platform.OS === 'android' && (
        <StatusBar
          barStyle={theme.values.defaultStatusBarStyleAndroid}
          backgroundColor={theme.values.defaultStatusBarAndroidBackgroundColor}
        />
      )}

      <Provider store={reduxStore}>
        <PersistGate loading={<Spinner />} persistor={persistor}>
          <SafeAreaView edges={['bottom']} style={localStyle.safeArea}>
            <AppNavigator />
          </SafeAreaView>
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
  safeArea: {
    flex: 1,
    backgroundColor: theme.values.defaultBackgroundColor,
  },
});

/***********************************************************************************************
export
***********************************************************************************************/

export default App;
