
// (C) Copyright IBM Deutschland GmbH 2020.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import { Provider } from 'react-redux'
import React, { Component } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { StyleSheet, View, StatusBar, LogBox, Platform } from 'react-native'

import config from './src/config/configProvider'

import reduxStore from './src/store'
import createAppNavigator from './src/navigation/appNavigator'

/***********************************************************************************************
Component
***********************************************************************************************/

class App extends Component {

	/**
	 * creates the appNavigator and provides the initial view
	 * @constructor
	 * @param  {object} props
	 */	
    constructor(props) {
        super(props)
	}
	
	render() {
		
		// hides the splash screen
		SplashScreen.hide()

		// creates the navigator
		const Navigator = createAppNavigator()
		
		// and returns the basic view that contains the navigator
		return (
			<View style={localStyle.container}>

				{Platform.OS === "ios" && (
					<StatusBar barStyle={config.theme.values.defaultStatusBarStyleIos} />
				)}

				{Platform.OS === "android" && (
					<StatusBar barStyle={config.theme.values.defaultStatusBarStyleAndroid}  backgroundColor={config.theme.values.defaultStatusBarAndroidBackgroundColor} />
				)}

				<Provider store={reduxStore}>
					<Navigator style={localStyle.container} />
				</Provider>
			</View>
		)
	}
}

/***********************************************************************************************
local styling
***********************************************************************************************/

const localStyle = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
})

/***********************************************************************************************
global variables / settings
***********************************************************************************************/

// both needed by node-forge for the encryption functionality
global.btoa = require('btoa')

// deactivates the logbox-warning about the debugger running in the background
LogBox.ignoreLogs(['Remote debugger'])

/***********************************************************************************************
export
***********************************************************************************************/

export default App
