// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { PureComponent } from 'react';
import { Text } from 'react-native-elements';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { appConfig, theme, strings } from '../../config';
import Banner from '../../components/banner/banner';
import Spinner from '../../components/spinner/spinner';
import ScrollIndicatorWrapper from '../../components/scrollIndicatorWrapper/scrollIndicatorWrapper';

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
    const { loading, navigation, loginError, autoLoginLastUser } = this.props;
    return (
      <View style={localStyle.wrapper}>
        {/* loading spinner */}
        <Spinner visible={loading} testID="landingSpinner" />

        {/* banner */}
        <Banner
          nav={navigation}
          title={strings.login.landing.title}
          subTitle={strings.login.landing.subTitle}
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
                      {strings.login.landing.autoLoginErrorTitle}
                    </Text>
                    <Text style={localStyle.infoText}>
                      {strings.login.landing.autoLoginError}
                    </Text>
                  </View>
                  <View style={localStyle.bottom}>
                    <TouchableOpacity
                      style={localStyle.button}
                      onPress={() => autoLoginLastUser()}
                      accessibilityLabel={strings.login.landing.retry}
                      accessibilityRole={strings.accessibility.types.Button}
                      accessibilityHint={strings.accessibility.retryHint}
                    >
                      <Text style={localStyle.buttonLabel}>
                        {strings.login.landing.retry}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={localStyle.wrapper}>
                  {/* top elements title & text */}
                  <View style={localStyle.top}>
                    <Text style={localStyle.titleText}>
                      {strings.login.landing.welcomeTitle}
                    </Text>
                    <Text style={localStyle.infoText}>
                      {strings.login.landing.text}
                    </Text>
                  </View>

                  {/* bottom login button */}
                  <View style={localStyle.bottom}>
                    <TouchableOpacity
                      style={localStyle.button}
                      onPress={() => {
                        navigation.navigate('Login');
                      }}
                      accessibilityLabel={strings.login.landing.buttonText}
                      accessibilityRole={strings.accessibility.types.button}
                      accessibilityHint={strings.accessibility.loginHint}
                    >
                      <Text style={localStyle.buttonLabel}>
                        {strings.login.landing.buttonText}
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
    backgroundColor: theme.values.BackgroundColor,
  },

  flexi: {
    flex: 1,
  },

  top: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: appConfig.scaleUiFkt(35),
    marginBottom: appConfig.scaleUiFkt(35),
  },

  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
    height: '100%',
    marginTop: 20,
  },

  infoText: {
    marginTop: appConfig.scaleUiFkt(20),
    marginBottom: appConfig.scaleUiFkt(20),
    marginLeft: appConfig.scaleUiFkt(40),
    marginRight: appConfig.scaleUiFkt(40),
    textAlign: 'center',
    alignSelf: 'center',
    color: theme.colors.accent4,
    ...theme.fonts.body,
  },

  titleText: {
    width: '80%',
    textAlign: 'center',
    alignSelf: 'center',
    ...theme.fonts.header2,
  },

  button: {
    ...theme.classes.buttonPrimary,
    bottom: 0,
    paddingTop: appConfig.scaleUiFkt(15),
    paddingBottom: appConfig.scaleUiFkt(15),
    paddingLeft: appConfig.scaleUiFkt(15),
    paddingRight: appConfig.scaleUiFkt(15),
    width: '80%',
  },

  buttonLabel: {
    ...theme.classes.buttonLabel,
  },
});

/***********************************************************************************************
export
***********************************************************************************************/

export default LandingScreen;
