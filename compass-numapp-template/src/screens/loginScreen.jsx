// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { navigationPropType } from '~propTypes';

// components
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import { scanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
import { runOnJS } from 'react-native-reanimated';

// custom components
import { Banner } from '~components/shared';
import { Stacks, Routes } from '~navigation/constants';

// redux actions
import { sendCredentials } from '~store/user.slice';
import { reset } from '~store/sharedActions';

// services & config
import { appConfig, theme } from '~config';
import translate from '~services/localization';
import { useIsFocused } from '@react-navigation/native';

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
  const isFocused = useIsFocused();

  const { subjectId } = useSelector((state) => state.User);
  const { error } = useSelector((state) => state.Globals);
  const [hasPermission, setHasPermission] = useState(false);

  const [qrCodes, setQrCodes] = useState([]);

  const device = useCameraDevices().back;

  // set up detection of QR codes
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';

    const detectedQrCodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE]);
    runOnJS(setQrCodes)(detectedQrCodes);
  }, []);

  // request permission to use camera
  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  // trigger login when barcode was detected
  useEffect(() => {
    if (qrCodes.length) {
      // parses the input string to determine the subjectId (from the qr-code)
      const scannedSubjectId = checkQrCodeForUsername(qrCodes[0].content.data);

      // triggers the login
      dispatch(sendCredentials(scannedSubjectId));
    }
  }, [qrCodes, dispatch]);

  useEffect(() => {
    if (subjectId) {
      return navigation.navigate(Stacks.SIGNED_IN, { screen: Routes.CHECK_IN });
    }
    // triggers the auto-login when on the login-screen (only on DEV)
    if (appConfig.automateQrLogin) {
      // parses the input string to determine the subjectId (from the qr-code)
      const scannedId = checkQrCodeForUsername(
        appConfig.automateQrLoginSubjectId || '',
      );
      // triggers the login
      dispatch(sendCredentials(scannedId));
    }
  }, [dispatch, subjectId, navigation]);

  // rendering
  /*-----------------------------------------------------------------------------------*/
  return (
    <View testID="LoginScreen" style={localStyle.wrapper}>
      {/* banner */}
      <Banner
        nav={navigation}
        title={translate('login').title}
        subTitle={translate('login').subTitle}
        noMenu
      />

      <View style={localStyle.content} testID="scannerWrapper">
        {/* the qr-code-scanner */}
        {!!device && hasPermission && !error && (
          <Camera
            device={device}
            isActive={isFocused}
            frameProcessor={frameProcessor}
            frameProcessorFps={1}
            style={localStyle.camera}
            photo={true}
            video={false}
          />
        )}
        {/* show button to reactivate camera */}
        {error && (
          <View style={localStyle.camera}>
            <TouchableOpacity
              style={localStyle.button}
              onPress={() => dispatch(reset())}
            >
              <Text style={localStyle.buttonLabel}>
                {translate('login').landing.retry}
              </Text>
            </TouchableOpacity>
          </View>
        )}

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

// get width of screen to calculate camera view
const { width } = Dimensions.get('window');

const localStyle = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.values.defaultBackgroundColor,
    flex: 1,
  },

  content: {
    flex: 1,
    alignItems: 'center',
  },

  camera: {
    marginTop: appConfig.scaleUiFkt(20),
    maxHeight: 0.95 * width,
    width: '95%',
    aspectRatio: 1.0,
    justifyContent: 'center',
  },

  infoText: {
    flexBasis: 33,
    flexGrow: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: theme.colors.accent4,
    ...theme.fonts.subHeader1,
  },

  button: {
    ...theme.classes.buttonAlert,
    bottom: 0,
    padding: appConfig.scaleUiFkt(15),
    width: '80%',
  },

  buttonLabel: {
    ...theme.classes.buttonLabel,
  },
});

/***********************************************************************************************
export
***********************************************************************************************/

LoginScreen.screenName = 'Login';

export default LoginScreen;
