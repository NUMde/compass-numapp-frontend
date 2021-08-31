// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import {
  createStackNavigator,
  TransitionPresets,
} from "react-navigation-stack";

import About from "../screens/about/aboutContainer";
import Login from "../screens/login/loginContainer";
import { CheckIn } from "../screens/checkIn/checkInContainer";

/***********************************************************************************************
style
***********************************************************************************************/

const defaultNavigationStyle = {
  gestureEnabled: false,
  headerShown: false,
  headerStyle: {
    height: 0,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
    color: "transparent",
  },
};

/***********************************************************************************************
export and AppContainer-creation
***********************************************************************************************/

// creates the stack-navigator for the navigation while NOT LOGGED IN

const SignedOutView = createStackNavigator({
  Landing: {
    screen: Login,
    navigationOptions: defaultNavigationStyle,
  },
  Login: {
    screen: Login,
    navigationOptions: defaultNavigationStyle,
  },
});

// creates the stack-navigator for the navigation while LOGGED IN

const SignedInView = createStackNavigator(
  {
    CheckIn: {
      screen: CheckIn,
      navigationOptions: defaultNavigationStyle,
    },
    Survey: {
      screen: CheckIn,
      navigationOptions: defaultNavigationStyle,
    },
    About: {
      screen: About,
      navigationOptions: defaultNavigationStyle,
    },
    WebView: {
      screen: About,
      navigationOptions: defaultNavigationStyle,
    },
    LegalInformation: {
      screen: About,
      navigationOptions: defaultNavigationStyle,
    },
  },
  {
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  }
);

/**
 * creates the app container based on the two stack-navigators
 */
const createAppNavigator = () => {
  const appSwitchNavigator = createSwitchNavigator(
    {
      Login: {
        screen: SignedOutView,
      },
      Home: {
        screen: SignedInView,
      },
    },
    {
      initialRouteName: "Login",
      defaultNavigationOptions: {
        ...TransitionPresets.SlideFromRightIOS,
      },
    }
  );

  return createAppContainer(appSwitchNavigator);
};

export default createAppNavigator;
