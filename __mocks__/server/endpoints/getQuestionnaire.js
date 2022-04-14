import { rest } from 'msw';
import config from '~config/configProvider';
import questionnaire from '~assets/files/questionnaire';

export default rest.get(
  `${config.appConfig.endpoints.getQuestionnaire}:questionnaireId/:langCode`,
  (_req, res, ctx) => {
    return res(ctx.json(questionnaire));
  },
);
