// the entry point for the gradle build

import 'react-native-reanimated';
import 'react-native-url-polyfill/auto';
import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { appConfig } from '~config';
import { name as appName } from './appName.json';
import App from './src/App';

// Register background handler
if (appConfig.connectToFCM) {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Received Message!', remoteMessage);
    return true;
  });
  messaging().onMessage(async (remoteMessage) => {
    console.log('Received Message!', remoteMessage);
    return true;
  });
}

AppRegistry.registerComponent(appName, () => App);
