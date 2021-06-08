
// (C) Copyright IBM Deutschland GmbH 2020.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import { Alert } from 'react-native'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'

import text from '../../config/textConfig'

import AboutScreen from './aboutScreen'
import WebViewScreen from './webViewScreen'
import LegalInformationScreen from './legalInformationScreen'
import * as actions from './aboutActions'

/***********************************************************************************************
component:
container for the about screen
***********************************************************************************************/

class AboutContainer extends Component {
	
	/**
	* @constructor
	* @param  {object}    props
	* @param  {object}    props.actions holds actions for the component (./aboutActions.js)
	* @param  {object}    props.navigation the navigation object provided by 'react-navigation'
	*/
	constructor(props) {
		super(props)
	}

	// rendering
	/*-----------------------------------------------------------------------------------*/
	
	render() {
		// checks if the currently selected route equals 'About'
		return this.props.navigation.state.routeName === 'About' ? 
		// then renders the About Screen
		(<AboutScreen {...this.props}  clearAll={this.clearAll} logout={this.logout}/>) :
		// checks if the currently selected route equals 'LegalInformation'
		this.props.navigation.state.routeName === 'LegalInformation' ? 
		// then renders the LegalInformation Screen 
		(<LegalInformationScreen {...this.props}/>) :
		// if on WebView route
		(<WebViewScreen {...this.props}/>)
	}

	// class methods
	/*-----------------------------------------------------------------------------------*/

	/**
	 * shows a confirmation-dialog. if confirmed, it deletes the local data, logs the user
	 * out and navigates back to the landing-screen.
	 */
	clearAll = () => {
		Alert.alert(
			text.generic.warning,
			text.generic.eraseAllWarning,
			[
				{
					text: text.generic.delete,
					onPress: () => {
						this.props.actions.deleteLocalData()

						setTimeout(() => {
							this.props.actions.logout()
							this.props.navigation.navigate('Landing')
						}, 0)
					}
				},
				{
					text: text.generic.abort,
					style: "cancel"
				},
			],
			{ cancelable: false }
		)
	}

	/**
	 * shows a confirmation-dialog. if confirmed, it logs the user
	 * out and navigates back to the landing-screen.
	 */
	logout = () => {
		Alert.alert(
			text.generic.warning,
			text.generic.logoutWarning,
			[
				{
					text: text.generic.goBack,
					onPress: () => {
						this.props.actions.logout()
						setTimeout(() => {
							this.props.navigation.navigate('Landing')
						}, 0)
					}
				},
				{
					text: text.generic.abort,
					style: "cancel"
				},
			],
			{ cancelable: false }
		)
	}
}

/***********************************************************************************************
redux
***********************************************************************************************/

// connects the redux-state with the local props and enables dispatching actions from it.
// updated properties are then available from the state. actions can be accessed through
// props.actions.

const mapStateToProps = state => state.About

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(actions, dispatch),
	}
}

const ConnectedAbout = connect(mapStateToProps, mapDispatchToProps)(AboutContainer)

/***********************************************************************************************
export
***********************************************************************************************/

export { ConnectedAbout as About }
