import React from 'react';
import { Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { CheckBox } from 'react-native-elements';

import SharedStyles, {
  calculateFontSize,
  calculateIndent,
  calculateLineHeight,
} from './sharedStyles';

import { setAnswer } from '../../../screens/checkIn/checkInActions';
import translate from '../../../services/localization';
import config from '../../../config/configProvider';
import exportService from '../../../services/questionnaireAnalyzer';

/**
 * when an item is of type choice it has the attribute "answerOptions".
 * the entries of that attribute contain the possible choices - and the titles of those
 * choices are either provided by the attribute valueString ot valueInteger.
 * this functions determines what is available an returns it.
 * the title is then stripped of an id, should it be encoded in the string.
 * for example "01# test-answer" becomes "test-answer".
 * @param  {AnswerOption} item entry of an answerOption-entry.
 */
const getItemTitle = (item) => {
  // default value
  let title = 'NO NAME FOUND';

  // sets the title in case of a valueCoding attribute
  if (item.valueCoding) {
    title = item.valueCoding.display ?? item.valueCoding.code;
  }

  // get the string
  title =
    item.valueString ||
    (item.valueInteger ? item.valueInteger.toString() : title);

  // splits it
  return title.split('#')[title.includes('# ') ? 1 : 0].trim();
};

/**
 * renders a list of Choices either as checkboxes, radio buttons or a dropdown
 * @param {object} props
 * @param {QuestionnaireItem} props.item the item to be rendered
 */
function Choices({ item }) {
  const dispatch = useDispatch();
  const questionnaireItemMap = useSelector(
    (state) => state.CheckIn.questionnaireItemMap,
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
      item.extension[0].valueCodeableConcept &&
      item.extension[0].valueCodeableConcept.coding &&
      item.extension[0].valueCodeableConcept.coding[0].code === 'drop-down' ? (
        /* renders the drop-down */
        <Picker
          selectedValue={questionnaireItemMap[item.linkId].answer}
          onValueChange={(value) => {
            dispatch(
              setAnswer({
                linkId: item.linkId,
                answer: value,
              }),
            );
          }}
        >
          {item.answerOption.map((answerOption, index) => (
            <Picker.Item
              label={answerOption.valueString}
              value={answerOption.valueString}
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
                  answer:
                    answerOption.valueCoding ||
                    answerOption.valueString ||
                    answerOption.valueInteger,
                }),
              )
            }
            onIconPress={() => {
              dispatch(
                setAnswer({
                  linkId: item.linkId,
                  answer:
                    answerOption.valueCoding ||
                    answerOption.valueString ||
                    answerOption.valueInteger,
                }),
              );
            }}
            checked={
              exportService.codingEquals(
                exportService.getCorrectlyFormattedAnswer(
                  questionnaireItemMap[item.linkId],
                ),
                answerOption.valueCoding,
              ) ||
              exportService.getCorrectlyFormattedAnswer(
                questionnaireItemMap[item.linkId],
              ) === answerOption.valueString ||
              exportService.getCorrectlyFormattedAnswer(
                questionnaireItemMap[item.linkId],
              ) === answerOption.valueInteger
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
                  answer:
                    answerOption.valueCoding ||
                    answerOption.valueString ||
                    answerOption.valueInteger,
                  repeats: true,
                }),
              )
            }
            onIconPress={() =>
              dispatch(
                setAnswer({
                  linkId: item.linkId,
                  answer:
                    answerOption.valueCoding ||
                    answerOption.valueString ||
                    answerOption.valueInteger,
                  repeats: true,
                }),
              )
            }
            checked={
              (questionnaireItemMap[item.linkId].answer &&
                answerOption.valueCoding &&
                questionnaireItemMap[item.linkId].answer.some(
                  (c) =>
                    c.code === answerOption.valueCoding.code &&
                    c.system === answerOption.valueCoding.system,
                )) ||
              (questionnaireItemMap[item.linkId].answer &&
                questionnaireItemMap[item.linkId].answer.includes(
                  answerOption.valueString,
                )) ||
              (questionnaireItemMap[item.linkId].answer &&
                questionnaireItemMap[item.linkId].answer.includes(
                  answerOption.valueInteger,
                ))
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

export default Choices;
