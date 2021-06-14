export default {
    "resourceType": "Questionnaire",
    "title": "HHack-Fragebogenbeispiel",
    "status": "draft",
    "item": [{
        "linkId": "0",
        "text": "Personalien",
        "type": "group",
        "required": true,
        "item": [{
                "linkId": "0.1",
                "text": "Wie können wir Sie kontaktieren?",
                "type": "group",
                "required": true,
                "item": [{
                    "linkId": "0.1.1",
                    "text": "Email:",
                    "type": "string",
                    "required": true,
                    "extension": [
                        {
                            "url": "http://hl7.org/fhir/StructureDefinition/regex",
                            "valueString": "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
                        }
                    ]
                }, {
                    "linkId": "0.1.2",
                    "text": "Telefon:",
                    "type": "integer",
                    "required": false
                }]
            },
            {
                "linkId": "0.2",
                "text": "Wann sind Sie geboren?",
                "type": "date",
                "required": true
            }
        ]
    }, {
        "linkId": "1",
        "text": "Hackathonteilnahme",
        "type": "group",
        "required": true,
        "item": [{
                "linkId": "1.1",
                "text": "An welchem Hackathon haben Sie bereits teilgenommen?",
                "type": "open-choice",
                "required": true,
                "answerOption": [{
                        "valueString": "01# HHack Mainz 2019"
                    },
                    {
                        "valueString": "02# HHack Berlin 2019"
                    },
                    {
                        "valueString": "03# HHack Kiel 2019"
                    },
                    {
                        "valueString": "04# HHack Mainz 2020"
                    },
                    {
                        "valueString": "05# HHack Kiel 2020"
                    },
                    {
                        "valueString": "06# HHack Greifswald 2021"
                    }
                ]
            },
            {
                "linkId": "1.2",
                "text": "Nehemen Sie am HHack Mainz 2021 teil?",
                "type": "choice",
                "required": true,
                "answerOption": [{
                        "valueString": "01# Ja"
                    },
                    {
                        "valueString": "02# Nein"
                    }
                ],
                "item": [{
                    "linkId": "1.2.1",
                    "text": "Was erwarten Sie sich vom Event?",
                    "type": "string",
                    "required": true,
                    "enableWhen": [{
                        "question": "1.2",
                        "operator": "=",
                        "answerString": "01# Ja"
                    }]
                }]
            },
            {
                "linkId": "1.3",
                "text": "Als wer nehmen Sie am Hackathon teil?",
                "type": "choice",
                "required": true,
                "answerOption": [{
                        "valueString": "01# Hacker"
                    },
                    {
                        "valueString": "02# Coach"
                    },
                    {
                        "valueString": "03# Jury Mitglied"
                    },
                    {
                        "valueString": "04# Besucher"
                    }
                ],
                "enableWhen": [{
                    "question": "1.2",
                    "operator": "=",
                    "answerString": "01# Ja"
                }]
            }
        ]
    }]
}