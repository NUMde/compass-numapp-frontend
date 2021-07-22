export default {
    "resourceType": "Questionnaire",
    "url": "http://hl7.org/fhir/Questionnaire/Fragebogen_Healthack_13_Beispiel",
    "identifier": [{
        "use": "official",
        "system": "urn:UMOID:",
        "value": "Fragebogen Healthhack Beispiel"
    }],
    "version": "1.2",
    "title": "Fragebogen Healthhack Beispiel",
    "status": "draft",
    "date": "2021-06-28",
    "item": [
        {
            "linkId": "1",
            "text": "01. Personalien",
            "type": "group",
            "required": true,
            "item": [
                {
                    "linkId": "1.1",
                    "text": "Bitte geben Sie ihren Vornamen ein.",
                    "type": "string",
                    "required": true
                },
                {
                    "linkId": "1.2",
                    "text": "Bitte geben Sie Ihren Nachnamen an.",
                    "type": "string",
                    "required": true
                },
                {
                    "linkId": "1.3",
                    "text": "Bitte geben Sie Ihren Geburtsdatum an.",
                    "type": "date",
                    "required": true
                },
                {
                    "linkId": "1.4",
                    "text": "Bitte geben Sie Ihren Adresse an.",
                    "type": "string",
                    "required": true
                },
                {
                    "linkId": "1.5",
                    "text": "Bitte geben Sie ihre Telefonnummer an.",
                    "type": "string",
                    "required": true,
                    "extension": [
                        {
                            "url": "http://hl7.org/fhir/StructureDefinition/regex",
                            "valueString": "^\\+?(?:[0-9]-?){6,14}[0-9]$"
                        }
                    ]
                },
                {
                    "linkId": "1.6",
                    "text": "Bitte geben Sie ihre E-Mail-Adresse ein.",
                    "type": "string",
                    "required": true,
                    "extension": [
                        {
                            "url": "http://hl7.org/fhir/StructureDefinition/regex",
                            "valueString": "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
                        }
                    ]
                },
                {
                    "linkId": "1.7",
                    "text": "Bitte geben Sie ihre Krankenkasse an.",
                    "type": "string",
                    "required": true
                }
            ]
        },
        {
            "linkId": "2",
            "text": "02. Urtikaria Anamnese",
            "type": "group",
            "required": true,
            "item": [
                {
                    "linkId": "2.1",
                    "text": "Haben sie akut gravierende Symptome die einer Behandlung bedürfen?",
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
                            "linkId": "2.1.1",
                            "text": "!!! Bitte suchen Sie umgehend eine Notaufnahme auf oder kontaktieren Sie die 116117 !!!",
                            "type": "display",
                            "enableWhen": [{
                                "question": "2.1",
                                "operator": "=",
                                "answerString": "Ja"
                            }]
                        }
                    ]
                },
                {
                    "linkId": "2.2",
                    "text": "Leiden Sie unter immer wieder kehrenden Quaddeln, Juckreiz und/oder Schwellungen?",
                    "type": "choice",
                    "answerOption": [
                        {
                            "valueString": "Nein"
                        },
                        {
                            "valueString": "Ja"
                        }
                    ],
                    "required": true,
                    "item": [
                        {
                            "linkId": "2.2.1",
                            "text": "Unter welchen Symptomen leiden Sie?",
                            "type": "open-choice",
                            "required": true,
                            "enableWhen": [{
                                "question": "2.2",
                                "operator": "=",
                                "answerString": "Ja"
                            }],
                            "answerOption": [
                                {
                                    "valueString": "Quaddeln (wie Brennnesseln)"
                                },
                                {
                                    "valueString": "Juckreiz"
                                },
                                {
                                    "valueString": "Schwellungen im Gesichtsbereich und oder Mund"
                                },
                                {
                                    "valueString": "Atemnot"
                                },
                                {
                                    "valueString": "Engegefühl im Hals / Kloßgefühl im Hals"
                                },
                                {
                                    "valueString": "Schwindel / Kreislaufprobleme im Zusammenhang mit den Hautveränderungen"
                                },
                                {
                                    "valueString": "Sonstige:"
                                }
                            ],
                        },
                        {
                            "linkId": "2.2.2",
                            "type": "string",
                            "required": true,
                            "enableWhen": [{
                                "question": "2.2.1",
                                "operator": "=",
                                "answerString": "Sonstige:"
                            }]
                        }
                    ]
                },
                {
                    "linkId": "2.3",
                    "text": "Wann haben Sie das erste Mal in Ihrem Leben solche Symptome gehabt?",
                    "type": "choice",
                    "required": true,
                    "answerOption": [
                        {
                            "valueString": "weniger als 6 Wochen"
                        },
                        {
                            "valueString": "halbes Jahr"
                        },
                        {
                            "valueString": "ganzes Jahr"
                        },
                        {
                            "valueString": "länger als 5 Jahre"
                        }
                    ],
                    "item": [
                        {
                            "linkId": "2.3.1",
                            "text": "!!! Bitte wenden Sie sich direkt an Ihren Hausarzt, Dermatologen oder an unsere Poliklinik (06131172903, Werktags von 08.00 Uhr bis 12.00 Uhr) !!!",
                            "type": "display",
                            "enableWhen": [{
                                "question": "2.3",
                                "operator": "=",
                                "answerString": "weniger als 6 Wochen"
                            }]
                        }
                    ]
                },
                {
                    "linkId": "2.4",
                    "text": "Wenn Sie Symptome haben, wie häufig sind diese?",
                    "type": "choice",
                    "required": true,
                    "answerOption": [
                        {
                            "valueString": "Täglich"
                        },
                        {
                            "valueString": "Wöchentlich"
                        },
                        {
                            "valueString": "monatlich"
                        },
                        {
                            "valueString": "mehrmals im Jahr"
                        }
                    ]
                },
                {
                    "linkId": "2.5",
                    "text": "Wenn Sie Schwellungen haben, wie häufig treten diese auf?",
                    "type": "choice",
                    "required": true,
                    "answerOption": [
                        {
                            "valueString": "Täglich "
                        },
                        {
                            "valueString": "Wöchentlich"
                        },
                        {
                            "valueString": "monatlich"
                        },
                        {
                            "valueString": "mehrmals im Jahr"
                        },
                        {
                            "valueString": "Bei mir treten keine Schwellungen auf"
                        }
                    ]
                },
                {
                    "linkId": "2.6",
                    "text": "Gibt es Zeiten, in denen Sie keine Symptome haben/hatten?",
                    "type": "choice",
                    "required": true,
                    "answerOption": [
                        {
                            "valueString": "ohne Unterbrechungen"
                        },
                        {
                            "valueString": "mehrmals täglich Unterbrechungen"
                        },
                        {
                            "valueString": "mehrmals wöchentliche Unterbrechungen"
                        },
                        {
                            "valueString": "mehrmals monatlich Unterbrechungen"
                        }
                    ]
                },
                {
                    "linkId": "2.7",
                    "text": "Wann traten die Symptome zuletzt auf?",
                    "type": "date",
                    "required": true
                },
                {
                    "linkId": "2.8",
                    "text": "Welche Symptome lagen zu diesem Zeitpunkt vor?",
                    "type": "open-choice",
                    "required": true,
                    "answerOption": [
                        {
                            "valueString": "Magen-Darm-Beschwerden"
                        },
                        {
                            "valueString": "Gelenkbeschwerden"
                        },
                        {
                            "valueString": "Fieber"
                        },
                        {
                            "valueString": "Allgemeinzustandsminderung (=Verschlechterung des Allgemeinzustandes)"
                        },
                        {
                            "valueString": "Luftnot/Kloßgefühl im Hals"
                        },
                        {
                            "valueString": "Kreislaufprobleme/Schwarz vor Augen"
                        },
                        {
                            "valueString": "Sonstige:"
                        }
                    ],
                    "item": [
                        {
                            "linkId": "2.8.1",
                            "type": "string",
                            "required": true,
                            "enableWhen": [{
                                "question": "2.8",
                                "operator": "=",
                                "answerString": "Sonstige:"
                            }]
                        }
                    ]
                },
                {
                    "linkId": "2.9",
                    "text": "Da Sie angaben, in der letzten Woche täglich Symptome gehabt zu haben, bitte geben Sie uns einen Überblick wie ausgeprägt die Symptome im Durchschnitt waren.",
                    "type": "display",
                    "enableWhen": [{
                        "question": "2.4",
                        "operator": "=",
                        "answerString": "Täglich"
                    }],
                    "item": [
                        {
                            "linkId": "2.9.1",
                            "text": "Quaddeln",
                            "type": "choice",
                            "required": true,
                            "answerOption": [
                                {
                                    "valueString": "<20"
                                },
                                {
                                    "valueString": "20-50"
                                },
                                {
                                    "valueString": ">50"
                                }
                            ],
                            "enableBehavior": "all",
                            "enableWhen": [
                                {
                                    "question": "2.4",
                                    "operator": "=",
                                    "answerString": "Täglich"
                                },
                                {
                                    "question": "2.2.1",
                                    "operator": "=",
                                    "answerString": "Quaddeln (wie Brennnesseln)"
                                }
                            ]
                        },
                        {
                            "linkId": "2.9.2",
                            "text": "Wenn eine einzelne Hautveränderung (oder Lippen- Augen- Zungenschwellung oder Magenkrämpfe)  betrachtet wird, wie lange bleibt eine bestehen?",
                            "type": "choice",
                            "required": true,
                            "answerOption": [
                                {
                                    "valueString": "weniger als 48h"
                                },
                                {
                                    "valueString": "mehr als 48h"
                                }
                            ],
                            "enableWhen": [{
                                "question": "2.4",
                                "operator": "=",
                                "answerString": "Täglich"
                            }]
                        },
                        {
                            "linkId": "2.9.3",
                            "text": "Konnten die Symptome schnell (wenige Stunden) mit Cortison behoben werden?",
                            "type": "choice",
                            "required": true,
                            "answerOption": [
                                {
                                    "valueString": "Ja"
                                },
                                {
                                    "valueString": "Nein"
                                }
                            ],
                            "enableWhen": [{
                                "question": "2.4",
                                "operator": "=",
                                "answerString": "Täglich"
                            }]
                        },
                        {
                            "linkId": "2.9.4",
                            "text": "Juckreiz ",
                            "type": "choice",
                            "required": true,
                            "answerOption": [
                                {
                                    "valueString": "leicht"
                                },
                                {
                                    "valueString": "mittel"
                                },
                                {
                                    "valueString": "stark"
                                }
                            ],
                            "enableBehavior": "all",
                            "enableWhen": [
                                {
                                    "question": "2.4",
                                    "operator": "=",
                                    "answerString": "Täglich"
                                },
                                {
                                    "question": "2.2.1",
                                    "operator": "=",
                                    "answerString": "Juckreiz"
                                }
                            ]
                        }
                    ]
                },
                {
                    "linkId": "2.10",
                    "text": "Treten Ihre Quaddeln spontan/plötzlich auf, ohne dass Sie einen Grund erkennen können?",
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
                    "enableWhen": [{
                        "question": "2.2.1",
                        "operator": "=",
                        "answerString": "Quaddeln (wie Brennnesseln)"
                    }]
                },
                {
                    "linkId": "2.11",
                    "text": "Können Sie einen Grund benennen, warum bei Ihnen Quaddeln/Juckreiz auftreten? ",
                    "type": "choice",
                    "required": true,
                    "answerOption": [
                        {
                            "valueString": "Nein, ich kann den Grund nicht benennen"
                        },
                        {
                            "valueString": "Ja"
                        }
                    ],
                    "enableBehavior": "any",
                    "enableWhen": [
                        {
                            "question": "2.2.1",
                            "operator": "=",
                            "answerString": "Quaddeln (wie Brennnesseln)"
                        },
                        {
                            "question": "2.2.1",
                            "operator": "=",
                            "answerString": "Juckreiz"
                        }
                    ],
                    "item": [
                        {
                            "linkId": "2.11.1",
                            "text": "Was denken Sie, ist der Grund für das Auftreten von Quaddeln/Juckreiz/Schwellungen?",
                            "type": "open-choice",
                            "required": true,
                            "enableBehavior": "all",
                            "enableWhen": [
                                {
                                    "question": "2.11",
                                    "operator": "=",
                                    "answerString": "Ja"
                                }
                            ],
                            "answerOption": [
                                {
                                    "valueString": "Gelenkschmerzen"
                                },
                                {
                                    "valueString": "Mechanischer Druck"
                                },
                                {
                                    "valueString": "Emotionale Belastung (Stress)"
                                },
                                {
                                    "valueString": "Körperliche Belastung (Sauna, Sport)"
                                },
                                {
                                    "valueString": "Kratzen"
                                },
                                {
                                    "valueString": "Wärme"
                                },
                                {
                                    "valueString": "Kälte"
                                },
                                {
                                    "valueString": "Infekte"
                                },
                                {
                                    "valueString": "Medikamenteneinnahme"
                                },
                                {
                                    "valueString": "Nahrungsmittel"
                                },
                                {
                                    "valueString": "Sonstige:"
                                }
                            ],
                            "item": [
                                {
                                    "linkId": "2.11.1.1",
                                    "text": "Bitte erläutern Sie",
                                    "type": "string",
                                    "required": true,
                                    "enableWhen": [{
                                        "question": "2.11.1",
                                        "operator": "=",
                                        "answerString": "Sonstige:"
                                    }]
                                }
                            ]
                        },
                        {
                            "linkId": "2.11.2",
                            "text": "Bitte Kreuzen Sie an, ob sie folgenden Medikamente (schauen Sie nach dem Wirkstoff auf der medikamentenverpackun) einnehmen ? Endet der Wirkstoff auf …pril oder … sartan?",
                            "type": "choice",
                            "required": true,
                            "answerOption": [
                                {
                                    "valueString": "Ja"
                                },
                                {
                                    "valueString": "Nein"
                                }
                            ]
                        }    
                    ]
                },
                {
                    "linkId": "2.12",
                    "text": "Waren Sie schon bei einem Facharzt für Hauterkrankungen wegen Ihrer Nesselsucht?",
                    "type": "choice",
                    "required": true,
                    "answerOption": [
                        {
                            "valueString": "Nein"
                        },
                        {
                            "valueString": "Ja"
                        }
                    ]
                },
                {
                    "linkId": "2.13",
                    "text": "Wurden schon Untersuchungen durchgeführt um den Grund ihrer Nesselsucht zu finden?",
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
                            "linkId": "2.13.1",
                            "text": "Bitte bringen Sie alle relevanten Unterlagen mit! Welche Untersuchungen wurden bereits durchgeführt? ",
                            "type": "open-choice",
                            "required": true,
                            "enableWhen": [{
                                "question": "2.13",
                                "operator": "=",
                                "answerString": "Ja"
                            }],
                            "answerOption": [
                                {
                                    "valueString": "Untersuchung vom HNO"
                                },
                                {
                                    "valueString": "Untersuchungen vom Zahnarzt"
                                },
                                {
                                    "valueString": "Untersuchungen vom Gynäkologen"
                                },
                                {
                                    "valueString": "Untersuchungen vom Gastroenterologen"
                                },
                                {
                                    "valueString": "Untersuchungen der  Endokrinologie"
                                },
                                {
                                    "valueString": "Magen-Darm-Spiegelung"
                                },
                                {
                                    "valueString": "Schilddrüsendiagnostik"
                                },
                                {
                                    "valueString": "Hormonarzt"
                                },
                                {
                                    "valueString": "Sonstige:"
                                }
                            ],
                            "item": [
                                {
                                    "linkId": "2.13.1.1",
                                    "type": "string",
                                    "required": true,
                                    "enableWhen": [{
                                        "question": "2.13.1",
                                        "operator": "=",
                                        "answerString": "Sonstige:"
                                    }]
                                }
                            ]
                        },
                        {
                            "linkId": "2.13.2",
                            "text": "Geben Sie bitte Name sowie Adresse des Arztes an",
                            "type": "string",
                            "required": true,
                            "enableWhen": [{
                                "question": "2.13",
                                "operator": "=",
                                "answerString": "Ja"
                            }]
                        },
                        {
                            "linkId": "2.13.3",
                            "text": "Welches Ergebnis wurden bei den Untersuchungen bisher erzielt",
                            "type": "group",
                            "enableWhen": [{
                                "question": "2.13",
                                "operator": "=",
                                "answerString": "Ja"
                            }],
                            "item": [
                                {
                                    "linkId": "2.13.3.1",
                                    "text": "Folgende",
                                    "type": "string",
                                    "required": true,
                                    "enableBehavior": "all",
                                    "enableWhen": [
                                        {
                                            "question": "2.13",
                                            "operator": "=",
                                            "answerString": "Ja"
                                        },
                                        {
                                            "question": "2.13.3.2",
                                            "operator": "=",
                                            "answerBoolean": false
                                        }
                                    ]
                                },
                                {
                                    "linkId": "2.13.3.2",
                                    "text": "Keine",
                                    "type": "boolean",
                                    "enableWhen": [
                                        {
                                            "question": "2.13",
                                            "operator": "=",
                                            "answerString": "Ja"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "linkId": "2.14",
                    "text": "Nehmen Sie aktuell Medikamente gegen Ihre Nesselsucht ein?",
                    "type": "open-choice",
                    "required": true,
                    "answerOption": [
                        {
                            "valueString": "keine Medikamente"
                        },
                        {
                            "valueString": "Antiallergika "
                        },
                        {
                            "valueString": "Kortison"
                        },
                        {
                            "valueString": "Sonstige:"
                        }
                    ],
                    "item": [
                        {
                            "linkId": "2.14.1",
                            "text": "Welche sonst noch?",
                            "type": "string",
                            "required": true,
                            "enableWhen": [{
                                "question": "2.14",
                                "operator": "=",
                                "answerString": "Sonstige:"
                            }]
                        },
                        {
                            "linkId": "2.14.2",
                            "text": "Welche Antiallergika nehmen Sie ein?",
                            "type": "open-choice",
                            "required": true,
                            "enableWhen": [{
                                "question": "2.14",
                                "operator": "=",
                                "answerString": "Antiallergika"
                            }],
                            "answerOption": [
                                {
                                    "valueString": "Cetirizin"
                                },
                                {
                                    "valueString": "Lorano"
                                },
                                {
                                    "valueString": "Loratadin"
                                },
                                {
                                    "valueString": "Sonstige:"
                                }
                            ],
                            "item": [{
                                "linkId": "2.14.2.1",
                                "text": "Welche sonst noch?",
                                "type": "string",
                                "required": true,
                                "enableWhen": [{
                                    "question": "2.14.2",
                                    "operator": "=",
                                    "answerString": "Sonstige:"
                                }]
                            }]
                        },
                        {
                            "linkId": "2.14.3",
                            "text": "Welche Antiallergika nehmen Sie ein?",
                            "type": "open-choice",
                            "required": true,
                            "enableWhen": [{
                                "question": "2.14",
                                "operator": "=",
                                "answerString": "Antiallergika"
                            }],
                            "answerOption": [
                                {
                                    "valueString": "1x"
                                },
                                {
                                    "valueString": "2x"
                                },
                                {
                                    "valueString": "3x"
                                },
                                {
                                    "valueString": "4x"
                                },
                                {
                                    "valueString": "Häufiger als 4x"
                                }
                            ]
                        },
                        {
                            "linkId": "2.14.4",
                            "text": "Nehmen Sie Kortison über 50mg oder unter 50mg ein?",
                            "type": "choice",
                            "required": true,
                            "enableWhen": [{
                                "question": "2.14",
                                "operator": "=",
                                "answerString": "Kortison"
                            }],
                            "answerOption": [
                                {
                                    "valueString": "Kortison über 50mg"
                                },
                                {
                                    "valueString": "Kortison unter 50mg"
                                },
                            ],
                        },
                        {
                            "linkId": "2.14.5",
                            "text": "Wie oft nehmen Sie Kortison ein?",
                            "type": "choice",
                            "required": true,
                            "enableWhen": [{
                                "question": "2.14",
                                "operator": "=",
                                "answerString": "Kortison"
                            }],
                            "answerOption": [
                                {
                                    "valueString": "täglich"
                                },
                                {
                                    "valueString": "mehrmals pro Woche"
                                },
                                {
                                    "valueString": "bei Bedarf"
                                },
                            ],
                        },
                        {
                            "linkId": "2.14.6",
                            "text": "Wie oft nehmen Sie Kortison ein?",
                            "type": "choice",
                            "required": true,
                            "enableWhen": [{
                                "question": "2.14",
                                "operator": "=",
                                "answerString": "Kortison"
                            }],
                            "answerOption": [
                                {
                                    "valueString": "weniger als 6"
                                },
                                {
                                    "valueString": "halbes Jahr"
                                },
                                {
                                    "valueString": "ganzes Jahr"
                                },
                                {
                                    "valueString": "länger als 5 Jahre"
                                },
                            ],
                        }
                    ]
                    
                },
                {
                        "linkId": "2.15",
                        "text": "Haben die Medikamente, die Sie aktuell für Ihre Nesselsucht einnehmen, eine Linderung Ihrer Beschwerden erbracht? (z.B. weniger Juckreiz, weniger Quaddeln, weniger Schwellungen)?",
                        "type": "choice",
                        "required": true,
                        "enableBehavior": "any",
                        "enableWhen": [
                            {
                                "question": "2.14",
                                "operator": "=",
                                "answerString": "Antiallergika"
                            },
                            {
                                "question": "2.14",
                                "operator": "=",
                                "answerString": "Kortison"
                            },
                            {
                                "question": "2.14",
                                "operator": "=",
                                "answerString": "Sonstige:"
                            }
                        ],
                        "answerOption": [
                            {
                                "valueString": "Nein"
                            },
                            {
                                "valueString": "Ja"
                            }
                        ],
                },
                {
                    "linkId": "2.16",
                    "text": "Gibt es bei Ihnen andere Beschwerden die in letzter Zeit häufig aufgetreten sind?",
                    "type": "open-choice",
                    "required": true,
                    "answerOption": [
                        {
                            "valueString": "Kopfschmerzen"
                        },
                        {
                            "valueString": "Magen-Darm-Probleme (breiige Stühle, Sodbrennen"
                        },
                        {
                            "valueString": "keine weiteren Beschwerden"
                        },
                        {
                            "valueString": "Sonstige:"
                        }
                    ],
                    "item": [
                        {
                            "linkId": "2.16.1",
                            "text": "Was sonst noch?",
                            "type": "string",
                            "required": true,
                            "enableWhen": [{
                                "question": "2.16",
                                "operator": "=",
                                "answerString": "Sonstige:"
                            }]
                        }
                    ]
                },
                {
                    "linkId": "2.17",
                    "text": "Welche anderen Erkrankungen sind bei Ihnen bekannt?",
                    "type": "choice",
                    "required": true,
                    "answerOption": [
                        {
                            "valueString": "Keine"
                        },
                        {
                            "valueString": "Folgende:"
                        }
                    ],
                    "item": [
                        {
                            "linkId": "2.17.1",
                            "type": "string",
                            "required": true,
                            "enableWhen": [{
                                "question": "2.17",
                                "operator": "=",
                                "answerString": "Folgende:"
                            }]
                        }
                    ]
                },
                {
                    "linkId": "2.18",
                    "text": "Nehmen Sie für eventuell vorliegende sonstige Erkrankungen Medikamente ein?",
                    "type": "choice",
                    "required": true,
                    "answerOption": [
                        {
                            "valueString": "Keine"
                        },
                        {
                            "valueString": "Folgende:"
                        }
                    ],
                    "item": [
                        {
                            "linkId": "2.18.1",
                            "type": "string",
                            "required": true,
                            "enableWhen": [{
                                "question": "2.18",
                                "operator": "=",
                                "answerString": "Folgende:"
                            }]
                        }
                    ]
                },
                {
                    "linkId": "2.19",
                    "text": "Welche Schmerzmedikamente nehmen Sie bei Schmerzzuständen ein?",
                    "type": "choice",
                    "required": true,
                    "answerOption": [
                        {
                            "valueString": "Keine"
                        },
                        {
                            "valueString": "Folgende:"
                        }
                    ],
                    "item": [
                        {
                            "linkId": "2.19.1",
                            "type": "string",
                            "required": true,
                            "enableWhen": [{
                                "question": "2.19",
                                "operator": "=",
                                "answerString": "Folgende:"
                            }]
                        }
                    ]
                },
                {
                    "linkId": "2.20",
                    "text": "Wären Sie bereit an einer klinischen Studie mit neuen Medikamenten oder Therapieoptionen, bezüglich Ihrer Erkrankung teilzunehmen?",
                    "type": "choice",
                    "required": true,
                    "answerOption": [
                        {
                            "valueString": "Nein"
                        },
                        {
                            "valueString": "Ja"
                        }
                    ]
                },
                {
                    "linkId": "2.21",
                    "text": "Haben Sie sich schon einmal bei uns in der Hautklinik wegen Ihrer Erkrankung vorgestellt?(Poliklinik, Urtikaria-Spezialsprechstunde, Allergie-Spezialsprechstunde etc.)",
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
                            "linkId": "2.21.1",
                            "text": "Wann haben Sie bei uns in der Hautklinik wegen Ihrer Erkrankung vorgestellt?",
                            "type": "date",
                            "required": true,
                            "enableWhen": [{
                                "question": "2.21",
                                "operator": "=",
                                "answerString": "Ja"
                            }]
                        }
                    ]
                },
                {
                    "linkId": "2.22",
                    "text": "Was erwarten Sie von Ihrer Vorstellung in der Urtikaria-Sprechstunde?",
                    "type": "open-choice",
                    "required": true,
                    "answerOption": [
                        {
                            "valueString": "weitere Diagnostik"
                        },
                        {
                            "valueString": "neue Therapieoptionen"
                        },
                        {
                            "valueString": "Sonstige:"
                        }
                    ],
                    "item": [
                        {
                            "linkId": "2.22.1",
                            "type": "string",
                            "required": true,
                            "enableWhen": [{
                                "question": "2.22",
                                "operator": "=",
                                "answerString": "Sonstige:"
                            }]
                        }
                    ]
                },
                {
                    "linkId": "2.23",
                    "text": "Bitte bringen Sie eine Überweisung und alle relevanten Unterlagen zu Ihrem Termin bei uns in der Ambulanz mit!",
                    "type": "display",
                }
            ]
        }
    ]
}
