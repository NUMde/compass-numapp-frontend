// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

// this file provides functionality

/***********************************************************************************************
imports
***********************************************************************************************/

import i18n from "i18n-js";
import memoize from "lodash.memoize";
import { I18nManager } from "react-native";
import * as RNLocalize from "react-native-localize";

import de from '../../CUSTOMIZATION/translations/de'
import en from '../../CUSTOMIZATION/translations/en'
import fr from '../../CUSTOMIZATION/translations/fr'
import ar from '../../CUSTOMIZATION/translations/ar'

/***********************************************************************************************
constants
***********************************************************************************************/

// the fallback
const defaultLanguage = 'en';

// the available files / languages
// for each file available in in app/src/CUSTOMIZATION/translations an entry must be created here.
// the attribute name shall be the language code the file represents.
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

// function that memoizes the results of i18n.t. Also determines the cache key for storing the result
const translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key)
);

// generates default values 
const generateDefaultI18nConfigValues = () => {
    const fallback = { languageTag: defaultLanguage, isRTL: false };
    // returns the language settings best matching the users device
    return RNLocalize.findBestAvailableLanguage(Object.keys(availableLanguageFiles)) || fallback;
};

// sets the config
const setI18nConfig = async (forcedLanguageTag, isFinalRTL=false) => {
    let finalLanguageTag = defaultLanguage;
    // generates the final config
    if(!forcedLanguageTag) {
        const { languageTag, isRTL } = generateDefaultI18nConfigValues();
        finalLanguageTag = languageTag;
        isFinalRTL = availableLanguageFiles[languageTag] ? availableLanguageFiles[languageTag].isRTL : isRTL;
    }
    else {
        if(availableLanguageFiles[forcedLanguageTag]) finalLanguageTag = forcedLanguageTag;
        isFinalRTL = availableLanguageFiles[forcedLanguageTag].isRTL;
    }
    // clear translation cache
    translate.cache.clear();
    // update layout direction
    I18nManager.forceRTL(isFinalRTL);
    // set i18n-js config
    i18n.translations = { [finalLanguageTag]: availableLanguageFiles[finalLanguageTag].file };
    // finally setting the locale
    i18n.locale = finalLanguageTag;
};

// just returns the language tag
const getLanguageTag = () => i18n.locale;

const init = (forcedLanguageTag, isFinalRTL=false) => {
    setI18nConfig(forcedLanguageTag, isFinalRTL);
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
    availableLanguageFiles,
    generateDefaultI18nConfigValues, 
};
