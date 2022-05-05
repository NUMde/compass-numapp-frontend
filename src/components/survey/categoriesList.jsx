import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { ListItem } from 'react-native-elements';

import memoize from 'lodash.memoize';

import translate from '~services/localization';
import config from '~config/configProvider';
import questionnaireAnalyzer from '~services/questionnaireAnalyzer';

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

  // internal state to control which category is expanded
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleAccordion = (index) => {
    if (expandedCategory === index) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(index);
    }
  };

  if (categories) {
    return (
      <View style={localStyle.wrapper}>
        {/* create accordion listItem for each category (i.e. first level item)*/}
        {categories.map((category, categoryIndex) => {
          // get additional properties based on the completion state of the category
          const { done: categoryDone, started: categoryStarted } =
            itemMap[category.linkId];
          return (
            <ListItem.Accordion
              content={
                <TouchableOpacity
                  style={localStyle.accordionContent}
                  onPress={() => showQuestionnaireModal(categoryIndex)}
                >
                  <ListItem.Chevron
                    type="material-community"
                    name={chevronProps(categoryDone, categoryStarted).name}
                    size={12}
                    reverse
                    color={chevronProps(categoryDone, categoryStarted).color}
                    testID={`${category.linkId}_icon`}
                  />
                  <ListItem.Content>
                    <ListItem.Title style={localStyle.titleStyle}>
                      {category.text}
                    </ListItem.Title>
                  </ListItem.Content>
                </TouchableOpacity>
              }
              isExpanded={categoryIndex === expandedCategory}
              key={category.linkId}
              containerStyle={localStyle.accordionContainer}
              icon={{
                name: 'expand-more',
                size: 24,
                onPress: () => toggleAccordion(categoryIndex),
                accessibilityHint:
                  categoryIndex !== expandedCategory
                    ? translate('accessibility').questionnaire.expandCategory
                    : translate('accessibility').questionnaire.collapseCategory,
                accessibilityRole: translate('accessibility').types.button,
              }}
              accessibilityLabel={category.text}
              accessibilityRole={translate('accessibility').types.button}
              accessibilityHint={a11yHint(categoryDone, categoryStarted)}
            >
              {/* when category is expanded list items of that category */}
              {categoryIndex === expandedCategory &&
                category.item.map((categoryItem, pageIndex) => {
                  const { done: itemDone, started: itemStarted } =
                    itemMap[categoryItem.linkId];
                  // only display item when dependencies are met
                  return questionnaireAnalyzer.checkDependenciesOfSingleItem(
                    categoryItem,
                    itemMap,
                  ) ? (
                    <ListItem
                      key={categoryItem.linkId}
                      containerStyle={[localStyle.listItemContainer]}
                      onPress={() =>
                        showQuestionnaireModal(categoryIndex, pageIndex + 1)
                      }
                    >
                      <ListItem.Chevron
                        type="material-community"
                        name={chevronProps(itemDone, itemStarted).name}
                        size={10}
                        reverse
                        color={chevronProps(itemDone, itemStarted).color}
                        testID={`${category.linkId}_icon`}
                      />
                      {/* title */}
                      <ListItem.Content>
                        <ListItem.Title style={localStyle.itemTitleStyle}>
                          {categoryItem.text}
                        </ListItem.Title>
                      </ListItem.Content>
                    </ListItem>
                  ) : null;
                })}
            </ListItem.Accordion>
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

  accordionContainer: {
    backgroundColor: config.theme.values.defaultSurveyItemBackgroundColor,
    width: '100%',
  },
  accordionContent: {
    flex: 1,
    paddingLeft: 0,
    flexDirection: 'row',
    backgroundColor: config.theme.values.defaultSurveyItemBackgroundColor,
  },

  listItemContainer: {
    width: '100%',
    borderBottomColor: config.theme.colors.accent3,
    borderBottomWidth: 1,
    backgroundColor: config.theme.values.defaultSurveyItemBackgroundColor,
    paddingLeft: 17,
  },

  titleStyle: {
    ...config.theme.fonts.header2,
    paddingLeft: 14,
    color: config.theme.values.defaultSurveyItemTitleColor,
  },

  itemTitleStyle: {
    ...config.theme.fonts.header3,
    color: config.theme.values.defaultSurveyItemTitleColor,
  },
});

export default CategoriesList;
