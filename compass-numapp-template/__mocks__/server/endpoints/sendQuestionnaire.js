import { rest } from 'msw';
import endpoints from '~services/rest/endpoints';

export default rest.post(endpoints.sendQuestionnaire, (req, res, ctx) => {
  const subjectId = req.url.searchParams.get('subjectId');
  const userData = {
    subjectId,
    current_questionnaire_id: 'newQuestionnaire|1.0',
    start_date: new Date(new Date().setDate(new Date().getDate() + 1)),
    firstTime: false,
  };
  if (subjectId === 'reportingUser') {
    return res(
      ctx.status(200),
      ctx.json({ ...userData, iterationsLeft: 5, start_date: new Date() }),
    );
  }
  return res(ctx.status(200), ctx.json(userData));
});
