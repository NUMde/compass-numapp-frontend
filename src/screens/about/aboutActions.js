
// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/**
 * logs the user out
 */
export const logout = () => async dispatch => {
	dispatch({
		type: 'USER_LOGOUT'
	})
}

/**
 * deletes all local data (is executed in src/store.js, not in the AboutReducer)
 */
export const deleteLocalData = () => async dispatch => {
	dispatch({
		type: 'DELETE_ALL_LOCAL_DATA'
	})
}

/**
 * shows the modal and sets its content
 * @param  {{title:string,subTitle: string,uri: string}} modalLink determines what content will be rendered (needed for the render function of src/component/modal/redirectModal.js)
 */
export const showModal = (modalLink) => async dispatch => {
	dispatch({
		type: 'SHOW_GENERIC_MODAL',
		modalLink
	})
}

/**
 * hides the modal
 */
export const hideModal = () => async dispatch => {
	dispatch({
		type: 'HIDE_GENERIC_MODAL'
	})
}

/**
 * sets the content for the webview screen
 * @param {{title:string,subTitle: string,uri: string}} newWebView determines what content will be rendered
 */
export const setCurrentWebView = (newWebView) => async dispatch => {
	dispatch({
		type: 'SET_CURRENT_WEBVIEW',
		newWebView
	})
}
