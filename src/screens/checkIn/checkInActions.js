// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import config from "../../config/configProvider";
import hardcodedTestQuestionnaire from "../../assets/files/questionnaire";

import "../../typedef";

/***********************************************************************************************
action handlers
***********************************************************************************************/

/**
 * just shows the datepicker
 */
export const showDatePicker = () => async (dispatch) => {
  dispatch({
    type: "SHOW_DATEPICKER",
  });
};

/**
 * hides the datepicker
 */
export const hideDatePicker = () => async (dispatch) => {
  dispatch({
    type: "HIDE_DATEPICKER",
  });
};

/**
 * @param  {number} currentCategoryIndex index of the category to open
 */
export const showQuestionnaireModal =
  (currentCategoryIndex) => async (dispatch) => {
    dispatch({
      type: "SHOW_QUESTIONNAIRE_MODAL",
      values: { currentCategoryIndex, currentPageIndex: 1 },
    });
  };

/**
 * hides the questionnaire modal
 */
export const hideQuestionnaireModal = () => async (dispatch) => {
  dispatch({
    type: "HIDE_QUESTIONNAIRE_MODAL",
  });
};

/**
 * updates the page number of the currently opened category to display
 * a different page
 * @param  {boolean} forward if true,we're turning the page forward
 * @param  {number}  numberOfPages amount of pages in the category
 * @param  {number}  currentPageIndex current page index
 */
export const switchContent =
  (forward, numberOfPages, currentPageIndex) => async (dispatch) => {
    // checks if the last page is reached and if yes, closes the modal
    if (
      forward &&
      numberOfPages &&
      currentPageIndex &&
      numberOfPages === currentPageIndex
    ) {
      dispatch({
        type: "HIDE_QUESTIONNAIRE_MODAL",
      });
    }
    // if its not the last page, switches the content
    else {
      dispatch({
        type: "SWITCH_CONTENT",
        forward,
      });
    }
  };

/**
 * @param  {Date | string | number} answer answer to be set
 */
export const setAnswer = (answer) => async (dispatch) => {
  dispatch({
    type: "SET_ANSWER",
    answer,
  });
};

/**
 * sets/updates the questionnaireItemMap
 * @param  {QuestionnaireItemMap} questionnaireItemMap
 */
export const setQuestionnaireItemMap =
  (questionnaireItemMap) => async (dispatch) => {
    dispatch({
      type: "SET_QUESTIONNAIRE_ITEM_MAP",
      questionnaireItemMap,
    });
  };

/**
 * loads a locally persisted questionnaireItemMap and categories-array
 * @param  {QuestionnaireItemMap} map locally persisted questionnaireItemMap
 * @param  {QuestionnaireItem[]} list locally persisted categories array
 */
export const loadLocalQuestionnaire = (map, list) => async (dispatch) => {
  dispatch({
    type: "LOAD_LOCAL_QUESTIONNAIRE_START",
  });

  dispatch({
    type: "LOAD_LOCAL_QUESTIONNAIRE_SUCCESS",
    value: {
      map,
      list,
    },
  });
};

/**
 * deletes the locally persisted questionnaireItemMap and categories-array
 */
export const deleteLocalQuestionnaire = () => async (dispatch) => {
  dispatch({
    type: "DELETE_LOCAL_QUESTIONNAIRE",
  });
};

/**
 * deletes all locally available data
 */
export const deleteAllLocalData = () => async (dispatch) => {
  dispatch({
    type: "DELETE_ALL_LOCAL_DATA",
  });
};

/**
 * start of the local questionnaire deletion
 */
export const deleteLocalQuestionnaireStart = () => async (dispatch) => {
  dispatch({
    type: "DELETE_LOCAL_QUESTIONNAIRE_START",
  });
};

/**
 * success of the local questionnaire deletion
 */
export const deleteLocalQuestionnaireSuccess = () => async (dispatch) => {
  dispatch({
    type: "DELETE_LOCAL_QUESTIONNAIRE_SUCCESS",
  });
};

/**
 * start of the questionnaire procuring
 */
export const getQuestionnaireStart = () => async (dispatch) => {
  dispatch({
    type: "GET_QUESTIONNAIRE_START",
  });
};

/**
 * success of the questionnaire procuring
 * (if the attribute useLocalQuestionnaireInsteadOftheReceivedOne is set in appConfig.js then
 * the received questionnaire will be switched with the local test-questionnaire "questionnaire.js"
 * @param  {object} questionnaire questionnaire
 */
export const getQuestionnaireSuccess = (questionnaire) => async (dispatch) => {
  dispatch({
    type: "GET_QUESTIONNAIRE_SUCCESS",
    questionnaire: config.appConfig.useLocalQuestionnaireInsteadOftheReceivedOne
      ? hardcodedTestQuestionnaire
      : questionnaire,
  });
};

/**
 * fail of the questionnaire procuring
 * @param  {any} error http error to be persisted
 */
export const getQuestionnaireFail = (error) => async (dispatch) => {
  dispatch({
    type: "GET_QUESTIONNAIRE_FAIL",
    value: error,
  });
};

/**
 * starts the transmission of the questionnaire-response
 */
export const sendQuestionnaireResponseStart = () => async (dispatch) => {
  dispatch({
    type: "SEND_QUESTIONNAIRE_RESPONSE_START",
  });
};

/**
 * @param  {object} value http response
 */
export const sendQuestionnaireResponseSuccess = (value) => async (dispatch) => {
  dispatch({
    type: "SEND_QUESTIONNAIRE_RESPONSE_SUCCESS",
    value,
  });
};

/**
 * @param  {object} value http error
 */
export const sendQuestionnaireResponseFail = (value) => async (dispatch) => {
  dispatch({
    type: "SEND_QUESTIONNAIRE_RESPONSE_FAIL",
    value,
  });
};

/**
 * user logout
 */
export const logout = () => async (dispatch) => {
  dispatch({
    type: "USER_LOGOUT",
  });
};

/**
 * deletes all local data (is executed in src/store.js, not in the AboutReducer)
 */
export const deleteLocalData = () => async dispatch => {
	dispatch({
		type: 'DELETE_ALL_LOCAL_DATA'
	})
}

/**
 * shows/hides the menu
 * @param  {boolean} value if true, displays the menu
 */
export const showMenu = (value) => async (dispatch) => {
  dispatch({
    type: "SHOW_MENU",
    value,
  });
};

/**
 * start of the user update
 */
export const updateUserStart = () => (dispatch) => {
  dispatch({
    type: "UPDATE_USER_START",
  });
};

/**
 * success of the user update
 * @param  {object} user the new user
 */
export const updateUserSuccess = (user) => (dispatch) => {
  dispatch({
    type: "UPDATE_USER_SUCCESS",
    user,
  });
};

/**
 * Failure of the user update
 * @param  {any} value http error
 */
export const updateUserFail = (value) => (dispatch) => {
  dispatch({
    type: "UPDATE_USER_FAIL",
    value,
  });
};

/**
 * start of the report sending
 */
export const sendReportStart = () => (dispatch) => {
  dispatch({
    type: "SEND_REPORT_START",
  });
};

/**
 * success of the report sending
 * @param  {object} value http response
 */
export const sendReportSuccess = (value) => (dispatch) => {
  dispatch({
    type: "SEND_REPORT_SUCCESS",
    value,
  });
};

/**
 * failure of the report sending
 * @param  {object} value http error
 */
export const sendReportFail = (value) => (dispatch) => {
  dispatch({
    type: "SEND_REPORT_FAIL",
    value,
  });
};

/**
 * start of setting up the push service
 */
export const setupPushServiceStart = () => (dispatch) => {
  dispatch({
    type: "SETUP_PUSH_SERVICE_START",
  });
};

/**
 * success of setting up the push service
 */
export const setupPushServiceSuccess = (response, token) => (dispatch) => {
  dispatch({
    type: "SETUP_PUSH_SERVICE_SUCCESS",
    response,
    token,
  });
};

/**
 * failure of setting up the push service
 */
export const setupPushServiceFail = (error) => (dispatch) => {
  dispatch({
    type: "SETUP_PUSH_SERVICE_FAIL",
    error,
  });
};

/**
 * failure of setting up the push service
 */
export const setupPushServiceNoUpdate = (token) => (dispatch) => {
  dispatch({
    type: "FCM_DID_NOT_CHANGE_SO_NO_UPDATE",
    token,
  });
};
