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

// components
import { Icon } from 'react-native-elements';

// services & config
import config from '../../config/configProvider';
import translate from '../../services/localization';

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
    <View style={localStyle.tileWrapper}>
      {
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
                >
                  <View style={localStyle.buttonWrapper}>
                    <Icon
                      name="school"
                      color={config.theme.colors.white}
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
            >
              <View style={localStyle.buttonWrapper}>
                <Icon
                  name="error"
                  color={config.theme.colors.white}
                  iconStyle={localStyle.buttonIcon}
                />
                <Text style={localStyle.tileText}>
                  {translate('reporting').symptoms_header}
                </Text>
              </View>
            </TouchableOpacity>
          )}

          {/* display logout button when user is 'off-study' */}
          {status === 'off-study' &&
            config.appConfig.allowRemovalOfDataAtEndOfStudy && (
              <TouchableOpacity
                onPress={deleteLocalDataAndLogout}
                style={{
                  ...localStyle.tile,
                  ...localStyle.deleteAndLogoutTile,
                }}
                accessibilityRole={translate('accessibility').types.button}
              >
                <View style={localStyle.buttonWrapper}>
                  <Icon
                    name="warning"
                    color={config.theme.colors.white}
                    iconStyle={localStyle.buttonIcon}
                  />
                  <Text style={localStyle.tileText}>
                    {translate('generic').eraseLocalDataAtEndOfStudyTitle}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
        </View>
      }
    </View>
  );
}

/***********************************************************************************************
local styling
***********************************************************************************************/

// scaleUiFkt() (located in src/config/appConfig.js)
// will dynamically alter some sizes based on the physical device measurements.

const { width } = Dimensions.get('window');

const localStyle = StyleSheet.create({
  tileContainer: {
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  tileWrapper: {
    marginBottom: 15,
  },

  tile: {
    width: width / 2 - config.appConfig.scaleUiFkt(40),
    height: config.appConfig.scaleUiFkt(110),
    margin: (width - (width / 2 - config.appConfig.scaleUiFkt(40)) * 2) / 6,
    backgroundColor: config.theme.values.defaultActiveTile,
    color: 'white',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },

  deleteAndLogoutTile: {
    backgroundColor: config.theme.colors.alert,
  },

  disabledTile: {
    width: width / 2 - config.appConfig.scaleUiFkt(40),
    height: config.appConfig.scaleUiFkt(110),
    margin: (width - (width / 2 - config.appConfig.scaleUiFkt(40)) * 2) / 6,
    backgroundColor: config.theme.values.defaultDisabledTile,
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
    ...config.theme.fonts.label,
  },

  buttonGreen: {
    backgroundColor:
      config.theme.values.defaultSendQuestionnaireButtonBackgroundColor,
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
