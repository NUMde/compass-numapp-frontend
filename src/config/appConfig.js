
// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

// ================================================================================================
// ================================================================================================
// CONFIGURATION VALUES

// TO CUSTOMIZE THE THE DEVELOPMENT SETTINGS OF THS APPLICATION PLEASE COPY THE WHOLE CONTENT BELOW 
// THIS COMMENT (INCLUDING THE IMPORT, SHOULD YOU WANT TO USE IT) INTO THE FILE 
// 'customAppConfig.js' located under 'src/CUSTOMIZATION'. THOSE VALUES WILL THEN OVERWRITE 
// THE DEFAULT-VALUES DEFINED IN THIS FILE.
//                                                                           /$$          
//                                                                          | $$          
//    /$$$$$$$  /$$$$$$   /$$$$$$  /$$   /$$        /$$$$$$$  /$$$$$$   /$$$$$$$  /$$$$$$ 
//   /$$_____/ /$$__  $$ /$$__  $$| $$  | $$       /$$_____/ /$$__  $$ /$$__  $$ /$$__  $$
//  | $$      | $$  \ $$| $$  \ $$| $$  | $$      | $$      | $$  \ $$| $$  | $$| $$$$$$$$
//  | $$      | $$  | $$| $$  | $$| $$  | $$      | $$      | $$  | $$| $$  | $$| $$_____/
//  |  $$$$$$$|  $$$$$$/| $$$$$$$/|  $$$$$$$      |  $$$$$$$|  $$$$$$/|  $$$$$$$|  $$$$$$$
//   \_______/ \______/ | $$____/  \____  $$       \_______/ \______/  \_______/ \_______/
//                      | $$       /$$  | $$                                              
//                      | $$      |  $$$$$$/                                              
//                      |__/       \______/   
// 
//   /$$                 /$$                        
//  | $$                | $$                        
//  | $$$$$$$   /$$$$$$ | $$  /$$$$$$  /$$  /$$  /$$
//  | $$__  $$ /$$__  $$| $$ /$$__  $$| $$ | $$ | $$
//  | $$  \ $$| $$$$$$$$| $$| $$  \ $$| $$ | $$ | $$
//  | $$  | $$| $$_____/| $$| $$  | $$| $$ | $$ | $$
//  | $$$$$$$/|  $$$$$$$| $$|  $$$$$$/|  $$$$$/$$$$/
//  |_______/  \_______/|__/ \______/  \_____/\___/ 
//                                           
// ================================================================================================
// ================================================================================================

import { Dimensions } from 'react-native'

/***********************************************************************************************
constants
***********************************************************************************************/

// current device width
const { width } = Dimensions.get('window')

// production-base-backend-uri
const baseUriProductive = ''

// development-base-backend-uri
const baseUriDevelopment = 'http://127.0.0.1:8080/api/'

/***********************************************************************************************
configuration
***********************************************************************************************/

/**
 * this object contains the configuration for the application. some options are only valid in 
 * development environment.
 */
const conf = {

	// DEVELOPMENT OPTIONS
	/*-----------------------------------------------------------------------------------*/

	// these options are meant for development only.

	/** dev-option:
	 * skips the QR login after 500ms */
	automateQrLogin: __DEV__ && false,

	/** dev-option:
	 * subject-id for automated login */
	automateQrLoginSubjectId: '{"AppIdentifier":"COMPASS","SubjectId":"7bfc3b07-a97d-4e11-8ac6-b970c1745476"}',

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
	useLocalQuestionnaireInsteadOftheReceivedOne: __DEV__ && false,

	/** dev-option:
	 * skips the id-comparison */
	skipIncomingQuestionnaireCheck: __DEV__ && false,

	// login
	/*-----------------------------------------------------------------------------------*/

	// the login qr-code is formed like the following example. 
	// {
	// 	"AppIdentifier":  "COMPASS",
	// 	"SubjectId":	"subjectId"
	// }
	// the attribute-names necessary to check the appIdentifer and to extract the subjectId
	
	/** login-option:
	 * the name of the attribute in the qr-code holding the app-identifier*/
	qrCodeAttributeHoldingTheAppIdentifier: 'AppIdentifier',
	
	/** login-option:
	 * the app-identifier */
	appIdentifier: 'COMPASS',
	
	/** login-option:
	 * the name of the attribute in the qr-code holding the subject-id*/
	qrCodeAttributeHoldingTheSubjectId: 'SubjectId',

	// local storage identifiers
	/*-----------------------------------------------------------------------------------*/

	// these are identifiers for the items created in AsyncStorage. AsyncStorage will persist
	// those data points until it is manually deleted, updated or the app was removed by the user.
	// ATTENTION: These are not encrypted!

	/** local storage identifier:
	 * persist the questionnaireItemMap */
	localStorageMap: '@COMPASS_STORE:persisted_survey',

	/** local storage identifier:
	 * persists the questionnaireItemMap */
	localStorageList: '@COMPASS_STORE:persisted_survey_list',

	/** local storage identifier:
	 * the subject-id of the user last logged in */
	lastSubjectId: '@COMPASS_STORE:last_active_user',

	/** local storage identifier:
	 * the id of the last active questionnaire of the last active user */
	lastQuestionnaireId: '@COMPASS_STORE:last_questionnaire_id',

	/** local storage identifier:
	 * persists all relevant information about the notification-service */
	FCMToken: '@COMPASS_STORE:fcm_token',

	// push notification
	/*-----------------------------------------------------------------------------------*/

	/** push:
	 * if set to true the app tries to connect to a FCM instance that in turn will be able 
	 * to send out push notifications reminding the participants to open the app. 
	 * 
	 * To establish the connections three other files must be updated:
	 * - AppDelegate.m // comment-in line 25
	 * - google-services.json // replace with your FCM credentials
	 * - GoogleService-Info.plist replace with your FCM credentials
	 * 
	 * WARNING: The app will NOT build if those files are not updated accordingly.
	 * */
	connectToFCM: false,

	// updates the locally generated device token with the backend on each user update
	reconnectOnEachUserUpdate: false,

	// rest endpoints
	/*-----------------------------------------------------------------------------------*/

	// these are the various endpoints the app communicates with.
	// the base-uri is dependent on the current environment (dev || prod)

	endpoints: {

		/** rest:
		 * endpoint to log the user in and retrieve the accessToken */
		login: (__DEV__ ? baseUriDevelopment : baseUriProductive) + 'participant/',
		
		/** rest:
		 * endpoint to get the user-profile */
		getUser: (__DEV__ ? baseUriDevelopment : baseUriProductive) + 'participant/',

		/** rest:
		 * endpoint for a special report */
		report: (__DEV__ ? baseUriDevelopment : baseUriProductive) + 'queue/',

		/** rest:
		 * endpoint to post the questionnaire to */
		sendQuestionnaire: (__DEV__ ? baseUriDevelopment : baseUriProductive) + 'queue/',
		
		/** rest:
		 * endpoint to receive the questionnaire */
		getQuestionnaire: (__DEV__ ? baseUriDevelopment : baseUriProductive) + 'questionnaire/',
		
		/** rest:
		 * endpoint to receive the questionnaire */
		updateToken: (__DEV__ ? baseUriDevelopment : baseUriProductive) + 'participant/update-device-token/',
	},
	
	// ui
	/*-----------------------------------------------------------------------------------*/

	/** ui:
	* adds another LinkList to the About-Screen, which navigates to LegalInformationScreen.
	* the content of that screen can be configured through the textConfiguration
	*/
	allowAccessToLegalInformationScreen: true,

	/** ui:
	* adds a progressbar to the bottom of the questionnaireModal
	*/
	useProgressBar: false,

	/** ui:
	* when true: calculates the exact position of the progress in relation to the given answers.
	* when false: uses absolute values to calculate the position.
	*/
	useStrictModeProgressBar: true,
	
	/**
	 * the font-scaling function:
	 * this function is meant to provide an additional means of scaling the fonts of the
	 * application. it is used sporadically throughout the application.
	 * @param  {number} size base font size
	 */
	scaleFontsFkt: (size) => {
		
		// scales the fontsize dynamically down for smaller devices
		let scaleFonts = true

		// the base parameter for the font-scaling
		// (device width / guidelineBaseWidthFontScaling * fontsize)
		let guidelineBaseWidthFontScaling = 400

		// returns the new size
		return scaleFonts ? (width / guidelineBaseWidthFontScaling) * size : size
	},

	/**
	 * the ui-scaling function:
	 * this function is meant to provide an additional means of scaling ui-elements of the
	 * application. it is used sporadically throughout the application.
	 * @param  {number} size base ui size
	 * @param  {number} [rescaleValue] value used as an additional scale
	 */
	scaleUiFkt: (size, rescaleValue) => {
		
		// normalization
		rescaleValue = rescaleValue || 1

		// scales certain ui parts dynamically down for smaller devices
		let scaleUi = true

		// the base parameter for the ui-scaling
		// (device width / guidelineBaseWidthUiScaling * size)
		let guidelineBaseWidthUiScaling = 430 / rescaleValue

		// returns the new size
		return scaleUi ? (width / guidelineBaseWidthUiScaling) * size : size
	},

	// rules
	/*-----------------------------------------------------------------------------------*/

	/** default values, should there be no ruleset coming from the server with the user-update.
	* each entry contains definitions of questions (from the questionnaire)
	* and their corresponding answers that would trigger that particular rule.
	* of the return object of the function createResponseJSON() located in src/services/export
	*/
	defaultRulesConfig: [
		{
			"type": "basicTrigger",
			"rules": {
				"compass-0-04": [
					'01# Ja'
				]
			}
		},

		{
			"type": "specialTrigger",
			"rules": {
				"compass-0-03-02": [
					'02# positives Ergebnis'
				]	
			}
		}
	],

	/** the name of the attribute used to signal a special report */
	defaultReportAttribute: 'basicTrigger',

	// encryption
	/*-----------------------------------------------------------------------------------*/

	// should the user-response not hold a public certificate (for encrypting data sent 
	// to the backend) a provisional on will be used:
	
	/** encryption config:
	 * the default recipient key (in case nothing comes from the server) */
	defaultRecipientCertificatePemString: __DEV__
		
		? // the dev-certificate
		  `-----BEGIN CERTIFICATE-----
		  MIIDQTCCAimgAwIBAgIUCsfj6fazVbkvRfb9JwJbxGR1QjowDQYJKoZIhvcNAQEL
		  BQAwMDELMAkGA1UEBhMCREUxEzARBgNVBAgMClNvbWUtU3RhdGUxDDAKBgNVBAoM
		  A0lCTTAeFw0yMTAxMjAxMTI5MzBaFw0yMTAyMTkxMTI5MzBaMDAxCzAJBgNVBAYT
		  AkRFMRMwEQYDVQQIDApTb21lLVN0YXRlMQwwCgYDVQQKDANJQk0wggEiMA0GCSqG
		  SIb3DQEBAQUAA4IBDwAwggEKAoIBAQDo81M2aGCcQRgck1uuFtBNbFfk3NV8JnWh
		  nwpp/tNd18KGudYm9bNGdkFPchqeyKcglBviPBcsyad9iz5u7SSlWRiVBHXVvAKw
		  6K+YVJ+wfQn+GU40vX+3hcv52sJMnpQky4pY99qjg9mIa4/H3YnZfoanw0vWrwCt
		  sKLcBhhslsAFDw0AppTp0hiG5rAWz48Xq6ynzByLglWOdijYihJHaEKaOLZf8vls
		  T5lQ6t6rflL9PzHLmubRit5YiKdg4utj+fmp6/mdJk8/MQ/WbiIQCF0mYqSt7oiq
		  C8zmtWKiW6Cs+b4KNJvJNS8lPK6CZnFoWoTiUY4KQHjaMW37ND1tAgMBAAGjUzBR
		  MB0GA1UdDgQWBBS58Dxb/i+8QQaGHSfv7FnTxL8DGzAfBgNVHSMEGDAWgBS58Dxb
		  /i+8QQaGHSfv7FnTxL8DGzAPBgNVHRMBAf8EBTADAQH/MA0GCSqGSIb3DQEBCwUA
		  A4IBAQBkCCnHHMIE+qUQLeOnD3aIMmllIndWTbLNf0MaTdn9jQOXsICNzkACIkx8
		  PyCqSE+L6uq1bR3hs6SJFpawjk8OsEXhniZIWbymVGZ2djbtAVBUWj4gJ0/KgO8v
		  m6IvwRLXCPdxuLsM6XdH9NI72DY1gBIIJ5NQaq9wZt4yBzBHMGFZoRDg04xCe0eU
		  /dKKBsJfDbgXOwk7XNw1ncRCeJ0o5wpDD/T1SJduku2g6BxoZp1+bcd00ckefpQh
		  20ClX5Ccxcn4BVa3x1U+fVOZ7Fm/ACR2++fmpFWlCeghtRr4QNoMzqNY/3mK4SLr
		  hqHSzFGp8HN2Ui5QWVSu7DgLIvkW
		  -----END CERTIFICATE-----`
		
		: // the prod-certificate
		  `...`
}

/***********************************************************************************************
export
***********************************************************************************************/

export default conf