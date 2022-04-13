import React from 'react';

import {
  renderWithRedux,
  act,
  fireEvent,
} from '../../../../../__test-utils__/render';
import BooleanInput from '../booleanInput';

describe('BooleanInput', () => {
  it('should render a BooleanInput', () => {
    const { getByTestId, toJSON } = renderWithRedux(
      <BooleanInput
        item={{ linkId: '1.1', type: 'boolean', text: 'booleanInput' }}
      />,
      {
        initialState: {
          Questionnaire: {
            itemMap: {
              1: { linkId: '1', type: 'group', text: 'group' },
              1.1: { linkId: '1.1', type: 'boolean', text: 'boolean' },
            },
          },
        },
      },
    );
    expect(getByTestId('BooleanInput.CheckBox')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('should toggle button when clicked', () => {
    const { getByTestId, getByText } = renderWithRedux(
      <BooleanInput
        item={{ linkId: '1.1', type: 'boolean', text: 'booleanInput' }}
      />,
      {
        initialState: {
          Questionnaire: {
            itemMap: {
              1: {
                linkId: '1',
                type: 'group',
                text: 'group',
                item: [{ linkId: '1.1', type: 'boolean', text: 'boolean' }],
              },
              1.1: { linkId: '1.1', type: 'boolean', text: 'boolean' },
            },
            categories: [
              {
                linkId: '1',
                type: 'group',
                text: 'group',
                item: [{ linkId: '1.1', type: 'boolean', text: 'boolean' }],
              },
            ],
          },
        },
      },
    );
    act(() => {
      fireEvent.press(getByTestId('BooleanInput.CheckBox'));
    });
    expect(
      getByTestId('BooleanInput.CheckBox').props.accessibilityState,
    ).toEqual({
      checked: true,
    });
    act(() => {
      fireEvent.press(getByText('\uf046'));
    });
    expect(
      getByTestId('BooleanInput.CheckBox').props.accessibilityState,
    ).toEqual({
      checked: false,
    });
  });
});
