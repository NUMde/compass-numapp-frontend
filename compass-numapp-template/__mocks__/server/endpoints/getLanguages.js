import { rest } from 'msw';
import endpoints from '~services/rest/endpoints';

export default rest.get(endpoints.getLanguages, (_req, res, ctx) => {
  return res(ctx.json(['en']));
});
