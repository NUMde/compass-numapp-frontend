// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import mockPermissions from 'react-native-permissions/mock';
import 'react-native-gesture-handler/jestSetup';

/***********************************************************************************************
mocks
***********************************************************************************************/

// mocks the NativeAnimatedHelper module
/*-----------------------------------------------------------------------------------*/
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// react native permissions
/*-----------------------------------------------------------------------------------*/
jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  rn.NativeModules.RNPermissions = {
    ...mockPermissions,
  };
  return rn;
});

// the fcm messaging
/*-----------------------------------------------------------------------------------*/
jest.mock('@react-native-firebase/messaging', () => ({
  messaging: jest.fn(() => ({
    hasPermission: jest.fn(() => Promise.resolve(true)),
    subscribeToTopic: jest.fn(),
    unsubscribeFromTopic: jest.fn(),
    requestPermission: jest.fn(() => Promise.resolve(true)),
    getToken: jest.fn(() => Promise.resolve('myMockToken')),
  })),
  notifications: jest.fn(() => ({
    onNotification: jest.fn(),
    onNotificationDisplayed: jest.fn(),
  })),
}));

// the splashscreen used when loading the app
/*-----------------------------------------------------------------------------------*/
jest.mock('react-native-splash-screen', () => ({
  hide: jest.fn(),
  show: jest.fn(),
}));
