
// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
import
***********************************************************************************************/

import config from '../../config/configProvider'

/***********************************************************************************************
initial state
***********************************************************************************************/

const initialState = {
	subjectId: null,
	session: null,
	loading: false,
	loggedIn: false,
	loginError: null,
	loginUnauthorized: false
}

/***********************************************************************************************
action handlers
***********************************************************************************************/

const actionHandlers = {

	/**
	 * start of the login
	 * @param  {object}	state redux state
	 */
	['SEND_CREDENTIALS_START']: state => {
		return {
			...state,
			loading: true,
			loggedIn: false
		}
	},

	/**
	 * login success
	 * @param  {object} state
	 * @param  {object} values
	 */
	['SEND_CREDENTIALS_SUCCESS']: (state, values) => {
		return {
			...state,
			subjectId: values.subjectId,
			session: {
				...state.session,
				...values.session,
			},
			loggedIn: true,
			loading: false
		}
	},

	/**
	 * login error
	 * @param  {object} state redux state
	 * @param  {object} values values to be set
	 */
	['SEND_CREDENTIALS_FAIL']: (state, values) => {
		return {
			...state,
			loginError: values.error,
			loading: false,
			loginUnauthorized:
				values.error.response &&
				values.error.response.status &&
				values.error.response.status === 401
		}
	},
	
	/**
	 * just updates the subjectId
	 * @param  {object} state redux state
	 * @param  {object} values values to be set
	 */
	['UPDATE_SUBJECT_ID']: (state, values) => {
		return {
			...state,
			subjectId: values.subjectId
		}
	},

	/**
	 * sets the session values from an earlier login
	 * @param  {object} state redux state
	 * @param  {object} values values to be set
	 */
	['LOADING_USER_FROM_CACHE']: (state, values) => {
		return {
			...state,
			subjectId: values.lastSubjectId,
			session: {
				...state.session,
				...values.session,
			},
			loggedIn: true,
			loading: false
		}
	},

	/**
	 * logout
	 * @param   {object} state redux state
	 */
	['LOGOUT']: state => {
		return {
			...state,
			subjectId: '',
			session: null,
			loginError: null,
			loggedIn: false,
			loginUnauthorized: false
		}
	},
}


/***********************************************************************************************
export
***********************************************************************************************/

export default (state = initialState, action) => {
    if (actionHandlers[action.type]) {
        return actionHandlers[action.type](state, action)
    }
    return state
}