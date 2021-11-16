// the entry point for the gradle build

import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import { appConfig } from './src/config';
import { name as appName } from './app.json';

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
