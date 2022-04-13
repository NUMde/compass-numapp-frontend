import { rest } from 'msw';
import config from '~config/configProvider';

export default rest.get(
  config.appConfig.endpoints.getLanguages,
  (_req, res, ctx) => {
    return res(ctx.json(['en']));
  },
);
