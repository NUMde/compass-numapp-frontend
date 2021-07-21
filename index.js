// the entry point for the gradle build 

import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import Config from './src/config/appConfig'
import { Alert } from 'react-native';

// Register background handler
if(Config.connectToFCM) {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        Alert.alert("Background Notification","RECEIVED")
        console.log('Background!', remoteMessage);
        return true;
    });

    messaging().onMessage(async remoteMessage => {
        Alert.alert("Notification","RECEIVED")
        console.log('Background!', remoteMessage);
        return true;
    });
}

AppRegistry.registerComponent('Compass', () => App);
