import React from 'react';
import { View, StyleSheet, I18nManager } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Icon } from 'react-native-elements';

import {
  hideQuestionnaireModal,
  switchContent,
  setQuestionnaireItemMap,
} from '../../screens/checkIn/checkInActions';

import setAccessibilityResponder from '../../services/setAccessibilityResponder';

import exportService from '../../services/questionnaireAnalyzer';
import translate from '../../services/localization';
import config from '../../config/configProvider';
import ProgressBar from './progressbar';

export default /**
 * creates the bottom-navigation-bar of the modal
 * @param {object} props the props of this component
 * @param {React.RefObject<any>} props.modalTitleRef a reference object of the modal title for a11y purposes
 * @param {Function} props.handleScrollTo a callback to scroll to the top when switching between pages
 */
function BottomBar({ modalTitleRef, handleScrollTo }) {
  const {
    currentPageIndex,
    currentCategoryIndex,
    questionnaireItemMap,
    categories,
  } = useSelector((state) => state.CheckIn);
  const completed = exportService.checkCompletionStateOfMultipleItems(
    [
      categories[currentCategoryIndex].item[
        // the -1 is necessary as the indexes of the questionnaire-items start wit 1
        currentPageIndex - 1
      ],
    ],
    categories,
    questionnaireItemMap,
    (itemMap) => dispatch(setQuestionnaireItemMap(itemMap)),
  );
  const dispatch = useDispatch();

  /**
   * handler for the 'forward' button
   */
  const handleForwardPress = () => {
    setAccessibilityResponder(modalTitleRef);
    // when on last page, hide modal; there is no way forward
    if (currentPageIndex === categories[currentCategoryIndex].item.length) {
      dispatch(hideQuestionnaireModal());
    } else {
      dispatch(switchContent(true));
    }
    handleScrollTo({ y: 0, animated: false });
  };

  /**
   * handler for the 'back' button
   */
  const handleBackPress = () => {
    setAccessibilityResponder(modalTitleRef);
    dispatch(switchContent(false));
    handleScrollTo({ y: 0, animated: false });
  };
  return (
    <View
      style={
        config.appConfig.useProgressBar
          ? bottomBarStyles.bottomBarWrapper
          : bottomBarStyles.bottomBarWrapperWithShadow
      }
    >
      {config.appConfig.useProgressBar && (
        <ProgressBar
          progress={
            config.appConfig.useStrictModeProgressBar
              ? exportService.calculatePageProgress(
                  categories,
                  currentCategoryIndex,
                  currentPageIndex,
                  questionnaireItemMap,
                )
              : currentPageIndex / categories[currentCategoryIndex].item.length
          }
        />
      )}

      <View style={bottomBarStyles.bottomBarButtons}>
        {/* the left navigational button; hidden if on page 1 */}
        <Button
          type="clear"
          disabled={currentPageIndex === 1}
          disabledStyle={bottomBarStyles.disabledButton}
          accessibilityLabel={translate('accessibility').back}
          accessibilityRole={translate('accessibility').types.button}
          accessibilityHint={
            translate('accessibility').questionnaire.leftButtonHint
          }
          onPress={handleBackPress}
          style={bottomBarStyles.modalPaginationButton}
          icon={
            <Icon
              name={I18nManager.isRTL ? 'arrow-right' : 'arrow-left'}
              type="material-community"
              color={config.theme.colors.accent4}
            />
          }
        />
        {/* the confirmation button in the middle - its color depends on checkCurrentPageState() */}
        <Button
          type="clear"
          accessibilityLabel={
            completed
              ? translate('accessibility').questionnaire.middleButtonFinished
              : translate('accessibility').questionnaire.middleButtonUnfinished
          }
          accessibilityRole={translate('accessibility').types.button}
          accessibilityHint={
            translate('accessibility').questionnaire.middleButtonHint
          }
          onPress={handleForwardPress}
          icon={
            <Icon
              name="check"
              reverse
              type="material-community"
              color={
                completed
                  ? config.theme.colors.success
                  : config.theme.colors.accent4
              }
            />
          }
        />
        {/* navigational button on the right side - if we're not the last page
                   accessibility: if VoiceOver/TalkBalk is on, we use this button for the closing mechanism,
                   as the middle button can be used to go to the next page. */}
        <Button
          type="clear"
          accessibilityLabel={translate('accessibility').neext}
          accessibilityRole={translate('accessibility').types.button}
          accessibilityHint={
            translate('accessibility').questionnaire.rightButtonHint
          }
          onPress={() => {
            handleForwardPress();
          }}
          style={bottomBarStyles.modalPaginationButton}
          icon={
            <Icon
              name={I18nManager.isRTL ? 'arrow-left' : 'arrow-right'}
              type="material-community"
              color={config.theme.colors.accent4}
            />
          }
          disabled={
            currentPageIndex === categories[currentCategoryIndex]?.item.length
          }
          disabledStyle={bottomBarStyles.disabledButton}
        />
      </View>
    </View>
  );
}

const bottomBarStyles = StyleSheet.create({
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
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },

  disabledButton: {
    opacity: 0,
  },

  modalPaginationButton: {
    width: 44,
    height: 44,
    position: 'relative',
  },
});
