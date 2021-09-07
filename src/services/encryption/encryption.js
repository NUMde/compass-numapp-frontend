// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

// this file provides functionality

/***********************************************************************************************
imports
***********************************************************************************************/

import * as forge from "node-forge";
import store from "../../store";
import config from "../../config/configProvider";

/***********************************************************************************************
encryption
***********************************************************************************************/

/**
 * takes a string and returns it encrypted
 * @param {any} messageToBeEncrypted message to be encrypted
 */
const encrypt = (messageToBeEncrypted) => {
  // TODO: remove workaround
  let pemString =
    store?.getState().Login?.session?.recipientCertificatePemString;
  pemString =
    pemString === "false" || !pemString
      ? config.appConfig.defaultRecipientCertificatePemString
      : pemString;

  // retrieves the necessary certificate
  const cert = forge.pki.certificateFromPem(pemString);

  // creates enveloped data and provides the certificate
  const p7 = forge.pkcs7.createEnvelopedData();

  // putting content into the buffer of the enveloped data
  p7.content = forge.util.createBuffer();
  p7.content.putString(JSON.stringify(messageToBeEncrypted));

  // adds the recipient certificate
  p7.addRecipient(cert);

  // encrypts the message
  p7.encrypt();

  // creates the DER-encodes output
  const result = forge.asn1.toDer(p7.toAsn1());

  // converts the DER output into Base64 and returns it

  return btoa(
    forge.util
      .bytesToHex(result.data)
      .match(/\w{2}/g)
      .map((a) => String.fromCharCode(parseInt(a, 16)))
      .join("")
  );
};

/***********************************************************************************************
export
***********************************************************************************************/

export default { encrypt };
