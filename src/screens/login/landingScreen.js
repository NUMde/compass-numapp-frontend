
// (C) Copyright IBM Deutschland GmbH 2020.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { Component } from 'react'
import { Text } from 'react-native-elements'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import config from '../../config/configProvider'
import Banner from '../../components/banner/banner'
import Spinner from '../../components/spinner/spinner'
import ScrollIndicatorWrapper from '../../components/scrollIndicatorWrapper/scrollIndicatorWrapper'

/***********************************************************************************************
component:
renders the landing-screen
***********************************************************************************************/

class LandingScreen extends Component {

	/**
	* @constructor
	* @param  {object}    props
	* @param  {object}    props.navigation the navigation object provided by 'react-navigation'
	*/
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View style={localStyle.wrapper}>
				
				{/* loading spinner */}
				<Spinner visible={this.props.loading} />

				{/* banner */}
				<Banner 
					nav={this.props.navigation} 
					title={config.text.login.landing.title}
					subTitle={config.text.login.landing.subTitle}
					noWayBack
					noMenu
				/>

				{/* scollindicator */}
				<View style={{ ...localStyle.flexi, ...localStyle.wrapper }}>
					<ScrollIndicatorWrapper
						contentData={
							<View style={localStyle.wrapper}>
								
								{/* top elements title & text */}
								<View style={localStyle.top}>
									<Text style={localStyle.titleText}>{config.text.login.landing.welcomeTitle}</Text>
									<Text style={localStyle.infoText}>{config.text.login.landing.text}</Text>
								</View>

								{/* bottom login button */}
								<View style={localStyle.bottom}>
									<TouchableOpacity style={localStyle.button}
										onPress={() => {
											this.props.navigation.navigate('Login')
										}}
										accessibilityLabel={config.text.login.landing.buttonText}
										accessibilityRole={config.text.accessibility.types.button}
										accessibilityHint={config.text.accessibility.loginHint}
									>
										<Text style={localStyle.buttonLabel}>
											{config.text.login.landing.buttonText}
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						}
					/>
				</View>
			</View>
		)
	}
}

/***********************************************************************************************
localstyle
***********************************************************************************************/

const localStyle = StyleSheet.create({
	wrapper: {
		height: '100%',
		flexDirection: 'column',
		backgroundColor: config.theme.values.defaultBackgroundColor
	},

	flexi: {
		flex: 1,
	},

	top: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: config.appConfig.scaleUiFkt(35),
		marginBottom: config.appConfig.scaleUiFkt(35),
	},

	bottom: {
		flex: 1,
		justifyContent: 'flex-end',
		marginBottom: 36,
		height: '100%',
		marginTop: 20,
	},

	infoText: {
		marginTop: config.appConfig.scaleUiFkt(20),
		marginBottom: config.appConfig.scaleUiFkt(20),
		marginLeft: config.appConfig.scaleUiFkt(40),
		marginRight: config.appConfig.scaleUiFkt(40),
		textAlign: 'center',
		alignSelf: 'center',
		color: config.theme.colors.accent4,
		...config.theme.fonts.body,
	},

	titleText: {
		width: '80%',
		textAlign: 'center',
		alignSelf: 'center',
		...config.theme.fonts.header2,
	},

	button: {
		...config.theme.classes.buttonPrimary,
		bottom: 0,
		paddingTop: config.appConfig.scaleUiFkt(15),
		paddingBottom: config.appConfig.scaleUiFkt(15),
		paddingLeft: config.appConfig.scaleUiFkt(15),
		paddingRight: config.appConfig.scaleUiFkt(15),
		width: '80%',
	},

	buttonLabel: {
		...config.theme.classes.buttonLabel
	}
})

/***********************************************************************************************
export
***********************************************************************************************/

export default LandingScreen
