export default {
    "resourceType": "Questionnaire",
    "item": [ {
      "extension": [ {
        "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
        "valueCoding": {
          "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
          "version": "1.0",
          "code": "anamnesis"
        }
      } ],
      "linkId": "1",
      "text": "anamnesis",
      "type": "group",
      "item": [ {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "anamnesis.cardiovascularDiseases"
          }
        } ],
        "linkId": "1.1",
        "text": "An welcher Herz-Kreislauf-Erkrankung leidet der/die Patient*in?",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.cardiovascularDiseases.cardiacArrhytmia"
            }
          } ],
          "linkId": "1.1.1",
          "text": "Herzrhythmusstörungen",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.cardiovascularDiseases.carotidArteryStenosis"
            }
          } ],
          "linkId": "1.1.2",
          "text": "Carotisstenose",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.cardiovascularDiseases.coronaryArteriosclerosis"
            }
          } ],
          "linkId": "1.1.3",
          "text": "Koronare Herzerkrankung (KHK)",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.cardiovascularDiseases.heartFailure"
            }
          } ],
          "linkId": "1.1.4",
          "text": "Herzinsuffizienz",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.cardiovascularDiseases.peripherialArterialOcclusiveDisease"
            }
          } ],
          "linkId": "1.1.5",
          "text": "pAVK",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.cardiovascularDiseases.stateAfterHeartAttack"
            }
          } ],
          "linkId": "1.1.6",
          "text": "Zustand nach Herzinfarkt",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.cardiovascularDiseases.stateAfterRevascularization"
            }
          } ],
          "linkId": "1.1.7",
          "text": "Zustand nach Revaskularisation",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "anamnesis.chronicKidneyDisease"
          }
        } ],
        "linkId": "1.2",
        "text": "An welcher chronischen Nierenerkrankung leidet der/die Patient*in?",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "714152005",
            "display": "Chronic kidney disease stage 5 on dialysis (disorder)"
          }
        }, {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "431855005",
            "display": "Chronic kidney disease stage 1 (disorder)"
          }
        }, {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "431856006",
            "display": "Chronic kidney disease stage 2 (disorder)"
          }
        }, {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "433144002",
            "display": "Chronic kidney disease stage 3 (disorder)"
          }
        }, {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "431857002",
            "display": "Chronic kidney disease stage 4 (disorder)"
          }
        }, {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "433146000",
            "display": "Chronic kidney disease stage 5 (disorder)"
          }
        }, {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "709044004",
            "display": "Chronic kidney disease (disorder)"
          }
        }, {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "709044004",
            "display": "Chronic kidney disease (disorder)"
          }
        }, {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "709044004",
            "display": "Chronic kidney disease (disorder)"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "anamnesis.chronicLiverDiseases"
          }
        } ],
        "linkId": "1.3",
        "text": "An welcher chronischen Lebererkrankung leidet der/die Patient*in?",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.chronicLiverDiseases.autoimmuneLiverDisease"
            }
          } ],
          "linkId": "1.3.1",
          "text": "Autoimmune Lebererkrankungen",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.chronicLiverDiseases.chronicViralHepatitis"
            }
          } ],
          "linkId": "1.3.2",
          "text": "Chronische infektiöse Hepatitis",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.chronicLiverDiseases.cirrhosisOfLiver"
            }
          } ],
          "linkId": "1.3.3",
          "text": "Leberzirrhose",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.chronicLiverDiseases.steatosisOfLiver"
            }
          } ],
          "linkId": "1.3.4",
          "text": "Fettleber",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "anamnesis.chronicLungDiseases"
          }
        } ],
        "linkId": "1.4",
        "text": "An welcher chronischen Lungenerkrankung leidet der/die Patient*in?",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.chronicLungDiseases.asthma"
            }
          } ],
          "linkId": "1.4.1",
          "text": "Asthma",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.chronicLungDiseases.copd"
            }
          } ],
          "linkId": "1.4.2",
          "text": "COPD",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.chronicLungDiseases.cysticFibrosis"
            }
          } ],
          "linkId": "1.4.3",
          "text": "Cystische Fibrose",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.chronicLungDiseases.fibrosis"
            }
          } ],
          "linkId": "1.4.4",
          "text": "Lungenfibrose",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.chronicLungDiseases.ohs"
            }
          } ],
          "linkId": "1.4.5",
          "text": "OHS",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.chronicLungDiseases.osas"
            }
          } ],
          "linkId": "1.4.6",
          "text": "OSAS",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.chronicLungDiseases.pulmonaryHypertension"
            }
          } ],
          "linkId": "1.4.7",
          "text": "Lungenhochdruck/pulmonale Hypertonie",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.chronicLungDiseases.sleepApnea"
            }
          } ],
          "linkId": "1.4.8",
          "text": "Schlafapnoe",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "anamnesis.chronicNeurologicalOrMentalDiseases"
          }
        } ],
        "linkId": "1.5",
        "text": "An welcher chronischen neurologischen Erkrankung leidet der/die Patient*in?",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.chronicNeurologicalOrMentalDiseases.anxietyDisorder"
            }
          } ],
          "linkId": "1.5.1",
          "text": "Angsterkrankung",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.chronicNeurologicalOrMentalDiseases.chronicNervousSystemDisorder"
            }
          } ],
          "linkId": "1.5.2",
          "text": "Chronische neurologische Erkrankung",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.chronicNeurologicalOrMentalDiseases.combinedDisorderOfMuscleAndPeripheralNerve"
            }
          } ],
          "linkId": "1.5.3",
          "text": "Neuromuskuläre Erkrankungen",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.chronicNeurologicalOrMentalDiseases.dementia"
            }
          } ],
          "linkId": "1.5.4",
          "text": "Demenz",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.chronicNeurologicalOrMentalDiseases.depressiveDisorder"
            }
          } ],
          "linkId": "1.5.5",
          "text": "Depression",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.chronicNeurologicalOrMentalDiseases.epilepsy"
            }
          } ],
          "linkId": "1.5.6",
          "text": "Epilepsie",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.chronicNeurologicalOrMentalDiseases.historyOfCerebrovascularAccidentWithResidualDeficit"
            }
          } ],
          "linkId": "1.5.7",
          "text": "Z.n. Apoplex mit Residuen",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.chronicNeurologicalOrMentalDiseases.historyOfCerebrovascularAccidentWithoutResidualDeficits"
            }
          } ],
          "linkId": "1.5.8",
          "text": "Z.n. Apoplex ohne Residuen",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.chronicNeurologicalOrMentalDiseases.mentalDisorder"
            }
          } ],
          "linkId": "1.5.9",
          "text": "Psychiatrische Erkrankung",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.chronicNeurologicalOrMentalDiseases.migraine"
            }
          } ],
          "linkId": "1.5.10",
          "text": "Migräne",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.chronicNeurologicalOrMentalDiseases.multipleSclerosis"
            }
          } ],
          "linkId": "1.5.11",
          "text": "Multiple Sklerose",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.chronicNeurologicalOrMentalDiseases.parkinsonDisorder"
            }
          } ],
          "linkId": "1.5.12",
          "text": "M. Parkinson",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.chronicNeurologicalOrMentalDiseases.psychoticDisorder"
            }
          } ],
          "linkId": "1.5.13",
          "text": "Psychose",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "anamnesis.diabetesMellitus"
          }
        } ],
        "linkId": "1.6",
        "text": "An welchem Typ Diabetes leidet der/die Patient*in?",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "46635009",
            "display": "Diabetes mellitus type 1 (disorder)"
          }
        }, {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "44054006",
            "display": "Diabetes mellitus type 2 (disorder)"
          }
        }, {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "237599002",
            "display": "Insulin treated type 2 diabetes mellitus (disorder)"
          }
        }, {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "8801005",
            "display": "Secondary diabetes mellitus (disorder)"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "anamnesis.hasCardiavascularDiseases"
          }
        } ],
        "linkId": "1.7",
        "text": "Leidet der/die Patient*in unter einer Herz-Kreislauf-Erkrankung?",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "anamnesis.hasChronicKidneyDiseases"
          }
        } ],
        "linkId": "1.8",
        "text": "Leidet der/die Patient*in an einer chronischen Nierenerkrankung?",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "anamnesis.hasChronicLiverDiseases"
          }
        } ],
        "linkId": "1.9",
        "text": "Leidet der/die Patient*in an einer chronischen Lebererkrankung?",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "anamnesis.hasChronicLungDiseases"
          }
        } ],
        "linkId": "1.10",
        "text": "Leidet der/die Patient*in unter einer chronischen Lungenerkrankung?",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "anamnesis.hasChronicNeurologicalOrMentalDiseases"
          }
        } ],
        "linkId": "1.11",
        "text": "Leidet der/die Patient*in unter mind. einer chronischen neurologischen Erkrankung?",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "anamnesis.hasDiabetesMellitus"
          }
        } ],
        "linkId": "1.12",
        "text": "Leidet der/die Patient*in an Diabetes?",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "anamnesis.hasGastrointestinalUclers"
          }
        } ],
        "linkId": "1.13",
        "definition": "https://www.netzwerk-universitaetsmedizin.de/fhir/StructureDefinition/gastrointestinal-ulcers",
        "text": "hasGastrointestinalUclers",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "anamnesis.hasHadOxygenOrRespiratoryTherapyBeforeCurrentIllness"
          }
        } ],
        "linkId": "1.14",
        "definition": "https://www.netzwerk-universitaetsmedizin.de/fhir/StructureDefinition/respiratory-therapies",
        "text": "hasHadOxygenOrRespiratoryTherapyBeforeCurrentIllness",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "anamnesis.hasHistoryOfBeingATissueOrOrganRecipient"
          }
        } ],
        "linkId": "1.15",
        "text": "Ist der/die Patient*in organtransplantiert?",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "anamnesis.hasHivInfection"
          }
        } ],
        "linkId": "1.16",
        "definition": "https://www.netzwerk-universitaetsmedizin.de/fhir/StructureDefinition/human-immunodeficiency-virus-infection",
        "text": "Ist der/die Patient*in HIV-infiziert?",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "anamnesis.hasImmunization"
          }
        } ],
        "linkId": "1.17",
        "text": "hasImmunization",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "anamnesis.hasRheumatologicalImmunologicalDiseases"
          }
        } ],
        "linkId": "1.18",
        "text": "Leidet der/die Patient*in unter mind. einer rheumatologischen/immunologischen Erkrankung?",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "anamnesis.hasTravelled"
          }
        } ],
        "linkId": "1.19",
        "text": "hasTravelled",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "anamnesis.historyOfBeingATissueOrOrganRecipient"
          }
        } ],
        "linkId": "1.20",
        "text": "Welche Transplantation wurde durchgeführt?",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.historyOfBeingATissueOrOrganRecipient.bloodVesselPart"
            }
          } ],
          "linkId": "1.20.1",
          "text": "Blutgefäß",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.historyOfBeingATissueOrOrganRecipient.boneTissueOrStructure"
            }
          } ],
          "linkId": "1.20.2",
          "text": "Knochengewebe",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.historyOfBeingATissueOrOrganRecipient.cartilageTissue"
            }
          } ],
          "linkId": "1.20.3",
          "text": "Knorpelgewebe",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.historyOfBeingATissueOrOrganRecipient.cerebralMeningitisStructure"
            }
          } ],
          "linkId": "1.20.4",
          "text": "Hirnhaut",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.historyOfBeingATissueOrOrganRecipient.earOssicleStructure"
            }
          } ],
          "linkId": "1.20.5",
          "text": "Gehörknochen",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.historyOfBeingATissueOrOrganRecipient.entireCornea"
            }
          } ],
          "linkId": "1.20.6",
          "text": "Hornhaut",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.historyOfBeingATissueOrOrganRecipient.entireHeart"
            }
          } ],
          "linkId": "1.20.7",
          "text": "Herz",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.historyOfBeingATissueOrOrganRecipient.entireHeartValve"
            }
          } ],
          "linkId": "1.20.8",
          "text": "Herzklappen",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.historyOfBeingATissueOrOrganRecipient.entireKidney"
            }
          } ],
          "linkId": "1.20.9",
          "text": "Niere",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.historyOfBeingATissueOrOrganRecipient.entireLargeIntestine"
            }
          } ],
          "linkId": "1.20.10",
          "text": "entireLargeIntestine",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.historyOfBeingATissueOrOrganRecipient.entireLiver"
            }
          } ],
          "linkId": "1.20.11",
          "text": "Leber",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.historyOfBeingATissueOrOrganRecipient.entireLung"
            }
          } ],
          "linkId": "1.20.12",
          "text": "Lunge",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.historyOfBeingATissueOrOrganRecipient.entirePancreas"
            }
          } ],
          "linkId": "1.20.13",
          "text": "Bauchspeicheldrüse",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.historyOfBeingATissueOrOrganRecipient.entireSmallIntestine"
            }
          } ],
          "linkId": "1.20.14",
          "text": "entireSmallIntestine",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.historyOfBeingATissueOrOrganRecipient.intestinalStructure"
            }
          } ],
          "linkId": "1.20.15",
          "text": "intestinalStructure",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.historyOfBeingATissueOrOrganRecipient.skinPart"
            }
          } ],
          "linkId": "1.20.16",
          "text": "Haut",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.historyOfBeingATissueOrOrganRecipient.tendonStructure"
            }
          } ],
          "linkId": "1.20.17",
          "text": "Sehne",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "anamnesis.historyOfTravel"
          }
        } ],
        "linkId": "1.21",
        "text": "historyOfTravel",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.historyOfTravel.countries"
            }
          } ],
          "linkId": "1.21.1",
          "text": "countries",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "AD",
              "display": "Andorra"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "AE",
              "display": "United Arab Emirates"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "AF",
              "display": "Afghanistan"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "AG",
              "display": "Antigua and Barbuda"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "AI",
              "display": "Anguilla"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "AL",
              "display": "Albania"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "AM",
              "display": "Armenia"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "AO",
              "display": "Angola"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "AQ",
              "display": "Antarctica"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "AR",
              "display": "Argentina"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "AS",
              "display": "American Samoa"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "AT",
              "display": "Austria"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "AU",
              "display": "Australia"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "AW",
              "display": "Aruba"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "AX",
              "display": "Åland Islands"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "AZ",
              "display": "Azerbaijan"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "BA",
              "display": "Bosnia and Herzegovina"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "BB",
              "display": "Barbados"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "BD",
              "display": "Bangladesh"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "BE",
              "display": "Belgium"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "BF",
              "display": "Burkina Faso"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "BG",
              "display": "Bulgaria"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "BH",
              "display": "Bahrain"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "BI",
              "display": "Burundi"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "BJ",
              "display": "Benin"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "BL",
              "display": "Saint Barthélemy"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "BM",
              "display": "Bermuda"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "BN",
              "display": "Brunei Darussalam"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "BO",
              "display": "Bolivia, Plurinational State of"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "BQ",
              "display": "Bonaire, Sint Eustatius and Saba"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "BR",
              "display": "Brazil"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "BS",
              "display": "Bahamas"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "BT",
              "display": "Bhutan"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "BV",
              "display": "Bouvet Island"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "BW",
              "display": "Botswana"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "BY",
              "display": "Belarus"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "BZ",
              "display": "Belize"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "CA",
              "display": "Canada"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "CC",
              "display": "Cocos (Keeling) Islands"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "CD",
              "display": "Congo, the Democratic Republic of the"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "CF",
              "display": "Central African Republic"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "CG",
              "display": "Congo"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "CH",
              "display": "Switzerland"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "CI",
              "display": "Côte d''Ivoire"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "CK",
              "display": "Cook Islands"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "CL",
              "display": "Chile"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "CM",
              "display": "Cameroon"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "CN",
              "display": "China"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "CO",
              "display": "Colombia"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "CR",
              "display": "Costa Rica"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "CU",
              "display": "Cuba"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "CV",
              "display": "Cabo Verde"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "CW",
              "display": "Curaçao"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "CX",
              "display": "Christmas Island"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "CY",
              "display": "Cyprus"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "CZ",
              "display": "Czechia"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "DE",
              "display": "Germany"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "DJ",
              "display": "Djibouti"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "DK",
              "display": "Denmark"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "DM",
              "display": "Dominica"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "DO",
              "display": "Dominican Republic"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "DZ",
              "display": "Algeria"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "EC",
              "display": "Ecuador"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "EE",
              "display": "Estonia"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "EG",
              "display": "Egypt"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "EH",
              "display": "Western Sahara"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "ER",
              "display": "Eritrea"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "ES",
              "display": "Spain"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "ET",
              "display": "Ethiopia"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "FI",
              "display": "Finland"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "FJ",
              "display": "Fiji"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "FK",
              "display": "Falkland Islands (Malvinas)"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "FM",
              "display": "Micronesia, Federated States of"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "FO",
              "display": "Faroe Islands"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "FR",
              "display": "France"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "GA",
              "display": "Gabon"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "GB",
              "display": "United Kingdom of Great Britain and Northern Ireland"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "GD",
              "display": "Grenada"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "GE",
              "display": "Georgia"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "GF",
              "display": "French Guiana"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "GG",
              "display": "Guernsey"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "GH",
              "display": "Ghana"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "GI",
              "display": "Gibraltar"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "GL",
              "display": "Greenland"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "GM",
              "display": "Gambia"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "GN",
              "display": "Guinea"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "GP",
              "display": "Guadeloupe"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "GQ",
              "display": "Equatorial Guinea"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "GR",
              "display": "Greece"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "GS",
              "display": "South Georgia and the South Sandwich Islands"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "GT",
              "display": "Guatemala"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "GU",
              "display": "Guam"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "GW",
              "display": "Guinea-Bissau"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "GY",
              "display": "Guyana"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "HK",
              "display": "Hong Kong"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "HM",
              "display": "Heard Island and McDonald Islands"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "HN",
              "display": "Honduras"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "HR",
              "display": "Croatia"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "HT",
              "display": "Haiti"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "HU",
              "display": "Hungary"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "ID",
              "display": "Indonesia"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "IE",
              "display": "Ireland"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "IL",
              "display": "Israel"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "IM",
              "display": "Isle of Man"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "IN",
              "display": "India"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "IO",
              "display": "British Indian Ocean Territory"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "IQ",
              "display": "Iraq"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "IR",
              "display": "Iran, Islamic Republic of"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "IS",
              "display": "Iceland"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "IT",
              "display": "Italy"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "JE",
              "display": "Jersey"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "JM",
              "display": "Jamaica"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "JO",
              "display": "Jordan"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "JP",
              "display": "Japan"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "KE",
              "display": "Kenya"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "KG",
              "display": "Kyrgyzstan"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "KH",
              "display": "Cambodia"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "KI",
              "display": "Kiribati"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "KM",
              "display": "Comoros"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "KN",
              "display": "Saint Kitts and Nevis"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "KP",
              "display": "Korea, Democratic People''s Republic of"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "KR",
              "display": "Korea, Republic of"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "KW",
              "display": "Kuwait"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "KY",
              "display": "Cayman Islands"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "KZ",
              "display": "Kazakhstan"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "LA",
              "display": "Lao People''s Democratic Republic"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "LB",
              "display": "Lebanon"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "LC",
              "display": "Saint Lucia"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "LI",
              "display": "Liechtenstein"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "LK",
              "display": "Sri Lanka"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "LR",
              "display": "Liberia"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "LS",
              "display": "Lesotho"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "LT",
              "display": "Lithuania"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "LU",
              "display": "Luxembourg"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "LV",
              "display": "Latvia"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "LY",
              "display": "Libya"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "MA",
              "display": "Morocco"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "MC",
              "display": "Monaco"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "MD",
              "display": "Moldova, Republic of"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "ME",
              "display": "Montenegro"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "MF",
              "display": "Saint Martin (French part)"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "MG",
              "display": "Madagascar"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "MH",
              "display": "Marshall Islands"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "MK",
              "display": "Macedonia, the former Yugoslav Republic of"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "ML",
              "display": "Mali"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "MM",
              "display": "Myanmar"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "MN",
              "display": "Mongolia"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "MO",
              "display": "Macao"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "MP",
              "display": "Northern Mariana Islands"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "MQ",
              "display": "Martinique"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "MR",
              "display": "Mauritania"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "MS",
              "display": "Montserrat"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "MT",
              "display": "Malta"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "MU",
              "display": "Mauritius"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "MV",
              "display": "Maldives"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "MW",
              "display": "Malawi"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "MX",
              "display": "Mexico"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "MY",
              "display": "Malaysia"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "MZ",
              "display": "Mozambique"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "NA",
              "display": "Namibia"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "NC",
              "display": "New Caledonia"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "NE",
              "display": "Niger"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "NF",
              "display": "Norfolk Island"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "NG",
              "display": "Nigeria"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "NI",
              "display": "Nicaragua"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "NL",
              "display": "Netherlands"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "NO",
              "display": "Norway"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "NP",
              "display": "Nepal"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "NR",
              "display": "Nauru"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "NU",
              "display": "Niue"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "NZ",
              "display": "New Zealand"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "OM",
              "display": "Oman"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "PA",
              "display": "Panama"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "PE",
              "display": "Peru"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "PF",
              "display": "French Polynesia"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "PG",
              "display": "Papua New Guinea"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "PH",
              "display": "Philippines"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "PK",
              "display": "Pakistan"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "PL",
              "display": "Poland"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "PM",
              "display": "Saint Pierre and Miquelon"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "PN",
              "display": "Pitcairn"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "PR",
              "display": "Puerto Rico"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "PS",
              "display": "Palestine, State of"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "PT",
              "display": "Portugal"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "PW",
              "display": "Palau"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "PY",
              "display": "Paraguay"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "QA",
              "display": "Qatar"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "RE",
              "display": "Réunion"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "RO",
              "display": "Romania"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "RS",
              "display": "Serbia"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "RU",
              "display": "Russian Federation"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "RW",
              "display": "Rwanda"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "SA",
              "display": "Saudi Arabia"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "SB",
              "display": "Solomon Islands"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "SC",
              "display": "Seychelles"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "SD",
              "display": "Sudan"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "SE",
              "display": "Sweden"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "SG",
              "display": "Singapore"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "SH",
              "display": "Saint Helena, Ascension and Tristan da Cunha"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "SI",
              "display": "Slovenia"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "SJ",
              "display": "Svalbard and Jan Mayen"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "SK",
              "display": "Slovakia"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "SL",
              "display": "Sierra Leone"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "SM",
              "display": "San Marino"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "SN",
              "display": "Senegal"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "SO",
              "display": "Somalia"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "SR",
              "display": "Suriname"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "SS",
              "display": "South Sudan"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "ST",
              "display": "Sao Tome and Principe"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "SV",
              "display": "El Salvador"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "SX",
              "display": "Sint Maarten (Dutch part)"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "SY",
              "display": "Syrian Arab Republic"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "SZ",
              "display": "Swaziland"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "TC",
              "display": "Turks and Caicos Islands"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "TD",
              "display": "Chad"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "TF",
              "display": "French Southern Territories"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "TG",
              "display": "Togo"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "TH",
              "display": "Thailand"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "TJ",
              "display": "Tajikistan"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "TK",
              "display": "Tokelau"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "TL",
              "display": "Timor-Leste"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "TM",
              "display": "Turkmenistan"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "TN",
              "display": "Tunisia"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "TO",
              "display": "Tonga"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "TR",
              "display": "Turkey"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "TT",
              "display": "Trinidad and Tobago"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "TV",
              "display": "Tuvalu"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "TW",
              "display": "Taiwan, Province of China"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "TZ",
              "display": "Tanzania, United Republic of"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "UA",
              "display": "Ukraine"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "UG",
              "display": "Uganda"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "UM",
              "display": "United States Minor Outlying Islands"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "US",
              "display": "United States of America"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "UY",
              "display": "Uruguay"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "UZ",
              "display": "Uzbekistan"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "VA",
              "display": "Holy See"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "VC",
              "display": "Saint Vincent and the Grenadines"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "VE",
              "display": "Venezuela, Bolivarian Republic of"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "VG",
              "display": "Virgin Islands, British"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "VI",
              "display": "Virgin Islands,"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "VN",
              "display": "Viet Nam"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "VU",
              "display": "Vanuatu"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "WF",
              "display": "Wallis and Futuna"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "WS",
              "display": "Samoa"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "YE",
              "display": "Yemen"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "YT",
              "display": "Mayotte"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "ZA",
              "display": "South Africa"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "ZM",
              "display": "Zambia"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166",
              "code": "ZW",
              "display": "Zimbabwe"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.historyOfTravel.federalStates"
            }
          } ],
          "linkId": "1.21.2",
          "text": "federalStates",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166-2:de",
              "code": "DE-BW",
              "display": "Baden-Württemberg"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166-2:de",
              "code": "DE-BY",
              "display": "Bayern"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166-2:de",
              "code": "DE-BE",
              "display": "Berlin"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166-2:de",
              "code": "DE-BB",
              "display": "Brandenburg"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166-2:de",
              "code": "DE-HB",
              "display": "Bremen"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166-2:de",
              "code": "DE-HH",
              "display": "Hamburg"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166-2:de",
              "code": "DE-HE",
              "display": "Hessen"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166-2:de",
              "code": "DE-MV",
              "display": "Mecklenburg-Vorpommern"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166-2:de",
              "code": "DE-NI",
              "display": "Niedersachsen"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166-2:de",
              "code": "DE-NW",
              "display": "Nordrhein-Westfalen"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166-2:de",
              "code": "DE-RP",
              "display": "Rheinland-Pfalz"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166-2:de",
              "code": "DE-SL",
              "display": "Saarland"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166-2:de",
              "code": "DE-SN",
              "display": "Sachsen"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166-2:de",
              "code": "DE-ST",
              "display": "Sachsen-Anhalt"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166-2:de",
              "code": "DE-SH",
              "display": "Schleswig-Holstein"
            }
          }, {
            "valueCoding": {
              "system": "urn:iso:std:iso:3166-2:de",
              "code": "DE-TH",
              "display": "Thüringen"
            }
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "anamnesis.immunizationStatus"
          }
        } ],
        "linkId": "1.22",
        "text": "immunizationStatus",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.immunizationStatus.bcg"
            }
          } ],
          "linkId": "1.22.1",
          "text": "bcg",
          "type": "group",
          "item": [ {
            "linkId": "1.22.1.1",
            "type": "choice",
            "answerOption": [ {
              "valueCoding": {
                "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
                "code": "Y",
                "display": "Ja"
              }
            }, {
              "valueCoding": {
                "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
                "code": "N",
                "display": "Nein"
              }
            }, {
              "valueCoding": {
                "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
                "code": "asked-unknown",
                "display": "Unbekannt"
              }
            } ]
          }, {
            "extension": [ {
              "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
              "valueCoding": {
                "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
                "version": "1.0",
                "code": "anamnesis.immunizationStatus.bcg.date"
              }
            } ],
            "linkId": "1.22.1.2",
            "text": "Datum",
            "type": "date"
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.immunizationStatus.covid_19"
            }
          } ],
          "linkId": "1.22.2",
          "text": "covid_19",
          "type": "group",
          "item": [ {
            "linkId": "1.22.2.1",
            "type": "choice",
            "answerOption": [ {
              "valueCoding": {
                "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
                "code": "Y",
                "display": "Ja"
              }
            }, {
              "valueCoding": {
                "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
                "code": "N",
                "display": "Nein"
              }
            }, {
              "valueCoding": {
                "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
                "code": "asked-unknown",
                "display": "Unbekannt"
              }
            } ]
          }, {
            "extension": [ {
              "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
              "valueCoding": {
                "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
                "version": "1.0",
                "code": "anamnesis.immunizationStatus.covid_19.date"
              }
            } ],
            "linkId": "1.22.2.2",
            "text": "Datum",
            "type": "date"
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.immunizationStatus.influenza"
            }
          } ],
          "linkId": "1.22.3",
          "text": "influenza",
          "type": "group",
          "item": [ {
            "linkId": "1.22.3.1",
            "type": "choice",
            "answerOption": [ {
              "valueCoding": {
                "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
                "code": "Y",
                "display": "Ja"
              }
            }, {
              "valueCoding": {
                "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
                "code": "N",
                "display": "Nein"
              }
            }, {
              "valueCoding": {
                "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
                "code": "asked-unknown",
                "display": "Unbekannt"
              }
            } ]
          }, {
            "extension": [ {
              "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
              "valueCoding": {
                "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
                "version": "1.0",
                "code": "anamnesis.immunizationStatus.influenza.date"
              }
            } ],
            "linkId": "1.22.3.2",
            "text": "Datum",
            "type": "date"
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.immunizationStatus.pneumococcal"
            }
          } ],
          "linkId": "1.22.4",
          "text": "pneumococcal",
          "type": "group",
          "item": [ {
            "linkId": "1.22.4.1",
            "type": "choice",
            "answerOption": [ {
              "valueCoding": {
                "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
                "code": "Y",
                "display": "Ja"
              }
            }, {
              "valueCoding": {
                "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
                "code": "N",
                "display": "Nein"
              }
            }, {
              "valueCoding": {
                "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
                "code": "asked-unknown",
                "display": "Unbekannt"
              }
            } ]
          }, {
            "extension": [ {
              "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
              "valueCoding": {
                "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
                "version": "1.0",
                "code": "anamnesis.immunizationStatus.pneumococcal.date"
              }
            } ],
            "linkId": "1.22.4.2",
            "text": "Datum",
            "type": "date"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "anamnesis.malignantNeoplasticDiseases"
          }
        } ],
        "linkId": "1.23",
        "text": "Leidet der/die Patient*in unter mind. einer aktiven Tumor-/Krebserkrankung?",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
            "code": "active",
            "display": "Aktiv"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
            "code": "remission",
            "display": "In Remission"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "No"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "unknown"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "anamnesis.resuscitateOrder"
          }
        } ],
        "linkId": "1.24",
        "definition": "https://www.netzwerk-universitaetsmedizin.de//fhir/StructureDefinition/do-not-resuscitate-order",
        "text": "resuscitateOrder",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "anamnesis.rheumatologicalImmunologicalDiseases"
          }
        } ],
        "linkId": "1.25",
        "text": "An welcher rheumatologischen/immunologischen Erkrankung leidet der/die Patient*in?",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.rheumatologicalImmunologicalDiseases.collagenosis"
            }
          } ],
          "linkId": "1.25.1",
          "text": "Kollagenosen",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.rheumatologicalImmunologicalDiseases.congenitalImmunodeficiencyDisease"
            }
          } ],
          "linkId": "1.25.2",
          "text": "angeborene Immundefekte",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.rheumatologicalImmunologicalDiseases.inflammatoryBowelDisease"
            }
          } ],
          "linkId": "1.25.3",
          "text": "Chronisch entzündl. Darmerkrankung",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.rheumatologicalImmunologicalDiseases.rheumatoidArthritis"
            }
          } ],
          "linkId": "1.25.4",
          "text": "Rheumatoide Arthritis",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "anamnesis.rheumatologicalImmunologicalDiseases.vasculitis"
            }
          } ],
          "linkId": "1.25.5",
          "text": "Vaskulitiden",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "anamnesis.tobaccoSmokingStatus"
          }
        } ],
        "linkId": "1.26",
        "text": "Hat der/die Patient*in jemals Zigaretten geraucht?",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://loinc.org",
            "code": "LA18976-3",
            "display": "Current every day smoker"
          }
        }, {
          "valueCoding": {
            "system": "http://loinc.org",
            "code": "LA15920-4",
            "display": "Former smoker"
          }
        }, {
          "valueCoding": {
            "system": "http://loinc.org",
            "code": "LA18978-9",
            "display": "Never smoker"
          }
        }, {
          "valueCoding": {
            "system": "http://loinc.org",
            "code": "LA18980-5",
            "display": "Unknown if ever smoked"
          }
        } ]
      } ]
    }, {
      "extension": [ {
        "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
        "valueCoding": {
          "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
          "version": "1.0",
          "code": "complications"
        }
      } ],
      "linkId": "2",
      "text": "complications",
      "type": "group",
      "item": [ {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "complications.acuteRenalFailureSyndrome"
          }
        } ],
        "linkId": "2.1",
        "text": "Akutes Nierenversagen",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "complications.cerebrovascularAccident"
          }
        } ],
        "linkId": "2.2",
        "text": "Stroke",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "complications.embolism"
          }
        } ],
        "linkId": "2.3",
        "text": "Embolie",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "complications.infectiousAgentInBloodstream"
          }
        } ],
        "linkId": "2.4",
        "text": "Blutstrominfektion",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "complications.infectiousDiseaseOfLung"
          }
        } ],
        "linkId": "2.5",
        "text": "Infektion der Lunge",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "complications.myocardialInfarction"
          }
        } ],
        "linkId": "2.6",
        "text": "Myokardinfarkt",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "complications.pulmonaryEmbolism"
          }
        } ],
        "linkId": "2.7",
        "text": "Lungenarterienembolie",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "complications.thrombosis"
          }
        } ],
        "linkId": "2.8",
        "text": "Thrombembolische Ereignisse",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "complications.venomousThrombosis"
          }
        } ],
        "linkId": "2.9",
        "text": "Venöse Thrombose",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      } ]
    }, {
      "extension": [ {
        "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
        "valueCoding": {
          "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
          "version": "1.0",
          "code": "demographics"
        }
      } ],
      "linkId": "3",
      "text": "demographics",
      "type": "group",
      "item": [ {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "demographics.age"
          }
        } ],
        "linkId": "3.1",
        "text": "Alter bei Studieneinschluss in Jahren oder Monaten",
        "type": "integer"
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "demographics.biologicalSex"
          }
        } ],
        "linkId": "3.2",
        "text": "Biologisches Geschlecht",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://hl7.org/fhir/administrative-gender",
            "code": "male",
            "display": "Male"
          }
        }, {
          "valueCoding": {
            "system": "http://hl7.org/fhir/administrative-gender",
            "code": "female",
            "display": "Female"
          }
        }, {
          "valueCoding": {
            "system": "http://hl7.org/fhir/administrative-gender",
            "code": "other",
            "display": "Other"
          }
        }, {
          "valueCoding": {
            "system": "http://hl7.org/fhir/administrative-gender",
            "code": "unknown",
            "display": "Unknown"
          }
        }, {
          "valueCoding": {
            "system": "http://fhir.de/CodeSystem/gender-amtlich-de",
            "code": "X",
            "display": "unbestimmt"
          }
        }, {
          "valueCoding": {
            "system": "http://fhir.de/CodeSystem/gender-amtlich-de",
            "code": "D",
            "display": "divers"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "demographics.bodyHeight"
          }
        } ],
        "linkId": "3.3",
        "text": "Körpergröße",
        "type": "decimal"
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "demographics.bodyWeight"
          }
        } ],
        "linkId": "3.4",
        "text": "Körpergewicht",
        "type": "decimal"
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "demographics.dateOfBirth"
          }
        } ],
        "linkId": "3.5",
        "text": "Geburtsdatum"
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "demographics.ethnicGroup"
          }
        } ],
        "linkId": "3.6",
        "text": "ethnische Zugehörigkeit",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "14045001",
            "display": "Caucasian (ethnic group)"
          }
        }, {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "18167009",
            "display": "Black African (ethnic group)"
          }
        }, {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "315280000",
            "display": "Asian - ethnic group (ethnic group)"
          }
        }, {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "90027003",
            "display": "Arabs (ethnic group)"
          }
        }, {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "186019001",
            "display": "Other ethnic, mixed origin"
          }
        }, {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "90027003",
            "display": "Arabs (ethnic group)"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "demographics.frailityScore"
          }
        } ],
        "linkId": "3.7",
        "text": "Frailty-Score vor Aufnahme",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "https://www.netzwerk-universitaetsmedizin.de/fhir/CodeSystem/frailty-score",
            "code": "1",
            "display": "Very Fit"
          }
        }, {
          "valueCoding": {
            "system": "https://www.netzwerk-universitaetsmedizin.de/fhir/CodeSystem/frailty-score",
            "code": "2",
            "display": "Well"
          }
        }, {
          "valueCoding": {
            "system": "https://www.netzwerk-universitaetsmedizin.de/fhir/CodeSystem/frailty-score",
            "code": "3",
            "display": "Managing Well"
          }
        }, {
          "valueCoding": {
            "system": "https://www.netzwerk-universitaetsmedizin.de/fhir/CodeSystem/frailty-score",
            "code": "4",
            "display": "Vulnerable"
          }
        }, {
          "valueCoding": {
            "system": "https://www.netzwerk-universitaetsmedizin.de/fhir/CodeSystem/frailty-score",
            "code": "5",
            "display": "Mildly Frail"
          }
        }, {
          "valueCoding": {
            "system": "https://www.netzwerk-universitaetsmedizin.de/fhir/CodeSystem/frailty-score",
            "code": "6",
            "display": "Moderately Frail"
          }
        }, {
          "valueCoding": {
            "system": "https://www.netzwerk-universitaetsmedizin.de/fhir/CodeSystem/frailty-score",
            "code": "7",
            "display": "Severely Frail"
          }
        }, {
          "valueCoding": {
            "system": "https://www.netzwerk-universitaetsmedizin.de/fhir/CodeSystem/frailty-score",
            "code": "8",
            "display": "Very Severely Frail"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "demographics.pregnancyStatus"
          }
        } ],
        "linkId": "3.8",
        "text": "Liegt eine Schwangerschaft vor?",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://loinc.org",
            "code": "LA26683-5",
            "display": "Not pregnant"
          }
        }, {
          "valueCoding": {
            "system": "http://loinc.org",
            "code": "LA15173-0",
            "display": "Pregnant"
          }
        }, {
          "valueCoding": {
            "system": "http://loinc.org",
            "code": "LA4489-6",
            "display": "Pregnant"
          }
        } ]
      } ]
    }, {
      "extension": [ {
        "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
        "valueCoding": {
          "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
          "version": "1.0",
          "code": "epidemiologicalFactors"
        }
      } ],
      "linkId": "4",
      "text": "epidemiologicalFactors",
      "type": "group",
      "item": [ {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "epidemiologicalFactors.knownCovid19Exposure"
          }
        } ],
        "linkId": "4.1",
        "definition": "https://www.netzwerk-universitaetsmedizin.de/fhir/StructureDefinition/known-exposure",
        "text": "knownCovid19Exposure",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      } ]
    }, {
      "extension": [ {
        "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
        "valueCoding": {
          "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
          "version": "1.0",
          "code": "imaging"
        }
      } ],
      "linkId": "5",
      "text": "imaging",
      "type": "group",
      "item": [ {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "imaging.hasHadImagingImagingProcedures"
          }
        } ],
        "linkId": "5.1",
        "text": "hasHadImagingImagingProcedures",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "imaging.hasRadiologicalFindings"
          }
        } ],
        "linkId": "5.2",
        "text": "hasRadiologicalFindings",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "imaging.imagingProcedures"
          }
        } ],
        "linkId": "5.3",
        "text": "imagingProcedures",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "imaging.imagingProcedures.computedTomography"
            }
          } ],
          "linkId": "5.3.1",
          "text": "computedTomography",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "imaging.imagingProcedures.radiographicImaging"
            }
          } ],
          "linkId": "5.3.2",
          "text": "radiographicImaging",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "imaging.imagingProcedures.ultrasound"
            }
          } ],
          "linkId": "5.3.3",
          "text": "ultrasound",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "imaging.radiologicalFindings"
          }
        } ],
        "linkId": "5.4",
        "text": "radiologicalFindings",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "118247008:363713009=373068000",
            "display": "|Radiologic finding (finding)|:|Has interpretation (attribute)|=|Undetermined (qualifier value)|"
          }
        }, {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "118247008:{363713009=263654008,42752001=840539006}",
            "display": "|Radiologic finding (finding)|:{|Has interpretation (attribute)|=|Abnormal (qualifier value)|,|Due to (attribute)|=|Disease caused by severe acute respiratory syndrome coronavirus 2 (disorder)|}"
          }
        }, {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "118247008:363713009=17621005",
            "display": "|Radiologic finding (finding)|:|Has interpretation (attribute)|=|Normal (qualifier value)|"
          }
        } ]
      } ]
    }, {
      "extension": [ {
        "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
        "valueCoding": {
          "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
          "version": "1.0",
          "code": "laboratoryValues"
        }
      } ],
      "linkId": "6",
      "text": "laboratoryValues",
      "type": "group",
      "item": [ {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "laboratoryValues.laboratoryValues"
          }
        } ],
        "linkId": "6.1",
        "text": "laboratoryValues",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.aPttInBloodByCoagulationOneToOneSaline"
            }
          } ],
          "linkId": "6.1.1",
          "text": "aPttInBloodByCoagulationOneToOneSaline",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.aPttInPlasmaByCoagulationAssay"
            }
          } ],
          "linkId": "6.1.2",
          "text": "aPttInPlasmaByCoagulationAssay",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.aPttInPlateletPoorPlasmaByCoagulationAssay"
            }
          } ],
          "linkId": "6.1.3",
          "text": "aPttInPlateletPoorPlasmaByCoagulationAssay",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.aPttInPlateletPoorPlasmaByCoagulationOneToOneSaline"
            }
          } ],
          "linkId": "6.1.4",
          "text": "aPttInPlateletPoorPlasmaByCoagulationOneToOneSaline",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.albuminMassPerVolumeInBloodByBromocresolPurpleDyeBindingMethod"
            }
          } ],
          "linkId": "6.1.5",
          "text": "albuminMassPerVolumeInBloodByBromocresolPurpleDyeBindingMethod",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.albuminMassPerVolumeInSerumOrPlasma"
            }
          } ],
          "linkId": "6.1.6",
          "text": "albuminMassPerVolumeInSerumOrPlasma",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.albuminMassPerVolumeInSerumOrPlasmaByBromocresolGreenDyeBindingMethod"
            }
          } ],
          "linkId": "6.1.7",
          "text": "albuminMassPerVolumeInSerumOrPlasmaByBromocresolGreenDyeBindingMethod",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.albuminMassPerVolumeInSerumOrPlasmaByBromocresolPurpleDyeBindingMethod"
            }
          } ],
          "linkId": "6.1.8",
          "text": "albuminMassPerVolumeInSerumOrPlasmaByBromocresolPurpleDyeBindingMethod",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.albuminMassPerVolumeInSerumOrPlasmaByElectrophoresis"
            }
          } ],
          "linkId": "6.1.9",
          "text": "albuminMassPerVolumeInSerumOrPlasmaByElectrophoresis",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.albuminMolesPerVolumeInSerumOrPlasma"
            }
          } ],
          "linkId": "6.1.10",
          "text": "albuminMolesPerVolumeInSerumOrPlasma",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.albuminMolesPerVolumeInSerumOrPlasmaByBromocresolGreenDyeBindingMethod"
            }
          } ],
          "linkId": "6.1.11",
          "text": "albuminMolesPerVolumeInSerumOrPlasmaByBromocresolGreenDyeBindingMethod",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.albuminMolesPerVolumeInSerumOrPlasmaByBromocresolPurpleDyeBindingMethod"
            }
          } ],
          "linkId": "6.1.12",
          "text": "albuminMolesPerVolumeInSerumOrPlasmaByBromocresolPurpleDyeBindingMethod",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.antithrombinActualToNormalRatioInPlateletPoorPlasmaByChromogenicMethod"
            }
          } ],
          "linkId": "6.1.13",
          "text": "antithrombinActualToNormalRatioInPlateletPoorPlasmaByChromogenicMethod",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.antithrombinAgActualToNormalRatioInPlateletPoorPlasmaByImmunoassay"
            }
          } ],
          "linkId": "6.1.14",
          "text": "antithrombinAgActualToNormalRatioInPlateletPoorPlasmaByImmunoassay",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.antithrombinInPlateletPoorPlasmaByChromoNoAdditionOfHeparin"
            }
          } ],
          "linkId": "6.1.15",
          "text": "antithrombinInPlateletPoorPlasmaByChromoNoAdditionOfHeparin",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.antithrombinMolesPerVolumeInPlateletPoorPlasmaByChromogenicMethod"
            }
          } ],
          "linkId": "6.1.16",
          "text": "antithrombinMolesPerVolumeInPlateletPoorPlasmaByChromogenicMethod",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.antithrombinUnitsPerVolumeInPlateletPoorPlasmaByChromogenicMethod"
            }
          } ],
          "linkId": "6.1.17",
          "text": "antithrombinUnitsPerVolumeInPlateletPoorPlasmaByChromogenicMethod",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.aspartateAminotransferaseEnzymaticActivityPerVolumeInSerumOrPlasma"
            }
          } ],
          "linkId": "6.1.18",
          "text": "aspartateAminotransferaseEnzymaticActivityPerVolumeInSerumOrPlasma",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.aspartateAminotransferaseEnzymaticActivityPerVolumeInSerumOrPlasmaByNoAdditionOfP5P"
            }
          } ],
          "linkId": "6.1.19",
          "text": "aspartateAminotransferaseEnzymaticActivityPerVolumeInSerumOrPlasmaByNoAdditionOfP5P",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.aspartateAminotransferaseEnzymaticActivityPerVolumeInSerumOrPlasmaWithP5P"
            }
          } ],
          "linkId": "6.1.20",
          "text": "aspartateAminotransferaseEnzymaticActivityPerVolumeInSerumOrPlasmaWithP5P",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.bilirubinIndirectMassPerVolumeInSerumOrPlasma"
            }
          } ],
          "linkId": "6.1.21",
          "text": "bilirubinIndirectMassPerVolumeInSerumOrPlasma",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.bilirubinTotalMassPerVolumeInSerumOrPlasma"
            }
          } ],
          "linkId": "6.1.22",
          "text": "bilirubinTotalMassPerVolumeInSerumOrPlasma",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.bilirubinTotalMassPerVolumeInVenousBlood"
            }
          } ],
          "linkId": "6.1.23",
          "text": "bilirubinTotalMassPerVolumeInVenousBlood",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.bilirubinTotalMolesPerVolumeInArterialBlood"
            }
          } ],
          "linkId": "6.1.24",
          "text": "bilirubinTotalMolesPerVolumeInArterialBlood",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.bilirubinTotalMolesPerVolumeInBlood"
            }
          } ],
          "linkId": "6.1.25",
          "text": "bilirubinTotalMolesPerVolumeInBlood",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.bilirubinTotalMolesPerVolumeInSerumOrPlasma"
            }
          } ],
          "linkId": "6.1.26",
          "text": "bilirubinTotalMolesPerVolumeInSerumOrPlasma",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.creatinineMassPerVolumeInArterialBlood"
            }
          } ],
          "linkId": "6.1.27",
          "text": "creatinineMassPerVolumeInArterialBlood",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.creatinineMassPerVolumeInBlood"
            }
          } ],
          "linkId": "6.1.28",
          "text": "creatinineMassPerVolumeInBlood",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.creatinineMassPerVolumeInBodyFluid"
            }
          } ],
          "linkId": "6.1.29",
          "text": "creatinineMassPerVolumeInBodyFluid",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.creatinineMassPerVolumeInSerumOrPlasma"
            }
          } ],
          "linkId": "6.1.30",
          "text": "creatinineMassPerVolumeInSerumOrPlasma",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.creatinineMolesPerVolumeInArterialBlood"
            }
          } ],
          "linkId": "6.1.31",
          "text": "creatinineMolesPerVolumeInArterialBlood",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.creatinineMolesPerVolumeInBodyFluid"
            }
          } ],
          "linkId": "6.1.32",
          "text": "creatinineMolesPerVolumeInBodyFluid",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.creatinineMolesPerVolumeInSerumOrPlasma"
            }
          } ],
          "linkId": "6.1.33",
          "text": "creatinineMolesPerVolumeInSerumOrPlasma",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.crpMassPerVolumeInBloodByHighSensitivityMethod"
            }
          } ],
          "linkId": "6.1.34",
          "text": "crpMassPerVolumeInBloodByHighSensitivityMethod",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.crpMassPerVolumeInCapillaryBlood"
            }
          } ],
          "linkId": "6.1.35",
          "text": "crpMassPerVolumeInCapillaryBlood",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.crpMassPerVolumeInSerumOrPlasma"
            }
          } ],
          "linkId": "6.1.36",
          "text": "crpMassPerVolumeInSerumOrPlasma",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.crpMassPerVolumeInSerumOrPlasmaByHighSensitivityMethod"
            }
          } ],
          "linkId": "6.1.37",
          "text": "crpMassPerVolumeInSerumOrPlasmaByHighSensitivityMethod",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.crpMolesPerVolumeInSerumOrPlasma"
            }
          } ],
          "linkId": "6.1.38",
          "text": "crpMolesPerVolumeInSerumOrPlasma",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.crpMolesPerVolumeInSerumOrPlasmaByHighSensitivityMethod"
            }
          } ],
          "linkId": "6.1.39",
          "text": "crpMolesPerVolumeInSerumOrPlasmaByHighSensitivityMethod",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.ferritinGoalMassPerVolumeInSerumOrPlasma"
            }
          } ],
          "linkId": "6.1.40",
          "text": "ferritinGoalMassPerVolumeInSerumOrPlasma",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.ferritinMassPerVolumeInBlood"
            }
          } ],
          "linkId": "6.1.41",
          "text": "ferritinMassPerVolumeInBlood",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.ferritinMassPerVolumeInSerumOrPlasma"
            }
          } ],
          "linkId": "6.1.42",
          "text": "ferritinMassPerVolumeInSerumOrPlasma",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.ferritinMassPerVolumeInSerumOrPlasmaByImmunoassay"
            }
          } ],
          "linkId": "6.1.43",
          "text": "ferritinMassPerVolumeInSerumOrPlasmaByImmunoassay",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.ferritinMolesPerVolumeInSerumOrPlasma"
            }
          } ],
          "linkId": "6.1.44",
          "text": "ferritinMolesPerVolumeInSerumOrPlasma",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.fibrinDDimerDduMassPerVolumeInBloodByImmunoassay"
            }
          } ],
          "linkId": "6.1.45",
          "text": "fibrinDDimerDduMassPerVolumeInBloodByImmunoassay",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.fibrinDDimerDduMassPerVolumeInPlateletPoorPlasma"
            }
          } ],
          "linkId": "6.1.46",
          "text": "fibrinDDimerDduMassPerVolumeInPlateletPoorPlasma",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.fibrinDDimerDduMassPerVolumeInPlateletPoorPlasmaByImmunoassay"
            }
          } ],
          "linkId": "6.1.47",
          "text": "fibrinDDimerDduMassPerVolumeInPlateletPoorPlasmaByImmunoassay",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.fibrinDDimerFeuMassPerVolumeInBloodByImmunoassay"
            }
          } ],
          "linkId": "6.1.48",
          "text": "fibrinDDimerFeuMassPerVolumeInBloodByImmunoassay",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.fibrinDDimerFeuMassPerVolumeInPlateletPoorPlasma"
            }
          } ],
          "linkId": "6.1.49",
          "text": "fibrinDDimerFeuMassPerVolumeInPlateletPoorPlasma",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.fibrinDDimerFeuMassPerVolumeInPlateletPoorPlasmaByImmunoassay"
            }
          } ],
          "linkId": "6.1.50",
          "text": "fibrinDDimerFeuMassPerVolumeInPlateletPoorPlasmaByImmunoassay",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.fibrinDDimerTiterInPlateletPoorPlasma"
            }
          } ],
          "linkId": "6.1.51",
          "text": "fibrinDDimerTiterInPlateletPoorPlasma",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.fibrinDDimerUnitsPerVolumeInPlateletPoorPlasma"
            }
          } ],
          "linkId": "6.1.52",
          "text": "fibrinDDimerUnitsPerVolumeInPlateletPoorPlasma",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.fibrinDDimerUnitsPerVolumeInPlateletPoorPlasmaByImmunoassay"
            }
          } ],
          "linkId": "6.1.53",
          "text": "fibrinDDimerUnitsPerVolumeInPlateletPoorPlasmaByImmunoassay",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.fibrinogenMassPerVolumeInPlateletPoorPlasmaByCoagulationAssay"
            }
          } ],
          "linkId": "6.1.54",
          "text": "fibrinogenMassPerVolumeInPlateletPoorPlasmaByCoagulationAssay",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.fibrinogenMassPerVolumeInPlateletPoorPlasmaByCoagulationDerived"
            }
          } ],
          "linkId": "6.1.55",
          "text": "fibrinogenMassPerVolumeInPlateletPoorPlasmaByCoagulationDerived",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.fibrinogenMassPerVolumeInPlateletPoorPlasmaByHeatDenaturation"
            }
          } ],
          "linkId": "6.1.56",
          "text": "fibrinogenMassPerVolumeInPlateletPoorPlasmaByHeatDenaturation",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.fibrinogenPeresenceInPlateletPoorPlasma"
            }
          } ],
          "linkId": "6.1.57",
          "text": "fibrinogenPeresenceInPlateletPoorPlasma",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.gammaGlutamylTransferaseEnzymaticActivityPerVolumeInSerumOrPlasma"
            }
          } ],
          "linkId": "6.1.58",
          "text": "gammaGlutamylTransferaseEnzymaticActivityPerVolumeInSerumOrPlasma",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.gammaGlutamylTransferaseToAspartateAminotransferaseEnzymaticActivityRatioInSerumOrPlasma"
            }
          } ],
          "linkId": "6.1.59",
          "text": "gammaGlutamylTransferaseToAspartateAminotransferaseEnzymaticActivityRatioInSerumOrPlasma",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.hemoglobinMassPerVolumeInArterialBlood"
            }
          } ],
          "linkId": "6.1.60",
          "text": "hemoglobinMassPerVolumeInArterialBlood",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.hemoglobinMassPerVolumeInArterialBloodByOximetry"
            }
          } ],
          "linkId": "6.1.61",
          "text": "hemoglobinMassPerVolumeInArterialBloodByOximetry",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.hemoglobinMassPerVolumeInBlood"
            }
          } ],
          "linkId": "6.1.62",
          "text": "hemoglobinMassPerVolumeInBlood",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.hemoglobinMassPerVolumeInBloodByCalculation"
            }
          } ],
          "linkId": "6.1.63",
          "text": "hemoglobinMassPerVolumeInBloodByCalculation",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.hemoglobinMassPerVolumeInBloodByOximetry"
            }
          } ],
          "linkId": "6.1.64",
          "text": "hemoglobinMassPerVolumeInBloodByOximetry",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.hemoglobinMassPerVolumeInCapillaryBlood"
            }
          } ],
          "linkId": "6.1.65",
          "text": "hemoglobinMassPerVolumeInCapillaryBlood",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.hemoglobinMassPerVolumeInMixedVenousBlood"
            }
          } ],
          "linkId": "6.1.66",
          "text": "hemoglobinMassPerVolumeInMixedVenousBlood",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.hemoglobinMassPerVolumeInMixedVenousBloodByOximetry"
            }
          } ],
          "linkId": "6.1.67",
          "text": "hemoglobinMassPerVolumeInMixedVenousBloodByOximetry",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.hemoglobinMassPerVolumeInVenousBlood"
            }
          } ],
          "linkId": "6.1.68",
          "text": "hemoglobinMassPerVolumeInVenousBlood",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.hemoglobinMassPerVolumeInVenousBloodByOximetry"
            }
          } ],
          "linkId": "6.1.69",
          "text": "hemoglobinMassPerVolumeInVenousBloodByOximetry",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.hemoglobinMolesPerVolumeInArterialBlood"
            }
          } ],
          "linkId": "6.1.70",
          "text": "hemoglobinMolesPerVolumeInArterialBlood",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.hemoglobinMolesPerVolumeInBlood"
            }
          } ],
          "linkId": "6.1.71",
          "text": "hemoglobinMolesPerVolumeInBlood",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.inrInBloodByCoagulationAssay"
            }
          } ],
          "linkId": "6.1.72",
          "text": "inrInBloodByCoagulationAssay",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.inrInCapillaryBloodByCoagulationAssay"
            }
          } ],
          "linkId": "6.1.73",
          "text": "inrInCapillaryBloodByCoagulationAssay",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.inrInPlateletPoorPlasmaByCoagulationAssay"
            }
          } ],
          "linkId": "6.1.74",
          "text": "inrInPlateletPoorPlasmaByCoagulationAssay",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.interleukin6MassPerVolumeInBodyFluid"
            }
          } ],
          "linkId": "6.1.75",
          "text": "interleukin6MassPerVolumeInBodyFluid",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.interleukin6MassPerVolumeInCerebralSpinalFluid"
            }
          } ],
          "linkId": "6.1.76",
          "text": "interleukin6MassPerVolumeInCerebralSpinalFluid",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.interleukin6MassPerVolumeInSerumOrPlasma"
            }
          } ],
          "linkId": "6.1.77",
          "text": "interleukin6MassPerVolumeInSerumOrPlasma",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.interleukin6PresenceInSerumOrPlasma"
            }
          } ],
          "linkId": "6.1.78",
          "text": "interleukin6PresenceInSerumOrPlasma",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.lactateDehydrogenaseEnzymaticActivityPerVolumeInBodyFluidByLactateToPyruvateReaction"
            }
          } ],
          "linkId": "6.1.79",
          "text": "lactateDehydrogenaseEnzymaticActivityPerVolumeInBodyFluidByLactateToPyruvateReaction",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.lactateDehydrogenaseEnzymaticActivityPerVolumeInBodyFluidByPyruvateToLactateReaction"
            }
          } ],
          "linkId": "6.1.80",
          "text": "lactateDehydrogenaseEnzymaticActivityPerVolumeInBodyFluidByPyruvateToLactateReaction",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.lactateDehydrogenaseEnzymaticActivityPerVolumeInSerumOrPlasma"
            }
          } ],
          "linkId": "6.1.81",
          "text": "lactateDehydrogenaseEnzymaticActivityPerVolumeInSerumOrPlasma",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.lactateDehydrogenaseEnzymaticActivityPerVolumeInSerumOrPlasmaByLactateToPyruvateReaction"
            }
          } ],
          "linkId": "6.1.82",
          "text": "lactateDehydrogenaseEnzymaticActivityPerVolumeInSerumOrPlasmaByLactateToPyruvateReaction",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.lactateDehydrogenaseEnzymaticActivityPerVolumeInSerumOrPlasmaByPyruvateToLactateReaction"
            }
          } ],
          "linkId": "6.1.83",
          "text": "lactateDehydrogenaseEnzymaticActivityPerVolumeInSerumOrPlasmaByPyruvateToLactateReaction",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.lactateMassPerVolumeInArterialBlood"
            }
          } ],
          "linkId": "6.1.84",
          "text": "lactateMassPerVolumeInArterialBlood",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.lactateMassPerVolumeInBlood"
            }
          } ],
          "linkId": "6.1.85",
          "text": "lactateMassPerVolumeInBlood",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.lactateMassPerVolumeInCerebralSpinalFluid"
            }
          } ],
          "linkId": "6.1.86",
          "text": "lactateMassPerVolumeInCerebralSpinalFluid",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.lactateMassPerVolumeInSerumOrPlasma"
            }
          } ],
          "linkId": "6.1.87",
          "text": "lactateMassPerVolumeInSerumOrPlasma",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.lactateMolesPerVolumeInArterialBlood"
            }
          } ],
          "linkId": "6.1.88",
          "text": "lactateMolesPerVolumeInArterialBlood",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.lactateMolesPerVolumeInBlood"
            }
          } ],
          "linkId": "6.1.89",
          "text": "lactateMolesPerVolumeInBlood",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.lactateMolesPerVolumeInCapillaryBlood"
            }
          } ],
          "linkId": "6.1.90",
          "text": "lactateMolesPerVolumeInCapillaryBlood",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.lactateMolesPerVolumeInCerebralSpinalFluid"
            }
          } ],
          "linkId": "6.1.91",
          "text": "lactateMolesPerVolumeInCerebralSpinalFluid",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.lactateMolesPerVolumeInMixedVenousBlood"
            }
          } ],
          "linkId": "6.1.92",
          "text": "lactateMolesPerVolumeInMixedVenousBlood",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.lactateMolesPerVolumeInSerumOrPlasma"
            }
          } ],
          "linkId": "6.1.93",
          "text": "lactateMolesPerVolumeInSerumOrPlasma",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.lactateMolesPerVolumeInVenousBlood"
            }
          } ],
          "linkId": "6.1.94",
          "text": "lactateMolesPerVolumeInVenousBlood",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.leukocytesCountPerVolumeInBlood"
            }
          } ],
          "linkId": "6.1.95",
          "text": "leukocytesCountPerVolumeInBlood",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.leukocytesCountPerVolumeInBloodByAutomatedCount"
            }
          } ],
          "linkId": "6.1.96",
          "text": "leukocytesCountPerVolumeInBloodByAutomatedCount",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.leukocytesCountPerVolumeInBloodByEstimate"
            }
          } ],
          "linkId": "6.1.97",
          "text": "leukocytesCountPerVolumeInBloodByEstimate",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.leukocytesCountPerVolumeInBloodByManualCount"
            }
          } ],
          "linkId": "6.1.98",
          "text": "leukocytesCountPerVolumeInBloodByManualCount",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.lymphocytesCountPerVolumeInBlood"
            }
          } ],
          "linkId": "6.1.99",
          "text": "lymphocytesCountPerVolumeInBlood",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.lymphocytesCountPerVolumeInBloodByAutomatedCount"
            }
          } ],
          "linkId": "6.1.100",
          "text": "lymphocytesCountPerVolumeInBloodByAutomatedCount",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.lymphocytesCountPerVolumeInBloodByFlowCytometry"
            }
          } ],
          "linkId": "6.1.101",
          "text": "lymphocytesCountPerVolumeInBloodByFlowCytometry",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.lymphocytesCountPerVolumeInBloodByManualCount"
            }
          } ],
          "linkId": "6.1.102",
          "text": "lymphocytesCountPerVolumeInBloodByManualCount",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.natriureticPeptideBProhormoneNTerminalMassPerVolumeInSerumOrPlasma"
            }
          } ],
          "linkId": "6.1.103",
          "text": "natriureticPeptideBProhormoneNTerminalMassPerVolumeInSerumOrPlasma",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.neutrophilsCountPerVolumeInBlood"
            }
          } ],
          "linkId": "6.1.104",
          "text": "neutrophilsCountPerVolumeInBlood",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.neutrophilsCountPerVolumeInBloodByAutomatedCount"
            }
          } ],
          "linkId": "6.1.105",
          "text": "neutrophilsCountPerVolumeInBloodByAutomatedCount",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.neutrophilsCountPerVolumeInBloodByManualCount"
            }
          } ],
          "linkId": "6.1.106",
          "text": "neutrophilsCountPerVolumeInBloodByManualCount",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.plateletsCountPerVolumeInBlood"
            }
          } ],
          "linkId": "6.1.107",
          "text": "plateletsCountPerVolumeInBlood",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.plateletsCountPerVolumeInBloodByAutomatedCount"
            }
          } ],
          "linkId": "6.1.108",
          "text": "plateletsCountPerVolumeInBloodByAutomatedCount",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.plateletsCountPerVolumeInBloodByEstimate"
            }
          } ],
          "linkId": "6.1.109",
          "text": "plateletsCountPerVolumeInBloodByEstimate",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.plateletsCountPerVolumeInBloodByManualCount"
            }
          } ],
          "linkId": "6.1.110",
          "text": "plateletsCountPerVolumeInBloodByManualCount",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.plateletsCountPerVolumeInCapillaryBloodByManualCount"
            }
          } ],
          "linkId": "6.1.111",
          "text": "plateletsCountPerVolumeInCapillaryBloodByManualCount",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.plateletsCountPerVolumeInPlasma"
            }
          } ],
          "linkId": "6.1.112",
          "text": "plateletsCountPerVolumeInPlasma",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.plateletsCountPerVolumeInPlasmaByAutomatedCount"
            }
          } ],
          "linkId": "6.1.113",
          "text": "plateletsCountPerVolumeInPlasmaByAutomatedCount",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.plateletsCountPerVolumeInPlateletRichPlasmaByAutomatedCount"
            }
          } ],
          "linkId": "6.1.114",
          "text": "plateletsCountPerVolumeInPlateletRichPlasmaByAutomatedCount",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.procalcitoninMassPerVolumeInSerumOrPlasma"
            }
          } ],
          "linkId": "6.1.115",
          "text": "procalcitoninMassPerVolumeInSerumOrPlasma",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.procalcitoninMassPerVolumeInSerumOrPlasmaByImmunoassay"
            }
          } ],
          "linkId": "6.1.116",
          "text": "procalcitoninMassPerVolumeInSerumOrPlasmaByImmunoassay",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.shortFibrinDDimerFeuAndDduPanelPlateletPoorPlasma"
            }
          } ],
          "linkId": "6.1.117",
          "text": "shortFibrinDDimerFeuAndDduPanelPlateletPoorPlasma",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.troponinLCardiacMassPerVolumeInBlood"
            }
          } ],
          "linkId": "6.1.118",
          "text": "troponinLCardiacMassPerVolumeInBlood",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.troponinLCardiacMassPerVolumeInSerumOrPlasma"
            }
          } ],
          "linkId": "6.1.119",
          "text": "troponinLCardiacMassPerVolumeInSerumOrPlasma",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.troponinLCardiacMassPerVolumeInSerumOrPlasmaByDetectionLimitLessOrEqualToOneHundredthNgPerMl"
            }
          } ],
          "linkId": "6.1.120",
          "text": "troponinLCardiacMassPerVolumeInSerumOrPlasmaByDetectionLimitLessOrEqualToOneHundredthNgPerMl",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.troponinLCardiacMassPerVolumeInSerumOrPlasmaByHighSensitivityMethod"
            }
          } ],
          "linkId": "6.1.121",
          "text": "troponinLCardiacMassPerVolumeInSerumOrPlasmaByHighSensitivityMethod",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.troponinTCardiacMassPerVolumeInBlood"
            }
          } ],
          "linkId": "6.1.122",
          "text": "troponinTCardiacMassPerVolumeInBlood",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.troponinTCardiacMassPerVolumeInSerumOrPlasma"
            }
          } ],
          "linkId": "6.1.123",
          "text": "troponinTCardiacMassPerVolumeInSerumOrPlasma",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.troponinTCardiacMassPerVolumeInSerumOrPlasmaByHighSensitivityMethod"
            }
          } ],
          "linkId": "6.1.124",
          "text": "troponinTCardiacMassPerVolumeInSerumOrPlasmaByHighSensitivityMethod",
          "type": "decimal"
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "laboratoryValues.laboratoryValues.troponinTCardiacMassPerVolumeInVenousBlood"
            }
          } ],
          "linkId": "6.1.125",
          "text": "troponinTCardiacMassPerVolumeInVenousBlood",
          "type": "decimal"
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "laboratoryValues.sarsCov2AntibodiesResult"
          }
        } ],
        "linkId": "6.2",
        "definition": "https://www.netzwerk-universitaetsmedizin.de/fhir/StructureDefinition/sars-cov-2-ab-pnl-ser-pl-ia",
        "text": "sarsCov2AntibodiesResult",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "laboratoryValues.sarsCov2RtPcrResult"
          }
        } ],
        "linkId": "6.3",
        "definition": "https://www.netzwerk-universitaetsmedizin.de/fhir/StructureDefinition/sars-cov-2-rt-pcr",
        "text": "sarsCov2RtPcrResult",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      } ]
    }, {
      "extension": [ {
        "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
        "valueCoding": {
          "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
          "version": "1.0",
          "code": "outcomeAtDischarge"
        }
      } ],
      "linkId": "9",
      "text": "outcomeAtDischarge",
      "type": "group",
      "item": [ {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "outcomeAtDischarge.followupSwapResultIsPositive"
          }
        } ],
        "linkId": "9.1",
        "definition": "https://www.netzwerk-universitaetsmedizin.de/fhir/StructureDefinition/sars-cov-2-rt-pcr",
        "text": "Ergebnis Folgeabstrich positiv?",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "outcomeAtDischarge.respiratoryOutcomeisVentilated"
          }
        } ],
        "linkId": "9.2",
        "definition": "https://www.netzwerk-universitaetsmedizin.de/fhir/StructureDefinition/dependence-on-ventilator",
        "text": "Beatmet?",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "outcomeAtDischarge.typeOfDischarge"
          }
        } ],
        "linkId": "9.3",
        "text": "Entlassungsart",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "371827001",
            "display": "Patient discharged alive (finding)"
          }
        }, {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "3457005",
            "display": "Patient referral (procedure)"
          }
        }, {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "306237005",
            "display": "Referral to palliative care service (procedure)"
          }
        }, {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "261665006",
            "display": "Unknown (qualifier value)"
          }
        }, {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "32485007",
            "display": "Hospital admission (procedure)"
          }
        }, {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "419099009",
            "display": "Dead (finding)"
          }
        } ]
      } ]
    }, {
      "extension": [ {
        "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
        "valueCoding": {
          "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
          "version": "1.0",
          "code": "studyEnrollmentOrInclusionCriteria"
        }
      } ],
      "linkId": "10",
      "text": "Studieneinschluss/Einschlusskriterien",
      "type": "group",
      "item": [ {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "studyEnrollmentOrInclusionCriteria.enrolledWithCovid19DiagnosisAsMainReason"
          }
        } ],
        "linkId": "10.1",
        "text": "Bestätigte Covid-19-Diagnose als Hauptursache für Aufnahme in Studie",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "373066001",
            "display": "Yes (qualifier value)"
          }
        }, {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "373067005",
            "display": "No (qualifier value)"
          }
        }, {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "261665006",
            "display": "Unknown (qualifier value)"
          }
        }, {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "74964007",
            "display": "Other (qualifier value)"
          }
        }, {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "385432009",
            "display": "Not applicable (qualifier value)"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "studyEnrollmentOrInclusionCriteria.hasPatientParticipatedInOneOrMoreInterventionalClinicalTrials"
          }
        } ],
        "linkId": "10.2",
        "text": "Hat der Patient an einer oder mehreren interventionellen Klinischen Studie teilgenommen?",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "373066001",
            "display": "Yes (qualifier value)"
          }
        }, {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "373067005",
            "display": "No (qualifier value)"
          }
        }, {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "261665006",
            "display": "Unknown (qualifier value)"
          }
        }, {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "74964007",
            "display": "Other (qualifier value)"
          }
        }, {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "385432009",
            "display": "Not applicable (qualifier value)"
          }
        } ]
      } ]
    }, {
      "extension": [ {
        "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
        "valueCoding": {
          "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
          "version": "1.0",
          "code": "symptoms"
        }
      } ],
      "linkId": "11",
      "text": "symptoms",
      "type": "group",
      "item": [ {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.abdominalPain"
          }
        } ],
        "linkId": "11.1",
        "text": "Bauchschmerzen",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.abdominalPain.presence"
            }
          } ],
          "linkId": "11.1.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.abdominalPain.severity"
            }
          } ],
          "linkId": "11.1.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.asthenia"
          }
        } ],
        "linkId": "11.2",
        "text": "Schwächegefühl",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.asthenia.presence"
            }
          } ],
          "linkId": "11.2.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.asthenia.severity"
            }
          } ],
          "linkId": "11.2.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.asymptomatic"
          }
        } ],
        "linkId": "11.3",
        "text": "Asymptomatisch",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.bleeding"
          }
        } ],
        "linkId": "11.4",
        "text": "Blutung",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.bleeding.presence"
            }
          } ],
          "linkId": "11.4.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.bleeding.severity"
            }
          } ],
          "linkId": "11.4.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.chestPain"
          }
        } ],
        "linkId": "11.5",
        "text": "Brustschmerzen",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.chestPain.presence"
            }
          } ],
          "linkId": "11.5.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.chestPain.severity"
            }
          } ],
          "linkId": "11.5.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.chill"
          }
        } ],
        "linkId": "11.6",
        "text": "Schüttelfrost",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.chill.presence"
            }
          } ],
          "linkId": "11.6.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.chill.severity"
            }
          } ],
          "linkId": "11.6.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.cloudedConsciousness"
          }
        } ],
        "linkId": "11.7",
        "text": "Bewusstseinstrübung",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.cloudedConsciousness.presence"
            }
          } ],
          "linkId": "11.7.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.cloudedConsciousness.severity"
            }
          } ],
          "linkId": "11.7.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.conjunctivis"
          }
        } ],
        "linkId": "11.8",
        "text": "Konjunktivitis",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.conjunctivis.presence"
            }
          } ],
          "linkId": "11.8.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.conjunctivis.severity"
            }
          } ],
          "linkId": "11.8.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.cough"
          }
        } ],
        "linkId": "11.9",
        "text": "Husten",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.cough.presence"
            }
          } ],
          "linkId": "11.9.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.cough.severity"
            }
          } ],
          "linkId": "11.9.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.diarrhea"
          }
        } ],
        "linkId": "11.10",
        "text": "Durchfall",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.diarrhea.presence"
            }
          } ],
          "linkId": "11.10.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.diarrhea.severity"
            }
          } ],
          "linkId": "11.10.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.disturbanceOfConsciousness"
          }
        } ],
        "linkId": "11.11",
        "text": "Bewusstseinsstörung",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.disturbanceOfConsciousness.presence"
            }
          } ],
          "linkId": "11.11.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.disturbanceOfConsciousness.severity"
            }
          } ],
          "linkId": "11.11.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.dryCough"
          }
        } ],
        "linkId": "11.12",
        "text": "Trockener Husten",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.dryCough.presence"
            }
          } ],
          "linkId": "11.12.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.dryCough.severity"
            }
          } ],
          "linkId": "11.12.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.dyspnea"
          }
        } ],
        "linkId": "11.13",
        "text": "Atemnot",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.dyspnea.presence"
            }
          } ],
          "linkId": "11.13.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.dyspnea.severity"
            }
          } ],
          "linkId": "11.13.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.erruptionOfSkin"
          }
        } ],
        "linkId": "11.14",
        "text": "Hautausschlag",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.erruptionOfSkin.presence"
            }
          } ],
          "linkId": "11.14.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.erruptionOfSkin.severity"
            }
          } ],
          "linkId": "11.14.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.fatigue"
          }
        } ],
        "linkId": "11.15",
        "text": "Müdigkeit",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.fatigue.presence"
            }
          } ],
          "linkId": "11.15.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.fatigue.severity"
            }
          } ],
          "linkId": "11.15.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.feelingFeverish"
          }
        } ],
        "linkId": "11.16",
        "text": "Fieberigkeit",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.feelingFeverish.presence"
            }
          } ],
          "linkId": "11.16.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.feelingFeverish.severity"
            }
          } ],
          "linkId": "11.16.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.fever"
          }
        } ],
        "linkId": "11.17",
        "text": "Fieber",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.fever.presence"
            }
          } ],
          "linkId": "11.17.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.fever.severity"
            }
          } ],
          "linkId": "11.17.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.feverGreaterThan38"
          }
        } ],
        "linkId": "11.18",
        "text": "Fieber über 38° Celsius",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.feverGreaterThan38.presence"
            }
          } ],
          "linkId": "11.18.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.feverGreaterThan38.severity"
            }
          } ],
          "linkId": "11.18.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.headache"
          }
        } ],
        "linkId": "11.19",
        "text": "Kopfschmerzen",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.headache.presence"
            }
          } ],
          "linkId": "11.19.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.headache.severity"
            }
          } ],
          "linkId": "11.19.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.hemoptysis"
          }
        } ],
        "linkId": "11.20",
        "text": "Bluthusten",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.hemoptysis.presence"
            }
          } ],
          "linkId": "11.20.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.hemoptysis.severity"
            }
          } ],
          "linkId": "11.20.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.indrawingOfRibsDuringRespiration"
          }
        } ],
        "linkId": "11.21",
        "text": "Hauteinziehungen des Brustkorbs bei der Einatmung",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.indrawingOfRibsDuringRespiration.presence"
            }
          } ],
          "linkId": "11.21.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.indrawingOfRibsDuringRespiration.severity"
            }
          } ],
          "linkId": "11.21.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.jointPain"
          }
        } ],
        "linkId": "11.22",
        "text": "Gelenkschmerz",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.jointPain.presence"
            }
          } ],
          "linkId": "11.22.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.jointPain.severity"
            }
          } ],
          "linkId": "11.22.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.lossOfAppetite"
          }
        } ],
        "linkId": "11.23",
        "text": "Appetitverlust",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.lossOfAppetite.presence"
            }
          } ],
          "linkId": "11.23.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.lossOfAppetite.severity"
            }
          } ],
          "linkId": "11.23.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.lossOfSenseOfSmell"
          }
        } ],
        "linkId": "11.24",
        "text": "Geruchverlust",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.lossOfSenseOfSmell.presence"
            }
          } ],
          "linkId": "11.24.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.lossOfSenseOfSmell.severity"
            }
          } ],
          "linkId": "11.24.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.lossOfTaste"
          }
        } ],
        "linkId": "11.25",
        "text": "Geschmackverlust",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.lossOfTaste.presence"
            }
          } ],
          "linkId": "11.25.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.lossOfTaste.severity"
            }
          } ],
          "linkId": "11.25.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.lymphadenopathy"
          }
        } ],
        "linkId": "11.26",
        "text": "Lymphadenopathie",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.lymphadenopathy.presence"
            }
          } ],
          "linkId": "11.26.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.lymphadenopathy.severity"
            }
          } ],
          "linkId": "11.26.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.malaise"
          }
        } ],
        "linkId": "11.27",
        "text": "Unwohlsein",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.malaise.presence"
            }
          } ],
          "linkId": "11.27.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.malaise.severity"
            }
          } ],
          "linkId": "11.27.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.musclePain"
          }
        } ],
        "linkId": "11.28",
        "text": "Muskelschmerzen",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.musclePain.presence"
            }
          } ],
          "linkId": "11.28.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.musclePain.severity"
            }
          } ],
          "linkId": "11.28.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.nasalCongestion"
          }
        } ],
        "linkId": "11.29",
        "text": "Verstopfte Nase",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.nasalCongestion.presence"
            }
          } ],
          "linkId": "11.29.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.nasalCongestion.severity"
            }
          } ],
          "linkId": "11.29.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.nasalDischarge"
          }
        } ],
        "linkId": "11.30",
        "text": "Laufende Nase",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.nasalDischarge.presence"
            }
          } ],
          "linkId": "11.30.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.nasalDischarge.severity"
            }
          } ],
          "linkId": "11.30.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.nausea"
          }
        } ],
        "linkId": "11.31",
        "text": "Übelkeit",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.nausea.presence"
            }
          } ],
          "linkId": "11.31.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.nausea.severity"
            }
          } ],
          "linkId": "11.31.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.pain"
          }
        } ],
        "linkId": "11.32",
        "text": "Schmerzen",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.pain.presence"
            }
          } ],
          "linkId": "11.32.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.pain.severity"
            }
          } ],
          "linkId": "11.32.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.painInThroat"
          }
        } ],
        "linkId": "11.33",
        "text": "Halsschmerzen",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.painInThroat.presence"
            }
          } ],
          "linkId": "11.33.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.painInThroat.severity"
            }
          } ],
          "linkId": "11.33.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.productiveCough"
          }
        } ],
        "linkId": "11.34",
        "text": "Produktiver Husten",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.productiveCough.presence"
            }
          } ],
          "linkId": "11.34.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.productiveCough.severity"
            }
          } ],
          "linkId": "11.34.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.rigor"
          }
        } ],
        "linkId": "11.35",
        "text": "Starre",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.rigor.presence"
            }
          } ],
          "linkId": "11.35.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.rigor.severity"
            }
          } ],
          "linkId": "11.35.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.seizure"
          }
        } ],
        "linkId": "11.36",
        "text": "Krampfanfall",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.seizure.presence"
            }
          } ],
          "linkId": "11.36.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.seizure.severity"
            }
          } ],
          "linkId": "11.36.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.skinUlcer"
          }
        } ],
        "linkId": "11.37",
        "text": "Hautgeschwüre",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.skinUlcer.presence"
            }
          } ],
          "linkId": "11.37.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.skinUlcer.severity"
            }
          } ],
          "linkId": "11.37.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.unableToWalk"
          }
        } ],
        "linkId": "11.38",
        "text": "Unfähig zu gehen",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.unableToWalk.presence"
            }
          } ],
          "linkId": "11.38.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.unableToWalk.severity"
            }
          } ],
          "linkId": "11.38.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.vomiting"
          }
        } ],
        "linkId": "11.39",
        "text": "Erbrechen",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.vomiting.presence"
            }
          } ],
          "linkId": "11.39.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.vomiting.severity"
            }
          } ],
          "linkId": "11.39.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "symptoms.wheezing"
          }
        } ],
        "linkId": "11.40",
        "text": "Keuchen",
        "type": "group",
        "item": [ {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.wheezing.presence"
            }
          } ],
          "linkId": "11.40.1",
          "type": "choice",
          "answerOption": [ {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "Y",
              "display": "Ja"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
              "code": "N",
              "display": "Nein"
            }
          }, {
            "valueCoding": {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "asked-unknown",
              "display": "Unbekannt"
            }
          } ]
        }, {
          "extension": [ {
            "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
            "valueCoding": {
              "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
              "version": "1.0",
              "code": "symptoms.wheezing.severity"
            }
          } ],
          "linkId": "11.40.2",
          "text": "severity",
          "type": "choice",
          "answerOption": [ {
            "valueString": "mild"
          }, {
            "valueString": "moderat"
          }, {
            "valueString": "schwer"
          }, {
            "valueString": "lebensbedrohlich"
          } ]
        } ]
      } ]
    }, {
      "extension": [ {
        "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
        "valueCoding": {
          "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
          "version": "1.0",
          "code": "therapy"
        }
      } ],
      "linkId": "12",
      "text": "therapy",
      "type": "group",
      "item": [ {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "therapy.apheresis"
          }
        } ],
        "linkId": "12.1",
        "definition": "https://www.netzwerk-universitaetsmedizin.de/fhir/StructureDefinition/apheresis",
        "text": "Apheresis",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "therapy.dialysisOrHemofiltration"
          }
        } ],
        "linkId": "12.2",
        "definition": "https://www.netzwerk-universitaetsmedizin.de/fhir/StructureDefinition/dialysis",
        "text": "Dialyse / Hämofiltration",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "therapy.ecmoTherapy"
          }
        } ],
        "linkId": "12.3",
        "definition": "https://www.netzwerk-universitaetsmedizin.de/fhir/StructureDefinition/extracorporeal-membrane-oxygenation",
        "text": "Extrakorporale Membranoxygenierung",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "therapy.isPatientInTheIntensiveCareUnit"
          }
        } ],
        "linkId": "12.4",
        "definition": "https://www.netzwerk-universitaetsmedizin.de/fhir/StructureDefinition/patient-in-icu",
        "text": "Liegt der Patient auf der Intensivstation?",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "therapy.pronePosition"
          }
        } ],
        "linkId": "12.5",
        "definition": "https://www.netzwerk-universitaetsmedizin.de/fhir/StructureDefinition/prone-position",
        "text": "Bauchlage",
        "type": "choice",
        "answerOption": [ {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "Y",
            "display": "Ja"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0136",
            "code": "N",
            "display": "Nein"
          }
        }, {
          "valueCoding": {
            "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
            "code": "asked-unknown",
            "display": "Unbekannt"
          }
        } ]
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "therapy.ventilationType"
          }
        } ],
        "linkId": "12.6",
        "text": "Bitte dokumentieren Sie die Beatmungstherapie",
        "type": "choice",
        "answerOption": [ {
          "valueString": "NASAL_HIGH_FLOW_OXYGEN"
        }, {
          "valueString": "NON_INVASIVE_VENTILATION"
        }, {
          "valueString": "INVASIVE_VENTILATION_OROTRACHEAL"
        }, {
          "valueString": "INVASIVE_VENTILATION_TRACHEOTOMY"
        }, {
          "valueString": "NO"
        }, {
          "valueString": "UNKNOWN"
        } ]
      } ]
    }, {
      "extension": [ {
        "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
        "valueCoding": {
          "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
          "version": "1.0",
          "code": "vitalSigns"
        }
      } ],
      "linkId": "13",
      "text": "vitalSigns",
      "type": "group",
      "item": [ {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "vitalSigns.FiO2"
          }
        } ],
        "linkId": "13.1",
        "text": "FiO2",
        "type": "decimal"
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "vitalSigns.SOFAScore"
          }
        } ],
        "linkId": "13.2",
        "text": "Sepsis-related organ failure assessment score",
        "type": "integer"
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "vitalSigns.bodyTemperature"
          }
        } ],
        "linkId": "13.3",
        "text": "Körpertemperatur",
        "type": "decimal"
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "vitalSigns.diastolicBloodPressure"
          }
        } ],
        "linkId": "13.4",
        "text": "Blutdruck diastolisch",
        "type": "decimal"
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "vitalSigns.heartRate"
          }
        } ],
        "linkId": "13.5",
        "text": "Herzfrequenz",
        "type": "decimal"
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "vitalSigns.pH"
          }
        } ],
        "linkId": "13.6",
        "text": "pH-Wert",
        "type": "decimal"
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "vitalSigns.paO2"
          }
        } ],
        "linkId": "13.7",
        "text": "Sauerstoffpartialdruck",
        "type": "decimal"
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "vitalSigns.pacCO2"
          }
        } ],
        "linkId": "13.8",
        "text": "Kohlendioxidpartialdruck",
        "type": "decimal"
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "vitalSigns.peripheralOxygenSaturation"
          }
        } ],
        "linkId": "13.9",
        "text": "Periphere Sauerstoffsättigung",
        "type": "decimal"
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "vitalSigns.respiratoryRate"
          }
        } ],
        "linkId": "13.10",
        "text": "Atemfrequenz",
        "type": "decimal"
      }, {
        "extension": [ {
          "url": "https://num-compass.science/fhir/StructureDefinition/CompassGeccoItem",
          "valueCoding": {
            "system": "https://num-compass.science/fhir/CodeSystem/CompassGeccoItem",
            "version": "1.0",
            "code": "vitalSigns.systolicyBloodPressure"
          }
        } ],
        "linkId": "13.11",
        "text": "Blutdruck systolisch",
        "type": "decimal"
      } ]
    } ]
  }