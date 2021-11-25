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

const defaultLanguage = 'en';

const availableLanguageFiles = { de, en, fr, ar };  

const translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key)
);

const setI18nConfig = (forcedLanguageTag, isFinalRTL=false) => {

    let finalLanguageTag;

    if(!forcedLanguageTag) {
        const fallback = { languageTag: defaultLanguage, isRTL: false };
        const { languageTag, isRTL } = RNLocalize.findBestAvailableLanguage(Object.keys(availableLanguageFiles)) || fallback;
        finalLanguageTag = languageTag;
        isFinalRTL = isRTL;
    }
    else {
        finalLanguageTag = (availableLanguageFiles[forcedLanguageTag]) ? forcedLanguageTag : defaultLanguage;
    }

    // clear translation cache
    translate.cache.clear();
    // update layout direction
    I18nManager.forceRTL(isFinalRTL);
    // set i18n-js config
    i18n.translations = { [finalLanguageTag]: availableLanguageFiles[finalLanguageTag] };
    // finally setting the locale
    i18n.locale = finalLanguageTag;

    
};

/***********************************************************************************************
export
***********************************************************************************************/

export default { translate, setI18nConfig };
