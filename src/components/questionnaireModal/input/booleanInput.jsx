import React from 'react';
import { Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { itemPropType } from '~propTypes';

// components
import { CheckBox } from 'react-native-elements';

// redux actions
import { setAnswer } from '~store/questionnaire.slice';

// services & config
import config from '~config/configProvider';
import translate from '~services/localization';

import SharedStyles, { calculateIndent } from './sharedStyles';

/***********************************************************************************************
 * renders a questionnaire item as boolean input
 *
 * @param {object} props
 * @param {QuestionnaireItem} props.item the item to be rendered
 **********************************************************************************************/
export default function BooleanInput({ item }) {
  const dispatch = useDispatch();

  // get current value from State
  const currentAnswer = useSelector(
    (state) =>
      state.Questionnaire.itemMap[item.linkId].answer?.[0]?.answerBoolean,
  );
  return (
    <>
      <Text style={SharedStyles.contentTitle}>{item.text}</Text>
      <CheckBox
        title={translate('generic').yes}
        uncheckedIcon="circle-o"
        checkedIcon="dot-circle-o"
        checkedColor={config.theme.colors.primary}
        uncheckedColor={config.theme.colors.accent1}
        checked={currentAnswer}
        onPress={() =>
          dispatch(
            setAnswer({
              linkId: item.linkId,
              answer: { answerBoolean: true },
            }),
          )
        }
        key={`${item.linkId}_true`}
        containerStyle={{
          ...SharedStyles.choice,
          marginLeft: calculateIndent(item.linkId),
        }}
        textStyle={SharedStyles.choiceText}
        testID="BooleanInput.true"
      />
      <CheckBox
        uncheckedIcon="circle-o"
        checkedIcon="dot-circle-o"
        title={translate('generic').no}
        checkedColor={config.theme.colors.primary}
        uncheckedColor={config.theme.colors.accent1}
        checked={currentAnswer === false}
        onPress={() =>
          dispatch(
            setAnswer({
              linkId: item.linkId,
              answer: { answerBoolean: false },
            }),
          )
        }
        key={`${item.linkId}_false`}
        containerStyle={{
          ...SharedStyles.choice,
          marginLeft: calculateIndent(item.linkId),
        }}
        textStyle={SharedStyles.choiceText}
        testID="BooleanInput.false"
      />
    </>
  );
}

BooleanInput.propTypes = {
  item: PropTypes.shape(itemPropType).isRequired,
};
