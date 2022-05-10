import { appConfig } from '~config';

export default {
  /** rest:
   * endpoint to log the user in and retrieve the accessToken */
  login: `${appConfig.baseURI}participant/`,

  /** rest:
   * endpoint to get the user-profile */
  getUser: `${appConfig.baseURI}participant/`,

  /** rest:
   * endpoint for a special report */
  report: `${appConfig.baseURI}queue`,

  /** rest:
   * endpoint to post the questionnaire to */
  sendQuestionnaire: `${appConfig.baseURI}queue`,

  /** rest:
   * endpoint to receive the questionnaire */
  getQuestionnaire: `${appConfig.baseURI}questionnaire/`,

  /** rest:
   * endpoint to update the push token */
  updateToken: `${appConfig.baseURI}participant/update-device-token/`,

  /** rest:
   * endpoint to update the chosen language*/
  updateLanguage: `${appConfig.baseURI}participant/update-language-code/`,

  /** rest:
   * endpoint to get the list languages*/
  getLanguages: `${appConfig.baseURI}/questionnaire/get-languages/`,
};
