import React from 'react';

import { renderWithRedux } from '__test-utils__/render';

import emptyItemMap from '__mocks__/questionnaire/emptyItemMap';

import QuestionnaireItem from './questionnaireItem';

describe('QuestionnaireItem', () => {
  it('should render a group with all possible item types', () => {
    const { getByTestId, getByText, queryByText, getAllByTestId } =
      renderWithRedux(<QuestionnaireItem item={emptyItemMap['1']} />, {
        initialState: { Questionnaire: { itemMap: emptyItemMap } },
      });

    expect(getByText(/Fragegruppe 1/)).toBeTruthy();
    expect(getByText(/Freitextabfrage/)).toBeTruthy();
    expect(getByText(/Ganzzahlenabfrage/)).toBeTruthy();
    expect(getByText(/Dezimalzahlenabfrage/)).toBeTruthy();
    expect(getByText(/Choice-Abfrage mit Repeat/)).toBeTruthy();
    expect(getByText(/boolsche Abfrage/)).toBeTruthy();
    expect(getByText(/informative Anzeige/)).toBeTruthy();
    expect(getByText(/Datumsabfrage/)).toBeTruthy();
    expect(getAllByTestId('chosenDate')).toBeTruthy();
    expect(getByText(/Slider-Abfrage/)).toBeTruthy();
    expect(getByTestId('Slider')).toBeTruthy();
    expect(queryByText(/nur bei erwarteter Eingabe angezeigt/)).toBeFalsy();
  });
});
