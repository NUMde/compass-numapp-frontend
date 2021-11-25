export default {
    /** strings for accessibility features (i.e. VoiceOver) */
    accessibility: {
        types: {
            button: "button",
            header: "header",
        },

        refresh: "de_string_refresh",
        refreshHint: "de_string_refreshHint",

        back: "de_string_back",
        backHint: "de_string_backHint",

        close: "de_string_close",
        closeHint: "de_string_closeHint",

        accept: "de_string_accept",
        cancel: "de_string_cancel",
        acceptHint: "de_string_acceptHint",

        menu: "de_string_menu",
        menuHint: "de_string_menuHint",

        logoutHint: "de_string_logoutHint",
        loginHint: "de_string_loginHint",

        questionnaire: {
            middleButtonFinished: "de_string_middleButtonFinished",
            middleButtonUnfinished: "de_string_middleButtonUnfinished",
            middleButtonHint: "de_string_middleButtonHint",

            rightButtonHint: "de_string_rightButtonHint",
            leftButtonHint: "de_string_leftButtonHint",
            alertButtonHint: "de_string_alertButtonHint",

            questionnaireCellHint: "de_string_questionnaireCellHint",
            categoryCellHint: "de_string_categoryCellHint",
            category: "de_string_category",
            questionnaire: "de_string_questionnaire",
            notStarted: "de_string_notStarted",
            notFinished: "de_string_notFinished",
            finished: "de_string_finished",

            sendHint: "de_string_sendHint",

            multipleChoice: "de_string_multipleChoice",
            singleChoice: "de_string_singleChoice",
            textFieldHint: "de_string_textFieldHint",
            dateFieldHint: "de_string_dateFieldHint",
            sliderFieldEquals: "de_string_sliderFieldEquals",
            sliderFieldAnd: ", and ",

            triggerHint: "de_string_triggerHint",
        },
    },

    /** contains all string rendered on the login-screen, as well as the ones for the landing-screen */
    login: {
        title: "Login",
        subTitle: "",
        submit: "Login",
        user: "subject-id",
        pass: "Passwort",
        waiting: "Melde an",
        errorPass: "Bitter versuchen Sie es erneut.",
        noSubjectId: "Keine gültige SubjectID gefunden.",
        errorUserUnauthorized: "Ungültige Zugangsdaten.",
        qrInfo: "Bitte richten Sie die Kamera auf den QR-Code.",
        errorUserGeneric: "Es gab ein problem während der Anmeldung.",
        permissionDialog: "Bitte gewähren Sie der App Zugang zu Ihrer Kamera.",
        nextStepAfterError: "Bitte versuchen Sie später erneut sich anzumelden.",

        /** contains all strings of the landing-screen */
        landing: {
            buttonText: "Zur Anmeldung",
            title: "",
            subTitle: "",
            welcomeTitle: "Willkommen bei COMPASS\n(React Native Client)",
            text: "Dies ist der Landebildschirm.\n\nHier können Willkommensnachrichten angezeigt, der Login-Prozess erklärt oder der Datenschutz näher beleuchtet werden.\n\nDie Logo-Datei (und die Hintergrundgrafik) können im Order 'CUSTOMIZATION' verändert werden.",
            autoLoginErrorTitle: "Automatischer Login fehlgeschlagen.",
            autoLoginError: "Während des automatischen Logins kam es zu einem Problem. Bitte überprüfen Sie Ihre Netzwerkverbindung.",
            retry: "erneut versuchen",
        },
    },

    /** strings with generic purpose that can be used throughout the application */
    generic: {
        ok: "de_string_ok",
        error: "de_string_error",
        abort: "de_string_abort",
        warning: "de_string_warning",
        info: "de_string_info",
        errorTitle: "de_string_errorTitle",
        successTitle: "de_string_successTitle",
        delete: "de_string_delete",
        goBack: "de_string_goBack",
        logoutWarning: "de_string_logoutWarning",
        sendSuccess: "de_string_sendSuccess",
        sendError: "de_string_sendError",
        sendErrorTwoDevices: "de_string_sendErrorTwoDevices",
        eraseAllWarning: "de_string_eraseAllWarning",
        eraseLocalDataAtEndOfStudyText: "de_string_eraseLocalDataAtEndOfStudyText",
        eraseLocalDataAtEndOfStudyTitle: "de_string_eraseLocalDataAtEndOfStudyTitle",
        updateError: "de_string_updateError",
        infoRemoval: "de_string_infoRemoval",
        reportWhileInIteratedMode: "de_string_reportWhileInIteratedMode",
        reportWhileQuestionnaire: "de_string_reportWhileQuestionnaire",
    },

    /** strings of the about-screen */
    about: {
        title: "de_string_title",
        subTitle: "de_string_subTitle",
        logout: "de_string_logout",
        delete: "de_string_delete",
        demoDelete: "de_string_demoDelete",

        /** contains the strings for the optional LegalInformation Screen */
        legal: {
            title: "de_string_title",
            subTitle: "de_string_subTitle",
            iconType: "entypo",
            iconTitle: "archive",
        },
    },

    /** contains the strings for the legal information screen */
    legalInformation: {
        title: "de_string_title",
        subTitle: "de_string_subTitle",
        headline: "de_string_headline",

        content: "de_string_content",
    },

    /** strings of the survey-screen */
    survey: {
        subTitle: "de_string_subTitle",
        logout: "de_string_logout",
        subTitleCheckIn: "de_string_subTitleCheckIn",
        title: "de_string_title",
        isLoading: "de_string_isLoading",
        yourAnswer: "de_string_yourAnswer",
        titleCheckIn: "de_string_titleCheckIn",
        welcomeTitle: "de_string_welcomeTitle",
        noUserTitle: "de_string_noUserTitle",
        sendFinished: "de_string_sendFinished",
        send: "de_string_send",
        additionalAnswer: "de_string_additionalAnswer",
        alternativeAnswer: "de_string_alternativeAnswer",
        surveySubTitle: "de_string_surveySubTitle",
        surveyTitle: "de_string_surveyTitle",
        inputPlaceholder: "de_string_inputPlaceholder",
        endedStudyTitle: "de_string_endedStudyTitle",
        noQuestionnaireTitle: "de_string_noQuestionnaireTitle",
        loadingQuestionnaire: "de_string_loadingQuestionnaire",
        inputPlaceholderTime: "de_string_inputPlaceholderTime",
        sessionTimeout: "de_string_sessionTimeout",
        reloadingQuestionnaire: "de_string_reloadingQuestionnaire",
        welcomeTitleFirstTime: "de_string_welcomeTitleFirstTime",
        surveyTitleFirstTime: "de_string_surveyTitleFirstTime",
        noUserText: "de_string_noUserText",
        welcomeTextFirstTimeUser2: "de_string_welcomeTextFirstTimeUser2",
        sendFinishedMessage: "de_string_sendFinishedMessage",
        noNewQuestionnaireAvailableYetTitle: "de_string_noNewQuestionnaireAvailableYetTitle",
        sendUnfinishedMessageDenied: "de_string_sendUnfinishedMessageDenied",
        endedStudyText: "de_string_endedStudyText",
        nextOne: "de_string_nextOne",
        noQuestionnaireText: "de_string_noQuestionnaireText",
        noNewQuestionnaireAvailableYet: "de_string_noNewQuestionnaireAvailableYet",
        nextOneNew: "de_string_nextOneNew",
        furtherInfo: "de_string_furtherInfo",
        welcomeTextUser: "de_string_welcomeTextUser",
        welcomeTextFirstTimeUser1: "de_string_welcomeTextFirstTimeUser1",
    },

    /** strings for the special-report-flow */
    reporting: {
        symptoms_no: "de_string_symptoms_no",
        symptoms_yes: "de_string_symptoms_yes",
        symptoms_success_ok: "de_string_symptoms_success_ok",
        symptoms_success_header: "de_string_symptoms_success_header",
        symptoms_header: "de_string_symptoms_header",
        symptoms_success_message: "de_string_symptoms_success_message",
        symptoms_question: "de_string_symptoms_question",
    },

    /** each entry in this array will generate a new listItem on the about-screen. When clicked on such an item, a webView will open that
     * can display any website. "iconType" is the name of a free Webfont and the title is the name of the particular icon. .
     * as this app is using react-native-elements, the list of compatible fonts can be found in its documentation:
     * https://reactnativeelements.com/docs/icon
     */
    webViews: [{
            title: "de_string_title_1_1",
            subTitle: "de_string_subTitle_1_1",
            screenSubTitle: "de_string_screenSubTitle_1_1",
            uri: "https://github.blog/",
            iconTitle: "light-bulb",
            iconType: "entypo",
        },
        {
            title: "de_string_title_1_2",
            subTitle: "de_string_subTitle_1_2",
            screenSubTitle: "de_string_screenSubTitle_1_2",
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
            title: "de_string_title_2_1",
            subTitle: "de_string_subTitle_2_1",
            text: "de_string_text_2_1",
            uri: "https://github.blog/",
            iconTitle: "link",
            iconType: "entypo",
        },
        {
            title: "de_string_title_2_2",
            subTitle: "de_string_subTitle_2_2",
            text: "de_string_text_2_2",
            uri: "https://ibm.com/",
            iconTitle: "link",
            iconType: "entypo",
        },
    ],
};