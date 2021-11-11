/***********************************************************************************************
imports
***********************************************************************************************/

// the predefined questionnaire the demo is gonna use
import hardcodedTestQuestionnaire from "../assets/files/questionnaire";

/***********************************************************************************************
 constants
 ***********************************************************************************************/

 // is used to keep track of the completed transmissions (faked ones)
let playthrough = 1;

// is used to determine if a report was just sent out
let sentOutReport = false;

// is used to keep track if the first response was already sent out
let sentOutTheFirstOne = false;

// default user data
const defaultMockUserData = {
    firstTime: false,
    current_interval: 7,
    additional_iterations_left: 0,
    current_questionnaire_id: "final",
    due_date: "9999-12-30T23:00:00.000Z",
    start_date: "2021-07-15T04:00:00.000Z",
    subjectId: "7bfc3b07-a97d-4e11-8ac6-b970c1745476",
    pushAppGUID: "f98fc829-1d4d-418b-b05b-a147fdb9c0f3",
    current_instance_id: "a177e102-ecfa-490e-81a7-04cf7ebf22cf",
    pushClientSecret: "ab4b7d62-1fde-4a46-a566-2d1ada678df3",
    recipient_certificate_pem_string:
        "-----BEGIN CERTIFICATE-----\nMIIEOzCCAyOgAwIBAgIUc0iY16RQuluxpRL7hsmq/FRaWt0wDQYJKoZIhvcNAQEL\nBQAwgawxCzAJBgNVBAYTAkRFMQwwCgYDVQQIDANSTFAxDjAMBgNVBAcMBU1haW56\nMREwDwYDVQQKDAhVTSBNYWluejEeMBwGA1UECwwVUHJldmVudGl2ZSBDYXJkaW9s\nb2d5MRUwEwYDVQQDDAxHQ1NTdHVkeUNlcnQxNTAzBgkqhkiG9w0BCQEWJnN2ZW4t\nb2xpdmVyLnRyb2Vic0B1bmltZWRpemluLW1haW56LmRlMB4XDTIwMDkwMTExMjk0\nNFoXDTIzMDUyOTExMjk0NFowgawxCzAJBgNVBAYTAkRFMQwwCgYDVQQIDANSTFAx\nDjAMBgNVBAcMBU1haW56MREwDwYDVQQKDAhVTSBNYWluejEeMBwGA1UECwwVUHJl\ndmVudGl2ZSBDYXJkaW9sb2d5MRUwEwYDVQQDDAxHQ1NTdHVkeUNlcnQxNTAzBgkq\nhkiG9w0BCQEWJnN2ZW4tb2xpdmVyLnRyb2Vic0B1bmltZWRpemluLW1haW56LmRl\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnmY9Ep2SIoo824dWk1y8\ngonKArnhwVyW3AAVLpz9UtmkfElLiNLUbVOv6dGyCG9W8Y0DFwUU33EmFBlsmX3R\n7LbnwLYn7R6ntSakr58P6yNjMXY2CT2GjI0m63DPbLh6S3J6cO/8HNRnL3zW4O9B\n6FtgVg7Yf2koFjXz/kUYOFeqsPoqqLk70pO1nPGTjkz2JhBJQ+SaulTo19ZQ2tkT\nVP3zTZ9Urk8i/3fCU1TKTbYL/WwQepJlN8BwxzjIDQ2wA62nXzzlHQN98MnQGgY4\nXvj679rLFLsz2vgVmLnGPFwFL5op/6gmsKz7Q+B3zGco6qGyyL9N/D4fLKOVxnMy\nIwIDAQABo1MwUTAdBgNVHQ4EFgQUyMC1pkSWjQbIFZ/o4SEV9IqHJmwwHwYDVR0j\nBBgwFoAUyMC1pkSWjQbIFZ/o4SEV9IqHJmwwDwYDVR0TAQH/BAUwAwEB/zANBgkq\nhkiG9w0BAQsFAAOCAQEAIAAhhtVpDf/767pg8xxwaETYjPRL4pKW4H5b9t2Vr41M\nAdCUou9dbtWlqeFvY/eBby9DM05lI+D8hX2wYVRr7Pc80fuw5k4f+uTry2jc0vFV\nvHhv9sHJq3+EX/P4Nckb7M5lKI+d6GDiqzU3r/ARstoRVbQHRu2f0W7SW0pVPwlQ\nSFv61NIkjQB19SAO1IAR4Z/UrZ7Y0vnKQZ2fqFUHoD5wz4jXhHFsungocg9IxJ74\nKXaMj1nTtjCGxx11jQCNLyrVjI/XgNoPQ1v2FIQxmPJju9MAXQ2AIPA2NTXaDXHk\nYDlCrh7jxSgVWfrijhMFO/BmHDlumBpOPO1S4XG4qA==\n-----END CERTIFICATE-----",
};

/***********************************************************************************************
methods
***********************************************************************************************/

/**
 * calculates the next start date
 * @param  {boolean} laterOn tells us if we need to up the date
 */
const getStartDate = (laterOn) => {
    const now = new Date;
    now.setDate(now.getDate() + (laterOn ? 3 * playthrough : 0));
    return now.toISOString()
};

/**
 * calculates the next due date
 * @param  {boolean} laterOn tells us if we need to up the date
 */
const getDueDate = (laterOn) => {
    const then = new Date
    then.setDate(then.getDate() + (laterOn ? 10 * playthrough : 7));
    return then.toISOString()
};

/**
 * generates a fitting set of userdata
 */
const generateMockUserData = () => {
    // first time user
    if(!sentOutTheFirstOne) return {
        ...defaultMockUserData,
        current_interval: playthrough,
        start_date: getStartDate(),
        due_date: getDueDate(),
        firstTime: true,
    };
    // after sending out a regular questionnaire
    if(!sentOutReport) return {
        ...defaultMockUserData,
        current_interval: playthrough,
        start_date: getStartDate(true),
        due_date: getDueDate(true),
        firstTime: false,
    };
    // after sending out a report
    return {
        ...defaultMockUserData,
        current_interval: playthrough,
        start_date: getStartDate(),
        due_date: getDueDate(),
        firstTime: false,
    };
};

/**
 * triggers the mock for the sendQuestionnaire call and updates the status variables
 */
const sendQuestionnaire = () => {
    sentOutTheFirstOne = true;
    sentOutReport = false;
    playthrough += 1;
    return Promise.resolve(generateMockUserData());
};

/**
 * triggers the mock for the sendReport call and updates a status variable
 */
const sendReport = () => {
    sentOutReport = true;
    return Promise.resolve(generateMockUserData());
};

/***********************************************************************************************
export
***********************************************************************************************/

export default {
    sendReport,
    sendQuestionnaire,
    updateDeviceToken: () => Promise.resolve({ data: "something something" }),
    login: () => Promise.resolve({ data: generateMockUserData() }),
    getUserUpdate: () => Promise.resolve({ data: generateMockUserData() }),
    getBaseQuestionnaire: () => Promise.resolve({ data: hardcodedTestQuestionnaire })
};
