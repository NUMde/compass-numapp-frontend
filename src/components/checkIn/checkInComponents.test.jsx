/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import config from '~config/configProvider';
import { Routes } from '~navigation/constants';
import CheckInListView from './checkInListView';
import WelcomeText from './welcomeText';
import CheckInTiles from './checkInTiles';

describe('checkInListView', () => {
  const navigation = { navigate: jest.fn() };
  it("should render the 'listView'", () => {
    const tree = render(
      <CheckInListView
        done={false}
        started={false}
        firstTime={true}
        dueDate={new Date('Mon Mar 14 2022').toUTCString()}
        navigation={navigation}
      />,
    );
    expect(tree).toMatchSnapshot();
  });

  it("should navigate to 'survey'-screen when clicking the 'listView'", () => {
    const { getByTestId } = render(
      <CheckInListView
        done={false}
        started={false}
        firstTime={true}
        dueDate={new Date('Mon Mar 14 2022').toUTCString()}
        navigation={navigation}
      />,
    );
    fireEvent.press(getByTestId('CheckInListItem'));
    expect(navigation.navigate).toHaveBeenCalledWith(Routes.SURVEY);
  });

  it('backgroundColor should change depending on completion state', () => {
    const { rerender, getByTestId } = render(
      <CheckInListView
        done={false}
        started={false}
        firstTime={true}
        dueDate={new Date('Mon Mar 14 2022').toUTCString()}
        navigation={navigation}
      />,
    );
    expect(getByTestId('padView').props.style).toMatchObject({
      backgroundColor: config.theme.colors.alert,
    });
    rerender(
      <CheckInListView
        done={false}
        started={true}
        firstTime={true}
        dueDate={new Date('Mon Mar 14 2022').toUTCString()}
        navigation={navigation}
      />,
    );
    expect(getByTestId('padView').props.style).toMatchObject({
      backgroundColor: config.theme.colors.secondary,
    });
    rerender(
      <CheckInListView
        done={true}
        started={true}
        firstTime={true}
        dueDate={new Date('Mon Mar 14 2022').toUTCString()}
        navigation={navigation}
      />,
    );
    expect(getByTestId('padView').props.style).toMatchObject({
      backgroundColor: config.theme.colors.success,
    });
  });
});

describe('welcomeText', () => {
  const props = {
    error: null,
    status: 'on-study',
    dueDate: new Date('Wed Mar 16 2022').toUTCString(),
    startDate: new Date('Mon Mar 14 2022').toUTCString(),
    firstTime: true,
    noNewQuestionnaireAvailableYet: true,
  };

  it('should render the welcomeText for firstTime and no questionnaire', () => {
    const tree = render(<WelcomeText {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render the welcomeText for firstTime and questionnaire', () => {
    const tree = render(
      <WelcomeText {...props} noNewQuestionnaireAvailableYet={false} />,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should render the welcomeText for subsequent visits and no questionnaire', () => {
    const tree = render(<WelcomeText {...props} firstTime={false} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render the welcomeText for subsequent visits and questionnaire', () => {
    const tree = render(
      <WelcomeText
        {...props}
        firstTime={false}
        noNewQuestionnaireAvailableYet={false}
      />,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should render the welcomeText when off-study', () => {
    const tree = render(<WelcomeText {...props} status="off-study" />);
    expect(tree).toMatchSnapshot();
  });

  it('should render the welcomeText with failed user updated', () => {
    const { getByTestId } = render(
      <WelcomeText {...props} error={{ failedAction: 'user/UPDATE' }} />,
    );
    expect(getByTestId('user_update_error')).toBeTruthy();
  });

  it('should render the welcomeText with failed submission of report or questionnaire', () => {
    const { getByTestId, rerender } = render(
      <WelcomeText
        {...props}
        error={{ failedAction: 'shared/SEND_QUESTIONNAIRE_RESPONSE' }}
      />,
    );
    expect(getByTestId('submission_error')).toBeTruthy();

    rerender(
      <WelcomeText {...props} error={{ failedAction: 'shared/SEND_REPORT' }} />,
    );
    expect(getByTestId('submission_error')).toBeTruthy();
  });
});

describe('checkInTiles', () => {
  const tilesProps = {
    done: false,
    status: 'on-study',
    sendReport: jest.fn(),
    iterationsLeft: 0,
    categoriesLoaded: true,
    deleteLocalDataAndLogout: jest.fn(),
    noNewQuestionnaireAvailableYet: false,
    exportAndUploadQuestionnaireResponse: jest.fn(),
  };

  it('should render report button but not submit  button', () => {
    const { getByTestId, queryByTestId } = render(
      <CheckInTiles {...tilesProps} />,
    );
    expect(queryByTestId('send_response_btn')).not.toBeTruthy();
    expect(getByTestId('send_report_btn')).toBeTruthy();
    expect(getByTestId('send_report_btn').props.style).toMatchObject({
      backgroundColor: config.theme.values.defaultDisabledTile,
    });
  });

  it("when clicking 'sendReport' button should fire", () => {
    const { getByTestId } = render(<CheckInTiles {...tilesProps} />);
    fireEvent.press(getByTestId('send_report_btn'));
    expect(tilesProps.sendReport).toHaveBeenCalled();
  });

  it("should render 'submitButton' when questionnaire is completed", () => {
    const { getByTestId } = render(
      <CheckInTiles {...tilesProps} done={true} />,
    );
    const submitButton = getByTestId('send_response_btn');
    expect(submitButton).toBeTruthy();
    fireEvent.press(submitButton);
    expect(tilesProps.exportAndUploadQuestionnaireResponse).toHaveBeenCalled();
  });

  it("should render 'deleteAll' button at the end of the study", () => {
    const { getByTestId } = render(
      <CheckInTiles
        {...tilesProps}
        noNewQuestionnaireAvailableYet={true}
        done={false}
        status="off-study"
      />,
    );
    expect(getByTestId('logout_btn')).toBeTruthy();
    fireEvent.press(getByTestId('logout_btn'));
    expect(tilesProps.deleteLocalDataAndLogout).toHaveBeenCalled();
  });
});
