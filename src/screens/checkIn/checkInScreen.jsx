// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";

import config from "../../config/configProvider";
import Banner from "../../components/banner/banner";
import Spinner from "../../components/spinner/spinner";
import CheckInTiles from "../../components/checkIn/checkInTiles";
import CheckInWelcomeText from "../../components/checkIn/welcomeText";
import CheckInListView from "../../components/checkIn/checkInListView";
import ScrollIndicatorWrapper from "../../components/scrollIndicatorWrapper/scrollIndicatorWrapper";

let localStyle;

/***********************************************************************************************
component:
renders the checkIn-screen
***********************************************************************************************/

class CheckInScreen extends PureComponent {
  /**
   * @param  {object}   props
   * @param  {boolean}  props.loading if true, shows the loading screen
   * @param  {boolean}  props.error401 is true if there is a 401 error
   * @param  {object}   props.navigation the navigation object provided by 'react-navigation'
   * @param  {Function} props.updateUser function to update the user
   * @param  {boolean}  props.categoriesLoaded is set to true as soon as the questionnaire was completely loaded
   * @param  {object}   props.questionnaireError holds the las error object
   * @param  {Function} props.deleteLocalDataAndLogout deletes the local data and logs the user out
   */
  // rendering
  /*-----------------------------------------------------------------------------------*/

  render() {
    const {
      navigation,
      loading,
      updateUser,
      categoriesLoaded,
      error401,
      questionnaireError,
      questionnaireItemMap,
      user,
      sendReport,
      noNewQuestionnaireAvailableYet,
      exportAndUploadQuestionnaireResponse,
      deleteLocalDataAndLogout,
    } = this.props;

    return (
      <View style={localStyle.wrapper}>
        {/* loading spinner */}
        <Spinner visible={loading} />

        {/* banner at the top */}
        <Banner
          nav={navigation}
          title={config.text.survey.titleCheckIn}
          subTitle={config.text.survey.subTitleCheckIn}
          updateUser={updateUser}
          isCheckIn
          noWayBack
          noRefresh={user?.status === "off-study"}
          categoriesLoaded={categoriesLoaded}
        />

        {/*  center content */}
        <View style={{ ...localStyle.flexi, ...localStyle.wrapper }}>
          <ScrollIndicatorWrapper
            contentData={
              <View>
                {/* if there is a questionnaire and no 401-error */}
                {!error401 && questionnaireError === null && (
                  <View
                    style={{ ...localStyle.wrapper, ...localStyle.firstItem }}
                  >
                    {/* renders the listview item representing the questionnaire */}
                    <CheckInListView
                      user={user}
                      navigation={navigation}
                      categoriesLoaded={categoriesLoaded}
                      questionnaireItemMap={questionnaireItemMap}
                      noNewQuestionnaireAvailableYet={
                        noNewQuestionnaireAvailableYet
                      }
                    />
                    {/* welcome text with due-date information */}
                    <CheckInWelcomeText
                      error={error401}
                      questionnaireError={questionnaireError}
                      firstTime={user.firstTime}
                      noNewQuestionnaireAvailableYet={
                        noNewQuestionnaireAvailableYet
                      }
                      user={user}
                    />
                    {/* renders the button at the bottom */}
                    <CheckInTiles
                      user={user}
                      loading={loading}
                      categoriesLoaded={categoriesLoaded}
                      sendReport={sendReport}
                      deleteLocalDataAndLogout={deleteLocalDataAndLogout}
                      exportAndUploadQuestionnaireResponse={
                        exportAndUploadQuestionnaireResponse
                      }
                      questionnaireItemMap={questionnaireItemMap}
                      noNewQuestionnaireAvailableYet={
                        noNewQuestionnaireAvailableYet
                      }
                    />
                  </View>
                )}

                {/* if there is an error */}
                {questionnaireError && (
                  <View
                    style={{ ...localStyle.wrapper, ...localStyle.firstItem }}
                  >
                    {/* displays the welcome text */}
                    <CheckInWelcomeText
                      user={user}
                      error401={error401}
                      questionnaireError={questionnaireError}
                      noNewQuestionnaireAvailableYet={
                        noNewQuestionnaireAvailableYet
                      }
                    />
                  </View>
                )}
              </View>
            }
          />
        </View>
      </View>
    );
  }
}

/***********************************************************************************************
localStyle
***********************************************************************************************/

localStyle = StyleSheet.create({
  wrapper: {
    height: "100%",
    flexDirection: "column",
    backgroundColor: config.theme.values.defaultBackgroundColor,
  },

  firstItem: {
    marginTop: config.appConfig.scaleUiFkt(30),
  },

  flexi: {
    flex: 1,
  },
});

export default CheckInScreen;
