
// (C) Copyright IBM Deutschland GmbH 2020.  All rights reserved

// ================================================================================================
// ================================================================================================
// TEXT CONFIGURATION VALUES

// TO CUSTOMIZE THE THE USED STRINGS OF THS APPLICATON PLEASE COPY THE WHOLE CONTENT BELOW  THIS
// COMMENT INTO THE FILE 'customTextConfig.js' located under 'src/CUSTOMIZATION'. THOSE VALUES WILL
// THEN OVERWRITE THE DEFAULT-VALUES DEFINED IN THIS FILE.
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

export default {

	/** strings for accessibility features (i.e. VoiceOver) */
	"accessibility":{

		"types": {
			"button": "button",
			"header": "header",
		},

		"refresh": "refresh",
		"refreshHint": "Re-fetches the questionnaire and status. The current page will be updated.",

		"back": "back",
		"backHint": "Jumps to previous page.",

		"close": "close",
		"closeHint": "Closes current page or modal.",

		"accept": "accept",
		"cancel": "cancel",
		"acceptHint": "Switches to default browser application, and opens link there.",

		"menu": "Additional Information",
		"menuHint": "Opens new page with additional informations and links.",

		"logoutHint": "Starts logout process and redirects to login page.",
		"loginHint": "Starts login process and redirects to QRCode scanner.",

		"questionnaire": {
			"middleButtonFinished": "Next question. question is answered.",
			"middleButtonUnfinished": "Next question, even though question is not yet answered.",
			"middleButtonHint": "Jumps to the next questions, or closes the modal if this was the last question.",

			"rightButtonHint": "Closes the modal.",
			"leftButtonHint": "Jumps to previous question.",
			"alertButtonHint": "Closes the alert.",

			"questionnaireCellHint": "Opens new page to see the questionnaire's categories.",
			"categoryCellHint": "Opens modal to fill out this questionnaire entry.",
			"category": "This Category ",
			"questionnaire": "This questionnaire ",
			"notStarted": "has not been answered yet.",
			"notFinished": "has already been started, but isn't completely filled in yet.",
			"finished": "is fully complete.",

			"sendHint": "Sends the questionnaire to evaluation.",

			"multipleChoice": "Multiple Choice - more than one answer option can be selected.",
			"singleChoice": "Single Choice - only one answer option can be selected.",
			"textFieldHint": "Please fill in the requested information here.",
			"dateFieldHint": "Opens a new modal to pick a date.",
			"sliderFieldEquals": " equals ",
			"sliderFieldAnd": ", and ",

			"triggerHint": "If this element is selected, another additional question will be shown that is connected to this element. Please fill out the additional question as well.",
		}

	},

	/** contains all string rendered on the login-screen, as well as the ones for the landing-screen */
	"login":{
		"title": 'Login',
		"subTitle":"",
		"submit":"Login",
		"user":"subject-id",
		"pass":"password",
		"waiting":"Logging in...",
		"errorPass":"Please try again.",
		"noSubjectId":"no valid subjectId found",
		"errorUserUnauthorized":"Invalid user data.",
		"qrInfo":"Please point the camera onto the qr-code.",
		"errorUserGeneric":"There occured a problem during login.",
		"permissionDialog":"Please allow the app to access your camera.",

		/** contains all strings of the landing-screen */
		"landing":{
			"buttonText":"Navigate to Login Screen",
			"title":"",
			"subTitle":"",
		   	"welcomeTitle":"Welcome to COMPASS\n(React Native Client)",
		   	"text":"This is the Landing Screen.\n\nIt can be used to display a welcome message, detailing the following login-process, explaining the handling of personal information, etc.\n\nThe logo file (as well as the logoBackground) can be updated by updating the 'CUSTOMIZATION' folder."
		},
	},

	/** strings with genric purpose that can be used throughout the application */
	"generic":{
		"ok":"OK",
		"error":"Error",
		"abort":"Cancel",
		"warning":"Warning",
		"info":"Information",
		"errorTitle":"Error",
		"successTitle":"Success",
		"delete":"Yes, delete data",
		"goBack":"Yes, please logout",
		"logoutWarning":"Logout Warning",
		"sendSuccess":"Data sent successfully",
		"sendError":"There was an error transmitting the data. Please try again.",
		"eraseAllWarning":"This will delete all local data. Do you want to precede?",
		"updateError":"An error ocurred while getting the requested data - please try again.",
		"infoRemoval":"The currently persisted questionnaire is obsolete and will now be removed.",
		"reportWhileInIteratedMode":"Dialog to tell the user that he already sent in a special report and that he is right now on a special interval.",
		"reportWhileQuestionnaire":"Dialog to tell the user that currently a questionnaire is available and that he might use that one to report about his condition.",
	},
	
	/** strings of the about-screen */
	"about":{
		"title":"About",
		"subTitle":"Subtitle of the about-screen",
	   	"logout":"Logout (just on DEV)",
		"delete":"Delete all & logout (just on DEV)",

		/** contains the strings for the optional LegalInformation Screen */
		"legal": {
			"title": "Link to the LegalInformation-Screen",
			"subTitle": "This Links is optionally rendered (can be activated through the development-config). The text-content of that screen can be updated through the text-config",
			"iconType": "entypo",
			"iconTitle": "archive"
		}
	},

	/** contains the strings for the legal information screen */
	"legalInformation": {
		"title": 'Legal Information Screen',
		"subTitle": 'Legal subtitle',
		"headline": "Example Legal Text",

		"content": `DEFINITIONS In this license apply to the interfaces of, the Work is not the case where Apple is the primary copyright notice of copyright, i.e., "Copyright (c) 2001, 2002, 2003, 2004, 2005, 2006 Python Software Foundation; either version 1.3 or later is part of a file documenting the additions, changes or deletions from the Work. If this search is successful, then enquire whether the Work by You alone, not by any Contributor under this Agreement shall terminate as of the following: a) Accompany it with a work which combines Covered Code may contain in whole or in any resulting litigation. Definitions. 1.0.1. "Commercial Use" means distribution or otherwise redistribute the Licensed Product, or for any liability incurred by or claims asserted against, such Contributor as a consequence you may do only in order to apply it to your customers.
					You cannot charge for the Work is distributed to all recipients of Covered Code and executable versions of the Modified Version, and of promoting the sharing and reuse of software distributed under this License. Code" means the original Licensed Product. If you wish while maintaining the availability, integrity, and reliability of that Derived Work under any applicable law.		
					Interpreter' referring to the credit given on this website, or c) through a medium customarily used for display of the Package (7) You may distribute the Source form of the <ORGANIZATION> nor the names of the Source Code. You must duplicate the notice in Exhibit A shall not of themselves be deemed a waiver of future enforcement of that Package while still keeping the Package constitutes direct or contributory patent infringement, then any Derivative Works that You meet the following conditions are met: Redistributions of source code from the Original Code, and keep intact the notices that do not apply to any part thereof, and wants to make the terms applicable to Covered Code. All sublicenses to the work (an example is provided in accordance with the program. It is safest to attach them to the program. It is not confusingly similar phrase do not forfeit any of its terms and conditions of this License, provided that the Program originate from and are distributed by the Licensed Product.		
					This License To use this License which applies to any technical questions or inquiries, or provide any other system and a notice and this permission notice shall be subject to the user community. They therefore concern themselves with the appropriate bodies (for example the POSIX committees). Definitions: "Package" refers to such a notice. If You create or to ask you to surrender the rights.		
					These restrictions translate to certain responsibilities for you to comply with any of the Work that has been certified as open source. It has also been designated as GPL compatible by the Work to which you contribute may be distributed and modified, as well as in related documentation and collateral materials stating that the Program in object code form. This patent license to reproduce, prepare Derivative Works from it. Works" is defined in Article 3 (Restriction) The license granted by this license; they are first used, and the following restrictions: 1.		
					If a component of this License, provided that the Source Code or portions thereof with code not governed by the Contributor, such addition of the Program in a commercial product offering, such Distributor ("Commercial Distributor") hereby agrees to cease use and Distribution of Compiled Forms of the Package, if it fails to comply with the wishes of the software, Licensee agrees to defend claims against the other Contributors related to Product X, those performance claims and warranties, and if a Contributor which are reasonably necessary to make it enforceable. This License complies with the United States and the code itself as a special exception, the source code. And you must rename your license so that distribution is permitted only in or as it is not allowed.		
					You can re-use content from Wikimedia projects freely, with the Licensed Program from such Contributor, if any, must include such Notice in a manner that reasonably allows subsequent Recipients to identify the originator of its Contribution, if any, must include a copy of this License. Artistic License as published by the acts or omissions of such breach; (b) immediately in the copyright notice appear in the name of products derived from the rights conveyed by this License. Provisions which, by their nature, must remain in effect beyond the termination of this License and the following conditions are met: Redistributions of source code as you received as to the Free Software Foundation ("PSF"), and the following disclaimers.		
					Redistributions in source code and object code form. The patent license is also available under the new version. However, only the Licensor or any Contributor, and only if the Program in a commercial product offering, Product X. That Contributor is then produced by applying some process to that Work or a CC-BY-SA-compatible license is granted: 1) for code that you propose to make sure that everyone has such rights, we need to make reasonable conjectures as to name you as the conditions listed in Clause 6 above, in regard to the terms of this Agreement and any Modifications made by someone other than You; and/or (b) to use it for any purpose, but the Licensor or such Contributor (or portions thereof) either on an equitable basis. Nothing herein is intended to facilitate the commercial use of the License published by the parties or the like.`
	},

	/** strings of the survey-screen */
	"survery":{
		"logout":"logout",
		"title":"Questionnaire",
		"isLoading":"loading...",
		"yourAnswer":"your anwer",
		"titleCheckIn":"Check-In",
		"welcomeTitle":"CheckIn-Title",
		"noUserTitle":"User not found",
		"sendFinished":"send questionnaire",
		"send":"Send Questionnaire Button Title",
		"subTitle":"",
		"surverySubTitle":"To be completed till:  ",
		"surveryTitle":"Your current questionnaire",
		"inputPlaceholder":"please enter your answer",
		"noQuestionnaireTitle":"Questionnaire not found",
		"subTitleCheckin":"",
		"loadingQuestionnaire":"requesting\nquestionnaire",
		"inputPlaceholderTime":"please enter the date here",
		"sessionTimeout":"Your user could not re recognized",
		"reloadingQuestionnaire":"re-loading\nquestionnaire",
		"welcomeTitleFirstTime":"CheckIn-Title for new Users",
		"surveryTitleFirstTime":"Your Entry-Questionnaire Title",
		"welcomeTextFirstTimeUser2":" - See? This is the second part of that message.",
		"noUserText":"Yout ID could not be verified. Please try again.",
		"noNewQuestionnaireAvailableYetTitle":"Title, in case no Questionnaire is available",
		"sendFinishedMessage":"confirmation dialog for sending the completed questionnaire?",
		"sendUnfinishedMessageDenied":"The current questionnaire is not yet completed. Please do so.",
		"nextOne":"This text will be shown to communicate when the next questionnaire is available: ",
		"noQuestionnaireText":"There occured an error while loading the questionnaire - Please try again.",
		"noNewQuestionnaireAvailableYet":"This text will be diplayed if no questionnaire is available right now.",
		"nextOneNew":"This text will be shown to communicate TO A NEW USER when the next questionnaire is available: ",
		"furtherInfo":"This is the bottom snippet of the welcomeText. You may place something useful here... like a limerick.",
		"welcomeTextUser":"This is the regular welcome message. It will be shown if a questionnaire is available and the user a recurring one. Below this, the due date should be displayed.",
		"welcomeTextFirstTimeUser1":"This is text that is presentend to first-time-users. It tells them when the first questionnaire is due: ",
	},

	/** strings for the special-report-flow */
	"reporting":{
		"symptoms_no":"NO",
		"symptoms_yes":"YES",
		"symptoms_success_ok":"Success-Confirmation",
		"symptoms_success_header":"Success-Message-Header",
		"symptoms_header":"Button: Send out Special Report",
		"symptoms_success_message":"Success-Message-Content",
		"symptoms_question":"Insert confirmation question here",
	},

	/** each entry in this array will generate a new listItem on the about-screen. When clicked on such an item, a webView will open that
	 * can diplay any website. "iconType" is the name of a free Webfont and the title is the name of the particular icon. .
	 * as this app is using react-native-elements, the list of compatible fonts can be found in its documentation:
	 * https://reactnativeelements.com/docs/icon
	 */
	"webViews": [
		{
			"title":"A WebView",
			"subTitle": "This is a listItem Element.\n\nIf clicked on, this ListItem will open the WebView-screen, which in turn will render a website right in the app.",
			"screenSubTitle": "Subtitle of this screen",
			"uri": 'https://github.blog/',
			"iconTitle": "light-bulb",
			"iconType": "entypo"
		},
		{
			"title":"Another WebView",
	   		"subTitle": "For each item you add to the 'webView' property of textConfig.js another entry in this list is generated. That way you can add more content by just hosting a website and add it to textConfig.js",
			"screenSubTitle": "Subtitle of this screen",
			"uri": 'https://dmw.hih-2025.de/livestream/',
			"iconTitle": "light-bulb",
			"iconType": "entypo"
		}
	],

	/** each entry in this array will generate a new listItem on the about-screen. When clicked on such an item, a modal will open
	 * that informs the user that he/she is beeing redirected to their local browser. "iconType" is the name of a free Webfont and the title is the name of the particular icon. .
	 * as this app is using react-native-elements, the list of compatible fonts can be found in its documentation:
	 * https://reactnativeelements.com/docs/icon
	 */
	"modalLinks": [
		{
			"title":"First Link",
			"subTitle": "This is a regular link. It will open a modal before redicrecting the user to his/her own browser."	,
			"text": "your are now being redirected.",
			"uri": 'https://github.blog/',
			"iconTitle": "link",
			"iconType": "entypo"
		},
		{
			"title":"Second Link",
	   		"subTitle": "For each item you add to the 'modalLinks' property of textConfig.js another entry in this list is generated.",
			"text": "your are now being redirected.",
			"uri": 'https://ibm.com/',
			"iconTitle": "link",
			"iconType": "entypo"
		}
	]
}