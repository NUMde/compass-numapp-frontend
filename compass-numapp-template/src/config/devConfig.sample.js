import { name as appName } from '../../appName.json';

export default {
  // DEVELOPMENT OPTIONS
  /*-----------------------------------------------------------------------------------*/

  // these options are meant for development only.

  /** dev-option:
   * skips the QR login after 500ms */
  automateQrLogin: __DEV__ && false,

  /** dev-option:
   * subject-id for automated login */
  automateQrLoginSubjectId: `{"AppIdentifier":"${appName}","SubjectId":"7bfc3b07-a97d-4e11-8ac6-b970c1745476"}`,

  /** dev-option:
   * shows a button to erase all data (in the about-menu) - dev-only */
  showEraseAll: __DEV__ && true,

  /** dev-option:
   * shows a button to log out the user (in the about-menu) - dev-only */
  showLogout: __DEV__ && true,

  /** dev-option:
   * logs out the response-json parsed as an object in the developer console
   * */
  logPureResponse: __DEV__ && false,

  /** dev-option:
   * logs out the response-json in the developer console
   * */
  logPureResponseJSON: __DEV__ && false,

  /** dev-option:
   * logs out the encrypted response-json in the developer console
   * */
  logEncryptedResponse: __DEV__ && false,

  /** dev-option:
   * used the locally available questionnaire.js instead of the procured one from the backend */
  useLocalQuestionnaireInsteadOfTheReceivedOne: __DEV__ && false,

  /** dev-option:
   * skips the id-comparison */
  skipIncomingQuestionnaireCheck: __DEV__ && false,

  // development-base-backend-uri
  baseUri: 'http://127.0.0.1:8080/api/',
};
