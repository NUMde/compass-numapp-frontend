// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React from 'react'
import '@testing-library/jest-native/extend-expect'
import { renderWithRedux } from '../__utils__/render'
import { fireEvent } from '@testing-library/react-native'

import LoginScreen from '../src/screens/login/loginScreen'
import LandingScreen from '../src/screens/login/landingScreen'
import { Login as LoginContainer } from '../src/screens/login/loginContainer'

/***********************************************************************************************
tests
***********************************************************************************************/

describe('LOGIN RENDERING:', () => {

    // renders the LoginContainer
    it('<LoginContainer /> can be rendered', async () => {
    
        let fakeNavigation = { navigate: jest.fn(), state: { routeName: 'Login' } }
        
        let tree = renderWithRedux(<LoginContainer navigation={fakeNavigation} />)
    
        expect(tree).toMatchSnapshot()
    })
    
    // checks if the LandingScreen can be rendered
    it(`<LandingScreen /> can be rendered`, () => {
    
        // renders the landing page
        let tree = renderWithRedux(<LandingScreen/>)
    
        // checks if the screen matches the snapshot
        expect(tree).toMatchSnapshot()
    })

    // checks if there is a button on the LandingScreen that can be used to navigate to the LoginScreen
    it(`<LandingScreen /> can be used to navigate to LoginScreen`, () => {
    
        // navigation dummy - used to check if the navigate event occurs
        let fakeNavigation = { navigate: jest.fn() }
    
        // renders the landing page
        let tree = renderWithRedux(<LandingScreen navigation={fakeNavigation}/>)
    
        // hits the button "Navigate to Login Screen"
        fireEvent.press(tree.getByText('Navigate to Login Screen'))
    
        // let instance = tree.getInstance()
        // checks if a navigation event was triggered
        expect(fakeNavigation.navigate).toBeCalledWith('Login')
    })
    
    // tests if the LoginScreen can be rendered
    it(`<LoginScreen /> can be rendered`, () => {
    
        // navigation dummy - used to check if the navigate event occurs
        let fakeNavigation = { navigate: jest.fn() }
    
        // dummy actions
        let actions = { logout: () => jest.fn() }
    
        // renders the landing page
        let tree = renderWithRedux(<LoginScreen navigation={fakeNavigation} actions/>)
    
        // checks if the screen matches the snapshot
        expect(tree).toMatchSnapshot()
    })
})