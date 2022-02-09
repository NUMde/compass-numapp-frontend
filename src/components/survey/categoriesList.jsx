import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import localization from '../../services/localization/localization';
import config from '../../config/configProvider';

class CategoriesList extends Component {
  /**
   * depending on the state of the given category an accessibility hint is built from the strings defined in the config file
   * @param {*} category
   * @returns a string as accessibility hint
   */
  getAccessibilityHint = (category) => {
    const { questionnaireItemMap } = this.props;
    let hint =
      localization.translate('accessibility').questionnaire.categoryCellHint;
    if (
      !questionnaireItemMap[category.linkId].done &&
      questionnaireItemMap[category.linkId].started
    ) {
      return (hint +=
        localization.translate('accessibility').questionnaire.category +
        localization.translate('accessibility').questionnaire.notFinished);
    }
    if (
      !questionnaireItemMap[category.linkId].done &&
      questionnaireItemMap[category.linkId].started
    ) {
      return (hint +=
        localization.translate('accessibility').questionnaire.category +
        localization.translate('accessibility').questionnaire.notStarted);
    }
    if (questionnaireItemMap[category.linkId].done) {
      return (hint +=
        localization.translate('accessibility').questionnaire.category +
        localization.translate('accessibility').questionnaire.finished);
    }
    return (hint += '');
  };

  getCategoryChevronProps = (category) => {
    const { questionnaireItemMap } = this.props;
    const categoryState = questionnaireItemMap[category.linkId];
    if (categoryState.done) {
      return {
        name: 'check',
        color: config.theme.values.defaultSurveyIconCompletedColor,
      };
    }
    if (categoryState.started) {
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

  render() {
    const { showQuestionnaireModal, categories } = this.props;
    if (categories) {
      return (
        <View style={localStyle.wrapper}>
          {/* maps a listItem onto each category */}
          {categories.map((category, index) => {
            // get additional properties based on the completion state of the category
            const chevronProps = this.getCategoryChevronProps(category);
            return (
              <ListItem
                key={category.linkId}
                containerStyle={localStyle.listItemContainer}
                onPress={() => showQuestionnaireModal(index)}
                accessibilityLabel={category.text}
                accessibilityRole={
                  localization.translate('accessibility').types.button
                }
                accessibilityHint={this.getAccessibilityHint(category)}
              >
                {/* title */}
                <ListItem.Content>
                  <ListItem.Title style={localStyle.titleStyle}>
                    {category.text}
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron
                  type="material-community"
                  name={chevronProps.name}
                  size={12}
                  reverse
                  color={chevronProps.color}
                />
              </ListItem>
            );
          })}
        </View>
      );
    }
    return <View />;
  }
}

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
