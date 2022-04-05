import { rest } from 'msw';
import config from '../../../src/config/configProvider';

export default rest.post('http://127.0.0.1:8080/api/queue', (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      subjectId: '7bfc3b07-a97d-4e11-8ac6-b970c1745476',
      start_date: new Date(new Date().setDate(new Date().getDate() + 1)),
    }),
  );
});
