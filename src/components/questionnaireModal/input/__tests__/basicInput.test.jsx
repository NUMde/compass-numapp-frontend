import React from 'react';

import { renderWithRedux, fireEvent, act } from '__test-utils__/render';
import translate from '~services/localization';

import BasicInput from '../basicInput';

describe('BasicInput', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should render basic input', () => {
    const { getByTestId, toJSON } = renderWithRedux(
      <BasicInput item={{ linkId: '1.1', type: 'string', text: 'empty' }} />,
      {
        initialState: {
          Questionnaire: {
            itemMap: { 1.1: { linkId: '1.1', type: 'string' } },
          },
        },
      },
    );
    expect(getByTestId('BasicInput.Input')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('should update value', () => {
    const state = {
      Questionnaire: {
        itemMap: {
          1: { linkId: '1', type: 'group', item: [{ linkId: '1.1' }] },
          1.1: { linkId: '1.1', type: 'string', text: 'string' },
        },
        categories: [
          {
            linkId: '1',
            type: 'text',
            item: [{ linkId: '1.1', type: 'string', text: 'string' }],
          },
        ],
      },
    };

    const { getByTestId } = renderWithRedux(
      <BasicInput item={{ linkId: '1.1', type: 'string', text: 'string' }} />,
      {
        initialState: state,
      },
    );
    expect(getByTestId('BasicInput.Input').props.value).toBeFalsy();

    act(() => {
      fireEvent.changeText(getByTestId('BasicInput.Input'), 'test answer');
      jest.runAllTimers();
    });
    expect(getByTestId('BasicInput.Input').props.value).toBe('test answer');
  });

  it('maxLength of input should be set if provided', () => {
    const state = {
      Questionnaire: {
        itemMap: { 1.1: { linkId: '1.1', type: 'string', text: 'empty' } },
        categories: [
          {
            linkId: '1',
            type: 'text',
            item: [{ linkId: '1.1', type: 'string', text: 'empty' }],
          },
        ],
      },
    };

    const { getByTestId } = renderWithRedux(
      <BasicInput
        item={{ linkId: '1.1', type: 'string', text: 'string', maxLength: 5 }}
      />,
      {
        initialState: state,
      },
    );
    expect(getByTestId('BasicInput.Input').props.maxLength).toBe(5);
  });

  it('should alert when entering invalid integer', () => {
    const state = {
      Questionnaire: {
        itemMap: { 1.1: { linkId: '1.1', type: 'integer', text: 'empty' } },
        categories: [
          {
            linkId: '1',
            type: 'text',
            item: [{ linkId: '1.1', type: 'integer', text: 'empty' }],
          },
        ],
      },
    };

    const { getByTestId, getByText } = renderWithRedux(
      <BasicInput item={{ linkId: '1.1', type: 'integer', text: 'integer' }} />,
      {
        initialState: state,
      },
    );
    fireEvent.changeText(getByTestId('BasicInput.Input'), '1.5');
    const errorMessage = translate('survey').invalidInteger;
    const errorHint = getByText(errorMessage);
    expect(errorHint).toBeTruthy();
    fireEvent.changeText(getByTestId('BasicInput.Input'), '1');
    expect(errorHint.props.children).toBe('');
    fireEvent.changeText(getByTestId('BasicInput.Input'), '1.0');
    expect(errorHint.props.children).toBe(errorMessage);
    fireEvent.changeText(getByTestId('BasicInput.Input'), '1');
    expect(errorHint.props.children).toBe('');
    fireEvent.changeText(getByTestId('BasicInput.Input'), '1,0');
    expect(errorHint.props.children).toBe(errorMessage);
  });

  it('should alert when entering invalid decimal', () => {
    const state = {
      Questionnaire: {
        itemMap: { 1.1: { linkId: '1.1', type: 'decimal', text: 'empty' } },
        categories: [
          {
            linkId: '1',
            type: 'text',
            item: [{ linkId: '1.1', type: 'decimal', text: 'empty' }],
          },
        ],
      },
    };

    const { getByTestId, getByText } = renderWithRedux(
      <BasicInput item={{ linkId: '1.1', type: 'decimal', text: 'decimal' }} />,
      {
        initialState: state,
      },
    );
    fireEvent.changeText(getByTestId('BasicInput.Input'), '1..5');
    const errorMessage = translate('survey').invalidDecimal;
    const errorHint = getByText(errorMessage);
    expect(errorHint).toBeTruthy();
    fireEvent.changeText(getByTestId('BasicInput.Input'), '1');
    expect(errorHint.props.children).toBe('');
    fireEvent.changeText(getByTestId('BasicInput.Input'), 'abc');
    expect(errorHint.props.children).toBe(errorMessage);
  });
});
