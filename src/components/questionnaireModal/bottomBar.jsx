import React from 'react';
import { View, StyleSheet, I18nManager } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

// components
import { Button, Icon } from 'react-native-elements';

// redux actions
import { switchContent } from '~store/questionnaire.slice';

// services & config
import setAccessibilityResponder from '~services/setAccessibilityResponder';
import exportService from '~services/questionnaireAnalyzer';
import translate from '~services/localization';
import config from '~config/configProvider';

// custom components
import ProgressBar from './progressbar';

/***********************************************************************************************
 * component
 * creates the bottom-navigation-bar of the modal
 *
 * @param {object}                props the props of this component
 * @param {function}              props.hideModal a callback to hide the modal
 * @param {React.RefObject<any>}  props.modalTitleRef a reference object of the modal title for a11y purposes
 * @param {function}              props.handleScrollTo a callback to scroll to the top when switching between pages
 **********************************************************************************************/
export default function BottomBar({
  modalTitleRef,
  handleScrollTo,
  hideModal,
}) {
  const dispatch = useDispatch();

  // get data from state

  const { pageIndex, categoryIndex, itemMap, categories } = useSelector(
    (state) => state.Questionnaire,
  );

  // check whether the current page has been completely answered
  const completed =
    itemMap[categories[categoryIndex].item[pageIndex - 1].linkId].done;

  /**
   * handler for the 'forward' and 'confirm' buttons
   */
  const handleForwardPress = () => {
    setAccessibilityResponder(modalTitleRef);
    // skip questions whose dependencies are not
    let index = pageIndex;
    while (index < categories[categoryIndex].item.length) {
      if (
        exportService.checkDependenciesOfSingleItem(
          categories[categoryIndex].item[index],
          itemMap,
        )
      ) {
        dispatch(switchContent({ pageIndex: index + 1 }));
        return handleScrollTo({ y: 0, animated: false });
      }
      index += 1;
    }
    hideModal();
  };

  /**
   * handler for the 'back' button
   */
  const handleBackPress = () => {
    setAccessibilityResponder(modalTitleRef);
    let index = pageIndex - 1;
    while (index >= 0) {
      if (
        exportService.checkDependenciesOfSingleItem(
          categories[categoryIndex].item[index - 1],
          itemMap,
        )
      ) {
        dispatch(switchContent({ pageIndex: index }));
        return handleScrollTo({ y: 0, animated: false });
      }
      index -= 1;
    }
  };

  return (
    <View
      style={
        config.appConfig.useProgressBar
          ? localStyles.bottomBarWrapper
          : localStyles.bottomBarWrapperWithShadow
      }
      testID="BottomBar"
    >
      {config.appConfig.useProgressBar && (
        <ProgressBar
          progress={
            config.appConfig.useStrictModeProgressBar
              ? exportService.calculatePageProgress(
                  categories,
                  categoryIndex,
                  pageIndex,
                  itemMap,
                )
              : pageIndex / categories[categoryIndex].item.length
          }
        />
      )}
      <View style={localStyles.bottomBarButtons}>
        {/* the left navigational button; hidden if on page 1 */}
        <Button
          type="clear"
          disabled={pageIndex === 1}
          disabledStyle={localStyles.disabledButton}
          accessibilityLabel={translate('accessibility').back}
          accessibilityRole={translate('accessibility').types.button}
          accessibilityHint={
            translate('accessibility').questionnaire.leftButtonHint
          }
          onPress={handleBackPress}
          style={localStyles.modalPaginationButton}
          icon={
            <Icon
              name={I18nManager.isRTL ? 'arrow-right' : 'arrow-left'}
              type="material-community"
              color={config.theme.colors.accent4}
            />
          }
          testID="BottomBar_back_btn"
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
          testID="BottomBar_confirm_btn"
        />
        {/* navigational button on the right side */}
        <Button
          type="clear"
          accessibilityLabel={translate('accessibility').next}
          accessibilityRole={translate('accessibility').types.button}
          accessibilityHint={
            translate('accessibility').questionnaire.rightButtonHint
          }
          onPress={() => {
            handleForwardPress();
          }}
          style={localStyles.modalPaginationButton}
          icon={
            <Icon
              name={I18nManager.isRTL ? 'arrow-left' : 'arrow-right'}
              type="material-community"
              color={config.theme.colors.accent4}
            />
          }
          disabled={pageIndex === categories[categoryIndex]?.item.length}
          disabledStyle={localStyles.disabledButton}
          testID="BottomBar_fwd_btn"
        />
      </View>
    </View>
  );
}

BottomBar.propTypes = {
  modalTitleRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.shape({}) }),
  ]).isRequired,
  handleScrollTo: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
};

/***********************************************************************************************
localStyle
***********************************************************************************************/

const localStyles = StyleSheet.create({
  bottomBarWrapper: {
    backgroundColor: config.theme.values.defaultModalBottomBarBackgroundColor,
  },

  bottomBarWrapperWithShadow: {
    backgroundColor: config.theme.values.defaultModalBottomBarBackgroundColor,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 15,
  },

  bottomBarButtons: {
    flexWrap: 'nowrap',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
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
