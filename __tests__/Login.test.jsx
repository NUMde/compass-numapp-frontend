// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { renderWithRedux } from '../__utils__/render';

import LoginScreen from '../src/screens/login/loginScreen';
import LandingScreen from '../src/screens/login/landingScreen';
import LoginContainer from '../src/screens/login/loginContainer';

/***********************************************************************************************
tests
***********************************************************************************************/

describe('LOGIN RENDERING:', () => {
  // renders the LoginContainer and matches it to its snapshot
  it('<LoginContainer /> can be rendered', () => {
    // just a fake navigation object
    const fakeNavigation = {
      navigate: jest.fn(),
    };

    // renders the LoginContainer
    const tree = renderWithRedux(
      <LoginContainer navigation={fakeNavigation} route={{ name: 'Login' }} />,
    );

    expect(tree).toMatchSnapshot();
  });

  // checks if the LandingScreen can be rendered and matches it to its snapshot
  it('<LandingScreen /> can be rendered', () => {
    // renders the landing page
    const tree = renderWithRedux(<LandingScreen />);

    // checks if the screen matches the snapshot
    expect(tree).toMatchSnapshot();
  });

  // checks if there is a button on the LandingScreen that can be used to navigate to the LoginScreen.
  // only uses fake navigation to check if the event was triggered
  it('<LandingScreen /> can be used to navigate to LoginScreen', () => {
    // navigation dummy - used to check if the navigate event occurs
    const fakeNavigation = { navigate: jest.fn() };

    // renders the landing page
    const tree = renderWithRedux(
      <LandingScreen navigation={fakeNavigation} route={{ name: 'Landing' }} />,
    );

    // hits the button "Navigate to Login Screen"
    fireEvent.press(tree.getByText('Navigate to Login Screen'));

    // let instance = tree.getInstance()
    // checks if a navigation event was triggered
    expect(fakeNavigation.navigate).toBeCalledWith('Login');
  });

  // tests if the LoginScreen can be rendered - again, with a false navigation object
  it('<LoginScreen /> can be rendered', () => {
    // navigation dummy - used to check if the navigate event occurs
    const fakeNavigation = { navigate: jest.fn() };

    // dummy actions
    const actions = { logout: () => jest.fn() };

    // renders the landing page
    const tree = renderWithRedux(
      <LoginScreen
        navigation={fakeNavigation}
        actions={actions}
        route={{ name: 'Login' }}
      />,
    );

    // checks if the screen matches the snapshot
    expect(tree).toMatchSnapshot();
  });
});
