import React from 'react';

import { renderWithRedux, act } from '__test-utils__/render';

import SliderInput from '../sliderInput';

const initialState = {
  Questionnaire: {
    itemMap: {
      1: {
        linkId: '1',
        type: 'group',
        text: 'group',
        item: [{ linkId: '1.1', type: 'integer' }],
      },
      1.1: { linkId: '1.1', type: 'integer', text: 'integer' },
    },
  },
};

const item = {
  linkId: '1.1',
  type: 'integer',
  text: 'integer',
  extension: [
    {
      url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl',
      valueCodeableConcept: {
        coding: [
          {
            system: 'http://hl7.org/fhir/questionnaire-item-control',
            code: 'slider',
          },
        ],
      },
    },
    {
      url: 'https://num-compass.science/fhir/StructureDefinition/LowRangeLabel',
      valueString: 'Low-Label',
    },
    {
      url: 'https://num-compass.science/fhir/StructureDefinition/HighRangeLabel',
      valueString: 'High-Label',
    },
    {
      url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-sliderStepValue',
      valueInteger: 1,
    },
    {
      url: 'http://hl7.org/fhir/StructureDefinition/minValue',
      valueInteger: 0,
    },
    {
      url: 'http://hl7.org/fhir/StructureDefinition/maxValue',
      valueInteger: 10,
    },
  ],
};

describe('SliderInput', () => {
  it('should render sliderInput with all properties', () => {
    const { getByText, toJSON } = renderWithRedux(<SliderInput item={item} />, {
      initialState,
    });
    expect(toJSON()).toMatchSnapshot();
    expect(getByText('Low-Label')).toBeTruthy();
    expect(getByText('High-Label')).toBeTruthy();
  });

  it('should update value when sliding complete', () => {
    const { getByTestId } = renderWithRedux(<SliderInput item={item} />, {
      initialState,
    });
    expect(getByTestId('Slider')).toBeTruthy();
    act(() => {
      getByTestId('Slider').props.onRNCSliderSlidingComplete({
        nativeEvent: { value: 7 },
      });
    });
    expect(getByTestId('Slider').props.value).toBe(7);
  });
});
