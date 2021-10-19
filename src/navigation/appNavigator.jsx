// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import About from "../screens/about/aboutContainer";
import Login from "../screens/login/loginContainer";
import { CheckIn } from "../screens/checkIn/checkInContainer";

/***********************************************************************************************
export and AppContainer-creation
***********************************************************************************************/

// creates the stack-navigator for the navigation while NOT LOGGED IN

const SignedOutView = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
      initialRouteName="Landing"
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Landing" component={Login} />
    </Stack.Navigator>
  );
};

// creates the stack-navigator for the navigation while LOGGED IN

const SignedInView = () => {
  const Stack = createStackNavigator();
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
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="WebView" component={About} />
      <Stack.Screen name="LegalInformation" component={About} />
    </Stack.Navigator>
  );
};

/**
 * creates the app container based on the two stack-navigators
 */
const createAppNavigator = () => {
  const RootStack = createStackNavigator();
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
