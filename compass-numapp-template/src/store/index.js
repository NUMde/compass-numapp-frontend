// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import EncryptedStorage from 'react-native-encrypted-storage';
import { persistStore, persistReducer } from 'redux-persist';

// reducers
/*-----------------------------------------------------------------------------------*/

import UserReducer from './user.slice';
import GlobalsReducer from './globals.slice';
import QuestionnaireReducer from './questionnaire.slice';

/***********************************************************************************************
reducer
***********************************************************************************************/

const appReducer = combineReducers({
  User: UserReducer,
  Globals: GlobalsReducer,
  Questionnaire: QuestionnaireReducer,
});

/***********************************************************************************************
middleware
***********************************************************************************************/

const middleware = [];

middleware.push(thunk);

if (__DEV__) {
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  const createDebugger = require('redux-flipper').default;
  middleware.push(createDebugger());
}

// add custom middleware here
// middleware.push(customMiddleware)

// config for the 'persist' reducer
const persistConfig = {
  key: 'root',
  storage: EncryptedStorage,
  whitelist: ['User', 'Questionnaire'],
};

// this reducer automatically stores data in local storage
const persistedReducer = persistReducer(persistConfig, appReducer);

/***********************************************************************************************
export
***********************************************************************************************/

// create store with middleware and apply redux devtools for debugging
export const reduxStore = configureStore({
  reducer: persistedReducer,
  middleware,
});

export const persistor = persistStore(reduxStore);
