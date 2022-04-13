import { rest } from 'msw';
import config from '~config/configProvider';

export default rest.post(
  `${config.appConfig.endpoints.updateLanguage}:subjectId`,
  (_req, res, ctx) => {
    return res(ctx.status(200));
  },
);
