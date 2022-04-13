import React from 'react';
import { Linking } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { Routes } from '~navigation/constants';
import AboutListItem from './aboutListItem';
import AboutListLink from './aboutListLink';
import RedirectModal from './redirectModal';

describe('aboutListItem', () => {
  const modalLink = {
    title: 'title',
    subTitle: 'subtitle',
    text: 'text describing link',
    uri: 'http://example.com',
    iconTitle: 'link',
    iconType: 'entypo',
  };

  const showModal = jest.fn();

  it('should render the aboutListItem', () => {
    const tree = render(
      <AboutListItem showModal={showModal} modalLink={modalLink} />,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should include title', () => {
    const { getByTestId } = render(
      <AboutListItem showModal={showModal} modalLink={modalLink} />,
    );
    expect(getByTestId('ALI_title').props.children).toBe(modalLink.title);
  });

  it('should include subTitle', () => {
    const { getByTestId } = render(
      <AboutListItem showModal={showModal} modalLink={modalLink} />,
    );
    expect(getByTestId('ALI_subTitle').props.children).toBe(modalLink.subTitle);
  });

  it('should call handler on press', () => {
    // test onPress handler
    const { getByTestId } = render(
      <AboutListItem showModal={showModal} modalLink={modalLink} />,
    );
    fireEvent.press(getByTestId('aboutListItem'));

    expect(showModal).toHaveBeenCalled();
  });
});

describe('aboutListLink', () => {
  const webView = {
    title: 'title',
    subTitle: 'subtitle',
    uri: 'http://example.com',
    iconTitle: 'link',
    iconType: 'entypo',
  };

  const navigation = { navigate: jest.fn() };

  it('should render the aboutListLink', () => {
    const tree = render(
      <AboutListLink navigation={navigation} webView={webView} />,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should include title', () => {
    const { getByTestId } = render(
      <AboutListLink navigation={navigation} webView={webView} />,
    );
    expect(getByTestId('ALL_title').props.children).toBe(webView.title);
  });

  it('should include subTitle', () => {
    const { getByTestId } = render(
      <AboutListLink navigation={navigation} webView={webView} />,
    );
    expect(getByTestId('ALL_subTitle').props.children).toBe(webView.subTitle);
  });

  it('should call navigation on press', () => {
    const { getByTestId } = render(
      <AboutListLink navigation={navigation} webView={webView} />,
    );
    fireEvent.press(getByTestId('aboutListLink'));
    expect(navigation.navigate).toHaveBeenCalledWith(Routes.WEBVIEW, {
      ...webView,
    });
  });
});

describe('redirectModal', () => {
  const modalLink = {
    title: 'title',
    subTitle: 'subtitle',
    text: 'some text',
    uri: 'http://example.com',
  };
  const hideModal = jest.fn();

  it('should render the redirectModal', () => {
    const tree = render(
      <RedirectModal
        hideModal={hideModal}
        showModal={false}
        modalLink={modalLink}
      />,
    );
    expect(tree).toMatchSnapshot();
  });

  it("when 'showModal' is toggled, modal should be visible", () => {
    const { rerender, getByTestId } = render(
      <RedirectModal
        hideModal={hideModal}
        showModal={false}
        modalLink={modalLink}
      />,
    );
    expect(getByTestId('redirectModal').props.visible).toBe(false);
    rerender(<RedirectModal showModal={true} />);
    expect(getByTestId('redirectModal').props.visible).toBe(true);
  });

  it('should include title', () => {
    const { getByTestId } = render(
      <RedirectModal
        hideModal={hideModal}
        showModal={false}
        modalLink={modalLink}
      />,
    );
    expect(getByTestId('RM_title').props.children).toBe(modalLink.title);
  });

  it('should include text', () => {
    const { getByTestId } = render(
      <RedirectModal
        hideModal={hideModal}
        showModal={false}
        modalLink={modalLink}
      />,
    );
    expect(getByTestId('RM_text').props.children).toBe(modalLink.text);
  });

  it('should call handler when dismissing modal', () => {
    const { getByTestId } = render(
      <RedirectModal
        hideModal={hideModal}
        showModal={false}
        modalLink={modalLink}
      />,
    );
    getByTestId('redirectModal').props.onBackdropPress();
    expect(hideModal).toHaveBeenCalled();
  });

  it('should open browser when clicking button', () => {
    const { getByTestId } = render(
      <RedirectModal
        hideModal={hideModal}
        showModal={false}
        modalLink={modalLink}
      />,
    );
    fireEvent.press(getByTestId('redirectBtn'));

    expect(hideModal).toHaveBeenCalled();
    expect(Linking.openURL).toHaveBeenCalledWith(modalLink.uri);
  });
});
