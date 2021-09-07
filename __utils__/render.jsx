import React from "react";
import { Provider } from "react-redux";
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from "@testing-library/react-native";
import { buildStore } from "./mockStore";

let store = null;

export function renderWithRedux(subComponent, state = {}) {
  if (!store) {
    store = buildStore(state);
  }

  const queries = render(<Provider store={store}>{subComponent}</Provider>);

  return {
    ...queries,
    store,
  };
}

export function initRenderModule(initialState = {}) {
  store = buildStore(initialState);

  return store;
}
