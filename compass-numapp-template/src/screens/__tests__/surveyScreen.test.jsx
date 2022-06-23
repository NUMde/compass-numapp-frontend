import React from 'react';
import { Alert } from 'react-native';
import { rest } from 'msw';

import {
  act,
  waitFor,
  fireEvent,
  renderWithRedux,
  waitForElementToBeRemoved,
} from '__test-utils__/render';
import server from '__mocks__/server';
import endpoints from '~services/rest/endpoints';
import emptyItemMap from '__mocks__/questionnaire/emptyItemMap';
import itemMap from '__mocks__/questionnaire/itemMap';
import categories from '__mocks__/questionnaire/categories';

import { appConfig } from '~config';
import en from '~CUSTOMIZATION/translations/en';

import { Routes } from '~navigation/constants';
import SurveyScreen from '../surveyScreen';

describe('SurveyScreen', () => {
  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('should render the screen when not completed', async () => {
    const navigate = jest.fn();
    const goBack = jest.fn();

    const { findByText, queryByText } = renderWithRedux(
      <SurveyScreen navigation={{ navigate, goBack }} />,
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
    const goBack = jest.fn();

    const { findByText, queryByText } = renderWithRedux(
      <SurveyScreen navigation={{ navigate, goBack }} />,
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
    const goBack = jest.fn();
    appConfig.automateQrLogin = true;
    jest
      .spyOn(Alert, 'alert')
      .mockImplementation((_title, _message, callbackOrButtons) => {
        if (callbackOrButtons && callbackOrButtons[0].onPress) {
          act(() => callbackOrButtons[0].onPress());
        }
      });

    const { getByText, getByTestId, queryByTestId } = renderWithRedux(
      <SurveyScreen navigation={{ navigate, goBack }} />,
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
            certificate: appConfig.defaultRecipientCertificatePemString,
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
    const goBack = jest.fn();
    const { getByText } = renderWithRedux(
      <SurveyScreen navigation={{ navigate, goBack }} />,
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
            certificate: appConfig.defaultRecipientCertificatePemString,
          },
        },
      },
    );
    const item = getByText(itemMap['1'].text);
    expect(item).toBeTruthy();
    fireEvent.press(item);
    expect(getByText(/Freitextabfrage/)).toBeTruthy();
  });

  it('should handle error when fetching of questionnaire fails', (done) => {
    const navigate = jest.fn();
    const goBack = jest.fn();
    const spyAlert = jest.spyOn(Alert, 'alert');
    server.use(
      rest.get(
        `${endpoints.getQuestionnaire}:questionnaireId/:langCode`,
        (_req, res, ctx) => {
          return res(
            ctx.status(404),
            ctx.json({
              errorCode: 'InternalErr',
              errorMessage: 'An internal error occurred.',
            }),
          );
        },
      ),
    );
    const { findByText, getByText, queryByText } = renderWithRedux(
      <SurveyScreen navigation={{ navigate, goBack }} />,
      {
        initialState: {
          Globals: { loading: false },
          User: {
            subjectId: 'user',
            start_date: new Date(),
            current_questionnaire_id: 'id:10',
            certificate: appConfig.defaultRecipientCertificatePemString,
          },
        },
      },
    );
    findByText(en.login.landing.retry).then((btn) => {
      expect(spyAlert).toHaveBeenCalledWith(
        en.generic.errorTitle,
        en.generic.updateError,
        expect.anything(),
        expect.anything(),
      );
      server.resetHandlers();
      fireEvent.press(btn);
      waitFor(() => expect(getByText('Datentypen')).toBeTruthy()).then(() => {
        expect(queryByText(en.login.landing.retry)).toBeFalsy();
        done();
      });
    });
  });
});
