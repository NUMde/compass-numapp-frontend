// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { PureComponent } from 'react';
import { Text } from 'react-native-elements';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import config from '../../config/configProvider';
import {
  Banner,
  Spinner,
  ScrollIndicatorWrapper,
} from '../../components/shared';
import translate from '../../services/localization';

let localStyle;

/***********************************************************************************************
component:
renders the landing-screen
***********************************************************************************************/

class LandingScreen extends PureComponent {
  /**
   * @constructor
   * @param  {object}    props
   * @param  {object}    props.navigation the navigation object provided by 'react-navigation'
   */

  render() {
    const {
      loading,
      navigation,
      loginError,
      autoLoginLastUser,
      deleteLocalData,
    } = this.props;
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
                      accessibilityRole={
                        translate('accessibility').types.Button
                      }
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
                      accessibilityRole={
                        translate('accessibility').types.Button
                      }
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
                      accessibilityRole={
                        translate('accessibility').types.button
                      }
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
}

/***********************************************************************************************
localStyle
***********************************************************************************************/

localStyle = StyleSheet.create({
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

export default LandingScreen;
