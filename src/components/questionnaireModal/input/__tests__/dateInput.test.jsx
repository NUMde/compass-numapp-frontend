import React from 'react';
import { Platform } from 'react-native';
import {
  renderWithRedux,
  act,
  fireEvent,
} from '../../../../../__test-utils__/render';

import DateInput from '../dateInput';

const initialState = {
  Questionnaire: {
    itemMap: {
      1: {
        linkId: '1',
        type: 'group',
        text: 'group',
        item: [{ linkId: '1.1', type: 'date' }],
      },
      1.1: { linkId: '1.1', type: 'date', text: 'date' },
    },
  },
};

describe('DateInput (Android/default)', () => {
  beforeAll(() => {
    Platform.OS = 'android';
  });

  it('should render a dateInput element', () => {
    const { toJSON } = renderWithRedux(
      <DateInput item={{ linkId: '1.1', type: 'date', text: 'date' }} />,
      { initialState },
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('should show datepicker when clicking input', () => {
    const { getByTestId } = renderWithRedux(
      <DateInput item={{ linkId: '1.1', type: 'date', text: 'date' }} />,
      { initialState },
    );
    expect(getByTestId('chosenDate')).toBeTruthy();
    act(() => {
      fireEvent.press(getByTestId('chosenDate'));
    });
    expect(getByTestId('DatePicker')).toBeTruthy();
  });

  it('should update value when date changes', () => {
    const { getByTestId } = renderWithRedux(
      <DateInput item={{ linkId: '1.1', type: 'date', text: 'date' }} />,
      { initialState },
    );
    act(() => {
      fireEvent.press(getByTestId('chosenDate'));
    });
    act(() => {
      getByTestId('DatePicker').props.onChange({
        nativeEvent: { timestamp: new Date('Mon Mar 14 2022') },
      });
    });
    expect(getByTestId('chosenDate').props.value).toBe('14.03.2022');
    act(() => {
      fireEvent.press(getByTestId('chosenDate'));
    });
    act(() => {
      getByTestId('DatePicker').props.onChange({
        nativeEvent: {},
      });
    });
    expect(getByTestId('chosenDate').props.value).toBe('14.03.2022');
  });
});

describe('DateInput (iOS)', () => {
  beforeAll(() => {
    Platform.OS = 'ios';
  });

  it('should render a dateInput element', () => {
    const { toJSON } = renderWithRedux(
      <DateInput item={{ linkId: '1.1', type: 'date', text: 'date' }} />,
      { initialState },
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('should show datepicker when clicking input', () => {
    const { getByTestId } = renderWithRedux(
      <DateInput item={{ linkId: '1.1', type: 'date', text: 'date' }} />,
      { initialState },
    );
    expect(getByTestId('overlay')).toBeTruthy();
    act(() => {
      fireEvent.press(getByTestId('overlay'));
    });
    expect(getByTestId('DatePicker')).toBeTruthy();
  });

  it('should update value when date changes', () => {
    const { getByTestId } = renderWithRedux(
      <DateInput item={{ linkId: '1.1', type: 'date', text: 'date' }} />,
      { initialState },
    );
    act(() => {
      fireEvent.press(getByTestId('chosenDate'));
    });
    act(() => {
      getByTestId('DatePicker').props.onChange({
        nativeEvent: { timestamp: new Date('Mon Mar 12 2022') },
      });
    });
    expect(getByTestId('chosenDate').props.value).toBe('12.03.2022');
  });

  it("should hide datepicker when clicking 'ok' button ", () => {
    const { queryByTestId, getByTestId } = renderWithRedux(
      <DateInput item={{ linkId: '1.1', type: 'date', text: 'date' }} />,
      { initialState },
    );
    act(() => {
      fireEvent.press(getByTestId('chosenDate'));
    });
    expect(getByTestId('DatePicker')).toBeTruthy();
    act(() => {
      fireEvent.press(getByTestId('ios.submit'));
    });
    expect(queryByTestId('DatePicker')).toBeFalsy();
  });

  it("should hide datepicker and reset when clicking 'abort' button ", () => {
    const { queryByTestId, getByTestId } = renderWithRedux(
      <DateInput item={{ linkId: '1.1', type: 'date', text: 'date' }} />,
      { initialState },
    );
    act(() => {
      fireEvent.press(getByTestId('chosenDate'));
    });
    expect(getByTestId('DatePicker')).toBeTruthy();
    act(() => {
      fireEvent.press(getByTestId('ios.abort'));
    });
    expect(queryByTestId('DatePicker')).toBeFalsy();
    expect(getByTestId('chosenDate').props.value).toBe(null);
  });
});
