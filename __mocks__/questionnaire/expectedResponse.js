export default {
  resourceType: 'QuestionnaireResponse',
  status: 'completed',
  questionnaire:
    'http://hl7.org/fhir/Questionnaire/Fragebogen_COMPASS_Beispiel',
  item: [
    {
      linkId: '1',
      text: 'Fragegruppe 1',
      item: [
        {
          linkId: '1.1',
          text: 'Das ist eine Freitextabfrage',
          answer: [
            {
              valueString: 'text',
            },
          ],
        },
        {
          linkId: '1.2',
          text: 'Das ist eine Datumsabfrage',
          answer: [
            {
              valueDate: '2022-03-14',
            },
          ],
        },
        {
          linkId: '1.3',
          text: 'Das ist eine Dezimalzahlenabfrage',
          answer: [
            {
              valueDecimal: 1,
            },
          ],
        },
        {
          linkId: '1.4',
          text: 'Das ist eine Ganzzahlenabfrage',
          answer: [
            {
              valueInteger: 10,
            },
          ],
        },
        {
          linkId: '1.5',
          text: 'Das ist eine boolsche Abfrage',
          answer: [
            {
              valueBoolean: false,
            },
          ],
        },
        {
          linkId: '1.7',
          text: 'Das ist eine Slider-Abfrage',
          answer: [
            {
              valueInteger: 3,
            },
          ],
        },
        {
          linkId: '1.8',
          text: 'Das ist eine optionale Frage',
          answer: [
            {
              valueString: 'empty',
            },
          ],
        },
        {
          linkId: '1.9',
          text: 'Das ist eine Choice-Abfrage mit Repeat',
          answer: [
            {
              valueString: 'Option A',
            },
            {
              valueString: 'Option D',
            },
            {
              valueString: 'Option G',
            },
          ],
        },
        {
          linkId: '1.10',
          text: 'Das ist eine Gruppe aus Booleans (kein Choice Element)',
          item: [
            {
              linkId: '1.10.1',
              text: 'Option A',
              answer: [
                {
                  valueBoolean: true,
                },
              ],
            },
            {
              linkId: '1.10.2',
              text: 'Option B',
              answer: [
                {
                  valueBoolean: false,
                },
              ],
            },
            {
              linkId: '1.10.3',
              text: 'Option C',
              answer: [
                {
                  valueBoolean: true,
                },
              ],
            },
          ],
        },
        {
          linkId: '1.11',
          text: 'Das ist eine Choice-Abfrage ohne Repeat',
          answer: [
            {
              valueString: 'Option E',
            },
          ],
        },
        {
          linkId: '1.13',
          text: 'Diese Frage wird nur angezeigt, wenn 1.11 oder 1.10.1 mit Option A beantwortet wurde',
          answer: [
            {
              valueString: 'empty',
            },
          ],
        },
        {
          linkId: '1.15',
          text: 'Bedingte Abfrage mit answerDecimal',
          item: [
            {
              linkId: '1.15.1',
              text: 'Abfrage Dezimalzahl (erwartet = 1.5)',
              answer: [
                {
                  valueDecimal: 1.5,
                },
              ],
            },
            {
              linkId: '1.15.2',
              text: 'Diese Frage wird nur bei erwarteter Eingabe angezeigt',
              answer: [
                {
                  valueString: '1',
                },
              ],
            },
          ],
        },
        {
          linkId: '1.16',
          text: 'Bedingte Abfrage mit answerInteger',
          item: [
            {
              linkId: '1.16.1',
              text: 'Abfrage Ganzzahl (erwartet = 1)',
              answer: [
                {
                  valueInteger: 1,
                },
              ],
            },
            {
              linkId: '1.16.2',
              text: 'Diese Frage wird nur bei erwarteter Eingabe angezeigt',
              answer: [
                {
                  valueString: '123',
                },
              ],
            },
          ],
        },
        {
          linkId: '1.17',
          text: 'Bedingte Abfrage mit answerDate',
          item: [
            {
              linkId: '1.17.1',
              text: 'Abfrage Datum (erwartet = 01.01.2021)',
              answer: [
                {
                  valueDate: '2021-01-01',
                },
              ],
            },
            {
              linkId: '1.17.2',
              text: 'Diese Frage wird nur bei erwarteter Eingabe angezeigt',
              answer: [
                {
                  valueString: '123',
                },
              ],
            },
          ],
        },
        {
          linkId: '1.18',
          text: 'Das ist eine Frage mit Definition',
          definition: 'http://loinc.org/example#uri',
          answer: [
            {
              valueString: 'abc',
            },
          ],
        },
        {
          linkId: '1.19',
          text: 'Das ist eine Frage mit max. Eingabelänge von 10 Zeichen',
          answer: [
            {
              valueString: 'abcdefg',
            },
          ],
        },
        {
          linkId: '1.20',
          text: 'Das ist eine Single-Choice-Abfrage mit Coding',
          answer: [
            {
              valueCoding: {
                system: 'snomed',
                code: 'B',
                display: 'Beta',
              },
            },
          ],
        },
        {
          linkId: '1.21',
          text: 'Das ist eine Single-Choice-Abfrage als Drop-Down',
          answer: [
            {
              valueString: 'Option B',
            },
          ],
        },
        {
          linkId: '1.23',
          text: 'Diese Frage besteht aus zwei Teilen. Der zweiter Teil wurde auf Hidden gesetzt und wird nicht angezeigt.',
          item: [
            {
              linkId: '1.23.1',
              text: 'Abfrage Datum',
              answer: [
                {
                  valueDate: '2022-03-14',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      linkId: '2',
      text: 'Fragegruppe 2',
      item: [
        {
          linkId: '2.1',
          text: 'Untergruppe 1',
          item: [
            {
              linkId: '2.1.1',
              text: 'Untergruppe 2',
              item: [
                {
                  linkId: '2.1.1.1',
                  text: 'Frage der Untergruppe 2',
                  answer: [
                    {
                      valueString: 'abc',
                    },
                  ],
                },
                {
                  linkId: '2.1.1.2',
                  text: 'Untergruppe 3',
                  item: [
                    {
                      linkId: '2.1.1.2.1',
                      text: 'Frage 1 der Untergruppe 3',
                      answer: [
                        {
                          valueString: 'abc',
                        },
                      ],
                    },
                    {
                      linkId: '2.1.1.2.2',
                      text: 'Frage 2 der Untergruppe 3',
                      answer: [
                        {
                          valueString: 'abc',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              linkId: '2.1.2',
              text: 'Frage der Untergruppe 1',
              answer: [
                {
                  valueBoolean: false,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
