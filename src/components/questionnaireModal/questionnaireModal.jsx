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
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ScrollView,
  I18nManager,
} from 'react-native';

import { Icon } from 'react-native-elements';

import '../../typedef';
import exportService from '../../services/questionnaireAnalyzer';
import setAccessibilityResponder from '../../services/setAccessibilityResponder';
import translate from '../../services/localization';
import config from '../../config/configProvider';
import BottomBar from './bottomBar';

import QuestionnaireItem from './input/QuestionnaireItem';

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
  }

  componentDidMount() {
    setAccessibilityResponder(this.modalTitleRef);
  }

  // class events
  /*-----------------------------------------------------------------------------------*/

  /**
   * is invoked immediately after updating occurs. this method is not called for the initial render.
   * basically it resets currentPageNeedsRendering and scrolls back to the top.
   */
  componentDidUpdate() {
    const {
      actions,
      categories,
      currentPageIndex,
      currentCategoryIndex,
      questionnaireItemMap,
      showQuestionnaireModal,
    } = this.props;
    // when the requirements for the current question are not met,
    // an update is triggered to skip to the next (or previous) question
    if (
      showQuestionnaireModal &&
      !exportService.checkDependenciesOfSingleItem(
        categories[currentCategoryIndex].item[currentPageIndex - 1],
        questionnaireItemMap,
      )
    ) {
      if (categories[currentCategoryIndex].item.length === currentPageIndex) {
        // if the requirements for last question are not met, the modal is dismissed
        actions.hideQuestionnaireModal();
      } else {
        actions.switchContent();
      }
    }
  }

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

  // rendering
  /*-----------------------------------------------------------------------------------*/

  /**
   * renders the content based on the currently chosen category
   */
  render() {
    // if there is something to render
    const {
      showQuestionnaireModal,
      actions,
      categories,
      currentPageIndex,
      questionnaireItemMap,
      currentCategoryIndex,
    } = this.props;
    return (
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
            categories,
            questionnaireItemMap,
            actions.setQuestionnaireItemMap,
          )
        }
      >
        {/* renders the content of the page */}
        {showQuestionnaireModal && (
          <>
            <View style={localStyle.content}>
              <View style={localStyle.titleWrapper}>
                <Text
                  style={localStyle.modalTitle}
                  ref={this.modalTitleRef}
                  accessibilityRole={translate('accessibility').types.header}
                >
                  {`${categories[currentCategoryIndex].text}`}
                </Text>
                <TouchableOpacity
                  style={localStyle.closeButton}
                  onPress={() => actions.hideQuestionnaireModal()}
                  accessibilityRole={translate('accessibility').types.button}
                  accessibilityLabel={translate('accessibility').close}
                  accessibilityHint={translate('accessibility').closeHint}
                >
                  <Icon
                    name="close"
                    type="material-community"
                    color={config.theme.colors.accent4}
                    accessible={false}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView
                ref={this.scrollViewRef}
                onScroll={this.handleOnScroll}
                scrollEventThrottle={16}
              >
                <QuestionnaireItem
                  item={
                    categories[currentCategoryIndex].item[currentPageIndex - 1]
                  }
                  key={
                    categories[currentCategoryIndex].item[currentPageIndex - 1]
                      .linkId
                  }
                />
              </ScrollView>
            </View>

            {/* renders the bottom bar with the buttons to switch between
              questions*/}
            <BottomBar
              modalTitleRef={this.modalTitleRef}
              handleScrollTo={this.handleScrollTo}
            />
          </>
        )}
        {!showQuestionnaireModal && <View />}
      </RNModal>
    );
  }
}

/***********************************************************************************************
styles
***********************************************************************************************/

localStyle = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    marginTop: 20,
    borderRadius: 10,
  },

  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
    width: I18nManager.isRTL ? '100%' : 'auto',
  },

  modalTitle: {
    fontSize: 24,
    ...config.theme.fonts.title,
    color: config.theme.values.defaultModalTitleColor,
  },

  content: {
    backgroundColor: config.theme.values.defaultModalContentBackgroundColor,
    padding: 20,
    height: 'auto',
    maxHeight: '90%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...(I18nManager.isRTL && {
      alignItems: 'flex-start',
    }),
  },
});

/***********************************************************************************************
export
***********************************************************************************************/

export default QuestionnaireModal;
