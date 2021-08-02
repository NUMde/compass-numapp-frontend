
// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React from 'react'
import renderer from 'react-test-renderer'
import NavigationTestUtils from 'react-navigation/NavigationTestUtils'

import App from '../App'
import LandingScreen from '../src/screens/login/landingScreen'
import LoginScreen from '../src/screens/login/loginScreen'
import CheckInScreen from '../src/screens/checkIn/checkInScreen'
import AboutScreen from '../src/screens/about/aboutScreen'
import LegalInformationScreen from '../src/screens/about/legalInformationScreen'
import WebViewScreen from '../src/screens/about/webViewScreen'
import SurveyScreen from '../src/screens/checkIn/surveyScreen'

/***********************************************************************************************
mock properties
***********************************************************************************************/

let props = {
    login: {
        actions: {
            logout: () => true
        }
    },

    about: {
        actions: {
            hideModal: () => true
        },
        modalLink: {
            title: 'test'
        }
    }
}

/***********************************************************************************************
base tests
***********************************************************************************************/

describe('App Start', () => {
    
    jest.useFakeTimers()

    beforeEach(() => {
        NavigationTestUtils.resetInternalState()
    })

    it(`renders the app`, () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it(`renders the landing screen`, () => {
        const tree = renderer.create(<LandingScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('renders the login screen', async () => {
        const tree = renderer.create(<LoginScreen {...props.login}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it(`renders the checkin screen`, () => {
        const tree = renderer.create(<CheckInScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it(`renders the legalinforamtion screen`, () => {
        const tree = renderer.create(<LegalInformationScreen/>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it(`renders the about screen`, () => {
        const tree = renderer.create(<AboutScreen {...props.about}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it(`renders the webview screen`, () => {
        const tree = renderer.create(<WebViewScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it(`renders the survey screen`, () => {
        const tree = renderer.create(<SurveyScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})