// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

// services & config
import config from '~config/configProvider';
import { formatDateString } from '~services/utils';
import translate from '~services/localization';

/***********************************************************************************************
 * component
 *
 * renders a welcome text composed of multiple strings (originating from 'src/config/textConfig.js)
 * and a formatted Date-string (representing the due date of the current questionnaire or the
 * start date of the next one)
 * @param {object}                          props
 * @param {object}                          props.error error if any
 * @param {('on-study' | 'off-study')}      props.status the status of the user ('on-study' or 'off-study')
 * @param {string}                          props.dueDate dueDate of the current questionnaire
 * @param {string}                          props.startDate start date of the current questionnaire
 * @param {boolean}                         props.firstTime
 * @param {boolean}                         props.noNewQuestionnaireAvailableYet true if there is currently no questionnaire available
 ***********************************************************************************************/
function WelcomeText({
  error,
  status,
  dueDate,
  startDate,
  firstTime,
  noNewQuestionnaireAvailableYet,
}) {
  return (
    <View style={localStyle.wrapper}>
      {/* if there is no authentication error, no sending error and the participant ist still part of the study */}
      {status !== 'off-study' && (
        <View>
          {/* title text: depends on the params 'firstTime' & 'noNewQuestionnaireAvailableYet'*/}
          <Text style={localStyle.welcomeText}>
            {(() => {
              if (firstTime) return translate('survey').welcomeTitleFirstTime;
              if (noNewQuestionnaireAvailableYet) {
                return translate('survey').noNewQuestionnaireAvailableYetTitle;
              }
              return translate('survey').welcomeTitle;
            })()}
          </Text>

          {/* if this is a new user */}
          {firstTime && (
            <Text style={localStyle.infoText}>
              {translate('survey').welcomeTextFirstTimeUser1}
              <Text style={localStyle.timeTextSmall}>
                {formatDateString(dueDate, true)}.
              </Text>
              {translate('survey').welcomeTextFirstTimeUser2}
            </Text>
          )}

          {/* if this is not a first-time-user and NO new questionnaire is currently available */}
          {!firstTime && noNewQuestionnaireAvailableYet && (
            <Text style={localStyle.infoText}>
              {translate('survey').noNewQuestionnaireAvailableYet}
            </Text>
          )}

          {/* if this is not a first-time-user and A questionnaire is currently available */}
          {!firstTime && !noNewQuestionnaireAvailableYet && (
            <View>
              <Text style={localStyle.infoText}>
                {translate('survey').welcomeTextUser}
              </Text>
              <Text style={{ ...localStyle.timeText }}>
                {formatDateString(dueDate, true)}.
              </Text>
            </View>
          )}

          {/* if this is not a first-time-user and NO new questionnaire is currently available */}
          {!firstTime && noNewQuestionnaireAvailableYet && (
            <View>
              <Text style={localStyle.timeText}>
                {translate('survey').nextOne}
              </Text>
              <Text style={[localStyle.timeText, localStyle.timeTextGreen]}>
                {formatDateString(startDate, true)}.
              </Text>
            </View>
          )}

          {/* if this is a first-time-user and A questionnaire is currently available */}
          {firstTime && noNewQuestionnaireAvailableYet && (
            <View>
              <Text style={localStyle.timeText}>
                {translate('survey').nextOneNew}
              </Text>
              <Text style={[localStyle.timeText, localStyle.timeTextGreen]}>
                {formatDateString(startDate, true)}.
              </Text>
            </View>
          )}

          <Text style={localStyle.infoText}>
            {translate('survey').furtherInfo}
          </Text>
        </View>
      )}

      {status === 'off-study' && (
        <View>
          <Text style={localStyle.welcomeText}>
            {translate('survey').endedStudyTitle}
          </Text>

          <Text style={localStyle.infoText}>
            {translate('survey').endedStudyText}
          </Text>
        </View>
      )}

      {/* if the user update failed */}
      {error && error.failedAction === 'user/UPDATE' && (
        <View style={localStyle.wrapper} testID="user_update_error">
          <Text style={[localStyle.welcomeText, localStyle.welcomeTextRed]}>
            {translate('generic').error}
          </Text>

          <Text style={localStyle.infoText}>
            {translate('generic').updateError}
          </Text>
        </View>
      )}
      {/* if the submission of the questionnaire response failed */}
      {error &&
        (error.failedAction === 'shared/SEND_REPORT' ||
          error.failedAction === 'shared/SEND_QUESTIONNAIRE_RESPONSE') && (
          <View style={localStyle.wrapper} testID="submission_error">
            <Text style={[localStyle.welcomeText, localStyle.welcomeTextRed]}>
              {translate('generic').error}
            </Text>

            <Text style={localStyle.infoText}>
              {translate('generic').sendError}
            </Text>
          </View>
        )}
    </View>
  );
}

WelcomeText.propTypes = {
  error: PropTypes.shape({ failedAction: PropTypes.string.isRequired }),
  status: PropTypes.oneOf(['on-study', 'off-study']).isRequired,
  dueDate: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  firstTime: PropTypes.bool.isRequired,
  noNewQuestionnaireAvailableYet: PropTypes.bool.isRequired,
};

WelcomeText.defaultProps = { error: null };

/***********************************************************************************************
local styling
***********************************************************************************************/

const localStyle = StyleSheet.create({
  wrapper: {
    marginHorizontal: config.appConfig.scaleUiFkt(30),
    marginVertical: config.appConfig.scaleUiFkt(25),
  },

  welcomeText: {
    ...config.theme.fonts.title,
    textAlign: 'center',
    alignSelf: 'center',
    color: config.theme.values.defaultTitleTextColor,
  },

  welcomeTextRed: {
    color: config.theme.colors.alert,
  },

  infoText: {
    marginTop: config.appConfig.scaleUiFkt(20),
    textAlign: 'center',
    color: config.theme.values.defaultParagraphTextColor,
    alignSelf: 'center',
    ...config.theme.fonts.body,
  },

  timeText: {
    marginTop: config.appConfig.scaleUiFkt(20),
    textAlign: 'center',
    color: config.theme.colors.accent4,
    alignSelf: 'center',
    ...config.theme.fonts.bold,
  },

  timeTextSmall: {
    ...config.theme.fonts.label,
  },

  timeTextGreen: {
    color: config.theme.values.defaultTimeSuccessColor,
  },
});

/***********************************************************************************************
export
***********************************************************************************************/

export default WelcomeText;
