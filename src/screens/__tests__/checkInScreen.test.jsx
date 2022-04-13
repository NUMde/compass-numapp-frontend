import React from 'react';
import { Alert } from 'react-native';

import {
  renderWithRedux,
  fireEvent,
  waitForElementToBeRemoved,
} from '../../../__test-utils__/render';

import categories from '../../../__mocks__/questionnaire/categories';
import itemMap from '../../../__mocks__/questionnaire/itemMap';
import server from '../../../__mocks__/server';
import { loggedInClient } from '../../services/rest';

import en from '../../CUSTOMIZATION/translations/en';
import config from '../../config/configProvider';

import CheckInScreen from '../checkInScreen';

describe('CheckInScreen', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });

  afterAll(() => {
    server.close();
  });
  it('should render the CheckInScreen', async () => {
    const navigate = jest.fn();
    const { findByText, toJSON } = renderWithRedux(
      <CheckInScreen navigation={{ navigate }} />,
    );
    expect(await findByText(en.survey.welcomeTitleFirstTime)).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('should trigger user update when mounting CheckInScreen', async () => {
    const navigate = jest.fn();
    const restSpy = jest.spyOn(loggedInClient, 'getUserUpdate');
    const { findByText } = renderWithRedux(
      <CheckInScreen navigation={{ navigate }} />,
      { initialState: { User: { subjectId: 'someUserId' } } },
    );
    expect(await findByText(en.survey.welcomeTitleFirstTime)).toBeTruthy();
    expect(restSpy).toHaveBeenCalled();
  });

  it('should alert User when questionnaire is outdated', async () => {
    const navigate = jest.fn();
    const spyAlert = jest
      .spyOn(Alert, 'alert')
      .mockImplementation(async (title, message, callbackOrButtons) => {
        if (callbackOrButtons && callbackOrButtons[0]) {
          callbackOrButtons[0].onPress();
        }
      });
    const { findByText, queryByText } = renderWithRedux(
      <CheckInScreen navigation={{ navigate }} />,
      {
        initialState: {
          User: {
            subjectId: 'someUserId',
            current_questionnaire_id: 'http://example.com:1.0',
          },
          Questionnaire: {
            itemMap,
            categories,
            FHIRmetadata: { url: 'http://exmaple.com', version: '2.0' },
          },
        },
      },
    );
    expect(await findByText(en.survey.welcomeTitleFirstTime)).toBeTruthy();
    expect(spyAlert).toHaveBeenCalledWith(
      en.generic.info,
      en.generic.infoRemoval,
      expect.anything(),
      expect.anything(),
    );
    expect(queryByText(en.survey.send)).toBeFalsy();
  });

  it('should submit completed questionnaire', (done) => {
    const navigate = jest.fn();
    jest
      .spyOn(Alert, 'alert')
      .mockImplementation((_title, _message, callbackOrButtons) => {
        if (callbackOrButtons && callbackOrButtons[0]) {
          callbackOrButtons[0].onPress();
        }
      });
    const { findByText, getByText, queryByText, getByTestId } = renderWithRedux(
      <CheckInScreen navigation={{ navigate }} />,
      {
        initialState: {
          User: {
            subjectId: 'someUserId',
            current_questionnaire_id:
              'http://hl7.org/fhir/Questionnaire/Fragebogen_COMPASS_Beispiel|1.0',
            status: 'on-study',
            start_date: new Date(),
            firstTime: true,
            due_date: new Date(new Date().setDate(new Date().getDate() + 3)),
            certificate: config.appConfig.defaultRecipientCertificatePemString,
          },
          Questionnaire: {
            itemMap,
            categories,
            FHIRmetadata: {
              url: 'http://hl7.org/fhir/Questionnaire/Fragebogen_COMPASS_Beispiel',
              version: '1.0',
            },
          },
        },
      },
    );
    findByText(en.survey.send).then((btn) => {
      fireEvent.press(btn);
      waitForElementToBeRemoved(() => getByTestId('Spinner')).then(() => {
        expect(queryByText(en.survey.send)).toBe(null);
        expect(
          getByText(en.survey.noNewQuestionnaireAvailableYetTitle),
        ).toBeTruthy();
        done();
      });
    });
  });

  it('should refresh user data', (done) => {
    const navigate = jest.fn();
    const { queryByTestId, getByTestId, findByLabelText } = renderWithRedux(
      <CheckInScreen navigation={{ navigate }} />,
      {
        initialState: {
          User: {
            subjectId: 'outdatedUser',
            current_questionnaire_id:
              'http://hl7.org/fhir/Questionnaire/Fragebogen_COMPASS_Beispiel|1.0',
            status: 'on-study',
            start_date: new Date(),
            firstTime: true,
            due_date: new Date(new Date().setDate(new Date().getDate() + 3)),
            certificate: config.appConfig.defaultRecipientCertificatePemString,
          },
          Questionnaire: {
            itemMap,
            categories,
            FHIRmetadata: {
              url: 'http://hl7.org/fhir/Questionnaire/Fragebogen_COMPASS_Beispiel',
              version: '1.0',
            },
          },
        },
      },
    );
    findByLabelText(en.accessibility.refresh).then((button) => {
      expect(getByTestId('CheckInListItem')).toBeTruthy();
      expect(button).toBeTruthy();
      fireEvent.press(button);
      waitForElementToBeRemoved(() => getByTestId('Spinner')).then(() => {
        expect(queryByTestId('CheckInListItem')).toBe(null);
        done();
      });
    });
  });

  it('should notify that a report has already been sent out', async () => {
    const spyAlert = jest
      .spyOn(Alert, 'alert')
      .mockImplementation(async (_title, _message, callbackOrButtons) => {
        if (callbackOrButtons && callbackOrButtons[0]) {
          callbackOrButtons[0].onPress();
        }
      });
    const navigate = jest.fn();
    const { findByText } = renderWithRedux(
      <CheckInScreen navigation={{ navigate }} />,
      {
        initialState: {
          User: {
            subjectId: 'someUserId',
            current_questionnaire_id:
              'http://hl7.org/fhir/Questionnaire/Fragebogen_COMPASS_Beispiel|1.0',
            status: 'on-study',
            start_date: new Date(),
            firstTime: true,
            due_date: new Date(new Date().setDate(new Date().getDate() + 3)),
            certificate: config.appConfig.defaultRecipientCertificatePemString,
            additional_iterations_left: 1,
          },
          Questionnaire: {
            itemMap,
            categories,
            FHIRmetadata: {
              url: 'http://hl7.org/fhir/Questionnaire/Fragebogen_COMPASS_Beispiel',
              version: '1.0',
            },
          },
        },
      },
    );
    const button = await findByText(en.reporting.symptoms_header);
    expect(button).toBeTruthy();
    fireEvent.press(button);
    expect(spyAlert).toHaveBeenCalledWith(
      en.generic.info,
      en.generic.reportWhileInIteratedMode,
      expect.anything(),
      expect.anything(),
    );
  });

  it('should notify that a questionnaire is available to report symptoms', async () => {
    const spyAlert = jest
      .spyOn(Alert, 'alert')
      .mockImplementation(async (_title, _message, callbackOrButtons) => {
        if (callbackOrButtons && callbackOrButtons[0]) {
          callbackOrButtons[0].onPress();
        }
      });
    const navigate = jest.fn();
    const { findByText } = renderWithRedux(
      <CheckInScreen navigation={{ navigate }} />,
      {
        initialState: {
          User: {
            subjectId: 'someUserId',
            current_questionnaire_id:
              'http://hl7.org/fhir/Questionnaire/Fragebogen_COMPASS_Beispiel|1.0',
            status: 'on-study',
            start_date: new Date(),
            firstTime: true,
            due_date: new Date(new Date().setDate(new Date().getDate() + 3)),
            certificate: config.appConfig.defaultRecipientCertificatePemString,
            additional_iterations_left: 0,
          },
          Questionnaire: {
            itemMap,
            categories,
            FHIRmetadata: {
              url: 'http://hl7.org/fhir/Questionnaire/Fragebogen_COMPASS_Beispiel',
              version: '1.0',
            },
          },
        },
      },
    );
    const button = await findByText(en.reporting.symptoms_header);
    expect(button).toBeTruthy();
    fireEvent.press(button);
    expect(spyAlert).toHaveBeenCalledWith(
      en.generic.info,
      en.generic.reportWhileQuestionnaire,
      expect.anything(),
      expect.anything(),
    );
  });

  it('should send report', (done) => {
    const spyAlert = jest
      .spyOn(Alert, 'alert')
      .mockImplementation(async (_title, _message, callbackOrButtons) => {
        if (callbackOrButtons && callbackOrButtons[0]) {
          callbackOrButtons[0].onPress();
        }
      });
    const navigate = jest.fn();
    const { findByText, getByTestId, queryByTestId, getByText } =
      renderWithRedux(<CheckInScreen navigation={{ navigate }} />, {
        initialState: {
          User: {
            subjectId: 'reportingUser',
            current_questionnaire_id:
              'http://hl7.org/fhir/Questionnaire/Fragebogen_COMPASS_Beispiel|1.0',
            status: 'on-study',
            start_date: new Date(new Date().setDate(new Date().getDate() + 2)),
            firstTime: true,
            due_date: new Date(new Date().setDate(new Date().getDate() + 3)),
            certificate: config.appConfig.defaultRecipientCertificatePemString,
            additional_iterations_left: 0,
          },
          Questionnaire: {
            itemMap,
            categories,
            FHIRmetadata: {
              url: 'http://hl7.org/fhir/Questionnaire/Fragebogen_COMPASS_Beispiel',
              version: '1.0',
            },
          },
        },
      });
    findByText(en.reporting.symptoms_header).then((button) => {
      expect(queryByTestId('CheckInListItem')).toBe(null);
      expect(button).toBeTruthy();
      fireEvent.press(button);
      expect(spyAlert).toHaveBeenCalledWith(
        en.reporting.symptoms_header,
        en.reporting.symptoms_question,
        expect.anything(),
        expect.anything(),
      );
      waitForElementToBeRemoved(() => getByTestId('Spinner')).then(() => {
        expect(getByTestId('CheckInListItem')).toBeTruthy();
        expect(getByText(en.survey.surveyTitle)).toBeTruthy();
        done();
      });
    });
  });
});
