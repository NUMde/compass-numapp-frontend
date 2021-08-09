export default {
    "resourceType": "Questionnaire",
    "item": [
      {
          "linkId": "1",
          "prefix": "3d431ae3-ade5-448f-bb7a-dc864bdf8608",
          "text": "Symptome",
          "type": "group",
          "required": true,
          "item": [
              {
                  "linkId": "1.1",
                  "prefix": "0ac6ad58-4a54-4459-8a35-83562ca6e68e",
                  "text": "Haben sie akut gravierende Symptome, die einer sofortigen Behandlung bedürfen?",
                  "type": "choice",
                  "required": true,
                  "answerOption": [
                      {
                          "valueString": "Nein"
                      },
                      {
                          "valueString": "Ja"
                      }
                  ],
                  "item": [
                      {
                          "linkId": "1.1.1",
                          "prefix": "442144fd-b3f2-4621-8ccc-6fec4e37aff8",
                          "text": "!!! Bitte suchen Sie umgehend eine Notaufnahme auf oder kontaktieren Sie die 116117 !!!",
                          "type": "display",
                          "enableWhen": [{
                              "question": "1.1",
                              "operator": "=",
                              "answerString": "Ja"
                          }]
                      }
                  ]
              }
          ]
      }
  ]
  }