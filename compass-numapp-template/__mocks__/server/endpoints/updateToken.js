import { rest } from 'msw';
import endpoints from '~services/rest/endpoints';

export default rest.post(
  `${endpoints.updateToken}:subjectId`,
  (_req, res, ctx) => {
    return res(ctx.status(200));
  },
);
