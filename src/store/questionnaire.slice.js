import { Alert } from 'react-native';
import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
import cloneDeep from 'lodash.clonedeep';

// service & config
import translate, { getLanguageTag } from '~services/localization';
import { loggedInClient } from '~services/rest';
import kioskApi from '~config/kioskApiConfig';
import config from '~config/configProvider';
import analyzer from '~services/questionnaireAnalyzer';
import staticQuestionnaire from '~assets/files/questionnaire';

// other actions
import { reset, sendQuestionnaireResponse } from './sharedActions';
import { updateLanguage } from './user.slice';

const isKioskMode = kioskApi.active;

/**
 * action which fetches the questionnaire from the backend
 */
const fetchQuestionnaire = createAsyncThunk(
  'questionnaire/FETCH',
  async ({ questionnaireID, subjectId }, thunkApi) => {
    try {
      const response = await (isKioskMode
        ? kioskApi.getBaseQuestionnaire(getLanguageTag())
        : loggedInClient.getBaseQuestionnaire(
            questionnaireID,
            subjectId,
            getLanguageTag(),
          ));
      // to create the metadata object the response is copied and the questions (i.e.the top-level items) are removed.
      const metadata = { ...response };
      delete metadata.item;
      return thunkApi.fulfillWithValue({
        questionnaire: config.appConfig
          .useLocalQuestionnaireInsteadOftheReceivedOne
          ? staticQuestionnaire
          : response,
        FHIRmetadata: metadata,
        subjectId,
      });
    } catch (error) {
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
          code: error.code ?? 'ERROR',
          message: error.message,
          failedAction: 'questionnaire/FETCH',
        },
      });
    }
  },
);

const initialState = {
  itemMap: null,
  categories: null,
  FHIRmetadata: null,
  pageIndex: null,
  categoryIndex: -1,
};

const QuestionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {
    // is invoked when the persisted questionnaire is outdated
    DELETE_LOCAL_QUESTIONNAIRE: () => ({ ...initialState }),
    // is invoked whenever user answers a question
    SET_ANSWER: (state, action) => {
      const { itemMap } = current(state);
      let { answer } = action.payload;
      const { linkId, repeats } = action.payload;
      let newItemMap;
      // null empty string
      if (typeof answer === 'string' && !answer) answer = null;
      // no repeat; only on answer allowed
      if (!repeats) {
        newItemMap = {
          ...itemMap,
          // set the answer at index "linkId" of the itemMap
          [linkId]: {
            ...itemMap[linkId],
            answer: answer ? [answer] : null,
          },
          // mark the category as started
          [linkId.split('.')[0]]: {
            ...itemMap[linkId.split('.')[0]],
            started: true,
          },
        };
      } else {
        // repeats; multiple answers allowed
        // create local copy pf previous answers or initialize with empty list
        const currentAnswers = state.itemMap[linkId].answer
          ? [...state.itemMap[linkId].answer]
          : [];
        // check if answer was previously selected
        const foundIndex = currentAnswers.findIndex(
          (item) => JSON.stringify(item) === JSON.stringify(answer),
        );
        // if answer was present, remove it
        if (foundIndex > -1) {
          currentAnswers.splice(foundIndex, 1);
          // else add answer to list
        } else {
          currentAnswers.push(answer);
        }
        // return new state
        newItemMap = {
          ...itemMap,
          // set the answer at index "linkId" of the itemMap
          [linkId]: {
            ...itemMap[linkId],
            answer: currentAnswers.length > 0 ? currentAnswers : null,
            done: currentAnswers.length > 0 || !itemMap[linkId].required,
          },
          // mark the category as started
          [linkId.split('.')[0]]: {
            ...itemMap[linkId.split('.')[0]],
            started: true,
          },
        };
      }
      return {
        ...state,
        itemMap: checkQuestionnaireStatus(
          linkId,
          newItemMap[linkId].item,
          newItemMap,
        ),
        started: !!answer || state.started,
      };
    },
    // is invoked when the user switches between pages on the questionnaire modal
    SWITCH_CONTENT: (state, action) => ({
      ...state,
      pageIndex: action.payload.pageIndex,
      categoryIndex:
        action.payload.categoryIndex ?? current(state).categoryIndex,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        // generate local state when questionnaire has successfully been fetched from backend
        fetchQuestionnaire.fulfilled,
        (state, { payload: { questionnaire, subjectId, FHIRmetadata } }) => ({
          ...state,
          categories: questionnaire?.item ?? false,
          itemMap: generateQuestionnaireItemMap(questionnaire, subjectId),
          FHIRmetadata,
        }),
      )
      // is invoked when data os loaded from local storage
      .addCase(REHYDRATE, (state, action) => ({
        ...state,
        ...action.payload?.Questionnaire,
      }))
      // reset when response was sent successfully
      .addCase(sendQuestionnaireResponse.fulfilled, () => ({
        ...initialState,
      }))
      // reset for debugging
      .addCase(reset.fulfilled, () => ({ ...initialState }))
      // when the language has been updated, reset questionnaire
      .addCase(updateLanguage.fulfilled, (_state) => ({ ...initialState }))
      .addDefaultCase((state) => ({ ...state }));
  },
});

/*********************************************************************************************
 * helper methods for processing questionnaire state
 *********************************************************************************************/

/**
 * creates an entry in the questionnaireItemMap and then iterates through
 * its sub items to do the same
 * @param  {any} item questionnaireItem
 */
const traverseItem = (item, questionnaireItemMap) => {
  // generates the item
  // eslint-disable-next-line no-param-reassign
  questionnaireItemMap[item.linkId] = {
    ...item,
    /**
     * an item is 'done' by default when
     * a) it is of type 'boolean'
     * b) it is of type 'display'
     * c) it is not required
     * d) it is a group of booleans (see a))
     */
    done: item.type === 'display' || !item.required,
    answer: item.type !== 'display' && item.type !== 'group' ? null : undefined,
    type: item.type || 'ignore',
    required: item.required || false,
  };

  // adds another answer object in case  we have an open-choice
  if (
    item.type === 'open-choice' &&
    !questionnaireItemMap[item.linkId].answerOption.some(
      (e) => e.isOpenQuestionAnswer,
    )
  ) {
    questionnaireItemMap[item.linkId].answerOption.push({
      isOpenQuestionAnswer: true,
      answer: null,
    });
  }

  // sets the started value to false if the item is category
  if (item.linkId.length === 1) {
    // eslint-disable-next-line no-param-reassign
    questionnaireItemMap[item.linkId].started = false;
  }
  // traverses the subitems
  if (item.item) {
    item.item.forEach((subItem) => traverseItem(subItem, questionnaireItemMap));
  }
};

/**
 * generates the questionnaireItemMap
 * @param  {any} questionnaire a FHIR questionnaire
 * @param  {any} subjectId subjectId of the user
 */
const generateQuestionnaireItemMap = (questionnaire, subjectId) => {
  const questionnaireItemMap = {};

  // triggers the item-generation
  if (questionnaire.item) {
    questionnaire.item.forEach((subItem) =>
      traverseItem(subItem, questionnaireItemMap),
    );
  }

  return questionnaireItemMap;
};

/**
 * check if the item which was answered belongs to a group and in that case,
 * check if the completion state of that group changed
 * this is recursively repeated for all groups above the current item
 *
 * @param {string} linkId
 * @param {[QuestionnaireItem]} items
 * @param {Object<string, QuestionnaireItem>} itemMap
 * @returns
 */
const checkQuestionnaireStatus = (linkId, items, itemMap) => {
  // check if the item is a child of a subgroup
  let newItemMap;
  if (linkId.length) {
    let status;
    if (items) {
      // check the completion state of the group to which the item (identified by the linkId ) belongs
      status = analyzer.checkCompletionStateOfItems(items, itemMap);
    } else {
      status = !!itemMap[linkId].answer || itemMap[linkId].type === 'display';
    }
    newItemMap = {
      ...cloneDeep(itemMap),
      [linkId]: {
        ...itemMap[linkId],
        done: status,
      },
    };

    // get linkId of parent item
    const parentLinkId = linkId.substring(0, linkId.lastIndexOf('.'));
    // when linkId is not valid, return
    if (!parentLinkId) return newItemMap;
    return checkQuestionnaireStatus(
      parentLinkId,
      newItemMap[parentLinkId].item,
      newItemMap,
    );
  }
  return itemMap;
};

/*********************************************************************************************
 * exports
 *********************************************************************************************/

export default QuestionnaireSlice.reducer;
export { fetchQuestionnaire };

export const {
  DELETE_LOCAL_QUESTIONNAIRE: deleteQuestionnaire,
  SET_ANSWER: setAnswer,
  SWITCH_CONTENT: switchContent,
} = QuestionnaireSlice.actions;
