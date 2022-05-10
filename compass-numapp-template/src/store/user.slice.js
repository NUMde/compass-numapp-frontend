import { Alert } from 'react-native';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
import messaging from '@react-native-firebase/messaging';

// services & config
import { loggedInClient, guestClient } from '~services/rest';
import translate, { setI18nConfig } from '~services/localization';
import localStorage from '~services/localStorage';
import { appConfig } from '~config';
import kioskApi from '~config/kioskApiConfig';

import { reset, sendQuestionnaireResponse, sendReport } from './sharedActions';

const isKioskMode = kioskApi.active;

const updateUser = createAsyncThunk(
  'user/UPDATE',
  async (subjectId, thunkApi) => {
    try {
      const userData = await (isKioskMode
        ? kioskApi.getUserUpdate()
        : loggedInClient.getUserUpdate(subjectId));
      return thunkApi.fulfillWithValue(userData);
    } catch (err) {
      Alert.alert(
        translate('generic').errorTitle,
        translate('generic').updateError,
        [
          {
            text: translate('generic').ok,
          },
        ],
        { cancelable: false },
      );
      return thunkApi.rejectWithValue({
        error: {
          code: err.code ?? 'ERROR',
          message: err.message,
          failedAction: 'user/UPDATE',
        },
      });
    }
  },
);

const sendCredentials = createAsyncThunk(
  'user/SEND_CREDENTIALS',
  async (subjectId, thunkApi) => {
    try {
      const userData = await (isKioskMode
        ? kioskApi.login()
        : guestClient.login(subjectId));
      return thunkApi.fulfillWithValue(userData);
    } catch (err) {
      Alert.alert(
        translate('generic').errorTitle,
        translate('generic').updateError,
        [
          {
            text: translate('generic').ok,
          },
        ],
        { cancelable: false },
      );
      return thunkApi.rejectWithValue({
        error: {
          code: err.code ?? 'ERROR',
          message: err.message,
          failedAction: 'user/SEND_CREDENTIALS',
        },
      });
    }
  },
);

const updateLanguage = createAsyncThunk(
  'user/UPDATE_LANGUAGE',
  async ({ subjectId, languageTag }, thunkApi) => {
    try {
      await (isKioskMode
        ? kioskApi.updateLanguageCode(subjectId, languageTag)
        : loggedInClient.updateLanguageCode(subjectId, languageTag));
      setI18nConfig(languageTag);
      await localStorage.persistUserLanguage(languageTag);
      return thunkApi.fulfillWithValue(languageTag);
    } catch (err) {
      Alert.alert(
        translate('generic').errorTitle,
        translate('generic').updateError,
        [
          {
            text: translate('generic').ok,
          },
        ],
        { cancelable: false },
      );
      return thunkApi.rejectWithValue({
        error: {
          code: err.code ?? 'ERROR',
          message: err.message,
          failedAction: 'user/UPDATE_LANGUAGE',
        },
      });
    }
  },
);

// when push notifications are enabled send device token to backend
const updateFCMToken = createAsyncThunk(
  'user/UPDATE_FCMToken',
  async (subjectId, thunkApi) => {
    try {
      // request permission
      const authStatus = await messaging().requestPermission();
      // request token
      const newToken = await messaging().getToken();

      if (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        // send token to backend
        await (isKioskMode
          ? kioskApi.updateDeviceToken()
          : loggedInClient.updateDeviceToken(subjectId, newToken));
        return thunkApi.fulfillWithValue(newToken);
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

const initialState = {
  subjectId: null,
  certificate: null,
  accessToken: null,
  current_questionnaire_id: null,
  status: null,
  firstTime: true,
  additional_iterations_left: null,
  current_instance_id: null,
  current_interval: null,
  general_study_end_date: null,
  personal_study_end_date: null,
  language_code: null,
  fcm_token: null,
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) =>
    builder
      // is invoked when data was loaded from local storage
      .addCase(REHYDRATE, (state, action) => ({
        ...state,
        ...action.payload?.User,
      }))
      // is invoked after successful login
      .addCase(sendCredentials.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
      }))
      // is invoked when the language has been changed
      .addCase(updateLanguage.fulfilled, (state, action) => ({
        ...state,
        language_code: action.payload,
      }))
      // is invoked whenever new user data has bee fetched from the backend
      .addCase(updateUser.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
        // if no valid certificate was provided, use the fallback from config
        certificate:
          action.payload.recipient_certificate_pem_string === 'false'
            ? appConfig.defaultRecipientCertificatePemString
            : action.payload.recipient_certificate_pem_string,
      }))
      // when a questionnaire response has been sent out, a user updated is triggered immediately afterwards
      // so the final result of 'sendQuestionnaireResponse' is new user data
      .addCase(sendQuestionnaireResponse.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
      }))
      // same as 'sendQuestionnaireResponse'
      .addCase(sendReport.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
      }))
      .addCase(updateFCMToken.fulfilled, (state, action) => ({
        ...state,
        fcm_token: action.payload,
      }))
      // reset for debugging
      .addCase(reset.fulfilled, () => ({ ...initialState }))
      .addDefaultCase((state) => ({ ...state })),
});

export default UserSlice.reducer;
export { sendCredentials, updateUser, updateLanguage, updateFCMToken };
