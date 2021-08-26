
// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import  React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

import config from '../../config/configProvider'

/***********************************************************************************************
component
***********************************************************************************************/

class WelcomeText extends Component {

	/**
	* renders a welcome text composed of multiple strings (originating from 'src/config/textConfig.js)
	* and a formatted Date-string (representing the due date of the current questionnaire or the 
	* start date of the next one)
	* @constructor
	* @param  {object}      props
	* @param  {object}      props.user holds the userdata
	* @param  {object}      props.navigation the navigation object provided by 'react-navigation'
	* @param  {object}      props.questionnaireError the return object should the sendQuestionnaire 
		function produce an error
	* @param  {boolean}     props.firstTime true if the user never sent out the first questionnaire
	* @param  {boolean}     props.error401 true if the user was rejected by the backend
	* @param  {boolean}     props.noNewQuestionnaireAvailableYet true if there is currently no 
		questionnaire available
	* @param  {Function}    props.formatDateString formats a date string
	*/
    constructor(props) {
        super(props)
	}
	
	// rendering
	/*-----------------------------------------------------------------------------------*/

	render() {
		return (
			<View style={localStyle.wrapper}>
				{/* if there is no authentication error or sending error */}
				{
					(!this.props.error401 && this.props.questionnaireError === null )
					&& 
					(<View>
						{/* title text: depends on the params 'firstTime' & 'noNewQuestionnaireAvailableYet'*/}
						<Text style={localStyle.welcomeText}> 
							{ this.props.firstTime ? 
								config.text.survey.welcomeTitleFirstTime : 
									this.props.noNewQuestionnaireAvailableYet ?
										config.text.survey.noNewQuestionnaireAvailableYetTitle :
											config.text.survey.welcomeTitle }
						</Text>
	
						{/* if this is a new user */}
						{this.props.firstTime && this.props.user && (
							<Text  style={localStyle.infoText}>
								{config.text.survey.welcomeTextFirstTimeUser1}
								<Text style={{...localStyle.timeTextSmall}}>
									{ this.props.formatDateString(this.props.user.due_date, true) }.
								</Text>
								{config.text.survey.welcomeTextFirstTimeUser2}
							</Text>
						)}
	
						{/* if this is not a first-time-user and NO new questionnaire is currently available */}
						{!this.props.firstTime && this.props.noNewQuestionnaireAvailableYet && (
							<Text style={localStyle.infoText}>
								{config.text.survey.noNewQuestionnaireAvailableYet}
							</Text>
						)}
	
						{/* if this is not a first-time-user and A questionnaire is currently available */}
						{!this.props.firstTime && !this.props.noNewQuestionnaireAvailableYet && (
							<View>
								<Text style={localStyle.infoText}>
									{config.text.survey.welcomeTextUser}
								</Text>
								<Text style={{...localStyle.timeText}}>
									{ this.props.formatDateString(this.props.user.due_date, true) }.
								</Text>
							</View>
						)}
	
						{/* if this is not a first-time-user and NO new questionnaire is currently available */}
						{!this.props.firstTime && this.props.noNewQuestionnaireAvailableYet && (
							<View>
								<Text style={localStyle.timeText}>
									{config.text.survey.nextOne}
								</Text>
								<Text style={{...localStyle.timeText, ...localStyle.timeTextGreen}}>
									{ this.props.formatDateString(this.props.user.start_date, true) }.
								</Text>
							</View>
						)}
	
						{/* if this is a first-time-user and A questionnaire is currently available */}
						{this.props.firstTime && this.props.noNewQuestionnaireAvailableYet &&(
							<View>
								<Text style={localStyle.timeText}>
									{config.text.survey.nextOneNew}
								</Text>
								<Text style={{...localStyle.timeText, ...localStyle.timeTextGreen}}>
									{ this.props.formatDateString(this.props.user.start_date, true) }.
								</Text>
							</View>
						)}
	
						<Text style={localStyle.infoText}>
							{config.text.survey.furtherInfo}
						</Text>
					</View>)
				}
	
				{/* if the user update came back with an authentication error */}
				{(this.props.error401) && (
					<View>
						<Text style={{...localStyle.welcomeText, ...localStyle.welcomeTextRed}}> 
							{config.text.survey.noUserTitle }
						</Text>
	
						<Text style={localStyle.infoText}>
							{config.text.survey.noUserText}
						</Text>
	
					</View>
				)}
	
				{/* if there occurred an error while transmitting a questionnaire */}
				{this.props.questionnaireError && (
					<View>
						<Text style={{...localStyle.welcomeText, ...localStyle.welcomeTextRed}}> 
							{config.text.survey.noQuestionnaireTitle}
						</Text>
	
						<Text style={localStyle.infoText}>
							{config.text.survey.noQuestionnaireText}
						</Text>
	
					</View>
				)}
			</View>
		)
	}
}

/***********************************************************************************************
local styling
***********************************************************************************************/

const localStyle = StyleSheet.create({
	wrapper: {
		marginLeft: config.appConfig.scaleUiFkt(30),
		marginRight: config.appConfig.scaleUiFkt(30),
		marginBottom: config.appConfig.scaleUiFkt(25),
	},

    welcomeText: {
		...config.theme.fonts.title,
		textAlign: 'center',
		alignSelf: 'center',
		color: config.theme.values.defaultTitleTextColor
	},

	welcomeTextRed: {
		color: config.theme.colors.alert
	},

	infoText: {
		marginTop: config.appConfig.scaleUiFkt(20),
		textAlign: 'center',
		color: config.theme.values.defaultParagraphTextColor,
		alignSelf: 'center',
		...config.theme.fonts.body
	},

	timeText: {
		marginTop: config.appConfig.scaleUiFkt(20),
		textAlign: 'center',
		color: config.theme.colors.accent4,
		alignSelf: 'center',
		...config.theme.fonts.bold
	},

	timeTextSmall: {
		...config.theme.fonts.label
	},

	timeTextGreen: {
		color: config.theme.values.defaultTimeSuccessColor
	},
})

/***********************************************************************************************
export
***********************************************************************************************/

export default WelcomeText
