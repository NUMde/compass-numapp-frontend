// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

// this file contains functions that interact with the EncryptedStorage

/***********************************************************************************************
imports
***********************************************************************************************/

import EncryptedStorage from 'react-native-encrypted-storage';
import config from '../config/configProvider';

// kiosk mode
/*-----------------------------------------------------------------------------------*/

/**
 * loads the kiosk mode data from the EncryptedStorage
 * @returns string | null
 */
const loadKioskModeData = async () => {
  try {
    return await EncryptedStorage.getItem(config.appConfig.kioskModeData);
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * persists the current kiosk mode data
 * @param  {string} [kioskModeData] kioskModeData of the user
 */
const persistKioskModeData = async (kioskModeData) => {
  const id = kioskModeData || (await loadKioskModeData());
  if (!id) return;

  try {
    await EncryptedStorage.setItem(config.appConfig.kioskModeData, id);
  } catch (error) {
    console.error(error);
  }
};

/**
 * deletes the kiosk mode data from the EncryptedStorage
 */
const removeKioskModeData = async () => {
  try {
    await EncryptedStorage.removeItem(config.appConfig.kioskModeData);
  } catch (error) {
    console.error(error);
  }
};

/**
 * save the language chosen by the user
 * @param  {string} languageCode languageCode of the questionnaire
 */
const persistUserLanguage = async (languageCode) => {
  try {
    await EncryptedStorage.setItem(config.appConfig.userLanguage, languageCode);
  } catch (error) {
    console.error(error);
  }
};

/**
 * loads the language chosen by the user
 * @param  {string} [subjectId] subject-id
 * @returns string | null
 */
const loadUserLanguage = async () => {
  try {
    return await EncryptedStorage.getItem(config.appConfig.userLanguage);
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * deletes the language chosen by the user
 */
const removeUserLanguage = async () => {
  try {
    await EncryptedStorage.removeItem(config.appConfig.userLanguage);
  } catch (error) {
    console.error(error);
  }
};

/***********************************************************************************************
export
***********************************************************************************************/

export default {
  loadKioskModeData,
  persistKioskModeData,
  removeKioskModeData,

  loadUserLanguage,
  persistUserLanguage,
  removeUserLanguage,
};
