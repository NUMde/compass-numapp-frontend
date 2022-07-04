import itemMap from '__mocks__/questionnaire/itemMap';
import emptyItemMap from '__mocks__/questionnaire/emptyItemMap';
import categories from '__mocks__/questionnaire/categories';
import expectedResponse from '__mocks__/questionnaire/expectedResponse';
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
    ).toBeCloseTo(0.56);
  });
});

describe('checkConditionsOfSingleItem', () => {
  it('when item has no condition, it should always be displayed', () => {
    expect(analyzer.checkConditionsOfSingleItem(categories[0], itemMap)).toBe(
      true,
    );
  });

  it('should return false when not at least one condition is met', () => {
    const item = {
      linkId: 1.1,
      type: 'string',
      enableWhen: [
        { question: '1.1', operator: '=', answerString: 'not available' },
        {
          question: '3.4',
          operator: '=',
          answerCoding: {
            system: 'http://num-compass.science',
            code: 'B',
            display: 'Beta',
          },
        },
      ],
      enableBehavior: 'any',
    };
    expect(analyzer.checkConditionsOfSingleItem(item, itemMap)).toBe(false);
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
    expect(analyzer.checkConditionsOfSingleItem(item, itemMap)).toBe(true);
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
    expect(analyzer.checkConditionsOfSingleItem(item, itemMap)).toBe(false);
  });

  it('when all conditions must be met and are met, show question', () => {
    const item = {
      linkId: 1.1,
      type: 'string',
      enableWhen: [
        { question: '1.1', operator: '=', answerString: 'text' },
        {
          question: '3.4',
          operator: '=',
          answerCoding: {
            system: 'http://num-compass.science',
            code: 'A',
            display: 'Alpha',
          },
        },
      ],
      enableBehavior: 'all',
    };
    expect(analyzer.checkConditionsOfSingleItem(item, itemMap)).toBe(true);
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

describe('answerSatisfiesCondition', () => {
  // exists
  it('should return true when answer exists', () => {
    const condition = { operator: 'exists', answerBoolean: true };
    const question = { answer: [{ valueBoolean: false }] };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeTruthy();
  });

  it('should return false when answer does not exist', () => {
    const condition = { operator: 'exists', answerBoolean: false };
    const question = { answer: null };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeFalsy();
  });

  // equality
  it('should return true when coding equals', () => {
    const condition = {
      operator: '=',
      answerCoding: { system: 'systemA', code: 'codeA', display: 'codeA' },
    };
    const question = {
      answer: [
        { valueCoding: { system: 'systemA', code: 'codeA', display: 'codeA' } },
      ],
    };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeTruthy();
  });

  it('should return false when coding does not equal', () => {
    const condition = {
      operator: '=',
      answerCoding: { system: 'systemA', code: 'codeB', display: 'codeB' },
    };
    const question = {
      answer: [
        { valueCoding: { system: 'systemA', code: 'codeA', display: 'codeA' } },
      ],
    };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeFalsy();
  });

  it('should return true when string equals', () => {
    const condition = { operator: '=', answerString: 'text' };
    const question = { answer: [{ valueString: 'text' }] };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeTruthy();
  });

  it('should return false when string not equals but expected to be to', () => {
    const condition = { operator: '=', answerString: 'text' };
    const question = { answer: [{ valueString: 'text2' }] };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeFalsy();
  });

  // inequality

  it('should return true when coding does not equal', () => {
    const condition = {
      operator: '!=',
      answerCoding: { system: 'systemA', code: 'codeA', display: 'codeA' },
    };
    const question = {
      answer: [
        { valueCoding: { system: 'systemA', code: 'codeB', display: 'codeB' } },
      ],
    };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeTruthy();
  });

  it('should return false when coding does equal but should not equal', () => {
    const condition = {
      operator: '!=',
      answerCoding: { system: 'systemA', code: 'codeA', display: 'codeA' },
    };
    const question = {
      answer: [
        { valueCoding: { system: 'systemA', code: 'codeA', display: 'codeA' } },
      ],
    };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeFalsy();
  });

  it('should return true when string not equals', () => {
    const condition = { operator: '!=', answerString: 'text' };
    const question = { answer: [{ valueString: 'text2' }] };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeTruthy();
  });

  it('should return false when string equals but expected to be not to', () => {
    const condition = { operator: '!=', answerString: 'text' };
    const question = { answer: [{ valueString: 'text' }] };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeFalsy();
  });

  // strict greater
  it('should return true when date greater', () => {
    const condition = { operator: '>', answerDate: '2022-03-14' };
    const question = { answer: [{ valueDate: '2022-03-15' }] };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeTruthy();
  });

  it('should return false when date not greater but expected to be', () => {
    const condition = { operator: '>', answerDate: '2022-03-14' };
    const question = { answer: [{ valueDate: '2022-02-15' }] };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeFalsy();
  });

  it('should return true when number greater', () => {
    const condition = { operator: '>', answerDecimal: 3.5 };
    const question = { answer: [{ valueDecimal: 4.7 }] };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeTruthy();
  });

  it('should return false when number not greater but expected to be', () => {
    const condition = { operator: '>', answerDecimal: 3.5 };
    const question = { answer: [{ valueDecimal: 3.1 }] };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeFalsy();
  });

  it('should return true when time greater', () => {
    const condition = { operator: '>', answerTime: '11:00:00' };
    const question = { answer: [{ valueTime: '11:30:00' }] };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeTruthy();
  });

  it('should return false when time not greater but expected to be to', () => {
    const condition = { operator: '>', answerTime: '12:00:00' };
    const question = { answer: [{ valueTime: '11:30:00' }] };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeFalsy();
  });

  // strict less / smaller
  it('should return true when date smaller', () => {
    const condition = { operator: '<', answerDate: '2022-03-14' };
    const question = { answer: [{ valueDate: '2022-03-13' }] };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeTruthy();
  });

  it('should return false when date not smaller but expected to be', () => {
    const condition = { operator: '<', answerDate: '2022-03-14' };
    const question = { answer: [{ valueDate: '2022-03-15' }] };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeFalsy();
  });

  it('should return true when number smaller', () => {
    const condition = { operator: '<', answerDecimal: 3.5 };
    const question = { answer: [{ valueDecimal: 2.7 }] };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeTruthy();
  });

  it('should return false when number not smaller but expected to be', () => {
    const condition = { operator: '<', answerDecimal: 3.5 };
    const question = { answer: [{ valueDecimal: 3.7 }] };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeFalsy();
  });

  it('should return true when time smaller', () => {
    const condition = { operator: '<', answerTime: '11:00:00' };
    const question = { answer: [{ valueTime: '10:30:00' }] };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeTruthy();
  });

  it('should return false when time not smaller but expected to be', () => {
    const condition = { operator: '<', answerTime: '12:00:00' };
    const question = { answer: [{ valueTime: '12:30:00' }] };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeFalsy();
  });

  // greater or equals
  it('should return true when date greater or equal', () => {
    const condition = { operator: '>=', answerDate: '2022-03-14' };
    const question = { answer: [{ valueDate: '2022-03-15' }] };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeTruthy();
  });

  it('should return false when date not greater or equal but expected to be', () => {
    const condition = { operator: '>=', answerDate: '2022-03-14' };
    const question = { answer: [{ valueDate: '2022-02-15' }] };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeFalsy();
  });

  it('should return true when number greater or equal', () => {
    const condition = { operator: '>=', answerDecimal: 3.5 };
    const question = { answer: [{ valueDecimal: 4.7 }] };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeTruthy();
  });

  it('should return false when number not greater or equal but expected to be', () => {
    const condition = { operator: '>=', answerDecimal: 3.5 };
    const question = { answer: [{ valueDecimal: 3.1 }] };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeFalsy();
  });

  it('should return true when time greater or equal', () => {
    const condition = { operator: '>=', answerTime: '11:00:00' };
    const question = { answer: [{ valueTime: '11:30:00' }] };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeTruthy();
  });

  it('should return false when time not greater or equal but expected to', () => {
    const condition = { operator: '>=', answerTime: '12:00:00' };
    const question = { answer: [{ valueTime: '11:30:00' }] };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeFalsy();
  });

  //  less / smaller or equal
  it('should return true when date smaller or equal', () => {
    const condition = { operator: '<=', answerDate: '2022-03-14' };
    const question = { answer: [{ valueDate: '2022-03-13' }] };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeTruthy();
  });

  it('should return false when date not smaller or equal but expected to be', () => {
    const condition = { operator: '<=', answerDate: '2022-03-14' };
    const question = { answer: [{ valueDate: '2022-03-15' }] };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeFalsy();
  });

  it('should return true when number smaller or equal', () => {
    const condition = { operator: '<=', answerDecimal: 3.5 };
    const question = { answer: [{ valueDecimal: 2.7 }] };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeTruthy();
  });

  it('should return false when number not smaller or equal but expected to be', () => {
    const condition = { operator: '<=', answerDecimal: 3.5 };
    const question = { answer: [{ valueDecimal: 3.7 }] };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeFalsy();
  });

  it('should return true when time smaller or equal', () => {
    const condition = { operator: '<=', answerTime: '12:00:00' };
    const question = { answer: [{ valueTime: '11:30:00' }] };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeTruthy();
  });

  it('should return false when time not smaller or equal but expected to be', () => {
    const condition = { operator: '<=', answerTime: '11:00:00' };
    const question = { answer: [{ valueTime: '11:30:00' }] };
    expect(analyzer.answerSatisfiesCondition(condition, question)).toBeFalsy();
  });
});
