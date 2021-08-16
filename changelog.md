**Changelog**
==========================================
**v1.0.23 (2021-07-22)**
---------------------------------------------------------------------------
* removed debug outputs
* removed typos
* corrected typo
* Merge pull request #30 from NUMde/update-open-choice .Updating Choice- and Ope-Choice Handling
* altered a phrase in the documentation
* Merge pull request #28 from NUMde/firebase-integration. Firebase integration

**v1.0.22 (2021-07-21)**
---------------------------------------------------------------------------
* added outputs to fcm-event-handlers to test push capabilites under iOS
* added another eventhandler

**v1.0.21 (2021-07-20)**
---------------------------------------------------------------------------
* added missing character '/' in appConfig.js
* added FCM token to redux output (also in cases when no update is necessary)

**v1.0.20 (2021-07-09)**
---------------------------------------------------------------------------
* updated example questionnaire
* removed test-button

**v1.0.19 (2021-07-08)**
---------------------------------------------------------------------------
* updated choice-handling
* log

**v1.0.18 (2021-07-06)**
---------------------------------------------------------------------------
* fixing bug from commit #19
* implementation of extension-questionnaire-hidden
* Merge branch 'main' of https://github.com/NUMde/compass-numapp-frontend (get changes from #27)
* Merge pull request #29 from mahvaezi/main. Support for FHIR extension-questionnaire-hidden

**v1.0.17 (2021-07-05)**
---------------------------------------------------------------------------
* Merge pull request #26 from mahvaezi/main
(Changing the behaviour of ios Datetimepicker to work like android's.)

**v1.0.16 (2021-07-01)**
---------------------------------------------------------------------------
* adjust the android Datetimepicker behaviour to work with changes from (the last commit)

**v1.0.15 (2021-06-30)**
---------------------------------------------------------------------------
* fix structure of question with slider extension
* change ios Datepicker to act like android's
* Merge branch 'main' of https://github.com/NUMde/compass-numapp-frontend

**v1.0.14 (2021-06-28)**
---------------------------------------------------------------------------
* Merge pull request #25 from NUMde/update-questionnaire-identifier
Identify Questionnaires by concatenation of URL and VERSION, instead of the TITLE

**v1.0.13 (2021-06-23)**
---------------------------------------------------------------------------
* Merge pull request #22 from NUMde/extend-extension-support
* Merge pull request #24 from mahvaezi/main
* updated extension used for low- and high-range-labels
* updated the information used to identify a specific questionnaire

**v1.0.12 (2021-06-20)**
---------------------------------------------------------------------------
* Add changelog
* forgot ,
* Merge branch 'NUMde:main' into main
* Merge with NUM/Main

**v1.0.11 (2021-06-17)**
---------------------------------------------------------------------------
* Merge branch 'main' into extend-extension-support

**v1.0.10 (2021-06-16)**
---------------------------------------------------------------------------
* subjectId instead of appId
* rename parameter appId to subjectId

**v1.0.9 (2021-06-14)**
---------------------------------------------------------------------------
* Update dependencies
* Minor code cleanup
* Minor code cleanup
* Merge pull request #21 from JohannesOehm/feature-answerOption-coding ,Adding support for Questionnaire.item.answerOption.valueCoding
* Merge branch 'PR--feature-answerOption-coding' into feature-answerOption-coding
* Minor fix concerning the use of regex expressions
* Fixed some comformity problems of the generated questionnaire response

**v1.0.8 (2021-06-09)**
---------------------------------------------------------------------------
* Merge pull request #18 from NUMde/fix-spelling
* Adjust name of path in docs

**v1.0.7 (2021-06-08)**
---------------------------------------------------------------------------
* Merge pull request #19 from JohannesOehm/bugfix-any-extension-creates-slider
,Fixing bug that every extension on a numeric type converts a input field into a slider.
* fix spelling errors


**v1.0.6 (2021-06-01)**
--------------------------------------------------------------------------
* Adding support for Questionnaire.item.answerOption.valueCoding, fixing a bug that answerOptions of type Integer are translated into strings in the QuestionnaireResponse

**v1.0.5 (2021-05-28)**
--------------------------------------------------------------------------
* Merge pull request #15 from NUMde/studyid_fix

**v1.0.4 (2021-05-27)**
--------------------------------------------------------------------------
* Updated parameter name
* Fixing bug that every extension on a numeric type converts a input field  into a slider.

**v1.0.3 (2021-05-18)**
------------------------------------------------------------------
* Merge pull request \#12 from NUMde\/extension_docu_adaptation
* Updated docs to reflect all supported extensions

**v1.0.2 (2021-05-11)**
-------------------------------------------------------------------
* \#9 updated property name from \"study_id\" into \"subjectId\"
* Updated relative links in the documentation
* Updated relative links in the documentation
* Updated relative links in the documentation
* Updated relative links in the documentation
* Updated relative links in documentation
* Merge pull request #11 from lenzch/remove-gcs-references
* Minor code cleanup
* Updated surveyScreen & package.json
* Updated push lib and documentation
* Updated package

**v1.0.1 (2021-05-10)**
--------------------------------------------------------------
* Updated dependencies

**v1.0.0 (2021-05-06)**
--------------------------------------------------------------
* Merge branch \'ut20210506\' into progressbar_test
* Merge branch \'fix/accessibility\' into ut20210506
* Updated npm packages
* Added parameter-options
* Minor code cleanup
* Minor code cleanup