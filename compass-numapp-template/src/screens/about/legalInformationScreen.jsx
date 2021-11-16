// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { PureComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { appConfig, theme, strings } from '../../config';
import Banner from '../../components/banner/banner';
import ScrollIndicatorWrapper from '../../components/scrollIndicatorWrapper/scrollIndicatorWrapper';

let localStyle;

/***********************************************************************************************
component:
renders the webView screen
***********************************************************************************************/

class LegalInformationScreen extends PureComponent {
  /**
   * @constructor
   * @param  {object}    props
   * @param  {object}    props.navigation the navigation object provided by 'react-navigation'
   */

  // rendering
  /*-----------------------------------------------------------------------------------*/

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <View style={localStyle.wrapper}>
          {/* banner */}
          <Banner
            nav={navigation}
            title={strings.legalInformation.title}
            subTitle={strings.legalInformation.subTitle}
          />

          {/* content */}
          <View style={{ ...localStyle.flexi, ...localStyle.wrapper }}>
            <ScrollIndicatorWrapper
              contentData={
                <View style={{ ...localStyle.wrapper, ...localStyle.top }}>
                  {/* top elements title & text */}
                  <Text style={localStyle.titleText}>
                    {strings.legalInformation.headline}
                  </Text>
                  <Text style={localStyle.infoText}>
                    {strings.legalInformation.content}
                  </Text>
                </View>
              }
            />
          </View>
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
