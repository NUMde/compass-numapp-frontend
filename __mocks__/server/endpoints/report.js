import { rest } from 'msw';
import config from '../../../src/config/configProvider';

export default rest.post(
  config.appConfig.endpoints.report,
  (_req, res, ctx) => {
    return res(ctx.status(200));
  },
);
