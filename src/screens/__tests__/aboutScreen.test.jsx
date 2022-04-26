import React from 'react';
import { Alert, Linking } from 'react-native';

import {
  act,
  waitFor,
  fireEvent,
  renderWithRedux,
  waitForElementToBeRemoved,
} from '__test-utils__/render';
import server from '__mocks__/server';

import en from '~CUSTOMIZATION/translations/en';

import { getLanguageTag } from '~services/localization';

import AboutScreen from '~screens/aboutScreen';
import { Stacks, Routes } from '~navigation/constants';

describe('AboutScreen', () => {
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

  it('should render the about screen', () => {
    const navigate = jest.fn();
    const goBack = jest.fn();
    const { toJSON } = renderWithRedux(
      <AboutScreen navigation={{ navigate, goBack }} />,
      { initialState: { User: { subjectId: 'someSubjectId' } } },
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('should redirect to landing screen when reset was successful', async () => {
    const navigate = jest.fn();
    const goBack = jest.fn();
    const spyAlert = jest
      .spyOn(Alert, 'alert')
      .mockImplementation(async (title, message, callbackOrButtons) => {
        if (callbackOrButtons && callbackOrButtons[0]) {
          callbackOrButtons[0].onPress();
        }
      });
    const { getByText } = renderWithRedux(
      <AboutScreen navigation={{ navigate, goBack }} />,
      {
        initialState: {
          Globals: { loading: false },
          User: { subjectId: 'someSubjectId' },
        },
      },
    );
    const button = getByText(en.about.delete);
    expect(button).toBeTruthy();
    fireEvent.press(button);
    await waitFor(() =>
      expect(navigate).toHaveBeenCalledWith(Stacks.SIGNED_OUT, {
        screen: Routes.LANDING,
      }),
    );
    expect(spyAlert).toHaveBeenCalledWith(
      en.generic.warning,
      en.generic.eraseAllWarning,
      expect.anything(),
      expect.anything(),
    );
  });

  it('should change language', async () => {
    const navigate = jest.fn();
    const goBack = jest.fn();
    jest
      .spyOn(Alert, 'alert')
      .mockImplementation(async (title, message, callbackOrButtons) => {
        if (callbackOrButtons && callbackOrButtons[0]) {
          callbackOrButtons[0].onPress();
        }
      });
    const { getByTestId } = renderWithRedux(
      <AboutScreen navigation={{ navigate, goBack }} />,
      {
        initialState: {
          Globals: { loading: false },
          User: { subjectId: 'someSubjectId' },
        },
      },
    );
    const picker = getByTestId('languagePicker');
    act(() => picker.props.onChange({ nativeEvent: { newValue: 'de' } }));
    await waitForElementToBeRemoved(() => getByTestId('Spinner'));
    expect(getLanguageTag()).toBe('de');
  });

  it('should warn user before changing language when questionnaire has been started', async () => {
    const navigate = jest.fn();
    const goBack = jest.fn();
    const spyAlert = jest
      .spyOn(Alert, 'alert')
      .mockImplementation(async (title, message, callbackOrButtons) => {
        if (callbackOrButtons && callbackOrButtons[0]) {
          callbackOrButtons[0].onPress();
        }
      });
    const { getByTestId } = renderWithRedux(
      <AboutScreen navigation={{ navigate, goBack }} />,
      {
        initialState: {
          Globals: { loading: false },
          User: { subjectId: 'someSubjectId' },
          Questionnaire: {
            started: true,
          },
        },
      },
    );
    const picker = getByTestId('languagePicker');
    act(() => picker.props.onChange({ nativeEvent: { newValue: 'de' } }));
    await waitForElementToBeRemoved(() => getByTestId('Spinner'));
    expect(getLanguageTag()).toBe('de');
    expect(spyAlert).toHaveBeenCalledWith(
      en.generic.warning,
      en.about.languageWarning + en.about.languageWarningAddition,
      expect.anything(),
      expect.anything(),
    );
  });

  it('should show and hide redirectModal', async () => {
    const navigate = jest.fn();
    const goBack = jest.fn();
    const spyLinking = jest.spyOn(Linking, 'openURL');
    const { getByTestId, getByText } = renderWithRedux(
      <AboutScreen navigation={{ navigate, goBack }} />,
    );
    const modalLink = en.modalLinks[0];
    const item = getByText(modalLink.title);
    fireEvent.press(item);

    const button = getByTestId('redirectBtn');
    expect(button).toBeTruthy();
    fireEvent.press(button);

    expect(spyLinking).toHaveBeenCalledWith(modalLink.uri);
    await waitFor(() =>
      expect(getByTestId('redirectModal').props.visible).toBe(false),
    );
  });
});
