import React from 'react';
import {
  renderWithRedux,
  act,
  fireEvent,
} from '../../../../__test-utils__/render';
import ChoicesInput from './choicesInput';

const initialState = {
  Questionnaire: {
    itemMap: {
      1: {
        linkId: 1,
        type: 'group',
        item: [{ linkId: '1.1', type: 'choice', repeats: true }],
      },
      1.1: { linkId: '1.1', type: 'choice', repeats: true, answer: null },
    },
  },
};

const choiceItem = {
  linkId: '1.1',
  type: 'choice',
  repeats: true,
  required: true,
  answerOption: [
    {
      valueString: 'Option A',
    },
    {
      valueString: 'Option B',
    },
    {
      valueString: 'Option C',
    },
    {
      valueString: 'Option D',
    },
    {
      valueCoding: {
        code: 'someCode',
        system: 'someSystem',
        display: 'Option E',
      },
    },
  ],
};

describe('choicesInput (CheckBoxes)', () => {
  it('should render a list of choices as checkboxes', async () => {
    const { toJSON, getAllByTestId, getAllByText } = renderWithRedux(
      <ChoicesInput item={choiceItem} />,
      { initialState },
    );
    expect(toJSON()).toMatchSnapshot();
    expect(getAllByTestId('checkbox').length).toBe(5);
    expect(getAllByText('\uf096').length).toBe(5);
  });

  it('should render a list of integer choices as checkBoxes', async () => {
    const { getAllByTestId, getAllByText } = renderWithRedux(
      <ChoicesInput
        item={{
          ...choiceItem,
          repeats: false,
          answerOption: [
            { valueInteger: 0 },
            { valueInteger: 1 },
            { valueInteger: 2 },
          ],
        }}
      />,
      { initialState },
    );
    expect(getAllByTestId('checkbox').length).toBe(3);
    expect(getAllByText('\uf10c').length).toBe(3);
  });

  it('should check element when clicked', async () => {
    const { getByText } = renderWithRedux(<ChoicesInput item={choiceItem} />, {
      initialState,
    });
    const answerItem = getByText('Option C');
    act(() => {
      fireEvent.press(answerItem);
    });
    const selectedItem = getByText('\uf046');
    expect(selectedItem).toBeTruthy();
    expect(selectedItem.parent.parent.props.checked).toBe(true);
    expect(selectedItem.parent.parent.props.title).toBe('Option C');
    act(() => {
      fireEvent.press(selectedItem);
    });
    expect(selectedItem.props.children).not.toContain('\uf046');
  });
});

describe('choicesInput (RadioButtons)', () => {
  it('should render a list of choices as radio buttons', async () => {
    const { toJSON, getAllByTestId, getAllByText } = renderWithRedux(
      <ChoicesInput item={{ ...choiceItem, repeats: false }} />,
      { initialState },
    );
    expect(toJSON()).toMatchSnapshot();
    expect(getAllByTestId('checkbox').length).toBe(5);
    expect(getAllByText('\uf10c').length).toBe(5);
  });

  it('should render a list of integer choices as radio buttons', async () => {
    const { getAllByTestId, getAllByText } = renderWithRedux(
      <ChoicesInput
        item={{
          ...choiceItem,
          repeats: false,
          answerOption: [
            { valueInteger: 0 },
            { valueInteger: 1 },
            { valueInteger: 2 },
          ],
        }}
      />,
      { initialState },
    );
    expect(getAllByTestId('checkbox').length).toBe(3);
    expect(getAllByText('\uf10c').length).toBe(3);
  });

  it('should select answer', () => {
    const { getByText, getAllByText } = renderWithRedux(
      <ChoicesInput item={{ ...choiceItem, repeats: false }} />,
      { initialState },
    );
    const answerItem = getByText('Option C');
    act(() => {
      fireEvent.press(answerItem);
    });
    const selectedItem = getByText('\uf192');
    expect(selectedItem).toBeTruthy();
    expect(selectedItem.parent.parent.props.title).toBe('Option C');
    act(() => {
      fireEvent.press(getAllByText('\uf10c')[3]);
    });
    expect(getByText('\uf192').parent.parent.props.checked).toBe(true);
    expect(getByText('\uf192').parent.parent.props.title).toBe('Option E');
  });
});

describe('choicesInput (DropDown)', () => {
  it('should render a list of choices as dropdown', () => {
    const { toJSON, getByTestId } = renderWithRedux(
      <ChoicesInput
        item={{
          ...choiceItem,
          extension: [
            {
              url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl',
              valueCodeableConcept: {
                coding: [
                  {
                    system: 'http://hl7.org/fhir/questionnaire-item-control',
                    code: 'drop-down',
                  },
                ],
              },
            },
          ],
        }}
      />,
      { initialState },
    );
    expect(toJSON()).toMatchSnapshot();
    const Picker = getByTestId('Picker');
    expect(Picker).toBeTruthy();
    expect(Picker.props.items.length).toBe(5);
  });

  it('should select answer', () => {
    const { getByTestId } = renderWithRedux(
      <ChoicesInput
        item={{
          ...choiceItem,
          extension: [
            {
              url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl',
              valueCodeableConcept: {
                coding: [
                  {
                    system: 'http://hl7.org/fhir/questionnaire-item-control',
                    code: 'drop-down',
                  },
                ],
              },
            },
          ],
        }}
      />,
      { initialState },
    );

    const Picker = getByTestId('Picker');
    act(() => Picker.props.onChange({ nativeEvent: { newValue: 'Option C' } }));
    expect(Picker.props.selectedIndex).toBe(2);
  });
});
