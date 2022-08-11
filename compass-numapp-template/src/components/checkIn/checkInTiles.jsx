// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

// components
import { Icon } from 'react-native-elements';

// services & config
import { appConfig, theme } from '~config';
import translate from '~services/localization';

/***********************************************************************************************
 * component
 *
 * renders the buttons seen on the checkIn-screen (one for sending out the completed questionnaire)
 * and one to send out a special report.
 * @param  {object}      props
 * @param  {boolean}     props.done indicates whether the questionnaire is completely answered
 * @param  {string}      props.status the user status ('on-study' or  'off-study')
 * @param  {function}    props.sendReport function to send out a report
 * @param  {number}      props.iterationsLeft indicated, how many times this current questionnaire will be repeated
 * @param  {boolean}     props.categoriesLoaded true if the questionnaire is ready to be rendered
 * @param  {function}    props.deleteLocalDataAndLogout deletes the local data and logs the user out
 * @param  {boolean}     props.noNewQuestionnaireAvailableYet true if there is currently no questionnaire available
 * @param  {function}    props.exportAndUploadQuestionnaireResponse generates the response questionnaire, encrypts it and sends it to the server
 **********************************************************************************************/
function CheckInTiles({
  done,
  status,
  sendReport,
  iterationsLeft,
  categoriesLoaded,
  deleteLocalDataAndLogout,
  noNewQuestionnaireAvailableYet,
  exportAndUploadQuestionnaireResponse,
}) {
  return (
    <View style={localStyle.tileContainer}>
      {/* if there is a completed questionnaire render the button to transmit the it*/}
      {!noNewQuestionnaireAvailableYet &&
        categoriesLoaded &&
        status !== 'off-study' &&
        done && (
          <View>
            <TouchableOpacity
              style={{ ...localStyle.tile, ...localStyle.buttonGreen }}
              disabled={noNewQuestionnaireAvailableYet}
              onPress={exportAndUploadQuestionnaireResponse}
              accessibilityLabel={translate('survey').send}
              accessibilityRole={translate('accessibility').types.button}
              accessibilityHint={
                translate('accessibility').questionnaire.sendHint
              }
              testID="send_response_btn"
            >
              <View style={localStyle.buttonWrapper}>
                <Icon
                  name="school"
                  color={theme.colors.white}
                  iconStyle={localStyle.buttonIcon}
                />

                <Text style={localStyle.tileText}>
                  {translate('survey').send}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

      {/* the 'send report' button */}
      {status !== 'off-study' && (
        <TouchableOpacity
          onPress={sendReport}
          // renders the button in grey if there is no questionnaire available
          // or if the user already send out a report and is still on a special interval (additional_iterations_left will be greater than 0 if thats the case)
          style={
            noNewQuestionnaireAvailableYet || iterationsLeft > 0
              ? localStyle.tile
              : localStyle.disabledTile
          }
          accessibilityRole={translate('accessibility').types.button}
          testID="send_report_btn"
        >
          <View style={localStyle.buttonWrapper}>
            <Icon
              name="error"
              color={theme.colors.white}
              iconStyle={localStyle.buttonIcon}
            />
            <Text style={localStyle.tileText}>
              {translate('reporting').symptoms_header}
            </Text>
          </View>
        </TouchableOpacity>
      )}

      {/* display logout button when user is 'off-study' */}
      {status === 'off-study' && appConfig.allowRemovalOfDataAtEndOfStudy && (
        <TouchableOpacity
          onPress={deleteLocalDataAndLogout}
          style={{
            ...localStyle.tile,
            ...localStyle.deleteAndLogoutTile,
          }}
          accessibilityRole={translate('accessibility').types.button}
          testID="logout_btn"
        >
          <View style={localStyle.buttonWrapper}>
            <Icon
              name="warning"
              color={theme.colors.white}
              iconStyle={localStyle.buttonIcon}
            />
            <Text style={localStyle.tileText}>
              {translate('generic').eraseLocalDataAtEndOfStudyTitle}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

CheckInTiles.propTypes = {
  done: PropTypes.bool,
  status: PropTypes.oneOf(['on-study', 'off-study']).isRequired,
  sendReport: PropTypes.func.isRequired,
  iterationsLeft: PropTypes.number.isRequired,
  categoriesLoaded: PropTypes.bool,
  deleteLocalDataAndLogout: PropTypes.func.isRequired,
  noNewQuestionnaireAvailableYet: PropTypes.bool.isRequired,
  exportAndUploadQuestionnaireResponse: PropTypes.func.isRequired,
};

CheckInTiles.defaultProps = {
  done: false,
  categoriesLoaded: false,
};

/***********************************************************************************************
local styling
***********************************************************************************************/

// scaleUiFkt() (located in src/appConfig.js)
// will dynamically alter some sizes based on the physical device measurements.

const { width } = Dimensions.get('window');

const localStyle = StyleSheet.create({
  tileContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  tile: {
    width: width / 2 - appConfig.scaleUiFkt(40),
    height: appConfig.scaleUiFkt(110),
    margin: (width - (width / 2 - appConfig.scaleUiFkt(40)) * 2) / 6,
    backgroundColor: theme.values.defaultActiveTile,
    color: 'white',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },

  deleteAndLogoutTile: {
    backgroundColor: theme.colors.alert,
  },

  disabledTile: {
    width: width / 2 - appConfig.scaleUiFkt(40),
    height: appConfig.scaleUiFkt(110),
    margin: (width - (width / 2 - appConfig.scaleUiFkt(40)) * 2) / 6,
    backgroundColor: theme.values.defaultDisabledTile,
    color: 'white',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },

  tileText: {
    color: 'white',
    textAlign: 'center',
    ...theme.fonts.label,
  },

  buttonGreen: {
    backgroundColor: theme.values.defaultSendQuestionnaireButtonBackgroundColor,
    display: 'flex',
  },

  buttonWrapper: {
    justifyContent: 'space-around',
  },

  buttonIcon: {
    marginBottom: 5,
  },
});

/***********************************************************************************************
export
***********************************************************************************************/

export default CheckInTiles;
