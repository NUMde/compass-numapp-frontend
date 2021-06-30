// the entry point for the gradle build 

import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import Config from './src/config/appConfig'

// Register background handler
if(Config.connectToFCM) messaging().setBackgroundMessageHandler(async remoteMessage => true)

AppRegistry.registerComponent('Compass', () => App);
