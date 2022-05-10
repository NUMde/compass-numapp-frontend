/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { View, Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { Routes } from '~navigation/constants';

import Banner from './banner';
import Spinner from './spinner';
import ScrollIndicatorWrapper from './scrollIndicatorWrapper';

describe('Banner', () => {
  const bannerProps = {
    nav: { navigate: jest.fn(), goBack: jest.fn() },
    title: 'title',
    noMenu: false,
    subTitle: 'subtitle',
    isCheckIn: true,
    noWayBack: true,
    noRefresh: false,
    updateUser: jest.fn(),
  };
  it('should render the banner', () => {
    const tree = render(<Banner {...bannerProps} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render the banner with title & without subtitle', () => {
    const tree = render(<Banner {...bannerProps} subTitle="" />);
    expect(tree).toMatchSnapshot();
  });

  it('refresh button should be present & handler called', () => {
    const { getByTestId } = render(<Banner {...bannerProps} isCheckIn />);
    expect(getByTestId('banner_refresh_btn')).toBeTruthy();
    fireEvent.press(getByTestId('banner_refresh_btn'));
    expect(bannerProps.updateUser).toHaveBeenCalled();
  });

  it('back button should be present & navigation called', () => {
    const { getByTestId } = render(
      <Banner {...bannerProps} noWayBack={false} />,
    );
    expect(getByTestId('banner_back_btn')).toBeTruthy();
    fireEvent.press(getByTestId('banner_back_btn'));
    expect(bannerProps.nav.goBack).toHaveBeenCalled();
  });

  it('menu button should be present & navigation called', () => {
    const { getByTestId } = render(
      <Banner {...bannerProps} noWayBack={false} />,
    );
    expect(getByTestId('banner_menu_btn')).toBeTruthy();
    fireEvent.press(getByTestId('banner_menu_btn'));
    expect(bannerProps.nav.navigate).toHaveBeenCalledWith(Routes.ABOUT);
  });

  it('back button should no be present', () => {
    const { queryByTestId } = render(
      <Banner {...bannerProps} noWayBack={true} noRefresh={true} />,
    );
    expect(queryByTestId('banner_back_btn')).not.toBeTruthy();
  });

  it('menu button should no be present', () => {
    const { queryByTestId } = render(<Banner {...bannerProps} noMenu={true} />);
    expect(queryByTestId('banner_menu_btn')).not.toBeTruthy();
  });
});

describe('ScrollIndicatorWrapper', () => {
  it('scrollIndicatorWrapper should be rendered', () => {
    const demoContent = (
      <View>
        <Text testID="demoContent">Some content here</Text>
      </View>
    );
    const { toJSON, getByTestId } = render(
      <ScrollIndicatorWrapper>{demoContent}</ScrollIndicatorWrapper>,
    );
    expect(toJSON()).toMatchSnapshot();
    expect(getByTestId('demoContent')).toBeTruthy();
  });
});

describe('Spinner', () => {
  it('should render the spinner', () => {
    const tree = render(<Spinner />);
    expect(tree).toMatchSnapshot();
  });
});
