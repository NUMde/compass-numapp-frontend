// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

// this file provides functionality for adding additonal languages to the project.

/***********************************************************************************************
imports
***********************************************************************************************/

import i18n from "i18n-js";
import memoize from "lodash.memoize";
import { I18nManager } from "react-native";
import guestClient from '../rest/guestClient'
import * as RNLocalize from "react-native-localize";

import de from '../../CUSTOMIZATION/translations/de'
import en from '../../CUSTOMIZATION/translations/en'
import fr from '../../CUSTOMIZATION/translations/fr'
import ar from '../../CUSTOMIZATION/translations/ar'

/***********************************************************************************************
constants
***********************************************************************************************/

// the fallback
// this is the default the app will fallback to in case nothing else matches.
// (for example: the device language is hindi, but only "de", "en", "fr", "ar" are provided by the app. So the last resort fallback would be "de")
const defaultLanguage = 'de';

// the available files / languages:
// for each file available in in app/src/CUSTOMIZATION/translations an entry must be created here.
// the attribute name shall be the language code the file represents.
// if a language is present that is not provided with a matching questionnaire fom the backend, the language will remain available - 
// the user will then be presented with the default questionnaire language.
const availableLanguageFiles = { 

    "de" : {
        file: de,
        isRTL: false,
        title: "Deutsch"
    },

    "en" : {
        file: en,
        isRTL: false,
        title: "English"
    },
    
    "fr" : {
        file: fr,
        isRTL: false,
        title: "Français"
    },
    
    "ar" : {
        file: ar,
        isRTL: true,
        title: "عربي"
    }
};

// is used as the final composit of available languages
let availableLanguages = {
    ...availableLanguageFiles
}

// function that memoizes the results of i18n.t. Also determines the cache key for storing the result
const translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key)
);

// creates the set of language available for the user
const setAvailableLanguages = (list) => {

    // this function generates the union set of locally available languages and the languages the backend can provide the questionnaires in.

    let defaultLang = availableLanguageFiles[defaultLanguage]

    // adds new missing ones from the server
    list.data.forEach(langCode => {
        if(!availableLanguages[langCode]) {
            availableLanguages[langCode] = {
                file: en,
                isRTL: false,
                title: defaultLang ? 
                    (defaultLang.title + " (" +  defaultLang.file.generic.questionnaire + ": " + langCode.replace(/^\w/, (c) => c.toUpperCase()) +  ")") : 
                    ("DEFAULT (" + langCode + ")")
            }
        }
    });

    // updates the ones that do not have a matching entry from teh backend
    for (let [key, value] of Object.entries(availableLanguageFiles)) {
        if(!list.data.includes(key)) availableLanguages[key].title += " (" +  availableLanguages[key].file.generic.questionnaire + ": " + defaultLanguage.replace(/^\w/, (c) => c.toUpperCase()) +  ")"
    }
}

// generates default values 
const generateDefaultI18nConfigValues = () => {
    const fallback = { languageTag: defaultLanguage, isRTL: false };
    // returns the language settings best matching the users device
    return RNLocalize.findBestAvailableLanguage(Object.keys(availableLanguages)) || fallback;
};

// sets the config
const setI18nConfig = async (forcedLanguageTag, isFinalRTL=false) => {
    let finalLanguageTag = defaultLanguage;
    // generates the final config
    if(!forcedLanguageTag) {
        const { languageTag, isRTL } = generateDefaultI18nConfigValues();
        finalLanguageTag = languageTag;
        isFinalRTL = availableLanguages[languageTag] ? availableLanguages[languageTag].isRTL : isRTL;
    }
    else {
        if(availableLanguages[forcedLanguageTag]) finalLanguageTag = forcedLanguageTag;
        isFinalRTL = availableLanguages[forcedLanguageTag].isRTL;
    }
    // clear translation cache
    translate.cache.clear();
    // update layout direction
    I18nManager.forceRTL(isFinalRTL);
    // set i18n-js config
    i18n.translations = { [finalLanguageTag]: availableLanguages[finalLanguageTag].file };
    // finally setting the locale
    i18n.locale = finalLanguageTag;
};

// just returns the language tag
const getLanguageTag = () => i18n.locale;

// initilization of the module - executed in App.jsx
const init = (forcedLanguageTag, isFinalRTL=false) => {
    setI18nConfig(forcedLanguageTag, isFinalRTL);
    guestClient.getLanguages()
    .then(
      res => {
        setAvailableLanguages(res)
      }
    )
};

/***********************************************************************************************
export
***********************************************************************************************/

export default { 
    init,
    translate, 
    setI18nConfig, 
    getLanguageTag,
    defaultLanguage,
    availableLanguages,
    generateDefaultI18nConfigValues, 
};
