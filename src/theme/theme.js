
// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
import
***********************************************************************************************/

import { StyleSheet } from 'react-native'
import appConfig from '../config/appConfig'

// ================================================================================================
// ================================================================================================
// THEME CONFIGURATION VALUES

// TO CUSTOMIZE THE THE THEME OF THS APPLICATION PLEASE COPY THE WHOLE CONTENT BELOW 
// THIS COMMENT INTO THE FILE 'customTheme.js' located under 'src/CUSTOMIZATION'. THOSE VALUES WILL
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

// default ui-settings
// default ui-settings
// default ui-settings
// default ui-settings
/*-----------------------------------------------------------------------------------*/

const defaultUiSettings = {
    /** set to TRUE if you want ot use your own logo in the banner-component. for this to
	 * work, you need to place a new logo.png file into 'src/CUSTOMIZATION/images'
	 */
    useCustomLogo: false,

	/** set to TRUE if the banner component should use a full-width background, that is rendered
	 * behind the app-logo. if set to false, the banner will display its own background color instead.
	 * the colors for the banner can be changed through the theme
	 */
	useBannerBackground: true,

	/** set to TRUE if you want ot use your own logo in the banner-component. for this to
	 * work, you need to place a new defaultLogoBackground.png file into 'src/CUSTOMIZATION/images'
	 */
    useCustomLogoBackground: false,

	/** ui-option
	 * allows the use of an scroll-wrapper that permanently shows the scroll indicator
	(this is only used on the screens, not in the modals) */
	allowScrollIndicators: true
}

// default colors
/*-----------------------------------------------------------------------------------*/

const defaultColors = {

    /** the primary color of the scheme. most buttons are of this color by default, as is the top banner */
	primary: '#1F2532',

	/** highlighting for a not fully completed questionnaire (yellow-ish by default) */
	secondary: '#FFC107',

	/** highlighting for completed questionnaires, as well as some icons (green-ish by default) */
	success: '#006864',

	/** mostly used for "abort"-buttons and error messages (red-ish by default) */
	alert: '#EB576A',

	/** the color primarily used for disabled elements */
	accent1: '#919191',

	/** a more subtle grey which is used for borders, backgrounds and icons */
	accent2: '#DADADA',

	/** a even more subtle grey - also used for borders and backgrounds */
	accent3: '#F8F9FA',

	/** a relatively dark grey, used for most texts instead of black (more eye-friendly) */
	accent4: '#1F2532',

	/** just plain white */
	white: '#F8F9FA',
}

// fonts
/*-----------------------------------------------------------------------------------*/

// The following object contains all font-related information the application is currently
// using. The font-names referenced here come from the imported fonts. 
// They are located at '../../assets/fonts. The directory of the fonts can be updated by changing
// the file 'react-native.config.js' in the root directory.

// The numeric parameters are altered by the "scaleFontsFkt" function  located in 'appConfig.js'
// The reason for this is to have an additional method to dynamically alter font- & layout-sizes.
// The function call can be removed here, if there is no necessity for it - alternatively the function
// itself can be altered in 'appConfig.js'.

const defaultFonts = StyleSheet.create({
	
	header0: {
		fontFamily: 'IBMPlexSans-SemiBold',
		fontSize: appConfig.scaleFontsFkt(25),
		lineHeight: appConfig.scaleFontsFkt(25+5),
	},

	header1: {
		fontFamily: 'IBMPlexSans-SemiBold',
		fontSize: appConfig.scaleFontsFkt(22),
		lineHeight: appConfig.scaleFontsFkt(22+5),
	},

	header2: {
		fontFamily: 'IBMPlexSans-SemiBold',
		fontSize: appConfig.scaleFontsFkt(18),
		lineHeight: appConfig.scaleFontsFkt(18+5),
	},

	header3: {
		fontFamily: 'IBMPlexSans-SemiBold',
		fontSize: appConfig.scaleFontsFkt(14),
		lineHeight: appConfig.scaleFontsFkt(14+5),
	},

	title: {
		fontFamily: 'IBMPlexSans-SemiBold',
		fontSize: appConfig.scaleFontsFkt(24),
		lineHeight: appConfig.scaleFontsFkt(24+5),
	},

	title2: {
		fontFamily: 'IBMPlexSans-SemiBold',
		fontSize: appConfig.scaleFontsFkt(16),
		lineHeight: appConfig.scaleFontsFkt(15+5),
	},

	subHeader1: {
		fontFamily: 'IBMPlexSans',
		fontSize: appConfig.scaleFontsFkt(16),
		lineHeight: appConfig.scaleFontsFkt(16+5),
	},

	body: {
		fontFamily: 'IBMPlexSans',
		fontSize: appConfig.scaleFontsFkt(15),
		lineHeight: appConfig.scaleFontsFkt(15+5),
	},

	label: {
		fontFamily: 'IBMPlexSans-SemiBold',
		fontSize: appConfig.scaleFontsFkt(14),
		lineHeight: appConfig.scaleFontsFkt(14+5),
	},

	hint: {
		fontFamily: 'IBMPlexSans',
		fontSize: appConfig.scaleFontsFkt(12),
		lineHeight: appConfig.scaleFontsFkt(12+5),
	},

	inputPlaceholder: {
		fontFamily: 'IBMPlexSans-Italic',
		fontSize: appConfig.scaleFontsFkt(15),
		lineHeight: appConfig.scaleFontsFkt(15+5),
	},

	bold: {
		fontFamily: 'IBMPlexSans-SemiBold',
		fontSize: appConfig.scaleFontsFkt(17),
		lineHeight: appConfig.scaleFontsFkt(17+5),
	}
})

// default values
/*-----------------------------------------------------------------------------------*/

// the following values represent different default values that are used throughout the application.

/** default values for various properties used throughout the application */
const defaultValues = {

    // background color
    defaultBackgroundColor: defaultColors.white,
    defaultParagraphTextColor: defaultColors.accent4,
    defaultTitleTextColor: defaultColors.accent4,

    // banner
    defaultBannerBackgroundColor: defaultColors.white,
    defaultBannerButtonColor: defaultColors.alert,
    defaultBannerTitleColor: defaultColors.accent4,
    defaultBannerSubTitleColor: defaultColors.accent4,
    defaultStatusBarStyleIos: 'dark-content',
    defaultStatusBarStyleAndroid: 'dark-content',
    defaultStatusBarAndroidBackgroundColor: '#EFEFEF',

    // loading-spinner
    defaultSpinnerBackgroundColor: defaultColors.primary,
    defaultSpinnerColor: defaultColors.alert,

    // buttons
    defaultButtonAlignSelf: 'center',
    defaultButtonBorderRadius: 50,
    defaultButtonBorderWidth: 0,
    defaultButtonPadding: 15,
    defaultButtonWidth: '100%',

    // survey-screen
    defaultSurveyItemBackgroundColor: defaultColors.white,
    defaultSurveyItemTitleColor: defaultColors.accent4,
    defaultSurveyIconUntouchedColor: defaultColors.alert,
    defaultSurveyIconTouchedColor: defaultColors.secondary,
    defaultSurveyIconCompletedColor: defaultColors.success,

    // checkIn-screen
    defaultCheckInListViewTitleColor: defaultColors.white,
    defaultCheckInListViewSubTitleColor: defaultColors.accent3,
    defaultContainerUntouchedBackgroundColor: defaultColors.alert,
    defaultContainerTouchedBackgroundColor: defaultColors.secondary,
    defaultContainerCompletedBackgroundColor: defaultColors.success,
    defaultContainerUntouchedBorderColor: defaultColors.alert,
    defaultContainerTouchedBorderColor: defaultColors.secondary,
    defaultContainerCompletedBorderColor: defaultColors.success,
    defaultTimeSuccessColor: defaultColors.success,
    defaultActiveTile: defaultColors.primary,
    defaultDisabledTile: defaultColors.accent2,
    defaultSendQuestionnaireButtonBackgroundColor: defaultColors.success,

    // list-item (about screen)
    defaultListItemIconColor: defaultColors.success,
    defaultListItemBackgroundColor: defaultColors.white,

    // list-link (about screen)
    defaultListLinkIconColor: defaultColors.alert,
    legalListLinkIconColor: defaultColors.primary,
    defaultListLinkBackgroundColor: defaultColors.white,

    // modal
    defaultModalContentBackgroundColor: defaultColors.white,
    defaultModalTitleColor: defaultColors.accent4,
    defaultModalContentTextColor: defaultColors.accent4,
    defaultModalBottomBarBackgroundColor: defaultColors.white,
    defaultModalSeparatorBackgroundColor: defaultColors.accent2,
    defaultModalBorderColor: defaultColors.white,
    defaultSeparatorColor: defaultColors.accent2,
    defaultModalBorderRadius: 10,

    // scrollIndicator
    defaultScrollIndicatorBackgroundColor: defaultColors.alert,
    defaultScrollIndicatorIconColor: defaultColors.white
}

// stylesheet-objects
/*-----------------------------------------------------------------------------------*/

// the following are default stylesheet-objects that are used throughout the application.
// individual changes to it (depended on the component thats using it) can be found in
// the local styleSheet variable.

//  buttons

const button = {
    borderRadius: defaultValues.defaultButtonBorderRadius,
    borderWidth: defaultValues.defaultButtonBorderWidth,
    padding: defaultValues.defaultButtonPadding,
    alignSelf: defaultValues.defaultButtonAlignSelf,
    width: defaultValues.defaultButtonWidth
}

const buttonPrimary = {
    ...button,
    backgroundColor: defaultColors.primary,
    borderColor: defaultColors.primary
}

const buttonAlert = {
    ...button,
    backgroundColor: defaultColors.alert,
    borderColor: defaultColors.alert
}

const buttonLabel = {
    ...defaultFonts.label,
    color: defaultColors.white,
    alignSelf: 'center',
    textAlign: 'center'
}

/***********************************************************************************************
export
***********************************************************************************************/

export default {

    /** the colors used in the theme */
    colors: defaultColors,

    /** default ui-settings */
    ui: defaultUiSettings,

    /** default values for various properties used throughout the application */
    values: defaultValues,

    /** default values for various properties used throughout the application */
    fonts: defaultFonts,

    /** default stylesheet-objects used throughout the application */
    classes: {
        button,
        buttonAlert,
        buttonPrimary,
        buttonLabel
    }
}
