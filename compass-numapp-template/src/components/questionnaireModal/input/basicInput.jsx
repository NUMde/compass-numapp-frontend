import React, { useState, useEffect } from 'react';
import { I18nManager, View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { itemPropType } from '~propTypes';

import debounce from 'lodash.debounce';

// components
import { Input } from 'react-native-elements';

// redux actions
import { setAnswer } from '~store/questionnaire.slice';

// services & config
import translate from '~services/localization';

// shared styles
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

/***********************************************************************************************
 * renders a questionnaire item as basic input element for either strings, decimals, or integers
 *
 * @param {object} props
 * @param {QuestionnaireItem} props.item the item to be rendered
 **********************************************************************************************/
export default function BasicInput({ item }) {
  const dispatch = useDispatch();

  // get currentValue from state
  const globalValue = useSelector(
    (state) =>
      // whatever the item type, retrieve the current value if existent
      Object.values(
        state.Questionnaire.itemMap[item.linkId].answer?.[0] ?? {},
      )[0],
  );
  // internally store value of input
  const [localValue, setLocalValue] = useState(null);
  // error message in case input is not valid
  const [errorMsg, setErrorMsg] = useState('');

  // when the component is updated get current value from global state if local value does not exist
  useEffect(
    () => setLocalValue(localValue ?? globalValue),
    [localValue, globalValue],
  );

  // check and validate input
  const handleInputChange = (input) => {
    // eslint-disable-next-line no-param-reassign
    input = input.trim();
    // reset error message
    setErrorMsg('');
    // update local state
    setLocalValue(input);
    // show error when value is not valid integer, i.e. contains '.' or ','
    if (
      item.type === 'integer' &&
      (!Number.isInteger(Number(input)) ||
        // X.0 and X,0 are treated as integers but should be treated as decimals
        input.includes(',') ||
        input.includes('.'))
    ) {
      setErrorMsg(translate('survey').invalidInteger);
      // cancel previous update to global state
      setGlobalAnswer(item, null, dispatch);
      return;

      // show error when value is not valid decimal
    } else if (item.type === 'decimal') {
      // eslint-disable-next-line no-param-reassign
      input = input.replace(',', '.');
      if (Number.isNaN(Number(input))) {
        setErrorMsg(translate('survey').invalidDecimal);
        // cancel previous update to global state
        setGlobalAnswer(item, null, dispatch);
        return;
      }
    }
    const itemControlExtension = item.extension?.find(
      (e) => e.url === 'http://hl7.org/fhir/StructureDefinition/regex',
    );

    if (itemControlExtension && !!input) {
      if (!RegExp(itemControlExtension.valueString).test(input)) {
        setErrorMsg(translate('survey').notMatchingPattern);
        // cancel previous update to global state
        setGlobalAnswer(item, null, dispatch);
        return;
      }
    }

    // only update global value if input is valid
    // construct an answer object where the key is one of answerString, answerInteger, ...
    // and the value is the trimmed input
    setGlobalAnswer(
      item,
      input
        ? {
            [`value${item.type.charAt(0).toUpperCase() + item.type.slice(1)}`]:
              item.type === 'string' ? input.trim() : Number(input),
          }
        : null,
      dispatch,
    );
  };

  return (
    <View style={SharedStyles.modalInput}>
      {/* title */}
      <Text style={SharedStyles.contentTitle}>{item.text}</Text>
      {/* input */}
      <Input
        containerStyle={SharedStyles.modalContainer}
        placeholder={translate('login').inputPlaceholder}
        value={localValue?.toString()}
        keyboardType={getKeyboardType(item)}
        style={localStyle.alignment}
        maxLength={item.maxLength || null}
        // accessibilityLabel={ }
        accessibilityHint={
          translate('accessibility').questionnaire.textFieldHint
        }
        onChangeText={handleInputChange}
        errorMessage={errorMsg}
        testID="BasicInput.Input"
      />
    </View>
  );
}

BasicInput.propTypes = {
  item: PropTypes.shape(itemPropType).isRequired,
};

/***********************************************************************************************
localStyle
***********************************************************************************************/

const localStyle = StyleSheet.create({
  alignment: {
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
});
