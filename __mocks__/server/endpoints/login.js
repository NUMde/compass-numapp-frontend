import { rest } from 'msw';
import config from '../../../src/config/configProvider';

export default rest.get(
  `${config.appConfig.endpoints.login}:subjectId`,
  (_req, res, ctx) => {
    return res(
      ctx.json({
        current_instance_id: 'first_instance',
        current_questionnaire_id:
          'http://hl7.org/fhir/Questionnaire/Fragebogen_COMPASS_Beispiel|1.0',
        due_date: '9999-12-30T23:00:00.000Z',
        start_date: new Date().toUTCString(),
        subjectId: '7bfc3b07-a97d-4e11-8ac6-b970c1745476',
        firstTime: true,
        status: 'on-study',
        general_study_end_date: 'Unknown Type: date',
        personal_study_end_date: 'Unknown Type: date',
      }),
    );
  },
);
