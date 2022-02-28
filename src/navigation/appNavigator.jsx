// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AboutScreen from '../screens/about/aboutScreen';
import WebViewScreen from '../screens/about/webViewScreen';
import LegalInformationScreen from '../screens/about/legalInformationScreen';
import LandingScreen from '../screens/login/landingScreen';
import LoginScreen from '../screens/login/loginScreen';
import { CheckIn } from '../screens/checkIn/checkInContainer';

/***********************************************************************************************
export and AppContainer-creation
***********************************************************************************************/

// creates the stack-navigator for the navigation while NOT LOGGED IN

function SignedOutView() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
      initialRouteName="Landing"
    >
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

// creates the stack-navigator for the navigation while LOGGED IN

function SignedInView() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
      initialRouteName="CheckIn"
    >
      <Stack.Screen name="CheckIn" component={CheckIn} />
      <Stack.Screen name="Survey" component={CheckIn} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="WebView" component={WebViewScreen} />
      <Stack.Screen
        name="LegalInformation"
        component={LegalInformationScreen}
      />
    </Stack.Navigator>
  );
}

/**
 * creates the app container based on the two stack-navigators
 */
const createAppNavigator = () => {
  const RootStack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
        initialRouteName="SignedOut"
      >
        <RootStack.Screen name="SignedIn" component={SignedInView} />
        <RootStack.Screen name="SignedOut" component={SignedOutView} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default createAppNavigator;
