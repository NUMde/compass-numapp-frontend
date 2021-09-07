// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React from "react";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { renderWithRedux } from "../__utils__/render";

import App from "../App";
import Spinner from "../src/components/spinner/spinner";
import LoginScreen from "../src/screens/login/loginScreen";
import LandingScreen from "../src/screens/login/landingScreen";
import createAppNavigator from "../src/navigation/appNavigator";
import CheckInScreen from "../src/screens/checkIn/checkInScreen";
import LoginContainer from "../src/screens/login/loginContainer";

import config from "../src/config/configProvider";

/***********************************************************************************************
tests
***********************************************************************************************/

describe("LOGIN RENDERING:", () => {
  // renders the LoginContainer and matches it to its snapshot
  it("<LoginContainer /> can be rendered", () => {
    // just a fake navigation object
    const fakeNavigation = {
      navigate: jest.fn(),
      state: { routeName: "Login" },
    };

    // renders the LoginContainer
    const tree = renderWithRedux(
      <LoginContainer navigation={fakeNavigation} />
    );

    expect(tree).toMatchSnapshot();
  });

  // checks if the LandingScreen can be rendered and matches it to its snapshot
  it(`<LandingScreen /> can be rendered`, () => {
    // renders the landing page
    const tree = renderWithRedux(<LandingScreen />);

    // checks if the screen matches the snapshot
    expect(tree).toMatchSnapshot();
  });

  // checks if there is a button on the LandingScreen that can be used to navigate to the LoginScreen.
  // only uses fake navigation to check if the event was triggered
  it(`<LandingScreen /> can be used to navigate to LoginScreen`, () => {
    // navigation dummy - used to check if the navigate event occurs
    const fakeNavigation = { navigate: jest.fn() };

    // renders the landing page
    const tree = renderWithRedux(<LandingScreen navigation={fakeNavigation} />);

    // hits the button "Navigate to Login Screen"
    fireEvent.press(tree.getByText("Navigate to Login Screen"));

    // let instance = tree.getInstance()
    // checks if a navigation event was triggered
    expect(fakeNavigation.navigate).toBeCalledWith("Login");
  });

  // tests if the LoginScreen can be rendered - again, with a false navigation object
  it(`<LoginScreen /> can be rendered`, () => {
    // navigation dummy - used to check if the navigate event occurs
    const fakeNavigation = { navigate: jest.fn() };

    // dummy actions
    const actions = { logout: () => jest.fn() };

    // renders the landing page
    const tree = renderWithRedux(
      <LoginScreen navigation={fakeNavigation} actions={actions} />
    );

    // checks if the screen matches the snapshot
    expect(tree).toMatchSnapshot();
  });
});

describe("LOGIN Handling:", () => {
  // tests if the flow from the landing screen to the checkin screen can be executed.
  // the test can use the login-automation defined in "config.appConfig.automateQrLogin".
  // if that is not possible the function "scanSuccess" will be executed directly.
  it(`User can load the app, login and then trigger the automatic questionnaire download`, async () => {
    // creates an actual navigator
    const Navigator = createAppNavigator();

    // renders the app
    const tree = renderWithRedux(
      <Navigator>
        <App />
      </Navigator>
    );

    // as we start with an empty state, the app will navigate the user to the LandingScreen...
    let { instance } = tree.UNSAFE_getByType(LandingScreen);

    // ...which should be noted in the navigation-object:
    expect(
      instance.props.navigation.state.routeName === "Landing"
    ).toBeTruthy();

    // also, there is a button on that screen that should take us to the login screen
    const loginButton = tree.getByText("Navigate to Login Screen");

    // checks if that button exists..
    expect(loginButton).toBeTruthy();

    // ...and "presses" it
    fireEvent.press(loginButton);

    // if the automateQrLogin-option is set
    if (config.appConfig.automateQrLogin) {
      // checks if the checkin screen was already loaded
      await waitFor(
        () => (instance = tree.UNSAFE_getByType(CheckInScreen).instance)
      )
        // waits for the loading screen to turn invisible
        .then(() =>
          waitFor(() =>
            expect(
              tree.UNSAFE_getByType(Spinner).instance.props.visible === false
            ).toBeTruthy()
          )
            // checks if categoriesLoaded was set to true (as this is only possible after a successful login an the download of the questionnaire)
            .then(() =>
              waitFor(() =>
                expect(instance.props.categoriesLoaded).toBeTruthy()
              )
            )
        );
    }

    // if the automateQrLogin-option is not set
    if (!config.appConfig.automateQrLogin) {
      // checks if the login screen was already loaded
      await waitFor(
        () => (instance = tree.UNSAFE_getByType(LoginScreen).instance)
      )
        // then triggers the successCallback of the QR-Code-Scanner (with a scanresult as parameter)
        .then(() =>
          waitFor(() =>
            instance.props.scanSuccess({
              data: '{"AppIdentifier":"COMPASS","SubjectId":"7bfc3b07-a97d-4e11-8ac6-b970c1745476"}',
            })
          )
            // waits till the user was navigated to the checkin screen
            .then(() =>
              waitFor(
                () => (instance = tree.UNSAFE_getByType(CheckInScreen).instance)
              )
                // waits for the loading screen to turn invisible
                .then(() =>
                  waitFor(() =>
                    expect(
                      tree.UNSAFE_getByType(Spinner).instance.props.visible ===
                        false
                    ).toBeTruthy()
                  )
                    // checks if categoriesLoaded was set to true (as this is only possible after a successful login an the download of the questionnaire)
                    .then(() =>
                      waitFor(() =>
                        expect(instance.props.categoriesLoaded).toBeTruthy()
                      )
                    )
                )
            )
        );
    }
  });
});
