// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
import
***********************************************************************************************/

import '../../typedef';
import { defaultLanguage } from '../../services/localization';

/***********************************************************************************************
initial state
***********************************************************************************************/

const initialState = {
  showModal: false,
  modalLink: {},
  currentWebView: null,
  currentlyChosenLanguage: defaultLanguage,
};

/***********************************************************************************************
action handlers
***********************************************************************************************/

const actionHandlers = {
  /**
   * shows the regular modal and sets its content by id (see modal.js)
   * @param  {object} state redux state
   * @param  {object} value redux action
   * @param  {{title:string,subTitle: string,uri: string}} value.modalLink the identifying string
   */
  SHOW_GENERIC_MODAL: (state, value) => ({
    ...state,
    showModal: true,
    modalLink: value.modalLink,
  }),

  /**
   * hides the regular modal
   * @param  {object} state redux state
   */
  HIDE_GENERIC_MODAL: (state) => ({
    ...state,
    showModal: false,
  }),

  /**
   * hides the regular modal
   * @param  {object} state redux state
   */
  UPDATE_LANGUAGE: (state, value) => ({
    ...state,
    currentlyChosenLanguage: value.languageTag,
  }),

  /**
   * hides the regular modal
   * @param  {object} value redux value
   * @param  {object} state redux state
   */
  SET_CURRENT_WEBVIEW: (state, value) => ({
    ...state,
    currentWebView: value.newWebView,
  }),
};

/***********************************************************************************************
export
***********************************************************************************************/

// eslint-disable-next-line default-param-last
export default (state = initialState, action) => {
  if (actionHandlers[action.type]) {
    return actionHandlers[action.type](state, action);
  }
  return state;
};
