export default {
  /** strings for accessibility features (i.e. VoiceOver) */
  accessibility: {
      types: {
          button: "button",
          header: "header",
      },

      refresh: "fr_string_refresh",
      refreshHint: "fr_string_refreshHint",

      back: "fr_string_back",
      backHint: "fr_string_backHint",

      close: "fr_string_close",
      closeHint: "fr_string_closeHint",

      accept: "fr_string_accept",
      cancel: "fr_string_cancel",
      acceptHint: "fr_string_acceptHint",

      menu: "fr_string_menu",
      menuHint: "fr_string_menuHint",

      logoutHint: "fr_string_logoutHint",
      loginHint: "fr_string_loginHint",

      questionnaire: {
          middleButtonFinished: "fr_string_middleButtonFinished",
          middleButtonUnfinished: "fr_string_middleButtonUnfinished",
          middleButtonHint: "fr_string_middleButtonHint",

          rightButtonHint: "fr_string_rightButtonHint",
          leftButtonHint: "fr_string_leftButtonHint",
          alertButtonHint: "fr_string_alertButtonHint",

          questionnaireCellHint: "fr_string_questionnaireCellHint",
          categoryCellHint: "fr_string_categoryCellHint",
          category: "fr_string_category",
          questionnaire: "fr_string_questionnaire",
          notStarted: "fr_string_notStarted",
          notFinished: "fr_string_notFinished",
          finished: "fr_string_finished",

          sendHint: "fr_string_sendHint",

          multipleChoice: "fr_string_multipleChoice",
          singleChoice: "fr_string_singleChoice",
          textFieldHint: "fr_string_textFieldHint",
          dateFieldHint: "fr_string_dateFieldHint",
          sliderFieldEquals: "fr_string_sliderFieldEquals",
          sliderFieldAnd: ", and ",

          triggerHint: "fr_string_triggerHint",
      },
  },

  /** contains all string rendered on the login-screen, as well as the ones for the landing-screen */
  login: {
    title: "fr_string_title",
    subTitle: "fr_string_subTitle",
    submit: "fr_string_submit",
    user: "fr_string_user",
    pass: "fr_string_pass",
    waiting: "fr_string_waiting",
    errorPass: "fr_string_errorPass",
    noSubjectId: "fr_string_noSubjectId",
    errorUserUnauthorized: "fr_string_errorUserUnauthorized",
    qrInfo: "fr_string_qrInfo",
    errorUserGeneric: "fr_string_errorUserGeneric",
    permissionDialog: "fr_string_permissionDialog",
    nextStepAfterError: "fr_string_nextStepAfterError",

    /** contains all strings of the landing-screen */
    landing: {
      buttonText: "fr_string_buttonText",
      title: "fr_string_title",
      subTitle: "fr_string_subTitle",
      welcomeTitle: "fr_string_welcomeTitle",
      text: "fr_string_text",
      autoLoginErrorTitle: "fr_string_autoLoginErrorTitle",
      autoLoginError: "fr_string_autoLoginError",
      retry: "fr_string_retry",
    },
  },

  /** strings with generic purpose that can be used throughout the application */
  generic: {
      ok: "fr_string_ok",
      error: "fr_string_error",
      abort: "fr_string_abort",
      warning: "fr_string_warning",
      info: "fr_string_info",
      errorTitle: "fr_string_errorTitle",
      successTitle: "fr_string_successTitle",
      delete: "fr_string_delete",
      goBack: "fr_string_goBack",
      logoutWarning: "fr_string_logoutWarning",
      sendSuccess: "fr_string_sendSuccess",
      sendError: "fr_string_sendError",
      sendErrorTwoDevices: "fr_string_sendErrorTwoDevices",
      eraseAllWarning: "fr_string_eraseAllWarning",
      eraseLocalDataAtEndOfStudyText: "fr_string_eraseLocalDataAtEndOfStudyText",
      eraseLocalDataAtEndOfStudyTitle: "fr_string_eraseLocalDataAtEndOfStudyTitle",
      updateError: "fr_string_updateError",
      infoRemoval: "fr_string_infoRemoval",
      reportWhileInIteratedMode: "fr_string_reportWhileInIteratedMode",
      reportWhileQuestionnaire: "fr_string_reportWhileQuestionnaire",
  },

  /** strings of the about-screen */
  about: {
      title: "fr_string_title",
      subTitle: "fr_string_subTitle",
      logout: "fr_string_logout",
      delete: "fr_string_delete",
      demoDelete: "fr_string_demoDelete",

      /** contains the strings for the optional LegalInformation Screen */
      legal: {
          title: "fr_string_title",
          subTitle: "fr_string_subTitle",
          iconType: "entypo",
          iconTitle: "archive",
      },
  },

  /** contains the strings for the legal information screen */
  legalInformation: {
      title: "fr_string_title",
      subTitle: "fr_string_subTitle",
      headline: "fr_string_headline",

      content: "fr_string_content",
  },

  /** strings of the survey-screen */
  survey: {
      subTitle: "fr_string_subTitle",
      logout: "fr_string_logout",
      subTitleCheckIn: "fr_string_subTitleCheckIn",
      title: "fr_string_title",
      isLoading: "fr_string_isLoading",
      yourAnswer: "fr_string_yourAnswer",
      titleCheckIn: "fr_string_titleCheckIn",
      welcomeTitle: "fr_string_welcomeTitle",
      noUserTitle: "fr_string_noUserTitle",
      sendFinished: "fr_string_sendFinished",
      send: "fr_string_send",
      additionalAnswer: "fr_string_additionalAnswer",
      alternativeAnswer: "fr_string_alternativeAnswer",
      surveySubTitle: "fr_string_surveySubTitle",
      surveyTitle: "fr_string_surveyTitle",
      inputPlaceholder: "fr_string_inputPlaceholder",
      endedStudyTitle: "fr_string_endedStudyTitle",
      noQuestionnaireTitle: "fr_string_noQuestionnaireTitle",
      loadingQuestionnaire: "fr_string_loadingQuestionnaire",
      inputPlaceholderTime: "fr_string_inputPlaceholderTime",
      sessionTimeout: "fr_string_sessionTimeout",
      reloadingQuestionnaire: "fr_string_reloadingQuestionnaire",
      welcomeTitleFirstTime: "fr_string_welcomeTitleFirstTime",
      surveyTitleFirstTime: "fr_string_surveyTitleFirstTime",
      noUserText: "fr_string_noUserText",
      welcomeTextFirstTimeUser2: "fr_string_welcomeTextFirstTimeUser2",
      sendFinishedMessage: "fr_string_sendFinishedMessage",
      noNewQuestionnaireAvailableYetTitle: "fr_string_noNewQuestionnaireAvailableYetTitle",
      sendUnfinishedMessageDenied: "fr_string_sendUnfinishedMessageDenied",
      endedStudyText: "fr_string_endedStudyText",
      nextOne: "fr_string_nextOne",
      noQuestionnaireText: "fr_string_noQuestionnaireText",
      noNewQuestionnaireAvailableYet: "fr_string_noNewQuestionnaireAvailableYet",
      nextOneNew: "fr_string_nextOneNew",
      furtherInfo: "fr_string_furtherInfo",
      welcomeTextUser: "fr_string_welcomeTextUser",
      welcomeTextFirstTimeUser1: "fr_string_welcomeTextFirstTimeUser1",
  },

  /** strings for the special-report-flow */
  reporting: {
      symptoms_no: "fr_string_symptoms_no",
      symptoms_yes: "fr_string_symptoms_yes",
      symptoms_success_ok: "fr_string_symptoms_success_ok",
      symptoms_success_header: "fr_string_symptoms_success_header",
      symptoms_header: "fr_string_symptoms_header",
      symptoms_success_message: "fr_string_symptoms_success_message",
      symptoms_question: "fr_string_symptoms_question",
  },

  /** each entry in this array will generate a new listItem on the about-screen. When clicked on such an item, a webView will open that
   * can display any website. "iconType" is the name of a free Webfont and the title is the name of the particular icon. .
   * as this app is using react-native-elements, the list of compatible fonts can be found in its documentation:
   * https://reactnativeelements.com/docs/icon
   */
  webViews: [{
          title: "fr_string_title_1_1",
          subTitle: "fr_string_subTitle_1_1",
          screenSubTitle: "fr_string_screenSubTitle_1_1",
          uri: "https://github.blog/",
          iconTitle: "light-bulb",
          iconType: "entypo",
      },
      {
          title: "fr_string_title_1_2",
          subTitle: "fr_string_subTitle_1_2",
          screenSubTitle: "fr_string_screenSubTitle_1_2",
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
          title: "fr_string_title_2_1",
          subTitle: "fr_string_subTitle_2_1",
          text: "fr_string_text_2_1",
          uri: "https://github.blog/",
          iconTitle: "link",
          iconType: "entypo",
      },
      {
          title: "fr_string_title_2_2",
          subTitle: "fr_string_subTitle_2_2",
          text: "fr_string_text_2_2",
          uri: "https://ibm.com/",
          iconTitle: "link",
          iconType: "entypo",
      },
  ],
};