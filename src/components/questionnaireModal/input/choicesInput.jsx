import React from 'react';
import { Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { itemPropType } from '~propTypes';

// components
import { Picker } from '@react-native-picker/picker';
import { CheckBox } from 'react-native-elements';

// redux actions
import { setAnswer } from '~store/questionnaire.slice';

// services & config
import translate from '~services/localization';
import config from '~config/configProvider';

import SharedStyles, {
  calculateFontSize,
  calculateIndent,
  calculateLineHeight,
} from './sharedStyles';

/**
 * when an item is of type choice it has the attribute "answerOptions".
 * the entries of that attribute contain the possible choices - and the titles of those
 * choices are either provided by the attribute valueString ot valueInteger.
 * this functions determines what is available an returns it.
 * @param  {AnswerOption} item entry of an answerOption-entry.
 */
const getItemTitle = (item) => {
  let title;

  // sets the title in case of a valueCoding attribute
  if (item.valueCoding) {
    title = item.valueCoding.display ?? item.valueCoding.code;
  } else {
    // get the object entry whose key starts with 'value'
    title =
      item[Object.keys(item).find((key) => key.startsWith('value'))].toString();
  }
  return title;
};

/***********************************************************************************************
 * component:
 * renders a list of choices either as checkboxes, radio buttons or a dropdown
 *
 * @param {object} props
 * @param {QuestionnaireItem} props.item the item to be rendered
 **********************************************************************************************/
function ChoicesInput({ item }) {
  const dispatch = useDispatch();

  const questionnaireItemMap = useSelector(
    (state) => state.Questionnaire.itemMap,
  );

  const itemMapEntry = useSelector(
    (state) => state.Questionnaire.itemMap[item.linkId],
  );

  // checks the dependencies of the item and renders it (if the dependencies check out)
  return (
    <>
      {/* title */}
      <Text
        accessibilityLabel={item.text}
        accessibilityHint={
          translate('accessibility').questionnaire.singleChoice
        }
        style={{
          ...SharedStyles.contentTitle,
          marginLeft: calculateIndent(item.linkId),
          fontSize: calculateFontSize(item.linkId),
          lineHeight: calculateLineHeight(item.linkId),
        }}
      >
        {item.text}
      </Text>
      {/* checks if the drop-down extension is available. */}
      {/* if yes, it will render it. */}
      {/* if not, the default way is chosen. */}
      {item.extension &&
      item.extension.some((extension) =>
        extension.valueCodeableConcept?.coding?.some(
          (coding) => coding.code === 'drop-down',
        ),
      ) ? (
        /* renders the drop-down */
        <Picker
          testID="Picker"
          selectedValue={JSON.stringify(
            itemMapEntry.answer ? itemMapEntry.answer[0] : null,
          )}
          onValueChange={(value) => {
            dispatch(
              setAnswer({
                linkId: item.linkId,
                answer: JSON.parse(value),
              }),
            );
          }}
        >
          {item.answerOption.map((answerOption, index) => (
            <Picker.Item
              label={getItemTitle(answerOption)}
              value={JSON.stringify(answerOption)}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
            />
          ))}
        </Picker>
      ) : /* repeat: false; display as radio buttons */
      !item.repeats ? (
        item.answerOption.map((answerOption, index) => (
          <CheckBox
            uncheckedIcon="circle-o"
            checkedIcon="dot-circle-o"
            // eslint-disable-next-line react/no-array-index-key
            key={`${item.linkId}.a_${index}`}
            textStyle={SharedStyles.choiceText}
            title={getItemTitle(answerOption)}
            checkedColor={config.theme.colors.primary}
            uncheckedColor={config.theme.colors.accent1}
            containerStyle={{
              ...SharedStyles.choice,
              marginLeft: calculateIndent(item.linkId),
            }}
            onPress={() =>
              dispatch(
                setAnswer({
                  linkId: item.linkId,
                  answer: {
                    [Object.keys(answerOption)[0]]:
                      answerOption[Object.keys(answerOption)[0]],
                  },
                }),
              )
            }
            onIconPress={() =>
              dispatch(
                setAnswer({
                  linkId: item.linkId,
                  answer: {
                    [Object.keys(answerOption)[0]]:
                      answerOption[Object.keys(answerOption)[0]],
                  },
                }),
              )
            }
            checked={
              !!questionnaireItemMap[item.linkId].answer?.find(
                (entry) =>
                  JSON.stringify(entry) === JSON.stringify(answerOption),
              )
            }
          />
        ))
      ) : (
        /* repeat: true; display as checkboxes */
        item.answerOption.map((answerOption, index) => (
          <CheckBox
            title={getItemTitle(answerOption)}
            checkedColor={config.theme.colors.primary}
            uncheckedColor={config.theme.colors.accent1}
            onPress={() =>
              dispatch(
                setAnswer({
                  linkId: item.linkId,
                  answer: {
                    [Object.keys(answerOption)[0]]:
                      answerOption[Object.keys(answerOption)[0]],
                  },
                  repeats: true,
                }),
              )
            }
            onIconPress={() =>
              dispatch(
                setAnswer({
                  linkId: item.linkId,
                  answer: {
                    [Object.keys(answerOption)[0]]:
                      answerOption[Object.keys(answerOption)[0]],
                  },
                  repeats: true,
                }),
              )
            }
            checked={
              !!questionnaireItemMap[item.linkId].answer?.find(
                (entry) =>
                  JSON.stringify(entry) === JSON.stringify(answerOption),
              )
            }
            // eslint-disable-next-line react/no-array-index-key
            key={`${item.linkId}.a_${index}`}
            containerStyle={{
              ...SharedStyles.choice,
              marginLeft: calculateIndent(item.linkId),
            }}
            textStyle={SharedStyles.choiceText}
          />
        ))
      )}
    </>
  );
}

ChoicesInput.propTypes = {
  item: PropTypes.shape(itemPropType).isRequired,
};

export default ChoicesInput;
