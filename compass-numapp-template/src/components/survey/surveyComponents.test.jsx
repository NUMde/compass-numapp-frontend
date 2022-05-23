import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import translate from '~services/localization';
import { theme } from '~config';

import emptyItemMap from '__mocks__/questionnaire/emptyItemMap';
import allCategories from '__mocks__/questionnaire/categories';
import en from '~CUSTOMIZATION/translations/en';

import CategoriesList from './categoriesList';

describe('categoriesList', () => {
  const categories = [
    { linkId: '1', text: 'item1' },
    { linkId: '2', text: 'item2' },
    { linkId: '3', text: 'item3' },
  ];
  const itemMap = {
    1: { done: false, started: false },
    2: { done: false, started: true },
    3: { done: true, started: true },
  };

  const showQuestionnaireModal = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the categories list', () => {
    const tree = render(
      <CategoriesList
        categories={categories}
        itemMap={itemMap}
        showQuestionnaireModal={showQuestionnaireModal}
      />,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should open the modal when clicking category', () => {
    const { getByText } = render(
      <CategoriesList
        categories={categories}
        itemMap={itemMap}
        showQuestionnaireModal={showQuestionnaireModal}
      />,
    );
    fireEvent.press(getByText(categories[0].text));
    expect(showQuestionnaireModal).toHaveBeenCalledWith(0);
    fireEvent.press(getByText(categories[1].text));
    expect(showQuestionnaireModal).toHaveBeenCalledWith(1);
  });

  it('a11y hints should match', () => {
    const { getByA11yLabel } = render(
      <CategoriesList
        categories={categories}
        itemMap={itemMap}
        showQuestionnaireModal={showQuestionnaireModal}
      />,
    );

    expect(getByA11yLabel(categories[0].text)).toBeTruthy();
    expect(getByA11yLabel(categories[0].text).props.accessibilityHint).toBe(
      translate('accessibility').questionnaire.categoryCellHint +
        translate('accessibility').questionnaire.category +
        translate('accessibility').questionnaire.notStarted,
    );

    expect(getByA11yLabel(categories[1].text)).toBeTruthy();
    expect(getByA11yLabel(categories[1].text).props.accessibilityHint).toBe(
      translate('accessibility').questionnaire.categoryCellHint +
        translate('accessibility').questionnaire.category +
        translate('accessibility').questionnaire.notFinished,
    );

    expect(getByA11yLabel(categories[2].text)).toBeTruthy();
    expect(getByA11yLabel(categories[2].text).props.accessibilityHint).toBe(
      translate('accessibility').questionnaire.categoryCellHint +
        translate('accessibility').questionnaire.category +
        translate('accessibility').questionnaire.finished,
    );
  });

  it('chevrons should match', () => {
    const { getByTestId } = render(
      <CategoriesList
        categories={categories}
        itemMap={itemMap}
        showQuestionnaireModal={showQuestionnaireModal}
      />,
    );

    expect(
      getByTestId(`${categories[0].linkId}_icon`).props.children.props.style
        .backgroundColor,
    ).toBe(theme.colors.alert);

    expect(
      getByTestId(`${categories[1].linkId}_icon`).props.children.props.style
        .backgroundColor,
    ).toBe(theme.colors.secondary);
    expect(
      getByTestId(`${categories[2].linkId}_icon`).props.children.props.style
        .backgroundColor,
    ).toBe(theme.colors.success);
  });

  it('should toggle accordion', () => {
    const { getAllByA11yHint, queryByText } = render(
      <CategoriesList
        categories={allCategories}
        itemMap={emptyItemMap}
        showQuestionnaireModal={showQuestionnaireModal}
      />,
    );
    const [icon1, icon2] = getAllByA11yHint(
      en.accessibility.questionnaire.expandCategory,
    );
    expect(queryByText(/Freitext/)).toBeFalsy();
    fireEvent.press(icon1);
    expect(queryByText(/Freitext/)).toBeTruthy();
    fireEvent.press(icon2);
    expect(queryByText(/Freitext/)).toBeFalsy();
    expect(queryByText(/Slider/)).toBeTruthy();
    fireEvent.press(icon2);
    expect(queryByText(/Slider/)).toBeFalsy();
  });

  it('should open modal at chosen item', () => {
    const { getAllByA11yHint, queryByText } = render(
      <CategoriesList
        categories={allCategories}
        itemMap={emptyItemMap}
        showQuestionnaireModal={showQuestionnaireModal}
      />,
    );
    const icon1 = getAllByA11yHint(
      en.accessibility.questionnaire.expandCategory,
    )[0];
    expect(queryByText(/Freitext/)).toBeFalsy();
    fireEvent.press(icon1);
    expect(queryByText(/Freitext/)).toBeTruthy();
    fireEvent.press(queryByText(/Freitext/));
    expect(showQuestionnaireModal).toHaveBeenCalledWith(0, 1);
  });
});
