
// (C) Copyright IBM Deutschland GmbH 2020.  All rights reserved.

// this file contains functions that inteact with the AsysStorage

/***********************************************************************************************
imports
***********************************************************************************************/

import AsyncStorage from '@react-native-community/async-storage'
import config from '../../config/configProvider'

/***********************************************************************************************
operations
***********************************************************************************************/

// notification state
/*-----------------------------------------------------------------------------------*/

/**
 * persists the notification object that is returned after the push-registration
 * went through (per user)
 * @param  {string} [userId] userId of the user
 * @param  {any} notificationState notification object
 */
const persistNotificationState = async (notificationState, userId) => {
    
    if(!userId) userId = await loadLastUserId()
    if(!userId) return

    try {
        await AsyncStorage.setItem(config.appConfig.notificationState + '_' +  userId, notificationState)
    } 
    catch (error) {
        console.error(error)
    }
}

/**
 * loads the notification state of a user from the AsyncStorage
 * @param  {string} [userId] userId of the user
 * @returns {Promise<{deviceId:string}>}
 */
const loadNotificationState = async userId => {

    if(!userId) userId = await loadLastUserId()
    if(!userId) return

    try {
        return result = await AsyncStorage.getItem(config.appConfig.notificationState + '_' +  userId)
    } 
    catch (error) {
        console.error(error)
        return null
    }
}

/**
 * deletes the notification state of a user from the AsyncStorage
 * @param  {string} [userId] userId of the user
 */
const removeNotificationState = async userId => {
    
    if(!userId) userId = await loadLastUserId()
    if(!userId) return

    try {
        await AsyncStorage.removeItem(config.appConfig.notificationState + '_' +  userId)
    } 
    catch (error) {
        console.error(error)
    }
}

// last user id
/*-----------------------------------------------------------------------------------*/

/**
 * persists the last userId that was logged in (to automatically re-login the user 
 * when he/she opens the app the next time)
 * @param  {string} [userId] userId of the user
 */
const persistLastUserId = async userId => {

    if(!userId) userId = await loadLastUserId()
    if(!userId) return

    try {
        await AsyncStorage.setItem(config.appConfig.lastUserId, userId)
    } 
    catch (error) {
        console.error(error)
    }
}

/**
 * loads the last used userId from the AsynStorage
 * @returns string | null
 */
const loadLastUserId = async () => {

    try {
        return await AsyncStorage.getItem(config.appConfig.lastUserId)
    } 
    catch (error) {
        console.error(error)
        return null
    }
}

/**
 * deletes the last used userId from the AsynStorage
 */
const removeLastUserId = async () => {

    try {
        await AsyncStorage.removeItem(config.appConfig.lastUserId)
    } 
    catch (error) {
        console.error(error)
    }
}

// last questionnaire id
/*-----------------------------------------------------------------------------------*/

/**
 * when the user receives a questionnaire from the server, the frontend persists its
 * id. the next time a partially completed questionnaire is locally loaded, its id will be 
 * checked against the just persisted one. if it matches the questionnaire will be loaded.
 * if not, the questionnaire will be deleted and a user update executed.
 * @param  {string} questionnaireId id of the questionnaire
 * @param  {string} [userId] id of the user
 */
const persistLastQuestionnaireId = async (questionnaireId, userId) => {

    if(!userId) userId = await loadLastUserId()
    if(!(questionnaireId && userId)) return

    try {
        await AsyncStorage.setItem(config.appConfig.lastQuestionnaireId + '_' +  userId, questionnaireId)
    } 
    catch (error) {
        console.error(error)
    }
}

/**
 * loads the last persisted questionnaire id (of a user) from the AsyncStorage
 * @param  {string} [userId] user id
 * @returns string | null
 */
const loadLastQuestionnaireId = async userId => {

    if(!userId) userId = await loadLastUserId()
    if(!userId) return

    try {
        return await AsyncStorage.getItem(config.appConfig.lastQuestionnaireId + '_' +  userId)
    } 
    catch (error) {
        console.error(error)
        return null
    }
}

/**
 * deletes the last persisted questionnaire id (of a user) from the AsyncStorage
 * @param  {string} [userId] user-id
 */
const removeLastQuestionnaireId= async userId => {

    if(!userId) userId = await loadLastUserId()
    if(!userId) return

    try {
        await AsyncStorage.removeItem(config.appConfig.lastQuestionnaireId + '_' +  userId)
    } 
    catch (error) {
        console.error(error)
    }
}

// categories
/*-----------------------------------------------------------------------------------*/

/**
 * persists the current categories object of the user
 * @param  {QuestionnaireItem[]} categories categories object of the user
 * @param  {string} [userId] if of the user
 */
const persistCategories = async (categories, userId) => {

    if(!userId) userId = await loadLastUserId()
    if(!(categories && userId)) return

    let stringToBePersisted = categories instanceof String ? categories : JSON.stringify(categories)

    try {
        await AsyncStorage.setItem(config.appConfig.localStorageList + '_' +  userId, stringToBePersisted.toString())
    } 
    catch (error) {
        console.error(error)
    }
}

/**
 * loads the last persisted category-object of the user from the AsyncStorage
 * @param  {string} [userId] user id
 * @returns string | null
 */
const loadCategories = async userId => {

    if(!userId) userId = await loadLastUserId()
    if(!userId) return

    try {
        return JSON.parse(await AsyncStorage.getItem(config.appConfig.localStorageList + '_' +  userId))
    } 
    catch (error) {
        console.error(error)
        return null
    }
}

/**
 * deletes the last persisted category-object of the user from the AsyncStorage
 * @param  {string} [userId] user id
 */
const removeCategories = async userId => {

    if(!userId) userId = await loadLastUserId()
    if(!userId) return

    try {
        await AsyncStorage.removeItem(config.appConfig.localStorageList + '_' + userId)
    } 
    catch (error) {
        console.error(error)
    }
}

// category map
/*-----------------------------------------------------------------------------------*/

/**
 * persists the current questionnaireItemMap object of the user
 * @param  {QuestionnaireItemMap} map qestionnaireItemMap object of the user
 * @param  {string} [userId] if of the user
 */
const persistQuestionnaireItemMap = async (map, userId) => {

    if(!userId) userId = await loadLastUserId()
    if(!(map && userId)) return

    let stringToBePersisted = map instanceof String ? map : JSON.stringify(map)

    try {
        await AsyncStorage.setItem(config.appConfig.localStorageMap + '_' +  userId, stringToBePersisted.toString())
    } 
    catch (error) {
        console.error(error)
    }
}

/**
 * loads the last persisted questionnaireItemMap-object of the user from the AsyncStorage
 * @param  {string} [userId] user id
 * @returns string | null
 */
const loadQuestionnaireItemMap = async userId => {
    
    if(!userId) userId = await loadLastUserId()
    if(!userId) return

    try {
        return JSON.parse(await AsyncStorage.getItem(config.appConfig.localStorageMap + '_' +  userId))
    } 
    catch (error) {
        console.error(error)
        return null
    }
}

/**
 * deletes the last persisted questionnaireItemMap-object of the user from the AsyncStorage
 * @param  {string} [userId] user id
 */
const removeQuestionnaireItemMap = async userId => {

    if(!userId) userId = await loadLastUserId()
    if(!userId) return

    try {
        await AsyncStorage.removeItem(config.appConfig.localStorageMap + '_' + userId)
    } 
    catch (error) {
        console.error(error)
    }
}

// cleanup
/*-----------------------------------------------------------------------------------*/

/**
 * just clears all
 */
const clearAll = async () => {
    await AsyncStorage.clear()
}

/***********************************************************************************************
export
***********************************************************************************************/

export default { 
    persistLastUserId,
    loadLastUserId,
    removeLastQuestionnaireId,

    persistQuestionnaireItemMap,
    loadQuestionnaireItemMap,
    removeQuestionnaireItemMap,

    persistCategories,
    loadCategories,
    removeCategories,

    persistLastQuestionnaireId,
    loadLastQuestionnaireId,
    removeLastUserId,

    persistNotificationState,
    loadNotificationState,
    removeNotificationState,

    clearAll
}
