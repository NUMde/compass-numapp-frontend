import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { ListItem } from 'react-native-elements';

import memoize from 'lodash.memoize';

import translate from '~services/localization';
import config from '~config/configProvider';

/**
 * depending on the state of the given category an accessibility hint is built from the strings defined in the config file
 * @param {boolean} done whether the category has been completely answered as required
 * @param {boolean} started whether the category has been started
 * @returns {string} a string as accessibility hint describing the state of the category
 */
const getAccessibilityHint = (done, started) => {
  let hint = translate('accessibility').questionnaire.categoryCellHint;
  if (done) {
    return (hint +=
      translate('accessibility').questionnaire.category +
      translate('accessibility').questionnaire.finished);
  }
  if (started) {
    return (hint +=
      translate('accessibility').questionnaire.category +
      translate('accessibility').questionnaire.notFinished);
  }

  return (hint +=
    translate('accessibility').questionnaire.category +
    translate('accessibility').questionnaire.notStarted);
};

/**
 * depending on the state of the given category an accessibility hint is built from the strings defined in the config file
 * @param {boolean} done whether the category has been completely answered as required
 * @param {boolean} started whether the category has been started
 * @returns {{name: string, color : string}} an object describing properties of the chevron
 */
const getCategoryChevronProps = (done, started) => {
  if (done) {
    return {
      name: 'check',
      color: config.theme.values.defaultSurveyIconCompletedColor,
    };
  }
  if (started) {
    return {
      name: 'dots-horizontal',
      color: config.theme.values.defaultSurveyIconTouchedColor,
    };
  }
  return {
    name: 'pencil-outline',
    color: config.theme.values.defaultSurveyIconUntouchedColor,
  };
};

/***********************************************************************************************
 * component
 * renders the list of categories, i.e. the first-level items
 *
 * @param  {object}    props
 * @param  {[QuestionnaireItem]}   props.categories indicates whether the current category has been completely answered
 * @param  {object<string, QuestionnaireItem>}   props.itemMap
 * @param  {function} props.showQuestionnaireModal callback to open the modal at the chosen category
 */
function CategoriesList({ categories, itemMap, showQuestionnaireModal }) {
  // memoize determination of chevronProps
  const chevronProps = memoize(
    getCategoryChevronProps,
    (done, started) => `${done}_${started}`,
  );

  // memoize determination of accessibility hint
  const a11yHint = memoize(
    getAccessibilityHint,
    (done, started) => `${done}_${started}`,
  );

  if (categories) {
    return (
      <View style={localStyle.wrapper}>
        {/* maps a listItem onto each category */}
        {categories.map((category, index) => {
          // get additional properties based on the completion state of the category

          const { done, started } = itemMap[category.linkId];
          return (
            <ListItem
              key={category.linkId}
              containerStyle={localStyle.listItemContainer}
              onPress={() => showQuestionnaireModal(index)}
              accessibilityLabel={category.text}
              accessibilityRole={translate('accessibility').types.button}
              accessibilityHint={a11yHint(done, started)}
            >
              {/* title */}
              <ListItem.Content>
                <ListItem.Title style={localStyle.titleStyle}>
                  {category.text}
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron
                type="material-community"
                name={chevronProps(done, started).name}
                size={12}
                reverse
                color={chevronProps(done, started).color}
                testID={`${category.linkId}_icon`}
              />
            </ListItem>
          );
        })}
      </View>
    );
  }
  return <View />;
}

CategoriesList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      linkId: PropTypes.string,
      text: PropTypes.string.isRequired,
    }),
  ),
  itemMap: PropTypes.objectOf(
    PropTypes.shape({ linkId: PropTypes.string, text: PropTypes.string }),
  ),
  showQuestionnaireModal: PropTypes.func.isRequired,
};

CategoriesList.defaultProps = {
  categories: null,
  itemMap: null,
};

const localStyle = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    backgroundColor: config.theme.values.defaultBackgroundColor,
  },

  listItemContainer: {
    width: '100%',
    borderBottomColor: config.theme.colors.accent3,
    borderBottomWidth: 1,
    backgroundColor: config.theme.values.defaultSurveyItemBackgroundColor,
  },

  titleStyle: {
    ...config.theme.fonts.title2,
    color: config.theme.values.defaultSurveyItemTitleColor,
  },
});

export default CategoriesList;
