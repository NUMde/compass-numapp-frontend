// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AboutScreen from '../screens/aboutScreen';
import WebViewScreen from '../screens/webViewScreen';
import LegalInformationScreen from '../screens/legalInformationScreen';
import LandingScreen from '../screens/landingScreen';
import LoginScreen from '../screens/loginScreen';
import CheckInScreen from '../screens/checkInScreen';
import SurveyScreen from '../screens/surveyScreen';

import { Routes, Stacks } from './constants';

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
      initialRouteName={Routes.LANDING}
    >
      <Stack.Screen name={Routes.LANDING} component={LandingScreen} />
      <Stack.Screen name={Routes.LOGIN} component={LoginScreen} />
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
      initialRouteName={Routes.CHECK_IN}
    >
      <Stack.Screen name={Routes.CHECK_IN} component={CheckInScreen} />
      <Stack.Screen name={Routes.SURVEY} component={SurveyScreen} />
      <Stack.Screen name={Routes.ABOUT} component={AboutScreen} />
      <Stack.Screen name={Routes.WEBVIEW} component={WebViewScreen} />
      <Stack.Screen
        name={Routes.LEGAL_INFORMATION}
        component={LegalInformationScreen}
      />
    </Stack.Navigator>
  );
}

/**
 * creates the app container based on the two stack-navigators
 */
function AppNavigator() {
  const RootStack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
        initialRouteName={Stacks.SIGNED_OUT}
      >
        <RootStack.Screen name={Stacks.SIGNED_IN} component={SignedInView} />
        <RootStack.Screen name={Stacks.SIGNED_OUT} component={SignedOutView} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
