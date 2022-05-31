// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { navigationPropType } from '~propTypes';

// custom components
import { Spinner, Banner, ScrollIndicatorWrapper } from '~components/shared';

// services & config
import { appConfig, theme } from '~config';
import translate from '~services/localization';

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
  const { loading } = useSelector((state) => state.Globals);
  const { subjectId } = useSelector((state) => state.User);

  // when component loads handle log in
  useEffect(() => {
    // navigate to  'checkInScreen' if login was successful
    if (subjectId) {
      navigation.navigate(Stacks.SIGNED_IN, { screen: Routes.CHECK_IN });
    }
  }, [dispatch, subjectId, navigation]);

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
    backgroundColor: theme.values.defaultBackgroundColor,
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
    marginVertical: appConfig.scaleUiFkt(20),
    marginHorizontal: appConfig.scaleUiFkt(40),
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
    paddingVertical: appConfig.scaleUiFkt(15),
    paddingHorizontal: appConfig.scaleUiFkt(15),
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
