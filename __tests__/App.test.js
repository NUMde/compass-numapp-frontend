
import React from 'react'
import { expect } from '@jest/globals'
import '@testing-library/jest-native/extend-expect'
import { renderWithRedux } from '../__utils__/render'
import createAppNavigator from '../src/navigation/appNavigator'

import App from '../App'

describe('APP START AND RENDERING:', () => {

    let createAppTree = () => {
    
        let Navigator = createAppNavigator()
            
        return renderWithRedux(<Navigator><App /></Navigator>);   
    }

    test ('<App /> can be created and rendered', () => {

        let tree = createAppTree()

        // expect(tree).toMatchSnapshot()
    })

    test ('<App /> has exactly one child', () => {
        
        expect(createAppTree().toJSON().children.length).toBe(1)
    })

    test ('User is navigated to <LandingScreen /> after app start', () => {
    
        let loginButtun = createAppTree().getByText('Navigate to Login Screen')
        
        expect(loginButtun).toBeTruthy()
    })
})