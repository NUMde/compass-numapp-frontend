import React from 'react';

import { renderWithRedux, waitFor, act } from '__test-utils__/render';
import server from '__mocks__/server';

import config from '~config/configProvider';

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
    config.appConfig.automateQrLogin = false;
    const { toJSON } = renderWithRedux(
      <LoginScreen navigation={{ navigate, goBack }} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('should automatically log in when enabled in config', async () => {
    const navigate = jest.fn();
    const goBack = jest.fn();
    config.appConfig.automateQrLogin = true;
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
    config.appConfig.automateQrLogin = false;
    const { getByTestId } = renderWithRedux(
      <LoginScreen navigation={{ navigate, goBack }} />,
    );
    const scanner = getByTestId('scannerWrapper').children[0];
    expect(scanner).toBeTruthy();
    act(() =>
      scanner.props.onRead({ data: config.appConfig.automateQrLoginSubjectId }),
    );
    await waitFor(() =>
      expect(navigate).toHaveBeenCalledWith(Stacks.SIGNED_IN, {
        screen: Routes.CHECK_IN,
      }),
    );
  });
});
