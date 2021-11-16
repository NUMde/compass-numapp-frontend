// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

// this file provides methods concerning the communication with the backend before the user
// is logged in.

/***********************************************************************************************
imports
***********************************************************************************************/

import axios from 'axios';
import { appConfig } from '../../config';

/***********************************************************************************************
client
***********************************************************************************************/

/**
 * @param  {string} subjectId the id used to identify the user
 */
const login = async (subjectId) =>
  axios.get(appConfig.endpoints.login + subjectId);

/***********************************************************************************************
export
***********************************************************************************************/

export default { login };
