// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { useEffect } from 'react';
import { Alert, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { navigationPropType } from '~propTypes';

// custom components
import { Spinner, Banner, ScrollIndicatorWrapper } from '~components/shared';

// services & config
import config from '~config/configProvider';
import translate from '~services/localization';

// redux actions

import { reset } from '~store/sharedActions';

import { Routes, Stacks } from '~navigation/constants';

/***********************************************************************************************
 * component:
 * renders the landing screen with the welcome message an a button
 * which redirects to the login screen
 *
 * @param  {object}    props
 * @param  {object}    props.navigation the navigation object provided by 'react-navigation'
 **********************************************************************************************/
function LandingScreen({ navigation }) {
  const dispatch = useDispatch();

  // get date from state
  const { loading, error } = useSelector((state) => state.Globals);
  const { subjectId } = useSelector((state) => state.User);

  // when component loads handle log in
  useEffect(() => {
    // navigate to  'checkInScreen' if login was successful
    if (subjectId) {
      navigation.navigate(Stacks.SIGNED_IN, { screen: Routes.CHECK_IN });
    }
  }, [dispatch, subjectId, navigation]);

  /**
   * deletes all local data after user confirmation
   */
  const deleteHandler = () => {
    Alert.alert(
      translate('generic').warning,
      translate('generic').eraseAllWarning,
      [
        {
          text: translate('generic').delete,
          onPress: () => {
            dispatch(reset());
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
  return loading ? (
    <Spinner />
  ) : (
    <View style={localStyle.wrapper}>
      {/* loading spinner */}

      {/* banner */}
      <Banner
        nav={navigation}
        title={translate('login').landing.title}
        subTitle={translate('login').landing.subTitle}
        noWayBack
        noMenu
      />

      {/* scrollIndicator */}
      <View style={[localStyle.flexi, localStyle.wrapper]}>
        <ScrollIndicatorWrapper>
          {error ? (
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
                  onPress={() => navigation.navigate(Routes.LOGIN)}
                  accessibilityLabel={translate('login').landing.retry}
                  accessibilityRole={translate('accessibility').types.Button}
                  accessibilityHint={translate('accessibility').retryHint}
                >
                  <Text style={localStyle.buttonLabel}>
                    {translate('login').landing.retry}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[localStyle.button, localStyle.buttonAlert]}
                  onPress={() => deleteHandler()}
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
                  onPress={() => navigation.navigate(Routes.LOGIN)}
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
          )}
        </ScrollIndicatorWrapper>
      </View>
    </View>
  );
}

LandingScreen.propTypes = {
  navigation: PropTypes.shape(navigationPropType).isRequired,
};

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

export default LandingScreen;
