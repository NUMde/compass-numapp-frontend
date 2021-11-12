// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

import config from "../../config/configProvider";
import { formatDateString } from "../../services/utils";

let localStyle;

/***********************************************************************************************
component
***********************************************************************************************/

class CheckInListView extends PureComponent {
  /**
    * renders a single ListItem which represents the current state of a loaded questionnaire. 
    * red for untouched, yellow for incomplete and green for completed questionnaires.
    * the state of the questionnaire also impacts wich icon will be rendered on the right-hand-side.
    * a click on the ListItem will navigate the user to the WebView-screen
    * @constructor
    * @param  {object}      props
    * @param  {object}      props.user holds the userdata
    * @param  {object}      props.navigation the navigation object provided by 'react-navigation'
    * @param  {object}      props.questionnaireItemMap object holding every item from the questionnaire
        (the linkId of the item is the key)
    * @param  {boolean}     props.firstTime true if the user never sent out the first 
    * @param  {boolean}     props.noNewQuestionnaireAvailableYet true if there is currently no questionnaire available
    * @param  {boolean}     props.categoriesLoaded true if the questionnaire is ready to be rendered
    */

  /**
   * depending on the state of the questionnaire (untouched, started, finished),
   * this method returns a styleSheet object for the list item
   * @returns a style object for the listItem
   */
  getListItemStyle = () => {
    const { questionnaireItemMap } = this.props;
    if (
      questionnaireItemMap &&
      !questionnaireItemMap.done &&
      questionnaireItemMap.started
    ) {
      return localStyle.containerTouched;
    }
    if (!questionnaireItemMap.done && !questionnaireItemMap.started) {
      return localStyle.containerUntouched;
    }
    return localStyle.containerCompleted;
  };

  /**
   * determine the accessibility hint fot the list item depending on the state of the questionnaire
   * @returns accessibility hint
   */
  getAccessibilityHint = () => {
    const { questionnaireItemMap } = this.props;
    let hint =
      config.text.accessibility.questionnaire.questionnaireCellHint +
      config.text.accessibility.questionnaire.questionnaire;
    if (
      questionnaireItemMap &&
      !questionnaireItemMap.done &&
      questionnaireItemMap.started
    ) {
      hint += config.text.accessibility.questionnaire.notFinished;
      return hint;
    }
    if (!questionnaireItemMap.done && !questionnaireItemMap.notStarted) {
      hint += config.text.accessibility.questionnaire.notStarted;
      return hint;
    }
    hint += config.text.accessibility.questionnaire.finished;
    return hint;
  };

  /**
   * determine name and color of the icon displayed on the list item base on the state of the questionnaire
   * @returns
   */
  getChevronProps = () => {
    const { questionnaireItemMap } = this.props;
    if (
      questionnaireItemMap &&
      !questionnaireItemMap.done &&
      !questionnaireItemMap.started
    )
      return {
        name: "dots-horizontal",
        color: config.theme.colors.secondary,
      };

    if (questionnaireItemMap.started && !questionnaireItemMap.done)
      return {
        name: "pencil-outline",
        color: config.theme.colors.alert,
      };
    if (questionnaireItemMap.done)
      return {
        name: "check",
        color: config.theme.colors.success,
      };
    return {};
  };

  // rendering
  /*-----------------------------------------------------------------------------------*/

  render() {
    const {
      categoriesLoaded,
      noNewQuestionnaireAvailableYet,
      navigation,
      user,
    } = this.props;
    return (
      <View style={localStyle.wrapper}>
        {/* if all categories are loaded AND there is a current questionnaire available render a single ListLink AND if the user ist still part of the study*/}
        {categoriesLoaded &&
          !noNewQuestionnaireAvailableYet &&
          user?.status !== "off-study" && (
            <ListItem
              containerStyle={{
                ...localStyle.containerStyle,
                // get additional styling depending on the state of the questionnaire
                ...this.getListItemStyle(),
              }}
              onPress={() => navigation.navigate("Survey")}
              accessibilityLabel={`${
                user.firstTime
                  ? config.text.survey.surveyTitleFirstTime
                  : config.text.survey.surveyTitle
              }. ${
                config.text.survey.surveySubTitle +
                formatDateString(new Date(user.due_date))
              }`}
              accessibilityRole={config.text.accessibility.types.button}
              accessibilityHint={this.getAccessibilityHint()}
            >
              <ListItem.Content>
                {/* shows a special title for first-time-users or the regular title for all other users */}
                <ListItem.Title style={localStyle.title}>
                  {user.firstTime
                    ? config.text.survey.surveyTitleFirstTime
                    : config.text.survey.surveyTitle}
                </ListItem.Title>

                {/* subtitle with formatted due date of the questionnaire */}
                <ListItem.Subtitle style={localStyle.subTitle}>
                  {config.text.survey.surveySubTitle +
                    formatDateString(new Date(user.due_date))}
                </ListItem.Subtitle>
              </ListItem.Content>
              {/* renders icon */}
              <ListItem.Chevron
                type="material-community"
                size={12}
                raised
                containerStyle={{ backgroundColor: config.theme.colors.white }}
                // get additional properties based on the state of the questionnaire
                iconProps={this.getChevronProps()}
              />
            </ListItem>
          )}
      </View>
    );
  }
}

/***********************************************************************************************
local styling
***********************************************************************************************/

// scaleUiFkt() (located in src/config/appConfig.js)
// will dynamically alter some sized based on the physical device-measurements.

localStyle = StyleSheet.create({
  wrapper: {
    marginBottom: config.appConfig.scaleUiFkt(30),
  },

  containerStyle: {
    width: "100%",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    padding: config.appConfig.scaleUiFkt(30),
  },

  title: {
    ...config.theme.fonts.title2,
    color: config.theme.values.defaultCheckInListViewTitleColor,
  },

  subTitle: {
    color: config.theme.values.defaultCheckInListViewSubTitleColor,
    ...config.theme.fonts.body,
  },

  containerUntouched: {
    borderBottomColor: config.theme.values.defaultContainerUntouchedBorderColor,
    borderTopColor: config.theme.values.defaultContainerUntouchedBorderColor,
    backgroundColor:
      config.theme.values.defaultContainerUntouchedBackgroundColor,
  },

  containerTouched: {
    borderBottomColor: config.theme.values.defaultContainerTouchedBorderColor,
    borderTopColor: config.theme.values.defaultContainerTouchedBorderColor,
    backgroundColor: config.theme.values.defaultContainerTouchedBackgroundColor,
  },

  containerCompleted: {
    borderBottomColor: config.theme.values.defaultContainerCompletedBorderColor,
    borderTopColor: config.theme.values.defaultContainerCompletedBorderColor,
    backgroundColor:
      config.theme.values.defaultContainerCompletedBackgroundColor,
  },
});

/***********************************************************************************************
export
***********************************************************************************************/

export default CheckInListView;
