// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
import
***********************************************************************************************/

import React from 'react';
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';

import { theme } from '~config';

/***********************************************************************************************
 * component:
 * displays a fullscreen-loading animation (a simple spinner)
 ***********************************************************************************************/
function Spinner() {
  return (
    <Modal visible={true} testID="Spinner">
      <View style={localStyle.container}>
        <View style={localStyle.background}>
          <ActivityIndicator
            color={theme.values.defaultSpinnerColor}
            size="large"
            style={localStyle.activityIndicator}
          />
        </View>
      </View>
    </Modal>
  );
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
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: theme.values.defaultSpinnerBackgroundColor,
  },
});

/***********************************************************************************************
export
***********************************************************************************************/

export default Spinner;
