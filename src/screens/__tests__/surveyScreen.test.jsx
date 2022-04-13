import React from 'react';
import { Alert } from 'react-native';

import {
  act,
  fireEvent,
  renderWithRedux,
  waitForElementToBeRemoved,
} from '__test-utils__/render';
import server from '__mocks__/server';
import emptyItemMap from '__mocks__/questionnaire/emptyItemMap';
import itemMap from '__mocks__/questionnaire/itemMap';
import categories from '__mocks__/questionnaire/categories';

import config from '~config/configProvider';
import en from '~CUSTOMIZATION/translations/en';

import { Routes } from '~navigation/constants';
import SurveyScreen from '../surveyScreen';

describe('SurveyScreen', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('should render the screen when not completed', async () => {
    const navigate = jest.fn();

    const { findByText, queryByText } = renderWithRedux(
      <SurveyScreen navigation={navigate} />,
      {
        initialState: {
          Globals: { loading: false },
          Questionnaire: {
            itemMap: emptyItemMap,
            categories,
            FHIRmetadata: { id: 'id', version: '1.0' },
          },
          User: { subjectId: '', current_questionnaire_id: 'id:10' },
        },
      },
    );
    const item = await findByText(emptyItemMap['1'].text);
    expect(item).toBeTruthy();
    expect(queryByText(en.survey.send)).toBe(null);
  });

  it('should fetch questionnaire if not present', async () => {
    const navigate = jest.fn();

    const { findByText, queryByText } = renderWithRedux(
      <SurveyScreen navigation={navigate} />,
      {
        initialState: {
          Globals: { loading: false },
          Questionnaire: {
            itemMap: null,
            categories: null,
            FHIRmetadata: { id: 'id', version: '1.0' },
          },
          User: {
            subjectId: '',
            current_questionnaire_id: 'id:10',
            start_date: new Date(),
          },
        },
      },
    );
    const item = await findByText(emptyItemMap['1'].text);
    expect(item).toBeTruthy();
    expect(queryByText(en.survey.send)).toBe(null);
  });

  it('should render the screen when completed', (done) => {
    const navigate = jest.fn();
    config.appConfig.automateQrLogin = true;
    jest
      .spyOn(Alert, 'alert')
      .mockImplementation((title, message, callbackOrButtons) => {
        if (callbackOrButtons && callbackOrButtons[0]) {
          act(() => callbackOrButtons[0].onPress());
        }
      });

    const { getByText, getByTestId, queryByTestId } = renderWithRedux(
      <SurveyScreen navigation={{ navigate }} />,
      {
        initialState: {
          Globals: { loading: false },
          Questionnaire: {
            itemMap,
            categories,
            FHIRmetadata: { id: 'id', version: '1.0' },
          },
          User: {
            subjectId: 'user',
            current_questionnaire_id: 'id:10',
            certificate: config.appConfig.defaultRecipientCertificatePemString,
          },
        },
      },
    );
    const item = getByText(itemMap['1'].text);
    expect(item).toBeTruthy();

    fireEvent.press(getByText(en.survey.send));
    waitForElementToBeRemoved(() => getByTestId('Spinner')).then(() => {
      expect(queryByTestId('CheckInListItem')).toBe(null);
      expect(navigate).toHaveBeenCalledWith(Routes.CHECK_IN);
      done();
    });
  });

  it('should open modal when clicking category', () => {
    const navigate = jest.fn();
    const { getByText } = renderWithRedux(
      <SurveyScreen navigation={{ navigate }} />,
      {
        initialState: {
          Globals: { loading: false },
          Questionnaire: {
            itemMap,
            categories,
            FHIRmetadata: { id: 'id', version: '1.0' },
          },
          User: {
            subjectId: 'user',
            current_questionnaire_id: 'id:10',
            certificate: config.appConfig.defaultRecipientCertificatePemString,
          },
        },
      },
    );
    const item = getByText(itemMap['1'].text);
    expect(item).toBeTruthy();
    fireEvent.press(item);
    expect(getByText(/Freitextabfrage/)).toBeTruthy();
  });
});
