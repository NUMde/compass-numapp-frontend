import { Alert } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { loggedInClient } from '../services/rest';
import translate from '../services/localization';
import kioskApi from '../config/kioskApiConfig';

const isKioskMode = kioskApi.active;

/**
 * shared actions used by multiple slices of the state
 */

const hideModal = createAction('shared/HIDE_MODAL');

const sendQuestionnaireResponse = createAsyncThunk(
  'shared/SEND_QUESTIONNAIRE_RESPONSE',
  async ({ body, triggerMap }, thunkApi) => {
    const {
      User: {
        subjectId,
        current_questionnaire_id,
        current_instance_id,
        certificate,
      },
    } = thunkApi.getState();
    try {
      // send out response
      await (isKioskMode
        ? kioskApi.sendQuestionnaire()
        : loggedInClient.sendQuestionnaire(
            body,
            triggerMap,
            subjectId,
            current_questionnaire_id,
            current_instance_id,
            certificate,
          ));
      Alert.alert(
        translate('generic').successTitle,
        translate('generic').sendSuccess,
      );
      // update user data
      const response = await (isKioskMode
        ? kioskApi.getUserUpdate()
        : loggedInClient.getUserUpdate(subjectId));
      return thunkApi.fulfillWithValue(response.data);
    } catch (err) {
      Alert.alert(
        translate('generic').errorTitle,
        translate('generic').sendError,
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
          failedAction: 'shared/SEND_QUESTIONNAIRE_RESPONSE',
        },
      });
    }
  },
);

const sendReport = createAsyncThunk(
  'shared/SEND_REPORT',
  async ({ subjectId, certificate }, thunkApi) => {
    try {
      // send out report
      await loggedInClient.sendReport(subjectId, certificate);
      // get updated userData from backend
      const response = await (isKioskMode
        ? kioskApi.getUserUpdate()
        : loggedInClient.getUserUpdate(subjectId));
      // return data to update state
      Alert.alert(
        translate('generic').successTitle,
        translate('generic').sendSuccess,
      );
      return thunkApi.fulfillWithValue(response.data);
    } catch (err) {
      Alert.alert(
        translate('generic').errorTitle,
        translate('generic').sendError,
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
          failedAction: 'shared/SEND_REPORT',
        },
      });
    }
  },
);

const reset = createAsyncThunk('shared/RESET', async () => {
  await EncryptedStorage.clear();
});

export { hideModal, sendQuestionnaireResponse, sendReport, reset };
