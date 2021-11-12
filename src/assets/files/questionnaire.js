export default {
    "resourceType": "Questionnaire",
    "url": "http://hl7.org/fhir/Questionnaire/Fragebogen_COMPASS_Beispiel",
    "identifier": [{
        "use": "official",
        "system": "urn:EXAMPLEOID:",
        "value": "Generic COMPASS Questionnaire"
    }],
    "version": "1.0",
    "title": "Generischer COMPASS FHIR Questionnaire",
    "status": "draft",
    "subjectType": [
        "Patient"
    ],
    "date": "2021-01-25",
    "publisher": "IBM",
    "purpose": "Abbildung der aktuell durch COMPASS unterstützte FHIR Funktionalitäten",
    "item": [{
            "linkId": "1",
            "text": "Fragegruppe 1",
            "type": "group",
            "required": true,
            "item": [{
                    "linkId": "1.1",
                    "text": "Das ist eine Freitextabfrage",
                    "type": "string",
                    "required": true
                },
                
            ]
        }
    ]
}