import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import translate from '~services/localization';
import config from '~config/configProvider';

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
    ).toBe(config.theme.colors.alert);

    expect(
      getByTestId(`${categories[1].linkId}_icon`).props.children.props.style
        .backgroundColor,
    ).toBe(config.theme.colors.secondary);
    expect(
      getByTestId(`${categories[2].linkId}_icon`).props.children.props.style
        .backgroundColor,
    ).toBe(config.theme.colors.success);
  });
});
