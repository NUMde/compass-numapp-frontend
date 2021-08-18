
// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import mockPermissions from 'react-native-permissions/mock'
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock'

/***********************************************************************************************
mocks
***********************************************************************************************/

// mocks the datetimepicker 
/*-----------------------------------------------------------------------------------*/
jest.mock('@react-native-community/datetimepicker', () => jest.fn())

// mocks the picker
/*-----------------------------------------------------------------------------------*/
jest.mock('@react-native-picker/picker', () => jest.fn())

// mocks the NativeAnimatedHelper module
/*-----------------------------------------------------------------------------------*/
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

// mocks the async storage
/*-----------------------------------------------------------------------------------*/
jest.mock('@react-native-community/async-storage', () => mockAsyncStorage)

// react native permissions
/*-----------------------------------------------------------------------------------*/
jest.mock('react-native', () =>  {
    const rn = jest.requireActual('react-native')
    rn.NativeModules.RNPermissions = {
        ...mockPermissions
    }
    return rn
}
)

// the fcm messaging
/*-----------------------------------------------------------------------------------*/
jest.mock('@react-native-firebase/messaging', () => {
    return {
        messaging: jest.fn(() => {
            return {
                hasPermission: jest.fn(() => Promise.resolve(true)),
                subscribeToTopic: jest.fn(),
                unsubscribeFromTopic: jest.fn(),
                requestPermission: jest.fn(() => Promise.resolve(true)),
                getToken: jest.fn(() => Promise.resolve('myMockToken'))
            }
        }),
        notifications: jest.fn(() => {
            return {
                onNotification: jest.fn(),
                onNotificationDisplayed: jest.fn()
            }
        })
    }
})

// the splashscreen used when loading the app
/*-----------------------------------------------------------------------------------*/
jest.mock('react-native-splash-screen', () => {
    return {
        hide: jest.fn(),
        show: jest.fn()
    }
})

// axios
/*-----------------------------------------------------------------------------------*/
jest.mock('axios', () => {
    return {
        get: jest.fn(() => Promise.resolve({ data: "mocked" })),
        post: jest.fn(() => Promise.resolve({ data: "mocked" }))
    }
})

// loggedInClient.js
/*-----------------------------------------------------------------------------------*/

// no worries - this is all dummy data

jest.mock('../src/services/rest/loggedInClient', () => {
    return {
        login: jest.fn(() => Promise.resolve({ data: {
            recipient_certificate_pem_string: "-----BEGIN CERTIFICATE-----\nMIIEOzCCAyOgAwIBAgIUc0iY16RQuluxpRL7hsmq/FRaWt0wDQYJKoZIhvcNAQEL\nBQAwgawxCzAJBgNVBAYTAkRFMQwwCgYDVQQIDANSTFAxDjAMBgNVBAcMBU1haW56\nMREwDwYDVQQKDAhVTSBNYWluejEeMBwGA1UECwwVUHJldmVudGl2ZSBDYXJkaW9s\nb2d5MRUwEwYDVQQDDAxHQ1NTdHVkeUNlcnQxNTAzBgkqhkiG9w0BCQEWJnN2ZW4t\nb2xpdmVyLnRyb2Vic0B1bmltZWRpemluLW1haW56LmRlMB4XDTIwMDkwMTExMjk0\nNFoXDTIzMDUyOTExMjk0NFowgawxCzAJBgNVBAYTAkRFMQwwCgYDVQQIDANSTFAx\nDjAMBgNVBAcMBU1haW56MREwDwYDVQQKDAhVTSBNYWluejEeMBwGA1UECwwVUHJl\ndmVudGl2ZSBDYXJkaW9sb2d5MRUwEwYDVQQDDAxHQ1NTdHVkeUNlcnQxNTAzBgkq\nhkiG9w0BCQEWJnN2ZW4tb2xpdmVyLnRyb2Vic0B1bmltZWRpemluLW1haW56LmRl\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnmY9Ep2SIoo824dWk1y8\ngonKArnhwVyW3AAVLpz9UtmkfElLiNLUbVOv6dGyCG9W8Y0DFwUU33EmFBlsmX3R\n7LbnwLYn7R6ntSakr58P6yNjMXY2CT2GjI0m63DPbLh6S3J6cO/8HNRnL3zW4O9B\n6FtgVg7Yf2koFjXz/kUYOFeqsPoqqLk70pO1nPGTjkz2JhBJQ+SaulTo19ZQ2tkT\nVP3zTZ9Urk8i/3fCU1TKTbYL/WwQepJlN8BwxzjIDQ2wA62nXzzlHQN98MnQGgY4\nXvj679rLFLsz2vgVmLnGPFwFL5op/6gmsKz7Q+B3zGco6qGyyL9N/D4fLKOVxnMy\nIwIDAQABo1MwUTAdBgNVHQ4EFgQUyMC1pkSWjQbIFZ/o4SEV9IqHJmwwHwYDVR0j\nBBgwFoAUyMC1pkSWjQbIFZ/o4SEV9IqHJmwwDwYDVR0TAQH/BAUwAwEB/zANBgkq\nhkiG9w0BAQsFAAOCAQEAIAAhhtVpDf/767pg8xxwaETYjPRL4pKW4H5b9t2Vr41M\nAdCUou9dbtWlqeFvY/eBby9DM05lI+D8hX2wYVRr7Pc80fuw5k4f+uTry2jc0vFV\nvHhv9sHJq3+EX/P4Nckb7M5lKI+d6GDiqzU3r/ARstoRVbQHRu2f0W7SW0pVPwlQ\nSFv61NIkjQB19SAO1IAR4Z/UrZ7Y0vnKQZ2fqFUHoD5wz4jXhHFsungocg9IxJ74\nKXaMj1nTtjCGxx11jQCNLyrVjI/XgNoPQ1v2FIQxmPJju9MAXQ2AIPA2NTXaDXHk\nYDlCrh7jxSgVWfrijhMFO/BmHDlumBpOPO1S4XG4qA==\n-----END CERTIFICATE-----",
            access_token: "bfc3b07-a97d-4e11-8ac6-b970c1745476"
        }})),
        getUserUpdate: jest.fn(() => Promise.resolve({ data: {
            additional_iterations_left: 0,
            current_instance_id: "a177e102-ecfa-490e-81a7-04cf7ebf22cf",
            current_interval: 7,
            current_questionnaire_id: "final",
            due_date: "9999-12-30T23:00:00.000Z",
            firstTime: false,
            pushAppGUID: "f98fc829-1d4d-418b-b05b-a147fdb9c0f3",
            pushClientSecret: "ab4b7d62-1fde-4a46-a566-2d1ada678df3",
            recipient_certificate_pem_string: "-----BEGIN CERTIFICATE-----\nMIIEOzCCAyOgAwIBAgIUc0iY16RQuluxpRL7hsmq/FRaWt0wDQYJKoZIhvcNAQEL\nBQAwgawxCzAJBgNVBAYTAkRFMQwwCgYDVQQIDANSTFAxDjAMBgNVBAcMBU1haW56\nMREwDwYDVQQKDAhVTSBNYWluejEeMBwGA1UECwwVUHJldmVudGl2ZSBDYXJkaW9s\nb2d5MRUwEwYDVQQDDAxHQ1NTdHVkeUNlcnQxNTAzBgkqhkiG9w0BCQEWJnN2ZW4t\nb2xpdmVyLnRyb2Vic0B1bmltZWRpemluLW1haW56LmRlMB4XDTIwMDkwMTExMjk0\nNFoXDTIzMDUyOTExMjk0NFowgawxCzAJBgNVBAYTAkRFMQwwCgYDVQQIDANSTFAx\nDjAMBgNVBAcMBU1haW56MREwDwYDVQQKDAhVTSBNYWluejEeMBwGA1UECwwVUHJl\ndmVudGl2ZSBDYXJkaW9sb2d5MRUwEwYDVQQDDAxHQ1NTdHVkeUNlcnQxNTAzBgkq\nhkiG9w0BCQEWJnN2ZW4tb2xpdmVyLnRyb2Vic0B1bmltZWRpemluLW1haW56LmRl\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnmY9Ep2SIoo824dWk1y8\ngonKArnhwVyW3AAVLpz9UtmkfElLiNLUbVOv6dGyCG9W8Y0DFwUU33EmFBlsmX3R\n7LbnwLYn7R6ntSakr58P6yNjMXY2CT2GjI0m63DPbLh6S3J6cO/8HNRnL3zW4O9B\n6FtgVg7Yf2koFjXz/kUYOFeqsPoqqLk70pO1nPGTjkz2JhBJQ+SaulTo19ZQ2tkT\nVP3zTZ9Urk8i/3fCU1TKTbYL/WwQepJlN8BwxzjIDQ2wA62nXzzlHQN98MnQGgY4\nXvj679rLFLsz2vgVmLnGPFwFL5op/6gmsKz7Q+B3zGco6qGyyL9N/D4fLKOVxnMy\nIwIDAQABo1MwUTAdBgNVHQ4EFgQUyMC1pkSWjQbIFZ/o4SEV9IqHJmwwHwYDVR0j\nBBgwFoAUyMC1pkSWjQbIFZ/o4SEV9IqHJmwwDwYDVR0TAQH/BAUwAwEB/zANBgkq\nhkiG9w0BAQsFAAOCAQEAIAAhhtVpDf/767pg8xxwaETYjPRL4pKW4H5b9t2Vr41M\nAdCUou9dbtWlqeFvY/eBby9DM05lI+D8hX2wYVRr7Pc80fuw5k4f+uTry2jc0vFV\nvHhv9sHJq3+EX/P4Nckb7M5lKI+d6GDiqzU3r/ARstoRVbQHRu2f0W7SW0pVPwlQ\nSFv61NIkjQB19SAO1IAR4Z/UrZ7Y0vnKQZ2fqFUHoD5wz4jXhHFsungocg9IxJ74\nKXaMj1nTtjCGxx11jQCNLyrVjI/XgNoPQ1v2FIQxmPJju9MAXQ2AIPA2NTXaDXHk\nYDlCrh7jxSgVWfrijhMFO/BmHDlumBpOPO1S4XG4qA==\n-----END CERTIFICATE-----",
            start_date: "2021-07-15T04:00:00.000Z",
            subjectId: "7bfc3b07-a97d-4e11-8ac6-b970c1745476"
        }})),
        sendQuestionnaire: jest.fn(() => Promise.resolve({ data: "sent-out-questionnaire" })),
        getBaseQuestionnaire: jest.fn(() => Promise.resolve({ data: {
            "resourceType": "Questionnaire",
            "identifier": [
                {
                    "use": "official",
                    "system": "urn:UMOID:",
                    "value": "Pflegeanamnese"
                }
            ],
            "version": "0.0",
            "title": "final",
            "status": "draft",
            "item": [
                {
                    "linkId": "1",
                    "text": "Dummy Item",
                    "type": "display",
                    "required": true
                }
            ]
        }})),
    }
})
