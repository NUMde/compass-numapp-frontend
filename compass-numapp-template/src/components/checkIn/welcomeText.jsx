// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { appConfig, theme, strings } from '../../config';
import { formatDateString } from '../../services/utils';

let localStyle;

/***********************************************************************************************
component
***********************************************************************************************/

class WelcomeText extends PureComponent {
  /**
	* renders a welcome text composed of multiple strings (originating from 'src/config/textConfig.js)
	* and a formatted Date-string (representing the due date of the current questionnaire or the
	* start date of the next one)
	* @constructor
	* @param  {object}      props
	* @param  {object}      props.user holds the userdata
	* @param  {object}      props.navigation the navigation object provided by 'react-navigation'
	* @param  {object}      props.questionnaireError the return object should the sendQuestionnaire
		function produce an error
	* @param  {boolean}     props.error401 true if the user was rejected by the backend
	* @param  {boolean}     props.noNewQuestionnaireAvailableYet true if there is currently no
		questionnaire available
	*/

  // rendering
  /*-----------------------------------------------------------------------------------*/

  render() {
    const {
      error401,
      questionnaireError,
      noNewQuestionnaireAvailableYet,
      user,
    } = this.props;
    return (
      <View style={localStyle.wrapper}>
        {/* if there is no authentication error, no sending error and the participant ist still part of the study */}
        {!error401 &&
          questionnaireError === null &&
          user?.status !== 'off-study' && (
            <View>
              {/* title text: depends on the params 'firstTime' & 'noNewQuestionnaireAvailableYet'*/}
              <Text style={localStyle.welcomeText}>
                {(() => {
                  if (user.firstTime) {
                    return strings.survey.welcomeTitleFirstTime;
                  }
                  if (noNewQuestionnaireAvailableYet) {
                    return strings.survey.noNewQuestionnaireAvailableYet;
                  }
                  return strings.survey.welcomeTitle;
                })()}
              </Text>

              {/* if this is a new user */}
              {user.firstTime && user && (
                <Text style={localStyle.infoText}>
                  {strings.survey.welcomeTextFirstTimeUser1}
                  <Text style={{ ...localStyle.timeTextSmall }}>
                    {formatDateString(user.due_date, true)}.
                  </Text>
                  {strings.survey.welcomeTextFirstTimeUser2}
                </Text>
              )}

              {/* if this is not a first-time-user and NO new questionnaire is currently available */}
              {!user.firstTime && noNewQuestionnaireAvailableYet && (
                <Text style={localStyle.infoText}>
                  {strings.survey.noNewQuestionnaireAvailableYet}
                </Text>
              )}

              {/* if this is not a first-time-user and A questionnaire is currently available */}
              {!user.firstTime && !noNewQuestionnaireAvailableYet && (
                <View>
                  <Text style={localStyle.infoText}>
                    {strings.survey.welcomeTextUser}
                  </Text>
                  <Text style={{ ...localStyle.timeText }}>
                    {formatDateString(user.due_date, true)}.
                  </Text>
                </View>
              )}

              {/* if this is not a first-time-user and NO new questionnaire is currently available */}
              {!user.firstTime && noNewQuestionnaireAvailableYet && (
                <View>
                  <Text style={localStyle.timeText}>
                    {strings.survey.nextOne}
                  </Text>
                  <Text
                    style={{
                      ...localStyle.timeText,
                      ...localStyle.timeTextGreen,
                    }}
                  >
                    {formatDateString(user.start_date, true)}.
                  </Text>
                </View>
              )}

              {/* if this is a first-time-user and A questionnaire is currently available */}
              {user.firstTime && noNewQuestionnaireAvailableYet && (
                <View>
                  <Text style={localStyle.timeText}>
                    {strings.survey.nextOneNew}
                  </Text>
                  <Text
                    style={{
                      ...localStyle.timeText,
                      ...localStyle.timeTextGreen,
                    }}
                  >
                    {formatDateString(user.start_date, true)}.
                  </Text>
                </View>
              )}

              <Text style={localStyle.infoText}>
                {strings.survey.furtherInfo}
              </Text>
            </View>
          )}

        {user?.status === 'off-study' && (
          <View>
            <Text style={localStyle.welcomeText}>
              {strings.survey.endedStudyTitle}
            </Text>

            <Text style={localStyle.infoText}>
              {strings.survey.endedStudyText}
            </Text>
          </View>
        )}

        {/* if the user update came back with an authentication error */}
        {error401 && (
          <View>
            <Text
              style={{
                ...localStyle.welcomeText,
                ...localStyle.welcomeTextRed,
              }}
            >
              {strings.survey.noUserTitle}
            </Text>

            <Text style={localStyle.infoText}>{strings.survey.noUserText}</Text>
          </View>
        )}

        {/* if there occurred an error while transmitting a questionnaire */}
        {questionnaireError && (
          <View>
            <Text
              style={{
                ...localStyle.welcomeText,
                ...localStyle.welcomeTextRed,
              }}
            >
              {strings.survey.noQuestionnaireTitle}
            </Text>

            <Text style={localStyle.infoText}>
              {strings.survey.noQuestionnaireText}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

/***********************************************************************************************
local styling
***********************************************************************************************/

localStyle = StyleSheet.create({
  wrapper: {
    marginLeft: appConfig.scaleUiFkt(30),
    marginRight: appConfig.scaleUiFkt(30),
    marginBottom: appConfig.scaleUiFkt(25),
  },

  welcomeText: {
    ...theme.fonts.title,
    textAlign: 'center',
    alignSelf: 'center',
    color: theme.values.defaultTitleTextColor,
  },

  welcomeTextRed: {
    color: theme.colors.alert,
  },

  infoText: {
    marginTop: appConfig.scaleUiFkt(20),
    textAlign: 'center',
    color: theme.values.defaultParagraphTextColor,
    alignSelf: 'center',
    ...theme.fonts.body,
  },

  timeText: {
    marginTop: appConfig.scaleUiFkt(20),
    textAlign: 'center',
    color: theme.colors.accent4,
    alignSelf: 'center',
    ...theme.fonts.bold,
  },

  timeTextSmall: {
    ...theme.fonts.label,
  },

  timeTextGreen: {
    color: theme.values.TimeSuccessColor,
  },
});

/***********************************************************************************************
export
***********************************************************************************************/

export default WelcomeText;
