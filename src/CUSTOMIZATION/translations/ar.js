export default {
  /** strings for accessibility features (i.e. VoiceOver) */
  accessibility: {
      types: {
          button: "button",
          header: "header",
      },

      refresh: "ar_string_refresh",
      refreshHint: "ar_string_refreshHint",

      back: "ar_string_back",
      backHint: "ar_string_backHint",

      close: "ar_string_close",
      closeHint: "ar_string_closeHint",

      accept: "ar_string_accept",
      cancel: "ar_string_cancel",
      acceptHint: "ar_string_acceptHint",

      menu: "ar_string_menu",
      menuHint: "ar_string_menuHint",

      logoutHint: "ar_string_logoutHint",
      loginHint: "ar_string_loginHint",

      questionnaire: {
          middleButtonFinished: "ar_string_middleButtonFinished",
          middleButtonUnfinished: "ar_string_middleButtonUnfinished",
          middleButtonHint: "ar_string_middleButtonHint",

          rightButtonHint: "ar_string_rightButtonHint",
          leftButtonHint: "ar_string_leftButtonHint",
          alertButtonHint: "ar_string_alertButtonHint",

          questionnaireCellHint: "ar_string_questionnaireCellHint",
          categoryCellHint: "ar_string_categoryCellHint",
          category: "ar_string_category",
          questionnaire: "ar_string_questionnaire",
          notStarted: "ar_string_notStarted",
          notFinished: "ar_string_notFinished",
          finished: "ar_string_finished",

          sendHint: "ar_string_sendHint",

          multipleChoice: "ar_string_multipleChoice",
          singleChoice: "ar_string_singleChoice",
          textFieldHint: "ar_string_textFieldHint",
          dateFieldHint: "ar_string_dateFieldHint",
          sliderFieldEquals: "ar_string_sliderFieldEquals",
          sliderFieldAnd: ", and ",

          triggerHint: "ar_string_triggerHint",
      },
  },

  /** contains all string rendered on the login-screen, as well as the ones for the landing-screen */
  login: {
    title: "ar_string_title",
    subTitle: "ar_string_subTitle",
    submit: "ar_string_submit",
    user: "ar_string_user",
    pass: "ar_string_pass",
    waiting: "ar_string_waiting",
    errorPass: "ar_string_errorPass",
    noSubjectId: "ar_string_noSubjectId",
    errorUserUnauthorized: "ar_string_errorUserUnauthorized",
    qrInfo: "ar_string_qrInfo",
    errorUserGeneric: "ar_string_errorUserGeneric",
    permissionDialog: "ar_string_permissionDialog",
    nextStepAfterError: "ar_string_nextStepAfterError",

    /** contains all strings of the landing-screen */
    landing: {
      buttonText: "ar_string_buttonText",
      title: "ar_string_title",
      subTitle: "ar_string_subTitle",
      welcomeTitle: "ar_string_welcomeTitle",
      text: "ar_string_text",
      autoLoginErrorTitle: "ar_string_autoLoginErrorTitle",
      autoLoginError: "ar_string_autoLoginError",
      retry: "ar_string_retry",
    },
  },

  /** strings with generic purpose that can be used throughout the application */
  generic: {
      ok: "ar_string_ok",
      error: "ar_string_error",
      abort: "ar_string_abort",
      warning: "ar_string_warning",
      info: "ar_string_info",
      errorTitle: "ar_string_errorTitle",
      successTitle: "ar_string_successTitle",
      delete: "ar_string_delete",
      goBack: "ar_string_goBack",
      logoutWarning: "ar_string_logoutWarning",
      sendSuccess: "ar_string_sendSuccess",
      sendError: "ar_string_sendError",
      sendErrorTwoDevices: "ar_string_sendErrorTwoDevices",
      eraseAllWarning: "ar_string_eraseAllWarning",
      eraseLocalDataAtEndOfStudyText: "ar_string_eraseLocalDataAtEndOfStudyText",
      eraseLocalDataAtEndOfStudyTitle: "ar_string_eraseLocalDataAtEndOfStudyTitle",
      updateError: "ar_string_updateError",
      infoRemoval: "ar_string_infoRemoval",
      reportWhileInIteratedMode: "ar_string_reportWhileInIteratedMode",
      reportWhileQuestionnaire: "ar_string_reportWhileQuestionnaire",
  },

  /** strings of the about-screen */
  about: {
      title: "ar_string_title",
      subTitle: "ar_string_subTitle",
      logout: "ar_string_logout",
      delete: "ar_string_delete",
      demoDelete: "ar_string_demoDelete",

      /** contains the strings for the optional LegalInformation Screen */
      legal: {
          title: "ar_string_title",
          subTitle: "ar_string_subTitle",
          iconType: "entypo",
          iconTitle: "archive",
      },
  },

  /** contains the strings for the legal information screen */
  legalInformation: {
      title: "ar_string_title",
      subTitle: "ar_string_subTitle",
      headline: "ar_string_headline",

      content: "ar_string_content",
  },

  /** strings of the survey-screen */
  survey: {
      subTitle: "ar_string_subTitle",
      logout: "ar_string_logout",
      subTitleCheckIn: "ar_string_subTitleCheckIn",
      title: "ar_string_title",
      isLoading: "ar_string_isLoading",
      yourAnswer: "ar_string_yourAnswer",
      titleCheckIn: "ar_string_titleCheckIn",
      welcomeTitle: "ar_string_welcomeTitle",
      noUserTitle: "ar_string_noUserTitle",
      sendFinished: "ar_string_sendFinished",
      send: "ar_string_send",
      additionalAnswer: "ar_string_additionalAnswer",
      alternativeAnswer: "ar_string_alternativeAnswer",
      surveySubTitle: "ar_string_surveySubTitle",
      surveyTitle: "ar_string_surveyTitle",
      inputPlaceholder: "ar_string_inputPlaceholder",
      endedStudyTitle: "ar_string_endedStudyTitle",
      noQuestionnaireTitle: "ar_string_noQuestionnaireTitle",
      loadingQuestionnaire: "ar_string_loadingQuestionnaire",
      inputPlaceholderTime: "ar_string_inputPlaceholderTime",
      sessionTimeout: "ar_string_sessionTimeout",
      reloadingQuestionnaire: "ar_string_reloadingQuestionnaire",
      welcomeTitleFirstTime: "ar_string_welcomeTitleFirstTime",
      surveyTitleFirstTime: "ar_string_surveyTitleFirstTime",
      noUserText: "ar_string_noUserText",
      welcomeTextFirstTimeUser2: "ar_string_welcomeTextFirstTimeUser2",
      sendFinishedMessage: "ar_string_sendFinishedMessage",
      noNewQuestionnaireAvailableYetTitle: "ar_string_noNewQuestionnaireAvailableYetTitle",
      sendUnfinishedMessageDenied: "ar_string_sendUnfinishedMessageDenied",
      endedStudyText: "ar_string_endedStudyText",
      nextOne: "ar_string_nextOne",
      noQuestionnaireText: "ar_string_noQuestionnaireText",
      noNewQuestionnaireAvailableYet: "ar_string_noNewQuestionnaireAvailableYet",
      nextOneNew: "ar_string_nextOneNew",
      furtherInfo: "ar_string_furtherInfo",
      welcomeTextUser: "ar_string_welcomeTextUser",
      welcomeTextFirstTimeUser1: "ar_string_welcomeTextFirstTimeUser1",
  },

  /** strings for the special-report-flow */
  reporting: {
      symptoms_no: "ar_string_symptoms_no",
      symptoms_yes: "ar_string_symptoms_yes",
      symptoms_success_ok: "ar_string_symptoms_success_ok",
      symptoms_success_header: "ar_string_symptoms_success_header",
      symptoms_header: "ar_string_symptoms_header",
      symptoms_success_message: "ar_string_symptoms_success_message",
      symptoms_question: "ar_string_symptoms_question",
  },

  /** each entry in this array will generate a new listItem on the about-screen. When clicked on such an item, a webView will open that
   * can display any website. "iconType" is the name of a free Webfont and the title is the name of the particular icon. .
   * as this app is using react-native-elements, the list of compatible fonts can be found in its documentation:
   * https://reactnativeelements.com/docs/icon
   */
  webViews: [{
          title: "ar_string_title_1_1",
          subTitle: "ar_string_subTitle_1_1",
          screenSubTitle: "ar_string_screenSubTitle_1_1",
          uri: "https://github.blog/",
          iconTitle: "light-bulb",
          iconType: "entypo",
      },
      {
          title: "ar_string_title_1_2",
          subTitle: "ar_string_subTitle_1_2",
          screenSubTitle: "ar_string_screenSubTitle_1_2",
          uri: "https://dmw.hih-2025.de/livestream/",
          iconTitle: "light-bulb",
          iconType: "entypo",
      },
  ],

  /** each entry in this array will generate a new listItem on the about-screen. When clicked on such an item, a modal will open
   * that informs the user that he/she is being redirected to their local browser. "iconType" is the name of a free Webfont and the title is the name of the particular icon. .
   * as this app is using react-native-elements, the list of compatible fonts can be found in its documentation:
   * https://reactnativeelements.com/docs/icon
   */
  modalLinks: [{
          title: "ar_string_title_2_1",
          subTitle: "ar_string_subTitle_2_1",
          text: "ar_string_text_2_1",
          uri: "https://github.blog/",
          iconTitle: "link",
          iconType: "entypo",
      },
      {
          title: "ar_string_title_2_2",
          subTitle: "ar_string_subTitle_2_2",
          text: "ar_string_text_2_2",
          uri: "https://ibm.com/",
          iconTitle: "link",
          iconType: "entypo",
      },
  ],
};