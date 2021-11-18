// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

// this file provides methods concerning the communication with the backend after the user
// is logged in.

/***********************************************************************************************
imports
***********************************************************************************************/

import axios from 'axios';

import store from '../../store';
import { appConfig } from '../../config';
import security from '../encryption/encryption';
import localStorage from '../localStorage/localStorage';

/***********************************************************************************************
support functions
***********************************************************************************************/

/**
 * creates the Bearer token
 * @param  {string} [token] access token
 */

const createAuthorizationToken = (token) => {
  if (token) {
    return `Bearer ${token}`;
  }
  return `Bearer ${store.getState().Login.session.accessToken}`;
};

/**
 * generates the encapsuled message that will be transmitted to the server.
 * also triggers the encryption
 * @param  {string} subjectId
 * @param  {string} type type of the message
 * @param  {object} body body to encrypt
 */
const generateEncapsuledMessage = (subjectId, type, body = {}) => {
  const msg = {
    type,
    data: {
      subjectId,
    },
  };
  if (body) msg.data.body = body;

  const encryptedMsg = security.encrypt(msg);

  // console output
  if (appConfig.logEncryptedResponse) {
    console.log('THE ENCRYPTED QUESTIONNAIRE-RESPONSE:\n', encryptedMsg);
  }

  return { payload: encryptedMsg };
};

/***********************************************************************************************
clients
***********************************************************************************************/

// user handling
/*-----------------------------------------------------------------------------------*/

/**
 * gets the subjectId and calls the getUser-endpoint
 */
const getUserUpdate = async () => {
  let { subjectId } = store.getState().Login;
  if (!subjectId) subjectId = await localStorage.loadLastSubjectId();
  return axios.get(appConfig.endpoints.getUser + subjectId);
};

// push
/*-----------------------------------------------------------------------------------*/

/**
 * updates the backend with the current FCM token
 * @param  {string} subjectId string identifying the user
 * @param  {string} token the token
 */
const updateDeviceToken = async (subjectId, token) =>
  axios.post(
    appConfig.endpoints.updateToken + subjectId,
    {
      token,
    },
    {
      headers: {
        Authorization: createAuthorizationToken(),
        Accept: 'application/json',
      },
    },
  );

// reports
/*-----------------------------------------------------------------------------------*/

/**
 * sends out the encapsuled message
 * @param  {string} subjectId string identifying the user
 */
const sendReport = async (subjectId) =>
  axios.post(
    appConfig.endpoints.report,
    generateEncapsuledMessage(subjectId, 'report'),
    {
      headers: {
        Authorization: createAuthorizationToken(),
        Accept: 'application/json',
      },
      params: {
        subjectId,
        type: 'report',
        updateValues: {
          [appConfig.defaultReportAttribute]: true,
        },
      },
    },
  );

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
const sendQuestionnaire = async (
  body,
  triggerMap,
  subjectId,
  surveyId,
  instanceId,
) =>
  axios.post(
    appConfig.endpoints.sendQuestionnaire,
    generateEncapsuledMessage(subjectId, 'questionnaire_response', body),
    {
      headers: {
        Authorization: createAuthorizationToken(),
        Accept: 'application/json',
      },
      params: {
        type: 'questionnaire_response',
        id: subjectId,
        subjectId,
        surveyId,
        instanceId,
        updateValues: {
          ...triggerMap,
        },
      },
    },
  );

/**
 * procures the questionnaire from the backend
 * @param  {string} questionnaireId id of the questionnaire that the user is supposed to fill out
 */
const getBaseQuestionnaire = async (questionnaireId) =>
  axios.get(appConfig.endpoints.getQuestionnaire + questionnaireId, {
    headers: {
      Authorization: createAuthorizationToken(),
      Accept: 'application/json',
    },
  });

/***********************************************************************************************
export
***********************************************************************************************/

export default {
  sendReport,
  getBaseQuestionnaire,
  sendQuestionnaire,
  getUserUpdate,
  updateDeviceToken,
};