// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

// the code contained in this file is rendering the content (meaning the ui-elements) of
// the modal that opens when an item on the survey screen is clicked on. the user-input
// received by these ui-elements is persisted in the object "questionnaireItemMap", located
// in the checkIn state.

// the following terms are used in the comments in this file:

// item:
// a single questionnaire item:
// https://www.hl7.org/fhir/questionnaire-definitions.html#Questionnaire.item

// categories:
// all first level items with linkIds like "1" or "6" or "15"

// page:
// a page is composed of all sub-items of a category that have
// the identical value as the second position of their linkId. for example:
// all linkIds starting with "1.2" (and "1.2.1" and "1.2.1.1" and so on) will
// be considered a page

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { Component } from 'react';
import RNModal from 'react-native-modal';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CheckBox, Input, Icon, Button } from 'react-native-elements';
import {
  AccessibilityInfo,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
  I18nManager,
  Dimensions,
} from 'react-native';

import '../../typedef';
import { Picker } from '@react-native-picker/picker';
import exportService from '../../services/questionnaireAnalyzer/questionnaireAnalyzer';
import setAccessibilityResponder from '../../services/accessibility/setAccessbilityResponder';
import localization from '../../services/localization/localization';
import config from '../../config/configProvider';
import ProgressBar from './progressbar';

let localStyle;

/***********************************************************************************************
component:
renders the questionnaireModal and the contents of the questionnaire
***********************************************************************************************/

class QuestionnaireModal extends Component {
  /**
   * holds the current y-offset of the scrollView
   * @type {number}
   */
  scrollOffset;

  /**
   * reference for the scrollView component
   * @type {object}
   */
  scrollViewRef;

  /**
   * reference for the title-text component that is rendered
   * @type {object}
   */
  modalTitleRef;

  /**
   * tells us if the screen reader is enabled
   * @type {boolean}
   */
  isAccessibilityOn = false;

  /**
	* is used to preserve the information if the current page holds
	any item that needs to be displayed. if not, the next page of the
	current category will be transitioned to (or the
	modal will be closed if it is the last page.)
	* @type {boolean}
	*/
  currentPageNeedsRendering;

  /**
   * tells us if the last page-navigation direction was forwards.
   * @type {boolean}
   */
  lastPageNavigationWasForwards;

  /**
	* @constructor
	* @param  {object}  props
	* @param  {object}  props.actions the redux actions of the parents state of this (checkInActions)
	* @param  {boolean} props.showDatePicker if true: shows the DatePicker
	* @param  {number}  props.currentPageIndex the index of the page of the current category that is
	* @param  {QuestionnaireItem[]}	props.categories array with an entry for each category
		displayed. a page is composed of all sub-items of a category that have the identical value as the
		second position of their linkId. for example: all linkIds starting with "1.2" (and "1.2.1" and
		"1.2.1.1" and so on) will be considered a page
	* @param  {QuestionnaireItemMap} props.questionnaireItemMap holds a property for every item of the questionnaire
		as well  as their current answer and rendering-state. also contains properties to indicate the state
		of the whole questionnaire (like started, or done). if the properties of this object are updated
		through an action then the ui will be refreshed directly afterwards
	* @param  {number}  props.currentCategoryIndex the index of the currently active category (that means
		all first level items with linkIds like "1" or "6") also: categories must be of type "group"
	* @param  {boolean} props.showQuestionnaireModal if true: displays the QuestionnaireModal
	*/
  constructor(props) {
    super(props);

    // creating references
    this.scrollViewRef = React.createRef();
    this.modalTitleRef = React.createRef();

    // setting defaults
    this.scrollOffset = 0;
    this.currentPageNeedsRendering = false;
    this.lastPageNavigationWasForwards = true;
    this.level = null;

    // check if accessibility-features are enabled
    AccessibilityInfo.isScreenReaderEnabled().then((screenReaderEnabled) => {
      this.isAccessibilityOn = screenReaderEnabled;
    });
  }

  componentDidMount() {
    setAccessibilityResponder(this.modalTitleRef);
  }

  // rendering
  /*-----------------------------------------------------------------------------------*/

  /**
   * renders the content based on the currently chose category
   */
  render = () => {
    // if there is something to render
    // eslint-disable-next-line react/destructuring-assignment
    if (typeof this.props.currentCategoryIndex === 'number') {
      return this.createFormContent();
    }
    // if not

    return <View />;
  };

  // class events
  /*-----------------------------------------------------------------------------------*/

  /**
   * is invoked before rendering when new props or state are being received.
   * basically it resets currentPageNeedsRendering
   */
  shouldComponentUpdate = () => {
    this.currentPageNeedsRendering = false;
    return true;
  };

  /**
   * is invoked immediately after updating occurs. this method is not called for the initial render.
   * basically it resets currentPageNeedsRendering and scrolls back to the top.
   */
  componentDidUpdate = () => {
    const {
      actions,
      categories,
      currentPageIndex,
      currentCategoryIndex,
      showQuestionnaireModal,
    } = this.props;
    if (!this.currentPageNeedsRendering && showQuestionnaireModal) {
      actions.switchContent(
        this.lastPageNavigationWasForwards,
        categories[currentCategoryIndex].item.length,
        currentPageIndex,
      );
    }
  };

  // modal events
  /*-----------------------------------------------------------------------------------*/

  /**
   * handles the scroll-event of the scrollView
   * @param  {object} event scroll event
   */
  handleOnScroll = (event) => {
    // just sets the current scrollOffset
    this.scrollOffset = event.nativeEvent.contentOffset.y;
  };

  /**
   * @param  {{ y: number, animated: boolean }} element UI element that RNModal will scroll to (for example if the software-keyboard is shown)
   */
  handleScrollTo = (element) => {
    // scrolls to the given element if the scrollView is currently active
    if (this.scrollViewRef.current) {
      this.scrollViewRef.current.scrollTo({ ...element, animated: true });
    }
  };

  // "getter"
  /*-----------------------------------------------------------------------------------*/

  /**
   * when an item is of type choice or open-choice it has the attribute "answerOptions".
   * the entries of that attribute contain the possible choices - and the titles of those
   * choices are either provided by the attribute valueString ot valueInteger.
   * this functions determines what is available an returns it.
   * the title is then stripped of an id, should it be encoded in the string.
   * for example "01# test-answer" becomes "test-answer".
   * @param  {AnswerOption} item entry of an answerOption-entry.
   */
  getItemTitle = (item) => {
    // default value
    let title = 'NO NAME FOUND';

    // sets the title in case of a valueCoding attribute
    if (item.valueCoding) {
      title = item.valueCoding.display ?? item.valueCoding.code;
    }

    // get the string
    title =
      item.valueString ||
      (item.valueInteger ? item.valueInteger.toString() : title);

    // splits it
    return title.split('#')[title.includes('# ') ? 1 : 0].trim();
  };

  /**
   * is used to determine what kind of keyboard should be used
   * @param  {QuestionnaireItem} item a questionnaire item (from props.categories)
   */
  getKeyboardType = (item) => {
    switch (item.type) {
      // numpad for integers
      case 'integer':
        return 'number-pad';
      // decimalPad for decimals
      case 'decimal':
        return 'decimal-pad';
      // and the rest
      default:
        return 'default';
    }
  };

  /**
   * returns the second position of the linkId
   * for example: return "2" if the linkId is "8.2.15"
   * @param  {string} linkId linkId of an questionnaire-item
   */
  getSecondIndexOfLinkId = (linkId) => {
    /**
     * gets and returns the index of the character "." - occurrence defines which "." (the first or the second)
     * @param  {number} occurrence the occurrence of the char "."
     */
    const getPosition = (occurrence) =>
      linkId.split('.', occurrence).join('.').length;
    // returns the middle index - the one between the two dots
    // (like the "15" in 308.15.33)
    return linkId.substring(getPosition(1) + 1, getPosition(2));
  };

  // visual calculations
  /*-----------------------------------------------------------------------------------*/

  /**
   * determines the marginLeft-property for items in the questionnaireModal.
   * (based on their linkId)
   * @param  {string} linkId linkId of a questionnaire-item
   */
  calculateIndent = (linkId) => {
    // the values and formula are empirical ones - they felt right
    const margin = Math.round(linkId.split('.').length / 2) - 2;
    return margin >= 1 ? margin * 38 : 0;
  };

  /**
   * determines the fontSize-property for items in the questionnaireModal.
   * (based on their linkId)
   * @param  {string} linkId linkId of a questionnaire-item
   */
  calculateFontSize = (linkId) =>
    // the values and formula are empirical ones - they felt right
    config.appConfig.scaleFontsFkt(
      18 - (Math.round(linkId.split('.').length / 2) - 1 + 0.5),
    );

  /**
   * determines the lineHeight-property for items in the questionnaireModal.
   * (based on their linkId)
   * @param  {string} linkId linkId of a questionnaire-item
   */
  calculateLineHeight = (linkId) =>
    // the values and formula are empirical ones - they felt right
    config.appConfig.scaleFontsFkt(
      18 - (Math.round(linkId.split('.').length / 2) - 1 + 0.5) + 5,
    );

  // checking the state of the questionnaire / page
  /*-----------------------------------------------------------------------------------*/

  /**
   * triggers a completion-check of the content of the current page.
   * is used to determine the color of the button on the bottom of the modal.
   */
  checkCurrentPageState = () => {
    const { categories, currentCategoryIndex, currentPageIndex } = this.props;
    return exportService.checkCompletionStateOfMultipleItems(
      [
        categories[currentCategoryIndex].item[
          // the -1 is necessary as the indexes of the questionnaire-items start wit 1
          currentPageIndex - 1
        ],
      ],
      this.props,
    );
  };

  /**
   * checks the dependencies of a single item (presented through its "enableWhen" property).
   * this basically tells us if the items needs to be rendered or if its answer should have
   * an impact on the completion state of the whole questionnaire. also, sets the value
   * "currentPageNeedsRendering"
   * @param  {QuestionnaireItem} item questionnaire-item
   */
  getRenderStatusOfItem = (item) => {
    // uses the checkDependenciesOfSingleItem-function from the export service
    let returnValue = exportService.checkDependenciesOfSingleItem(item);
    // If the item is supposed to be hidden, remember the linjkId to make the subItems invisible in case there are subItems.
    if (!returnValue) {
      this.level = item.linkId;
    }
    // If the item has be shown
    // check if the Item has parent which is invisible to the user
    else if (this.level != null) {
      if (item.linkId.startsWith(this.level, 0)) {
        // This is a child-Element of an invisible Element and has not to be rendered
        returnValue = false;
      }
      // When the item isn't a subItem of the hidden item
      else {
        this.level = null;
        // if an item meets its dependencies it needs to be displayed
        this.currentPageNeedsRendering = true;
      }
    } else {
      // if an item meets its dependencies it needs to be displayed
      this.currentPageNeedsRendering = true;
    }

    return returnValue;
  };

  // creating questionnaire items
  /*-----------------------------------------------------------------------------------*/

  /**
   * renders a choice-type ui-element (if its dependencies check out)
   * supports the drop-down extension (without repeat)
   * @param  {QuestionnaireItem} item questionnaire item
   */
  createChoices = (item) => {
    const { actions, questionnaireItemMap } = this.props;
    // checks the dependencies of the item and renders it (if the dependencies check out)
    return this.getRenderStatusOfItem(item) ? (
      <View>
        {/* title */}
        <Text
          accessibilityLabel={item.text}
          accessibilityHint={
            localization.translate('accessibility').questionnaire.singleChoice
          }
          style={{
            ...localStyle.contentTitle,
            marginLeft: this.calculateIndent(item.linkId),
            fontSize: this.calculateFontSize(item.linkId),
            lineHeight: this.calculateLineHeight(item.linkId),
          }}
        >
          {item.text}
        </Text>

        {/* checks if the drop-down extension is available. */}
        {/* if yes, it will render it. */}
        {/* if not, the default way is chosen. */}
        {item.extension &&
        item.extension[0].valueCodeableConcept &&
        item.extension[0].valueCodeableConcept.coding &&
        item.extension[0].valueCodeableConcept.coding[0].code ===
          'drop-down' ? (
          <View>
            {/* renders the drop-down */}
            <Picker
              selectedValue={questionnaireItemMap[item.linkId].answer}
              onValueChange={(value) => {
                actions.setAnswer({
                  linkId: item.linkId,
                  answer: value,
                });
              }}
            >
              {item.answerOption.map((answerOption, index) => (
                <Picker.Item
                  label={answerOption.valueString}
                  value={answerOption.valueString}
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                />
              ))}
            </Picker>
          </View>
        ) : (
          <View>
            {/* repeat: false */}
            {!item.repeats && (
              <View>
                {/* renders a list of answers */}
                {item.answerOption.map(
                  (answerOption, index) =>
                    !answerOption.isOpenQuestionAnswer && (
                      <CheckBox
                        uncheckedIcon="circle-o"
                        checkedIcon="dot-circle-o"
                        // eslint-disable-next-line react/no-array-index-key
                        key={`${item.linkId}.a_${index}`}
                        textStyle={localStyle.choiceText}
                        title={this.getItemTitle(answerOption)}
                        checkedColor={config.theme.colors.primary}
                        uncheckedColor={config.theme.colors.accent1}
                        containerStyle={{
                          ...localStyle.choice,
                          marginLeft: this.calculateIndent(item.linkId),
                        }}
                        onPress={() => {
                          actions.setAnswer({
                            linkId: item.linkId,
                            answer:
                              answerOption.valueCoding ||
                              answerOption.valueString ||
                              answerOption.valueInteger,
                          });

                          this.removeOpenAnswer(item);
                        }}
                        onIconPress={() => {
                          actions.setAnswer({
                            linkId: item.linkId,
                            answer:
                              answerOption.valueCoding ||
                              answerOption.valueString ||
                              answerOption.valueInteger,
                          });

                          this.removeOpenAnswer(item);
                        }}
                        checked={
                          exportService.codingEquals(
                            exportService.getCorrectlyFormattedAnswer(
                              questionnaireItemMap[item.linkId],
                            ),
                            answerOption.valueCoding,
                          ) ||
                          exportService.getCorrectlyFormattedAnswer(
                            questionnaireItemMap[item.linkId],
                          ) === answerOption.valueString ||
                          exportService.getCorrectlyFormattedAnswer(
                            questionnaireItemMap[item.linkId],
                          ) === answerOption.valueInteger
                        }
                      />
                    ),
                )}
              </View>
            )}

            {/* repeat: true */}
            {item.repeats && (
              <View>
                {item.answerOption.map(
                  (answerOption, index) =>
                    !answerOption.isOpenQuestionAnswer && (
                      <CheckBox
                        title={this.getItemTitle(answerOption)}
                        checkedColor={config.theme.colors.primary}
                        uncheckedColor={config.theme.colors.accent1}
                        onPress={() => {
                          actions.setAnswer({
                            linkId: item.linkId,
                            answer:
                              answerOption.valueCoding ||
                              answerOption.valueString ||
                              answerOption.valueInteger,
                            openAnswer: true,
                          });
                        }}
                        onIconPress={() => {
                          actions.setAnswer({
                            linkId: item.linkId,
                            answer:
                              answerOption.valueCoding ||
                              answerOption.valueString ||
                              answerOption.valueInteger,
                            openAnswer: true,
                          });
                        }}
                        checked={
                          (questionnaireItemMap[item.linkId].answer &&
                            answerOption.valueCoding &&
                            questionnaireItemMap[item.linkId].answer.some(
                              (c) =>
                                c.code === answerOption.valueCoding.code &&
                                c.system === answerOption.valueCoding.system,
                            )) ||
                          (questionnaireItemMap[item.linkId].answer &&
                            questionnaireItemMap[item.linkId].answer.includes(
                              answerOption.valueString,
                            )) ||
                          (questionnaireItemMap[item.linkId].answer &&
                            questionnaireItemMap[item.linkId].answer.includes(
                              answerOption.valueInteger,
                            ))
                        }
                        // eslint-disable-next-line react/no-array-index-key
                        key={`${item.linkId}.a_${index}`}
                        containerStyle={{
                          ...localStyle.choice,
                          marginLeft: this.calculateIndent(item.linkId),
                        }}
                        textStyle={localStyle.choiceText}
                      />
                    ),
                )}
              </View>
            )}

            {/* if type: 'open-choice' */}
            {item.type === 'open-choice' && (
              <Input
                containerStyle={localStyle.modalContainer}
                placeholder={
                  item.repeats
                    ? localization.translate('survey').additionalAnswer
                    : localization.translate('survey').alternativeAnswer
                }
                style={{ ...localStyle.alignmentWrapper }}
                value={this.procureOpenAnswer(item)}
                accessibilityHint={
                  localization.translate('accessibility').questionnaire
                    .textFieldHint
                }
                onChangeText={(text) => {
                  // sets the answer
                  actions.setAnswer({
                    linkId: item.linkId,
                    answer: text,
                    isOpenAnswer: true,
                    isAdditionalAnswer: item.repeats,
                  });
                }}
              />
            )}
          </View>
        )}
      </View>
    ) : null;
  };

  removeOpenAnswer = (item) => {
    if (item.type !== 'open-choice') return;
    // eslint-disable-next-line react/destructuring-assignment
    const a = this.props.questionnaireItemMap[item.linkId].answerOption.filter(
      (e) => e.isOpenQuestionAnswer,
    )[0];
    a.answer = null;
  };

  procureOpenAnswer = (item) => {
    if (item.type !== 'open-choice') return null;
    // eslint-disable-next-line react/destructuring-assignment
    return this.props.questionnaireItemMap[item.linkId].answerOption.filter(
      (e) => e.isOpenQuestionAnswer,
    )[0].answer;
  };

  checkIfOpenAnswerWasChosen = (item) => {
    const { questionnaireItemMap } = this.props;
    const { answer } = questionnaireItemMap[item.linkId];

    questionnaireItemMap[item.linkId].answerOption.some(
      (e) =>
        e.valueString === answer ||
        e.valueInteger === answer ||
        e.valueDecimal === answer ||
        e.valueDate === answer,
    );
  };

  /**
   * renders an open-choice-type ui-element (if its dependencies check out)
   * @param  {QuestionnaireItem} item questionnaire item
   */
  createOpenChoices = (item) => {
    const { actions, questionnaireItemMap } = this.props;
    // checks the dependencies of the item and renders it (if the dependencies check out)
    return this.getRenderStatusOfItem(item) ? (
      <View>
        {/* title */}
        <Text
          accessibilityLabel={item.text}
          accessibilityHint={
            localization.translate('accessibility').questionnaire.multipleChoice
          }
          style={{
            ...localStyle.contentTitle,
            fontSize: this.calculateFontSize(item.linkId),
            marginLeft: this.calculateIndent(item.linkId),
            lineHeight: this.calculateLineHeight(item.linkId),
          }}
        >
          {item.text}
        </Text>

        {/* renders all answerOptions */}
        <View>
          {item.answerOption.map((answerOption, index) => (
            <CheckBox
              title={this.getItemTitle(answerOption)}
              checkedColor={config.theme.colors.primary}
              uncheckedColor={config.theme.colors.accent1}
              onPress={() =>
                actions.setAnswer({
                  linkId: item.linkId,
                  answer:
                    answerOption.valueCoding ||
                    answerOption.valueString ||
                    answerOption.valueInteger,
                  openAnswer: true,
                })
              }
              onIconPress={() =>
                actions.setAnswer({
                  linkId: item.linkId,
                  answer:
                    answerOption.valueCoding ||
                    answerOption.valueString ||
                    answerOption.valueInteger,
                  openAnswer: true,
                })
              }
              checked={
                (questionnaireItemMap[item.linkId].answer &&
                  answerOption.valueCoding &&
                  questionnaireItemMap[item.linkId].answer.some(
                    (c) =>
                      c.code === answerOption.valueCoding.code &&
                      c.system === answerOption.valueCoding.system,
                  )) ||
                (questionnaireItemMap[item.linkId].answer &&
                  questionnaireItemMap[item.linkId].answer.includes(
                    answerOption.valueString,
                  )) ||
                (questionnaireItemMap[item.linkId].answer &&
                  questionnaireItemMap[item.linkId].answer.includes(
                    answerOption.valueInteger,
                  ))
              }
              // eslint-disable-next-line react/no-array-index-key
              key={`${item.linkId}.a_${index}`}
              containerStyle={{
                ...localStyle.choice,
                marginLeft: this.calculateIndent(item.linkId),
              }}
              textStyle={localStyle.choiceText}
            />
          ))}
        </View>
      </View>
    ) : null;
  };

  /**
   * renders a boolean-type ui-element (if its dependencies check out)
   * @param  {QuestionnaireItem} item questionnaire item
   */
  createBoolean = (item) => {
    const { actions, questionnaireItemMap } = this.props;
    // checks the dependencies of the item and renders it (if the dependencies check out)
    return this.getRenderStatusOfItem(item) ? (
      <View>
        <CheckBox
          title={item.text}
          checkedColor={config.theme.colors.primary}
          uncheckedColor={config.theme.colors.accent1}
          checked={questionnaireItemMap[item.linkId].answer}
          onPress={() =>
            actions.setAnswer({
              linkId: item.linkId,
              answer:
                exportService.getCorrectlyFormattedAnswer(
                  questionnaireItemMap[item.linkId],
                ) === null
                  ? true
                  : !questionnaireItemMap[item.linkId].answer,
            })
          }
          onIconPress={() =>
            actions.setAnswer({
              linkId: item.linkId,
              answer:
                exportService.getCorrectlyFormattedAnswer(
                  questionnaireItemMap[item.linkId],
                ) === null
                  ? true
                  : !questionnaireItemMap[item.linkId].answer,
            })
          }
          key={`${item.linkId}`}
          containerStyle={{
            ...localStyle.choice,
            marginLeft: this.calculateIndent(item.linkId),
          }}
          textStyle={localStyle.choiceText}
        />
      </View>
    ) : (
      true
    );
  };

  /**
   * renders an input-type ui-element (if its dependencies check out)
   * @param  {QuestionnaireItem} item questionnaire item
   */
  createInput = (item) => {
    const { actions, questionnaireItemMap } = this.props;
    // checks the dependencies of the item and renders it (if the dependencies check out)
    return this.getRenderStatusOfItem(item) ? (
      <View style={localStyle.modalInput}>
        {/* title */}
        <Text style={{ ...localStyle.contentTitle }}>{item.text}</Text>
        {/* input */}
        <Input
          containerStyle={localStyle.modalContainer}
          placeholder={localization.translate('login').inputPlaceholder}
          value={questionnaireItemMap[item.linkId].answer || ''} // displays an empty string when a 'falsy' answer needs to be rendered
          keyboardType={this.getKeyboardType(item)}
          style={{ ...localStyle.alignmentWrapper }}
          maxLength={item.maxLength || null}
          // accessibilityLabel={ }
          accessibilityHint={
            localization.translate('accessibility').questionnaire.textFieldHint
          }
          onChangeText={(text) => {
            // holds the initial, unedited text - in case that no manipulation is needed
            let retVal = text;
            // filters anything that is not a number
            if (item.type === 'integer') {
              retVal = text
                .split('')
                .filter((a) => Number(a) || a === '0')
                .join('');
            }
            // only allows decimals
            if (item.type === 'decimal') {
              retVal = text
                .split('')
                .filter((a) => Number(a) || a === '0' || a === '.' || a === ',')
                .join('')
                .replace(',', '.');

              const split = retVal.split('.');
              if (split.length - 1 > 1) retVal = `${split[0]}.${split[1]}`;
              if (retVal === '.') retVal = null;
            }
            // sets the answer
            actions.setAnswer({
              linkId: item.linkId,
              answer: retVal,
            });
          }}
        />
      </View>
    ) : null;
  };

  /**
   * renders a datePicker-type ui-element (if its dependencies check out)
   * @param  {QuestionnaireItem} item questionnaire item
   */
  createDatePicker = (item) => {
    const { actions, questionnaireItemMap, showDatePicker } = this.props;
    // checks the dependencies of the item and renders it (if the dependencies check out)
    return this.getRenderStatusOfItem(item) ? (
      <View style={localStyle.modalInput}>
        {/* title */}
        <Text style={{ ...localStyle.contentTitle }}>{item.text}</Text>

        {/* android datepicker */}
        {
          <TouchableOpacity
            onPress={actions.showDatePicker}
            // accessibilityLabel={ }
            // accessibilityRole={localization.translate('accessibility').types.button}
            // accessibilityHint={localization.translate('accessibility').questionnaire.dateFieldHint}
          >
            <Input
              containerStyle={localStyle.modalContainer}
              placeholder={localization.translate('login').inputPlaceholderTime}
              value={
                questionnaireItemMap[item.linkId].answer
                  ? exportService.getFormattedDate(
                      questionnaireItemMap[item.linkId].answer.toString(),
                      true,
                    )
                  : null
              }
              style={{ ...localStyle.alignmentWrapper }}
              editable={false}
              leftIcon={{ type: 'font-awesome', name: 'calendar' }}
              pointerEvents="none"
            />
          </TouchableOpacity>
        }

        {showDatePicker && (
          <DateTimePicker
            value={questionnaireItemMap[item.linkId].answer || new Date()}
            mode="date"
            style={{ width: modalWidth }}
            locale="de-de"
            display="spinner"
            onChange={(event, date) => {
              actions.setAnswer({
                linkId: item.linkId,
                answer: date,
                showDatePicker: Platform.OS === 'ios',
              });
            }}
          />
        )}
        {/* ios datepicker- Buttons*/}
        {Platform.OS === 'ios' && showDatePicker && (
          <View style={localStyle.dateTimePickerButtonBar}>
            <Button
              title={localization.translate('generic').abort}
              onPress={() => {
                actions.setAnswer({
                  linkId: item.linkId,
                  answer: '',
                  showDatePicker: false,
                });
              }}
              style={localStyle.dateTimePickerButton}
              type="clear"
              titleStyle={{ color: config.theme.colors.accent4 }}
            />
            <Button
              title={localization.translate('generic').ok}
              color={config.theme.colors.secondary}
              onPress={() => {
                const selectedDate =
                  questionnaireItemMap[item.linkId].answer || new Date();
                actions.setAnswer({
                  linkId: item.linkId,
                  answer: selectedDate,
                  showDatePicker: false,
                });
              }}
              type="clear"
              titleStyle={{ color: config.theme.colors.accent4 }}
            />
          </View>
        )}
      </View>
    ) : null;
  };

  /**
   * renders a slider-type ui-element (if its dependencies check out)
   * @param  {QuestionnaireItem} item questionnaire item
   */
  createSlider = (item) => {
    const { actions, questionnaireItemMap } = this.props;
    // creates the default slider-object
    const sliderProperties = Object.create({
      'questionnaire-sliderStepVal': 1,
      minValue: 2,
      maxValue: 300,
      HighRangeLabel: '',
      LowRangeLabel: '',
    });

    // gets the slider properties from the extension-attribute and feeds it to the
    // sliderProperties Object
    item.extension.forEach((extension) => {
      const propertyName = extension.url.slice(
        extension.url.lastIndexOf('/') + 1,
        extension.url.length,
      );
      sliderProperties[propertyName] =
        extension.valueString || extension.valueInteger;
    });

    // checks the dependencies of the item and renders it (if the dependencies check out)
    return this.getRenderStatusOfItem(item) ? (
      <View style={localStyle.modalInput}>
        <Text style={{ ...localStyle.contentTitle }}>{item.text}</Text>
        <Slider
          style={{
            width: Dimensions.get('window').width - 40,
          }}
          step={sliderProperties['questionnaire-sliderStepValue']}
          minimumValue={sliderProperties.minValue}
          maximumValue={sliderProperties.maxValue}
          minimumTrackTintColor={config.theme.colors.primary}
          maximumTrackTintColor={config.theme.colors.primary}
          accessibilityHint={
            sliderProperties.minValue +
            localization.translate('accessibility').questionnaire
              .sliderFieldEquals +
            sliderProperties.LowRangeLabel +
            localization.translate('accessibility').questionnaire
              .sliderFieldAnd +
            sliderProperties.maxValue +
            localization.translate('accessibility').questionnaire
              .sliderFieldEquals +
            sliderProperties.HighRangeLabel
          }
          onSlidingComplete={(value) => {
            actions.setAnswer({
              linkId: item.linkId,
              answer: value,
            });
          }}
          value={
            typeof questionnaireItemMap[item.linkId].answer === 'number'
              ? questionnaireItemMap[item.linkId].answer
              : (sliderProperties.minValue + sliderProperties.maxValue) / 2
          }
        />
        <View style={localStyle.sliderLabel}>
          <Text style={localStyle.sliderTextMin}>
            {sliderProperties.LowRangeLabel}
          </Text>
          <Text style={localStyle.sliderTextMax}>
            {sliderProperties.HighRangeLabel}
          </Text>
        </View>
      </View>
    ) : null;
  };

  /**
   * decides what ui-elements needs to be rendered (based on the type of an item)
   * @param  {QuestionnaireItem} item questionnaire item
   */
  createUIElement = (item) => {
    let itemControlExtension;
    let isSlider;
    switch (item.type) {
      // creates regular inputs for strings
      case 'string':
        return this.createInput(item);

      // creates a radio-item
      case 'choice':
      case 'open-choice':
        return this.createChoices(item);

      // creates a checkbox
      case 'boolean':
        return this.createBoolean(item);

      // creates a date input
      case 'date':
        return this.createDatePicker(item);

      // creates a group of checkboxes, at least one must be checked
      // case 'open-choice':
      // 	return this.createOpenChoices(item)

      // creates the inputs for decimals and integers (and numerical sliders)
      // this also utilizes the decimal-pad or the num-pad
      case 'integer':
      case 'decimal':
        itemControlExtension = item?.extension?.find(
          (e) =>
            e.url ===
            'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl',
        );
        isSlider = itemControlExtension?.valueCodeableConcept?.coding?.find(
          (c) =>
            c.system === 'http://hl7.org/fhir/questionnaire-item-control' &&
            c.code === 'slider',
        );
        return isSlider ? this.createSlider(item) : this.createInput(item);

      // if nothing else matches - display the title if at least the dependencies check out
      default:
        // checks the dependencies of the item and renders it (if the dependencies check out)
        return this.getRenderStatusOfItem(item) ? (
          <Text
            style={{
              ...localStyle.contentTitle,
              fontSize: this.calculateFontSize(item.linkId),
              lineHeight: this.calculateLineHeight(item.linkId),
              marginLeft: this.calculateIndent(item.linkId),
            }}
          >
            {item.text}
          </Text>
        ) : null;
    }
  };

  /**
   * iterates over a an array of items and creates a view-component that wraps the item and
   * its sub-items (if the sub-items are to be rendered)
   * @param  {QuestionnaireItem[]} items
   */
  createItemView = (items) => {
    // filters the items so that only the ones with an actual title are displayed
    const filteredItems = items.filter(
      (cat) => cat.text && cat.text.length !== 0,
    );

    // iterates over all filtered questionnaire items
    return filteredItems.map(
      (item) =>
        // if the second number in the linkId matches the currentPageIndex:
        // renders the UI Element and then creates another sub-view for the sub-items (if applicable)
        this.getSecondIndexOfLinkId(item.linkId) ===
          // eslint-disable-next-line react/destructuring-assignment
          this.props.currentPageIndex.toString() && (
          <View key={item.linkId}>
            {this.createUIElement(item)}
            {item.item && this.createItemView(item.item)}
          </View>
        ),
    );
  };

  /**
   * creates the wrapper view and also renders the title of the current modal-page.
   * triggers createItemView()
   */
  createModalContent = () => {
    const { categories, currentCategoryIndex } = this.props;
    return (
      <View style={localStyle.content}>
        <ScrollView
          ref={this.scrollViewRef}
          onScroll={this.handleOnScroll}
          scrollEventThrottle={16}
        >
          <View style={localStyle.modalViewWrapper}>
            <View>
              <Text
                style={localStyle.modalTitle}
                ref={this.modalTitleRef}
                accessibilityRole={
                  localization.translate('accessibility').types.header
                }
              >
                {`${categories[currentCategoryIndex].text}`}
              </Text>
            </View>
            {this.createItemView(categories[currentCategoryIndex].item)}
          </View>
        </ScrollView>
      </View>
    );
  };

  /**
   * creates the bottom-navigation-bar of the modal
   */
  createBottomBar = () => {
    const { currentPageIndex, currentCategoryIndex, categories, actions } =
      this.props;
    return (
      <View
        style={
          config.appConfig.useProgressBar
            ? localStyle.bottomBarWrapper
            : localStyle.bottomBarWrapperWithShadow
        }
      >
        {config.appConfig.useProgressBar && (
          <ProgressBar
            progress={
              config.appConfig.useStrictModeProgressBar
                ? exportService.calculatePageProgress(this.props)
                : currentPageIndex /
                  categories[currentCategoryIndex].item.length
            }
          />
        )}

        <View style={localStyle.bottomBarButtons}>
          {/* the left navigational button if we're not on page 1 */}
          {currentPageIndex > 1 && (
            <Button
              type="clear"
              accessibilityLabel={localization.translate('accessibility').back}
              accessibilityRole={
                localization.translate('accessibility').types.button
              }
              accessibilityHint={
                localization.translate('accessibility').questionnaire
                  .leftButtonHint
              }
              onPress={() => {
                setAccessibilityResponder(this.modalTitleRef);
                this.lastPageNavigationWasForwards = false;
                actions.switchContent(false);
                this.handleScrollTo({ y: 0, animated: false });
              }}
              style={localStyle.modalPaginationButton}
              icon={
                <Icon
                  name={I18nManager.isRTL ? 'arrow-right' : 'arrow-left'}
                  type="material-community"
                  color={config.theme.colors.accent4}
                />
              }
            />
          )}

          {/* placeholder for the button on the left side if we're on page 1 */}
          {currentPageIndex === 1 && (
            <View
              style={{
                ...localStyle.modalPaginationButton,
                ...localStyle.modalPaginationButtonLeft,
              }}
            />
          )}

          {/* the confirmation button in the middle - its color depends on checkCurrentPageState() */}
          <Button
            type="clear"
            accessibilityLabel={
              this.checkCurrentPageState()
                ? localization.translate('accessibility').questionnaire
                    .middleButtonFinished
                : localization.translate('accessibility').questionnaire
                    .middleButtonUnfinished
            }
            accessibilityRole={
              localization.translate('accessibility').types.button
            }
            accessibilityHint={
              localization.translate('accessibility').questionnaire
                .middleButtonHint
            }
            onPress={() => {
              setAccessibilityResponder(this.modalTitleRef);
              this.lastPageNavigationWasForwards = true;
              actions.switchContent(
                true,
                categories[currentCategoryIndex].item.length,
                currentPageIndex,
              );
              this.handleScrollTo({ y: 0, animated: false });
            }}
            icon={
              <Icon
                name="check"
                reverse
                type="material-community"
                color={
                  this.checkCurrentPageState()
                    ? config.theme.colors.success
                    : config.theme.colors.accent4
                }
              />
            }
          />

          {/* navigational button on the right side - if we're not the last page
					accessibility: if VoiceOver/TalkBalk is on, we use this button for the closing mechanism,
					as the middle button can be used to go to the next page. */}
          {currentPageIndex < categories[currentCategoryIndex].item.length && (
            <Button
              type="clear"
              accessibilityLabel={localization.translate('accessibility').close}
              accessibilityRole={
                localization.translate('accessibility').types.button
              }
              accessibilityHint={
                localization.translate('accessibility').questionnaire
                  .rightButtonHint
              }
              onPress={() => {
                if (!this.isAccessibilityOn) {
                  setAccessibilityResponder(this.modalTitleRef);
                  this.lastPageNavigationWasForwards = true;
                  actions.switchContent(true);
                  this.handleScrollTo({ y: 0, animated: false });
                } else {
                  // when accessibility features are enabled, user should be able to close modal with this button
                  actions.hideQuestionnaireModal();
                }
              }}
              style={localStyle.modalPaginationButton}
              icon={
                <Icon
                  name={
                    this.isAccessibilityOn
                      ? 'close'
                      : I18nManager.isRTL
                      ? 'arrow-left'
                      : 'arrow-right'
                  }
                  type="material-community"
                  color={config.theme.colors.accent4}
                />
              }
            />
          )}

          {/* placeholder in for the button on the right side - if we're on the last page */}
          {currentPageIndex ===
            categories[currentCategoryIndex].item.length && (
            <View
              style={{
                ...localStyle.modalPaginationButton,
                ...localStyle.modalPaginationButtonRight,
              }}
            />
          )}
        </View>
      </View>
    );
  };

  /**
   * creates the modal itself if categories are loaded
   */
  createFormContent = () => {
    const { showQuestionnaireModal, actions, categories } = this.props;
    return (
      <View>
        {categories && (
          <RNModal
            scrollOffsetMax={50}
            avoidKeyboard
            propagateSwipe
            backdropOpacity={0.9}
            style={localStyle.modal}
            swipeDirection={['down']}
            scrollTo={this.handleScrollTo}
            scrollOffset={this.scrollOffset}
            isVisible={showQuestionnaireModal}
            onBackdropPress={actions.hideQuestionnaireModal}
            onSwipeComplete={actions.hideQuestionnaireModal}
            onBackButtonPress={actions.hideQuestionnaireModal}
            onModalWillHide={() =>
              exportService.checkCompletionStateOfMultipleItems(
                null,
                this.props,
              )
            }
          >
            {/* renders the content of the page */}
            {this.createModalContent()}

            {/* renders the bottom bar */}
            {this.createBottomBar()}
          </RNModal>
        )}
      </View>
    );
  };
}

/***********************************************************************************************
styles
***********************************************************************************************/

// calculates the current size of the modal. this is necessary to impose the correct values
// when in RTL rendering.
const modalWidth = Dimensions.get('window').width - 40;

localStyle = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    marginTop: 20,
    borderRadius: 10,
  },

  content: {
    backgroundColor: config.theme.values.defaultModalContentBackgroundColor,
    paddingLeft: 20,
    paddingRight: 20,
    height: 'auto',
    maxHeight: '90%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  contentTitle: {
    marginTop: 5,

    marginBottom: 5,
    ...config.theme.fonts.header2,
    color: config.theme.values.defaultModalTitleColor,
    ...(I18nManager.isRTL && {
      width: modalWidth,
      textAlign: 'left',
    }),
  },

  modalViewWrapper: {
    paddingTop: 20,
    paddingBottom: 20,
    ...(I18nManager.isRTL && {
      alignItems: 'flex-start',
    }),
  },

  alignmentWrapper: {
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },

  choice: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    paddingLeft: 0,
    paddingRight: 0,
    margin: 0,
  },

  choiceText: {
    margin: 0,
    padding: 0,
    ...config.theme.fonts.label,
    color: config.theme.values.defaultModalContentTextColor,
  },

  bottomBarWrapper: {
    backgroundColor: config.theme.values.defaultModalBottomBarBackgroundColor,
  },

  bottomBarWrapperWithShadow: {
    backgroundColor: config.theme.values.defaultModalBottomBarBackgroundColor,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },

  bottomBarButtons: {
    flexWrap: 'nowrap',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  modalTitle: {
    fontSize: 24,
    marginBottom: 5,
    ...config.theme.fonts.title,
    color: config.theme.values.defaultModalTitleColor,
  },

  modalInput: {
    marginBottom: 10,
    ...(I18nManager.isRTL && {
      alignItems: 'flex-start',
    }),
  },

  modalContainer: {
    ...(I18nManager.isRTL && {
      width: modalWidth,
    }),
  },

  modalPaginationButton: {
    width: 44,
    height: 44,
  },

  modalPaginationButtonLeft: {
    position: 'relative',
  },

  modalPaginationButtonRight: {
    position: 'relative',
  },

  separator: {
    height: 1,
    backgroundColor: config.theme.values.defaultSeparatorColor,
  },

  sliderTextMax: {
    width: '33%',
    textAlign: 'right',
  },

  sliderTextMin: {
    width: '33%',
    textAlign: 'left',
  },

  sliderLabel: {
    width: modalWidth,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateTimePickerButtonBar: {
    flexWrap: 'nowrap',
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    paddingRight: 20,
  },
  dateTimePickerButton: {
    paddingRight: 40,
  },
});

/***********************************************************************************************
export
***********************************************************************************************/

export default QuestionnaireModal;
