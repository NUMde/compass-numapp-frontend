export default {
  /** strings for accessibility features (i.e. VoiceOver) */
  accessibility: {
    types: {
      button: 'button',
      header: 'header',
    },

    refresh: 'تحديث',
    refreshHint: 'إعادة جلب الاستبيان والحالة.سيتم تحديث الصفحة الحالية.',

    back: 'الى الخلف',
    backHint: 'يقفز إلى الصفحة السابقة.',

    close: 'أغلق',
    closeHint: 'يغلق الصفحة الحالية أو مشروط.',

    accept: 'قبول',
    cancel: 'إلغاء',
    acceptHint: 'يتحول إلى تطبيق المتصفح الافتراضي، ويفتح الرابط هناك.',

    menu: 'معلومة اضافية',
    menuHint: 'يفتح صفحة جديدة مع معلومات إضافية وروابط.',

    logoutHint: 'يبدأ عملية تسجيل الخروج وإعادة توجيه إلى صفحة تسجيل الدخول.',
    loginHint:
      'يبدأ عملية تسجيل الدخول وإعادة التوجيه إلى ماسح رمز الاستجابة السريعة.',

    questionnaire: {
      middleButtonFinished: 'السؤال التالي.يتم الرد على السؤال.',
      middleButtonUnfinished:
        'السؤال التالي، على الرغم من أن السؤال لم تتم الإجابة عليه بعد.',
      middleButtonHint:
        'يقفز إلى الأسئلة التالية، أو إغلاق المشرف إذا كان هذا هو السؤال الأخير.',

      rightButtonHint: 'يغلق الوضع.',
      leftButtonHint: 'يقفز إلى السؤال السابق.',
      alertButtonHint: 'يغلق التنبيه.',

      questionnaireCellHint: 'يفتح صفحة جديدة لمشاهدة فئات الاستبيان.',
      categoryCellHint: 'يفتح مشروط لملء إدخال هذا الاستبيان.',
      category: 'هذه الفئة',
      questionnaire: 'هذا الاستبيان',
      notStarted: 'لم تتم الإجابة عليه بعد.',
      notFinished: 'وقد بدأ بالفعل، ولكن لم يتم ملؤها تماما بعد.',
      finished: 'هو كاملة تماما.',

      sendHint: 'يرسل الاستبيان إلى التقييم.',

      multipleChoice: 'الاختيار من متعدد - يمكن تحديد أكثر من خيار إجابة واحد.',
      singleChoice: 'اختيار واحد - يمكن تحديد خيار إجابة واحد فقط.',
      textFieldHint: 'يرجى ملء المعلومات المطلوبة هنا.',
      dateFieldHint: 'يفتح مشرفا جديدا لاختيار تاريخ.',
      sliderFieldEquals: 'تساوي',
      sliderFieldAnd: '، و',

      triggerHint:
        'إذا تم تحديد هذا العنصر، فسيتم عرض سؤال إضافي آخر مرتبط بهذا العنصر.يرجى ملء السؤال الإضافي كذلك.',
    },
  },

  /** contains all string rendered on the login-screen, as well as the ones for the landing-screen */
  login: {
    title: 'تسجيل الدخول',
    subTitle: ' ',
    submit: 'تسجيل الدخول',
    user: 'معرف الموضوع',
    pass: 'كلمه السر',
    waiting: 'تسجيل الدخول...',
    errorPass: 'حاول مرة اخرى.',
    noSubjectId: 'لم يتم العثور على رهيب صالح',
    errorUserUnauthorized: 'بيانات المستخدم غير صالحة.',
    qrInfo: 'يرجى توجيه الكاميرا إلى رمز QR.',
    errorUserGeneric: 'حدثت هناك مشكلة أثناء تسجيل الدخول.',
    permissionDialog: 'يرجى السماح للتطبيق بالوصول إلى الكاميرا.',
    nextStepAfterError: 'يرجى محاولة تسجيل الدخول مرة أخرى لاحقا.',

    /** contains all strings of the landing-screen */
    landing: {
      buttonText: 'انتقل إلى شاشة تسجيل الدخول',
      title: ' ',
      subTitle: ' ',
      welcomeTitle: 'مرحبا بك في COMPASS \n (رد فعل عميل الأصلي)',
      text: 'ولكن القطر غيرني وقت رمي ​​الوقت في الشهر للعمل والألم من الإثارة الكبيرة، ولكن قطر المشروع.لكنهم سيكونون أيضا الجواب، واثنين فقط من الآلام، والعمليات.الوقوف كلا لا سي تاكيماتا',
      autoLoginErrorTitle: 'فشل تسجيل الدخول التلقائي',
      autoLoginError:
        'حدث خطأ أثناء محاولة تسجيل الدخول تلقائيا.يرجى التحقق من شبكتك وحاول مرة أخرى',
      retry: 'أعد',
      deleteAll: 'حذف جميع البيانات',
    },
  },

  /** strings with generic purpose that can be used throughout the application */
  generic: {
    ok: 'نعم',
    error: 'خطأ',
    abort: 'يلغي',
    warning: 'تحذير',
    info: 'معلومة',
    errorTitle: 'خطأ',
    successTitle: 'النجاح',
    questionnaire: 'استبيان',
    delete: 'نعم، حذف البيانات',
    goBack: 'نعم، يرجى تسجيل الخروج',
    logoutWarning: 'تسجيل الخروج تحذير',
    sendSuccess: 'تم إرسال البيانات بنجاح',
    sendError: 'كان هناك خطأ في نقل البيانات.حاول مرة اخرى.',
    sendErrorTwoDevices: 'لقد أرسلت بالفعل هذا الاستبيان من خلال تطبيق آخر.',
    eraseAllWarning:
      'سيؤدي هذا إلى حذف جميع البيانات المحلية وتخرجك.هل تريد أن ترجم؟',
    eraseLocalDataAtEndOfStudyText:
      'هذا سوف يؤكد مرة أخرى نهاية الدراسة.بمجرد أن يؤكد المستخدم أن يتم إزالة البيانات المحلية وسيتم تسجيل المشارك.هل تريد أن تسبق؟',
    eraseLocalDataAtEndOfStudyTitle: 'حذف البيانات والخروج المحلية',
    updateError:
      'حدث خطأ أثناء الحصول على البيانات المطلوبة - يرجى المحاولة مرة أخرى.',
    wrongLanguageVersionDetected:
      'لا يتطابق الاستبيان المستمر إلى اللغة المحددة حاليا على جهازك.سيتم الآن استبدال هذا الاستبيان بإصدار مطابق.سيتم فقد إجاباتك.',
    infoRemoval: 'الاستبيان المستمر حاليا عفا عليه الزمن وسيتم إزالته الآن.',
    reportWhileInIteratedMode:
      'مربع الحوار لإخبار المستخدم بأنه أرسل بالفعل في تقرير خاص وأنه الآن على فاصل خاص.',
    reportWhileQuestionnaire:
      'مربع الحوار لإخبار المستخدم الذي يتوفر الاستبيان حاليا وأنه قد يستخدم هذا واحد للإبلاغ عن حالته.',
  },

  /** strings of the about-screen */
  about: {
    title: 'عن',
    subTitle: 'الترجمة من الشاشة حول',
    logout: 'تسجيل الخروج (فقط على dev)',
    delete: 'حذف الكل والجلوج (فقط على dev)',
    demoDelete: 'حذف الكل والجلوج (فقط لهذا العرض التوضيحي)',
    languageSelection: 'اختيار اللغة',
    languageWarning:
      'إذا غيرت اللغة أثناء وجود حالة حفظ إجاباتك الحالية، فسيتم إزالة حفظ الحالة المذكورة.',
    languageWarningAddition: '\nهل تريد المتابعة؟',

    /** contains the strings for the optional LegalInformation Screen */
    legal: {
      title: 'رابط إلى شاشة ',
      subTitle:
        'يتم تقديم هذه الروابط اختياريا (يمكن تنشيطها من خلال التكوين التنموي).يمكن تحديث محتوى النص من هذه الشاشة من خلال تكوين النص',
      iconType: 'entypo',
      iconTitle: 'archive',
    },
  },

  /** contains the strings for the legal information screen */
  legalInformation: {
    title: 'شاشة المعلومات القانونية',
    subTitle: 'الترجمة القانونية',
    headline: 'مثال النص القانوني',
    content:
      'ولكن القطر غيرني وقت رمي ​​الوقت في الشهر للعمل والألم من الإثارة الكبيرة، ولكن قطر المشروع.لكنهم سيكونون أيضا الجواب، واثنين فقط من الآلام، والعمليات.الوقوف كلا هو جزر جزر العميل ولكن القطر غيرني وقت رمي ​​الوقت في الشهر للعمل والألم من الإثارة الكبيرة، ولكن قطر المشروع.لكنهم سيكونون أيضا الجواب، واثنين فقط من الآلام، والعمليات.الوقوف كلا هو جزر جزر العميل.',
  },

  /** strings of the survey-screen */
  survey: {
    subTitle: ' ',
    logout: 'تسجيل خروج',
    subTitleCheckIn: ' ',
    title: 'استبيان',
    isLoading: 'جار التحميل...',
    yourAnswer: 'إجابتك',
    titleCheckIn: 'تحقق في',
    welcomeTitle: 'تحقق في - العنوان',
    noUserTitle: 'لم يتم العثور على المستخدم',
    sendFinished: 'إرسال استبيان',
    send: 'إرسال عنوان زر الاستبيان',
    additionalAnswer: 'إجابة إضافية',
    alternativeAnswer: 'إجابة بديلة',
    surveySubTitle: 'أن تكتمل حتى: ',
    surveyTitle: 'استبيانك الحالي',
    inputPlaceholder: 'من فضلك أدخل إجابتك',
    endedStudyTitle: 'نهاية عنوان المشاركة',
    noQuestionnaireTitle: 'استبيان غير موجود',
    loadingQuestionnaire: 'طلب \n استبيان.',
    inputPlaceholderTime: 'الرجاء إدخال التاريخ هنا',
    sessionTimeout: 'المستخدم الخاص بك لا يمكن الاعتراف به',
    reloadingQuestionnaire: 'إعادة تحميل \n استجوابe',
    welcomeTitleFirstTime: 'تحقق في- عنوان للمستخدمين الجدد',
    surveyTitleFirstTime: 'عنوان استبيان الدخول الخاص بك',
    noUserText: 'لا يمكن التحقق من معرفك.حاول مرة اخرى.',
    welcomeTextFirstTimeUser2: '- ارى؟هذا هو الجزء الثاني من تلك الرسالة.',
    sendFinishedMessage: 'حوار تأكيد لإرسال الاستبيان المكتمل؟',
    noNewQuestionnaireAvailableYetTitle:
      'العنوان، في حالة عدم وجود استبيان متاح',
    sendUnfinishedMessageDenied:
      'لا يتم الانتهاء من الاستبيان الحالي بعد.يرجى القيام بذلك.',
    endedStudyText: 'ستستمر هذه السلسلة بمعلومات حول نهاية الدراسة للمستخدم.',
    nextOne: 'سيتم عرض هذا النص للتواصل عند توفر الاستبيان التالي: ',
    noQuestionnaireText:
      'حدث خطأ أثناء تحميل الاستبيان - يرجى المحاولة مرة أخرى.',
    noNewQuestionnaireAvailableYet:
      'سيتم عرض هذا النص إذا لم يتوفر أي استبيان الآن.',
    nextOneNew:
      'سيتم عرض هذا النص للتواصل مع مستخدم جديد عند توفر الاستبيان التالي: ',
    furtherInfo:
      'هذا هو المقتطف السفلي من الترحيل.قد تضع شيئا مفيدا هنا ... مثل نكتة.',
    welcomeTextUser:
      'هذه هي رسالة الترحيب العادية.سيتم عرضه إذا كان الاستبيان متاحا ومستخدم واحد متكرر.أسفل هذا، يجب عرض تاريخ الاستحقاق.',
    welcomeTextFirstTimeUser1:
      'هذا هو النص الذي يتم تقديمه للمستخدمين لأول مرة.يخبرهم عندما يكون الاستبيان الأول مستحقا: ',
    invalidInteger: 'يسمح فقط بالأعداد الصحيحة!',
    invalidDecimal: 'يسمح فقط الكسور العشرية!!',
  },

  /** strings for the special-report-flow */
  reporting: {
    symptoms_no: 'لا',
    symptoms_yes: 'نعم',
    symptoms_success_ok: 'تأكيد النجاح',
    symptoms_success_header: 'النجاح - رسالة رأس',
    symptoms_header: 'زر: إرسال تقرير خاص',
    symptoms_success_message: 'النجاح - محتوى الرسالة',
    symptoms_question: 'إدراج سؤال التأكيد هنا',
  },

  /** each entry in this array will generate a new listItem on the about-screen. When clicked on such an item, a webView will open that
   * can display any website. "iconType" is the name of a free Webfont and the title is the name of the particular icon. .
   * as this app is using react-native-elements, the list of compatible fonts can be found in its documentation:
   * https://reactnativeelements.com/docs/icon
   */
  webViews: [
    {
      title: 'ويب.',
      subTitle:
        'Tله عنصر قائمة الاغراض. \n \n لو النقر فوق، ستفتح هذه قائمة الاغراض شاشة عرض الويب، والتي بدورها ستقدم موقع ويب مباشرة في التطبيق.',
      screenSubTitle: 'الترجمة من هذه الشاشة',
      uri: 'https://github.blog/',
      iconTitle: 'light-bulb',
      iconType: 'entypo',
    },
    {
      title: 'ويب آخر',
      subTitle:
        'لكل عنصر تقوم بإضيفه إلى خاصالخاصة ب TextConfig.js إدخال آخر في هذه القائمة تم إنشاؤه.بهذه الطريقة يمكنك إضافة المزيد من المحتوى عن طريق استضافة موقع ويب فقط وإضافته إلى TextConfig.js',
      screenSubTitle: 'الترجمة من هذه الشاشة',
      uri: 'https://dmw.hih-2025.de/livestream/',
      iconTitle: 'light-bulb',
      iconType: 'entypo',
    },
  ],

  /** each entry in this array will generate a new listItem on the about-screen. When clicked on such an item, a modal will open
   * that informs the user that he/she is being redirected to their local browser. "iconType" is the name of a free Webfont and the title is the name of the particular icon. .
   * as this app is using react-native-elements, the list of compatible fonts can be found in its documentation:
   * https://reactnativeelements.com/docs/icon
   */
  modalLinks: [
    {
      title: 'الرابط الأول',
      subTitle:
        'هذا هو رابط منتظم.سيفتح مشروطا قبل إعادة توجيه المستخدم إلى متصفحه الخاص.',
      text: 'يتم إعادة توجيهك الآن.',
      uri: 'https://github.blog/',
      iconTitle: 'link',
      iconType: 'entypo',
    },
    {
      title: 'الرابط الثاني',
      subTitle:
        'لكل عنصر تضيفه إلى خاصيةب TextConfig.js إدخال آخر في هذه القائمة تم إنشاؤه.',
      text: 'يتم إعادة توجيهك الآن.',
      uri: 'https://ibm.com/',
      iconTitle: 'link',
      iconType: 'entypo',
    },
  ],
};
