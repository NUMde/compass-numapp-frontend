// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

// this file provides methods concerning the communication with the backend before the user
// is logged in.

/***********************************************************************************************
imports
***********************************************************************************************/

import axios from 'axios';
import config from '../config/configProvider';
import encrypt from './encryption';

/***********************************************************************************************
guest client functions
***********************************************************************************************/

/**
 * @param  {string} subjectId the id used to identify the user
 */
const login = (subjectId) =>
  axios.get(config.appConfig.endpoints.login + subjectId);

/**
 * procures the list of languages
 */
const getLanguages = async () =>
  axios.get(config.appConfig.endpoints.getLanguages, {
    headers: {
      Accept: 'application/json',
    },
  });

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
};

/**
 * generates the encapsuled message that will be transmitted to the server.
 * also triggers the encryption
 * @param  {string} subjectId
 * @param  {string} type type of the message
 * @param  {object} body body to encrypt
 */
const generateEncapsuledMessage = (subjectId, type, certString, body = {}) => {
  const msg = {
    type,
    data: {
      subjectId,
    },
  };
  if (body) msg.data.body = body;

  const encryptedMsg = encrypt(msg, certString);

  // console output
  if (config.appConfig.logEncryptedResponse) {
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
const getUserUpdate = async (subjectId) => {
  return axios.get(config.appConfig.endpoints.getUser + subjectId);
};

// language
/*-----------------------------------------------------------------------------------*/

/**
 * updates the backend with the chosen language
 * @param  {string} subjectId string identifying the user
 * @param  {string} languageCode the language code
 */
const updateLanguageCode = async (subjectId, languageCode) =>
  axios.post(
    config.appConfig.endpoints.updateLanguage + subjectId,
    {
      language: languageCode,
    },
    {
      headers: {
        Authorization: createAuthorizationToken(subjectId),
        Accept: 'application/json',
      },
    },
  );

// push
/*-----------------------------------------------------------------------------------*/

/**
 * updates the backend with the current FCM token
 * @param  {string} subjectId string identifying the user
 * @param  {string} token the token
 */
const updateDeviceToken = async (subjectId, token) =>
  axios.post(
    config.appConfig.endpoints.updateToken + subjectId,
    {
      token,
    },
    {
      headers: {
        Authorization: createAuthorizationToken(subjectId),
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
const sendReport = async (subjectId, certString) =>
  axios.post(
    config.appConfig.endpoints.report,
    generateEncapsuledMessage(subjectId, 'report', certString),
    {
      headers: {
        Authorization: createAuthorizationToken(subjectId),
        Accept: 'application/json',
      },
      params: {
        subjectId,
        type: 'report',
        updateValues: {
          [config.appConfig.defaultReportAttribute]: true,
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
 * @param  {string}  certString the certificate containing the public key with which the response shall be encrypted
 */
const sendQuestionnaire = async (
  body,
  triggerMap,
  subjectId,
  surveyId,
  instanceId,
  certString,
) =>
  axios.post(
    config.appConfig.endpoints.sendQuestionnaire,
    generateEncapsuledMessage(
      subjectId,
      'questionnaire_response',
      certString,
      body,
    ),
    {
      headers: {
        Authorization: createAuthorizationToken(subjectId),
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
const getBaseQuestionnaire = async (questionnaireId, subjectId, langCode) =>
  axios.get(
    `${config.appConfig.endpoints.getQuestionnaire}${encodeURIComponent(
      questionnaireId,
    )}/${langCode}`,
    {
      headers: {
        Authorization: createAuthorizationToken(subjectId),
        Accept: 'application/json',
      },
    },
  );

/***********************************************************************************************
export
***********************************************************************************************/

export const loggedInClient = {
  sendReport,
  getBaseQuestionnaire,
  sendQuestionnaire,
  getUserUpdate,
  updateDeviceToken,
  updateLanguageCode,
  getLanguages,
};

export const guestClient = {
  login,
  getLanguages,
};
