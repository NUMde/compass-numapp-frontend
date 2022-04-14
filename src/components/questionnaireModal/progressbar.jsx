/**********************************************************************************
import
***********************************************************************************************/

import React from 'react';
import { View, StyleSheet } from 'react-native';

import config from '~config/configProvider';

const calculateWidth = (width) =>
  StyleSheet.create({
    progressBarWidth: {
      width: `${width * 100}%`,
    },
  });

/***********************************************************************************************
 * component:
 * renders a progressbar on the bottom of the questionnaireModal
 * @param {object} props
 * @param {number} props.progress the progress as a decimal value between 0 and 1
 ***********************************************************************************************/
function ProgressBar({ progress }) {
  const width = calculateWidth(progress);

  return (
    <View style={localStyle.container}>
      <View style={[localStyle.progressBar, width.progressBarWidth]} />
    </View>
  );
}

/***********************************************************************************************
local styling
***********************************************************************************************/

const localStyle = StyleSheet.create({
  container: {
    width: '95%',
    alignSelf: 'center',
    height: 5,
    borderRadius: 2.5,
    marginHorizontal: 5,
    backgroundColor: config.theme.colors.accent2,
  },

  progressBar: {
    height: 5,
    borderRadius: 2.5,
    backgroundColor: config.theme.colors.primary,
  },
});

export default ProgressBar;
