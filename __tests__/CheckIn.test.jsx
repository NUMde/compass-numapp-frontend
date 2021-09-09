// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React from "react";
import { Alert } from "react-native";
import { renderWithRedux, initRenderModule } from "../__utils__/render";

import store from "../src/store";
import SurveyScreen from "../src/screens/checkIn/surveyScreen";
import WelcomeText from "../src/components/checkIn/welcomeText";
import * as actions from "../src/screens/checkIn/checkInActions";
import CheckInScreen from "../src/screens/checkIn/checkInScreen";
import CheckInTiles from "../src/components/checkIn/checkInTiles";
import { CheckInContainer } from "../src/screens/checkIn/checkInContainer";
import CheckInListView from "../src/components/checkIn/checkInListView";
import questionnaireAnalyzer from "../src/services/questionnaireAnalyzer/questionnaireAnalyzer";
import loggedInClient from "../src/services/rest/loggedInClient";

/***********************************************************************************************
state & properties
***********************************************************************************************/

// prepares default state and properties for the following tests.
// can be overwritten in the provided tests.

// default user
const user = {
  additional_iterations_left: 0,
  current_instance_id: "a177e102-ecfa-490e-81a7-04cf7ebf22cf",
  current_interval: 7,
  current_questionnaire_id: "final",
  due_date: "9999-12-30T23:00:00.000Z",
  status: 'on-study',
  firstTime: false,
  pushAppGUID: "f98fc829-1d4d-418b-b05b-a147fdb9c0f3",
  pushClientSecret: "ab4b7d62-1fde-4a46-a566-2d1ada678df3",
  recipient_certificate_pem_string:
    "-----BEGIN CERTIFICATE-----\nMIIEOzCCAyOgAwIBAgIUc0iY16RQuluxpRL7hsmq/FRaWt0wDQYJKoZIhvcNAQEL\nBQAwgawxCzAJBgNVBAYTAkRFMQwwCgYDVQQIDANSTFAxDjAMBgNVBAcMBU1haW56\nMREwDwYDVQQKDAhVTSBNYWluejEeMBwGA1UECwwVUHJldmVudGl2ZSBDYXJkaW9s\nb2d5MRUwEwYDVQQDDAxHQ1NTdHVkeUNlcnQxNTAzBgkqhkiG9w0BCQEWJnN2ZW4t\nb2xpdmVyLnRyb2Vic0B1bmltZWRpemluLW1haW56LmRlMB4XDTIwMDkwMTExMjk0\nNFoXDTIzMDUyOTExMjk0NFowgawxCzAJBgNVBAYTAkRFMQwwCgYDVQQIDANSTFAx\nDjAMBgNVBAcMBU1haW56MREwDwYDVQQKDAhVTSBNYWluejEeMBwGA1UECwwVUHJl\ndmVudGl2ZSBDYXJkaW9sb2d5MRUwEwYDVQQDDAxHQ1NTdHVkeUNlcnQxNTAzBgkq\nhkiG9w0BCQEWJnN2ZW4tb2xpdmVyLnRyb2Vic0B1bmltZWRpemluLW1haW56LmRl\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnmY9Ep2SIoo824dWk1y8\ngonKArnhwVyW3AAVLpz9UtmkfElLiNLUbVOv6dGyCG9W8Y0DFwUU33EmFBlsmX3R\n7LbnwLYn7R6ntSakr58P6yNjMXY2CT2GjI0m63DPbLh6S3J6cO/8HNRnL3zW4O9B\n6FtgVg7Yf2koFjXz/kUYOFeqsPoqqLk70pO1nPGTjkz2JhBJQ+SaulTo19ZQ2tkT\nVP3zTZ9Urk8i/3fCU1TKTbYL/WwQepJlN8BwxzjIDQ2wA62nXzzlHQN98MnQGgY4\nXvj679rLFLsz2vgVmLnGPFwFL5op/6gmsKz7Q+B3zGco6qGyyL9N/D4fLKOVxnMy\nIwIDAQABo1MwUTAdBgNVHQ4EFgQUyMC1pkSWjQbIFZ/o4SEV9IqHJmwwHwYDVR0j\nBBgwFoAUyMC1pkSWjQbIFZ/o4SEV9IqHJmwwDwYDVR0TAQH/BAUwAwEB/zANBgkq\nhkiG9w0BAQsFAAOCAQEAIAAhhtVpDf/767pg8xxwaETYjPRL4pKW4H5b9t2Vr41M\nAdCUou9dbtWlqeFvY/eBby9DM05lI+D8hX2wYVRr7Pc80fuw5k4f+uTry2jc0vFV\nvHhv9sHJq3+EX/P4Nckb7M5lKI+d6GDiqzU3r/ARstoRVbQHRu2f0W7SW0pVPwlQ\nSFv61NIkjQB19SAO1IAR4Z/UrZ7Y0vnKQZ2fqFUHoD5wz4jXhHFsungocg9IxJ74\nKXaMj1nTtjCGxx11jQCNLyrVjI/XgNoPQ1v2FIQxmPJju9MAXQ2AIPA2NTXaDXHk\nYDlCrh7jxSgVWfrijhMFO/BmHDlumBpOPO1S4XG4qA==\n-----END CERTIFICATE-----",
  start_date: "2021-07-15T04:00:00.000Z",
  subjectId: "7bfc3b07-a97d-4e11-8ac6-b970c1745476",
};

// default props
const props = {
  navigation: {
    navigate: jest.fn(),
    state: {
      routeName: "CheckIn",
    },
  },
  user,
  actions,
};

// default initial state
const initialState = {
  CheckIn: {
    ...user,
    ...props,
    loading: false,
    error401: false,
    firstTime: true,
    categories: null,
    currentPageIndex: 1,
    showDatePicker: false,
    categoriesLoaded: false,
    questionnaireItemMap: null,
    currentCategoryIndex: null,
    showQuestionnaireModal: false,
    questionnaireResponseError: null,
  },
  Login: {
    loading: false,
    loggedIn: true,
    loginError: null,
    loginUnauthorized: false,
    session: {
      accessToken: "7bfc3b07-a97d-4e11-8ac6-b970c1745476",
      recipientCertificatePemString:
        "-----BEGIN CERTIFICATE-----\nMIIEOzCCAyOgAwIBAgIUc0iY16RQuluxpRL7hsmq/FRaWt0wDQYJKoZIhvcNAQEL\nBQAwgawxCzAJBgNVBAYTAkRFMQwwCgYDVQQIDANSTFAxDjAMBgNVBAcMBU1haW56\nMREwDwYDVQQKDAhVTSBNYWluejEeMBwGA1UECwwVUHJldmVudGl2ZSBDYXJkaW9s\nb2d5MRUwEwYDVQQDDAxHQ1NTdHVkeUNlcnQxNTAzBgkqhkiG9w0BCQEWJnN2ZW4t\nb2xpdmVyLnRyb2Vic0B1bmltZWRpemluLW1haW56LmRlMB4XDTIwMDkwMTExMjk0\nNFoXDTIzMDUyOTExMjk0NFowgawxCzAJBgNVBAYTAkRFMQwwCgYDVQQIDANSTFAx\nDjAMBgNVBAcMBU1haW56MREwDwYDVQQKDAhVTSBNYWluejEeMBwGA1UECwwVUHJl\ndmVudGl2ZSBDYXJkaW9sb2d5MRUwEwYDVQQDDAxHQ1NTdHVkeUNlcnQxNTAzBgkq\nhkiG9w0BCQEWJnN2ZW4tb2xpdmVyLnRyb2Vic0B1bmltZWRpemluLW1haW56LmRl\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnmY9Ep2SIoo824dWk1y8\ngonKArnhwVyW3AAVLpz9UtmkfElLiNLUbVOv6dGyCG9W8Y0DFwUU33EmFBlsmX3R\n7LbnwLYn7R6ntSakr58P6yNjMXY2CT2GjI0m63DPbLh6S3J6cO/8HNRnL3zW4O9B\n6FtgVg7Yf2koFjXz/kUYOFeqsPoqqLk70pO1nPGTjkz2JhBJQ+SaulTo19ZQ2tkT\nVP3zTZ9Urk8i/3fCU1TKTbYL/WwQepJlN8BwxzjIDQ2wA62nXzzlHQN98MnQGgY4\nXvj679rLFLsz2vgVmLnGPFwFL5op/6gmsKz7Q+B3zGco6qGyyL9N/D4fLKOVxnMy\nIwIDAQABo1MwUTAdBgNVHQ4EFgQUyMC1pkSWjQbIFZ/o4SEV9IqHJmwwHwYDVR0j\nBBgwFoAUyMC1pkSWjQbIFZ/o4SEV9IqHJmwwDwYDVR0TAQH/BAUwAwEB/zANBgkq\nhkiG9w0BAQsFAAOCAQEAIAAhhtVpDf/767pg8xxwaETYjPRL4pKW4H5b9t2Vr41M\nAdCUou9dbtWlqeFvY/eBby9DM05lI+D8hX2wYVRr7Pc80fuw5k4f+uTry2jc0vFV\nvHhv9sHJq3+EX/P4Nckb7M5lKI+d6GDiqzU3r/ARstoRVbQHRu2f0W7SW0pVPwlQ\nSFv61NIkjQB19SAO1IAR4Z/UrZ7Y0vnKQZ2fqFUHoD5wz4jXhHFsungocg9IxJ74\nKXaMj1nTtjCGxx11jQCNLyrVjI/XgNoPQ1v2FIQxmPJju9MAXQ2AIPA2NTXaDXHk\nYDlCrh7jxSgVWfrijhMFO/BmHDlumBpOPO1S4XG4qA==\n-----END CERTIFICATE-----",
    },
    subjectId: "7bfc3b07-a97d-4e11-8ac6-b970c1745476",
  },
};

// questionnaire item map used in the export test
const exampleQuestionnaireItemMap = {
  1: {
    linkId: "1",
    prefix: "3d431ae3-ade5-448f-bb7a-dc864bdf8608",
    text: "Symptome",
    type: "group",
    required: true,
    item: [
      {
        linkId: "1.1",
        prefix: "0ac6ad58-4a54-4459-8a35-83562ca6e68e",
        text: "Haben sie akut gravierende Symptome, die einer sofortigen Behandlung bedürfen?",
        type: "choice",
        required: true,
        answerOption: [
          {
            valueString: "Nein",
          },
          {
            valueString: "Ja",
          },
        ],
        item: [
          {
            linkId: "1.1.1",
            prefix: "442144fd-b3f2-4621-8ccc-6fec4e37aff8",
            text: "!!! Bitte suchen Sie umgehend eine Notaufnahme auf oder kontaktieren Sie die 116117 !!!",
            type: "display",
            enableWhen: [
              {
                question: "1.1",
                operator: "=",
                answerString: "Ja",
              },
            ],
          },
        ],
      },
    ],
    done: true,
    answer: null,
    started: true,
  },
  1.1: {
    linkId: "1.1",
    prefix: "0ac6ad58-4a54-4459-8a35-83562ca6e68e",
    text: "Haben sie akut gravierende Symptome, die einer sofortigen Behandlung bedürfen?",
    type: "choice",
    required: true,
    answerOption: [
      {
        valueString: "Nein",
      },
      {
        valueString: "Ja",
      },
    ],
    item: [
      {
        linkId: "1.1.1",
        prefix: "442144fd-b3f2-4621-8ccc-6fec4e37aff8",
        text: "!!! Bitte suchen Sie umgehend eine Notaufnahme auf oder kontaktieren Sie die 116117 !!!",
        type: "display",
        enableWhen: [
          {
            question: "1.1",
            operator: "=",
            answerString: "Ja",
          },
        ],
      },
    ],
    done: true,
    answer: "Nein",
  },
  "1.1.1": {
    linkId: "1.1.1",
    prefix: "442144fd-b3f2-4621-8ccc-6fec4e37aff8",
    text: "!!! Bitte suchen Sie umgehend eine Notaufnahme auf oder kontaktieren Sie die 116117 !!!",
    type: "display",
    enableWhen: [
      {
        question: "1.1",
        operator: "=",
        answerString: "Ja",
      },
    ],
    done: false,
    answer: null,
    required: false,
  },
  done: true,
  started: true,
  constructedId: "undefined|undefined",
};

/***********************************************************************************************
tests
***********************************************************************************************/

describe("CHECKIN RENDERING:", () => {
  // simple render test
  test("<CheckInContainer /> can be rendered", () => {
    // renders the component
    const tree = renderWithRedux(
      <CheckInContainer
        navigation={{
          navigate: jest.fn(),
          state: {
            routeName: "CheckIn",
          },
        }}
        actions={actions}
        user={user}
      />
    );

    // checks if the screen matches the snapshot
    expect(tree).toMatchSnapshot();
  });

  // simple render test
  test(`<CheckInScreen /> can be rendered`, () => {
    // renders the component
    const tree = renderWithRedux(<CheckInScreen />);

    // checks if the screen matches the snapshot
    expect(tree).toMatchSnapshot();
  });

  // simple render test
  test(`<SurveyScreen /> can be rendered`, () => {
    // renders the component
    const tree = renderWithRedux(<SurveyScreen />);

    // checks if the screen matches the snapshot
    expect(tree).toMatchSnapshot();
  });

  // simple render test
  test("<CheckInListView /> can be rendered", () => {
    // renders the component
    const tree = renderWithRedux(<CheckInListView />);

    // checks if the screen matches the snapshot
    expect(tree).toMatchSnapshot();
  });

  // simple render test
  test("<CheckInWelcomeText /> can be rendered", () => {
    // renders the component
    const tree = renderWithRedux(<WelcomeText />);

    // checks if the screen matches the snapshot
    expect(tree).toMatchSnapshot();
  });

  // simple render test
  test("<CheckInTiles /> can be rendered", () => {
    // renders the component
    const tree = renderWithRedux(<CheckInTiles />);

    // checks if the screen matches the snapshot
    expect(tree).toMatchSnapshot();
  });
});

describe("QUESTIONNAIRE HANDLING:", () => {
  // checks if the checkinScreen is rendered after the checkinContainer loaded
  test("<CheckInContainer /> triggers the questionnaire download after login", () => {
    // initiates a global mock-redux-store
    const mockStore = initRenderModule(initialState);
    store.getState = () => mockStore.getState();
    jest.mock("../src/store.js");

    // renders the component
    const tree = renderWithRedux(
      <CheckInContainer
        navigation={{
          navigate: jest.fn(),
          state: {
            routeName: "CheckIn",
          },
        }}
        actions={actions}
        user={user}
      />
    );

    // checks if the intance "CheckInScreen" was chosen for the rendering
    const { instance } = tree.UNSAFE_getByType(CheckInScreen);

    // checks if getQuestionnaire() is executed - if yes, a mock services returns "mocked"
    expect(instance.props.getQuestionnaire()).resolves.toBeTruthy();
  });

  // checks if a response is generated
  test("Questionnaire Response can be generated", () => {
    // updates the initial state with a questionnaireItemMap
    const initialStateCopy = { ...initialState };
    initialStateCopy.CheckIn.questionnaireItemMap = exampleQuestionnaireItemMap;

    // initiates a global mock-redux-store
    const mockStore = initRenderModule(initialStateCopy);
    store.getState = () => mockStore.getState();
    jest.mock("../src/store.js");

    // creates the response
    const generatedResponse = questionnaireAnalyzer.createResponseJSON();

    // checks the properties of the response
    expect(
      Object.prototype.hasOwnProperty.call(generatedResponse, "body") &&
        Object.prototype.hasOwnProperty.call(generatedResponse, "triggerMap")
    ).toBeTruthy();
  });

  // checks if the function sendQuestionnaire() is available
  test("LoggedInClient provides sendQuestionnaire()", () => {
    // updates the initial state with a questionnaireItemMap
    const initialStateCopy = { ...initialState };
    initialStateCopy.CheckIn.questionnaireItemMap = exampleQuestionnaireItemMap;

    // initiates a global mock-redux-store
    const mockStore = initRenderModule(initialStateCopy);
    store.getState = () => mockStore.getState();
    jest.mock("../src/store.js");

    // generates the response
    const exportData = questionnaireAnalyzer.createResponseJSON();

    // sends the questionnaire
    return loggedInClient
      .sendQuestionnaire(
        exportData.body,
        exportData.triggerMap,
        "test-subject-id",
        "test-questionnaire-id",
        "test-instance-id"
      )
      .then(
        (response) => expect(response).toBeTruthy(),
        (error) => {
          throw error;
        }
      );
  });

  // checks if a completed questionnaire can be sent out
  test("Questionnaire Response can be sent out", () => {
    // spies on the alert function
    jest.spyOn(Alert, "alert");

    // initiates a global mock-redux-store
    const mockStore = initRenderModule(initialState);
    store.getState = () => mockStore.getState();
    jest.mock("../src/store.js");

    // renders the component
    const tree = renderWithRedux(
      <CheckInContainer
        navigation={{
          navigate: jest.fn(),
          state: {
            routeName: "CheckIn",
          },
        }}
        actions={actions}
        user={user}
      />
    );

    // checks if the instance "CheckInScreen" was chosen for the rendering
    const { instance } = tree.UNSAFE_getByType(CheckInScreen);

    // triggers the export and upload
    instance.props.exportAndUploadQuestionnaireResponse();

    // checks if the app produces an alert-window (before sending out the data)
    expect(Alert.alert).toHaveBeenCalled();

    // confirms the alert and triggers the transport
    Alert.alert.mock.calls[0][2][0].onPress();

    // checks if getQuestionnaire() is executed
    expect(loggedInClient.sendQuestionnaire()).resolves.toStrictEqual({
      data: "sent-out-questionnaire",
    });
  });
});
