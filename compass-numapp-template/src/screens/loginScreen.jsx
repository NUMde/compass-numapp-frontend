// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { createRef, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { navigationPropType } from '~propTypes';

// components
import QRCodeScanner from 'react-native-qrcode-scanner';

// custom components
import { Banner } from '~components/shared';
import { Stacks, Routes } from '~navigation/constants';

// redux actions
import { sendCredentials } from '~store/user.slice';

// services & config
import { appConfig, theme } from '~config';
import translate from '~services/localization';

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
      qrCode[appConfig.qrCodeAttributeHoldingTheAppIdentifier] ===
      appConfig.appIdentifier
    ) {
      subjectId = qrCode[appConfig.qrCodeAttributeHoldingTheSubjectId];
    }
  } catch (e) {
    return '';
  }
  // returns the id or an empty string if no id could be found
  return subjectId || '';
};

/***********************************************************************************************
 * component:
 * renders the login-screen with the qr code scanner
 *
 * @param  {object}    props
 * @param  {object}    props.navigation the navigation object provided by 'react-navigation'
 ***********************************************************************************************/
function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const { subjectId } = useSelector((state) => state.User);
  /**
   * reference to access the camera
   * @type {object}
   */
  let camera = createRef();

  useEffect(() => {
    if (subjectId) {
      return navigation.navigate(Stacks.SIGNED_IN, { screen: Routes.CHECK_IN });
    }
    // triggers the auto-login when on the login-screen (only on DEV)
    if (appConfig.automateQrLogin) {
      // parses the input string to determine the subjectId (from the qr-code)
      const scannedId = checkQrCodeForUsername(
        appConfig.automateQrLoginSubjectId,
      );
      // triggers the login
      dispatch(sendCredentials(scannedId));
    }
  }, [dispatch, subjectId, navigation]);

  /**
   * is triggered when the qr-scann is getting something.
   * basically checks if it is a qr-code, then tries to parse it and uses the result
   * for a login-attempt
   * @param  {{data: string}} scanResult scan result from the qr-code scanner
   * @param  {any} camera camera reference
   */
  const scanSuccess = (scanResult) => {
    // parses the input string to determine the subjectId (from the qr-code)
    const scannedSubjectId = checkQrCodeForUsername(scanResult.data);

    // triggers the login
    dispatch(sendCredentials(scannedSubjectId, camera));
  };

  // rendering
  /*-----------------------------------------------------------------------------------*/

  return (
    <View style={localStyle.wrapper} testID="LoginScreen">
      {/* banner */}
      <Banner
        nav={navigation}
        title={translate('login').title}
        subTitle={translate('login').subTitle}
        noMenu
      />

      {/* scrollIndicator with qrcode scanner */}
      <View
        style={[localStyle.flexi, localStyle.wrapper]}
        testID="scannerWrapper"
      >
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
          onRead={scanSuccess}
          permissionDialogMessage={translate('login').permissionDialog}
          reactivate
          reactivateTimeout={3000}
        />

        {/* information text */}
        <Text style={localStyle.infoText}>{translate('login').qrInfo}</Text>
      </View>
    </View>
  );
}

LoginScreen.propTypes = {
  navigation: PropTypes.shape(navigationPropType).isRequired,
};

/***********************************************************************************************
localStyle
***********************************************************************************************/

// scaleUiFkt() (located in src/config/appConfig.js)
// will dynamically alter some sized based on the physical device-measurements.

const { width } = Dimensions.get('window');

const localStyle = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: theme.values.defaultBackgroundColor,
  },

  flexi: {
    flex: 1,
    alignItems: 'center',
  },

  loginErrorText: {
    color: theme.colors.alert,
  },

  qrScannerContainer: {
    flexBasis: 66,
    flexGrow: 1,
    maxHeight: width,
    aspectRatio: 1,
  },

  qrScanner: {
    maxWidth: '100%',
    maxHeight: '100%',
    overflow: 'hidden',
  },

  qrScannerMarker: {
    borderColor: theme.colors.primary,
  },

  infoText: {
    flexBasis: 33,
    flexGrow: 1 / 4,
    textAlignVertical: 'center',
    textAlign: 'center',
    color: theme.colors.accent4,
    ...theme.fonts.subHeader1,
  },
});

/***********************************************************************************************
export
***********************************************************************************************/

LoginScreen.screenName = 'Login';

export default LoginScreen;
