// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React from 'react';
import { renderWithRedux } from '../__utils__/render';

import { RedirectModal } from '../src/components/about';
import QuestionnaireModal from '../src/components/questionnaireModal';
import {
  Banner,
  Spinner,
  ScrollIndicatorWrapper,
} from '../src/components/shared';
import ProgressBar from '../src/components/questionnaireModal/progressbar';

/***********************************************************************************************
tests
***********************************************************************************************/

// these are mostly render tests and can be extended any time ;D

describe('SHARED COMPONENTS:', () => {
  // simple render test
  test('<Banner /> can be rendered', () => {
    // renders the component
    const tree = renderWithRedux(<Banner />);

    // checks if the component matches the snapshot
    expect(tree).toMatchSnapshot();
  });

  // simple render test
  test('<Progressbar /> can be rendered', () => {
    // renders the component
    const tree = renderWithRedux(<ProgressBar />);

    // checks if the component matches the snapshot
    expect(tree).toMatchSnapshot();
  });

  // simple render test
  test('<RedirectModal /> can be rendered', () => {
    // renders the component with mocked props
    const tree = renderWithRedux(
      <RedirectModal
        actions={{ hideModal: () => jest.fn() }}
        modalLink={{ title: 'test-string' }}
      />,
    );

    // checks if the component matches the snapshot
    expect(tree).toMatchSnapshot();
  });

  // simple render test
  test('<QuestionnaireModal /> can be rendered', () => {
    // renders the component
    const tree = renderWithRedux(<QuestionnaireModal />);

    // checks if the component matches the snapshot
    expect(tree).toMatchSnapshot();
  });

  // simple render test
  test('<ScrollIndicatorWrapper /> can be rendered', () => {
    // renders the component
    const tree = renderWithRedux(<ScrollIndicatorWrapper />);

    // checks if the component matches the snapshot
    expect(tree).toMatchSnapshot();
  });

  // simple render test
  test('<Spinner /> can be rendered', () => {
    // renders the component
    const tree = renderWithRedux(<Spinner />);

    // checks if the component matches the snapshot
    expect(tree).toMatchSnapshot();
  });
});
