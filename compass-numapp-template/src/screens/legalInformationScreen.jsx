// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { navigationPropType } from '~propTypes';

// custom components
import { Banner, ScrollIndicatorWrapper } from '~components/shared';

// services & config
import translate from '~services/localization';
import { appConfig, theme } from '~config';

/***********************************************************************************************
 * component:
 * renders the legal information screen which contains legal information about the study
 *
 * @param {object} props
 * @param {object} props.navigation the navigation object provided by 'react-navigation'
 ***********************************************************************************************/
function LegalInformationScreen({ navigation }) {
  return (
    <View>
      <View style={localStyle.wrapper}>
        {/* banner */}
        <Banner
          nav={navigation}
          title={translate('legalInformation').title}
          subTitle={translate('legalInformation').subTitle}
        />
        {/* content */}
        <View style={{ ...localStyle.flexi, ...localStyle.wrapper }}>
          <ScrollIndicatorWrapper>
            <View style={{ ...localStyle.wrapper, ...localStyle.top }}>
              {/* top elements title & text */}
              <Text style={localStyle.titleText}>
                {translate('legalInformation').headline}
              </Text>
              <Text style={localStyle.infoText}>
                {translate('legalInformation').content}
              </Text>
            </View>
          </ScrollIndicatorWrapper>
        </View>
      </View>
    </View>
  );
}

LegalInformationScreen.propTypes = {
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

  title: {
    ...theme.fonts.title,
    textAlign: 'center',
    alignSelf: 'center',
    color: theme.values.defaultTitleTextColor,
  },

  top: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: appConfig.scaleUiFkt(15),
    marginBottom: appConfig.scaleUiFkt(35),
  },

  infoText: {
    marginTop: appConfig.scaleUiFkt(20),
    marginBottom: appConfig.scaleUiFkt(20),
    marginLeft: appConfig.scaleUiFkt(40),
    marginRight: appConfig.scaleUiFkt(40),
    textAlign: 'justify',
    alignSelf: 'auto',
    color: theme.colors.accent4,
    ...theme.fonts.body,
  },

  titleText: {
    width: '80%',
    textAlign: 'center',
    alignSelf: 'center',
    ...theme.fonts.header2,
  },
});

/***********************************************************************************************
export
***********************************************************************************************/

export default LegalInformationScreen;
