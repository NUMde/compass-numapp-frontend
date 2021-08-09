
import React from 'react'
import '@testing-library/jest-native/extend-expect'
import { renderWithRedux } from '../__utils__/render'
import createAppNavigator from '../src/navigation/appNavigator'
import {CheckInContainer} from '../src/screens/checkIn/checkInContainer'
import * as actions from '../src/screens/checkIn/checkInActions'

import Banner from '../src/components/banner/banner'
import CheckInScreen from '../src/screens/checkIn/checkInScreen'

describe('???:', () => {
    
    test ('<CheckInContainer /> can be rendered', async () => {
    
        let Navigator = createAppNavigator()

        let user = {
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
            study_id: "7bfc3b07-a97d-4e11-8ac6-b970c1745476",
            subjectId: "7bfc3b07-a97d-4e11-8ac6-b970c1745476",
        }

        let props = {
            navigation: {
                navigate: jest.fn(),
                state: {
                    routeName: 'CheckIn'
                }
            },
            user,
            actions
        }

        let initialState = {
            CheckIn: {
                ...user,
                ...props,
                loading: false,
                error401: false,
                firstTime: false,
                categories: null,
                currentPageIndex: 1,
                showDatePicker: false,
                categoriesLoaded: false,
                questionnaireItemMap: null,
                currentCategoryIndex: null,
                showQuestionnaireModal: false,
                questionnaireResponseError: null,
            },
            Login: {
                loading: false,
                loggedIn: true,
                loginError: null,
                loginUnauthorized: false,
                session: {
                    accessToken: "7bfc3b07-a97d-4e11-8ac6-b970c1745476",
                    recipientCertificatePemString: "-----BEGIN CERTIFICATE-----\nMIIEOzCCAyOgAwIBAgIUc0iY16RQuluxpRL7hsmq/FRaWt0wDQYJKoZIhvcNAQEL\nBQAwgawxCzAJBgNVBAYTAkRFMQwwCgYDVQQIDANSTFAxDjAMBgNVBAcMBU1haW56\nMREwDwYDVQQKDAhVTSBNYWluejEeMBwGA1UECwwVUHJldmVudGl2ZSBDYXJkaW9s\nb2d5MRUwEwYDVQQDDAxHQ1NTdHVkeUNlcnQxNTAzBgkqhkiG9w0BCQEWJnN2ZW4t\nb2xpdmVyLnRyb2Vic0B1bmltZWRpemluLW1haW56LmRlMB4XDTIwMDkwMTExMjk0\nNFoXDTIzMDUyOTExMjk0NFowgawxCzAJBgNVBAYTAkRFMQwwCgYDVQQIDANSTFAx\nDjAMBgNVBAcMBU1haW56MREwDwYDVQQKDAhVTSBNYWluejEeMBwGA1UECwwVUHJl\ndmVudGl2ZSBDYXJkaW9sb2d5MRUwEwYDVQQDDAxHQ1NTdHVkeUNlcnQxNTAzBgkq\nhkiG9w0BCQEWJnN2ZW4tb2xpdmVyLnRyb2Vic0B1bmltZWRpemluLW1haW56LmRl\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnmY9Ep2SIoo824dWk1y8\ngonKArnhwVyW3AAVLpz9UtmkfElLiNLUbVOv6dGyCG9W8Y0DFwUU33EmFBlsmX3R\n7LbnwLYn7R6ntSakr58P6yNjMXY2CT2GjI0m63DPbLh6S3J6cO/8HNRnL3zW4O9B\n6FtgVg7Yf2koFjXz/kUYOFeqsPoqqLk70pO1nPGTjkz2JhBJQ+SaulTo19ZQ2tkT\nVP3zTZ9Urk8i/3fCU1TKTbYL/WwQepJlN8BwxzjIDQ2wA62nXzzlHQN98MnQGgY4\nXvj679rLFLsz2vgVmLnGPFwFL5op/6gmsKz7Q+B3zGco6qGyyL9N/D4fLKOVxnMy\nIwIDAQABo1MwUTAdBgNVHQ4EFgQUyMC1pkSWjQbIFZ/o4SEV9IqHJmwwHwYDVR0j\nBBgwFoAUyMC1pkSWjQbIFZ/o4SEV9IqHJmwwDwYDVR0TAQH/BAUwAwEB/zANBgkq\nhkiG9w0BAQsFAAOCAQEAIAAhhtVpDf/767pg8xxwaETYjPRL4pKW4H5b9t2Vr41M\nAdCUou9dbtWlqeFvY/eBby9DM05lI+D8hX2wYVRr7Pc80fuw5k4f+uTry2jc0vFV\nvHhv9sHJq3+EX/P4Nckb7M5lKI+d6GDiqzU3r/ARstoRVbQHRu2f0W7SW0pVPwlQ\nSFv61NIkjQB19SAO1IAR4Z/UrZ7Y0vnKQZ2fqFUHoD5wz4jXhHFsungocg9IxJ74\nKXaMj1nTtjCGxx11jQCNLyrVjI/XgNoPQ1v2FIQxmPJju9MAXQ2AIPA2NTXaDXHk\nYDlCrh7jxSgVWfrijhMFO/BmHDlumBpOPO1S4XG4qA==\n-----END CERTIFICATE-----"
                },
                subjectId: "7bfc3b07-a97d-4e11-8ac6-b970c1745476"
            }            
        }

        // let tree = renderWithRedux(<Navigator><CheckInContainer {...props}/></Navigator>)
        // console.log(3, initialState)
        let tree = renderWithRedux(<CheckInContainer {...props} />, initialState)

        // console.log(tree.store.getState())

        let instance = tree.UNSAFE_getByType(CheckInScreen).instance

        await expect(instance.props.getQuestionnaire()).resolves.toBe('peanut butter');

        // jest.useFakeTimers();

        // jest.setTimeout(() => {
        //     console.log(tree.store.getState().CheckIn)   
        // }, 15000);

        // jest.runAllTimers();
        // console.log(tree.store.getState().CheckIn)
        // console.log(instance.props)
        // console.log(lala)


        // gloabel aufruf von store.js mocken -> damit baim test der richtige store genutzt wird
    })
})