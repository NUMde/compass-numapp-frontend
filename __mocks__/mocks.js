
import mockReactNativePermissions from 'react-native-permissions/mock'
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock'

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
