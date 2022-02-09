// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import config from '../../config/configProvider';
import { Banner, ScrollIndicatorWrapper } from '../../components/shared';
import QuestionnaireModal from '../../components/questionnaireModal';
import CategoriesList from '../../components/survey/categoriesList';
import localization from '../../services/localization/localization';

let localStyle;

/***********************************************************************************************
component:
renders the survey screen
***********************************************************************************************/

class SurveyScreen extends PureComponent {
  /**
   * @param  {object}   props
   * @param  {object}   props.actions holds actions for the component (./checkInActions.js)
   * @param  {object}   props.navigation the navigation object provided by 'react-navigation'
   * @param  {Array}	  props.categories array with an entry for each category
   * @param  {Function} props.exportAndUploadQuestionnaireResponse exports the questionnaire
   * @param  {object}   props.questionnaireItemMap object holding every item from the questionnaire
   */

  // rendering
  /*-----------------------------------------------------------------------------------*/

  render() {
    const {
      actions,
      navigation,
      showDatePicker,
      categories,
      currentPageIndex,
      currentCategoryIndex,
      questionnaireItemMap,
      showQuestionnaireModal,
      exportAndUploadQuestionnaireResponse,
    } = this.props;
    return (
      <View style={{ ...localStyle.flexi, ...localStyle.wrapper }}>
        {/* render the top banner */}
        <Banner
          nav={navigation}
          title={localization.translate('survey').title}
        />

        {/* the questionnaire modal */}
        <QuestionnaireModal
          actions={actions}
          categories={categories}
          showDatePicker={showDatePicker}
          currentPageIndex={currentPageIndex}
          currentCategoryIndex={currentCategoryIndex}
          showQuestionnaireModal={showQuestionnaireModal}
          questionnaireItemMap={questionnaireItemMap}
        />

        <ScrollIndicatorWrapper
          contentData={
            <View style={{ ...localStyle.flexi, ...localStyle.wrapper }}>
              {/* creates the list items for the categories */}
              <CategoriesList
                showQuestionnaireModal={actions.showQuestionnaireModal}
                categories={categories}
                questionnaireItemMap={questionnaireItemMap}
              />

              {/* renders a send-button at the bottom if the questionnaire is completed */}
              <View style={localStyle.bottom}>
                {questionnaireItemMap && questionnaireItemMap.done && (
                  <TouchableOpacity
                    accessibilityLabel={localization.translate('survey').send}
                    accessibilityRole={
                      localization.translate('accessibility').types.button
                    }
                    accessibilityHint={
                      localization.translate('accessibility').questionnaire
                        .sendHint
                    }
                    onPress={() => exportAndUploadQuestionnaireResponse()}
                    style={{
                      ...localStyle.button,
                      ...localStyle.buttonComplete,
                    }}
                  >
                    <Text style={localStyle.buttonLabel}>
                      {localization.translate('survey').send}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          }
        />
      </View>
    );
  }
}

/***********************************************************************************************
localStyle
***********************************************************************************************/

localStyle = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    backgroundColor: config.theme.values.defaultBackgroundColor,
  },

  flexi: {
    flex: 1,
  },

  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
    height: '100%',
    marginTop: 20,
  },

  button: {
    ...config.theme.classes.buttonPrimary,
    bottom: 0,
    marginTop: 10,
    width: '80%',
    textAlign: 'center',
  },

  buttonComplete: {
    backgroundColor:
      config.theme.values.defaultSendQuestionnaireButtonBackgroundColor,
  },

  buttonLabel: {
    ...config.theme.classes.buttonLabel,
  },
});

/***********************************************************************************************
export
***********************************************************************************************/

export default SurveyScreen;
