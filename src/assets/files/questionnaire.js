export default {
    "resourceType": "Questionnaire",
    "url": "http://compass.testing",
    "identifier": [{
        "use": "official",
        "system": "urn:UMOID:",
        "value": "COMPASS DEBUGGING QUESTIONNAIRE"
    }],
    "version": "0.1",
    "title": "COMPASS DEBUGGING QUESTIONNAIRE",
    "purpose": "Used for local testing- and debugging purposes",
    "item": [{
            "linkId": "1",
            "text": "Group 1",
            "type": "group",
            "required": true,
            "item": [{
                    "linkId": "1.1",
                    "text": "Question 1",
                    "type": "",
                    "required": true
            }]
        }
    ]
}
