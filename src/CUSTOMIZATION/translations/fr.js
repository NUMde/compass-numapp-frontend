export default {
  /** strings for accessibility features (i.e. VoiceOver) */
  accessibility: {
    types: {
      button: 'button',
      header: 'header',
    },

    refresh: 'Mettre à jour',
    refreshHint:
      'Obtenez le questionnaire et le statut neuf.La page actuelle est mise à jour.',

    back: 'revenir',
    backHint: 'Aller à la page précédente.',

    close: 'proche',
    closeHint: 'Ferme la page actuelle ou modale.',

    accept: "J'accepte",
    cancel: 'Avorter',
    acceptHint:
      "Passe à l'application de navigateur par défaut et ouvre un lien là-bas.",

    menu: 'Information additionnelle',
    menuHint:
      'Ouvre une nouvelle page avec des informations supplémentaires et des liens.',

    logoutHint:
      'Démarre le processus de déconnexion et rediriger la page de connexion.',
    loginHint:
      'Démarrez le processus de connexion et redirige le scanner QRCode.',

    questionnaire: {
      middleButtonFinished: 'Suivant question.EJECT sera répondu.',
      middleButtonUnfinished:
        'Question suivante, bien que la question ne soit pas encore répondue.',
      middleButtonHint:
        "Allez à la prochaine question ou ferme le modal si c'était la dernière question.",

      rightButtonHint: 'Aller à la question prochaine.',
      leftButtonHint: 'Aller à la question précédente.',
      alertButtonHint: "Ferme l'alarme.",

      questionnaireCellHint:
        'Ouvre une nouvelle page pour afficher les catégories du questionnaire.',
      categoryCellHint:
        'Ouvre modal pour remplir cette entrée de questionnaire.',
      category: 'Cette catégorie',
      questionnaire: 'Ce questionnaire',
      notStarted: "N'a pas encore répondu.",
      notFinished: "A déjà commencé, mais n'est pas complètement rempli.",
      finished: 'est complètement complet.',

      sendHint: "Envoie le questionnaire à l'évaluation.",

      multipleChoice:
        "Choix multiple - Plus d'une option de réponse peut être sélectionnée.",
      singleChoice:
        'Choix individuel - Une seule option de réponse peut être sélectionnée.',
      textFieldHint: 'Veuillez remplir les informations demandées ici.',
      dateFieldHint: 'Ouvre une nouvelle modale pour sélectionner une date.',
      sliderFieldEquals: 'est équivalent à',
      sliderFieldAnd: ', et',

      triggerHint:
        'Si cet élément est sélectionné, une autre question supplémentaire est affichée, qui est connectée à cet élément. Veuillez remplir la question supplémentaire.',
    },
  },

  /** contains all string rendered on the login-screen, as well as the ones for the landing-screen */
  login: {
    title: "S'inscrire",
    subTitle: ' ',
    submit: "S'inscrire",
    user: 'Sujet-ID.',
    pass: 'le mot de passe',
    waiting: 'Connexion...',
    errorPass: 'Veuillez réessayer.',
    noSubjectId: 'Aucun sujet valide trouvé',
    errorUserUnauthorized: 'Données utilisateur non valides.',
    qrInfo: "Veuillez afficher l'appareil photo sur le code QR.",
    errorUserGeneric: 'Lors de la journalisation, un problème est survenu.',
    permissionDialog:
      "Veuillez autoriser l'application à accéder à votre appareil photo.",
    nextStepAfterError: 'Veuillez réessayer plus tard.',

    /** contains all strings of the landing-screen */
    landing: {
      buttonText: "Accédez à l'écran de connexion",
      title: ' ',
      subTitle: ' ',
      welcomeTitle: 'Bienvenue dans Compass \n (réact du client natif)',
      text: "C'est le paysage.\n \n Il peut être utilisé pour afficher un message de bienvenue, détailler le processus de connexion suivant pour la mise à jour détaillée en mettant à jour le dossier.",
      autoLoginErrorTitle: 'La connexion automatique a échoué',
      autoLoginError:
        "Lorsque vous essayez de vous connecter automatiquement, une erreur s'est produite. Veuillez vérifier votre réseau et réessayer.",
      retry: 'répéter',
      deleteAll: 'Supprimer toutes les données',
    },
  },

  /** strings with generic purpose that can be used throughout the application */
  generic: {
    ok: "d'accord",
    no: 'Non',
    yes: 'Oui',
    error: 'échec',
    abort: 'Avorter',
    warning: 'Attention',
    info: 'informations',
    errorTitle: 'échec',
    successTitle: 'Succès',
    questionnaire: 'Questionnaire',
    delete: 'Oui, servez les données',
    goBack: 'Oui, veuillez vous connecter',
    logoutWarning: 'Déconnexion avertissement',
    sendSuccess: 'Données envoyées avec succès',
    sendError:
      'Il y avait une erreur qui transmet les données. Veuillez réessayer.',
    sendErrorTwoDevices:
      'Vous avez déjà envoyé ce questionnaire par une autre application.',
    eraseAllWarning:
      'Cela supprime toutes les données locales et le connecte. Voulez-vous faire une procédure?',
    eraseLocalDataAtEndOfStudyText:
      "Cela soulignera à nouveau la fin de l'étude. Sobald L'utilisateur confirme les données locales, le participant sera dérégué. Vous êtes tombé précédé?",
    eraseLocalDataAtEndOfStudyTitle:
      'Supprimer des données locales et des déconnages',
    updateError:
      "Une erreur s'est produite lors de l'obtention des données demandées - veuillez réessayer.",
    infoRemoval:
      'Le questionnaire actuellement durable est obsolète et sera maintenant enlevé.',
    wrongLanguageVersionDetected:
      'Le questionnaire persisté ne correspond pas à la langue actuellement sélectionnée sur votre appareil.Ce questionnaire sera maintenant remplacé par une version correspondante.Vos réponses seront perdues.',
    reportWhileInIteratedMode:
      "Dialogue Pour dire à l'utilisateur qu'il a déjà été envoyé dans un rapport spécial et qu'il s'agit simplement d'un intervalle spécial.",
    reportWhileQuestionnaire:
      "Dialogue Pour dire à l'utilisateur qu'un questionnaire est actuellement disponible et qu'il pourrait l'utiliser pour faire rapport sur son état.",
  },

  /** strings of the about-screen */
  about: {
    title: 'Dessus',
    subTitle: 'Sous-titres de sur-écrans',
    logout: 'Déconnexion (seulement sur Dev)',
    delete: 'Supprimer tout & Déconnexion (uniquement sur Dev)',
    demoDelete: 'Supprimer tout & Déconnexion (seulement pour cette démo)',
    languageSelection: 'Sélection de la langue',
    languageWarning:
      'Si vous modifiez la langue lorsque vous avez un état de sauvegarde persisté de vos réponses actuelles, ledit Save State sera supprimé.',
    languageWarningAddition: '\nVoulez-vous poursuivre?',

    /** contains the strings for the optional LegalInformation Screen */
    legal: {
      title: "Lien vers l'écran légal",
      subTitle:
        'Ces liens sont éventuellement rendus (peuvent être activés via la configuration de développement). Le contenu texte Cet écran peut être mis à jour via la configuration du texte.',
      iconType: 'entypo',
      iconTitle: 'archive',
    },
  },

  /** contains the strings for the legal information screen */
  legalInformation: {
    title: 'Écran juridique',
    subTitle: 'Entité légale',
    headline: 'Exemple de texte orthographique.',

    content:
      "Les carottes de Lorem, constatur Elitr, mais le diamètre du temps de fil non-fumeur par mois pour travailler et douleur à une grande excitation, mais le diamètre du projet. Mais ce sera la réponse, et seulement deux de la douleur et des subsidents. Début CLITA KASD GUBERGREN, Aucun SEA TAKIMATA SPIRIT n'est un porteur de cavaliers au porteur de cavaliers. Carottes de sadipcing Consteûtur, mais le diamètre du temps de fil non général par mois pour travailler et douleur à une grande excitation, mais le diamètre du projet, mais vous allez également Soyez la réponse et les deux seules de la douleur et des subsidents. Commencez CLITA KASD GUERGRENGRENNE, Aucun SEA Takimata Spirit n'est un marqueur de clients des carottes.",
  },

  /** strings of the survey-screen */
  survey: {
    subTitle: ' ',
    logout: 'Se déconnecter',
    subTitleCheckIn: ' ',
    title: 'questionnaire',
    isLoading: 'Chargement...',
    yourAnswer: 'Votre Réponse',
    titleCheckIn: 'enregistrement',
    welcomeTitle: 'Vérifier le titre',
    noUserTitle: "L'utilisateur n'a pas été trouvé",
    sendFinished: 'Envoyer un questionnaire.',
    send: 'Bouton de questionnaire Titre Envoyer',
    additionalAnswer: 'réponse supplémentaire',
    alternativeAnswer: 'réponse alternative',
    surveySubTitle: 'Pour compléter: ',
    surveyTitle: 'Votre questionnaire actuel',
    inputPlaceholder: "S'il vous plaît entrez votre réponse",
    endedStudyTitle: 'Fin du titre de participation',
    noQuestionnaireTitle: 'Questionnaire introuvable',
    loadingQuestionnaire: 'Demandes de renseignements \n questionnaire.',
    inputPlaceholderTime: "S'il vous plaît entrer la date ici",
    sessionTimeout: "Votre utilisateur n'a pas pu être reconnu",
    reloadingQuestionnaire: 'Questionnaire sur la défense météo  n',
    welcomeTitleFirstTime: 'Checkin Titre des nouveaux utilisateurs',
    surveyTitleFirstTime: "Votre titre de questionnaire d'entrée d'entrée",
    noUserText:
      "Votre identifiant n'a pas pu être vérifié. Veuillez réessayer.",
    welcomeTextFirstTimeUser2:
      '- Voir? Ceci est la deuxième partie de ce message.',
    sendFinishedMessage:
      'Dialogue de confirmation pour envoyer le questionnaire terminé?',
    noNewQuestionnaireAvailableYetTitle:
      "Titre Si aucun questionnaire n'est disponible",
    sendUnfinishedMessageDenied:
      "Le questionnaire actuel n'est pas encore terminé. S'il vous plaît faites cela.",
    endedStudyText:
      "Cette chaîne contient des informations sur la fin de l'étude pour l'utilisateur.",
    nextOne:
      'Ce texte est affiché pour communiquer lorsque le prochain questionnaire est disponible: ',
    noQuestionnaireText:
      "Lors du chargement du questionnaire, une erreur s'est produite - veuillez réessayer.",
    noNewQuestionnaireAvailableYet:
      "Ce texte est affiché lorsqu'aucun questionnaire n'est disponible pour le moment.",
    nextOneNew:
      'Ce texte est affiché pour communiquer un nouvel utilisateur lorsque le prochain questionnaire est disponible: ',
    furtherInfo:
      "C'est l'extrait inférieur du texte de bienvenue. Vous pouvez placer quelque chose d'utile ici ... comme un limérick.",
    welcomeTextUser:
      "C'est le message d'accueil régulier. Il apparaît lorsqu'un questionnaire est disponible et que l'utilisateur est récurrent. Darunder devrait afficher la date d'échéance.",
    welcomeTextFirstTimeUser1:
      "Ceci est un texte affiché sur les points d'extrémité. Il vous dit si le premier questionnaire est dû: ",
    invalidInteger: 'Seuls les nombres entiers sont autorisés',
    invalidDecimal: 'Seuls les décimaux sont autorisés',
    notMatchingPattern: "L'entrée ne correspond pas au modèle requis",
  },

  /** strings for the special-report-flow */
  reporting: {
    symptoms_no: 'NON',
    symptoms_yes: 'OUI MONSIEUR',
    symptoms_success_ok: 'Confirmation de réussite',
    symptoms_success_header: 'En-tête de message de réussite',
    symptoms_header: 'Bouton: Envoyer un rapport spécial',
    symptoms_success_message: 'Contenu de contenu réussi',
    symptoms_question: 'Insérer la question de la confirmation ici',
  },

  /** each entry in this array will generate a new listItem on the about-screen. When clicked on such an item, a webView will open that
   * can display any website. "iconType" is the name of a free Webfont and the title is the name of the particular icon. .
   * as this app is using react-native-elements, the list of compatible fonts can be found in its documentation: * https://reactnativeelements.com/docs/icon
   */
  webViews: [
    {
      title: 'Une vision web.',
      subTitle:
        "Ceci est un élément lisitem. n  n Si cliquez sur, cet écartem ouvre l'écran WebView, ce qui rapportera un site Web dans l'application.",
      screenSubTitle: 'Sous-titres de cet écran',
      uri: 'https://github.blog/',
      iconTitle: 'light-bulb',
      iconType: 'entypo',
    },
    {
      title: 'Autre webview.',
      subTitle:
        'Pour chaque article, ajoutez la propriété WebView à partir de textconfig.js, une autre entrée de cette liste est générée. De cette façon, vous pouvez ajouter plus de contenu en hébergeant simplement un site Web et ajouter textconfig.js',
      screenSubTitle: 'Sous-titres de cet écran',
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
      title: 'Premier lien',
      subTitle:
        "Ceci est un lien régulier. Un modal est ouvert avant que l'utilisateur redirige l'utilisateur sur son propre navigateur.",
      text: 'Votre va maintenant être détourné.',
      uri: 'https://github.blog/',
      iconTitle: 'link',
      iconType: 'entypo',
    },
    {
      title: 'Deuxième lien',
      subTitle:
        'Pour chaque article, ajoutez la propriété textconfig.js à la propriété Moduleks, une autre entrée de cette liste est générée.',
      text: 'Votre va maintenant être détourné.',
      uri: 'https://ibm.com/',
      iconTitle: 'link',
      iconType: 'entypo',
    },
  ],
};
