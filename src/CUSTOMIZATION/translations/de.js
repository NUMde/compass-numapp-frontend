export default {
  /** strings for accessibility features (i.e. VoiceOver) */
  accessibility: {
    types: {
      button: 'button',
      header: 'header',
    },

    refresh: 'Aktualisierung',
    refreshHint:
      'Holen Sie sich den Fragebogen und den Status neu.Die aktuelle Seite wird aktualisiert.',

    back: 'zurück',
    backHint: 'Springt zur vorherigen Seite.',

    close: 'nah dran',
    closeHint: 'Schließt die aktuelle Seite oder Modal.',

    accept: 'annehmen',
    cancel: 'Abbrechen',
    acceptHint:
      'Wechselt in die Standard-Browser-Anwendung und öffnet dort Link.',

    menu: 'Weitere Informationen',
    menuHint: 'Öffnet neue Seite mit zusätzlichen Informationen und Links.',

    logoutHint: 'Startet den Abmeldeprozess und umleiten die Anmeldeseite.',
    loginHint: 'Startet Anmeldevorgang und leitet den QRCODE-Scanner um.',

    questionnaire: {
      middleButtonFinished: 'Nächste Frage. Frage wird beantwortet.',
      middleButtonUnfinished:
        'Nächste Frage, obwohl die Frage noch nicht beantwortet wird.',
      middleButtonHint:
        'Springt zu den nächsten Fragen oder schließt das Modal, wenn dies die letzte Frage war.',

      rightButtonHint: 'Springt zur nächsten Frage.',
      leftButtonHint: 'Springt zur vorherigen Frage.',
      alertButtonHint: 'Schließt den Alarm.',

      questionnaireCellHint:
        'Öffnet neue Seite, um die Kategorien der Fragebogen anzuzeigen.',
      categoryCellHint:
        'Öffnet MODAL, um diesen Fragebogeneintrag auszufüllen.',
      category: 'Diese Kategorie',
      questionnaire: 'Dieser Fragebogen',
      notStarted: 'wurde noch nicht beantwortet.',
      notFinished:
        'wurde bereits gestartet, ist aber noch nicht vollständig ausgefüllt.',
      finished: 'ist vollständig vollständig.',

      sendHint: 'Sendet den Fragebogen an die Bewertung.',

      multipleChoice:
        'Multiple Choice - mehr als eine Antwortoption kann ausgewählt werden.',
      singleChoice:
        'Einzelne Wahl - Nur eine Antwort-Option kann ausgewählt werden.',
      textFieldHint:
        'Bitte füllen Sie hier die angeforderten Informationen aus.',
      dateFieldHint: 'Öffnet ein neues Modal, um ein Datum auszuwählen.',
      sliderFieldEquals: 'entspricht',
      sliderFieldAnd: ', und',

      triggerHint:
        'Wenn dieses Element ausgewählt ist, wird eine weitere zusätzliche Frage angezeigt, die mit diesem Element verbunden ist.Bitte füllen Sie auch die zusätzliche Frage aus.',
    },
  },

  /** contains all string rendered on the login-screen, as well as the ones for the landing-screen */
  login: {
    title: 'Anmeldung',
    subTitle: ' ',
    submit: 'Anmeldung',
    user: 'Subjekt-ID.',
    pass: 'Passwort',
    waiting: 'Einloggen...',
    errorPass: 'Bitte versuche es erneut.',
    noSubjectId: 'Kein gültiges SubjektD gefunden',
    errorUserUnauthorized: 'Ungültige Benutzerdaten.',
    qrInfo: 'Bitte zeigen Sie die Kamera auf den QR-Code.',
    errorUserGeneric: 'Beim Login trat ein Problem auf.',
    permissionDialog:
      'Bitte erlauben Sie der App, auf Ihre Kamera zuzugreifen.',
    nextStepAfterError: 'Bitte versuchen Sie es später erneut anzumelden.',

    /** contains all strings of the landing-screen */
    landing: {
      buttonText: 'Navigieren Sie zum Anmeldebildschirm',
      title: ' ',
      subTitle: ' ',
      welcomeTitle: 'Willkommen beim Compass \n  (Native Client reagieren)',
      text: 'Dies ist der Lande-Bildschirm. \n  \n it kann verwendet werden, um eine Begrüßungsnachricht anzuzeigen, detailliert den folgenden Login-Prozess zu detaillierenAktualisiert durch Aktualisierung des Ordners Anpassen.',
      autoLoginErrorTitle: 'Auto Login fehlgeschlagen',
      autoLoginError:
        'Beim Versuch, sich automatisch anzumelden, ist ein Fehler aufgetreten.Bitte überprüfen Sie Ihr Netzwerk und versuchen Sie es erneut',
      retry: 'wiederholen',
      deleteAll: 'Alle lokalen Daten löschen',
    },
  },

  /** strings with generic purpose that can be used throughout the application */
  generic: {
    questionnaire: 'Fragebogen',
    ok: 'okay',
    error: 'Fehler',
    abort: 'Abbrechen',
    warning: 'Warnung',
    info: 'information',
    errorTitle: 'Fehler',
    successTitle: 'Erfolg',
    delete: 'Ja, Daten löschen',
    goBack: 'Ja, bitte melden Sie sich an',
    logoutWarning: 'Logout Warnung',
    sendSuccess: 'Erfolgreich gesendete Daten',
    sendError:
      'Es gab einen Fehler, der die Daten übermittelt.Bitte versuche es erneut.',
    sendErrorTwoDevices:
      'Sie haben diesen Fragebogen bereits durch eine andere App gesendet.',
    eraseAllWarning:
      'Dadurch werden alle lokalen Daten gelöscht und loggt Sie an.Möchten Sie ein Verfahren?',
    eraseLocalDataAtEndOfStudyText:
      'Dies wird erneut das Ende der Studie betonen.Sobald der Benutzer die lokalen Daten bestätigt, wird der Teilnehmer abgemeldet.Möchten Sie vorausgehen?',
    eraseLocalDataAtEndOfStudyTitle: 'Löschen Sie lokale Daten und logout',
    wrongLanguageVersionDetected:
      'Der anhaltende Fragebogen stimmt nicht mit der aktuell ausgewählten Sprache auf Ihrem Gerät überein.Dieser Fragebogen wird nun durch eine passende Version ersetzt.Ihre Antworten gehen verloren.',
    updateError:
      'Beim Erhalten der angeforderten Daten ist ein Fehler aufgetreten - bitte versuchen Sie es erneut.',
    infoRemoval:
      'Der derzeit anhaltende Fragebogen ist veraltet und wird nun entfernt.',
    reportWhileInIteratedMode:
      'Dialog, um dem Benutzer mitzuteilen, dass er bereits in einem speziellen Bericht gesendet wurde und dass er gerade in einem speziellen Intervall ist.',
    reportWhileQuestionnaire:
      'Dialog, um dem Benutzer mitzuteilen, dass derzeit ein Fragebogen zur Verfügung steht und dass er das verwenden könnte, um über seinen Zustand zu berichten.',
  },

  /** strings of the about-screen */
  about: {
    title: 'Über',
    subTitle: 'Untertitel des Über-Screens',
    logout: 'Logout (nur auf dev)',
    delete: 'Alles löschen & logout (nur auf dev)',
    demoDelete: 'Alles löschen & Logout (nur für diese Demo)',
    languageSelection: 'Sprachauswahl',
    languageWarning:
      'Wenn Sie die Sprache ändern, während Sie einen persistierten Speicherplatz Ihrer aktuellen Antworten haben, wird das Save-STATE entfernt.',
    languageWarningAddition: '\nWillst du fortfahren?',

    /** contains the strings for the optional LegalInformation Screen */
    legal: {
      title: 'Link zum legalen Bildschirm',
      subTitle:
        'Diese Links werden optional gerendert (kann über die Entwicklung-Konfiguration aktiviert werden).Der Textinhalt dieses Bildschirms kann über die Textkonfiguration aktualisiert werden',
      iconType: 'entypo',
      iconTitle: 'archive',
    },
  },

  /** contains the strings for the legal information screen */
  legalInformation: {
    title: 'Rechtsbildschirm',
    subTitle: 'Rechtsuntertitel',
    headline: 'Beispiel Rechtschreibtext.',

    content:
      'Lorem-Karotten, Consetetur Sadipcing Elitr, aber der Durchmesser von Nonumy-Wurfzeit pro Monat, um zu arbeiten und Schmerz zu einer großen Aufregung, aber den Durchmesser des Projekts.Sie werden aber auch die Antwort sein, und die nur zwei der Schmerzen und die Subidents.Stand Clita Kasd Gubergren, Kein Sea Takimata Spirit ist ein Kundennarker-Karotten.Lorem-Karotten, Consetetur Sadipcing Elitr, aber der Durchmesser von Nonumy-Wurfzeit pro Monat, um zu arbeiten und Schmerz zu einer großen Aufregung, aber den Durchmesser des Projekts.Sie werden aber auch die Antwort sein, und die nur zwei der Schmerzen und die Subidents.Stand Clita Kasd Gubergren, Kein Sea Takimata Spirit ist ein Kundennarker-Karotten.',
  },

  /** strings of the survey-screen */
  survey: {
    subTitle: ' ',
    logout: 'Ausloggen',
    subTitleCheckIn: ' ',
    title: 'Fragebogen',
    isLoading: 'Wird geladen...',
    yourAnswer: 'Ihre Antwort',
    titleCheckIn: 'checkIn',
    welcomeTitle: 'Checkin-Titel',
    noUserTitle: 'Benutzer wurde nicht gefunden',
    sendFinished: 'Fragebogen senden.',
    send: 'Fragebogen-Schaltflächen-Titel senden',
    additionalAnswer: 'zusätzlicheAntwort',
    alternativeAnswer: 'alternativeAntwort',
    surveySubTitle: 'Bis zu ergänzen: ',
    surveyTitle: 'Ihr aktueller Fragebogen',
    inputPlaceholder: 'Bitte gib deine Antwort ein',
    endedStudyTitle: 'Ende des Teilnahme-Titels',
    noQuestionnaireTitle: 'Fragebogen nicht gefunden',
    loadingQuestionnaire: 'Anfragen \n Questionnaire.',
    inputPlaceholderTime: 'Bitte geben Sie das Datum hier ein',
    sessionTimeout: 'Ihr Benutzer konnte nicht erkannt werden',
    reloadingQuestionnaire: 'Wiederverladung \n Questionnaire',
    welcomeTitleFirstTime: 'Checkin-Titel für neue Benutzer',
    surveyTitleFirstTime: 'Ihr Einstiegs-Fragebogen-Titel',
    noUserText:
      'Ihre ID konnte nicht überprüft werden.Bitte versuche es erneut.',
    welcomeTextFirstTimeUser2:
      '- Sehen?Dies ist der zweite Teil dieser Nachricht.',
    sendFinishedMessage:
      'Bestätigungsdialog zum Senden des ausgefüllten Fragebogens?',
    noNewQuestionnaireAvailableYetTitle:
      'Titel, falls kein Fragebogen verfügbar ist',
    sendUnfinishedMessageDenied:
      'Der aktuelle Fragebogen ist noch nicht abgeschlossen.Bitte tun Sie dies.',
    endedStudyText:
      'Diese Zeichenfolge enthält Informationen zum Ende der Studie für den Benutzer.',
    nextOne:
      'Dieser Text wird angezeigt, um zu kommunizieren, wenn der nächste Fragebogen verfügbar ist: ',
    noQuestionnaireText:
      'Beim Laden des Fragebogens trat ein Fehler auf - bitte versuchen Sie es erneut.',
    noNewQuestionnaireAvailableYet:
      'Dieser Text wird angezeigt, wenn im Moment kein Fragebogen verfügbar ist.',
    nextOneNew:
      'Dieser Text wird angezeigt, um einem neuen Benutzer zu kommunizieren, wenn der nächste Fragebogen verfügbar ist: ',
    furtherInfo:
      'Dies ist der untere Snippet des Welcometext.Sie können hier etwas nützliches platzieren ... wie ein Limerick.',
    welcomeTextUser:
      'Dies ist die regelmäßige Begrüßungsnachricht.Es wird angezeigt, wenn ein Fragebogen verfügbar ist und der Benutzer ein wiederkehrendes ist.Darunter sollte das Fälligkeitsdatum angezeigt werden.',
    welcomeTextFirstTimeUser1:
      'Dies ist Text, der an Erstzeitern dargestellt wird.Es sagt ihnen, wenn der erste Fragebogen fällig ist: ',
    invalidInteger: 'Nur ganzzahlige Werte erlaubt!',
    invalidDecimal: 'Keine gültige Dezimalzahl!',
  },

  /** strings for the special-report-flow */
  reporting: {
    symptoms_no: 'NEIN',
    symptoms_yes: 'JAWOHL',
    symptoms_success_ok: 'Erfolgsbestätigung',
    symptoms_success_header: 'Erfolgs-Nachrichten-Header',
    symptoms_header: 'Schaltfläche: Senden Sie einen speziellen Bericht aus',
    symptoms_success_message: 'Erfolgsnachricht-Inhalt',
    symptoms_question: 'Bestätigungsfrage hier einfügen',
  },

  /** each entry in this array will generate a new listItem on the about-screen. When clicked on such an item, a webView will open that
   * can display any website. "iconType" is the name of a free Webfont and the title is the name of the particular icon. .
   * as this app is using react-native-elements, the list of compatible fonts can be found in its documentation: * https://reactnativeelements.com/docs/icon
   */
  webViews: [
    {
      title: 'Eine WebView.',
      subTitle:
        'Dies ist ein ListItem-Element. \n  \n if Anklicken, dieses ListItEm öffnet den Webview-Bildschirm, der wiederum eine Website in der App rendern wird.',
      screenSubTitle: 'Untertitel dieses Bildschirms',
      uri: 'https://github.blog/',
      iconTitle: 'light-bulb',
      iconType: 'entypo',
    },
    {
      title: 'Ein anderes Webview.',
      subTitle:
        'Für jeden Artikel fügen Sie der Eigenschaft WebView von textconfig.js hinzu, ein anderer Eintrag in dieser Liste wird generiert.Auf diese Weise können Sie mehr Inhalte hinzufügen, indem Sie einfach eine Website hosten und Textconfig.js hinzufügen',
      screenSubTitle: 'Untertitel dieses Bildschirms',
      uri: 'https://dmw.hih-2025.de/livestream/',
      iconTitle: 'light-bulb',
      iconType: 'entypo',
    },
  ],

  /** each entry in this array will generate a new listItem on the about-screen. When clicked on such an item, a modal will open
   * that informs the user that he/she is being redirected to their local browser. "iconType" is the name of a free Webfont and the title is the name of the particular icon. .
   * as this app is using react-native-elements, the list of compatible fonts can be found in its documentation: * https://reactnativeelements.com/docs/icon
   */
  modalLinks: [
    {
      title: 'Erster Link',
      subTitle:
        'Dies ist ein regulärer Link.Es wird ein Modal eröffnet, bevor der Benutzer den Benutzer auf seinen eigenen Browser umleitet.',
      text: 'Ihre werden jetzt umgeleitet.',
      uri: 'https://github.blog/',
      iconTitle: 'link',
      iconType: 'entypo',
    },
    {
      title: 'Zweiter Link',
      subTitle:
        'Für jeden Artikel fügen Sie der Eigenschaft Modulks von textconfig.js hinzu, ein anderer Eintrag in dieser Liste wird generiert.',
      text: 'Ihre werden jetzt umgeleitet.',
      uri: 'https://ibm.com/',
      iconTitle: 'link',
      iconType: 'entypo',
    },
  ],
};
