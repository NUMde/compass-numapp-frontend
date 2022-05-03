import React from 'react';

import {
  renderWithRedux,
  fireEvent,
  within,
  waitFor,
} from '__test-utils__/render';
import emptyItemMap from '__mocks__/questionnaire/emptyItemMap';
import categories from '__mocks__/questionnaire/categories';
import cloneDeep from 'lodash.clonedeep';
import en from '~CUSTOMIZATION/translations/en';

import config from '~config/configProvider';

import QuestionnaireModal from './questionnaireModal';

const initialState = {
  Questionnaire: {
    itemMap: emptyItemMap,
    categories,
    categoryIndex: 0,
    pageIndex: 1,
  },
};

describe('Questionnaire Modal', () => {
  it("should render the questionnaireModal in the 'hidden state' (no item,no BottomBar)", () => {
    const { queryByTestId, getByTestId } = renderWithRedux(
      <QuestionnaireModal />,
    );
    expect(getByTestId('QuestionnaireModal').props.visible).toBe(false);
    expect(queryByTestId(/QuestionnaireItem/)).toBeFalsy();
    expect(queryByTestId('BottomBar')).toBeFalsy();
  });

  it('should render the questionnaireModal with first item of first category', () => {
    const { getByTestId, getByText } = renderWithRedux(<QuestionnaireModal />, {
      initialState,
    });
    expect(getByTestId('QuestionnaireModal').props.visible).toBe(true);
    expect(getByText(/Freitextabfrage/)).toBeTruthy();
    expect(getByTestId('BottomBar')).toBeTruthy();
  });

  it("when answer is provided, 'confirm button' should change appearance", async () => {
    const { getByTestId, getByText } = renderWithRedux(<QuestionnaireModal />, {
      initialState,
    });
    expect(getByTestId('QuestionnaireModal').props.visible).toBe(true);
    expect(getByText(/Freitextabfrage/)).toBeTruthy();
    const input = getByTestId('BasicInput.Input');
    expect(input).toBeTruthy();
    const icon = within(getByTestId('BottomBar_confirm_btn')).getByTestId(
      'iconIcon',
    );
    expect(icon.parent.parent.parent.props.style.backgroundColor).toBe(
      config.theme.colors.accent4,
    );

    fireEvent.changeText(input, 'some text');

    expect(input.props.value).toBe('some text');
    await waitFor(() =>
      expect(icon.parent.parent.parent.props.style.backgroundColor).toBe(
        config.theme.colors.success,
      ),
    );
  });

  it('providing required answer should enable conditional question', async () => {
    const localState = cloneDeep(initialState);
    localState.Questionnaire.pageIndex = 15;
    localState.Questionnaire.itemMap['1.15.1'] = {
      linkId: '1.15.1',
      text: 'Abfrage Dezimalzahl (erwartet = 1.5)',
      type: 'decimal',
      required: true,
      answer: [{ valueDecimal: 1.5 }],
      done: true,
    };
    const {
      getByText,
      getByA11yLabel,
      queryByA11yLabel,
      getAllByA11yHint,
      findByA11yLabel,
    } = renderWithRedux(<QuestionnaireModal />, {
      initialState: localState,
    });
    expect(getByText(/Bedingte Abfrage/)).toBeTruthy();
    expect(getByText(/nur bei erwarteter Eingabe/)).toBeTruthy();
    expect(
      queryByA11yLabel(en.accessibility.questionnaire.middleButtonFinished),
    ).toBeFalsy();
    expect(
      getByA11yLabel(en.accessibility.questionnaire.middleButtonUnfinished),
    ).toBeTruthy();

    const conditionalInput = getAllByA11yHint(
      en.accessibility.questionnaire.textFieldHint,
    )[1];
    fireEvent.changeText(conditionalInput, 'abc');

    await findByA11yLabel(en.accessibility.questionnaire.middleButtonFinished);

    expect(
      queryByA11yLabel(en.accessibility.questionnaire.middleButtonUnfinished),
    ).toBeFalsy();
  });

  it("should navigate to next question when clicking 'confirm button'", async () => {
    const { getByTestId, getByText } = renderWithRedux(<QuestionnaireModal />, {
      initialState,
    });
    const confirmButton = getByTestId('BottomBar_confirm_btn');
    fireEvent.press(confirmButton);

    await waitFor(() => expect(getByText(/Datumsabfrage/)).toBeTruthy());
    expect(getByTestId('chosenDate')).toBeTruthy();
  });

  it("should navigate to next question when clicking 'forward button'", async () => {
    const { getByTestId, getByText } = renderWithRedux(<QuestionnaireModal />, {
      initialState,
    });
    const confirmButton = getByTestId('BottomBar_fwd_btn');
    fireEvent.press(confirmButton);

    await waitFor(() => expect(getByText(/Datumsabfrage/)).toBeTruthy());
    expect(getByTestId('chosenDate')).toBeTruthy();
  });

  it("should navigate to previous question when clicking 'back button'", async () => {
    const modifiedInitialState = { ...initialState };
    modifiedInitialState.Questionnaire.pageIndex = 2;
    const { getByTestId, getByText } = renderWithRedux(<QuestionnaireModal />, {
      initialState,
    });
    () => expect(getByText(/Datumsabfrage/)).toBeTruthy();
    const backButton = getByTestId('BottomBar_back_btn');
    fireEvent.press(backButton);

    await waitFor(() => expect(getByText(/Freitext/)).toBeTruthy());
  });

  it("should close the modal when clicking 'close button'", async () => {
    const { getByTestId, queryByTestId } = renderWithRedux(
      <QuestionnaireModal />,
      {
        initialState,
      },
    );
    const closeButton = getByTestId('QuestionnaireModal_close');
    fireEvent.press(closeButton);

    await waitFor(() =>
      expect(getByTestId('QuestionnaireModal').props.visible).toBe(false),
    );
    expect(queryByTestId('BottomBar')).toBeFalsy();
  });

  it("should close the modal when clicking 'confirm button' on last page", async () => {
    const modifiedInitialState = { ...initialState };
    modifiedInitialState.Questionnaire.pageIndex = 23;
    const { getByTestId, queryByTestId } = renderWithRedux(
      <QuestionnaireModal />,
      {
        initialState: modifiedInitialState,
      },
    );

    const confirmButton = getByTestId('BottomBar_confirm_btn');
    fireEvent.press(confirmButton);

    await waitFor(() =>
      expect(getByTestId('QuestionnaireModal').props.visible).toBe(false),
    );
    expect(queryByTestId('BottomBar')).toBeFalsy();
  });

  it('should skip questions whose dependencies are not met', async () => {
    const modifiedInitialState = { ...initialState };
    modifiedInitialState.Questionnaire.pageIndex = 11;
    const { getByTestId, getByText } = renderWithRedux(<QuestionnaireModal />, {
      initialState: modifiedInitialState,
    });
    expect(getByText(/Choice-Abfrage/)).toBeTruthy();
    const confirmButton = getByTestId('BottomBar_confirm_btn');
    fireEvent.press(confirmButton);

    await waitFor(() => expect(getByText(/Abfrage Dezimalzahl/)).toBeTruthy());
  });

  it('should skip questions whose dependencies are not met (backwards)', async () => {
    const modifiedInitialState = { ...initialState };
    modifiedInitialState.Questionnaire.pageIndex = 15;
    const { getByTestId, getByText } = renderWithRedux(<QuestionnaireModal />, {
      initialState: modifiedInitialState,
    });
    expect(getByText(/Abfrage Dezimalzahl/)).toBeTruthy();
    const backButton = getByTestId('BottomBar_back_btn');
    fireEvent.press(backButton);

    await waitFor(() => expect(getByText(/Choice-Abfrage/)).toBeTruthy());
  });

  it('should render the modal with the progressBar', () => {
    const modifiedInitialState = { ...initialState };
    modifiedInitialState.Questionnaire.pageIndex = 2;
    config.appConfig.useProgressBar = true;
    const { getByTestId, toJSON } = renderWithRedux(<QuestionnaireModal />, {
      initialState,
    });
    expect(getByTestId('progressBar')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });
});
