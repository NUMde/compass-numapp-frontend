import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Slider from '@react-native-community/slider';

import { setAnswer } from '../../../screens/checkIn/checkInActions';

import config from '../../../config/configProvider';
import localization from '../../../services/localization/localization';

import SharedStyles from './sharedStyles';

/**
 *
 * renders a questionnaire item as slider input
 * @param {object} props
 * @param {QuestionnaireItem} props.item the item to be rendered
 * @returns
 */
export default function SliderInput({ item }) {
  // get  from state
  const currentValue = useSelector(
    (state) => state.CheckIn.questionnaireItemMap[item.linkId].answer,
  );
  const dispatch = useDispatch();
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
          localization.translate('accessibility').questionnaire
            .sliderFieldEquals +
          sliderProperties.LowRangeLabel +
          localization.translate('accessibility').questionnaire.sliderFieldAnd +
          sliderProperties.maxValue +
          localization.translate('accessibility').questionnaire
            .sliderFieldEquals +
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
