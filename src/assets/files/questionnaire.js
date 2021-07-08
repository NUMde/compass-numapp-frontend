export default {
    "resourceType": "Questionnaire",
    "url": "http://hl7.org/fhir/Questionnaire/Fragebogen_COMPASS_Beispiel",
    "identifier": [{
        "use": "official",
        "system": "urn:UMOID:",
        "value": "Fragebogen COMPASS Beispiel"
    }],
    "version": "1.2",
    "title": "Fragebogen COMPASS Beispiel",
    "status": "draft",
    "subjectType": [
        "Patient"
    ],
    "date": "2021-01-25",
    "publisher": "IBM",
    "purpose": "Abbildung der aktuell in der von IBM entwickelten App unterstützten FHIR Funktionalitäten",
    "item": [
        {
            "linkId": "1",
            "text": "Fragegruppe 1",
            "type": "group",
            "required": true,
            "item": [
                {
                    "linkId": "1.1",
                    "text": "Das ist eine Choice-Abfrage ohne Repeat",
                    "type": "choice",
                    "required": true,
                    "repeats": false,
                    "answerOption": [
                        {
                            "valueString": "Option A"
                        },
                        {
                            "valueString": "Option B"
                        },
                        {
                            "valueString": "Option C"
                        },
                        {
                            "valueString": "Option D"
                        },
                        {
                            "valueString": "Option E"
                        },
                        {
                            "valueString": "Option F"
                        },
                        {
                            "valueString": "Option G"
                        },
                        {
                            "valueString": "Option H"
                        },
                        {
                            "valueString": "Option I"
                        }
                    ],
                    "item": [
                        {
                            "linkId": "1.1.1",
                            "text": "test-abfrage",
                            "type": "string",
                            "enableWhen": [{
                                "question": "1.1",
                                "operator": "=",
                                "answerString": "Option A"
                            }]
                        }
                    ]
                },
                {
                    "linkId": "1.2",
                    "text": "Das ist eine Choice-Abfrage mit Repeat",
                    "type": "choice",
                    "required": true,
                    "repeats": true,
                    "answerOption": [
                        {
                            "valueString": "Option A"
                        },
                        {
                            "valueString": "Option B"
                        },
                        {
                            "valueString": "Option C"
                        },
                        {
                            "valueString": "Option D"
                        },
                        {
                            "valueString": "Option E"
                        },
                        {
                            "valueString": "Option F"
                        },
                        {
                            "valueString": "Option G"
                        },
                        {
                            "valueString": "Option H"
                        },
                        {
                            "valueString": "Option I"
                        }
                    ]
                },
                {
                    "linkId": "1.3",
                    "text": "Das ist eine Open-Choice-Abfrage",
                    "type": "open-choice",
                    "required": true,
                    "answerOption": [{
                        "valueString": "Option A"
                    },
                        {
                            "valueString": "Option B"
                        },
                        {
                            "valueString": "Option C"
                        }
                    ]
                }
            ]
        }
    ]
}
