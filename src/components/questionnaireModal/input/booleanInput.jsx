import React from 'react';
import { CheckBox } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';

import { setAnswer } from '../../../screens/checkIn/checkInActions';
import config from '../../../config/configProvider';
import exportService from '../../../services/questionnaireAnalyzer/questionnaireAnalyzer';

import SharedStyles, { calculateIndent } from './sharedStyles';

/**
 * renders a questionnaire item as boolean input
 * @param {object} props
 * @param {QuestionnaireItem} props.item the item to be rendered
 *
 */
export default function Boolean({ item }) {
  const dispatch = useDispatch();
  // get current value from State
  const currentAnswer = useSelector(
    (state) => state.CheckIn.questionnaireItemMap[item.linkId].answer,
  );
  return (
    <CheckBox
      title={item.text}
      checkedColor={config.theme.colors.primary}
      uncheckedColor={config.theme.colors.accent1}
      checked={currentAnswer}
      onPress={() =>
        dispatch(
          setAnswer({
            linkId: item.linkId,
            answer:
              exportService.getCorrectlyFormattedAnswer(item) === null
                ? true
                : !currentAnswer,
          }),
        )
      }
      onIconPress={() =>
        dispatch(
          setAnswer({
            linkId: item.linkId,
            answer:
              exportService.getCorrectlyFormattedAnswer(item) === null
                ? true
                : !currentAnswer,
          }),
        )
      }
      key={`${item.linkId}`}
      containerStyle={{
        ...SharedStyles.choice,
        marginLeft: calculateIndent(item.linkId),
      }}
      textStyle={SharedStyles.choiceText}
    />
  );
}
