// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { useEffect } from 'react';
import { Alert, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import RNRestart from 'react-native-restart';

import {
  Spinner,
  Banner,
  ScrollIndicatorWrapper,
} from '../../components/shared';

import config from '../../config/configProvider';
import localStorage from '../../services/localStorage';
import translate from '../../services/localization';

import { logout, sendCredentials } from './loginActions';

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
component:
container for the login screen
***********************************************************************************************/
/**
 *
 * @param  {object}    props
 * @param  {object}    props.navigation the navigation object provided by 'react-navigation'
 */
function LoginScreen({ navigation }) {
  // events
  /*-----------------------------------------------------------------------------------*/

  // get date from state
  const { loading, loggedIn, loginError } = useSelector((state) => state.Login);
  const dispatch = useDispatch();

  /**
   * tries to log in the last persisted user, is triggered by componentDidMount()
   */
  const autoLoginLastUser = async () => {
    // gets the last user from the AsyncStore
    const lastSubjectId = await localStorage.loadLastSubjectId();
    // logs the user in
    if (lastSubjectId) {
      dispatch(sendCredentials(lastSubjectId));
    }
  };

  // when component loads handle log in
  useEffect(() => {
    // navigate to checkin if login was successful
    if (loggedIn) {
      navigation.navigate('SignedIn', { screen: 'CheckIn' });
    }

    // triggers the auto-login when on the login-screen (only on DEV)
    else if (config.appConfig.automateQrLogin) {
      // parses the input string to determine the subjectId (from the qr-code)
      const scannedId = checkQrCodeForUsername(
        config.appConfig.automateQrLoginSubjectId || '',
      );
      // triggers the login
      dispatch(sendCredentials(scannedId));
    } else {
      (async () => {
        try {
          const lastSubjectId = await localStorage.loadLastSubjectId();
          if (lastSubjectId) {
            dispatch(sendCredentials(lastSubjectId));
          }
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, [dispatch, loggedIn, navigation]);

  /**
   * deletes all local data
   */
  const deleteLocalData = () => {
    Alert.alert(
      translate('generic').warning,
      translate('generic').eraseAllWarning,
      [
        {
          text: translate('generic').delete,
          onPress: () => {
            dispatch(logout());
            dispatch(deleteLocalData());
            RNRestart.Restart();
          },
        },
        {
          text: translate('generic').abort,
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };

  // rendering
  /*-----------------------------------------------------------------------------------*/

  // checks the currently selected route
  return (
    <View style={localStyle.wrapper}>
      {/* loading spinner */}
      <Spinner visible={loading} testID="landingSpinner" />

      {/* banner */}
      <Banner
        nav={navigation}
        title={translate('login').landing.title}
        subTitle={translate('login').landing.subTitle}
        noWayBack
        noMenu
      />

      {/* scrollIndicator */}
      <View style={{ ...localStyle.flexi, ...localStyle.wrapper }}>
        <ScrollIndicatorWrapper
          contentData={
            loginError ? (
              <View style={localStyle.wrapper}>
                <View style={localStyle.top}>
                  <Text style={localStyle.titleText}>
                    {translate('login').landing.autoLoginErrorTitle}
                  </Text>
                  <Text style={localStyle.infoText}>
                    {translate('login').landing.autoLoginError}
                  </Text>
                </View>
                <View style={localStyle.bottom}>
                  <TouchableOpacity
                    style={localStyle.button}
                    onPress={() => autoLoginLastUser()}
                    accessibilityLabel={translate('login').landing.retry}
                    accessibilityRole={translate('accessibility').types.Button}
                    accessibilityHint={translate('accessibility').retryHint}
                  >
                    <Text style={localStyle.buttonLabel}>
                      {translate('login').landing.retry}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      ...localStyle.button,
                      ...localStyle.buttonAlert,
                    }}
                    onPress={() => deleteLocalData()}
                    accessibilityLabel={translate('login').landing.deleteAll}
                    accessibilityRole={translate('accessibility').types.Button}
                    accessibilityHint={translate('accessibility').retryHint}
                  >
                    <Text style={localStyle.buttonLabel}>
                      {translate('login').landing.deleteAll}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={localStyle.wrapper}>
                {/* top elements title & text */}
                <View style={localStyle.top}>
                  <Text style={localStyle.titleText}>
                    {translate('login').landing.welcomeTitle}
                  </Text>
                  <Text style={localStyle.infoText}>
                    {translate('login').landing.text}
                  </Text>
                </View>

                {/* bottom login button */}
                <View style={localStyle.bottom}>
                  <TouchableOpacity
                    style={localStyle.button}
                    onPress={() => {
                      navigation.navigate('Login');
                    }}
                    accessibilityLabel={translate('login').landing.buttonText}
                    accessibilityRole={translate('accessibility').types.button}
                    accessibilityHint={translate('accessibility').loginHint}
                  >
                    <Text style={localStyle.buttonLabel}>
                      {translate('login').landing.buttonText}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          }
        />
      </View>
    </View>
  );
}

/***********************************************************************************************
localStyle
***********************************************************************************************/

const localStyle = StyleSheet.create({
  wrapper: {
    height: '100%',
    flexDirection: 'column',
    backgroundColor: config.theme.values.defaultBackgroundColor,
  },

  flexi: {
    flex: 1,
  },

  top: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: config.appConfig.scaleUiFkt(35),
    marginBottom: config.appConfig.scaleUiFkt(35),
  },

  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
    height: '100%',
    marginTop: 20,
  },

  infoText: {
    marginTop: config.appConfig.scaleUiFkt(20),
    marginBottom: config.appConfig.scaleUiFkt(20),
    marginLeft: config.appConfig.scaleUiFkt(40),
    marginRight: config.appConfig.scaleUiFkt(40),
    textAlign: 'center',
    alignSelf: 'center',
    color: config.theme.colors.accent4,
    ...config.theme.fonts.body,
  },

  titleText: {
    width: '80%',
    textAlign: 'center',
    alignSelf: 'center',
    ...config.theme.fonts.header2,
  },

  button: {
    ...config.theme.classes.buttonPrimary,
    bottom: 0,
    paddingTop: config.appConfig.scaleUiFkt(15),
    paddingBottom: config.appConfig.scaleUiFkt(15),
    paddingLeft: config.appConfig.scaleUiFkt(15),
    paddingRight: config.appConfig.scaleUiFkt(15),
    width: '80%',
  },

  buttonAlert: {
    ...config.theme.classes.buttonAlert,
    bottom: 0,
    marginTop: 20,
    width: '80%',
  },

  buttonLabel: {
    ...config.theme.classes.buttonLabel,
  },
});

/***********************************************************************************************
export
***********************************************************************************************/

export default LoginScreen;
