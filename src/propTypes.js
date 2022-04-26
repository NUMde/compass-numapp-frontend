import PropTypes from 'prop-types';

const itemPropType = {
  linkId: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'group',
    'display',
    'string',
    'integer',
    'decimal',
    'boolean',
    'date',
    'choice',
    'ignore',
    'number',
  ]),
  text: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  enableWhen: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      operator: PropTypes.string.isRequired,
      answerBoolean: PropTypes.bool,
      answerString: PropTypes.string,
      answerInteger: PropTypes.number,
    }),
  ),
  extension: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      valueString: PropTypes.string,
      valueDate: PropTypes.string,
      valueDecimal: PropTypes.number,
      valueCodeableConcept: PropTypes.shape({
        coding: PropTypes.arrayOf(
          PropTypes.shape({
            system: PropTypes.string,
            code: PropTypes.string,
          }),
        ),
      }),
    }),
  ),
  definition: PropTypes.string,
};

// workaround because 'PropTypes' does not support recursive properties
itemPropType.item = PropTypes.arrayOf(PropTypes.shape(itemPropType));

const webViewPropType = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  iconType: PropTypes.string.isRequired,
  iconTitle: PropTypes.string.isRequired,
};

const navigationPropType = {
  goBack: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};

const modalLinkPropType = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  text: PropTypes.string.isRequired,
  iconType: PropTypes.string.isRequired,
  iconTitle: PropTypes.string.isRequired,
};

export { itemPropType, webViewPropType, navigationPropType, modalLinkPropType };
