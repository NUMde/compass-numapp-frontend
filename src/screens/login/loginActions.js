// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import config from '../../config/configProvider';
import guestClient from '../../services/rest/guestClient';
import localStorage from '../../services/localStorage/localStorage';
import localization from '../../services/localization/localization';

/***********************************************************************************************
actions
***********************************************************************************************/

/**
 * just a redux message
 */
export const sendCredentialsStart = () => ({
  type: 'SEND_CREDENTIALS_START',
});

/**
 * action after login success
 * @param  {string} subjectId duh
 * @param  {object} session session object
 */
export const sendCredentialsSuccess = (subjectId, session) => ({
  type: 'SEND_CREDENTIALS_SUCCESS',
  subjectId,
  session: session || null,
});

/**
 * persists the last login-error
 * @param  {object | string} error
 */
export const sendCredentialsFail = (error) => ({
  type: 'SEND_CREDENTIALS_FAIL',
  error,
});

/**
 * deletes all local data (is executed in src/store.js, not in the AboutReducer)
 */
export const deleteLocalData = () => async (dispatch) => {
  dispatch({
    type: 'DELETE_ALL_LOCAL_DATA',
  });
};

/**
 * logs the user in, using the result of the qr-scan
 * @param  {string} cleanedScanResult result of the scan cleaned up (getting the id out of the json)
 * @param  {object} [camera] camera reference
 */
export const sendCredentials =
  (cleanedScanResult, camera) => async (dispatch) => {
    // if there is a valid cleanedScanResult
    if (cleanedScanResult.length) {
      // just redux message
      dispatch(sendCredentialsStart());

      // rest call
      await guestClient
        .login(cleanedScanResult)
        .then(async (res) => {
          // this data will be persisted locally.
          // should the response not contain any certificate then the one defined in
          // appConfig.js will be used
          const data = {
            // uses the cleaned result from the qr-scan as accessToken, should there be none included in the response
            accessToken:
              res.data && res.data.access_token
                ? res.data.access_token
                : cleanedScanResult,
            // the certificate to encrypt outgoing messages
            recipientCertificatePemString:
              res.data.recipient_certificate_pem_string ||
              config.appConfig.defaultRecipientCertificatePemString,
          };
          // the id of the user will be persisted in the LocalStorage (for the auto-login next time)
          await localStorage.persistLastSubjectId(cleanedScanResult);

          const lang = await localStorage.loadLocalizationSettings(
            cleanedScanResult,
          );

          if (lang) localization.setI18nConfig(lang);

          dispatch(sendCredentialsSuccess(cleanedScanResult, data));
        })
        .catch((err) => {
          // reactivates the camera
          if (camera) camera.reactivate();
          // persists the error
          dispatch(
            sendCredentialsFail({
              err,
              loginError:
                err.error ?? localization.translate('login').errorUserGeneric,
              loginUnauthorized: err.error?.response?.status === 401,
            }),
          );
        });
    } else {
      // reactivates the camera
      if (camera) camera.reactivate();
      // persists a generic error
      dispatch(
        sendCredentialsFail({
          loginError: localization.translate('login').noSubjectId,
          loginUnauthorized: false,
        }),
      );
    }
  };

/**
 * just updates the subjectId
 * @param  {string} subjectId
 */
export const updateSubjectId = (subjectId) => async (dispatch) => {
  dispatch({
    type: 'UPDATE_SUBJECT_ID',
    subjectId,
  });
};

/**
 * just a redux message
 */
export const autoLoginLastUser = () => async (dispatch) => {
  dispatch({
    type: 'AUTO_LOGIN_LAST_KNOWN_USER',
  });
};

/**
 * logs the user out is executed in store.js
 */
export const logout = () => async (dispatch) => {
  dispatch({
    type: 'USER_LOGOUT',
  });
};
