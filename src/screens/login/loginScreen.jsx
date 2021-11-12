// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { Component } from "react";
import { Text } from "react-native-elements";
import { StyleSheet, View, Dimensions } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";

import * as config from "../../config/configProvider";
import Banner from "../../components/banner/banner";
import ScrollIndicatorWrapper from "../../components/scrollIndicatorWrapper/scrollIndicatorWrapper";

let localStyle;

/***********************************************************************************************
component:
renders the login-screen
***********************************************************************************************/

class LoginScreen extends Component {
  /**
   * reference to access the camera
   * @type {object}
   */
  camera;

  /**
   * @constructor
   * @param  {object}    props
   * @param  {object}    props.actions holds the actions for this state
   * @param  {object}    props.navigation the navigation object provided by 'react-navigation'
   * @param  {Function}  props.scanSuccess function that is triggered when the qr-scanner picks something up
   * @param  {boolean}   props.loginUnauthorized if true: the last authentication attempt returned a 401
   * @param  {object}    props.loginError the persisted error of the last authentication attempt
   */
  constructor(props) {
    super(props);
    this.camera = React.createRef();
  }

  // rendering
  /*-----------------------------------------------------------------------------------*/

  render() {
    const { navigation, actions, scanSuccess, loginError, loginUnauthorized } =
      this.props;
    return (
      <View style={localStyle.wrapper}>
        {/* banner */}
        <Banner
          nav={navigation}
          logout={actions.logout}
          title={config.text.login.title}
          subTitle={config.text.login.subTitle}
          noMenu
        />

        {/* scrollIndicator with qrcode scanner */}
        <View style={{ ...localStyle.flexi, ...localStyle.wrapper }}>
          <ScrollIndicatorWrapper
            contentData={
              <View style={localStyle.wrapper}>
                <View style={{ ...localStyle.flexi, ...localStyle.wrapper }}>
                  <View>
                    {/* the qr-code-scanner */}
                    <QRCodeScanner
                      fadeIn={false}
                      showMarker
                      cameraStyle={localStyle.qrScanner}
                      markerStyle={localStyle.qrScannerMarker}
                      ref={(node) => {
                        this.camera = node;
                      }}
                      containerStyle={localStyle.qrScannerContainer}
                      onRead={(scanResult) =>
                        scanSuccess(scanResult, this.camera)
                      }
                      permissionDialogMessage={
                        config.text.login.permissionDialog
                      }
                    />
                  </View>

                  {/* information text */}
                  <Text style={localStyle.infoText}>
                    {config.text.login.qrInfo}
                  </Text>

                  {/* login error text */}
                  {loginError && (
                    <View>
                      {/* displays an error message in case of 401 */}
                      {loginUnauthorized && (
                        <Text
                          style={{
                            ...localStyle.infoText,
                            ...localStyle.loginErrorText,
                          }}
                        >
                          {config.text.login.errorUserUnauthorized}
                        </Text>
                      )}

                      {/* if anything other than a 401: outputs the returned error message (or a generic error message instead) followed by another instructional string*/}
                      {!loginUnauthorized && (
                        <View>
                          <Text
                            style={{
                              ...localStyle.infoText,
                              ...localStyle.loginErrorText,
                            }}
                          >
                            {loginError?.message ??
                              config.text.login.errorUserGeneric}
                            {"\n"}
                            {config.text.login.nextStepAfterError}
                          </Text>
                        </View>
                      )}
                    </View>
                  )}
                </View>
              </View>
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

// scaleUiFkt() (located in src/config/appConfig.js)
// will dynamically alter some sized based on the physical device-measurements.

const { width } = Dimensions.get("window");

localStyle = StyleSheet.create({
  wrapper: {
    height: "100%",
    backgroundColor: config.theme.values.defaultBackgroundColor,
  },

  flexi: {
    flex: 1,
  },

  infoText: {
    marginBottom: 0,
    textAlign: "center",
    alignSelf: "center",
    color: config.theme.colors.accent4,
    marginTop: config.appConfig.scaleUiFkt(30),
    marginLeft: config.appConfig.scaleUiFkt(70),
    marginRight: config.appConfig.scaleUiFkt(70),
    ...config.theme.fonts.subHeader1,
  },

  loginErrorText: {
    color: config.theme.colors.alert,
  },

  qrScannerContainer: {
    marginTop: 0,
    width: "100%",
    height: width,
  },

  qrScanner: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },

  qrScannerMarker: {
    borderColor: config.theme.colors.primary,
  },
});

/***********************************************************************************************
export
***********************************************************************************************/

export default LoginScreen;
