export default {
  1: {
    linkId: '1',
    text: 'Datentypen',
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
      },
      {
        linkId: '1.7',
        text: 'Das ist eine optionale Frage',
        type: 'string',
        required: false,
      },
      {
        linkId: '1.8',
        text: 'Das ist eine Frage mit max. Eingabelänge von 10 Zeichen',
        type: 'string',
        required: true,
        maxLength: 10,
      },
      {
        linkId: '1.9',
        text: 'Frage mit regulärem Ausdruck; nur Kleinbuchstaben erlaubt',
        type: 'string',
        extension: [
          {
            url: 'http://hl7.org/fhir/StructureDefinition/regex',
            valueString: '^[a-z]+$',
          },
        ],
        required: true,
      },
    ],
    done: true,
    started: true,
  },
  2: {
    linkId: '2',
    text: 'Fragen mit Extensions',
    type: 'group',
    required: true,
    item: [
      {
        linkId: '2.1',
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
        linkId: '2.2',
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
          {
            valueInteger: 3,
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
        linkId: '2.3',
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
        linkId: '2.4',
        text: 'Diese Frage besteht aus zwei Teilen. Der zweiter Teil wurde auf Hidden gesetzt und wird nicht angezeigt.',
        type: 'group',
        required: true,
        item: [
          {
            linkId: '2.4.1',
            text: 'Abfrage Datum',
            type: 'date',
            required: true,
          },
          {
            linkId: '2.4.2',
            text: 'Diese Frage wird nicht angezeigt',
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
    ],
    done: true,
    started: true,
  },
  3: {
    linkId: '3',
    text: 'Fragen mit Auswahlmöglichkeiten',
    type: 'group',
    required: true,
    item: [
      {
        linkId: '3.1',
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
        linkId: '3.2',
        text: 'Das ist eine Gruppe aus Booleans (kein Choice Element)',
        type: 'group',
        required: true,
        item: [
          {
            linkId: '3.2.1',
            text: 'Option A',
            type: 'boolean',
            required: true,
          },
          {
            linkId: '3.2.2',
            text: 'Option B',
            type: 'boolean',
            required: true,
          },
          {
            linkId: '3.2.3',
            text: 'Option C',
            type: 'boolean',
            required: true,
          },
        ],
      },
      {
        linkId: '3.3',
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
        linkId: '3.4',
        text: 'Das ist eine Single-Choice-Abfrage mit Coding',
        type: 'choice',
        required: true,
        answerOption: [
          {
            valueCoding: {
              system: 'http://num-compass.science',
              code: 'A',
              display: 'Alpha',
            },
          },
          {
            valueCoding: {
              system: 'http://num-compass.science',
              code: 'B',
              display: 'Beta',
            },
          },
          {
            valueCoding: {
              system: 'https://num-compass.science/',
              code: 'C',
              display: 'Gamma',
            },
          },
        ],
      },
    ],
    done: true,
    started: true,
  },
  4: {
    linkId: '4',
    text: 'Bedingte Fragen',
    type: 'group',
    required: true,
    item: [
      {
        linkId: '4.1',
        text: 'Bedingte Abfrage mit answerDecimal',
        type: 'group',
        required: true,
        item: [
          {
            linkId: '4.1.1',
            text: 'Abfrage Dezimalzahl (erwartet = 1.5)',
            type: 'decimal',
            required: true,
          },
          {
            linkId: '4.1.2',
            text: 'Diese Frage wird nur bei erwarteter Eingabe angezeigt',
            type: 'string',
            required: true,
            enableWhen: [
              {
                question: '4.1.1',
                operator: '=',
                answerDecimal: 1.5,
              },
            ],
          },
        ],
      },
      {
        linkId: '4.2',
        text: 'Bedingte Abfrage mit answerInteger',
        type: 'integer',
        required: true,
        item: [
          {
            linkId: '4.2.1',
            text: 'Diese Frage wird nur bei erwarteter Eingabe angezeigt',
            type: 'string',
            required: true,
            enableWhen: [
              {
                question: '4.2',
                operator: '=',
                answerInteger: 1,
              },
            ],
          },
        ],
      },
      {
        linkId: '4.3',
        text: 'Bedingte Abfrage mit answerDate',
        type: 'group',
        required: true,
        item: [
          {
            linkId: '4.3.1',
            text: 'Abfrage Datum (erwartet = 01.01.2021)',
            type: 'date',
            required: true,
          },
          {
            linkId: '4.3.2',
            text: 'Diese Frage wird nur bei erwarteter Eingabe angezeigt',
            type: 'string',
            required: true,
            enableWhen: [
              {
                question: '4.3.1',
                operator: '=',
                answerDate: '2021-01-01',
              },
            ],
          },
        ],
      },
      {
        linkId: '4.4',
        text: 'Diese Frage wird nur angezeigt, wenn 3.3 mit Option A beantwortet wurde',
        type: 'string',
        required: true,
        enableWhen: [
          {
            question: '3.3',
            operator: '=',
            answerString: 'Option A',
          },
        ],
      },
      {
        linkId: '4.5',
        text: 'Diese Frage wird nur angezeigt, wenn 3.2.1 oder 3.3 mit Option A beantwortet wurde',
        type: 'string',
        required: true,
        enableWhen: [
          {
            question: '3.2.1',
            operator: '=',
            answerBoolean: true,
          },
          {
            question: '3.3',
            operator: '=',
            answerString: 'Option A',
          },
        ],
        enableBehavior: 'any',
      },
      {
        linkId: '4.6',
        text: 'Diese Frage wird nur angezeigt, wenn 3.2.1 und 3.3 mit Option A beantwortet wurde',
        type: 'string',
        required: true,
        enableWhen: [
          {
            question: '3.2.1',
            operator: '=',
            answerBoolean: true,
          },
          {
            question: '3.3',
            operator: '=',
            answerString: 'Option A',
          },
        ],
        enableBehavior: 'all',
      },
    ],
    done: true,
    started: true,
  },
  5: {
    linkId: '5',
    text: 'Verschachtelte Fragen',
    type: 'group',
    required: true,
    item: [
      {
        linkId: '5.1',
        text: 'Untergruppe 1',
        type: 'group',
        required: true,
        item: [
          {
            linkId: '5.1.1',
            text: 'Untergruppe 2',
            type: 'group',
            required: true,
            item: [
              {
                linkId: '5.1.1.1',
                text: 'Frage der Untergruppe 2',
                type: 'string',
                required: true,
              },
              {
                linkId: '5.1.1.2',
                text: 'Untergruppe 3',
                type: 'group',
                required: true,
                item: [
                  {
                    linkId: '5.1.1.2.1',
                    text: 'Frage 1 der Untergruppe 3',
                    type: 'string',
                    required: true,
                  },
                  {
                    linkId: '5.1.1.2.2',
                    text: 'Frage 2 der Untergruppe 3',
                    type: 'string',
                    required: true,
                  },
                ],
              },
            ],
          },
          {
            linkId: '5.1.2',
            text: 'Frage der Untergruppe 1',
            type: 'boolean',
            required: true,
          },
        ],
      },
    ],
    done: true,
    started: true,
  },
  1.1: {
    linkId: '1.1',
    text: 'Das ist eine Freitextabfrage',
    type: 'string',
    required: true,
    done: true,
    answer: [
      {
        valueString: 'text',
      },
    ],
  },
  1.2: {
    linkId: '1.2',
    text: 'Das ist eine Datumsabfrage',
    type: 'date',
    required: true,
    done: true,
    answer: [
      {
        valueDate: '2022-03-14',
      },
    ],
  },
  1.3: {
    linkId: '1.3',
    text: 'Das ist eine Dezimalzahlenabfrage',
    type: 'decimal',
    required: true,
    done: true,
    answer: [
      {
        valueDecimal: 1,
      },
    ],
  },
  1.4: {
    linkId: '1.4',
    text: 'Das ist eine Ganzzahlenabfrage',
    type: 'integer',
    required: true,
    done: true,
    answer: [
      {
        valueInteger: 10,
      },
    ],
  },
  1.5: {
    linkId: '1.5',
    text: 'Das ist eine boolsche Abfrage',
    type: 'boolean',
    required: true,
    done: true,
    answer: [
      {
        valueBoolean: false,
      },
    ],
  },
  1.6: {
    linkId: '1.6',
    text: 'Das ist eine informative Anzeige ohne Abfrage',
    type: 'display',
    done: true,
    required: false,
  },
  1.7: {
    linkId: '1.7',
    text: 'Das ist eine optionale Frage',
    type: 'string',
    required: false,
    done: true,
    answer: [
      {
        valueString: 'empty',
      },
    ],
  },
  1.8: {
    linkId: '1.8',
    text: 'Das ist eine Frage mit max. Eingabelänge von 10 Zeichen',
    type: 'string',
    required: true,
    maxLength: 10,
    done: true,
    answer: [
      {
        valueString: 'abcdefg',
      },
    ],
  },
  1.9: {
    linkId: '1.9',
    text: 'Frage mit regulärem Ausdruck; nur Kleinbuchstaben erlaubt',
    type: 'string',
    extension: [
      {
        url: 'http://hl7.org/fhir/StructureDefinition/regex',
        valueString: '^[a-z]+$',
      },
    ],
    required: true,
    done: true,
    answer: [
      {
        valueString: 'abc',
      },
    ],
  },
  2.1: {
    linkId: '2.1',
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
    done: true,
    answer: [
      {
        valueInteger: 3,
      },
    ],
  },
  2.2: {
    linkId: '2.2',
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
      {
        valueInteger: 3,
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
    done: true,
    answer: [
      {
        valueString: 'Option B',
      },
    ],
  },
  2.3: {
    linkId: '2.3',
    text: 'Das ist eine Frage mit hidden-extension',
    type: 'string',
    extension: [
      {
        url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-hidden',
        valueBoolean: true,
      },
    ],
    done: true,
    answer: null,
    required: false,
  },
  2.4: {
    linkId: '2.4',
    text: 'Diese Frage besteht aus zwei Teilen. Der zweiter Teil wurde auf Hidden gesetzt und wird nicht angezeigt.',
    type: 'group',
    required: true,
    item: [
      {
        linkId: '2.4.1',
        text: 'Abfrage Datum',
        type: 'date',
        required: true,
      },
      {
        linkId: '2.4.2',
        text: 'Diese Frage wird nicht angezeigt',
        type: 'string',
        extension: [
          {
            url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-hidden',
            valueBoolean: true,
          },
        ],
      },
    ],
    done: true,
  },
  '2.4.1': {
    linkId: '2.4.1',
    text: 'Abfrage Datum',
    type: 'date',
    required: true,
    done: true,
    answer: [
      {
        valueDate: '2022-03-14',
      },
    ],
  },
  '2.4.2': {
    linkId: '2.4.2',
    text: 'Diese Frage wird nicht angezeigt',
    type: 'string',
    extension: [
      {
        url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-hidden',
        valueBoolean: true,
      },
    ],
    done: true,
    answer: null,
    required: false,
  },
  3.1: {
    linkId: '3.1',
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
    done: true,
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
  3.2: {
    linkId: '3.2',
    text: 'Das ist eine Gruppe aus Booleans (kein Choice Element)',
    type: 'group',
    required: true,
    item: [
      {
        linkId: '3.2.1',
        text: 'Option A',
        type: 'boolean',
        required: true,
      },
      {
        linkId: '3.2.2',
        text: 'Option B',
        type: 'boolean',
        required: true,
      },
      {
        linkId: '3.2.3',
        text: 'Option C',
        type: 'boolean',
        required: true,
      },
    ],
    done: true,
  },
  '3.2.1': {
    linkId: '3.2.1',
    text: 'Option A',
    type: 'boolean',
    required: true,
    done: true,
    answer: [
      {
        valueBoolean: true,
      },
    ],
  },
  '3.2.2': {
    linkId: '3.2.2',
    text: 'Option B',
    type: 'boolean',
    required: true,
    done: true,
    answer: [
      {
        valueBoolean: false,
      },
    ],
  },
  '3.2.3': {
    linkId: '3.2.3',
    text: 'Option C',
    type: 'boolean',
    required: true,
    done: true,
    answer: [
      {
        valueBoolean: true,
      },
    ],
  },
  3.3: {
    linkId: '3.3',
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
    done: true,
    answer: [
      {
        valueString: 'Option E',
      },
    ],
  },
  3.4: {
    linkId: '3.4',
    text: 'Das ist eine Single-Choice-Abfrage mit Coding',
    type: 'choice',
    required: true,
    answerOption: [
      {
        valueCoding: {
          system: 'http://num-compass.science',
          code: 'A',
          display: 'Alpha',
        },
      },
      {
        valueCoding: {
          system: 'http://num-compass.science',
          code: 'B',
          display: 'Beta',
        },
      },
      {
        valueCoding: {
          system: 'https://num-compass.science/',
          code: 'C',
          display: 'Gamma',
        },
      },
    ],
    done: true,
    answer: [
      {
        valueCoding: {
          system: 'http://num-compass.science',
          code: 'A',
          display: 'Alpha',
        },
      },
    ],
  },
  4.1: {
    linkId: '4.1',
    text: 'Bedingte Abfrage mit answerDecimal',
    type: 'group',
    required: true,
    item: [
      {
        linkId: '4.1.1',
        text: 'Abfrage Dezimalzahl (erwartet = 1.5)',
        type: 'decimal',
        required: true,
      },
      {
        linkId: '4.1.2',
        text: 'Diese Frage wird nur bei erwarteter Eingabe angezeigt',
        type: 'string',
        required: true,
        enableWhen: [
          {
            question: '4.1.1',
            operator: '=',
            answerDecimal: 1.5,
          },
        ],
      },
    ],
    done: true,
  },
  '4.1.1': {
    linkId: '4.1.1',
    text: 'Abfrage Dezimalzahl (erwartet = 1.5)',
    type: 'decimal',
    required: true,
    done: true,
    answer: [
      {
        valueDecimal: 1.5,
      },
    ],
  },
  '4.1.2': {
    linkId: '4.1.2',
    text: 'Diese Frage wird nur bei erwarteter Eingabe angezeigt',
    type: 'string',
    required: true,
    enableWhen: [
      {
        question: '4.1.1',
        operator: '=',
        answerDecimal: 1.5,
      },
    ],
    done: true,
    answer: [
      {
        valueString: '1',
      },
    ],
  },
  4.2: {
    linkId: '4.2',
    text: 'Bedingte Abfrage mit answerInteger',
    type: 'integer',
    required: true,
    item: [
      {
        linkId: '4.2.1',
        text: 'Diese Frage wird nur bei erwarteter Eingabe angezeigt',
        type: 'string',
        required: true,
        enableWhen: [
          {
            question: '4.2',
            operator: '=',
            answerInteger: 1,
          },
        ],
      },
    ],
    done: true,
    answer: [
      {
        valueInteger: 1,
      },
    ],
  },
  '4.2.1': {
    linkId: '4.2.1',
    text: 'Diese Frage wird nur bei erwarteter Eingabe angezeigt',
    type: 'string',
    required: true,
    enableWhen: [
      {
        question: '4.2',
        operator: '=',
        answerInteger: 1,
      },
    ],
    done: true,
    answer: [
      {
        valueString: '123',
      },
    ],
  },
  4.3: {
    linkId: '4.3',
    text: 'Bedingte Abfrage mit answerDate',
    type: 'group',
    required: true,
    item: [
      {
        linkId: '4.3.1',
        text: 'Abfrage Datum (erwartet = 01.01.2021)',
        type: 'date',
        required: true,
      },
      {
        linkId: '4.3.2',
        text: 'Diese Frage wird nur bei erwarteter Eingabe angezeigt',
        type: 'string',
        required: true,
        enableWhen: [
          {
            question: '4.3.1',
            operator: '=',
            answerDate: '2021-01-01',
          },
        ],
      },
    ],
    done: true,
  },
  '4.3.1': {
    linkId: '4.3.1',
    text: 'Abfrage Datum (erwartet = 01.01.2021)',
    type: 'date',
    required: true,
    done: true,
    answer: [
      {
        valueDate: '2021-01-01',
      },
    ],
  },
  '4.3.2': {
    linkId: '4.3.2',
    text: 'Diese Frage wird nur bei erwarteter Eingabe angezeigt',
    type: 'string',
    required: true,
    enableWhen: [
      {
        question: '4.3.1',
        operator: '=',
        answerDate: '2021-01-01',
      },
    ],
    done: true,
    answer: [
      {
        valueString: 'abc',
      },
    ],
  },
  4.4: {
    linkId: '4.4',
    text: 'Diese Frage wird nur angezeigt, wenn 3.3 mit Option A beantwortet wurde',
    type: 'string',
    required: true,
    enableWhen: [
      {
        question: '3.3',
        operator: '=',
        answerString: 'Option A',
      },
    ],
    done: false,
    answer: null,
  },
  4.5: {
    linkId: '4.5',
    text: 'Diese Frage wird nur angezeigt, wenn 3.2.1 oder 3.3 mit Option A beantwortet wurde',
    type: 'string',
    required: true,
    enableWhen: [
      {
        question: '3.2.1',
        operator: '=',
        answerBoolean: true,
      },
      {
        question: '3.3',
        operator: '=',
        answerString: 'Option A',
      },
    ],
    enableBehavior: 'any',
    done: true,
    answer: [
      {
        valueString: 'empty',
      },
    ],
  },
  4.6: {
    linkId: '4.6',
    text: 'Diese Frage wird nur angezeigt, wenn 3.2.1 und 3.3 mit Option A beantwortet wurde',
    type: 'string',
    required: true,
    enableWhen: [
      {
        question: '3.2.1',
        operator: '=',
        answerBoolean: true,
      },
      {
        question: '3.3',
        operator: '=',
        answerString: 'Option A',
      },
    ],
    enableBehavior: 'all',
    done: false,
    answer: null,
  },
  5.1: {
    linkId: '5.1',
    text: 'Untergruppe 1',
    type: 'group',
    required: true,
    item: [
      {
        linkId: '5.1.1',
        text: 'Untergruppe 2',
        type: 'group',
        required: true,
        item: [
          {
            linkId: '5.1.1.1',
            text: 'Frage der Untergruppe 2',
            type: 'string',
            required: true,
          },
          {
            linkId: '5.1.1.2',
            text: 'Untergruppe 3',
            type: 'group',
            required: true,
            item: [
              {
                linkId: '5.1.1.2.1',
                text: 'Frage 1 der Untergruppe 3',
                type: 'string',
                required: true,
              },
              {
                linkId: '5.1.1.2.2',
                text: 'Frage 2 der Untergruppe 3',
                type: 'string',
                required: true,
              },
            ],
          },
        ],
      },
      {
        linkId: '5.1.2',
        text: 'Frage der Untergruppe 1',
        type: 'boolean',
        required: true,
      },
    ],
    done: true,
  },
  '5.1.1': {
    linkId: '5.1.1',
    text: 'Untergruppe 2',
    type: 'group',
    required: true,
    item: [
      {
        linkId: '5.1.1.1',
        text: 'Frage der Untergruppe 2',
        type: 'string',
        required: true,
      },
      {
        linkId: '5.1.1.2',
        text: 'Untergruppe 3',
        type: 'group',
        required: true,
        item: [
          {
            linkId: '5.1.1.2.1',
            text: 'Frage 1 der Untergruppe 3',
            type: 'string',
            required: true,
          },
          {
            linkId: '5.1.1.2.2',
            text: 'Frage 2 der Untergruppe 3',
            type: 'string',
            required: true,
          },
        ],
      },
    ],
    done: true,
  },
  '5.1.1.1': {
    linkId: '5.1.1.1',
    text: 'Frage der Untergruppe 2',
    type: 'string',
    required: true,
    done: true,
    answer: [
      {
        valueString: 'abc',
      },
    ],
  },
  '5.1.1.2': {
    linkId: '5.1.1.2',
    text: 'Untergruppe 3',
    type: 'group',
    required: true,
    item: [
      {
        linkId: '5.1.1.2.1',
        text: 'Frage 1 der Untergruppe 3',
        type: 'string',
        required: true,
      },
      {
        linkId: '5.1.1.2.2',
        text: 'Frage 2 der Untergruppe 3',
        type: 'string',
        required: true,
      },
    ],
    done: true,
  },
  '5.1.1.2.1': {
    linkId: '5.1.1.2.1',
    text: 'Frage 1 der Untergruppe 3',
    type: 'string',
    required: true,
    done: true,
    answer: [
      {
        valueString: 'abc',
      },
    ],
  },
  '5.1.1.2.2': {
    linkId: '5.1.1.2.2',
    text: 'Frage 2 der Untergruppe 3',
    type: 'string',
    required: true,
    done: true,
    answer: [
      {
        valueString: 'abc',
      },
    ],
  },
  '5.1.2': {
    linkId: '5.1.2',
    text: 'Frage der Untergruppe 1',
    type: 'boolean',
    required: true,
    done: true,
    answer: [
      {
        valueBoolean: false,
      },
    ],
  },
};
