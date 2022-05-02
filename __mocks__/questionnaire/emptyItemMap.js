export default {
  1: {
    linkId: '1',
    text: 'Fragegruppe 1',
    type: 'group',
    required: true,
    item: [
      {
        linkId: '1.1',
        text: 'Das ist eine Freitextabfrage',
        type: 'string',
        required: true,
      },
      {
        linkId: '1.2',
        text: 'Das ist eine Datumsabfrage',
        type: 'date',
        required: true,
      },
      {
        linkId: '1.3',
        text: 'Das ist eine Dezimalzahlenabfrage',
        type: 'decimal',
        required: true,
      },
      {
        linkId: '1.4',
        text: 'Das ist eine Ganzzahlenabfrage',
        type: 'integer',
        required: true,
      },
      {
        linkId: '1.5',
        text: 'Das ist eine boolsche Abfrage',
        type: 'boolean',
        required: true,
      },
      {
        linkId: '1.6',
        text: 'Das ist eine informative Anzeige ohne Abfrage',
        type: 'display',
        required: true,
      },
      {
        linkId: '1.7',
        text: 'Das ist eine Slider-Abfrage',
        type: 'integer',
        extension: [
          {
            url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl',
            valueCodeableConcept: {
              coding: [
                {
                  system: 'http://hl7.org/fhir/questionnaire-item-control',
                  code: 'slider',
                },
              ],
            },
          },
          {
            url: 'https://num-compass.science/fhir/StructureDefinition/LowRangeLabel',
            valueString: 'Niedrig',
          },
          {
            url: 'https://num-compass.science/fhir/StructureDefinition/HighRangeLabel',
            valueString: 'Hoch',
          },
          {
            url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-sliderStepValue',
            valueInteger: 1,
          },
          {
            url: 'http://hl7.org/fhir/StructureDefinition/minValue',
            valueInteger: 0,
          },
          {
            url: 'http://hl7.org/fhir/StructureDefinition/maxValue',
            valueInteger: 10,
          },
        ],
        required: true,
      },
      {
        linkId: '1.8',
        text: 'Das ist eine optionale Frage',
        type: 'string',
        required: false,
      },
      {
        linkId: '1.9',
        text: 'Das ist eine Choice-Abfrage mit Repeat',
        type: 'choice',
        required: true,
        repeats: true,
        answerOption: [
          {
            valueString: 'Option A',
          },
          {
            valueString: 'Option B',
          },
          {
            valueString: 'Option C',
          },
          {
            valueString: 'Option D',
          },
          {
            valueString: 'Option E',
          },
          {
            valueString: 'Option F',
          },
          {
            valueString: 'Option G',
          },
          {
            valueString: 'Option H',
          },
          {
            valueString: 'Option I',
          },
        ],
      },
      {
        linkId: '1.10',
        text: 'Das ist eine Gruppe aus Booleans (kein Choice Element)',
        type: 'group',
        required: true,
        item: [
          {
            linkId: '1.10.1',
            text: 'Option A',
            type: 'boolean',
            required: true,
          },
          {
            linkId: '1.10.2',
            text: 'Option B',
            type: 'boolean',
            required: true,
          },
          {
            linkId: '1.10.3',
            text: 'Option C',
            type: 'boolean',
            required: true,
          },
        ],
      },
      {
        linkId: '1.11',
        text: 'Das ist eine Choice-Abfrage ohne Repeat',
        type: 'choice',
        required: true,
        repeats: false,
        answerOption: [
          {
            valueString: 'Option A',
          },
          {
            valueString: 'Option B',
          },
          {
            valueString: 'Option C',
          },
          {
            valueString: 'Option D',
          },
          {
            valueString: 'Option E',
          },
          {
            valueString: 'Option F',
          },
          {
            valueString: 'Option G',
          },
          {
            valueString: 'Option H',
          },
          {
            valueString: 'Option I',
          },
        ],
      },
      {
        linkId: '1.12',
        text: 'Diese Frage wird nur angezeigt, wenn 1.11 mit Option A beantwortet wurde',
        type: 'string',
        required: true,
        enableWhen: [
          {
            question: '1.11',
            operator: '=',
            answerString: 'Option A',
          },
        ],
      },
      {
        linkId: '1.13',
        text: 'Diese Frage wird nur angezeigt, wenn 1.11 oder 1.10.1 mit Option A beantwortet wurde',
        type: 'string',
        required: true,
        enableWhen: [
          {
            question: '1.10.1',
            operator: '=',
            answerBoolean: true,
          },
          {
            question: '1.11',
            operator: '=',
            answerString: 'Option A',
          },
        ],
        enableBehavior: 'any',
      },
      {
        linkId: '1.14',
        text: 'Diese Frage wird nur angezeigt, wenn 1.11 und 1.10.1 mit Option A beantwortet wurde',
        type: 'string',
        required: true,
        enableWhen: [
          {
            question: '1.10.1',
            operator: '=',
            answerBoolean: true,
          },
          {
            question: '1.11',
            operator: '=',
            answerString: 'Option A',
          },
        ],
        enableBehavior: 'all',
      },
      {
        linkId: '1.15',
        text: 'Bedingte Abfrage mit answerDecimal',
        type: 'group',
        required: true,
        item: [
          {
            linkId: '1.15.1',
            text: 'Abfrage Dezimalzahl (erwartet = 1.5)',
            type: 'decimal',
            required: true,
          },
          {
            linkId: '1.15.2',
            text: 'Diese Frage wird nur bei erwarteter Eingabe angezeigt',
            type: 'string',
            required: true,
            enableWhen: [
              {
                question: '1.15.1',
                operator: '=',
                answerDecimal: 1.5,
              },
            ],
          },
        ],
      },
      {
        linkId: '1.16',
        text: 'Bedingte Abfrage mit answerInteger',
        type: 'group',
        required: true,
        item: [
          {
            linkId: '1.16.1',
            text: 'Abfrage Ganzzahl (erwartet = 1)',
            type: 'integer',
            required: true,
          },
          {
            linkId: '1.16.2',
            text: 'Diese Frage wird nur bei erwarteter Eingabe angezeigt',
            type: 'string',
            required: true,
            enableWhen: [
              {
                question: '1.16.1',
                operator: '=',
                answerInteger: 1,
              },
            ],
          },
        ],
      },
      {
        linkId: '1.17',
        text: 'Bedingte Abfrage mit answerDate',
        type: 'group',
        required: true,
        item: [
          {
            linkId: '1.17.1',
            text: 'Abfrage Datum (erwartet = 01.01.2021)',
            type: 'date',
            required: true,
          },
          {
            linkId: '1.17.2',
            text: 'Diese Frage wird nur bei erwarteter Eingabe angezeigt',
            type: 'string',
            required: true,
            enableWhen: [
              {
                question: '1.17.1',
                operator: '=',
                answerDate: '2021-01-01',
              },
            ],
          },
        ],
      },
      {
        linkId: '1.18',
        text: 'Das ist eine Frage mit Definition',
        type: 'string',
        required: true,
        definition: 'http://loinc.org/example#uri',
      },
      {
        linkId: '1.19',
        text: 'Das ist eine Frage mit max. Eingabelänge von 10 Zeichen',
        type: 'string',
        required: true,
        maxLength: 10,
      },
      {
        linkId: '1.20',
        text: 'Das ist eine Single-Choice-Abfrage mit Coding',
        type: 'choice',
        required: true,
        answerOption: [
          {
            valueCoding: {
              system: 'snomed',
              code: 'A',
              display: 'Alpha',
            },
          },
          {
            valueCoding: {
              system: 'snomed',
              code: 'B',
              display: 'Beta',
            },
          },
          {
            valueCoding: {
              system: 'snomed',
              code: 'C',
              display: 'Gamma',
            },
          },
        ],
      },
      {
        linkId: '1.21',
        text: 'Das ist eine Single-Choice-Abfrage als Drop-Down',
        type: 'choice',
        required: true,
        answerOption: [
          {
            valueString: 'Option A',
          },
          {
            valueString: 'Option B',
          },
          {
            valueString: 'Option C',
          },
          {
            valueString: 'Option D',
          },
          {
            valueString: 'Option E',
          },
          {
            valueString: 'Option F',
          },
          {
            valueString: 'Option G',
          },
          {
            valueString: 'Option H',
          },
          {
            valueString: 'Option I',
          },
        ],
        extension: [
          {
            url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl',
            valueCodeableConcept: {
              coding: [
                {
                  system: 'http://hl7.org/fhir/questionnaire-item-control',
                  code: 'drop-down',
                },
              ],
            },
          },
        ],
      },
      {
        linkId: '1.22',
        text: 'Das ist eine Frage mit hidden-extension',
        type: 'string',
        extension: [
          {
            url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-hidden',
            valueBoolean: true,
          },
        ],
      },
      {
        linkId: '1.23',
        text: 'Diese Frage besteht aus zwei Teilen. Der zweiter Teil wurde auf Hidden gesetzt und wird nicht angezeigt.',
        type: 'group',
        required: true,
        item: [
          {
            linkId: '1.23.1',
            text: 'Abfrage Datum',
            type: 'date',
            required: true,
          },
          {
            linkId: '1.23.2',
            text: 'Diese Frage wird nur bei erwarteter Eingabe angezeigt',
            type: 'string',
            extension: [
              {
                url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-hidden',
                valueBoolean: true,
              },
            ],
          },
        ],
      },
      {
        linkId: '1.24',
        text: "Diese Frage wird nur angezeigt, wenn Frage 1.20 mit 'Alpha' beantwortet wurde",
        type: 'string',
        required: true,
        enableWhen: [
          {
            question: '1.20',
            operator: '=',
            answerCoding: {
              system: 'snomed',
              code: 'A',
              display: 'Alpha',
            },
          },
        ],
        done: false,
        answer: null,
      },
      {
        linkId: '1.25',
        text: 'Frage mit regulärem Ausdruck; nur Kleinbuchstaben erlaubt',
        type: 'string',
        extension: [
          {
            url: 'http://hl7.org/fhir/StructureDefinition/regex',
            valueString: '^[a-z]',
          },
        ],
        required: true,
      },
    ],
    done: false,
    answer: null,
    started: false,
  },
  2: {
    linkId: '2',
    text: 'Fragegruppe 2',
    type: 'group',
    required: true,
    item: [
      {
        linkId: '2.1',
        text: 'Untergruppe 1',
        type: 'group',
        required: true,
        item: [
          {
            linkId: '2.1.1',
            text: 'Untergruppe 2',
            type: 'group',
            required: true,
            item: [
              {
                linkId: '2.1.1.1',
                text: 'Frage der Untergruppe 2',
                type: 'string',
                required: true,
              },
              {
                linkId: '2.1.1.2',
                text: 'Untergruppe 3',
                type: 'group',
                required: true,
                item: [
                  {
                    linkId: '2.1.1.2.1',
                    text: 'Frage 1 der Untergruppe 3',
                    type: 'string',
                    required: true,
                  },
                  {
                    linkId: '2.1.1.2.2',
                    text: 'Frage 2 der Untergruppe 3',
                    type: 'string',
                    required: true,
                  },
                ],
              },
            ],
          },
          {
            linkId: '2.1.2',
            text: 'Frage der Untergruppe 1',
            type: 'boolean',
            required: true,
          },
        ],
      },
    ],
    done: false,
    answer: null,
    started: false,
  },
  1.1: {
    linkId: '1.1',
    text: 'Das ist eine Freitextabfrage',
    type: 'string',
    required: true,
    answer: null,
    done: false,
  },
  1.2: {
    linkId: '1.2',
    text: 'Das ist eine Datumsabfrage',
    type: 'date',
    required: true,
    answer: null,
    done: false,
  },
  1.3: {
    linkId: '1.3',
    text: 'Das ist eine Dezimalzahlenabfrage',
    type: 'decimal',
    required: true,
    answer: null,
    done: false,
  },
  1.4: {
    linkId: '1.4',
    text: 'Das ist eine Ganzzahlenabfrage',
    type: 'integer',
    required: true,
    answer: null,
    done: false,
  },
  1.5: {
    linkId: '1.5',
    text: 'Das ist eine boolsche Abfrage',
    type: 'boolean',
    required: true,
    done: false,
    answer: null,
  },
  1.6: {
    linkId: '1.6',
    text: 'Das ist eine informative Anzeige ohne Abfrage',
    type: 'display',
    required: true,
    done: false,
    answer: null,
  },
  1.7: {
    linkId: '1.7',
    text: 'Das ist eine Slider-Abfrage',
    type: 'integer',
    extension: [
      {
        url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl',
        valueCodeableConcept: {
          coding: [
            {
              system: 'http://hl7.org/fhir/questionnaire-item-control',
              code: 'slider',
            },
          ],
        },
      },
      {
        url: 'https://num-compass.science/fhir/StructureDefinition/LowRangeLabel',
        valueString: 'Niedrig',
      },
      {
        url: 'https://num-compass.science/fhir/StructureDefinition/HighRangeLabel',
        valueString: 'Hoch',
      },
      {
        url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-sliderStepValue',
        valueInteger: 1,
      },
      {
        url: 'http://hl7.org/fhir/StructureDefinition/minValue',
        valueInteger: 0,
      },
      {
        url: 'http://hl7.org/fhir/StructureDefinition/maxValue',
        valueInteger: 10,
      },
    ],
    required: true,
    answer: null,
    done: false,
  },
  1.8: {
    linkId: '1.8',
    text: 'Das ist eine optionale Frage',
    type: 'string',
    required: false,
    done: false,
    answer: null,
  },
  1.9: {
    linkId: '1.9',
    text: 'Das ist eine Choice-Abfrage mit Repeat',
    type: 'choice',
    required: true,
    repeats: true,
    answerOption: [
      {
        valueString: 'Option A',
      },
      {
        valueString: 'Option B',
      },
      {
        valueString: 'Option C',
      },
      {
        valueString: 'Option D',
      },
      {
        valueString: 'Option E',
      },
      {
        valueString: 'Option F',
      },
      {
        valueString: 'Option G',
      },
      {
        valueString: 'Option H',
      },
      {
        valueString: 'Option I',
      },
    ],
    answer: null,
    done: false,
  },
  '1.10': {
    linkId: '1.10',
    text: 'Das ist eine Gruppe aus Booleans (kein Choice Element)',
    type: 'group',
    required: true,
    item: [
      {
        linkId: '1.10.1',
        text: 'Option A',
        type: 'boolean',
        required: true,
      },
      {
        linkId: '1.10.2',
        text: 'Option B',
        type: 'boolean',
        required: true,
      },
      {
        linkId: '1.10.3',
        text: 'Option C',
        type: 'boolean',
        required: true,
      },
    ],
    done: false,
    answer: null,
  },
  '1.10.1': {
    linkId: '1.10.1',
    text: 'Option A',
    type: 'boolean',
    required: true,
    done: false,
    answer: null,
  },
  '1.10.2': {
    linkId: '1.10.2',
    text: 'Option B',
    type: 'boolean',
    required: true,
    done: false,
    answer: null,
  },
  '1.10.3': {
    linkId: '1.10.3',
    text: 'Option C',
    type: 'boolean',
    required: true,
    done: false,
    answer: null,
  },
  1.11: {
    linkId: '1.11',
    text: 'Das ist eine Choice-Abfrage ohne Repeat',
    type: 'choice',
    required: true,
    repeats: false,
    answerOption: [
      {
        valueString: 'Option A',
      },
      {
        valueString: 'Option B',
      },
      {
        valueString: 'Option C',
      },
      {
        valueString: 'Option D',
      },
      {
        valueString: 'Option E',
      },
      {
        valueString: 'Option F',
      },
      {
        valueString: 'Option G',
      },
      {
        valueString: 'Option H',
      },
      {
        valueString: 'Option I',
      },
    ],
    answer: null,
    done: false,
  },
  1.12: {
    linkId: '1.12',
    text: 'Diese Frage wird nur angezeigt, wenn 1.11 mit Option A beantwortet wurde',
    type: 'string',
    required: true,
    enableWhen: [
      {
        question: '1.11',
        operator: '=',
        answerString: 'Option A',
      },
    ],
    answer: null,
  },
  1.13: {
    linkId: '1.13',
    text: 'Diese Frage wird nur angezeigt, wenn 1.11 oder 1.10.1 mit Option A beantwortet wurde',
    type: 'string',
    required: true,
    enableWhen: [
      {
        question: '1.10.1',
        operator: '=',
        answerBoolean: true,
      },
      {
        question: '1.11',
        operator: '=',
        answerString: 'Option A',
      },
    ],
    enableBehavior: 'any',
    answer: null,
    done: false,
  },
  1.14: {
    linkId: '1.14',
    text: 'Diese Frage wird nur angezeigt, wenn 1.11 und 1.10.1 mit Option A beantwortet wurde',
    type: 'string',
    required: true,
    enableWhen: [
      {
        question: '1.10.1',
        operator: '=',
        answerBoolean: true,
      },
      {
        question: '1.11',
        operator: '=',
        answerString: 'Option A',
      },
    ],
    enableBehavior: 'all',
    answer: null,
  },
  1.15: {
    linkId: '1.15',
    text: 'Bedingte Abfrage mit answerDecimal',
    type: 'group',
    required: true,
    item: [
      {
        linkId: '1.15.1',
        text: 'Abfrage Dezimalzahl (erwartet = 1.5)',
        type: 'decimal',
        required: true,
      },
      {
        linkId: '1.15.2',
        text: 'Diese Frage wird nur bei erwarteter Eingabe angezeigt',
        type: 'string',
        required: true,
        enableWhen: [
          {
            question: '1.15.1',
            operator: '=',
            answerDecimal: 1.5,
          },
        ],
      },
    ],
    done: false,
    answer: null,
  },
  '1.15.1': {
    linkId: '1.15.1',
    text: 'Abfrage Dezimalzahl (erwartet = 1.5)',
    type: 'decimal',
    required: true,
    answer: null,
    done: false,
  },
  '1.15.2': {
    linkId: '1.15.2',
    text: 'Diese Frage wird nur bei erwarteter Eingabe angezeigt',
    type: 'string',
    required: true,
    enableWhen: [
      {
        question: '1.15.1',
        operator: '=',
        answerDecimal: 1.5,
      },
    ],
    answer: null,
    done: false,
  },
  1.16: {
    linkId: '1.16',
    text: 'Bedingte Abfrage mit answerInteger',
    type: 'group',
    required: true,
    item: [
      {
        linkId: '1.16.1',
        text: 'Abfrage Ganzzahl (erwartet = 1)',
        type: 'integer',
        required: true,
      },
      {
        linkId: '1.16.2',
        text: 'Diese Frage wird nur bei erwarteter Eingabe angezeigt',
        type: 'string',
        required: true,
        enableWhen: [
          {
            question: '1.16.1',
            operator: '=',
            answerInteger: 1,
          },
        ],
      },
    ],
    done: false,
    answer: null,
  },
  '1.16.1': {
    linkId: '1.16.1',
    text: 'Abfrage Ganzzahl (erwartet = 1)',
    type: 'integer',
    required: true,
    answer: null,
    done: false,
  },
  '1.16.2': {
    linkId: '1.16.2',
    text: 'Diese Frage wird nur bei erwarteter Eingabe angezeigt',
    type: 'string',
    required: true,
    enableWhen: [
      {
        question: '1.16.1',
        operator: '=',
        answerInteger: 1,
      },
    ],
    answer: null,
    done: false,
  },
  1.17: {
    linkId: '1.17',
    text: 'Bedingte Abfrage mit answerDate',
    type: 'group',
    required: true,
    item: [
      {
        linkId: '1.17.1',
        text: 'Abfrage Datum (erwartet = 01.01.2021)',
        type: 'date',
        required: true,
      },
      {
        linkId: '1.17.2',
        text: 'Diese Frage wird nur bei erwarteter Eingabe angezeigt',
        type: 'string',
        required: true,
        enableWhen: [
          {
            question: '1.17.1',
            operator: '=',
            answerDate: '2021-01-01',
          },
        ],
      },
    ],
    done: false,
    answer: null,
  },
  '1.17.1': {
    linkId: '1.17.1',
    text: 'Abfrage Datum (erwartet = 01.01.2021)',
    type: 'date',
    required: true,
    answer: null,
    done: false,
  },
  '1.17.2': {
    linkId: '1.17.2',
    text: 'Diese Frage wird nur bei erwarteter Eingabe angezeigt',
    type: 'string',
    required: true,
    enableWhen: [
      {
        question: '1.17.1',
        operator: '=',
        answerDate: '2021-01-01',
      },
    ],
    answer: null,
    done: false,
  },
  1.18: {
    linkId: '1.18',
    text: 'Das ist eine Frage mit Definition',
    type: 'string',
    required: true,
    definition: 'http://loinc.org/example#uri',
    answer: null,
    done: false,
  },
  1.19: {
    linkId: '1.19',
    text: 'Das ist eine Frage mit max. Eingabelänge von 10 Zeichen',
    type: 'string',
    required: true,
    maxLength: 10,
    answer: null,
    done: false,
  },
  '1.20': {
    linkId: '1.20',
    text: 'Das ist eine Single-Choice-Abfrage mit Coding',
    type: 'choice',
    required: true,
    answerOption: [
      {
        valueCoding: {
          system: 'snomed',
          code: 'A',
          display: 'Alpha',
        },
      },
      {
        valueCoding: {
          system: 'snomed',
          code: 'B',
          display: 'Beta',
        },
      },
      {
        valueCoding: {
          system: 'snomed',
          code: 'C',
          display: 'Gamma',
        },
      },
    ],
    answer: null,
    done: false,
  },
  1.21: {
    linkId: '1.21',
    text: 'Das ist eine Single-Choice-Abfrage als Drop-Down',
    type: 'choice',
    required: true,
    answerOption: [
      {
        valueString: 'Option A',
      },
      {
        valueString: 'Option B',
      },
      {
        valueString: 'Option C',
      },
      {
        valueString: 'Option D',
      },
      {
        valueString: 'Option E',
      },
      {
        valueString: 'Option F',
      },
      {
        valueString: 'Option G',
      },
      {
        valueString: 'Option H',
      },
      {
        valueString: 'Option I',
      },
    ],
    extension: [
      {
        url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl',
        valueCodeableConcept: {
          coding: [
            {
              system: 'http://hl7.org/fhir/questionnaire-item-control',
              code: 'drop-down',
            },
          ],
        },
      },
    ],
    answer: null,
    done: false,
  },
  1.22: {
    linkId: '1.22',
    text: 'Das ist eine Frage mit hidden-extension',
    type: 'string',
    extension: [
      {
        url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-hidden',
        valueBoolean: true,
      },
    ],
    done: false,
    answer: null,
    required: false,
  },
  1.23: {
    linkId: '1.23',
    text: 'Diese Frage besteht aus zwei Teilen. Der zweiter Teil wurde auf Hidden gesetzt und wird nicht angezeigt.',
    type: 'group',
    required: true,
    item: [
      {
        linkId: '1.23.1',
        text: 'Abfrage Datum',
        type: 'date',
        required: true,
      },
      {
        linkId: '1.23.2',
        text: 'Diese Frage wird nur bei erwarteter Eingabe angezeigt',
        type: 'string',
        extension: [
          {
            url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-hidden',
            valueBoolean: true,
          },
        ],
      },
    ],
    done: false,
    answer: null,
  },
  '1.23.1': {
    linkId: '1.23.1',
    text: 'Abfrage Datum',
    type: 'date',
    required: true,
    answer: null,
    done: false,
  },
  '1.23.2': {
    linkId: '1.23.2',
    text: 'Diese Frage wird nur bei erwarteter Eingabe angezeigt',
    type: 'string',
    extension: [
      {
        url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-hidden',
        valueBoolean: true,
      },
    ],
    done: false,
    answer: null,
    required: false,
  },
  1.24: {
    linkId: '1.24',
    text: 'bla',
    type: 'string',
    extension: [
      {
        url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-hidden',
        valueBoolean: true,
      },
    ],
    done: false,
    answer: null,
    required: false,
  },
  1.25: {
    linkId: '1.25',
    text: 'Frage mit regulärem Ausdruck; nur Kleinbuchstaben erlaubt',
    type: 'string',
    extension: [
      {
        url: 'http://hl7.org/fhir/StructureDefinition/regex',
        valueString: '^[a-z]+$',
      },
    ],
    required: true,
    answer: null,
    done: false,
  },
  2.1: {
    linkId: '2.1',
    text: 'Untergruppe 1',
    type: 'group',
    required: true,
    item: [
      {
        linkId: '2.1.1',
        text: 'Untergruppe 2',
        type: 'group',
        required: true,
        item: [
          {
            linkId: '2.1.1.1',
            text: 'Frage der Untergruppe 2',
            type: 'string',
            required: true,
          },
          {
            linkId: '2.1.1.2',
            text: 'Untergruppe 3',
            type: 'group',
            required: true,
            item: [
              {
                linkId: '2.1.1.2.1',
                text: 'Frage 1 der Untergruppe 3',
                type: 'string',
                required: true,
              },
              {
                linkId: '2.1.1.2.2',
                text: 'Frage 2 der Untergruppe 3',
                type: 'string',
                required: true,
              },
            ],
          },
        ],
      },
      {
        linkId: '2.1.2',
        text: 'Frage der Untergruppe 1',
        type: 'boolean',
        required: true,
      },
    ],
    done: false,
    answer: null,
  },
  '2.1.1': {
    linkId: '2.1.1',
    text: 'Untergruppe 2',
    type: 'group',
    required: true,
    item: [
      {
        linkId: '2.1.1.1',
        text: 'Frage der Untergruppe 2',
        type: 'string',
        required: true,
      },
      {
        linkId: '2.1.1.2',
        text: 'Untergruppe 3',
        type: 'group',
        required: true,
        item: [
          {
            linkId: '2.1.1.2.1',
            text: 'Frage 1 der Untergruppe 3',
            type: 'string',
            required: true,
          },
          {
            linkId: '2.1.1.2.2',
            text: 'Frage 2 der Untergruppe 3',
            type: 'string',
            required: true,
          },
        ],
      },
    ],
    done: false,
    answer: null,
  },
  '2.1.1.1': {
    linkId: '2.1.1.1',
    text: 'Frage der Untergruppe 2',
    type: 'string',
    required: true,
    answer: 'abc',
    done: false,
  },
  '2.1.1.2': {
    linkId: '2.1.1.2',
    text: 'Untergruppe 3',
    type: 'group',
    required: true,
    item: [
      {
        linkId: '2.1.1.2.1',
        text: 'Frage 1 der Untergruppe 3',
        type: 'string',
        required: true,
      },
      {
        linkId: '2.1.1.2.2',
        text: 'Frage 2 der Untergruppe 3',
        type: 'string',
        required: true,
      },
    ],
    done: false,
    answer: null,
  },
  '2.1.1.2.1': {
    linkId: '2.1.1.2.1',
    text: 'Frage 1 der Untergruppe 3',
    type: 'string',
    required: true,
    answer: null,
    done: false,
  },
  '2.1.1.2.2': {
    linkId: '2.1.1.2.2',
    text: 'Frage 2 der Untergruppe 3',
    type: 'string',
    required: true,
    answer: null,
    done: false,
  },
  '2.1.2': {
    linkId: '2.1.2',
    text: 'Frage der Untergruppe 1',
    type: 'boolean',
    required: true,
    done: false,
    answer: null,
  },
};
