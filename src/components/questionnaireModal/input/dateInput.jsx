import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { setAnswer } from '../../../screens/checkIn/checkInActions';
import config from '../../../config/configProvider';
import exportService from '../../../services/questionnaireAnalyzer/questionnaireAnalyzer';
import localization from '../../../services/localization/localization';

import SharedStyles from './sharedStyles';

/**
 * renders a questionnaire item as date input
 * @param {object} props
 * @param {QuestionnaireItem} props.item the item to be rendered
 */
export default function DateInput({ item }) {
  // internal state which controls, whether the datepicker is shown
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dispatch = useDispatch();
  // get currentDate from state
  const currentDate = useSelector(
    (state) => state.CheckIn.questionnaireItemMap[item.linkId].answer,
  );
  return (
    <View style={SharedStyles.modalInput}>
      {/* title */}
      <Text style={SharedStyles.contentTitle}>{item.text}</Text>

      {/* android datepicker */}
      {
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          // accessibilityLabel={ }
          // accessibilityRole={localization.translate('accessibility').types.button}
          // accessibilityHint={localization.translate('accessibility').questionnaire.dateFieldHint}
        >
          <Input
            containerStyle={SharedStyles.modalContainer}
            placeholder={localization.translate('login').inputPlaceholderTime}
            value={
              currentDate
                ? exportService.getFormattedDate(currentDate, true)
                : null
            }
            style={localStyle.alignmentWrapper}
            editable={false}
            leftIcon={{ type: 'font-awesome', name: 'calendar' }}
            pointerEvents="none"
          />
        </TouchableOpacity>
      }

      {showDatePicker && (
        <DateTimePicker
          value={currentDate || new Date()}
          mode="date"
          style={{ width: modalWidth }}
          locale="de-de"
          display="spinner"
          onChange={(_event, date) => {
            dispatch(
              setAnswer({
                linkId: item.linkId,
                answer: date,
              }),
            );
            // only on android the datepicker appears as dialog which must be closed
            Platform.OS === 'android' && setShowDatePicker(false);
          }}
        />
      )}
      {/* ios datepicker- Buttons*/}
      {Platform.OS === 'ios' && showDatePicker && (
        <View style={localStyle.dateTimePickerButtonBar}>
          <Button
            title={localization.translate('generic').abort}
            onPress={() => {
              dispatch(
                setAnswer({
                  linkId: item.linkId,
                  answer: '',
                }),
                setShowDatePicker(false),
              );
            }}
            style={localStyle.dateTimePickerButton}
            type="clear"
            titleStyle={{ color: config.theme.colors.accent4 }}
          />
          <Button
            title={localization.translate('generic').ok}
            color={config.theme.colors.secondary}
            onPress={() => {
              dispatch(
                setAnswer({
                  linkId: item.linkId,
                  answer: currentDate || new Date(),
                }),
              );
              setShowDatePicker(false);
            }}
            type="clear"
            titleStyle={{ color: config.theme.colors.accent4 }}
          />
        </View>
      )}
    </View>
  );
}

const modalWidth = Dimensions.get('window').width - 40;

const localStyle = StyleSheet.create({
  dateTimePickerButtonBar: {
    flexWrap: 'nowrap',
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    paddingRight: 20,
  },

  dateTimePickerButton: {
    paddingRight: 40,
  },
});
