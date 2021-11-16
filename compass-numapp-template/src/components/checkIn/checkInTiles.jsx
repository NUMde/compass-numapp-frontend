// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { PureComponent } from 'react';
import { Icon } from 'react-native-elements';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { appConfig, theme, strings } from '../../config';

let localStyle;

/***********************************************************************************************
component
***********************************************************************************************/

class CheckInTiles extends PureComponent {
  /**
   * renders the buttons seen on the checkIn-screen (one for sending out the completed questionnaire)
   * and one to send out a special report.
   * @constructor
   * @param  {object}      props
   * @param  {object}      props.user holds the userdata
   * @param  {boolean}     props.loading true if the questionnaire is still loading
   * @param  {Function}    props.sendReport function to send out an report
   * @param  {boolean}     props.categoriesLoaded true if the questionnaire is ready to be rendered
   * @param  {object}      props.questionnaireItemMap object holding every item from the questionnaire (the linkId of the item is the key)
   * @param  {boolean}     props.noNewQuestionnaireAvailableYet true if there is currently no questionnaire available
   * @param  {Function}    props.exportAndUploadQuestionnaireResponse generates the response questionnaire, encrypts it and sends it to the server
   * @param  {Function}    props.deleteLocalDataAndLogout deletes the local data and logs the user out
   */
  // rendering
  /*-----------------------------------------------------------------------------------*/

  render() {
    const {
      noNewQuestionnaireAvailableYet,
      categoriesLoaded,
      loading,
      questionnaireItemMap,
      user,
      exportAndUploadQuestionnaireResponse,
      sendReport,
      deleteLocalDataAndLogout,
    } = this.props;
    return (
      <View style={localStyle.tileWrapper}>
        {/* checks if the user is still on the study */}
        {
          <View style={localStyle.tileContainer}>
            {/* if there is a completed questionnaire render the button to transmit the it*/}
            {!noNewQuestionnaireAvailableYet &&
              categoriesLoaded &&
              user?.status !== 'off-study' &&
              !loading &&
              questionnaireItemMap.done && (
                <View>
                  <TouchableOpacity
                    style={{ ...localStyle.tile, ...localStyle.buttonGreen }}
                    disabled={user && noNewQuestionnaireAvailableYet}
                    onPress={exportAndUploadQuestionnaireResponse}
                    accessibilityLabel={strings.survey.send}
                    accessibilityRole={strings.accessibility.types.button}
                    accessibilityHint={
                      strings.accessibility.questionnaire.sendHint
                    }
                  >
                    <View style={localStyle.buttonWrapper}>
                      <Icon
                        name="school"
                        color={theme.colors.white}
                        iconStyle={localStyle.buttonIcon}
                      />

                      <Text style={localStyle.tileText}>
                        {strings.survey.send}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}

            {/* the 'send report' button */}
            {user?.status !== 'off-study' && (
              <TouchableOpacity
                onPress={sendReport}
                // renders the button in grey if there is no questionnaire available
                // or if the user already send out a report and is still on a special interval (additional_iterations_left will be greater than 0 if thats the case)
                style={
                  noNewQuestionnaireAvailableYet ||
                  (user && user.additional_iterations_left > 0)
                    ? localStyle.tile
                    : localStyle.disabledTile
                }
                accessibilityRole={strings.accessibility.types.button}
              >
                <View style={localStyle.buttonWrapper}>
                  <Icon
                    name="error"
                    color={theme.colors.white}
                    iconStyle={localStyle.buttonIcon}
                  />
                  <Text style={localStyle.tileText}>
                    {strings.reporting.symptoms_header}
                  </Text>
                </View>
              </TouchableOpacity>
            )}

            {/* the 'send report' button */}
            {user?.status === 'off-study' &&
              appConfig.allowRemovalOfDataAtEndOfStudy && (
                <TouchableOpacity
                  onPress={deleteLocalDataAndLogout}
                  style={{
                    ...localStyle.tile,
                    ...localStyle.deleteAndLogoutTile,
                  }}
                  accessibilityRole={strings.accessibility.types.button}
                >
                  <View style={localStyle.buttonWrapper}>
                    <Icon
                      name="warning"
                      color={theme.colors.white}
                      iconStyle={localStyle.buttonIcon}
                    />
                    <Text style={localStyle.tileText}>
                      {strings.generic.eraseLocalDataAtEndOfStudyTitle}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
          </View>
        }
      </View>
    );
  }
}

/***********************************************************************************************
local styling
***********************************************************************************************/

// scaleUiFkt() (located in src/config/appConfig.js)
// will dynamically alter some sizes based on the physical device measurements.

const { width } = Dimensions.get('window');

localStyle = StyleSheet.create({
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
    width: width / 2 - appConfig.scaleUiFkt(40),
    height: appConfig.scaleUiFkt(110),
    margin: (width - (width / 2 - appConfig.scaleUiFkt(40)) * 2) / 6,
    backgroundColor: theme.values.ActiveTile,
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
    backgroundColor: theme.values.DisabledTile,
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
    backgroundColor: theme.values.SendQuestionnaireButtonBackgroundColor,
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
