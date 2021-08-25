
// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import config from '../../config/configProvider'
import Banner from '../../components/banner/banner'
import Spinner from '../../components/spinner/spinner'
import CheckInTiles from '../../components/checkIn/checkInTiles'
import CheckInWelcomeText from '../../components/checkIn/welcomeText'
import CheckInListView from '../../components/checkIn/checkInListView'
import ScrollIndicatorWrapper from '../../components/scrollIndicatorWrapper/scrollIndicatorWrapper'

/***********************************************************************************************
component:
renders the checkIn-screen
***********************************************************************************************/

class CheckInScreen extends Component {
	
	/**
	 * @param  {object}   props
	 * @param  {boolean}  props.loading if true, shows the loading screen
	 * @param  {boolean}  props.error401 is true if there is a 401 error
	 * @param  {object}   props.navigation the navigation object provided by 'react-navigation'
 	 * @param  {Function} props.updateUser function to update the user
 	 * @param  {boolean}  props.categoriesLoaded is set to true as soon as the questionnaire was completely loaded
 	 * @param  {object}   props.questionnaireError holds the las error object
	 */
	constructor(props) {
		super(props)
	}

	// rendering
	/*-----------------------------------------------------------------------------------*/

	render() {
		return (
			<View style={localStyle.wrapper}>

				{/* loading spinner */}
				<Spinner visible={this.props.loading} />

				{/* banner at the top */}
				<Banner
					nav={this.props.navigation}
					title={config.text.survey.titleCheckIn}
					subTitle={config.text.survey.subTitleCheckIn}
					updateUser={this.props.updateUser}
					isCheckIn
					noWayBack
					categoriesLoaded={this.props.categoriesLoaded}
				/>

				{/*  center content */}
				<View style={{ ...localStyle.flexi, ...localStyle.wrapper }}>
					<ScrollIndicatorWrapper
						contentData={(
							<View>
								{/* if there is a questionnaire and no 401-error */}
								{
									!this.props.error401 && this.props.questionnaireError === null 
									&& 
									(<View style={{...localStyle.wrapper, ...localStyle.firstItem}}>
										{/* renders the listview item representing the questionnaire */}
										<CheckInListView {...this.props}></CheckInListView>
										{/* welcome text with due-date information */}
										<CheckInWelcomeText {...this.props}></CheckInWelcomeText>				
										{/* renders the button at the bottom */}
										<CheckInTiles {...this.props}></CheckInTiles>
									</View>)
								}

								{/* if there is an error */}
								{
									this.props.questionnaireError 
									&& 
									(<View style={{...localStyle.wrapper, ...localStyle.firstItem}}>
										{/* displays the welcome text */}
										<CheckInWelcomeText {...this.props}></CheckInWelcomeText>
									</View>)
								}
							</View>
						)}
					/>
				</View>
			</View>
		)
	}
}

/***********************************************************************************************
localStyle
***********************************************************************************************/

const localStyle = StyleSheet.create({

	wrapper: {
		height: '100%',
		flexDirection: 'column',
		backgroundColor: config.theme.values.defaultBackgroundColor
	},

	firstItem: {
		marginTop: config.appConfig.scaleUiFkt(30),
	},

	flexi: {
		flex: 1
	}
})

export default CheckInScreen
