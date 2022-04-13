import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// components
import Slider from '@react-native-community/slider';

// redux actions
import { setAnswer } from '../../../store/questionnaire.slice';

// services & config
import config from '../../../config/configProvider';
import translate from '../../../services/localization';

import SharedStyles from './sharedStyles';

/***********************************************************************************************
 * component
 * renders a questionnaire item as slider input
 *
 * @param {object} props
 * @param {QuestionnaireItem} props.item the item to be rendered
 ***********************************************************************************************/
export default function SliderInput({ item }) {
  const dispatch = useDispatch();

  // get current value from state
  const currentValue = useSelector(
    (state) => state.Questionnaire.itemMap[item.linkId].answer,
  );
  // creates the default slider-object
  const sliderProperties = Object.create({
    'questionnaire-sliderStepVal': 1,
    minValue: 2,
    maxValue: 300,
    HighRangeLabel: '',
    LowRangeLabel: '',
  });

  // gets the slider properties from the extension-attribute and feeds it to the
  // sliderProperties Object
  item.extension.forEach((extension) => {
    const propertyName = extension.url.slice(
      extension.url.lastIndexOf('/') + 1,
      extension.url.length,
    );
    sliderProperties[propertyName] =
      extension.valueString || extension.valueInteger;
  });

  // checks the dependencies of the item and renders it (if the dependencies check out)
  return (
    <View style={SharedStyles.modalInput}>
      <Text style={SharedStyles.contentTitle}>{item.text}</Text>
      <Slider
        style={{
          width: Dimensions.get('window').width - 40,
        }}
        step={sliderProperties['questionnaire-sliderStepValue']}
        minimumValue={sliderProperties.minValue}
        maximumValue={sliderProperties.maxValue}
        minimumTrackTintColor={config.theme.colors.primary}
        maximumTrackTintColor={config.theme.colors.primary}
        accessibilityHint={
          sliderProperties.minValue +
          translate('accessibility').questionnaire.sliderFieldEquals +
          sliderProperties.LowRangeLabel +
          translate('accessibility').questionnaire.sliderFieldAnd +
          sliderProperties.maxValue +
          translate('accessibility').questionnaire.sliderFieldEquals +
          sliderProperties.HighRangeLabel
        }
        onSlidingComplete={(value) => {
          dispatch(
            setAnswer({
              linkId: item.linkId,
              answer: value,
            }),
          );
        }}
        value={
          typeof currentValue === 'number'
            ? currentValue
            : (sliderProperties.minValue + sliderProperties.maxValue) / 2
        }
        testID="Slider"
      />
      <View style={localStyle.sliderLabel}>
        <Text style={localStyle.sliderTextMin}>
          {sliderProperties.LowRangeLabel}
        </Text>
        <Text style={localStyle.sliderTextMax}>
          {sliderProperties.HighRangeLabel}
        </Text>
      </View>
    </View>
  );
}

/***********************************************************************************************
localStyle
***********************************************************************************************/

const modalWidth = Dimensions.get('window').width - 40;

const localStyle = StyleSheet.create({
  sliderLabel: {
    width: modalWidth,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  sliderTextMax: {
    width: '33%',
    textAlign: 'right',
  },

  sliderTextMin: {
    width: '33%',
    textAlign: 'left',
  },
});
