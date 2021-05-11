
// (C) Copyright IBM Deutschland GmbH 2020.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'

import config from '../../config/configProvider'
import localStorage from '../../services/localStorage/localStorage'

import LoginScreen from './loginScreen'
import LandingScreen from './landingScreen'
import * as actions from './loginActions'

/***********************************************************************************************
component:
container for the login screen
***********************************************************************************************/

class LoginContainer extends Component {
	
	/**
	* @constructor
	* @param  {object}    props
	* @param  {string}    props.subjectId holds the subjectId that is used to log in
	* @param  {object}    props.actions holds actions for the component (./loginActions.js)
	* @param  {boolean}   props.loggedIn if true: user is looged in
	* @param  {object}    props.navigation the navigation object provided by 'react-navigation'
	*/
	constructor(props) {
		super(props)
	}

	// rendering
	/*-----------------------------------------------------------------------------------*/

	render() {
		// checks the currently selected route
		return this.props.navigation.state.routeName === 'Login' ? 
		// if on Login route
		(<LoginScreen {...this.props} scanSuccess={this.scanSuccess}/>) :
		// if on Landing route
		(<LandingScreen {...this.props}/>)
	}

	// events
	/*-----------------------------------------------------------------------------------*/
	
	/**
	 * if the user is navigated to this screen the logout will be triggered automatically
	 * after the component mounted (to clean the state). also triggers the auto-login if 
	 * configured in appConfig.js
	 */
	componentDidMount = () => {
		// logout of an existing user 
		if(this.props.subjectId) this.props.actions.logout()
		
		// triggers the auto-login when on the login-screen (only on DEV)
		if(config.appConfig.automateQrLogin && this.props.navigation.state.routeName === 'Login') {
			// parses the input string to determin the subjectId (from the qr-code)
			let subjectId = this.checkQrCodeForUsername(config.appConfig.automateQrLoginSubjectId || '')
			// sets the subjectId defined in appConfig.js
			this.props.actions.updateSubjectId(subjectId)
			// triggers the login
			setTimeout(() => this.props.actions.sendCredentials(subjectId), 1000)
		} 
		else {
			this.autoLoginLastUser()
		}
	}

	/**
	 * checks after each update if the user is logged in and (if yes) navigates to the checkin-screen
	 */
	componentDidUpdate = () => {
		if (this.props.loggedIn) this.props.navigation.navigate('CheckIn')
	}

	// class methods
	/*-----------------------------------------------------------------------------------*/

	/**
	 * tries to log in the last persisted user, is triggered by componentDidMount()
	 */
	autoLoginLastUser = async () => {

		// gets the last user from the AsyncStore
		let lastSubjectId = await localStorage.loadLastSubjectId()

		// logs the user in
		if(lastSubjectId) {
			this.props.actions.autoLoginLastUser()
			this.props.actions.sendCredentials( lastSubjectId )
		}		
	}

	/**
	 * tries to parse the input-string and returns the subjectId (from the qr-code)
	 * @param  {string} str string to be checked
	 * @returns {string}
	 */
	checkQrCodeForUsername = str => {
		let subjectId
		try {
			let qrCode = JSON.parse(str)
			if(qrCode[config.appConfig.qrCodeAttributeHoldingTheAppIdentifier] === config.appConfig.appIdentifier) subjectId = qrCode[config.appConfig.qrCodeAttributeHoldingTheSubjectId]
		} catch (e) {
			return ''
		}
		// returns the id or an e
		return subjectId || '' 
	}
	
	/**
	 * is triggered when the qr-scann is getting something.
	 * basically checks if it is a qr-code, then tries to parse it and uses the result
	 * for a login-attempt
	 * @param  {{data: string}} scanResult scan result from the qr-code scanner
	 * @param  {any} camera camera refenrence
	 */
	scanSuccess = (scanResult, camera) => {
		// parses the input string to determin the subjectId (from the qr-code)
		let subjectId = this.checkQrCodeForUsername(scanResult.data)
		// sets the subjectId defined in appConfig.js
		this.props.actions.updateSubjectId(subjectId)
		// triggers the login
		setTimeout(() => this.props.actions.sendCredentials(subjectId, camera), 500)
	}
}

/***********************************************************************************************
redux
***********************************************************************************************/

// connects the redux-state with the local props and enables dispatching actions from it.
// updated properties are then available from the state. actions can be accessed through
// props.actions.

const mapStateToProps = state => state.Login

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(LoginContainer)

/***********************************************************************************************
export
***********************************************************************************************/

export { ConnectedLogin as Login }