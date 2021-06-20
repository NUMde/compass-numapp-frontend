/**
 * a single questionnaire-item:
 * https://www.hl7.org/fhir/questionnaire-definitions.html#Questionnaire.item
 * these are items coming from the questionnaire that is procured from the backend.
 * @typedef {Object} QuestionnaireItem
 * @property {string} 		       text the text-item to be displayed
 * @property {string} 		       type type if the item ("ignore" || "display" || "boolean" || "date" || "string" || "integer" || "decimal" || "number" || "choice" || "open-choice")
 * @property {string} 		       linkId id of the item
 * @property {boolean} 		       [required] if true: item needs to be answered to complete the questionnaire
 * @property {number} 		       [maxLength] the allows number of chars for the response
 * @property {Extension[]} 		   [extension] extensions defined by fhir
 * @property {Condition[]} 	       [enableWhen] array of conditions necessary to render the item
 * @property {string} 		       [enableBehavior] defines how multiple conditions are handled ("all" || "any")
 * @property {AnswerOption[]}      [answerOption] holds predefined answers (if there are any)
 * @property {QuestionnaireItem[]} [item] sub-items of the item
 */

/**
 * the questionnaireItemMap is an object that is held by the checkIn-state. it is created from the questionnaire-items
 * coming from the backend after a user-update. for each questionnaire-item that is found in the questionnaire,
 * a property is added to this object (with the property name being the linkId of the questionnaire-item) holding 
 * the item itself. Additionally, it contains three further properties: "id", "started" and "done".
 * the questionnaireItemMap is used to preserve the current state of the questionnaire. meaning all given answers,
 * the completion-state of a single questionnaire-item or even the whole questionnaire. 
 * (found in the checkIn-state)
 * @typedef {Object} QuestionnaireItemMap
 * @property {string} 	id id of the questionnaire
 * @property {boolean} 	done is set to TRUE if the questionnaire was completed
 * @property {boolean} 	started is set to true after a single answer was given
 * @property {Object.<string, QuestionnaireItem>} [linkId] is set to true after a single answer was given
 */

 /**
 * an entry of the questionnaireItemMap. this holds all the data about the current state of a questionnaire-item
 * (and some redundant data from "QuestionnaireItem" - its just easier to access this way)
 * (found in the checkIn-state)
 * @typedef {Object} ItemMapEntry
 * @property {boolean} 		done shows if the item was completed (this includes its sub-items)
 * @property {Object} 		text the text-item to be displayed
 * @property {string} 		type type if the item ("ignore" || "display" || "boolean" || "date" || "string" || "integer" || "decimal" || "number" || "choice" || "open-choice")
 * @property {string} 		definition another id provided by the questionnaire - is not actively used
 * @property {string} 		linkId id of the item
 * @property {boolean} 		required if true: item needs to be answered to complete the questionnaire
 * @property {Condition[]} 	enableWhen array of conditions necessary to render the item
 * @property {string | number | Date | boolean} answer answer given by the user
 */
 
 /**
 * a condition used to define under what circumstances a questionnaire-item is rendered.
 * based on its type, the property holding the answer is named differently
 * (found in the checkIn-state)
 * @typedef {Object} Condition
 * @property {string}  operator string representing the operator
 * @property {string}  question the linkId of the question that is part of the condition
 * @property {string}  [answerString] the answer-string of this condition
 * @property {string}  [answerDate] the answer-string of this condition
 * @property {string}  [answerTime] the answer-string of this condition
 * @property {string}  [answerCoding] the answer-coding of this condition
 * @property {number}  [answerInteger] the answer-integer of this condition
 * @property {number}  [answerDecimal] the answer-decimal of this condition
 * @property {boolean} [answerBoolean] the answer-boolean of this condition
 * @property {string}  [answerDateTime] the answer-date-time of this condition
 */

 /**
 * a predefined answer option
 * @typedef {Object} AnswerOption
 * @property {string}  [valueString] representing a predefined answer
 * @property {string}  [valueDate] representing a predefined answer
 * @property {string}  [valueTime] representing a predefined answer
 * @property {string}  [valueCoding] representing a predefined answer
 * @property {number}  [valueInteger] representing a predefined answer
 * @property {number}  [valueDecimal] representing a predefined answer
 * @property {boolean} [valueBoolean] representing a predefined answer
 * @property {string}  [valueDateTime] representing a predefined answer
 */

 /**
 * the format used for the export
 * @typedef {Object} ExportData
 * @property {Object.<string, boolean>} triggerMap tells if a basicTrigger was set
 * @property {string} body the stringified questionnaire response
 */

 /**
 * the response-object that is part of the body that is sent to the backend
 * @typedef {Object} QuestionnaireResponse
 * @property {any[]}   item tells if a basicTrigger was set
 * @property {string}  author subject-id of the current user
 * @property {string}  status status of the questionnaire ("false" || "true")
 * @property {string}  authored local date string
 * @property {string}  identifier holds the subject-id
 * @property {string}  resourceType string specifying the resource-type
 * @property {string}  questionnaire reference link
 * 
 */

  /**
 * an answer object found in the questionnaire-response
 * @typedef {Object} ResponseItem
 * @property {string} linkId
 * @property {string} text
 * @property {string} [definition]
 * @property {ResponseAnswer[]} [answer]
 * @property {ResponseItem[]} [item]
 */

  /**
 * an answer object found in the questionnaire-response
 * @typedef {Object} ResponseAnswer
 * @property {string}  [valueString] representing a predefined answer
 * @property {string}  [valueDate] representing a predefined answer
 * @property {number}  [valueInteger] representing a predefined answer
 * @property {number}  [valueDecimal] representing a predefined answer
 * @property {boolean} [valueBoolean] representing a predefined answer
 * @property {QuestionnaireItem[]}  [item] representing a predefined answer
 */

  /**
 * structure of an extension
 * @typedef {Object} Extension
 * @property {string}  valueString
 * @property {number}  valueInteger 
 * @property {string}  url
 */