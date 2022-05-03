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
import config from '~config/configProvider';

/***********************************************************************************************
service methods
***********************************************************************************************/

// support functions
/*-----------------------------------------------------------------------------------*/

/**
 * gets an entry of an enableWhen-array (a condition) and returns
 * the correct attribute-name for the conditional answer
 * @param {Condition} condition enableWhen condition
 */
const getEnableWhenAnswerType = (condition) =>
  Object.keys(condition).filter((key) => key.startsWith('answer'))[0];

/**
 * checks if the questions mentioned in the enableWhen-conditions were even answered.
 * if not, the condition is automatically not set. this is due to the fact that right now
 * only the-comparison-operator ("=") is available for conditional rendering
 * @param  {QuestionnaireItem} item questionnaire item
 * @param {Map<string, QuestionnaireItem>} questionnaireItemMap
 */
const checkIfAnswersToConditionsAreAvailable = (item, questionnaireItemMap) => {
  /** return value of the function, tells if answer conditions are available */
  let available;

  // if enableBehavior is "all" (or not set)
  if (
    !item.enableBehavior ||
    (item.enableBehavior && item.enableBehavior === 'all')
  ) {
    // the default result
    available = true;

    // iterates over all conditions
    item.enableWhen.forEach((condition) => {
      // sets the return value to FALSE should a single condition not be met
      if (!questionnaireItemMap[condition.question].answer) {
        available = false;
      }
    });

    return available;
  }
  // if enableBehavior is "any"

  // the default result
  available = false;

  // iterates over all conditions
  item.enableWhen.forEach((condition) => {
    // sets the return value to TRUE if a single condition is met
    if (questionnaireItemMap[condition.question].answer) available = true;
  });

  return available;
};

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
    if (checkDependenciesOfSingleItem(item, questionnaireItemMap)) {
      pageCountRemaining += 1;

      if (pageIndex < currentPageIndex) pageCountRead += 1;
    }
    pageIndex += 1;
  });

  return pageCountRead / pageCountRemaining;
};

/**
 * checks the validity of a single item and returns it. should the item contain subitems, then those will
 * also be checked by executing "traverseItems()" on those subitems.
 * @param {QuestionnaireItem} item questionnaire-item
 * @param {Map<string, QuestionnaireItem>} questionnaireItemMap
 */
const checkItem = (item, questionnaireItemMap) => {
  /** return value of the function, speaks about the validity of an item */
  let completed = false;

  // if this item needs to be ignored
  if (
    item.type === 'ignore' ||
    item.type === 'display' ||
    !item.required ||
    !checkDependenciesOfSingleItem(item, questionnaireItemMap)
  ) {
    completed = true;
  } else {
    completed =
      // when it is a 'group' then it can't have (an) answer(s)
      (item.type === 'group' ||
        // otherwise it must have an answer
        questionnaireItemMap[item.linkId].answer != null) &&
      // if child items exist, check those
      traverseItems(item.item ?? [], questionnaireItemMap);
  }

  return completed;
};

/**
 * traverses all sub-items of an item (located in the "items"-attribute of said item)
 * and then checks for their validity. executes the "checkItem" function for each
 * valid item.
 * @param  {QuestionnaireItem[]} elements the items-array of a questionnaire-item
 * @param  {Map<string, QuestionnaireItem>} questionnaireItemMap
 */
const traverseItems = (elements, questionnaireItemMap) => {
  /**
   * return value of the function, shows the validity of a set ob subItems
   */
  let validityOfTraversedItems = true;

  elements.forEach((item) => {
    // if an enableWhen property is present...
    if (item.enableWhen) {
      // ... and no enableBehavior is not set (or it is set to "all")
      if (
        !item.enableBehavior ||
        item.enableWhen.length === 0 ||
        (item.enableBehavior && item.enableBehavior === 'all')
      ) {
        // iterates over all conditions
        item.enableWhen.forEach((condition) => {
          const requiredAnswer = getEnableWhenAnswerType(condition);
          if (
            // if the condition provides an array of answers and the needed answer is among then OR there is only one answer and it matches
            questionnaireItemMap[condition.question].answer?.find(
              (entry) =>
                entry?.[requiredAnswer.replace('answer', 'value')] ===
                condition[requiredAnswer],
            ) &&
            // and the item is not valid
            !checkItem(item, questionnaireItemMap)
          ) {
            // if not all conditions are met, the item is invalid
            validityOfTraversedItems = false;
          }
        });
      } else {
        /**
         * the validity for this item (by default: false)
         */
        let itemValidityAny = false;

        /**
         * will be set to TRUE if a single condition is met
         */
        let aChangeOccurred = false;

        // iterates over all conditions
        item.enableWhen.forEach((condition) => {
          const requiredAnswer = getEnableWhenAnswerType(condition);
          if (
            // if the condition provides an array of answers and the current answer is among then
            questionnaireItemMap[condition.question].answer?.find((entry) => {
              return (
                entry[requiredAnswer.replace('answer', 'value')] ===
                condition[requiredAnswer]
              );
            })
          ) {
            // if the condition is met
            aChangeOccurred = true;
            // if the content checks out, set itemValidityAny to true
            if (checkItem(item, questionnaireItemMap)) itemValidityAny = true;
          }
        });

        // if no item met the conditions... then the question will never be rendered and is therefor not invalid, meaning TRUE
        if (!aChangeOccurred) itemValidityAny = true;

        // if nothing checks out
        if (!itemValidityAny) validityOfTraversedItems = false;
      }
    }
    // if no enableWhen property (meaning no condition must be met)
    else if (!checkItem(item, questionnaireItemMap)) {
      // set the validity to false if the item does not checks out
      validityOfTraversedItems = false;
    }
  });

  return validityOfTraversedItems;
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
 * tells you if an item is completely answered or not.
 * it takes the "items"-property of a category (or none at all if the whole questionnaire
 * needs to be checked) and iterates over all active (as in they met their enableWhen-conditions)
 * sub-items to check if they are valid.
 * @param  {QuestionnaireItem[]} [items] the items property of a questionnaire-item (from the categories-array)
 * @param  {Map<string, QuestionnaireItem>} itemMap the item map with all questions
 */
const checkCompletionStateOfItems = (items, itemMap) => {
  /** return value of the function */
  let completed = true;

  // sets the returnValue to false if a single item does not check out
  items.forEach((item) => {
    if (!checkItem(item, itemMap)) completed = false;
  });

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
 * checks the dependencies of a single item (presented through its "enableWhen" property).
 * this basically tells us if the items needs to be rendered or if its answer should have
 * an impact on the completion state of the whole questionnaire
 * @param  {QuestionnaireItem} [item] questionnaire item
 * @param  {Map<string, QuestionnaireItem>} questionnaireItemMap the item map with all questions
 */
const checkDependenciesOfSingleItem = (item, questionnaireItemMap) => {
  // if item is supposed to be hidden
  const hiddenExtension = item.extension?.find(
    (it) =>
      it.url === 'http://hl7.org/fhir/StructureDefinition/questionnaire-hidden',
  );
  if (hiddenExtension && hiddenExtension.valueBoolean === true) {
    return false;
  }
  if (item && item.enableWhen) {
    // if the item has a set of conditions
    // checks if the items mentioned in the conditions are even answered...
    if (!checkIfAnswersToConditionsAreAvailable(item, questionnaireItemMap)) {
      // ...if not, the returnValue is set to FALSE - game over
      return false;
    }
    if (item.enableWhen.length !== 0) {
      const elementTestCallback = (condition) => {
        const answerType = getEnableWhenAnswerType(condition);
        const expected = condition[answerType];
        const question = questionnaireItemMap[condition.question];

        if (answerType === 'answerCoding') {
          return question.answer?.find((it) =>
            codingEquals(it.valueCoding, expected),
          );
        }
        return question.answer?.find(
          (it) => it?.[answerType.replace('answer', 'value')] === expected,
        );
      };
      return !item.enableBehavior || item.enableBehavior === 'all'
        ? item.enableWhen.every(elementTestCallback)
        : item.enableWhen.some(elementTestCallback);
    }
  }
  // if there is no condition (but at least something)...
  else if (item) {
    // ... then it technically meets its conditions
    return true;
  }
  // no
  return false;
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
          checkDependenciesOfSingleItem(item, questionnaireItemMap) &&
          item.type !== 'display'
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
            config.appConfig.defaultRulesConfig.forEach((trigger) => {
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
    questionnaire: FHIRmetadata.url,
    identifier: FHIRmetadata.identifier,
    status: 'completed',
  };

  // removes empty entries
  cleanItem(questionnaireResponse.item);

  // console output
  if (config.appConfig.logPureResponse) {
    console.log('THE QUESTIONNAIRE-RESPONSE:', questionnaireResponse);
  }
  if (config.appConfig.logPureResponseJSON) {
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
  checkDependenciesOfSingleItem,
  checkCompletionStateOfItems,
};
