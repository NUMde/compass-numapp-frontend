import React from 'react';
import { Alert } from 'react-native';

import { renderWithRedux, fireEvent } from '../../../__test-utils__/render';

import en from '../../CUSTOMIZATION/translations/en';

import LandingScreen from '../landingScreen';
import { Stacks, Routes } from '../../navigation/constants';

describe('LandingScreen', () => {
  it('should render screen', () => {
    const navigate = jest.fn();
    const { getByText, toJSON } = renderWithRedux(
      <LandingScreen navigation={{ navigate }} />,
    );
    expect(toJSON()).toMatchSnapshot();
    expect(getByText(en.login.landing.buttonText)).toBeTruthy();
  });

  it('should navigate to loginScreen when pressing button', () => {
    const navigate = jest.fn();
    const { getByText } = renderWithRedux(
      <LandingScreen navigation={{ navigate }} />,
    );

    fireEvent.press(getByText(en.login.landing.buttonText));
    expect(navigate).toHaveBeenCalledWith(Routes.LOGIN);
  });

  it('should navigate to checkInScreen when subjectId is present', () => {
    const navigate = jest.fn();
    renderWithRedux(<LandingScreen navigation={{ navigate }} />, {
      initialState: { User: { subjectId: 'someId' } },
    });

    expect(navigate).toHaveBeenCalledWith(Stacks.SIGNED_IN, {
      screen: Routes.CHECK_IN,
    });
  });

  it('should display message when error ocurred', async () => {
    const spyAlert = jest
      .spyOn(Alert, 'alert')
      .mockImplementation(async (title, message, callbackOrButtons) => {
        if (callbackOrButtons && callbackOrButtons[0]) {
          callbackOrButtons[0].onPress();
        }
      });
    const navigate = jest.fn();
    const { getByText, findByText } = renderWithRedux(
      <LandingScreen navigation={{ navigate }} />,
      { initialState: { Globals: { error: 'some error' } } },
    );
    const retryBtn = getByText(en.login.landing.retry);
    expect(retryBtn).toBeTruthy();
    fireEvent.press(retryBtn);
    expect(navigate).toHaveBeenCalledWith(Routes.LOGIN);
    const deleteBtn = getByText(en.login.landing.deleteAll);
    expect(deleteBtn).toBeTruthy();
    fireEvent.press(deleteBtn);
    expect(spyAlert).toHaveBeenCalled();

    expect(await findByText(en.login.landing.buttonText)).toBeTruthy();
  });
});
