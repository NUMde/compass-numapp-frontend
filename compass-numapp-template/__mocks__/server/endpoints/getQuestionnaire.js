import { rest } from 'msw';
import endpoints from '~services/rest/endpoints';
import questionnaire from '~assets/files/questionnaire.json';

export default rest.get(
  `${endpoints.getQuestionnaire}:questionnaireId/:langCode`,
  (_req, res, ctx) => {
    return res(ctx.json(questionnaire));
  },
);
