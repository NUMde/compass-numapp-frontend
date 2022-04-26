// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

// components
import { ListItem } from 'react-native-elements';

// services & config
import config from '~config/configProvider';
import { formatDateString } from '~services/utils';
import translate from '~services/localization';
import { Routes } from '~navigation/constants';

/**
 * depending on the state of the questionnaire (untouched, started, finished),
 * this method returns a styleSheet object for the list item
 * @param {boolean} done whether the category has been completely answered as required
 * @param {boolean} started whether the category has been started
 * @returns a style object for the listItem
 */
const getListItemStyle = (done, started) => {
  if (done) {
    return localStyle.containerCompleted;
  }

  if (started) {
    return localStyle.containerTouched;
  }

  return localStyle.containerUntouched;
};

/**
 * determine the accessibility hint fot the list item depending on the state of the questionnaire
 * @param {boolean} done whether the category has been completely answered as required
 * @param {boolean} started whether the category has been started
 * @returns {string} accessibility hint describing the status of the item
 */
const getAccessibilityHint = (done, started) => {
  let hint =
    translate('accessibility').questionnaire.questionnaireCellHint +
    translate('accessibility').questionnaire.questionnaire;

  if (done) {
    hint += translate('accessibility').questionnaire.finished;
    return hint;
  }
  if (started) {
    hint += translate('accessibility').questionnaire.notFinished;
    return hint;
  }

  return hint + translate('accessibility').questionnaire.notStarted;
};

/**
 * determine name and color of the icon displayed on the list item base on the state of the questionnaire
 * @returns {{name: string, color : string}} an object describing properties of the chevron
 */
const getChevronProps = (done, started) => {
  if (done) {
    return {
      name: 'check',
      color: config.theme.colors.success,
    };
  }
  if (started) {
    return {
      name: 'dots-horizontal',
      color: config.theme.colors.secondary,
    };
  }

  return {
    name: 'pencil-outline',
    color: config.theme.colors.alert,
  };
};

/***********************************************************************************************
 * component
 * renders a single ListItem which represents the current state of a loaded questionnaire.
 * red for untouched, yellow for incomplete and green for completed questionnaires.
 * the state of the questionnaire also impacts which icon will be rendered on the right-hand-side.
 * a click on the ListItem will navigate the user to the WebView-screen
 *
 * @param {object}      props
 * @param {boolean}     props.done indicates whether the current questionnaire has been completed
 * @param {boolean}     props.started indicates whether the current questionnaire has been started
 * @param {string}      props.dueDate the date until the current questionnaire must be completed
 * @param {boolean}     props.firstTime true if the user never sent out the first
 * @param {object}      props.navigation the navigation object provided by 'react-navigation'
 ***********************************************************************************************/
function CheckInListView({ done, started, dueDate, firstTime, navigation }) {
  return (
    <ListItem
      containerStyle={[
        localStyle.containerStyle,
        // get additional styling depending on the state of the questionnaire
        getListItemStyle(done, started),
      ]}
      onPress={() => navigation.navigate(Routes.SURVEY)}
      accessibilityLabel={`${
        firstTime
          ? translate('survey').surveyTitleFirstTime
          : translate('survey').surveyTitle
      }. ${
        translate('survey').surveySubTitle + formatDateString(new Date(dueDate))
      }`}
      accessibilityRole={translate('accessibility').types.button}
      accessibilityHint={getAccessibilityHint(done, started)}
      testID="CheckInListItem"
    >
      <ListItem.Content>
        {/* shows a special title for first-time-users or the regular title for all other users */}
        <ListItem.Title style={localStyle.title}>
          {firstTime
            ? translate('survey').surveyTitleFirstTime
            : translate('survey').surveyTitle}
        </ListItem.Title>

        {/* subtitle with formatted due date of the questionnaire */}
        <ListItem.Subtitle style={localStyle.subTitle}>
          {translate('survey').surveySubTitle +
            formatDateString(new Date(dueDate))}
        </ListItem.Subtitle>
      </ListItem.Content>
      {/* renders icon */}
      <ListItem.Chevron
        type="material-community"
        size={12}
        raised
        containerStyle={{ backgroundColor: config.theme.colors.white }}
        // get additional properties based on the state of the questionnaire
        iconProps={getChevronProps(done, started)}
      />
    </ListItem>
  );
}

CheckInListView.propTypes = {
  done: PropTypes.bool,
  started: PropTypes.bool,
  dueDate: PropTypes.string.isRequired,
  firstTime: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired })
    .isRequired,
};

CheckInListView.defaultProps = {
  done: false,
  started: false,
};

/***********************************************************************************************
local styling
***********************************************************************************************/

// scaleUiFkt() (located in src/config/appConfig.js)
// will dynamically alter some sized based on the physical device-measurements.

const localStyle = StyleSheet.create({
  containerStyle: {
    width: '100%',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    padding: config.appConfig.scaleUiFkt(30),
    marginVertical: config.appConfig.scaleUiFkt(25),
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
