
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
 * @param  {string} [subjectId] subjectId of the user
 * @param  {any} notificationState notification object
 */
const persistNotificationState = async (notificationState, subjectId) => {
    
    if(!subjectId) subjectId = await loadLastSubjectId()
    if(!subjectId) return

    try {
        await AsyncStorage.setItem(config.appConfig.notificationState + '_' +  subjectId, notificationState)
    } 
    catch (error) {
        console.error(error)
    }
}

/**
 * loads the notification state of a user from the AsyncStorage
 * @param  {string} [subjectId] subjectId of the user
 * @returns {Promise<{deviceId:string}>}
 */
const loadNotificationState = async subjectId => {

    if(!subjectId) subjectId = await loadLastSubjectId()
    if(!subjectId) return

    try {
        return result = await AsyncStorage.getItem(config.appConfig.notificationState + '_' +  subjectId)
    } 
    catch (error) {
        console.error(error)
        return null
    }
}

/**
 * deletes the notification state of a user from the AsyncStorage
 * @param  {string} [subjectId] subjectId of the user
 */
const removeNotificationState = async subjectId => {
    
    if(!subjectId) subjectId = await loadLastSubjectId()
    if(!subjectId) return

    try {
        await AsyncStorage.removeItem(config.appConfig.notificationState + '_' +  subjectId)
    } 
    catch (error) {
        console.error(error)
    }
}

// last subject-id
/*-----------------------------------------------------------------------------------*/

/**
 * persists the last subjectId that was logged in (to automatically re-login the user 
 * when he/she opens the app the next time)
 * @param  {string} [subjectId] subjectId of the user
 */
const persistLastSubjectId = async subjectId => {

    if(!subjectId) subjectId = await loadLastSubjectId()
    if(!subjectId) return

    try {
        await AsyncStorage.setItem(config.appConfig.lastSubjectId, subjectId)
    } 
    catch (error) {
        console.error(error)
    }
}

/**
 * loads the last used subjectId from the AsynStorage
 * @returns string | null
 */
const loadLastSubjectId = async () => {

    try {
        return await AsyncStorage.getItem(config.appConfig.lastSubjectId)
    } 
    catch (error) {
        console.error(error)
        return null
    }
}

/**
 * deletes the last used subjectId from the AsynStorage
 */
const removeLastSubjectId = async () => {

    try {
        await AsyncStorage.removeItem(config.appConfig.lastSubjectId)
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
 * @param  {string} [subjectId] id of the user
 */
const persistLastQuestionnaireId = async (questionnaireId, subjectId) => {

    if(!subjectId) subjectId = await loadLastSubjectId()
    if(!(questionnaireId && subjectId)) return

    try {
        await AsyncStorage.setItem(config.appConfig.lastQuestionnaireId + '_' +  subjectId, questionnaireId)
    } 
    catch (error) {
        console.error(error)
    }
}

/**
 * loads the last persisted questionnaire id (of a user) from the AsyncStorage
 * @param  {string} [subjectId] subject-id
 * @returns string | null
 */
const loadLastQuestionnaireId = async subjectId => {

    if(!subjectId) subjectId = await loadLastSubjectId()
    if(!subjectId) return

    try {
        return await AsyncStorage.getItem(config.appConfig.lastQuestionnaireId + '_' +  subjectId)
    } 
    catch (error) {
        console.error(error)
        return null
    }
}

/**
 * deletes the last persisted questionnaire id (of a user) from the AsyncStorage
 * @param  {string} [subjectId] subject-id
 */
const removeLastQuestionnaireId= async subjectId => {

    if(!subjectId) subjectId = await loadLastSubjectId()
    if(!subjectId) return

    try {
        await AsyncStorage.removeItem(config.appConfig.lastQuestionnaireId + '_' +  subjectId)
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
 * @param  {string} [subjectId] if of the user
 */
const persistCategories = async (categories, subjectId) => {

    if(!subjectId) subjectId = await loadLastSubjectId()
    if(!(categories && subjectId)) return

    let stringToBePersisted = categories instanceof String ? categories : JSON.stringify(categories)

    try {
        await AsyncStorage.setItem(config.appConfig.localStorageList + '_' +  subjectId, stringToBePersisted.toString())
    } 
    catch (error) {
        console.error(error)
    }
}

/**
 * loads the last persisted category-object of the user from the AsyncStorage
 * @param  {string} [subjectId] subject-id
 * @returns string | null
 */
const loadCategories = async subjectId => {

    if(!subjectId) subjectId = await loadLastSubjectId()
    if(!subjectId) return

    try {
        return JSON.parse(await AsyncStorage.getItem(config.appConfig.localStorageList + '_' +  subjectId))
    } 
    catch (error) {
        console.error(error)
        return null
    }
}

/**
 * deletes the last persisted category-object of the user from the AsyncStorage
 * @param  {string} [subjectId] subject-id
 */
const removeCategories = async subjectId => {

    if(!subjectId) subjectId = await loadLastSubjectId()
    if(!subjectId) return

    try {
        await AsyncStorage.removeItem(config.appConfig.localStorageList + '_' + subjectId)
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
 * @param  {string} [subjectId] if of the user
 */
const persistQuestionnaireItemMap = async (map, subjectId) => {

    if(!subjectId) subjectId = await loadLastSubjectId()
    if(!(map && subjectId)) return

    let stringToBePersisted = map instanceof String ? map : JSON.stringify(map)

    try {
        await AsyncStorage.setItem(config.appConfig.localStorageMap + '_' +  subjectId, stringToBePersisted.toString())
    } 
    catch (error) {
        console.error(error)
    }
}

/**
 * loads the last persisted questionnaireItemMap-object of the user from the AsyncStorage
 * @param  {string} [subjectId] subject-id
 * @returns string | null
 */
const loadQuestionnaireItemMap = async subjectId => {
    
    if(!subjectId) subjectId = await loadLastSubjectId()
    if(!subjectId) return

    try {
        return JSON.parse(await AsyncStorage.getItem(config.appConfig.localStorageMap + '_' +  subjectId))
    } 
    catch (error) {
        console.error(error)
        return null
    }
}

/**
 * deletes the last persisted questionnaireItemMap-object of the user from the AsyncStorage
 * @param  {string} [subjectId] subject-id
 */
const removeQuestionnaireItemMap = async subjectId => {

    if(!subjectId) subjectId = await loadLastSubjectId()
    if(!subjectId) return

    try {
        await AsyncStorage.removeItem(config.appConfig.localStorageMap + '_' + subjectId)
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

    persistNotificationState,
    loadNotificationState,
    removeNotificationState,

    clearAll
}
