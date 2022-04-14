/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render as rtlRender } from '@testing-library/react-native';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import UserReducer from '~store/user.slice';
import GlobalsReducer from '~store/globals.slice';
import QuestionnaireReducer from '~store/questionnaire.slice';

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
      Globals: { loading: false, error: false },
      Questionnaire: QuestionnaireReducer.initialState,
    },
    store = createStore(testReducer, initialState, applyMiddleware(thunk)),
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
