/* eslint-disable no-param-reassign */

// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

// redux
/*-----------------------------------------------------------------------------------*/

import { combineReducers, createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

// reducers
/*-----------------------------------------------------------------------------------*/

import LoginReducer from "./screens/login/loginReducer";
import AboutReducer from "./screens/about/aboutReducer";
import CheckInReducer from "./screens/checkIn/checkInReducer";

// services
/*-----------------------------------------------------------------------------------*/

import localStorage from "./services/localStorage/localStorage";

/***********************************************************************************************
reducer
***********************************************************************************************/

const appReducer = combineReducers({
  Login: LoginReducer,
  CheckIn: CheckInReducer,
  About: AboutReducer,
});

const rootReducer = (state, action) => {
  // global actions that need to be available anywhere,
  // will be filtered out and executed by the rootReducer
  // (before the actual reducer is)

  if (action.type === "USER_LOGOUT") {
    state = undefined;
    localStorage.removeLastSubjectId();
  }

  if (action.type === "DELETE_ALL_LOCAL_DATA") {
    localStorage.clearAll();
  }

  if (action.type === "DELETE_LOCAL_QUESTIONNAIRE") {
    state.CheckIn.currentCategoryIndex = null;
    state.CheckIn.questionnaireItemMap = null;
    state.CheckIn.categories = null;
    state.CheckIn.categoriesLoaded = false;
    state.CheckIn.currentPageIndex = 1;

    const { subjectId } = state.CheckIn.user;
    localStorage.removeLastQuestionnaireId(subjectId);
    localStorage.removeCategories(subjectId);
    localStorage.removeQuestionnaireItemMap(subjectId);
  }
  return appReducer(state, action);
};

/***********************************************************************************************
middleware
***********************************************************************************************/

const middleware = [];
middleware.push(thunk);

if (__DEV__) middleware.push(createLogger({ collapsed: true }));

/***********************************************************************************************
export
***********************************************************************************************/

export default createStore(rootReducer, applyMiddleware(...middleware));
