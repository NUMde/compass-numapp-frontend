
// (C) Copyright IBM Deutschland GmbH 2020.  All rights reserved.

// this file provides methods concerning the communication with the backend after the user
// is logged in.

/***********************************************************************************************
imports
***********************************************************************************************/

import axios from 'axios'

import store from '../../store'
import config from '../../config/configProvider'
import security from '../../services/encryption/encryption'
import localStorage from '../../services/localStorage/localStorage'

/***********************************************************************************************
support functions
***********************************************************************************************/

/**
 * creates the Bearer token
 * @param  {string} [token] access token
 */
const createAuthorizationToken = token => {
	let _store = store.getState().Login
	token = token || _store.session.accessToken
	return `Bearer ${token}`
}

/**
 * generates the encapsuled message that will be transmitted to the server.
 * also triggers the encryption
 * @param  {string} userId
 * @param  {string} type type of the message
 * @param  {object} body body to encrypt 
 */
const generateEncapsuledMessage = (userId, type, body = {}) => {
	let msg = {
		type,
		data: { 
			appId: userId
		}
	}
	if(body) msg.data.body = body

	let encryptedMsg = security.encrypt(msg)

	// console output
	if(config.appConfig.logEncryptedResponse) {
		console.log('THE ENCRYPTED QUESTIONNAIRE-RESPONSE:\n', encryptedMsg)
	}

	return {payload: encryptedMsg}
}

/***********************************************************************************************
clients
***********************************************************************************************/

// user handling
/*-----------------------------------------------------------------------------------*/

/**
 * gets the userId and calls the getUser-endpoint
 */
const getUserUpdate = async () => {
	let userId = store.getState().Login.userId
	if(!userId) userId = await localStorage.loadLastUserId()
	return axios.get(
		config.appConfig.endpoints.getUser + userId
	)
}

// reports
/*-----------------------------------------------------------------------------------*/

/**
 * sends out the encapsuled message
 * @param  {string} userId string identifying the user
 */
const sendReport = async userId => {
	return axios.post(
		config.appConfig.endpoints.report,
		generateEncapsuledMessage(userId, 'report'),
		{
			headers: {
				Authorization: createAuthorizationToken(),
				Accept: 'application/json',
			},
			params: {
				appId: userId,
				type: 'report',
				updateValues: {
					[config.appConfig.defaultReportAttribute]: true
				}
			}
		}
	)
}

// questionnaires
/*-----------------------------------------------------------------------------------*/

/**
 * 
 * @param  {object}  body questionnaire response
 * @param  {Object.<string, boolean>} triggerMap trigger that might be set if the rules are met
 * @param  {string}  userId string identifying the user
 * @param  {string}  surveyId string identifying the current questionnaire
 * @param  {string}  instanceId instance of the current questionnaire
 */
const sendQuestionnaire = async (body, triggerMap, userId, surveyId, instanceId) => {
	return axios.post(
		config.appConfig.endpoints.sendQuestionnare,
		generateEncapsuledMessage(userId, 'questionnaire_response', body ),
		{
			headers: {
				Authorization: createAuthorizationToken(),
				Accept: 'application/json',
			},
			params: {
				type: 'questionnaire_response',
				id: userId,
				appId: userId,
				surveyId,
				instanceId,
				updateValues: {
					...triggerMap
				}
			}
		}
	)
}

/**
 * procures the questionnaire from the backend
 * @param  {string} questionnaireId id of the questionnaire that the user is supposed to fill out 
 */
const getBaseQuestionnaire = async questionnaireId => {
	return axios.get(
		config.appConfig.endpoints.getQuestionnaire + questionnaireId,
		{
			headers: {
				Authorization: createAuthorizationToken(),
				Accept: 'application/json',
			}
		}
	)
}

/***********************************************************************************************
export
***********************************************************************************************/

export default {
	sendReport,
	getBaseQuestionnaire,
	sendQuestionnaire,
	getUserUpdate
}
