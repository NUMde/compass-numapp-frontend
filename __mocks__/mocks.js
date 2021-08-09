
// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import mockReactNativePermissions from 'react-native-permissions/mock'
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
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')

// mocks the async storage
/*-----------------------------------------------------------------------------------*/
jest.mock('@react-native-community/async-storage', () => mockAsyncStorage)

// react native permissions
/*-----------------------------------------------------------------------------------*/
jest.mock('react-native-permissions', () => mockReactNativePermissions)

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
jest.mock('../src/services/rest/loggedInClient', () => {
    return {
        sendQuestionnaire: jest.fn(() => Promise.resolve({ data: "sent-out-questionnaire" })),
        getBaseQuestionnaire: jest.fn(() => Promise.resolve({ data: {
            "resourceType": "Questionnaire",
            "url": "http://hl7.org/fhir/Questionnaire/Pflegeanamnese",
            "identifier": [
                {
                    "use": "official",
                    "system": "urn:UMOID:",
                    "value": "Pflegeanamnese"
                }
            ],
            "version": "1.2",
            "title": "final",
            "status": "draft",
            "subjectType": [
                "Patient"
            ],
            "date": "2020-03-17",
            "publisher": "IBM",
            "purpose": "Abbildung der Fragen des Pflegeanamnesebogens des UMs",
            "item": [
                {
                    "linkId": "1",
                    "text": "Die Studie wurde beendet.",
                    "type": "display",
                    "required": true,
                    "item": [
                        {
                            "linkId": "1.1",
                            "text": "Vielen Dank für Ihre Teilnahme.",
                            "type": "display",
                            "required": true
                        }
                    ]
                }
            ]
        } })),
    }
})