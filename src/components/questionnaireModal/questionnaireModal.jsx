// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/**
 * the code contained in this file is rendering the content (meaning the ui-elements) of
 * the modal that opens when an item on the survey screen is clicked on. the user-input
 * received by these ui-elements is persisted in the object "questionnaireItemMap", located
 * in the checkIn state.
 *
 * the following terms are used in the comments in this file:
 *
 * item:
 * a single questionnaire item:
 * https://www.hl7.org/fhir/questionnaire-definitions.html#Questionnaire.item
 *
 * categories:
 * all first level items with linkIds like "1" or "6" or "15"
 * page:
 * a page is composed of all sub-items of a category that have
 * the identical value as the second position of their linkId. for example:
 * all linkIds starting with "1.2" (and "1.2.1" and "1.2.1.1" and so on) will
 * be considered a page
 */

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { useState, useRef, useEffect } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ScrollView,
  I18nManager,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// components
import RNModal from 'react-native-modal';
import { Icon } from 'react-native-elements';

// custom components
import BottomBar from './bottomBar';
import QuestionnaireItem from './questionnaireItem';

// redux actions
import { switchContent } from '../../store/questionnaire.slice';

// services & config
import setAccessibilityResponder from '../../services/setAccessibilityResponder';
import translate from '../../services/localization';
import config from '../../config/configProvider';

/***********************************************************************************************
 * component:
 * renders the questionnaireModal and the contents of the questionnaire
 ***********************************************************************************************/
function QuestionnaireModal() {
  const dispatch = useDispatch();

  // creating references
  const scrollViewRef = useRef();
  const modalTitleRef = useRef();

  // setting defaults
  let scrollOffset = 0;

  const { pageIndex, categoryIndex, categories } = useSelector(
    (state) => state.Questionnaire,
  );

  // show the modal if the currently chosen categoryIndex is valid (i.e. > -1)
  const modalVisible = categoryIndex > -1;

  useEffect(() => {
    setAccessibilityResponder(modalTitleRef);
  });

  /**
   * handles the scroll-event of the scrollView
   * @param  {object} event scroll event
   */
  const handleOnScroll = (event) => {
    // just sets the current scrollOffset
    scrollOffset = event.nativeEvent.contentOffset.y;
  };

  /**
   * @param  {{ y: number, animated: boolean }} element UI element that RNModal will scroll to (for example if the software-keyboard is shown)
   */
  const handleScrollTo = (element) => {
    // scrolls to the given element if the scrollView is currently active
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ ...element, animated: true });
    }
  };

  const hideModalHandle = () => {
    dispatch(switchContent({ categoryIndex: -1, pageIndex: 0 }));
  };

  /**
   * renders the content based on the currently chosen category
   */
  return (
    <RNModal
      scrollOffsetMax={50}
      avoidKeyboard
      propagateSwipe
      backdropOpacity={0.9}
      style={localStyle.modal}
      swipeDirection={['down']}
      scrollTo={handleScrollTo}
      scrollOffset={scrollOffset}
      isVisible={modalVisible}
      onBackdropPress={hideModalHandle}
      onSwipeComplete={hideModalHandle}
      onBackButtonPress={hideModalHandle}
      testID="QuestionnaireModal"
    >
      {/* renders the content of the page */}
      {modalVisible && (
        <>
          <View style={localStyle.content}>
            <View style={localStyle.titleWrapper}>
              <Text
                style={localStyle.modalTitle}
                ref={modalTitleRef}
                accessibilityRole={translate('accessibility').types.header}
              >
                {`${categories[categoryIndex].text}`}
              </Text>
              {/* button to close the modal */}
              <TouchableOpacity
                onPress={() => {
                  dispatch(switchContent({ categoryIndex: -1, pageIndex: 0 }));
                }}
                accessibilityRole={translate('accessibility').types.button}
                accessibilityLabel={translate('accessibility').close}
                accessibilityHint={translate('accessibility').closeHint}
                testID="QuestionnaireModal_close"
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
              ref={scrollViewRef}
              onScroll={handleOnScroll}
              scrollEventThrottle={16}
            >
              <QuestionnaireItem
                item={categories[categoryIndex].item[pageIndex - 1]}
                key={categories[categoryIndex].item[pageIndex - 1].linkId}
                testID={`QuestionnaireItem_${
                  categories[categoryIndex].item[pageIndex - 1].linkId
                }`}
              />
            </ScrollView>
          </View>

          {/* renders the bottom bar with the buttons to switch between
              questions*/}
          <BottomBar
            modalTitleRef={modalTitleRef}
            handleScrollTo={handleScrollTo}
            hideModal={hideModalHandle}
          />
        </>
      )}
      {/* empty View in case the modal is hidden */}
      {!modalVisible && <View />}
    </RNModal>
  );
}

/***********************************************************************************************
styles
***********************************************************************************************/

const localStyle = StyleSheet.create({
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
