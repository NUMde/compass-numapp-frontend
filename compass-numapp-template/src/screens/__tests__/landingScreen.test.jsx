import React from 'react';

import { renderWithRedux, fireEvent } from '__test-utils__/render';

import en from '~CUSTOMIZATION/translations/en';

import { Stacks, Routes } from '~navigation/constants';
import LandingScreen from '../landingScreen';

describe('LandingScreen', () => {
  it('should render screen', () => {
    const navigate = jest.fn();
    const goBack = jest.fn();
    const { getByText, toJSON } = renderWithRedux(
      <LandingScreen navigation={{ navigate, goBack }} />,
    );
    expect(toJSON()).toMatchSnapshot();
    expect(getByText(en.login.landing.buttonText)).toBeTruthy();
  });

  it('should navigate to loginScreen when pressing button', () => {
    const navigate = jest.fn();
    const goBack = jest.fn();
    const { getByText } = renderWithRedux(
      <LandingScreen navigation={{ navigate, goBack }} />,
    );

    fireEvent.press(getByText(en.login.landing.buttonText));
    expect(navigate).toHaveBeenCalledWith(Routes.LOGIN);
  });

  it('should navigate to checkInScreen when subjectId is present', () => {
    const navigate = jest.fn();
    const goBack = jest.fn();
    renderWithRedux(<LandingScreen navigation={{ navigate, goBack }} />, {
      initialState: { User: { subjectId: 'someId' } },
    });

    expect(navigate).toHaveBeenCalledWith(Stacks.SIGNED_IN, {
      screen: Routes.CHECK_IN,
    });
  });
});
