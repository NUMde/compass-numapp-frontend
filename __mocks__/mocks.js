
// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import mockReactNativePermissions from 'react-native-permissions/mock'
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock'
import store from '../src/store.js';
import MockAsyncStorage from 'mock-async-storage';
import s from '../__utils__/mockStore'
import { buildStore } from '../__utils__/mockStore'
import _store from '../__utils__/mockStore'

/***********************************************************************************************
mock values
***********************************************************************************************/

// let mockState = {
//     Login: {},
//     CheckIn: {},
//     About: {
//         currentWebView: {}
//     }
// }

mockState = buildStore().getState()


/***********************************************************************************************
preparation
***********************************************************************************************/
console.log(_store)
// store.getState is going to be mocked
store.getState = () => _store.getState()

// mocks the async storage
const mockImpl = new MockAsyncStorage()


jest.mock('../src/store.js')
jest.mock('@react-native-community/async-storage', () => mockAsyncStorage)
jest.mock('react-native-permissions', () => mockReactNativePermissions)
jest.mock('@react-native-community/datetimepicker', () => jest.fn())
jest.mock('@react-native-picker/picker', () => jest.fn())
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')

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

jest.mock('react-native-splash-screen', () => {
    return {
        hide: jest.fn(),
        show: jest.fn()
    }
})

jest.mock('axios', () => {
    return {
        get: jest.fn(() => Promise.resolve({ data: "mocked" })),
        post: jest.fn(() => Promise.resolve({ data: "mocked" }))
    }
})

jest.mock('@react-native-community/async-storage', () => mockImpl)