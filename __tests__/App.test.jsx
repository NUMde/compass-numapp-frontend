// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React from 'react'
import { expect } from '@jest/globals'
import { renderWithRedux } from '../__utils__/render'
import createAppNavigator from '../src/navigation/appNavigator'

import App from '../App'

/***********************************************************************************************
tests
***********************************************************************************************/

describe('APP START AND RENDERING:', () => {

    /**
     * creates an instance of the app with working navigational properties
     */
    let createAppTree = () => {
    
        // creates the regular appNavigator
        let Navigator = createAppNavigator()
            
        return renderWithRedux(<Navigator><App /></Navigator>);   
    }

    // simple render test
    test ('<App /> can be created and rendered', () => {

         // renders the component
        let tree = createAppTree()

        // checks if the screen matches the snapshot
        expect(tree).toMatchSnapshot()
    })

    // checks if App produces exactly one child
    test ('<App /> has exactly one child', () => {
        
        expect(createAppTree().toJSON().children.length).toBe(1)
    })

    // after the app start, the user should be automatically routed to the landing screen
    test ('User is navigated to <LandingScreen /> after app start', () => {
    
        // checks if right now the login-button is rendered
        let loginButton = createAppTree().getByText('Navigate to Login Screen')
        
        expect(loginButton).toBeTruthy()
    })
})
