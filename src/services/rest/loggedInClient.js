
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
 * @param  {string} subjectId
 * @param  {string} type type of the message
 * @param  {object} body body to encrypt 
 */
const generateEncapsuledMessage = (subjectId, type, body = {}) => {
	let msg = {
		type,
		data: { 
			subjectId: subjectId
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
 * gets the subjectId and calls the getUser-endpoint
 */
const getUserUpdate = async () => {
	let subjectId = store.getState().Login.subjectId
	if(!subjectId) subjectId = await localStorage.loadLastSubjectId()
	return axios.get(
		config.appConfig.endpoints.getUser + subjectId
	)
}

// reports
/*-----------------------------------------------------------------------------------*/

/**
 * sends out the encapsuled message
 * @param  {string} subjectId string identifying the user
 */
const sendReport = async subjectId => {
	return axios.post(
		config.appConfig.endpoints.report,
		generateEncapsuledMessage(subjectId, 'report'),
		{
			headers: {
				Authorization: createAuthorizationToken(),
				Accept: 'application/json',
			},
			params: {
				subjectId: subjectId,
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
 * @param  {string}  subjectId string identifying the user
 * @param  {string}  surveyId string identifying the current questionnaire
 * @param  {string}  instanceId instance of the current questionnaire
 */
const sendQuestionnaire = async (body, triggerMap, subjectId, surveyId, instanceId) => {
	return axios.post(
		config.appConfig.endpoints.sendQuestionnaire,
		generateEncapsuledMessage(subjectId, 'questionnaire_response', body ),
		{
			headers: {
				Authorization: createAuthorizationToken(),
				Accept: 'application/json',
			},
			params: {
				type: 'questionnaire_response',
				id: subjectId,
				subjectId: subjectId,
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
