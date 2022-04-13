import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateUser, sendCredentials, updateLanguage } from './user.slice';
import { fetchQuestionnaire } from './questionnaire.slice';
import { sendQuestionnaireResponse, sendReport, reset } from './sharedActions';

// services & config
import { guestClient } from '../services/rest';
import kioskApi from '../config/kioskApiConfig';
import { setAvailableLanguages } from '../services/localization';

const getLanguages = createAsyncThunk(
  'globals/GET_LANGUAGES',
  async (_, thunkApi) => {
    const languages = await (kioskApi.active
      ? kioskApi.getLanguages()
      : guestClient.getLanguages());
    setAvailableLanguages(languages);
    return thunkApi.fulfillWithValue(languages);
  },
);

/**
 * this part of the global state handles the loading state and all errors (mostly network related) that might occur
 */
const GlobalsSlice = createSlice({
  name: 'globals',
  initialState: {
    loading: true,
    error: null,
    availableLanguages: null,
  },
  reducers: {
    INIT: (state) => ({ ...state, loading: false }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendCredentials.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(sendCredentials.fulfilled, (state) => ({
        ...state,
        loading: false,
      }))
      .addCase(sendCredentials.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload.error,
      }))
      .addCase(updateUser.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(updateUser.fulfilled, (state) => ({
        ...state,
        loading: false,
        error: null,
      }))
      .addCase(updateUser.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload.error,
      }))
      .addCase(updateLanguage.pending, (state) => ({ ...state, loading: true }))
      .addCase(updateLanguage.fulfilled, (state) => ({
        ...state,
        loading: false,
      }))
      .addCase(updateLanguage.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload.error,
      }))
      .addCase(fetchQuestionnaire.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(fetchQuestionnaire.fulfilled, (state) => ({
        ...state,
        loading: false,
      }))
      .addCase(fetchQuestionnaire.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload.error,
      }))
      .addCase(sendQuestionnaireResponse.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(sendQuestionnaireResponse.fulfilled, (state) => ({
        ...state,
        loading: false,
      }))
      .addCase(sendQuestionnaireResponse.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload ? action.payload.error : action.error,
        };
      })
      .addCase(reset.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(reset.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload.error,
      }))
      .addCase(reset.fulfilled, (_state) => ({
        loading: false,
        error: null,
        availableLanguages: null,
      }))
      .addCase(sendReport.pending, (state) => ({ ...state, loading: true }))
      .addCase(sendReport.fulfilled, (state) => ({
        ...state,
        loading: false,
        error: null,
      }))
      .addCase(sendReport.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload.error,
      }))
      .addCase(getLanguages.fulfilled, (state, action) => ({
        ...state,
        availableLanguages: action.payload,
      }))
      .addDefaultCase((state) => ({ ...state }));
  },
});

export default GlobalsSlice.reducer;
export { getLanguages };
export const { INIT: init } = GlobalsSlice.actions;
