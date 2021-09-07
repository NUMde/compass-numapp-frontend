// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

// redux
/*-----------------------------------------------------------------------------------*/

import thunk from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";

// reducers
/*-----------------------------------------------------------------------------------*/

import LoginReducer from "../src/screens/login/loginReducer";
import AboutReducer from "../src/screens/about/aboutReducer";
import CheckInReducer from "../src/screens/checkIn/checkInReducer";

// services
/*-----------------------------------------------------------------------------------*/

import localStorage from "../src/services/localStorage/localStorage";

/***********************************************************************************************
reducer
***********************************************************************************************/

const appReducer = combineReducers({
  Login: LoginReducer,
  CheckIn: CheckInReducer,
  About: AboutReducer,
});

const rootReducer = (state, action) => {
  let localState = { ...state };

  // global actions that need to be available anywhere,
  // will be filtered out and executed by the rootReducer
  // (before the actual reducer is)

  if (action.type === "USER_LOGOUT") {
    localState = undefined;
    localStorage.removeLastSubjectId();
  }

  if (action.type === "DELETE_ALL_LOCAL_DATA") {
    localStorage.clearAll();
  }

  if (action.type === "DELETE_LOCAL_QUESTIONNAIRE") {
    localState.CheckIn.currentCategoryIndex = null;
    localState.CheckIn.questionnaireItemMap = null;
    localState.CheckIn.categories = null;
    localState.CheckIn.categoriesLoaded = false;
    localState.CheckIn.currentPageIndex = 1;

    const { subjectId } = state.CheckIn.user;
    localStorage.removeLastQuestionnaireId(subjectId);
    localStorage.removeCategories(subjectId);
    localStorage.removeQuestionnaireItemMap(subjectId);
  }

  return appReducer(localState, action);
};

/***********************************************************************************************
middleware
***********************************************************************************************/

const middleware = [];
middleware.push(thunk);

// if(__DEV__) middleware.push(createLogger({collapsed: true}))

/***********************************************************************************************
export
***********************************************************************************************/

let globalMockStore;

export function buildStore(state) {
  if (state)
    globalMockStore = createStore(
      rootReducer,
      state,
      applyMiddleware(...middleware)
    );
  if (!state)
    globalMockStore = createStore(rootReducer, applyMiddleware(...middleware));

  return globalMockStore;
}

export default buildStore();
