

import * as forge from 'node-forge'
import { expect } from '@jest/globals'
import config from '../src/config/configProvider'
import '@testing-library/jest-native/extend-expect'

import encryption from '../src/services/encryption/encryption'

describe('ENCRYPTION:', () => {

    let pemString = config.appConfig.defaultRecipientCertificatePemString

    test ('Test PEM-String is available through configProvider', () => {

        expect(pemString.length).toBeGreaterThan(3)
    })

    test ('PEM-String is valid and contains valid certificate', () => {

        let cert = forge.pki.certificateFromPem(pemString)
        
        expect(cert.signatureOid).toBe('1.2.840.113549.1.1.11')
    })

    test ('EncryptionModule produces a valid encrypted string', () => {

        let encryptedMessage = encryption.encrypt('test message')
    
        encryptedMessage = forge.util.decode64(encryptedMessage)
    
        let msg = forge.pkcs7.messageFromAsn1(forge.asn1.fromDer(encryptedMessage))
    
        expect(msg.type).toBe('1.2.840.113549.1.7.3')
        expect(msg.encryptedContent.algorithm).toBe('2.16.840.1.101.3.4.1.42')
    })
})