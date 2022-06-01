import React from 'react';
import { Alert } from 'react-native';
import { rest } from 'msw';

import { renderWithRedux, waitFor, act } from '__test-utils__/render';
import server from '__mocks__/server';

import { appConfig } from '~config';
import en from '~CUSTOMIZATION/translations/en';
import endpoints from '~services/rest/endpoints';

import { Stacks, Routes } from '~navigation/constants';
import LoginScreen from '../loginScreen';

describe('LoginScreen', () => {
  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('should render the login screen', () => {
    const navigate = jest.fn();
    const goBack = jest.fn();
    appConfig.automateQrLogin = false;
    const { toJSON } = renderWithRedux(
      <LoginScreen navigation={{ navigate, goBack }} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('should automatically log in when enabled in config', async () => {
    const navigate = jest.fn();
    const goBack = jest.fn();
    appConfig.automateQrLogin = true;
    renderWithRedux(<LoginScreen navigation={{ navigate, goBack }} />);
    await waitFor(() =>
      expect(navigate).toHaveBeenCalledWith(Stacks.SIGNED_IN, {
        screen: Routes.CHECK_IN,
      }),
    );
  });

  it('should log in when qr code was scanned', async () => {
    const navigate = jest.fn();
    const goBack = jest.fn();
    appConfig.automateQrLogin = false;
    const { getByTestId } = renderWithRedux(
      <LoginScreen navigation={{ navigate, goBack }} />,
    );
    const scanner = getByTestId('scannerWrapper').children[0];
    expect(scanner).toBeTruthy();
    act(() =>
      scanner.props.onRead({ data: appConfig.automateQrLoginSubjectId }),
    );
    await waitFor(() =>
      expect(navigate).toHaveBeenCalledWith(Stacks.SIGNED_IN, {
        screen: Routes.CHECK_IN,
      }),
    );
  });

  it('should alert when log in failed', async () => {
    const navigate = jest.fn();
    const goBack = jest.fn();
    appConfig.automateQrLogin = false;
    const spyAlert = jest.spyOn(Alert, 'alert');
    server.use(
      rest.get(`${endpoints.login}:subjectId`, (_req, res, ctx) => {
        return res(
          ctx.status(404),
          ctx.json({
            errorCode: 'InternalErr',
            errorMessage: 'An internal error occurred.',
          }),
        );
      }),
    );
    const { getByTestId } = renderWithRedux(
      <LoginScreen navigation={{ navigate, goBack }} />,
    );
    const scanner = getByTestId('scannerWrapper').children[0];
    expect(scanner).toBeTruthy();
    act(() =>
      scanner.props.onRead({ data: appConfig.automateQrLoginSubjectId }),
    );
    await waitFor(() => expect(spyAlert).toHaveBeenCalled());
    expect(spyAlert).toHaveBeenCalledWith(
      en.generic.errorTitle,
      en.generic.updateError,
      expect.anything(),
      expect.anything(),
    );
  });
});
