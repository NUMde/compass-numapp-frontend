import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

import BasicInput from './basicInput';
import BooleanInput from './booleanInput';
import ChoicesInput from './choicesInput';
import DateInput from './dateInput';
import SliderInput from './sliderInput';

import questionnaireAnalyzer from '../../../services/questionnaireAnalyzer/questionnaireAnalyzer';

import SharedStyles, {
  calculateFontSize,
  calculateIndent,
  calculateLineHeight,
} from './sharedStyles';
/**
 * renders a single FHIR-Questionnaire Item
 * should this item be oif type group, its child items are rendered recursively
 * @param {object} props
 * @param {QuestionnaireItem} props.item the item to be rendered
 *
 */
export default function QuestionnaireItem({ item }) {
  const questionnaireItemMap = useSelector(
    (state) => state.CheckIn.questionnaireItemMap,
  );
  if (
    !questionnaireAnalyzer.checkDependenciesOfSingleItem(
      item,
      questionnaireItemMap,
    )
  ) {
    return <View />;
  }
  // if the item represents a group of questions, display the title of the group and render the children below
  if (item.type === 'group') {
    return (
      <View key={item.linkId}>
        <Text
          style={{
            ...SharedStyles.contentTitle,
            fontSize: calculateFontSize(item.linkId),
            lineHeight: calculateLineHeight(item.linkId),
            marginLeft: calculateIndent(item.linkId),
          }}
        >
          {item.text}
        </Text>
        {item.item &&
          item.item.map((subItem) => (
            <QuestionnaireItem item={subItem} key={subItem.linkId} />
          ))}
      </View>
    );
  } else {
    let itemControlExtension;
    let isSlider;
    switch (item.type) {
      // creates regular inputs for strings
      case 'string':
        return <BasicInput item={item} key={item.linkId} />;

      // creates either a list of radio buttons, a list of checkboxes or a drop-down element
      case 'choice':
        return <ChoicesInput item={item} key={item.linkId} />;

      // creates a checkbox
      case 'boolean':
        return <BooleanInput item={item} key={item.linkId} />;

      // creates a date input
      case 'date':
        return <DateInput item={item} key={item.linkId} />;

      // creates the inputs for decimals and integers (and numerical sliders)
      // this also utilizes the decimal-pad or the num-pad
      case 'integer':
      case 'decimal':
        itemControlExtension = item.extension?.find(
          (e) =>
            e.url ===
            'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl',
        );
        isSlider = itemControlExtension?.valueCodeableConcept?.coding?.find(
          (c) =>
            c.system === 'http://hl7.org/fhir/questionnaire-item-control' &&
            c.code === 'slider',
        );
        return isSlider ? (
          <SliderInput item={item} key={item.linkId} />
        ) : (
          <BasicInput item={item} key={item.linkId} />
        );

      // if nothing else matches - display the title if at least the dependencies check out
      default:
        // checks the dependencies of the item and renders it (if the dependencies check out)
        return (
          <Text
            style={{
              ...SharedStyles.contentTitle,
              fontSize: calculateFontSize(item.linkId),
              lineHeight: calculateLineHeight(item.linkId),
              marginLeft: calculateIndent(item.linkId),
            }}
          >
            {item.text}
          </Text>
        );
    }
  }
}
