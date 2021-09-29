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

import "../../typedef";
import store from "../../store";
import config from "../../config/configProvider";

/***********************************************************************************************
service methods
***********************************************************************************************/

// support functions
/*-----------------------------------------------------------------------------------*/

/**
 * should a questionnaire item contain the "extension" property, its content
 * is tested as an regular expression. it is used to determine if an item
 * was correctly answered.
 * @param {string} linkId linkId of a questionnaire-item
 */
const checkRegExExtension = (linkId) => {
  const props = store.getState().CheckIn;

  /**
   * the item that owns the extension
   * @type {QuestionnaireItem}
   */
  const item = props.questionnaireItemMap[linkId];

  const itemControlExtension = item?.extension?.find(
    (e) => e.url === "http://hl7.org/fhir/StructureDefinition/regex"
  );

  if (itemControlExtension?.valueString) {
    return RegExp(itemControlExtension.valueString).test(
      props.questionnaireItemMap[item.linkId].answer
    );
  }

  // just returns true if there is no extension
  return true;
};

/**
 * gets an entry of an enableWhen-array (a condition) and returns
 * the correct attribute-name for the conditional answer
 * @param {Condition} condition enableWhen condition
 */
const getEnableWhenAnswerType = (condition) => {
  if (condition.answerString) return "answerString";
  if (condition.answerDate) return "answerDate";
  if (condition.answerTime) return "answerTime";
  if (condition.answerCoding) return "answerCoding";
  if (condition.answerInteger) return "answerInteger";
  if (condition.answerDecimal) return "answerDecimal";
  if (condition.answerBoolean) return "answerBoolean";
  if (condition.answerDateTime) return "answerDateTime";
  return "answerQuantity";
};

/**
 * checks if the questions mentioned in the enableWhen-conditions were even answered.
 * if not, the condition is automatically not set. this is due to the fact that right now
 * only the-comparison-operator ("=") is available for conditional rendering
 * @param  {QuestionnaireItem} item questionnaire item
 */
const checkIfAnswersToConditionsAreAvailable = (item) => {
  /** return value of the function, tells if answer conditions are available */
  let available;

  const props = store.getState().CheckIn;

  // if enableBehavior is "all" (or not set)
  if (
    !item.enableBehavior ||
    (item.enableBehavior && item.enableBehavior === "all")
  ) {
    // the default result
    available = true;

    // iterates over all conditions
    item.enableWhen.forEach((condition) => {
      // sets the return value to FALSE should a single condition not be met
      if (!props.questionnaireItemMap[condition.question].answer)
        available = false;
    });

    return available;
  }
  // if enableBehavior is "any"

  // the default result
  available = false;

  // iterates over all conditions
  item.enableWhen.forEach((condition) => {
    // sets the return value to TRUE if a single condition is met
    if (props.questionnaireItemMap[condition.question].answer) available = true;
  });

  return available;
};

/**
 * calculates the relative progress of navigating through a category
 * @param  {object} [props] props-object of the calling component
 */
const calculatePageProgress = (props) => {
  let pageIndex = 0;
  let pageCountRead = 0;
  let pageCountRemaining = 0;

  props.categories[props.currentCategoryIndex].item.forEach((item) => {
    if (checkDependenciesOfSingleItem(item)) {
      pageCountRemaining += 1;

      if (pageIndex < props.currentPageIndex) pageCountRead += 1;
    }
    pageIndex += 1;
  });

  return pageCountRead / pageCountRemaining;
};

/**
 * checks the validity of a single item and returns it. should the item contain subitems, then those will
 * also be checked by executing "traverseItems()" on those subitems.
 * @param  {QuestionnaireItem} item questionnaire-item
 */
const checkItem = (item, questionnaireItemMap) => {
  /** return value of the function, speaks about the validity of an item */
  let returnValue = false;

  // if this item needs to be ignored
  if (
    item.type === "ignore" ||
    !item.required ||
    item.type === "display" ||
    !checkDependenciesOfSingleItem(item)
  ) {
    returnValue = true;
  }
  // if the item does not met its own regEx
  else if (!checkRegExExtension(item.linkId)) {
    returnValue = false;
  } else {
    // if its a boolean
    if (item.type === "boolean") {
      // boolean are by default always valid (as FALSE is a valid answer).
      // but if it has subItems they must be traversed, and the result of that
      // is the result of the boolean
      returnValue = item.item
        ? traverseItems(item.item, questionnaireItemMap)
        : true;
    }
    // dates, numbers, strings...
    else if (
      item.type === "date" ||
      item.type === "string" ||
      item.type === "integer" ||
      item.type === "decimal" ||
      item.type === "number"
    ) {
      // ...should not be empty -> but 0 is valid value
      returnValue =
        (questionnaireItemMap[item.linkId].answer &&
          questionnaireItemMap[item.linkId].answer !== "") ||
        questionnaireItemMap[item.linkId].answer === 0;
    }
    // if there is no subItem..
    else if (!item.item) {
      // ...we just look up if the answer is still in its initial state (meaning null)
      returnValue = questionnaireItemMap[item.linkId].answer != null;
    }
    // and should there be at least the item-property...
    else {
      // ... traverse it and see if they all check out
      returnValue = traverseItems(item.item, questionnaireItemMap);
    }

    // should the item be of type "choice"...
    if (
      returnValue &&
      (item.type === "choice" || item.type === "open-choice")
    ) {
      // ... and only accept a single answer
      if (!item.repeats) {
        // ... make sure its not NULL
        returnValue = questionnaireItemMap[item.linkId].answer != null;
      }
      // if multiple answers are allowed
      else {
        // make sure there is something
        const isArray =
          Array.isArray(questionnaireItemMap[item.linkId].answer) &&
          questionnaireItemMap[item.linkId].answer.length;
        const hasAdditionalAnswer =
          item.type === "open-choice" &&
          questionnaireItemMap[item.linkId].answerOption.filter(
            (e) => e.isOpenQuestionAnswer
          )[0].answer;
        returnValue = isArray || hasAdditionalAnswer;
      }
    }
  }

  // sets the done property of the item
  // eslint-disable-next-line no-param-reassign
  questionnaireItemMap[item.linkId].done = returnValue;

  return returnValue;
};

/**
 * traverses all sub-items of an item (located in the "items"-attribute of said item)
 * and then checks for their validity. executes the "checkItem" function for each
 * valid item.
 * @param  {QuestionnaireItem[]} elements the items-array of a questionnaire-item
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
        (item.enableBehavior && item.enableBehavior === "all")
      ) {
        // iterates over all conditions
        item.enableWhen.forEach((condition) => {
          if (
            // if the condition provides an array of answers and the needed answer is among then OR there is only one answer and it matches
            ((Array.isArray(questionnaireItemMap[condition.question].answer) &&
              questionnaireItemMap[condition.question].answer.includes(
                condition[getEnableWhenAnswerType(condition)]
              )) ||
              getCorrectlyFormattedAnswer(
                questionnaireItemMap[condition.question]
              ) === condition[getEnableWhenAnswerType(condition)]) &&
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
          if (
            // if the condition provides an array of answers and the current answer is among then
            (Array.isArray(questionnaireItemMap[condition.question].answer) &&
              questionnaireItemMap[condition.question].answer.includes(
                condition[getEnableWhenAnswerType(condition)]
              )) ||
            // OR: there is only one answer and it matches
            getCorrectlyFormattedAnswer(
              questionnaireItemMap[condition.question]
            ) === condition[getEnableWhenAnswerType(condition)]
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

  return DMY ? [day, month, year].join(".") : [year, month, day].join("-");
};

/**
 * this function is used to produce the answer of an item in a corrected
 * way. for example: the format used for dates in the questionnaire is not the same as
 * the one used in this application. to be able to compare those two this function is used
 * to parse the formats.
 * @param  {ItemMapEntry} item item from the the questionnaireItemMap-object
 */
const getCorrectlyFormattedAnswer = (item) => {
  switch (item.type) {
    case "date":
      // formats the Date into yyyy-mm-dd
      return getFormattedDate(String(item.answer));
    case "integer":
      // needed for string comparisons
      return parseInt(String(item.answer), 10);
    case "decimal":
      // needed for string comparisons
      return parseFloat(String(item.answer));
    default:
      return item.answer;
  }
};

/**
 * tells you if an item is completely answered or not.
 * it takes the "items"-property of a category (or none at all if the whole questionnaire
 * needs to be checked) and iterates over all active (as in they met their enableWhen-conditions)
 * sub-items to check if they are valid.
 * @param  {QuestionnaireItem[]} [items] the items property of a questionnaire-item (from the categories-array)
 * @param  {object} [props] props-object of the calling component (needed to call an action)
 */
const checkCompletionStateOfMultipleItems = (items, props) => {
  /**
   * local copy of the categories-array from the checkIn-state
   * @type {QuestionnaireItem[]}
   */
  const categories = items || props.categories;

  /**
   * local copy of the questionnaireItemMap from the checkIn-state
   * @type {QuestionnaireItemMap}
   */
  const questionnaireItemMap = { ...props.questionnaireItemMap, done: true };

  // if a set of items was given
  if (items) {
    /** return value of the function */
    let returnValue = true;

    // sets the returnValue to false if a single item does not check out
    items.forEach((item) => {
      if (!checkItem(item, questionnaireItemMap)) returnValue = false;
    });

    return returnValue;
  }
  // if there is no set, go over all categories

  // sets the done-property for the whole questionnaire
  categories.forEach((category) => {
    if (!checkItem(category, questionnaireItemMap)) {
      questionnaireItemMap.done = false;
    }
  });

  // persists the new questionnaireItemMap
  props.actions.setQuestionnaireItemMap(questionnaireItemMap);

  return questionnaireItemMap.done;
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
  if (coding1 && coding2)
    return (
      (coding1.system &&
        coding1.code &&
        coding2.system &&
        coding2.code &&
        coding1.system === coding2.system &&
        coding1.code === coding2.code) ||
      coding1.display === coding2.display
    );
  return false;
};
/**
 * checks the dependencies of a single item (presented through its "enableWhen" property).
 * this basically tells us if the items needs to be rendered or if its answer should have
 * an impact on the completion state of the whole questionnaire
 * @param  {QuestionnaireItem} [item] questionnaire item
 */
const checkDependenciesOfSingleItem = (item) => {
  const props = store.getState().CheckIn;

  // if item is supposed to be hidden
  const hiddenExtension = item.extension?.find(
    (it) =>
      it.url === "http://hl7.org/fhir/StructureDefinition/questionnaire-hidden"
  );
  if (hiddenExtension && hiddenExtension.valueBoolean === true) {
    return false;
  }
  if (item && item.enableWhen) {
    // if the item has a set of conditions
    // checks if the items mentioned in the conditions are even answered...
    if (!checkIfAnswersToConditionsAreAvailable(item)) {
      // ...if not, the returnValue is set to FALSE - game over
      return false;
    }
    if (item.enableWhen.length !== 0) {
      const elementTestCallback = (condition) => {
        const answerType = getEnableWhenAnswerType(condition);
        const expected = condition[answerType];
        const question = props.questionnaireItemMap[condition.question];

        if (answerType === "answerCoding") {
          return (
            (Array.isArray(question.answer) &&
              question.answer.some((it) => codingEquals(it, expected))) ||
            codingEquals(getCorrectlyFormattedAnswer(question), expected)
          );
        }
        return (
          (Array.isArray(question.answer) &&
            question.answer.includes(expected)) ||
          getCorrectlyFormattedAnswer(question) === expected
        );
      };
      return !item.enableBehavior || item.enableBehavior === "all"
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
 * @returns {ExportData}
 */
const createResponseJSON = () => {
  /** persists the information if a trigger was... well, triggered
   * @type {Object.<string, boolean>}
   */
  const triggerMap = {};

  /** a local copy of the checkIn-state */
  const props = store.getState().CheckIn;

  /**
   * return the correct answer object
   * @param  {{valueString?:string, valueInteger?: number, valueCoding?: Object}} answer answer-object
   */
  const createAnswerObject = (answer) => {
    if (typeof answer === "string") return { valueString: answer };

    if (typeof answer === "number") return { valueInteger: answer };

    if (typeof answer === "object") return { valueCoding: answer };

    return { valueString: answer };
  };

  /**
   * traverses a set of items and its children (and so on) and creates the structure
   * that will hold the answers of the questionnaire-response
   * @param  {QuestionnaireItem[]} items the questionnaire-items
   * @param  {string} [necessaryAnswer] should the item be conditional to a specific answer of its child-items (for open-choice elements)
   * @returns {QuestionnaireItem[]}
   */
  const createItems = (items, necessaryAnswer) => {
    const newItems = [];

    if (items)
      items.forEach((item) => {
        /**
         * will hold the created child-items, if there are any
         * @type {QuestionnaireItem[]}
         */
        let childItems = [];

        /**
         * wil hold the correct answer
         * @type {ResponseAnswer}
         */
        let answerObject = {};

        /**
         * holds the correct itemdetails
         * @type {ItemMapEntry}
         */
        const itemDetails = props.questionnaireItemMap[item.linkId];

        // if the conditions of the item are met or if one of the ChildItems provide the necessary answer
        if (
          checkDependenciesOfSingleItem(item) ||
          (necessaryAnswer &&
            itemDetails.enableWhen &&
            itemDetails.enableWhen[0][
              getEnableWhenAnswerType(itemDetails.enableWhen[0])
            ] === necessaryAnswer)
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
            // if there is an extension...
            ...(itemDetails.extension && { extension: itemDetails.extension }),
            answer: [],
          };

          // creates the item property of the new item based on its type
          switch (item.type) {
            case "group":
              // easy, nothing to check here
              newItem.item = createItems(item.item);
              break;

            case "boolean":
              answerObject = {
                // either the set answer, or just false
                valueBoolean: Boolean(itemDetails.answer) || false,
              };
              // traverse the child-items, if there are any, and add them to the answer
              childItems = item.item ? createItems(item.item) : [];
              if (childItems.length !== 0) answerObject.item = childItems;
              newItem.answer = [answerObject];
              break;

            case "choice":
            case "open-choice":
              // if there are multiple answers
              if (Array.isArray(itemDetails.answer)) {
                // iterates over all answers
                itemDetails.answer.forEach((answer) => {
                  // so now we create an object for each set answer
                  answerObject = createAnswerObject(answer);
                  // and check if there are any child-items.
                  // if yes: traverse the child-items and add them to the answer
                  childItems = item.item ? createItems(item.item, answer) : [];
                  if (childItems.length !== 0) answerObject.item = childItems;
                  newItem.answer.push(answerObject);
                });

                // should the type be open-choice and an extra answer is possible
                if (itemDetails.type === "open-choice") {
                  const additionalAnswer = itemDetails.answerOption.filter(
                    (e) => e.isOpenQuestionAnswer
                  )[0];
                  if (additionalAnswer.answer)
                    newItem.answer.push(
                      createAnswerObject(additionalAnswer.answer)
                    );
                }
              }
              // if there is just a single answer
              else {
                answerObject = createAnswerObject(itemDetails.answer);
                // traverse the child-items, if there are any and add them to the answer
                childItems = item.item ? createItems(item.item) : [];
                if (childItems.length !== 0) answerObject.item = childItems;
                newItem.answer = [answerObject];
              }
              break;

            // case 'open-choice':
            // 	newItem.answer = []
            // 	// if there are any answers, they will be located in an array - so we have to traverse it
            // 	if (Array.isArray(itemDetails.answer)) {
            // 		// see?
            // 		itemDetails.answer.forEach(function (answer) {
            // 			// so now we create an object for each set answer
            // 			answerObject = createAnswerObject(answer)
            // 			// and check if there are any child-items.
            // 			// if yes: traverse the child-items and add them to the answer
            // 			childItems = item.item ? createItems(item.item, answer): []
            // 			if (childItems.length !== 0) answerObject.item = childItems
            // 			newItem.answer.push(answerObject)
            // 		})
            // 	}
            // 	break

            case "string":
              newItem.answer = [
                {
                  // just the answer
                  valueString: itemDetails.answer
                    ? String(itemDetails.answer)
                    : null,
                },
              ];
              break;

            case "integer":
              newItem.answer = [
                {
                  valueInteger: parseInt(String(itemDetails.answer), 10),
                },
              ];
              break;

            case "decimal":
              newItem.answer = [
                {
                  // the answer as a float
                  valueDecimal: parseFloat(String(itemDetails.answer)),
                },
              ];
              break;

            case "date":
              newItem.answer = [
                {
                  valueDate: getFormattedDate(String(itemDetails.answer)),
                },
              ];
              break;
            default:
              break;
          }

          // if there is an definition and a set answer
          if (itemDetails.definition && itemDetails.answer) {
            // iterates through the rules-set...
            config.appConfig.defaultRulesConfig.forEach((trigger) => {
              // and creates a property in the trigger-object
              if (!Object.hasOwnProperty.call(triggerMap, trigger.type))
                triggerMap[trigger.type] = false;
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

          newItems.push(newItem);
        }
      });
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

    if (typeof rootItem === "string" || rootItem instanceof String) {
      return rootItem && rootItem.length && rootItem !== "NaN-NaN-NaN";
    }

    if (
      (typeof rootItem === "object" || typeof rootItem === "function") &&
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
      // for (const key in rootItem) {
      //   if (rootItem.hasOwnProperty(key)) {
      //     if (!cleanItem(rootItem[key])) {
      //       delete rootItem[key];
      //     } else {
      //       hasProperties = true;
      //     }
      //   }
      // }

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
    item: createItems(props.categories),
    resourceType: "QuestionnaireResponse",
    questionnaire: props.questionnaireItemMap.url,
    identifier: props.questionnaireItemMap.identifier,
    status: props.questionnaireItemMap.done ? "completed" : "in-progress",
  };

  // removes empty entries
  cleanItem(questionnaireResponse.item);

  // console output
  if (config.appConfig.logPureResponse) {
    console.log("THE QUESTIONNAIRE-RESPONSE:", questionnaireResponse);
  }
  if (config.appConfig.logPureResponseJSON) {
    console.log(
      "THE QUESTIONNAIRE-RESPONSE (JSON):",
      JSON.stringify(questionnaireResponse)
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
  getCorrectlyFormattedAnswer,
  checkDependenciesOfSingleItem,
  checkCompletionStateOfMultipleItems,
};
