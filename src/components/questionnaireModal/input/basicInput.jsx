import React, { useState, useEffect } from 'react';
import { I18nManager, View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from 'react-native-elements';
import debounce from 'lodash.debounce';

import { setAnswer } from '../../../screens/checkIn/checkInActions';
import localization from '../../../services/localization/localization';
import SharedStyles from './sharedStyles';

/**
 * is used to determine what kind of keyboard should be used
 * @param  {QuestionnaireItem} item a questionnaire item (from props.categories)
 */
const getKeyboardType = (item) => {
  switch (item.type) {
    // numpad for integers
    case 'integer':
      return 'number-pad';
    // decimalPad for decimals
    case 'decimal':
      return 'decimal-pad';
    // and the rest
    default:
      return 'default';
  }
};

/**
 * debounce the update of the global state for slightly better performance;
 * instead of dispatching an action after each keystroke, we wait for 350ms
 * should another keystroke occur before 350ms have passed, the previous actions is interrupted
 * and a new action with the updated parameters is enqueued
 *
 */
const setGlobalAnswer = debounce((item, retVal, dispatch) => {
  dispatch(setAnswer({ answer: retVal, linkId: item.linkId }));
}, 350);

/**
 * renders a questionnaire item as basic input element for either strings, decimals, or integers
 * @param {object} props
 * @param {QuestionnaireItem} props.item the item to be rendered
 * @returns
 */
export default function BasicInput({ item }) {
  // get currentValue from state
  const currentValue = useSelector((state) =>
    state.CheckIn.questionnaireItemMap[item.linkId].answer?.toString(),
  );
  // internally store value of input
  const [value, setValue] = useState('');
  // error message in case input is not valid
  const [errorMsg, setErrorMsg] = useState('');

  // when the component is updated get current value from global state
  useEffect(() => setValue(currentValue), [currentValue]);
  const dispatch = useDispatch();
  // check and validate input
  const handleInputChange = (input) => {
    // reset error message
    setErrorMsg('');
    // update local state
    setValue(input);
    // show error when value is not valid integer
    if (item.type === 'integer' && !Number.isInteger(Number(input))) {
      setErrorMsg(localization.translate('survey').invalidInteger);
      return;

      // show error when value is not valid decimal
    } else if (item.type === 'decimal' && Number.isNaN(Number(input))) {
      setErrorMsg(localization.translate('survey').invalidDecimal);
      return;
    }
    // only update global value if input is valid
    setGlobalAnswer(item, input.trim(), dispatch);
  };

  return (
    <View style={SharedStyles.modalInput}>
      {/* title */}
      <Text style={SharedStyles.contentTitle}>{item.text}</Text>
      {/* input */}
      <Input
        containerStyle={SharedStyles.modalContainer}
        placeholder={localization.translate('login').inputPlaceholder}
        value={value || ''} // displays an empty string when a 'falsy' answer needs to be rendered
        keyboardType={getKeyboardType(item)}
        style={localStyle.alignment}
        maxLength={item.maxLength || null}
        // accessibilityLabel={ }
        accessibilityHint={
          localization.translate('accessibility').questionnaire.textFieldHint
        }
        onChangeText={handleInputChange}
        errorMessage={errorMsg}
      />
    </View>
  );
}

const localStyle = StyleSheet.create({
  alignment: {
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
});
