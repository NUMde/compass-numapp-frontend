// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { PureComponent } from "react";
import { View, StyleSheet, Text } from "react-native";

import config from "../../config/configProvider";
import Banner from "../../components/banner/banner";
import ScrollIndicatorWrapper from "../../components/scrollIndicatorWrapper/scrollIndicatorWrapper";

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
            title={config.text.legalInformation.title}
            subTitle={config.text.legalInformation.subTitle}
          />

          {/* content */}
          <View style={{ ...localStyle.flexi, ...localStyle.wrapper }}>
            <ScrollIndicatorWrapper
              contentData={
                <View style={{ ...localStyle.wrapper, ...localStyle.top }}>
                  {/* top elements title & text */}
                  <Text style={localStyle.titleText}>
                    {config.text.legalInformation.headline}
                  </Text>
                  <Text style={localStyle.infoText}>
                    {config.text.legalInformation.content}
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
    height: "100%",
    flexDirection: "column",
    backgroundColor: config.theme.values.defaultBackgroundColor,
  },

  flexi: {
    flex: 1,
  },

  title: {
    ...config.theme.fonts.title,
    textAlign: "center",
    alignSelf: "center",
    color: config.theme.values.defaultTitleTextColor,
  },

  top: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: config.appConfig.scaleUiFkt(15),
    marginBottom: config.appConfig.scaleUiFkt(35),
  },

  infoText: {
    marginTop: config.appConfig.scaleUiFkt(20),
    marginBottom: config.appConfig.scaleUiFkt(20),
    marginLeft: config.appConfig.scaleUiFkt(40),
    marginRight: config.appConfig.scaleUiFkt(40),
    textAlign: "justify",
    alignSelf: "auto",
    color: config.theme.colors.accent4,
    ...config.theme.fonts.body,
  },

  titleText: {
    width: "80%",
    textAlign: "center",
    alignSelf: "center",
    ...config.theme.fonts.header2,
  },
});

/***********************************************************************************************
export
***********************************************************************************************/

export default LegalInformationScreen;
