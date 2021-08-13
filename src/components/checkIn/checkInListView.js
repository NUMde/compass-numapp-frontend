
// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import  React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { ListItem } from 'react-native-elements'

import config from '../../config/configProvider'

/***********************************************************************************************
component
***********************************************************************************************/

class CheckInListView extends Component {

    /**
    * renders a single ListItem which represents the current state of a loaded questionnaire. 
    * red for untouched, yellow for incomplete and green for completed questionnaires.
    * the state of the questionnaire also impacts wich icon will be rendered on the right-hand-side.
    * a click on the ListItem will navigate the user to the WebView-screen
    * @constructor
    * @param  {object}      props
    * @param  {object}      props.user holds the userdata
    * @param  {object}      props.navigation the navigation object provided by 'react-navigation'
    * @param  {object}      props.questionnaireItemMap object holding every item from the questionnaire
        (the linkId of the item is the key)
    * @param  {boolean}     props.firstTime true if the user never sent out the first 
    * @param  {boolean}     props.noNewQuestionnaireAvailableYet true if there is currently no questionnaire available
    * @param  {boolean}     props.categoriesLoaded true if the questionnaire is ready to be rendered
    * @param  {Function}    props.formatDateString formats a date string
    */
    constructor(props) {
        super(props)
    }

    // rendering
    /*-----------------------------------------------------------------------------------*/

    render() {
        return (
            <View style={localStyle.wrapper}>
                {/* if all categories are loaded AND there is a current questionnaire available render a single ListLink*/}
                {
                    (this.props.categoriesLoaded && !this.props.noNewQuestionnaireAvailableYet )
                    && 
                    (<ListItem 
                        containerStyle={{
                            ...localStyle.containerStyle,
                            // if the questionnaire is partially filled out render in yellow
                            ...(this.props.questionnaireItemMap && !this.props.questionnaireItemMap.done && this.props.questionnaireItemMap.started ? localStyle.containerTouched :
                                    // if the questionnaire is untouched render in red
                                    !this.props.questionnaireItemMap.done && !this.props.questionnaireItemMap.started ? localStyle.containerUntouched :
                                        // if the questionnaire is completed render in green
                                        localStyle.containerCompleted )
                        }}
                        onPress={() => this.props.navigation.navigate('Survey')}
                        accessibilityLabel={(this.props.firstTime ? config.text.survey.surveyTitleFirstTime : config.text.survey.surveyTitle) + ". " + (config.text.survey.surveySubTitle + this.props.formatDateString(new Date(this.props.user.due_date)))}
                        accessibilityRole={config.text.accessibility.types.button}
                        accessibilityHint={config.text.accessibility.questionnaire.questionnaireCellHint + 
                            ((this.props.questionnaireItemMap && !this.props.questionnaireItemMap.done && this.props.questionnaireItemMap.started) 
                            ? config.text.accessibility.questionnaire.questionnaire + config.text.accessibility.questionnaire.notFinished 
                            : (!this.props.questionnaireItemMap.done && !this.props.questionnaireItemMap.started)
                                ? config.text.accessibility.questionnaire.questionnaire + config.text.accessibility.questionnaire.notStarted 
                                : (this.props.questionnaireItemMap && this.props.questionnaireItemMap.done)
                                    ? config.text.accessibility.questionnaire.questionnaire + config.text.accessibility.questionnaire.finished 
                                    : "")}
                    >
                        <ListItem.Content>
                            {/* shows a special title for first-time-users or the regular title for all other users */}
                            <ListItem.Title style={localStyle.title}>
                                {this.props.firstTime ? config.text.survey.surveyTitleFirstTime : config.text.survey.surveyTitle}
                            </ListItem.Title>
    
                            {/* subtitle with formatted due date of the questionnaire */}
                            <ListItem.Subtitle style={localStyle.subTitle} >
                                {config.text.survey.surveySubTitle + this.props.formatDateString(new Date(this.props.user.due_date))}
                            </ListItem.Subtitle>
                        </ListItem.Content>
    
                        {/* renders the yellow icon if the questionnaire is partially completed */}
                        {
                            this.props.questionnaireItemMap && !this.props.questionnaireItemMap.done && this.props.questionnaireItemMap.started && 
                            (<ListItem.Chevron
                                {
                                    ...{
                                        type: 'material-community',
                                        name: 'dots-horizontal',
                                        color: config.theme.colors.secondary,
                                        size: 12,
                                        raised: true,
                                        containerStyle: {
                                            backgroundColor: config.theme.colors.white
                                        }
                                    }
                                }
                            />
                        )}
    
                        {/* renders the red icon if the questionnaire is untouched */}
                        {!this.props.questionnaireItemMap.done &&
                            !this.props.questionnaireItemMap.started && 
                            (<ListItem.Chevron
                                {
                                    ...{
                                        type: 'material-community',
                                        name: 'pencil-outline',
                                        color: config.theme.colors.alert,
                                        size: 12,
                                        raised: true,
                                        containerStyle: {
                                            backgroundColor: config.theme.colors.white
                                        }
                                    }
                                }
                            />
                        )}
    
                        {/* renders the green icon if the questionnaire is completed */}
                        {this.props.questionnaireItemMap && 
                            this.props.questionnaireItemMap.done && 
                            (<ListItem.Chevron
                                {
                                    ...{
                                        type: 'material-community',
                                        name: 'check',
                                        color: config.theme.colors.success,
                                        size: 12,
                                        raised: true,
                                        containerStyle: {
                                            backgroundColor: config.theme.colors.white
                                        }
                                    }
                                }
                            />
                        )}
                    </ListItem>)
                }
            </View>
        )
    }
}

/***********************************************************************************************
local styling
***********************************************************************************************/

// scaleUiFkt() (located in src/config/appConfig.js)
// will dynamically alter some sized based on the physical device-measurements.

const localStyle = StyleSheet.create({
	wrapper: {
        marginBottom: config.appConfig.scaleUiFkt(30),
    },
    
    containerStyle: {
        width: '100%',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        padding: config.appConfig.scaleUiFkt(30),
    },
    
    title: {
        ...config.theme.fonts.title2,
        color: config.theme.values.defaultCheckInListViewTitleColor
    },  

    subTitle: {
        color: config.theme.values.defaultCheckInListViewSubTitleColor,
        ...config.theme.fonts.body,
    },

    containerUntouched: {
        borderBottomColor: config.theme.values.defaultContainerUntouchedBorderColor,
        borderTopColor: config.theme.values.defaultContainerUntouchedBorderColor,
        backgroundColor: config.theme.values.defaultContainerUntouchedBackgroundColor,
    },

    containerTouched: {
        borderBottomColor: config.theme.values.defaultContainerTouchedBorderColor,
        borderTopColor: config.theme.values.defaultContainerTouchedBorderColor,
        backgroundColor: config.theme.values.defaultContainerTouchedBackgroundColor,
    },

    containerCompleted: {
        borderBottomColor: config.theme.values.defaultContainerCompletedBorderColor,
        borderTopColor: config.theme.values.defaultContainerCompletedBorderColor,
        backgroundColor: config.theme.values.defaultContainerCompletedBackgroundColor,
    }
})

/***********************************************************************************************
export
***********************************************************************************************/

export default CheckInListView
