// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

// this file provides methods concerning the communication with the backend before the user
// is logged in.

/***********************************************************************************************
imports
***********************************************************************************************/

import axios from "axios";
import config from "../../config/configProvider";
import kioskMode from '../../config/kioskApiConfig'

/***********************************************************************************************
client
***********************************************************************************************/

/**
 * @param  {string} subjectId the id used to identify the user
 */
const login = async (subjectId) => 
  kioskMode.active ?
  await kioskMode.login() :
  axios.get(config.appConfig.endpoints.login + subjectId);

/***********************************************************************************************
export
***********************************************************************************************/

export default { login };
