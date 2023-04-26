// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

// the code contained in this file is meant to gather information about the
// current state of the questionnaire as well as to create the responseJson that is
// sent to the backend by the user.

// there are a few terms that are used throughout the documentation:

// categories:
// an array holding all first level questionnaire-items (QuestionnaireItem) with linkIds
// that do no contain separators (like "1" or "6" or "15")

// page:
// a page is composed of all sub-items of a category that have
// the identical value as the second position of their linkId. for example:
// all linkIds starting with "1.2" (such as "1.2.1" and "1.2.1.1" and so on) will
// be considered a page

/***********************************************************************************************
imports
***********************************************************************************************/

import '../typedef';
import { appConfig } from '~config';

/***********************************************************************************************
service methods
***********************************************************************************************/

// support functions
/*-----------------------------------------------------------------------------------*/

const operators = {
  EXISTS: 'exists',
  EQUALS: '=',
  UNEQUAL: '!=',
  STRICT_GREATER: '>',
  STRICT_LESS: '<',
  GREATER_OR_EQUAL: '>=',
  LESS_OR_EQUAL: '<=',
};

/**
 * gets an entry of an enableWhen-array (a condition) and returns
 * the correct attribute-name for the conditional answer
 * @param {Condition} condition enableWhen condition
 */
const getEnableWhenAnswerType = (condition) =>
  Object.keys(condition).filter((key) => key.startsWith('answer'))[0];

/**
 * calculates the relative progress of navigating through a category
 * @param  {*} categories: list of all categories, i.e. the first level items
 * @param {number} currentCategoryIndex index of the current category
 * @param {number} currentPageIndex the index of the current page
 */
const calculatePageProgress = (
  categories,
  currentCategoryIndex,
  currentPageIndex,
  questionnaireItemMap,
) => {
  let pageIndex = 0;
  let pageCountRead = 0;
  let pageCountRemaining = 0;

  categories[currentCategoryIndex].item.forEach((item) => {
    if (checkConditionsOfSingleItem(item, questionnaireItemMap)) {
      pageCountRemaining += 1;

      if (pageIndex < currentPageIndex) pageCountRead += 1;
    }
    pageIndex += 1;
  });

  return pageCountRead / pageCountRemaining;
};

/**
 * check if the answer(s) provided by the question object satisfy the condition
 * @param {Condition} condition the condition to check
 * @param {ItemMapEntry} question the itemMap entry with the answer(s) against which the condition is checked
 * @returns {boolean}
 */
const answerSatisfiesCondition = (condition, question) => {
  const answerType = getEnableWhenAnswerType(condition);
  const valueType = answerType.replace('answer', 'value');
  switch (condition.operator) {
    // check if any answer exists (only for boolean types)
    case operators.EXISTS: {
      return question.answer?.length > 0;
    }
    // check for equality
    case operators.EQUALS: {
      if (answerType === 'answerCoding') {
        return (
          question.answer?.findIndex((it) =>
            codingEquals(it.valueCoding, condition.answerCoding),
          ) >= 0
        );
      }
      return (
        question.answer?.findIndex(
          (it) => it[valueType] === condition[answerType],
        ) >= 0
      );
    }
    // check for inequality
    case operators.UNEQUAL: {
      if (answerType === 'answerCoding') {
        return !question.answer?.find((it) =>
          codingEquals(it.valueCoding, condition.answerCoding),
        );
      }
      return !question.answer?.find(
        (it) => it[valueType] === condition[answerType],
      );
    }
    // check if strict greater
    case operators.STRICT_GREATER: {
      if (answerType === 'answerDate' || answerType === 'answerDateTime') {
        return question.answer?.find(
          (it) => new Date(it[valueType]) > new Date(condition[answerType]),
        );
      }
      if (answerType === 'answerTime') {
        const [hoursExpected, minutesExpected] =
          condition.answerTime.split(':');
        return question.answer?.find((it) => {
          const [hours, minutes] = it.valueTime.split(':');
          return (
            new Date(null, null, null, hours, minutes) >
            new Date(null, null, null, hoursExpected, minutesExpected)
          );
        });
      }
      return question.answer?.find(
        (it) => it[valueType] > condition[answerType],
      );
    }
    // check if strict less
    case operators.STRICT_LESS: {
      if (answerType === 'answerDate' || answerType === 'answerDateTime') {
        return question.answer?.find(
          (it) => new Date(it[valueType]) < new Date(condition[answerType]),
        );
      }
      if (answerType === 'answerTime') {
        const [hoursExpected, minutesExpected] =
          condition.answerTime.split(':');
        return question.answer?.find((it) => {
          const [hours, minutes] = it.valueTime.split(':');
          return (
            new Date(null, null, null, hours, minutes) <
            new Date(null, null, null, hoursExpected, minutesExpected)
          );
        });
      }
      return question.answer?.find(
        (it) => it[valueType] < condition[answerType],
      );
    }
    // check if greater or equal
    case operators.GREATER_OR_EQUAL: {
      if (answerType === 'answerDate' || answerType === 'answerDateTime') {
        return question.answer?.find(
          (it) => new Date(it[valueType]) >= new Date(condition[answerType]),
        );
      }
      if (answerType === 'answerTime') {
        const [hoursExpected, minutesExpected] =
          condition.answerTime.split(':');
        return question.answer?.find((it) => {
          const [hours, minutes] = it.valueTime.split(':');
          return (
            new Date(null, null, null, hours, minutes) >=
            new Date(null, null, null, hoursExpected, minutesExpected)
          );
        });
      }
      return question.answer?.find(
        (it) => it[valueType] >= condition[answerType],
      );
    }
    // check if less or equal
    case operators.LESS_OR_EQUAL: {
      if (answerType === 'answerDate' || answerType === 'answerDateTime') {
        return question.answer?.find(
          (it) => new Date(it[valueType]) <= new Date(condition[answerType]),
        );
      }
      if (answerType === 'answerTime') {
        const [hoursExpected, minutesExpected] =
          condition.answerTime.split(':');
        return question.answer?.find((it) => {
          const [hours, minutes] = it.valueTime.split(':');
          return (
            new Date(null, null, null, hours, minutes) <=
            new Date(null, null, null, hoursExpected, minutesExpected)
          );
        });
      }
      return question.answer?.find(
        (it) => it[valueType] <= condition[answerType],
      );
    }
  }
};

// exported functions
/*-----------------------------------------------------------------------------------*/

/**
 * just forms a date into a custom string that is required by the questionnaireResponse
 * @param  {string} date date to transform
 * @param  {boolean} [DMY] if true, outputs dd.mm.yyyy - if not: yyyy-mm-d
 */
const getFormattedDate = (date, DMY) => {
  if (!date) return null;

  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return DMY ? [day, month, year].join('.') : [year, month, day].join('-');
};

/**
 * Check whether the given items are completely answered or not.
 * If present, recursively checks child items as well.
 * @param  {QuestionnaireItem[]} [items] the items property of a questionnaire-item (from the categories-array)
 * @param  {Map<string, QuestionnaireItem>} itemMap the item map with all questions
 */
const checkCompletionStateOfItems = (items, itemMap) => {
  // no items: nothing to check
  if (!items.length) return true;
  let completed;

  // if the item is of type 'ignore' or 'display', or is not required, then it is completed by default
  // also if it is a conditional question and it is not displayed, it also counts as completed
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (
      item.type === 'ignore' ||
      item.type === 'display' ||
      !item.required ||
      !checkConditionsOfSingleItem(item, itemMap)
    ) {
      completed = true;
    } else {
      // when it is a 'group' then it can't have (an) answer(s)
      completed =
        (item.type === 'group' ||
          // otherwise it must have an answer
          itemMap[item.linkId].answer != null) &&
        // if child items exist, check those
        checkCompletionStateOfItems(item.item ?? [], itemMap);
    }
    // if a single item was found that is not completed, immediately return false
    if (!completed) return false;
  }

  return completed;
};

/**
 * Compares two Codings for equality - assuming display is always set and always unique (as it should in all real cases)
 * @param coding1 the first coding to compare
 * @param coding2 the second coding to compare
 * @return {boolean} true if _either_:
 *    a) coding1 and coding2 have both a valid system *and* a valid coding which both are equal _or_
 *    b) coding1 and coding 2 only have display values which are equal
 */
const codingEquals = (coding1, coding2) => {
  if (coding1 && coding2) {
    return (
      (coding1.system &&
        coding1.code &&
        coding2.system &&
        coding2.code &&
        coding1.system === coding2.system &&
        coding1.code === coding2.code) ||
      coding1.display === coding2.display
    );
  }
  return false;
};
/**
 * checks the conditions of a single item (presented through its "enableWhen" property).
 * this basically tells us if the item needs to be rendered or if its answer should have
 * an impact on the completion state of the whole questionnaire
 * @param  {QuestionnaireItem} [item] questionnaire item
 * @param  {Map<string, QuestionnaireItem>} questionnaireItemMap the item map with all questions
 */
const checkConditionsOfSingleItem = (item, questionnaireItemMap) => {
  // if item is supposed to be hidden
  const hiddenExtension = item.extension?.find(
    (it) =>
      it.url === 'http://hl7.org/fhir/StructureDefinition/questionnaire-hidden',
  );
  if (hiddenExtension && hiddenExtension.valueBoolean === true) {
    return false;
  }
  if (item.enableWhen?.length) {
    return !item.enableBehavior || item.enableBehavior === 'all'
      ? // all conditions must be met
        item.enableWhen.every((condition) =>
          answerSatisfiesCondition(
            condition,
            questionnaireItemMap[condition.question],
          ),
        )
      : // at least one condition must be met
        item.enableWhen.some((condition) =>
          answerSatisfiesCondition(
            condition,
            questionnaireItemMap[condition.question],
          ),
        );
  }
  return !!item;
};

/**
 * this creates the document that, as soon as encrypted, will be sent to the backend
 * @param   {Map<string, QuestionnaireItem>} questionnaireItemMap the item map with all questions
 * @param   {QuestionnaireItem[]} categories the list of categories, i.e. first level items
 * @param   {object} FHIRmetadata metadata of the questionnaire
 * @returns {ExportData}
 */
const createResponseJSON = (questionnaireItemMap, categories, FHIRmetadata) => {
  /** persists the information if a trigger was... well, triggered
   * @type {Object.<string, boolean>}
   */
  const triggerMap = {};

  /**
   * traverses a set of items and its children (and so on) and creates the structure
   * that will hold the answers of the questionnaire-response
   * @param  {QuestionnaireItem[]} items the questionnaire-items
   * @returns {QuestionnaireItem[]}
   */
  const createItems = (items) => {
    const newItems = [];

    if (items) {
      items.forEach((item) => {
        /**
         * holds the correct itemdetails
         * @type {ItemMapEntry}
         */
        const itemDetails = questionnaireItemMap[item.linkId];

        // if the conditions of the item are met or if one of the ChildItems provides the necessary answer
        if (
          item.type !== 'display' &&
          checkConditionsOfSingleItem(item, questionnaireItemMap)
        ) {
          /**
           * creates a new item
           * @type {ResponseItem}
           */
          const newItem = {
            linkId: item.linkId,
            text: item.text,
            // if there is a uui it will be coded into the definition-attribute
            ...(itemDetails.definition && {
              definition: itemDetails.definition,
            }),
            answer: itemDetails.answer,
          };

          // if there is an definition and a set answer
          if (itemDetails.definition && itemDetails.answer) {
            // iterates through the rules-set...
            appConfig.defaultRulesConfig.forEach((trigger) => {
              // and creates a property in the trigger-object
              if (!Object.hasOwnProperty.call(triggerMap, trigger.type)) {
                triggerMap[trigger.type] = false;
              }
              // determines if the rule was met...
              Object.keys(trigger.rules).forEach((key) => {
                trigger.rules[key].forEach((possibleAnswer) => {
                  if (possibleAnswer === itemDetails.answer) {
                    triggerMap[trigger.type] = true;
                  }
                });
              });
            });
          }
          if (item.item) {
            if (item.type === 'group') {
              newItem.item = createItems(item.item);
            } else {
              newItem.answer[0].item = createItems(item.item);
            }
          }
          newItems.push(newItem);
        }
      });
    }
    return newItems;
  };

  /**
   * removes empty arrays and null-valued attributes
   * @param  {QuestionnaireItem} rootItem the questionnaire-items
   * @returns {Boolean}
   */
  const cleanItem = (rootItem) => {
    if (Array.isArray(rootItem)) {
      const newRootItem = [];
      rootItem.forEach((item) => {
        if (cleanItem(item)) newRootItem.push(item);
      });
      // eslint-disable-next-line no-param-reassign
      rootItem = [...newRootItem];
      return rootItem.length > 0;
    }

    if (typeof rootItem === 'string' || rootItem instanceof String) {
      return rootItem && rootItem.length && rootItem !== 'NaN-NaN-NaN';
    }

    if (
      (typeof rootItem === 'object' || typeof rootItem === 'function') &&
      rootItem !== null
    ) {
      let hasProperties = false;

      Object.keys(rootItem).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(rootItem, key)) {
          if (!cleanItem(rootItem[key])) {
            // eslint-disable-next-line no-param-reassign
            delete rootItem[key];
          } else {
            hasProperties = true;
          }
        }
      });

      if (rootItem.linkId) {
        return rootItem.item || rootItem.answer ? hasProperties : false;
      }
      return hasProperties;
    }
    return (
      rootItem !== undefined && rootItem !== null && !Number.isNaN(rootItem)
    );
  };

  /**
   * the actual questionnaire response
   * @type {QuestionnaireResponse}
   */
  const questionnaireResponse = {
    authored: new Date().toISOString(),
    item: createItems(categories),
    resourceType: 'QuestionnaireResponse',
    questionnaire: `${FHIRmetadata.url}|${FHIRmetadata.version}`,
    identifier: FHIRmetadata.identifier,
    status: 'completed',
  };

  // removes empty entries
  cleanItem(questionnaireResponse.item);

  // console output
  if (appConfig.logPureResponse) {
    console.log('THE QUESTIONNAIRE-RESPONSE:', questionnaireResponse);
  }
  if (appConfig.logPureResponseJSON) {
    console.log(
      'THE QUESTIONNAIRE-RESPONSE (JSON):',
      JSON.stringify(questionnaireResponse),
    );
  }

  return {
    triggerMap,
    body: JSON.stringify(questionnaireResponse),
  };
};

/***********************************************************************************************
export
***********************************************************************************************/

export default {
  codingEquals,
  getFormattedDate,
  createResponseJSON,
  calculatePageProgress,
  checkConditionsOfSingleItem,
  checkCompletionStateOfItems,
  answerSatisfiesCondition,
};
