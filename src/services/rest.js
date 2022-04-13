// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

// this file provides methods concerning the communication with the backend before the user
// is logged in.

/***********************************************************************************************
imports
***********************************************************************************************/

import config from '../config/configProvider';
import encrypt from './encryption';

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

/***********************************************************************************************
guest client functions
***********************************************************************************************/

/**
 * @param  {string} subjectId the id used to identify the user
 */
const login = async (subjectId) => {
  const response = await fetch(config.appConfig.endpoints.login + subjectId);
  const body = await response.json();
  if (response.ok) {
    return body;
  }
  const err = new Error(body.errorMessage || 'NETWORK REQUEST FAILED');
  err.name = body.errorCode;
  err.code = response.status;
  throw err;
};

/**
 * procures the list of languages
 */
const getLanguages = async () => {
  const response = await fetch(config.appConfig.endpoints.getLanguages, {
    headers: {
      Accept: 'application/json',
    },
  });
  const body = await response.json();
  if (response.ok) {
    return body;
  }
  const err = new Error(body.errorMessage || 'NETWORK REQUEST FAILED');
  err.name = body.errorCode;
  err.code = response.status;
  throw err;
};

/***********************************************************************************************
logged in client functions
***********************************************************************************************/

// user handling
/*-----------------------------------------------------------------------------------*/

/**
 * gets the subjectId and calls the getUser-endpoint
 */
const getUserUpdate = async (subjectId) => {
  const response = await fetch(config.appConfig.endpoints.getUser + subjectId);
  const body = await response.json();
  if (response.ok) {
    return body;
  }
  const err = new Error(body.errorMessage || 'NETWORK REQUEST FAILED');
  err.name = body.errorCode;
  err.code = response.status;
  throw err;
};

// language
/*-----------------------------------------------------------------------------------*/

/**
 * updates the backend with the chosen language
 * @param  {string} subjectId string identifying the user
 * @param  {string} languageCode the language code
 */
const updateLanguageCode = async (subjectId, languageCode) => {
  const response = await fetch(
    config.appConfig.endpoints.updateLanguage + subjectId,
    {
      method: 'POST',
      body: JSON.stringify({
        language: languageCode,
      }),
      headers: {
        Authorization: createAuthorizationToken(subjectId),
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );

  if (response.ok) {
    return;
  }
  const body = await response.json();
  const err = new Error(body.errorMessage || 'NETWORK REQUEST FAILED');
  err.name = body.errorCode;
  err.code = response.status;
  throw err;
};

// push
/*-----------------------------------------------------------------------------------*/

/**
 * updates the backend with the current FCM token
 * @param  {string} subjectId string identifying the user
 * @param  {string} token the token
 */
const updateDeviceToken = async (subjectId, token) => {
  const response = await fetch(
    config.appConfig.endpoints.updateToken + subjectId,
    {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: {
        Authorization: createAuthorizationToken(subjectId),
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );

  if (response.ok) {
    return;
  }
  const body = await response.json();
  const err = new Error(body.errorMessage || 'NETWORK REQUEST FAILED');
  err.name = body.errorCode;
  err.code = response.status;
  throw err;
};

// reports
/*-----------------------------------------------------------------------------------*/

/**
 * sends out the encapsuled message
 * @param  {string} subjectId string identifying the user
 */
const sendReport = async (subjectId, certString) => {
  const params = new URLSearchParams();
  params.append('subjectId', subjectId);
  params.append('type', 'report');
  params.append('updateValues', {
    [config.appConfig.defaultReportAttribute]: true,
  });

  const response = await fetch(
    `${config.appConfig.endpoints.report}?${params.toString()}`,
    {
      method: 'POST',
      body: JSON.stringify(
        generateEncapsuledMessage(subjectId, 'report', certString),
      ),
      headers: {
        Authorization: createAuthorizationToken(subjectId),
        Accept: 'application/json',
      },
    },
  );
  const body = await response.json();
  if (response.ok) {
    return body;
  }
  const err = new Error(body.errorMessage || 'NETWORK REQUEST FAILED');
  err.name = body.errorCode;
  err.code = response.status;
  throw err;
};

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
) => {
  const queryParams = new URLSearchParams();
  queryParams.append('type', 'questionnaire_response');
  queryParams.append('id', subjectId);
  queryParams.append('subjectId', subjectId);
  queryParams.append('surveyId', surveyId);
  queryParams.append('instanceId', instanceId);
  queryParams.append('updateValues', JSON.stringify({ ...triggerMap }));
  const response = await fetch(
    `${config.appConfig.endpoints.sendQuestionnaire}?${queryParams.toString()}`,
    {
      method: 'post',
      body: JSON.stringify(
        generateEncapsuledMessage(
          subjectId,
          'questionnaire_response',
          certString,
          body,
        ),
      ),
      headers: {
        Authorization: createAuthorizationToken(subjectId),
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  const responseBody = await response.json();
  if (response.ok) {
    return responseBody;
  }
  const err = new Error(responseBody.errorMessage || 'NETWORK REQUEST FAILED');
  err.name = responseBody.errorCode;
  err.code = response.status;
  throw err;
};

/**
 * procures the questionnaire from the backend
 * @param  {string} questionnaireId id of the questionnaire that the user is supposed to fill out
 */
const getBaseQuestionnaire = async (questionnaireId, subjectId, langCode) => {
  const response = await fetch(
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
  const body = await response.json();
  if (response.ok) {
    return body;
  }
  const err = new Error(body.errorMessage || 'NETWORK REQUEST FAILED');
  err.name = body.errorCode;
  err.code = response.status;
  throw err;
};

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
