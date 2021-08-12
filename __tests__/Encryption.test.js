// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import * as forge from 'node-forge'
import { expect } from '@jest/globals'
import config from '../src/config/configProvider'

import encryption from '../src/services/encryption/encryption'

/***********************************************************************************************
tests
***********************************************************************************************/

describe('ENCRYPTION:', () => {

    // retrieves the test-pem-string from the appConfig
    let pemString = config.appConfig.defaultRecipientCertificatePemString

    // tests if the string is set in the appConfig (as we need that one)
    test ('Test PEM-String is available through configProvider', () => {

        expect(pemString.length).toBeGreaterThan(3)
    })

    // tests if that string holds a valid certificate
    test ('PEM-String is valid and contains valid certificate', () => {

        let cert = forge.pki.certificateFromPem(pemString)
        
        expect(cert.signatureOid).toBe('1.2.840.113549.1.1.11')
    })

    // test the encryptions modules
    test ('EncryptionModule produces a valid encrypted string', () => {

        // encrypts a message
        let encryptedMessage = encryption.encrypt('test message')
    
        //crates an ASN1 message from the encrypted message
        encryptedMessage = forge.util.decode64(encryptedMessage)
    
        // generates a forge object from the message
        let msg = forge.pkcs7.messageFromAsn1(forge.asn1.fromDer(encryptedMessage))
    
        // tests the message
        expect(msg.type).toBe('1.2.840.113549.1.7.3')
        expect(msg.encryptedContent.algorithm).toBe('2.16.840.1.101.3.4.1.42')
    })
})
