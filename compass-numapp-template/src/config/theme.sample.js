/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
import
***********************************************************************************************/

import { StyleSheet } from 'react-native';
import appConfig from './appConfig';

// ================================================================================================
// ================================================================================================
// THEME CONFIGURATION VALUES
// TO CUSTOMIZE THE DESIGN AND BEHAVIOUR OF THE APP ADJUST THA VALUES AND PARAMETERS BELOW

// default ui-settings
// default ui-settings
// default ui-settings
// default ui-settings
/*-----------------------------------------------------------------------------------*/

const uiSettings = {
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
   * work, you need to place a new LogoBackground.png file into 'src/CUSTOMIZATION/images'
   */
  useCustomLogoBackground: false,

  /** ui-option
	 * allows the use of an scroll-wrapper that permanently shows the scroll indicator
	(this is only used on the screens, not in the modals) */
  allowScrollIndicators: true,
};

//  colors
/*-----------------------------------------------------------------------------------*/

const colors = {
  /** the primary color of the scheme. most buttons are of this color by , as is the top banner */
  primary: '#1F2532',

  /** highlighting for a not fully completed questionnaire (yellow-ish by ) */
  secondary: '#FFC107',

  /** highlighting for completed questionnaires, as well as some icons (green-ish by ) */
  success: '#006864',

  /** mostly used for "abort"-buttons and error messages (red-ish by ) */
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
};

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

const fonts = StyleSheet.create({
  header0: {
    fontFamily: 'IBMPlexSans-SemiBold',
    fontSize: appConfig.scaleFontsFkt(25),
    lineHeight: appConfig.scaleFontsFkt(25 + 5),
  },

  header1: {
    fontFamily: 'IBMPlexSans-SemiBold',
    fontSize: appConfig.scaleFontsFkt(22),
    lineHeight: appConfig.scaleFontsFkt(22 + 5),
  },

  header2: {
    fontFamily: 'IBMPlexSans-SemiBold',
    fontSize: appConfig.scaleFontsFkt(18),
    lineHeight: appConfig.scaleFontsFkt(18 + 5),
  },

  header3: {
    fontFamily: 'IBMPlexSans-SemiBold',
    fontSize: appConfig.scaleFontsFkt(14),
    lineHeight: appConfig.scaleFontsFkt(14 + 5),
  },

  title: {
    fontFamily: 'IBMPlexSans-SemiBold',
    fontSize: appConfig.scaleFontsFkt(24),
    lineHeight: appConfig.scaleFontsFkt(24 + 5),
  },

  title2: {
    fontFamily: 'IBMPlexSans-SemiBold',
    fontSize: appConfig.scaleFontsFkt(16),
    lineHeight: appConfig.scaleFontsFkt(15 + 5),
  },

  subHeader1: {
    fontFamily: 'IBMPlexSans',
    fontSize: appConfig.scaleFontsFkt(16),
    lineHeight: appConfig.scaleFontsFkt(16 + 5),
  },

  body: {
    fontFamily: 'IBMPlexSans',
    fontSize: appConfig.scaleFontsFkt(15),
    lineHeight: appConfig.scaleFontsFkt(15 + 5),
  },

  label: {
    fontFamily: 'IBMPlexSans-SemiBold',
    fontSize: appConfig.scaleFontsFkt(14),
    lineHeight: appConfig.scaleFontsFkt(14 + 5),
  },

  hint: {
    fontFamily: 'IBMPlexSans',
    fontSize: appConfig.scaleFontsFkt(12),
    lineHeight: appConfig.scaleFontsFkt(12 + 5),
  },

  inputPlaceholder: {
    fontFamily: 'IBMPlexSans-Italic',
    fontSize: appConfig.scaleFontsFkt(15),
    lineHeight: appConfig.scaleFontsFkt(15 + 5),
  },

  bold: {
    fontFamily: 'IBMPlexSans-SemiBold',
    fontSize: appConfig.scaleFontsFkt(17),
    lineHeight: appConfig.scaleFontsFkt(17 + 5),
  },
});

//  values
/*-----------------------------------------------------------------------------------*/

// the following values represent different  values that are used throughout the application.

/**  values for various properties used throughout the application */
const values = {
  // background color
  BackgroundColor: colors.white,
  ParagraphTextColor: colors.accent4,
  TitleTextColor: colors.accent4,

  // banner
  BannerBackgroundColor: colors.white,
  BannerButtonColor: colors.alert,
  BannerTitleColor: colors.accent4,
  BannerSubTitleColor: colors.accent4,
  StatusBarStyleIos: 'dark-content',
  StatusBarStyleAndroid: 'dark-content',
  StatusBarAndroidBackgroundColor: '#EFEFEF',

  // loading-spinner
  SpinnerBackgroundColor: colors.primary,
  SpinnerColor: colors.alert,

  // buttons
  ButtonAlignSelf: 'center',
  ButtonBorderRadius: 50,
  ButtonBorderWidth: 0,
  ButtonPadding: 15,
  ButtonWidth: '100%',

  // survey-screen
  SurveyItemBackgroundColor: colors.white,
  SurveyItemTitleColor: colors.accent4,
  SurveyIconUntouchedColor: colors.alert,
  SurveyIconTouchedColor: colors.secondary,
  SurveyIconCompletedColor: colors.success,

  // checkIn-screen
  CheckInListViewTitleColor: colors.white,
  CheckInListViewSubTitleColor: colors.accent3,
  ContainerUntouchedBackgroundColor: colors.alert,
  ContainerTouchedBackgroundColor: colors.secondary,
  ContainerCompletedBackgroundColor: colors.success,
  ContainerUntouchedBorderColor: colors.alert,
  ContainerTouchedBorderColor: colors.secondary,
  ContainerCompletedBorderColor: colors.success,
  TimeSuccessColor: colors.success,
  ActiveTile: colors.primary,
  DisabledTile: colors.accent2,
  SendQuestionnaireButtonBackgroundColor: colors.success,

  // list-item (about screen)
  ListItemIconColor: colors.success,
  ListItemBackgroundColor: colors.white,

  // list-link (about screen)
  ListLinkIconColor: colors.alert,
  legalListLinkIconColor: colors.primary,
  ListLinkBackgroundColor: colors.white,

  // modal
  ModalContentBackgroundColor: colors.white,
  ModalTitleColor: colors.accent4,
  ModalContentTextColor: colors.accent4,
  ModalBottomBarBackgroundColor: colors.white,
  ModalSeparatorBackgroundColor: colors.accent2,
  ModalBorderColor: colors.white,
  SeparatorColor: colors.accent2,
  ModalBorderRadius: 10,

  // scrollIndicator
  ScrollIndicatorBackgroundColor: colors.alert,
  ScrollIndicatorIconColor: colors.white,
};

// stylesheet-objects
/*-----------------------------------------------------------------------------------*/

// the following are  stylesheet-objects that are used throughout the application.
// individual changes to it (depended on the component thats using it) can be found in
// the local styleSheet variable.

//  buttons

const button = {
  borderRadius: values.ButtonBorderRadius,
  borderWidth: values.ButtonBorderWidth,
  padding: values.ButtonPadding,
  alignSelf: values.ButtonAlignSelf,
  width: values.ButtonWidth,
};

const buttonPrimary = {
  ...button,
  backgroundColor: colors.primary,
  borderColor: colors.primary,
};

const buttonAlert = {
  ...button,
  backgroundColor: colors.alert,
  borderColor: colors.alert,
};

const buttonLabel = {
  ...fonts.label,
  color: colors.white,
  alignSelf: 'center',
  textAlign: 'center',
};

/***********************************************************************************************
export
***********************************************************************************************/

export default {
  /** the colors used in the theme */
  colors,

  /**  ui-settings */
  uiSettings,

  /**  values for various properties used throughout the application */
  values,

  /**  values for various properties used throughout the application */
  fonts,

  /**  stylesheet-objects used throughout the application */
  classes: {
    button,
    buttonAlert,
    buttonPrimary,
    buttonLabel,
  },
};
