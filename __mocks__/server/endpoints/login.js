import { rest } from 'msw';
import config from '~config/configProvider';

let outdatedInitial = true;

export default rest.get(
  `${config.appConfig.endpoints.login}:subjectId`,
  (req, res, ctx) => {
    const userData = {
      current_instance_id: 'first_instance',
      current_questionnaire_id:
        'http://hl7.org/fhir/Questionnaire/Fragebogen_COMPASS_Beispiel|1.0',
      due_date: new Date('Mon Mar 14 2022').toUTCString(),
      start_date: new Date().toUTCString(),
      subjectId: req.params.subjectId,
      firstTime: true,
      status: 'on-study',
      general_study_end_date: '9999-12-30T23:00:00.000Z',
      personal_study_end_date: '9999-12-30T23:00:00.000Z',
      recipient_certificate_pem_string: 'false',
    };
    if (req.params.subjectId === 'outdatedUser') {
      if (!outdatedInitial) {
        return res(
          ctx.json({
            ...userData,
            start_date: new Date(new Date().setDate(new Date().getDate() + 3)),
            additional_iterations_left: 0,
          }),
        );
      }
      outdatedInitial = false;
    } else if (req.params.subjectId === 'reportingUser') {
      return res(
        ctx.status(200),
        ctx.json({
          ...userData,
          start_date: new Date(new Date().setDate(new Date().getDate() + 2)),
        }),
      );
    }

    return res(ctx.status(200), ctx.json(userData));
  },
);
