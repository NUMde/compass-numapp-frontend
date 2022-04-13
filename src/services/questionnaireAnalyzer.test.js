import itemMap from '../../__mocks__/questionnaire/itemMap';
import emptyItemMap from '../../__mocks__/questionnaire/emptyItemMap';
import categories from '../../__mocks__/questionnaire/categories';
import expectedResponse from '../../__mocks__/questionnaire/expectedResponse';
import analyzer from './questionnaireAnalyzer';

describe('codingEquals', () => {
  const codingA = {
    system: 'systemA',
    code: 'codeA',
    display: 'displayA',
  };
  const codingB = {
    system: 'systemB',
    code: 'codeB',
    display: 'displayB',
  };

  it('completely different codings should not be equal', () => {
    expect(analyzer.codingEquals(codingA, codingB)).not.toBe(true);
  });

  it('coding should be equal to itself', () => {
    expect(analyzer.codingEquals(codingA, codingA)).toBe(true);
  });

  it('coding should not be equal to undefined', () => {
    expect(analyzer.codingEquals(codingA, undefined)).not.toBe(true);
  });

  it('different codes from same system should not be equal', () => {
    expect(
      analyzer.codingEquals(codingA, { ...codingB, system: 'systemA' }),
    ).not.toBe(true);
  });

  it('when noting else is present equality depends on display value', () => {
    expect(
      analyzer.codingEquals({ display: 'displayA' }, { display: 'displayA' }),
    ).toBe(true);
    expect(
      analyzer.codingEquals({ display: 'displayA' }, { display: 'displayB' }),
    ).not.toBe(true);
  });

  it('same display from different systems should be equal', () => {
    expect(
      analyzer.codingEquals(codingA, { ...codingB, display: 'displayA' }),
    ).toBe(true);
  });
});

describe('getFormattedDate', () => {
  it('should return null when no date value was passed', () => {
    expect(analyzer.getFormattedDate(null)).toBe(null);
  });

  it('format correctly in yyyy-MM-dd format', () => {
    expect(analyzer.getFormattedDate('Mon Oct 10 2022')).toBe('2022-10-10');
  });

  it('should format correctly in dd.MM.yyyy', () => {
    expect(analyzer.getFormattedDate('Mon Oct 10 2022', true)).toBe(
      '10.10.2022',
    );
  });

  it('should add leading zero to day and month', () => {
    expect(analyzer.getFormattedDate('Sat Jan 1 2022', true)).toBe(
      '01.01.2022',
    );
  });
});

describe('createResponseJSON', () => {
  it('should create the response object which should match the expected JSON', () => {
    const metadata = {
      url: 'http://hl7.org/fhir/Questionnaire/Fragebogen_COMPASS_Beispiel',
    };
    const responseObject = JSON.parse(
      analyzer.createResponseJSON(itemMap, categories, metadata).body,
    );
    expect(responseObject).toMatchObject(expectedResponse);

    expect(responseObject.authored).toMatch(
      new RegExp(new Date().toISOString().split('T')[0]),
    );
  });
});

describe('calculatePageProgress', () => {
  it('should calculate page progress', () => {
    expect(analyzer.calculatePageProgress(categories, 0, 0, itemMap)).toBe(0);
    expect(
      analyzer.calculatePageProgress(categories, 0, 5, itemMap),
    ).toBeCloseTo(0.25);
  });
});

describe('checkDependenciesOfSingleItem', () => {
  it('all dependencies should be fulfilled', () => {
    expect(analyzer.checkDependenciesOfSingleItem(categories[0], itemMap)).toBe(
      true,
    );
  });

  it('not all dependencies should be fulfilled', () => {
    const item = {
      linkId: 1.1,
      type: 'string',
      enableWhen: [
        { question: '1.1', operator: '=', answerString: 'not available' },
      ],
      enableBehavior: 'any',
    };
    expect(analyzer.checkDependenciesOfSingleItem(item, itemMap)).toBe(false);
  });

  it('when at least one requirement is fulfilled, show question', () => {
    const item = {
      linkId: 1.1,
      type: 'string',
      enableWhen: [
        { question: '1.1', operator: '=', answerString: 'not available' },
        { question: '1.1', operator: '=', answerString: 'text' },
      ],
      enableBehavior: 'any',
    };
    expect(analyzer.checkDependenciesOfSingleItem(item, itemMap)).toBe(true);
  });

  it("when both requirements are not fulfilled, don't show question", () => {
    const item = {
      linkId: 1.1,
      type: 'string',
      enableWhen: [
        { question: '1.1', operator: '=', answerString: 'not available' },
        { question: '1.1', operator: '=', answerString: 'text' },
      ],
      enableBehavior: 'all',
    };
    expect(analyzer.checkDependenciesOfSingleItem(item, itemMap)).toBe(false);
  });
});

describe('checkCompletionStateOfItems', () => {
  it('all items should be completed', () => {
    expect(analyzer.checkCompletionStateOfItems(categories, itemMap)).toBe(
      true,
    );
  });

  it('no item (except not required ones) should be completed', () => {
    expect(analyzer.checkCompletionStateOfItems(categories, emptyItemMap)).toBe(
      false,
    );
  });
});
