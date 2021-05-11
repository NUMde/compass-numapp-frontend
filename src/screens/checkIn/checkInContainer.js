// (C) Copyright IBM Deutschland GmbH 2020.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import { Alert} from 'react-native'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { Push } from 'bmd-push-react-native'

import store from '../../store'

import loggedInClient from '../../services/rest/loggedInClient'
import localStorage from '../../services/localStorage/localStorage'
import documentCreator from '../../services/questionnaireAnalyzer/questionnaireAnalyzer'

import SurveyScreen from './surveyScreen'
import * as actions from './checkInActions'
import CheckInScreen from './checkInScreen'
import config from '../../config/configProvider'

/***********************************************************************************************
component:
container for the login screen.
this container provides two screens: CheckInScreen and SurveyScreen - based on the current route.
those components therefor use the same actions and properties
***********************************************************************************************/

class CheckInContainer extends Component {


	// rendering
	/*-----------------------------------------------------------------------------------*/
	
	/**
	 * checks the current route name and renders the appropriate temmplate
	 */
	render() {
		
		return this.props.navigation.state.routeName === 'CheckIn' ? 
		// if on CheckIn route
		(
			<CheckInScreen
				{...this.props}
				getQuestionnaire={this.getQuestionnaire}
				exportAndUploadQuestionnaireResponse={this.exportAndUploadQuestionnaireResponse}
				sendReport={this.sendReport}
				updateUser={this.updateUser}
				formatDateString={this.formatDateString}
			/>
		) :
		// if on Survey route
		(
			<SurveyScreen
				{...this.props}
				exportAndUploadQuestionnaireResponse={this.exportAndUploadQuestionnaireResponse}
			/>
		)
	}

	// class events
	/*-----------------------------------------------------------------------------------*/
	
	/**
	 * triggers the update of the user afer mounting the chekckin-template
	 */
	componentDidMount = () => {
		if(this.props.navigation.state.routeName === 'CheckIn') {
			setTimeout(() => { 
				this.updateUser()
			}, 0)
		}
	}
	
	/**
	 * reroutes to the checkin-screen should no questionnaire be available after the
	 * component upated. When there is no questionnaire the survey-screen does not has
	 * any content to render
	 */
	componentDidUpdate = () => {
		if(!this.props.questionnaireItemMap) this.props.navigation.navigate('CheckIn')
	}

	// methods: push
	/*-----------------------------------------------------------------------------------*/
	
	/**
	 * registers the push notification service (if it hasnt happened before).
	   should it contain no deviceId the push-registration will be triggered
	 */
	registerPush = async () => {
		// creates the options-object for the push-registration and sends out the request
		Push.register({
			"subjectId": this.props.user.subjectId
		})
		.then(response => {
			// redux output
			this.props.actions.setupPushServiceSuccess()
			// persists the response as new notificationState.
			// this also contains the deviceId which prohibits the registration from
			// being triggered the next time
			localStorage.persistNotificationState(response)
		})
		.catch((err) => {
			// redux output
			this.props.actions.setupPushServiceFail()
		})
	}

	/**
	 * initializes the push-service-registration
	 */
	initPush = async () => {
		// gets the current user
		const sessionData = store.getState().CheckIn.user
		// gets the notificationState that was persisted last time - if there was no
		// last time then the initial value is FALSE
		const notificationState = await localStorage.loadNotificationState()

		// if there is a user
		if(sessionData && (!notificationState || !notificationState.deviceId)) {
			// redux output
			this.props.actions.setupPushServiceStart()
			// asks the user to allow push notifications
			Push.init({
				"appGUID": sessionData.pushAppGUID,
				"clientSecret": sessionData.pushClientSecret,
				"region": "eu-de"
			})
			.then(() =>  {
				// triggers the execution
				this.registerPush()
			})
			.catch(() => {
				// redux output
				this.props.actions.setupPushServiceFail()
			})
		}
	}

	// methods: procuring questionnaire
	/*-----------------------------------------------------------------------------------*/
	
	/**
	 * tries to procure the current questionnaire
	 */
	getQuestionnaire = async () => {
		// redux output
		this.props.actions.getQuestionnaireStart()
		
		// gets the questionnaire with the correct id
		await loggedInClient.getBaseQuestionnaire(this.props.user.current_questionnaire_id)
			// success
			.then(response => {
				setTimeout(async() => {
					// persists the questionnaire
					this.props.actions.getQuestionnaireSuccess(response.data || {})
				}, 0)
			})
			// fail: displays an alert window with an error output and updates the state on button-click
			.catch(error => {
				Alert.alert(
					config.text.generic.errorTitle,
					config.text.generic.sendError,
					[{
						text: config.text.generic.ok,
						onPress: () => {
							this.props.actions.getQuestionnaireFail(error || 'n/a')
						}
					}],
					{ cancelable: false }
				)
			})
	}

	// methods: updating user
	/*-----------------------------------------------------------------------------------*/
	
	/**
	 * displays an alert-window after failing to update the user
	 * @param  {object} error httperror
	 */
	updateUserFail = error => {
		Alert.alert(
			config.text.generic.info,
			config.text.generic.updateError,
			[
				{
					text: config.text.generic.ok,
					onPress: () => {
						this.props.actions.updateUserFail(error)
					}
				}
			],
			{ cancelable: false }
		)
	}

	/**
	 * is executed after the user was successfully received from the server.
	 * it triggers 
	 * @param {any} data
	 */
	updateUserSuccess = async data => {

		// TODO: remove workaround
		data.subjectId = data.study_id || data.subjectId || null

		// procures the id of the quationnaire used by the last active user
		let lastQuestionnaireId = await localStorage.loadLastQuestionnaireId()

		// checks if the current due date is still not reached
		if(this.props.user && this.props.user.due_date && new Date(this.props.user.due_date) < new Date()) {
			// deletes the questionnaire if it is reached
			await this.props.actions.deleteLocalQuestionnaire()
		}

		// persists the new data
		this.props.actions.updateUserSuccess(data)

		// tries to init the push service
		setTimeout(() => this.initPush(), 0)

		setTimeout(() => {
			// if we have locally persisted questionnaire
			if(lastQuestionnaireId && !this.props.noNewQuestionnaireAvailableYet) {
				// checks if the id of the persisted questionaiire matches the one of the
				// questionnaire the user is supposed to look at now
				if( config.appConfig.skipIncomingQuestionnaireCheck || lastQuestionnaireId === data.current_questionnaire_id) {
					// loads the persistet questionnaire
					this.checkForCachedData()
				}
				else {
					// deletes the locally persisted questionnaire, as it does not matches
					// the one the user is supposed to look at
					setTimeout(() => {
						this.deleteLocalQuestionnaireData()
					}, 0)
				}
			}
			else {
				// deletes the local questionnaire data if the data from the server shows
				// a due date that lies behind the current data
				if(data.due_date && data.due_date < new Date()) {
					this.deleteLocalQuestionnaireData()
				}
				// tries to procure a new questionnaire if possible
				if(!this.props.noNewQuestionnaireAvailableYet) {
					setTimeout(async() => {
						await this.getQuestionnaire()
					}, 0)
				}
			}
		}, 0)
	}

	/** updates the current user. if a userdata object is used with the function
	 * it will just take that one and trigger updateUserSuccess() with it
	 * @param  {object} [userdata]
	 */
	updateUser = async userdata => {

		// redux output
		this.props.actions.updateUserStart()

		if(userdata) {
			// skips the rest call
			await this.updateUserSuccess(userdata)
		}
		else {
			// gets the user from the server
			await loggedInClient.getUserUpdate()
			.then(
				async (res) => await this.updateUserSuccess(res.data),
				async (error) => await this.updateUserFail(error)
			)
		}
	}

	// methods: cache data handling
	/*-----------------------------------------------------------------------------------*/
	
	/**
	 * checks if a questionnaire and its answers might have been persisted in a previous
	 * session. if so it will be loaded, if not a new one from the server procured
	 */
	checkForCachedData = async () => {

		// gets the locally persisted questionnaireItemMap (if there is one)
		let map = await localStorage.loadQuestionnaireItemMap()
		// gets the locally persisted categories-set (if there is one)
		let list = await localStorage.loadCategories()		

		// loads it as current questionnaire including answers (if both objects are present)
		if(map && list) {
			this.props.actions.loadLocalQuestionnaire(map, list)
		}
		// loads the current questionnaire from the server
		else {
			setTimeout(() => {
				this.getQuestionnaire()
			}, 250)
		}
	}

	/**
	 * displays an alert and triggers the deletion of the local questionnaire
	 */
	deleteLocalQuestionnaireData = async () => {
		setTimeout(() => {
			Alert.alert(
				config.text.generic.info,
				config.text.generic.infoRemoval,
				[{
					text: config.text.generic.ok,
					onPress: async () => {
						await this.props.actions.deleteLocalQuestionnaire()
						
						setTimeout(() => {
							this.getQuestionnaire()
						}, 0)
					}
				}],
				{ cancelable: false }
			)
		}, 0)	
	}

	// methods: export
	/*-----------------------------------------------------------------------------------*/

	/**
	 * triggers the action to handle the failure of the export and shows an alert window
	 * with an error message
	 * @param  {object} error http error
	 */
	exportAndUploadQuestionnaireResponseFail = error => {

		this.props.actions.sendQuestionnaireResponseFail(error)

		setTimeout(() => { 
			Alert.alert( 
				config.text.generic.errorTitle, 
				config.text.generic.sendError
			) 
		}, 0)
	}

	/**
	 * handles the export success, deletes the local questionnaire and then updates the user
	 * @param  {object} response http response
	 */
	exportAndUploadQuestionnaireResponseSuccess = async response => {
		this.props.actions.sendQuestionnaireResponseSuccess(response)
		this.props.actions.deleteLocalQuestionnaire()

		setTimeout(async () => {
			await this.updateUser(response.data)
		}, 0)
		
		setTimeout(() => {
			Alert.alert( config.text.generic.successTitle, config.text.generic.sendSuccess )
		}, 0)	
	}

	/**
	 * creates the questionnaire-response and sends it out
	 */
	exportAndUploadQuestionnaireResponseStart = () => {
		// redux output
		this.props.actions.sendQuestionnaireResponseStart()

		/** generates the response-json 
		 * @type {ExportData}
		*/
		let exportData = documentCreator.createResponseJSON()
		
		// sends the questionnaire
		loggedInClient
			.sendQuestionnaire(
				exportData.body,
				exportData.triggerMap,
				this.props.user.subjectId,
				this.props.user.current_questionnaire_id,
				this.props.user.current_instance_id
			)
			.then(
				(response) => this.exportAndUploadQuestionnaireResponseSuccess(response), 
				(error) => this.exportAndUploadQuestionnaireResponseFail(error)
			)
	}

	/**
	 * checks if the questionnaire was completed and if true triggers the export
	 */
	exportAndUploadQuestionnaireResponse = () => {
		// if the questionnaire was NOT completed
		if(this.props.questionnaireItemMap && !this.props.questionnaireItemMap.done) {
			// shows a message remembering the user to complete the questionnaire
			Alert.alert(
				config.text.generic.info,
				config.text.survery.sendUnfinishedMessageDenied,
				[{
					text: config.text.generic.ok
				}],
				{ cancelable: false }
			)
		}
		// shows a confirmation dialog if the questionnaire is completed.
		// triggers the call if confirmed
		else {
			Alert.alert(
				config.text.generic.info,
				config.text.survery.sendFinishedMessage,
				[{
						text: config.text.survery.sendFinished,
						onPress: this.exportAndUploadQuestionnaireResponseStart
				},
				{
					text: config.text.generic.abort,
					style: "cancel"
				}],
				{ cancelable: false }
			)
		}
	}

	// methods: special report
	/*-----------------------------------------------------------------------------------*/

	/**
	 * handles the failur after sending a report
	 * @param  {object} error http error
	 */
	sendReportFail = error => {

		this.props.actions.sendReportFail(error)

		setTimeout(() => {
			Alert.alert(
				config.text.generic.info,
				config.text.generic.sendError,
				[
					{
					text: config.text.generic.ok,
						onPress: () => {
							setTimeout(() => this.props.navigation.navigate('Home'), 0)
						}
					}
				],
				{ cancelable: false }
			)
		}, 0)
	}

	/**
	 * handles the success after sending a report
	 * @param  {object} response http response
	 */
	sendReportSuccess = response => {
		this.props.actions.sendReportSuccess(response)

		setTimeout(() => {
			Alert.alert(
				config.text.reporting.symptoms_success_header,
				config.text.reporting.symptoms_success_message,
				[
					{
					text: config.text.reporting.symptoms_success_ok,
						onPress: () => {
							setTimeout(() => this.props.navigation.navigate('Home'), 0)
							this.updateUser()
						}
					}
				],
				{ cancelable: false }
			)
		}, 0)
	}

	/**
	 * just sends out the report
	 */
	sendReportStart = () => {
		this.props.actions.sendReportStart()
							
		loggedInClient.sendReport(this.props.user.subjectId).then(
			response => this.sendReportSuccess(response),
			error => this.sendReportFail(error)
		)
	}
	
	/**
	 * shows the user an alert window to confirm the action, then sneds the report.
	 * is only availabe if there is no current questionnaire available and if the user is not 
	 * already on a special iteration
	 */
	sendReport = () => {
		// if the user is still on a special iteration
		if(this.props.user && this.props.user.additional_iterations_left) {
			// shows a dialog telling the user that he/she already send out a report
			Alert.alert(
				config.text.generic.info,
				config.text.generic.reportWhileInIteratedMode,
				[{
					text: config.text.generic.ok
				}],
				{ cancelable: false }
			)
		}
		// if there is a questionnaire available right now
		else if(!this.props.noNewQuestionnaireAvailableYet) {
			// dialog telling the user to use the current questionnaire
			Alert.alert(
				config.text.generic.info,
				config.text.generic.reportWhileQuestionnaire,
				[
					{
						text: config.text.generic.ok
					}
				],
				{ cancelable: false }
			)
		}
		// shows an alert and sends out the report
		else {
			Alert.alert(
				config.text.reporting.symptoms_header,
				config.text.reporting.symptoms_question,
				[
					{
					text: config.text.reporting.symptoms_yes,
						onPress: () => {
							//sennds out the report
							this.sendReportStart()
						}
					},
					{
						text: config.text.reporting.symptoms_no,
						style: "cancel"
					},
				],
				{ cancelable: false }
			)
		}
	}

	// support
	/*-----------------------------------------------------------------------------------*/
	
	/**
	 * generates a datestring from Date Object (dd.mm.yyyy)
	 * @param  {Date}    inputDate the input date
	 * @param  {boolean} includeTime if true: the exported string will also contain the time
	 */
	formatDateString = (inputDate, includeTime) => {
		
		let date = new Date(inputDate)
		let numericMonth = date.getMonth()

		numericMonth++
		
		let monthString = numericMonth.toString()
		let dayString = date.getDate().toString()
		let hourString = date.getHours().toString()
		let minutesString = date.getMinutes().toString()

		if(dayString.length==1) dayString = '0' + dayString
		if(monthString.length==1) monthString = '0' + monthString
		if(hourString.length==1) hourString = '0' + hourString
		if(minutesString.length==1) minutesString = '0' + minutesString
	
		let dateString = dayString + '.' + monthString + '.' + date.getFullYear()
		if(includeTime) dateString = dateString + ', ' + hourString + ':' + minutesString
		
		return dateString
	}
}

/***********************************************************************************************
redux
***********************************************************************************************/

const mapStateToProps = state => state.CheckIn

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(actions, dispatch),
	}
}

const ConnectedCheckIn = connect(mapStateToProps, mapDispatchToProps)(CheckInContainer)

/***********************************************************************************************
export
***********************************************************************************************/

export { ConnectedCheckIn as CheckIn }
