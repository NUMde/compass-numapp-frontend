// the entry point for the gradle build

import 'react-native-url-polyfill/auto';
import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Config from '~config/configProvider';
import App from './App';

// Register background handler
if (Config.appConfig.connectToFCM) {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Received Message!', remoteMessage);
    return true;
  });
  messaging().onMessage(async (remoteMessage) => {
    console.log('Received Message!', remoteMessage);
    return true;
  });
}

AppRegistry.registerComponent('Compass', () => App);
