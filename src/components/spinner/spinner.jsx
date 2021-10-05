// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
import
***********************************************************************************************/

import React, { PureComponent } from "react";
import { StyleSheet, View, Modal, ActivityIndicator } from "react-native";

import config from "../../config/configProvider";

/***********************************************************************************************
component:
displays a fullscreen-loading animation (a simple spinner)
***********************************************************************************************/

class Spinner extends PureComponent {
  /**
   * @constructor
   * @param  {object}      props
   * @param  {boolean}     props.visible if true, shows the spinner
   */

  // rendering
  /*-----------------------------------------------------------------------------------*/

  render() {
    const { visible, testID } = this.props;
    return (
      <Modal visible={visible} testID={testID}>
        <View style={localStyle.container}>
          <View style={localStyle.background}>
            <ActivityIndicator
              color={config.theme.values.defaultSpinnerColor}
              size="large"
              style={localStyle.activityIndicator}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

/***********************************************************************************************
local styling
***********************************************************************************************/

const localStyle = StyleSheet.create({
  activityIndicator: {
    flex: 1,
  },

  background: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
    backgroundColor: config.theme.values.defaultSpinnerBackgroundColor,
  },
});

/***********************************************************************************************
export
***********************************************************************************************/

export default Spinner;
