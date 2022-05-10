import { StyleSheet, I18nManager, Dimensions } from 'react-native';

import { appConfig, theme } from '~config';

// visual calculations
/*-----------------------------------------------------------------------------------*/

/**
 * determines the marginLeft-property for items in the questionnaireModal.
 * (based on their linkId)
 * @param  {string} linkId linkId of a questionnaire-item
 */
export const calculateIndent = (linkId) => {
  // the values and formula are empirical ones - they felt right
  const margin = Math.round(linkId.split('.').length / 2) - 2;
  return margin >= 1 ? margin * 38 : 0;
};

/**
 * determines the fontSize-property for items in the questionnaireModal.
 * (based on their linkId)
 * @param  {string} linkId linkId of a questionnaire-item
 */
export const calculateFontSize = (linkId) =>
  // the values and formula are empirical ones - they felt right
  appConfig.scaleFontsFkt(
    18 - (Math.round(linkId.split('.').length / 2) - 1 + 0.5),
  );

/**
 * determines the lineHeight-property for items in the questionnaireModal.
 * (based on their linkId)
 * @param  {string} linkId linkId of a questionnaire-item
 */
export const calculateLineHeight = (linkId) =>
  // the values and formula are empirical ones - they felt right
  appConfig.scaleFontsFkt(
    18 - (Math.round(linkId.split('.').length / 2) - 1 + 0.5) + 5,
  );

// calculates the current size of the modal. this is necessary to impose the correct values
// when in RTL rendering.
const modalWidth = Dimensions.get('window').width - 40;

export default StyleSheet.create({
  modalContainer: {
    ...(I18nManager.isRTL && {
      width: modalWidth,
    }),
  },

  modalTitle: {
    fontSize: 24,
    marginBottom: 5,
    ...theme.fonts.title,
    color: theme.values.defaultModalTitleColor,
  },

  modalInput: {
    marginBottom: 10,
    ...(I18nManager.isRTL && {
      alignItems: 'flex-start',
    }),
  },

  contentTitle: {
    marginTop: 5,
    marginBottom: 5,
    ...theme.fonts.header2,
    color: theme.values.defaultModalTitleColor,
    ...(I18nManager.isRTL && {
      width: modalWidth,
      textAlign: 'left',
    }),
  },

  choice: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    paddingLeft: 0,
    paddingRight: 0,
    margin: 0,
  },

  choiceText: {
    margin: 0,
    padding: 0,
    ...theme.fonts.label,
    color: theme.values.defaultModalContentTextColor,
  },
});
