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
import PropTypes from 'prop-types';
import { itemPropType } from '~propTypes';

// components
import { Input, Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

// redux actions
import { setAnswer } from '~store/questionnaire.slice';

// services & config
import config from '~config/configProvider';
import exportService from '~services/questionnaireAnalyzer';
import translate from '~services/localization';

import SharedStyles from './sharedStyles';

/***********************************************************************************************
 * component
 * renders a questionnaire item as date input
 *
 * @param {object} props
 * @param {QuestionnaireItem} props.item the item to be rendered
 **********************************************************************************************/
export default function DateInput({ item }) {
  // internal state which controls, whether the datepicker is shown
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dispatch = useDispatch();
  // get currentDate from state
  const currentDate = useSelector(
    (state) => state.Questionnaire.itemMap[item.linkId].answer,
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
          // accessibilityRole={translate('accessibility').types.button}
          // accessibilityHint={translate('accessibility').questionnaire.dateFieldHint}
          testID="overlay"
        >
          <Input
            containerStyle={SharedStyles.modalContainer}
            placeholder={translate('login').inputPlaceholderTime}
            value={
              currentDate
                ? exportService.getFormattedDate(currentDate, true)
                : null
            }
            style={localStyle.alignmentWrapper}
            editable={false}
            leftIcon={{ type: 'font-awesome', name: 'calendar' }}
            pointerEvents="none"
            testID="chosenDate"
          />
        </TouchableOpacity>
      }

      {showDatePicker && (
        <DateTimePicker
          value={currentDate ? new Date(currentDate) : new Date()}
          mode="date"
          style={{ width: modalWidth }}
          locale="de-de"
          display="spinner"
          onChange={(_event, date) => {
            // on iOS the date picker is toggled with custom buttons
            // on android the picker is closed when confirming or canceling on the datepicker itself
            if (Platform.OS === 'android') {
              setShowDatePicker(false);
            }
            if (date) {
              dispatch(
                setAnswer({
                  linkId: item.linkId,
                  answer: date,
                }),
              );
            }
          }}
          testID="DatePicker"
        />
      )}
      {/* ios datepicker- Buttons*/}
      {Platform.OS === 'ios' && showDatePicker && (
        <View style={localStyle.dateTimePickerButtonBar}>
          <Button
            title={translate('generic').abort}
            onPress={() => {
              dispatch(
                // when a date as previously been selected, don't change it
                // return empty otherwise; no date has been selected
                setAnswer({
                  linkId: item.linkId,
                  answer: '',
                }),
              );
              setShowDatePicker(false);
            }}
            style={localStyle.dateTimePickerButton}
            type="clear"
            titleStyle={localStyle.iOSButton}
            testID="ios.abort"
          />
          <Button
            title={translate('generic').ok}
            color={config.theme.colors.secondary}
            onPress={() => {
              setShowDatePicker(false);
            }}
            type="clear"
            titleStyle={localStyle.iOSButton}
            testID="ios.submit"
          />
        </View>
      )}
    </View>
  );
}

DateInput.propTypes = {
  item: PropTypes.shape(itemPropType).isRequired,
};

/***********************************************************************************************
localStyle
***********************************************************************************************/

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

  iOSButton: {
    color: config.theme.colors.accent4,
  },
});
