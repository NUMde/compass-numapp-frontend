
// (C) Copyright IBM Deutschland GmbH 2020.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { Component } from 'react'
import { ListItem } from 'react-native-elements'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

import config from '../../config/configProvider'
import Banner from '../../components/banner/banner'
import QuestionnaireModal from '../../components/modal/questionnaireModal'
import ScrollIndicatorWrapper from '../../components/scrollIndicatorWrapper/scrollIndicatorWrapper'

/***********************************************************************************************
component:
renders the survey screen
***********************************************************************************************/

class SurveyScreen extends Component {
	
	/**
	 * @param  {object}   props
	 * @param  {object}   props.actions holds actions for the component (./checkInActions.js)
	 * @param  {object}   props.navigation the navigation object provided by 'react-navigation'
	 * @param  {Array}	  props.categories array with an entry for each category 
	 * @param  {Function} props.exportAndUploadQuestionnaireResponse exports the questionnaire
	 * @param  {object}   props.questionnaireItemMap object holding every item from the questionnaire 
	 */
	constructor(props) {
		super(props)
	}

	// rendering
	/*-----------------------------------------------------------------------------------*/

	render() {
		return (
			<View style={{ ...localStyle.flexi, ...localStyle.wrapper }}>
				
				{/* render the top banner */}
				<Banner
					nav={this.props.navigation}
					title={config.text.survey.title}
				/>

				{/* the questionnaire modal */}
				<QuestionnaireModal {...this.props}></QuestionnaireModal>

				<ScrollIndicatorWrapper
					contentData={
						<View style={{ ...localStyle.flexi, ...localStyle.wrapper }}>
							
							{/* creates the list items for the categories */}
							{this.createListView()}

							{/* renders a send-button at the bottom if the questionnaire is completed */}
							<View style={localStyle.bottom}>
								{
									(this.props.questionnaireItemMap && this.props.questionnaireItemMap.done )
									&&
									(<TouchableOpacity
										accessibilityLabel={config.text.survey.send}
										accessibilityRole={config.text.accessibility.types.button}
										accessibilityHint={config.text.accessibility.questionnaire.sendHint}
										onPress={() => this.props.exportAndUploadQuestionnaireResponse()}
										style={{...localStyle.button, ...localStyle.buttonComplete}}
									>
										<Text style={localStyle.buttonLabel}>{config.text.survey.send}</Text>
									</TouchableOpacity>)
								}
							</View>
						</View>
					}
				/>
			</View>
		)
	}

	/**
	 * renders a list of level-1 questionnaire items (i.e. the main-categories) which - when clicked on - opens the questionnaireModal
	 * with the the sub-questions from that category loaded
	 */
	createListView = () => {
		if (this.props.categories)
			return (
				<View style={localStyle.wrapper}>
					
					{/* maps a listItem onto each category */}
					{this.props.categories.map((category, index) => (
						<ListItem 
							key={index}
							containerStyle={localStyle.listItemContainer}
							onPress={() => this.props.actions.showQuestionnaireModal(index)}
							accessibilityLabel={category.text}
							accessibilityRole={config.text.accessibility.types.button}
							accessibilityHint={config.text.accessibility.questionnaire.categoryCellHint +
								((!this.props.questionnaireItemMap[category.linkId].done && this.props.questionnaireItemMap[category.linkId].started)
								? config.text.accessibility.questionnaire.category + config.text.accessibility.questionnaire.notFinished
								: (!this.props.questionnaireItemMap[category.linkId].done && !this.props.questionnaireItemMap[category.linkId].started)
									? config.text.accessibility.questionnaire.category + config.text.accessibility.questionnaire.notStarted
									: (this.props.questionnaireItemMap[category.linkId].done)
										? config.text.accessibility.questionnaire.category + config.text.accessibility.questionnaire.finished
										: "") }
						>
							{/* title */}
							<ListItem.Content>
								<ListItem.Title style={localStyle.titleStyle}>
									{category.text}
								</ListItem.Title>
							</ListItem.Content>

							{/* started but not done yet */}
							{!this.props.questionnaireItemMap[category.linkId].done &&
								this.props.questionnaireItemMap[category.linkId].started && 
								(<ListItem.Chevron
									{
										...{
											type: 'material-community',
											name: 'dots-horizontal',
											color: config.theme.values.defaultSurveyIconTouchedColor,
											reverse: true,
											size: 12,
										}
									}
								/>
							)}

							{/* not started even started */}
							{!this.props.questionnaireItemMap[category.linkId].done &&
								!this.props.questionnaireItemMap[category.linkId].started && 
								(<ListItem.Chevron
									{
										...{
											type: 'material-community',
											name: 'pencil-outline',
											color: config.theme.values.defaultSurveyIconUntouchedColor,
											reverse: true,
											size: 12,
										}
									}
								/>
							)}

							{/* done */}
							{this.props.questionnaireItemMap[category.linkId].done && 
								(<ListItem.Chevron
									{
										...{
											type: 'material-community',
											name: 'check',
											color: config.theme.values.defaultSurveyIconCompletedColor,
											reverse: true,
											size: 12,
										}
									}
								/>
							)}
						</ListItem>
					))}
				</View>
			)
		return <View></View>
	}
}

/***********************************************************************************************
localStyle
***********************************************************************************************/

const localStyle = StyleSheet.create({
	wrapper: {
		flexDirection: 'column',
		backgroundColor: config.theme.values.defaultBackgroundColor
	},

	flexi: {
		flex: 1,
	},

	bottom: {
		flex: 1,
		justifyContent: 'flex-end',
		marginBottom: 36,
		height: '100%',
		marginTop: 20,
	},

	button: {
		...config.theme.classes.buttonPrimary,
		bottom: 0,
		marginTop: 10,
		width: '80%',		
		textAlign: 'center',
	},

	buttonComplete: {
		backgroundColor: config.theme.values.defaultSendQuestionnaireButtonBackgroundColor,
	},

	buttonLabel: {
		...config.theme.classes.buttonLabel
	},

	listItemContainer: {
		width: '100%',
		borderBottomColor: config.theme.colors.accent3,
		borderBottomWidth: 1,
		backgroundColor: config.theme.values.defaultSurveyItemBackgroundColor
	},

	titleStyle: {
		...config.theme.fonts.title2,
		color: config.theme.values.defaultSurveyItemTitleColor
	}
})


/***********************************************************************************************
export
***********************************************************************************************/

export default SurveyScreen
