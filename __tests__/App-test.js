import App from '../App'

import React from 'react'
import renderer from 'react-test-renderer'
import NavigationTestUtils from 'react-navigation/NavigationTestUtils'

jest.mock('../src/navigation/AppNavigator', () => 'AppNavigator')

describe('App', () => {
    jest.useFakeTimers()

    beforeEach(() => {
        NavigationTestUtils.resetInternalState()
    })

    it(`renders the loading screen`, () => {
        const tree = renderer.create(<App />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it(`renders the root without loading screen`, () => {
        const tree = renderer.create(<App skipLoadingScreen />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
