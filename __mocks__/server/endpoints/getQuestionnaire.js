import { rest } from 'msw';
import config from '../../../src/config/configProvider';
import questionnaire from '../../../src/assets/files/questionnaire';

export default rest.get(
  `${config.appConfig.endpoints.getQuestionnaire}:questionnaireId/:langCode`,
  (_req, res, ctx) => {
    return res(ctx.json(questionnaire));
  },
);
