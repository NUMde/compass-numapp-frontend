// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

// this file contains functions that interact with the EncryptedStorage

/***********************************************************************************************
imports
***********************************************************************************************/

import EncryptedStorage from "react-native-encrypted-storage";
import config from "../../config/configProvider";

/***********************************************************************************************
operations
***********************************************************************************************/

// last subject-id
/*-----------------------------------------------------------------------------------*/
/**
 * loads the last used subjectId from the EncryptedStorage
 * @returns string | null
 */
const loadLastSubjectId = async () => {
  try {
    return await EncryptedStorage.getItem(config.appConfig.lastSubjectId);
  } catch (error) {
    console.error(error);
    return null;
  }
};
/**
 * persists the last subjectId that was logged in (to automatically re-login the user
 * when he/she opens the app the next time)
 * @param  {string} [subjectId] subjectId of the user
 */
const persistLastSubjectId = async (subjectId) => {
  const id = subjectId || (await loadLastSubjectId());
  if (!id) return;

  try {
    await EncryptedStorage.setItem(config.appConfig.lastSubjectId, id);
  } catch (error) {
    console.error(error);
  }
};

/**
 * deletes the last used subjectId from the EncryptedStorage
 */
const removeLastSubjectId = async () => {
  try {
    await EncryptedStorage.removeItem(config.appConfig.lastSubjectId);
  } catch (error) {
    console.error(error);
  }
};

// notification state
/*-----------------------------------------------------------------------------------*/

/**
 * persists the notification object that is returned after the push-registration
 * went through (per user)
 * @param  {string} [subjectId] subjectId of the user
 * @param  {any} FCMToken notification object
 */
const persistFCMToken = async (FCMToken, subjectId) => {
  const id = subjectId || (await loadLastSubjectId());
  if (!id) return;

  try {
    await EncryptedStorage.setItem(
      `${config.appConfig.FCMToken}_${id}`,
      FCMToken
    );
  } catch (error) {
    console.error(error);
  }
};

/**
 * loads the notification state of a user from the EncryptedStorage
 * @param  {string} [subjectId] subjectId of the user
 * @returns {Promise<{deviceId:string}>}
 */
const loadFCMToken = async (subjectId) => {
  const id = subjectId || (await loadLastSubjectId());
  if (!id) return null;

  try {
    return await EncryptedStorage.getItem(`${config.appConfig.FCMToken}_${id}`);
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * deletes the notification state of a user from the EncryptedStorage
 * @param  {string} [subjectId] subjectId of the user
 */
const removeFCMToken = async (subjectId) => {
  const id = subjectId || (await loadLastSubjectId());
  if (!id) return;

  try {
    await EncryptedStorage.removeItem(`${config.appConfig.FCMToken}_${id}`);
  } catch (error) {
    console.error(error);
  }
};

// last questionnaire id
/*-----------------------------------------------------------------------------------*/

/**
 * when the user receives a questionnaire from the server, the frontend persists its
 * id. the next time a partially completed questionnaire is locally loaded, its id will be
 * checked against the just persisted one. if it matches the questionnaire will be loaded.
 * if not, the questionnaire will be deleted and a user update executed.
 * @param  {string} questionnaireId id of the questionnaire
 * @param  {string} [subjectId] id of the user
 */
const persistLastQuestionnaireId = async (questionnaireId, subjectId) => {
  const id = subjectId || (await loadLastSubjectId());
  if (!id) return;
  if (!(questionnaireId && id)) return;

  try {
    await EncryptedStorage.setItem(
      `${config.appConfig.lastQuestionnaireId}_${id}`,
      questionnaireId
    );
  } catch (error) {
    console.error(error);
  }
};

/**
 * loads the last persisted questionnaire id (of a user) from the EncryptedStorage
 * @param  {string} [subjectId] subject-id
 * @returns string | null
 */
const loadLastQuestionnaireId = async (subjectId) => {
  const id = subjectId || (await loadLastSubjectId());
  if (!id) return null;

  try {
    return await EncryptedStorage.getItem(
      `${config.appConfig.lastQuestionnaireId}_${id}`
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * deletes the last persisted questionnaire id (of a user) from the EncryptedStorage
 * @param  {string} [subjectId] subject-id
 */
const removeLastQuestionnaireId = async (subjectId) => {
  const id = subjectId || (await loadLastSubjectId());
  if (!id) return;

  try {
    await EncryptedStorage.removeItem(
      `${config.appConfig.lastQuestionnaireId}_${id}`
    );
  } catch (error) {
    console.error(error);
  }
};

// categories
/*-----------------------------------------------------------------------------------*/

/**
 * persists the current categories object of the user
 * @param  {QuestionnaireItem[]} categories categories object of the user
 * @param  {string} [subjectId] if of the user
 */
const persistCategories = async (categories, subjectId) => {
  const id = subjectId || (await loadLastSubjectId());
  if (!(categories && IDBFactory)) return;

  const stringToBePersisted =
    categories instanceof String ? categories : JSON.stringify(categories);

  try {
    await EncryptedStorage.setItem(
      `${config.appConfig.localStorageList}_${id}`,
      stringToBePersisted.toString()
    );
  } catch (error) {
    console.error(error);
  }
};

/**
 * loads the last persisted category-object of the user from the EncryptedStorage
 * @param  {string} [subjectId] subject-id
 * @returns string | null
 */
const loadCategories = async (subjectId) => {
  const id = subjectId || (await loadLastSubjectId());
  if (!id) return null;

  try {
    return JSON.parse(
      await EncryptedStorage.getItem(
        `${config.appConfig.localStorageList}_${id}`
      )
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * deletes the last persisted category-object of the user from the EncryptedStorage
 * @param  {string} [subjectId] subject-id
 */
const removeCategories = async (subjectId) => {
  const id = subjectId || (await loadLastSubjectId());
  if (!id) return;

  try {
    await EncryptedStorage.removeItem(
      `${config.appConfig.localStorageList}_${id}`
    );
  } catch (error) {
    console.error(error);
  }
};

// category map
/*-----------------------------------------------------------------------------------*/

/**
 * persists the current questionnaireItemMap object of the user
 * @param  {QuestionnaireItemMap} map questionnaireItemMap object of the user
 * @param  {string} [subjectId] if of the user
 */
const persistQuestionnaireItemMap = async (map, subjectId) => {
  const id = subjectId || (await loadLastSubjectId());
  if (!id) return;

  const stringToBePersisted = map instanceof String ? map : JSON.stringify(map);

  try {
    await EncryptedStorage.setItem(
      `${config.appConfig.localStorageMap}_${id}`,
      stringToBePersisted.toString()
    );
  } catch (error) {
    console.error(error);
  }
};

/**
 * loads the last persisted questionnaireItemMap-object of the user from the EncryptedStorage
 * @param  {string} [subjectId] subject-id
 * @returns string | null
 */
const loadQuestionnaireItemMap = async (subjectId) => {
  const id = subjectId || (await loadLastSubjectId());
  if (!id) return null;

  try {
    return JSON.parse(
      await EncryptedStorage.getItem(
        `${config.appConfig.localStorageMap}_${id}`
      )
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * deletes the last persisted questionnaireItemMap-object of the user from the EncryptedStorage
 * @param  {string} [subjectId] subject-id
 */
const removeQuestionnaireItemMap = async (subjectId) => {
  const id = subjectId || (await loadLastSubjectId());
  if (!id) return;

  try {
    await EncryptedStorage.removeItem(
      `${config.appConfig.localStorageMap}_${id}`
    );
  } catch (error) {
    console.error(error);
  }
};

// cleanup
/*-----------------------------------------------------------------------------------*/

/**
 * just clears all
 */
const clearAll = async () => {
  await EncryptedStorage.clear();
};

/***********************************************************************************************
export
***********************************************************************************************/

export default {
  persistLastSubjectId,
  loadLastSubjectId,
  removeLastQuestionnaireId,

  persistQuestionnaireItemMap,
  loadQuestionnaireItemMap,
  removeQuestionnaireItemMap,

  persistCategories,
  loadCategories,
  removeCategories,

  persistLastQuestionnaireId,
  loadLastQuestionnaireId,
  removeLastSubjectId,

  persistFCMToken,
  loadFCMToken,
  removeFCMToken,

  clearAll,
};
