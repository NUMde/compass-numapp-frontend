import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { navigationPropType } from '~propTypes';

// components
import { Spinner, Banner, ScrollIndicatorWrapper } from '~components/shared';
import QuestionnaireModal from '~components/questionnaireModal';
import CategoriesList from '~components/survey/categoriesList';

// services
import translate from '~services/localization';
import { theme } from '~config';
import exportService from '~services/questionnaireAnalyzer';

// redux actions
import { fetchQuestionnaire, switchContent } from '~store/questionnaire.slice';
import { sendQuestionnaireResponse } from '~store/sharedActions';

import { Routes } from '~navigation/constants';

/***********************************************************************************************
 * renders the survey-screen with the list of all categories, the modal to answer the questionnaire
 * and a button to send the response to the server
 *
 * @param  {object}    props
 * @param  {object}    props.navigation the navigation object provided by 'react-navigation'
 ***********************************************************************************************/
function SurveyScreen({ navigation }) {
  const dispatch = useDispatch();

  const { itemMap, categories, FHIRmetadata } = useSelector(
    (state) => state.Questionnaire,
  );
  const { loading, error } = useSelector((state) => state.Globals);
  const { current_questionnaire_id, subjectId, start_date } = useSelector(
    (state) => state.User,
  );

  // when the component loads and no categories are present - i.e. no questionnaire has previously been fetched
  // get questionnaire from backend if no error ocurred before
  useEffect(() => {
    if (!categories && !error && !loading) {
      if (new Date() > new Date(start_date)) {
        dispatch(
          fetchQuestionnaire({
            questionnaireID: current_questionnaire_id,
            subjectId,
          }),
        );
      } else {
        navigation.navigate(Routes.CHECK_IN);
      }
    }
  }, [
    categories,
    dispatch,
    error,
    loading,
    current_questionnaire_id,
    subjectId,
    navigation,
    start_date,
  ]);

  // check if all categories of the questionnaire have been answered as required
  const done = categories?.every((category) => itemMap[category.linkId].done);

  /**
   * handle submission of questionnaire
   */
  const handleSubmit = () => {
    Alert.alert(
      translate('generic').info,
      translate('survey').sendFinishedMessage,
      [
        {
          text: translate('survey').sendFinished,
          onPress: () => {
            dispatch(
              sendQuestionnaireResponse({
                body: exportService.createResponseJSON(
                  itemMap,
                  categories,
                  FHIRmetadata,
                ),
              }),
            );
            navigation.navigate(Routes.CHECK_IN);
          },
        },
        {
          text: translate('generic').abort,
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };

  return loading ? (
    <Spinner />
  ) : (
    <View style={[localStyle.flexi, localStyle.wrapper]} testID="SurveyScreen">
      {/* render the top banner */}
      <Banner nav={navigation} title={translate('survey').title} />

      {/* the questionnaire modal */}
      <QuestionnaireModal />

      <ScrollIndicatorWrapper>
        <View style={[localStyle.flexi, localStyle.wrapper]}>
          {/* creates the list items for the categories */}
          <CategoriesList
            showQuestionnaireModal={(categoryIndex, pageIndex) => {
              dispatch(switchContent({ categoryIndex, pageIndex }));
            }}
            categories={categories}
            itemMap={itemMap}
          />
        </View>
      </ScrollIndicatorWrapper>
      {/* renders a send-button at the bottom if the questionnaire is completed */}
      <View>
        {done && (
          <TouchableOpacity
            accessibilityLabel={translate('survey').send}
            accessibilityRole={translate('accessibility').types.button}
            accessibilityHint={
              translate('accessibility').questionnaire.sendHint
            }
            onPress={handleSubmit}
            style={[localStyle.button, localStyle.buttonComplete]}
          >
            <Text style={localStyle.buttonLabel}>
              {translate('survey').send}
            </Text>
          </TouchableOpacity>
        )}
        {/* renders a button to retry fetching of questionnaire */}
        {error?.failedAction === 'questionnaire/FETCH' && (
          <TouchableOpacity
            accessibilityLabel={translate('login').landing.retry}
            accessibilityRole={translate('accessibility').types.button}
            accessibilityHint={translate('accessibility').refreshHint}
            onPress={() =>
              dispatch(
                fetchQuestionnaire({
                  questionnaireID: current_questionnaire_id,
                  subjectId,
                }),
              )
            }
            style={[localStyle.button, localStyle.buttonAlert]}
          >
            <Text style={localStyle.buttonLabel}>
              {translate('login').landing.retry}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

SurveyScreen.propTypes = {
  navigation: PropTypes.shape(navigationPropType).isRequired,
};

/***********************************************************************************************
localStyle
***********************************************************************************************/

const localStyle = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.values.defaultBackgroundColor,
  },

  flexi: {
    flex: 1,
  },

  bottom: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    flex: 1 / 6,
    width: '100%',
  },

  bottomHidden: {
    display: 'none',
  },

  button: {
    ...theme.classes.buttonPrimary,
    bottom: 0,
    width: '80%',
    textAlign: 'center',
  },

  buttonComplete: {
    backgroundColor: theme.values.defaultSendQuestionnaireButtonBackgroundColor,
  },

  buttonAlert: {
    backgroundColor: theme.colors.alert,
  },

  buttonLabel: {
    ...theme.classes.buttonLabel,
  },
});

/***********************************************************************************************
  export
  ***********************************************************************************************/

export default SurveyScreen;
