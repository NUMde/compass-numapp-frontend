/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render as rtlRender } from '@testing-library/react-native';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import UserReducer from '../src/store/user.slice';
import GlobalsReducer from '../src/store/globals.slice';
import QuestionnaireReducer from '../src/store/questionnaire.slice';

const testReducer = combineReducers({
  User: UserReducer,
  Globals: GlobalsReducer,
  Questionnaire: QuestionnaireReducer,
});

function renderWithRedux(
  ui,
  {
    initialState = {
      User: UserReducer.initialState,
      Globals: GlobalsReducer.initialState,
      Questionnaire: QuestionnaireReducer.initialState,
    },
    store = createStore(testReducer, initialState),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react-native';

export { renderWithRedux };
