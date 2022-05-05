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
import config from '~config/configProvider';
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
    if (!categories && !error) {
      if (new Date() > new Date(start_date)) {
        dispatch(
          fetchQuestionnaire({
            questionnaireID: current_questionnaire_id,
            subjectId,
          }),
        );
      } else if (!loading) {
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

  // Alert user when an error ocurred while fetching data
  useEffect(() => {
    if (error) handleError(error);
  }, [error]);

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

  /**
   * error handler; display alert depending on which action failed
   * @param {*} err
   */
  const handleError = (err) => {
    let errorMessage = '';
    switch (err.failedAction) {
      case 'shared/SEND_QUESTIONNAIRE_RESPONSE': {
        errorMessage = translate('generic').sendError;
        break;
      }
      case 'user/UPDATE': {
        errorMessage = translate('generic').updateError;
        break;
      }
    }
    Alert.alert(
      translate('generic').errorTitle,
      errorMessage,
      [
        {
          text: translate('generic').ok,
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

          {/* renders a send-button at the bottom if the questionnaire is completed */}
          <View style={localStyle.bottom}>
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
          </View>
        </View>
      </ScrollIndicatorWrapper>
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
