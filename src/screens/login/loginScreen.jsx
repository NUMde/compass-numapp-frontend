// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { createRef } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';

import config from '../../config/configProvider';
import { Banner, ScrollIndicatorWrapper } from '../../components/shared';
import translate from '../../services/localization';

import { sendCredentials, updateSubjectId } from './loginActions';

/**
 * tries to parse the input-string and returns the subjectId (from the qr-code)
 * @param  {string} str string to be checked
 * @returns {string}
 */
const checkQrCodeForUsername = (str) => {
  let subjectId;
  try {
    const qrCode = JSON.parse(str);
    if (
      qrCode[config.appConfig.qrCodeAttributeHoldingTheAppIdentifier] ===
      config.appConfig.appIdentifier
    ) {
      subjectId = qrCode[config.appConfig.qrCodeAttributeHoldingTheSubjectId];
    }
  } catch (e) {
    return '';
  }
  // returns the id or an e
  return subjectId || '';
};

/***********************************************************************************************
 * renders the login-screen
 * @param  {object}    props
 * @param  {object}    props.navigation the navigation object provided by 'react-navigation'
 *
 ***********************************************************************************************/
function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  /**
   * reference to access the camera
   * @type {object}
   */
  let camera = createRef();

  // get data from state
  const { loginUnauthorized, loginError } = useSelector((state) => state.Login);

  /**
   * is triggered when the qr-scann is getting something.
   * basically checks if it is a qr-code, then tries to parse it and uses the result
   * for a login-attempt
   * @param  {{data: string}} scanResult scan result from the qr-code scanner
   * @param  {any} camera camera reference
   */
  const scanSuccess = (scanResult) => {
    // parses the input string to determine the subjectId (from the qr-code)
    const subjectId = checkQrCodeForUsername(scanResult.data);

    // sets the subjectId defined in appConfig.js
    dispatch(updateSubjectId(subjectId));
    // triggers the login
    setTimeout(() => dispatch(sendCredentials(subjectId, camera), 500));
  };

  // rendering
  /*-----------------------------------------------------------------------------------*/

  return (
    <View style={localStyle.wrapper}>
      {/* banner */}
      <Banner
        nav={navigation}
        title={translate('login').title}
        subTitle={translate('login').subTitle}
        noMenu
      />

      {/* scrollIndicator with qrcode scanner */}
      <View style={{ ...localStyle.flexi, ...localStyle.wrapper }}>
        <ScrollIndicatorWrapper
          contentData={
            <View style={localStyle.wrapper}>
              <View style={{ ...localStyle.flexi, ...localStyle.wrapper }}>
                <View>
                  {/* the qr-code-scanner */}
                  <QRCodeScanner
                    fadeIn={false}
                    showMarker
                    cameraStyle={localStyle.qrScanner}
                    markerStyle={localStyle.qrScannerMarker}
                    ref={(node) => {
                      camera = node;
                    }}
                    containerStyle={localStyle.qrScannerContainer}
                    onRead={(scanResult) => scanSuccess(scanResult)}
                    permissionDialogMessage={
                      translate('login').permissionDialog
                    }
                  />
                </View>

                {/* information text */}
                <Text style={localStyle.infoText}>
                  {translate('login').qrInfo}
                </Text>

                {/* login error text */}
                {loginError && (
                  <View>
                    {/* displays an error message in case of 401 */}
                    {loginUnauthorized && (
                      <Text
                        style={{
                          ...localStyle.infoText,
                          ...localStyle.loginErrorText,
                        }}
                      >
                        {translate('login').errorUserUnauthorized}
                      </Text>
                    )}

                    {/* if anything other than a 401: outputs the returned error message (or a generic error message instead) followed by another instructional string*/}
                    {!loginUnauthorized && (
                      <View>
                        <Text
                          style={{
                            ...localStyle.infoText,
                            ...localStyle.loginErrorText,
                          }}
                        >
                          {loginError?.message ??
                            translate('login').errorUserGeneric}
                          {'\n'}
                          {translate('login').nextStepAfterError}
                        </Text>
                      </View>
                    )}
                  </View>
                )}
              </View>
            </View>
          }
        />
      </View>
    </View>
  );
}

/***********************************************************************************************
localStyle
***********************************************************************************************/

// scaleUiFkt() (located in src/config/appConfig.js)
// will dynamically alter some sized based on the physical device-measurements.

const { width } = Dimensions.get('window');

const localStyle = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: config.theme.values.defaultBackgroundColor,
  },

  flexi: {
    flex: 1,
  },

  infoText: {
    marginBottom: 0,
    textAlign: 'center',
    alignSelf: 'center',
    color: config.theme.colors.accent4,
    marginTop: config.appConfig.scaleUiFkt(30),
    marginLeft: config.appConfig.scaleUiFkt(70),
    marginRight: config.appConfig.scaleUiFkt(70),
    ...config.theme.fonts.subHeader1,
  },

  loginErrorText: {
    color: config.theme.colors.alert,
  },

  qrScannerContainer: {
    marginTop: 0,
    width: '100%',
    height: width,
  },

  qrScanner: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },

  qrScannerMarker: {
    borderColor: config.theme.colors.primary,
  },
});

/***********************************************************************************************
export
***********************************************************************************************/

export default LoginScreen;
