// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import { Alert } from "react-native";
import { connect } from "react-redux";
import React, { Component } from "react";
import { bindActionCreators } from "redux";

import text from "../../config/textConfig";

import AboutScreen from "./aboutScreen";
import WebViewScreen from "./webViewScreen";
import LegalInformationScreen from "./legalInformationScreen";
import * as aboutActions from "./aboutActions";

/***********************************************************************************************
component:
container for the about screen
***********************************************************************************************/

class AboutContainer extends Component {
  /**
   * @constructor
   * @param  {object}    props
   * @param  {object}    props.actions holds actions for the component (./aboutActions.js)
   * @param  {object}    props.navigation the navigation object provided by 'react-navigation'
   */

  // class methods
  /*-----------------------------------------------------------------------------------*/

  /**
   * shows a confirmation-dialog. if confirmed, it deletes the local data, logs the user
   * out and navigates back to the landing-screen.
   */
  clearAll = () => {
    const { actions, navigation } = this.props;
    Alert.alert(
      text.generic.warning,
      text.generic.eraseAllWarning,
      [
        {
          text: text.generic.delete,
          onPress: () => {
            actions.deleteLocalData();

            setTimeout(() => {
              actions.logout();
              navigation.navigate("Landing");
            }, 0);
          },
        },
        {
          text: text.generic.abort,
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  /**
   * shows a confirmation-dialog. if confirmed, it logs the user
   * out and navigates back to the landing-screen.
   */
  logout = () => {
    const { navigation, actions } = this.props;
    Alert.alert(
      text.generic.warning,
      text.generic.logoutWarning,
      [
        {
          text: text.generic.goBack,
          onPress: () => {
            actions.logout();
            setTimeout(() => {
              navigation.navigate("Landing");
            }, 0);
          },
        },
        {
          text: text.generic.abort,
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  // rendering
  /*-----------------------------------------------------------------------------------*/

  render() {
    const { navigation, showModal, modalLink, actions } = this.props;
    // checks if the currently selected route equals 'About'
    if (navigation.state.routeName === "About") {
      // then renders the About Screen
      return (
        <AboutScreen
          navigation={navigation}
          logout={this.logout}
          clearAll={this.clearAll}
          showModal={showModal}
          modalLink={modalLink}
          actions={actions}
        />
      );
    }
    // checks if the currently selected route equals 'LegalInformation'
    if (navigation.state.routeName === "LegalInformation") {
      // then renders the LegalInformation Screen
      return <LegalInformationScreen navigation={navigation} />;
    }
    // if on WebView route
    return <WebViewScreen navigation={navigation} />;
  }
}

/***********************************************************************************************
redux
***********************************************************************************************/

// connects the redux-state with the local props and enables dispatching actions from it.
// updated properties are then available from the state. actions can be accessed through
// props.actions.

const mapStateToProps = (state) => state.About;

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(aboutActions, dispatch),
});

/***********************************************************************************************
export
***********************************************************************************************/

export default connect(mapStateToProps, mapDispatchToProps)(AboutContainer);
