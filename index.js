// the entry point for the gradle build 

import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import * as config from './src/config/appConfig'

// Register background handler
if(config.connectToFCM) {
    
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Received Message!', remoteMessage);
        return true;
    });

    messaging().onMessage(async remoteMessage => {
        console.log('Received Message!', remoteMessage);
        return true;
    });
}

AppRegistry.registerComponent('Compass', () => App);
