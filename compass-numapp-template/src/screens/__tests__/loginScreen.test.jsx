import React from 'react';

import { renderWithRedux, waitFor } from '__test-utils__/render';
import server from '__mocks__/server';

import { appConfig } from '~config';

import { Stacks, Routes } from '~navigation/constants';
import LoginScreen from '../loginScreen';

describe('LoginScreen', () => {
  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    jest.clearAllMocks();
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
});
