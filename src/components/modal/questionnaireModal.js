
// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

// the code contained in this file is rendering the content (meaning the ui-elements) of 
// the modal that opens when an item on the survey screen is clicked on. the user-input 
// received by these ui-elements is persisted in the object "questionnaireItemMap", located
// in the checkIn state.

// the following terms are used in the comments in this file:

// item: 
// a single questionnaire item:
// https://www.hl7.org/fhir/questionnaire-definitions.html#Questionnaire.item

// categories: 
// all first level items with linkIds like "1" or "6" or "15"

// page: 
// a page is composed of all sub-items of a category that have 
// the identical value as the second position of their linkId. for example:
// all linkIds starting with "1.2" (and "1.2.1" and "1.2.1.1" and so on) will
// be considered a page

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { Component } from 'react'
import RNModal from 'react-native-modal'
import Slider from '@react-native-community/slider'
import DateTimePicker from '@react-native-community/datetimepicker'
import { CheckBox, Input, Icon, Button} from 'react-native-elements'
import { AccessibilityInfo, Text, View, StyleSheet, ScrollView, Platform, TouchableOpacity } from 'react-native'

import '../../typedef'
import exportService from '../../services/questionnaireAnalyzer/questionnaireAnalyzer'
import setAccessibilityResponder from '../../services/accessibility/setAccessbilityResponder'
import config from '../../config/configProvider'
import ProgressBar from '../../components/modal/progressbar'
import { Picker } from '@react-native-picker/picker'

/***********************************************************************************************
component:
renders the questionnaireModal and the contents of the questionnaire
***********************************************************************************************/

class QuestionnaireModal extends Component {

	/**
	* holds the current y-offset of the scrollView
	* @type {number}
	*/
	scrollOffset
	
	/**
	* reference for the scrollView component
	* @type {object}
	*/
	scrollViewRef

	/**
	* reference for the title-text component that is rendered
	* @type {object}
	*/
	modalTitleRef

	/**
	* tells us if the screen reader is enabled
	* @type {boolean}
	*/
	isAccessibilityOn = false

	/**
	* is used to preserve the information if the current page holds
	any item that needs to be displayed. if not, the next page of the 
	current category will be transitioned to (or the 
	modal will be closed if it is the last page.)
	* @type {boolean}
	*/
	currentPageNeedsRendering

	/**
	* tells us if the last page-navigation direction was forwards.
	* @type {boolean}
	*/
	lastPageNavigationWasForwards

	/**
	* @constructor
	* @param  {object}  props
	* @param  {object}  props.actions the redux actions of the parents state of this (checkInActions)
	* @param  {boolean} props.showDatePicker if true: shows the DatePicker
	* @param  {number}  props.currentPageIndex the index of the page of the current category that is 
	* @param  {QuestionnaireItem[]}	props.categories array with an entry for each category 
		displayed. a page is composed of all sub-items of a category that have the identical value as the 
		second position of their linkId. for example: all linkIds starting with "1.2" (and "1.2.1" and 
		"1.2.1.1" and so on) will be considered a page 
	* @param  {QuestionnaireItemMap} props.questionnaireItemMap holds a property for every item of the questionnaire 
		as well  as their current answer and rendering-state. also contains properties to indicate the state 
		of the whole questionnaire (like started, or done). if the properties of this object are updated 
		through an action then the ui will be refreshed directly afterwards
	* @param  {number}  props.currentCategoryIndex the index of the currently active category (that means 
		all first level items with linkIds like "1" or "6") also: categories must be of type "group"
	* @param  {boolean} props.showQuestionnaireModal if true: displays the QuestionnaireModal
	*/
	constructor(props) {
		
		super(props)

		// creating references
		this.scrollViewRef = React.createRef()
		this.modalTitleRef = React.createRef()

		// setting defaults
		this.scrollOffset = 0
		this.currentPageNeedsRendering = false
		this.lastPageNavigationWasForwards = true

		// check if accessibility-features are enabled
		AccessibilityInfo.isScreenReaderEnabled().then(
			screenReaderEnabled => {
				this.isAccessibilityOn = screenReaderEnabled
			}
		)
	}

	// rendering
	/*-----------------------------------------------------------------------------------*/

	/**
	 * renders the content based on the currently chose category
	 */
	render = () => {
		// if there is something to render
		if (typeof this.props.currentCategoryIndex === 'number') {
			return this.createFormContent()
		}
		// if not
		else {
			return <View></View>
		}
	}

	// class events
	/*-----------------------------------------------------------------------------------*/

	/**
	 * is invoked before rendering when new props or state are being received.
	 * basically it resets currentPageNeedsRendering
	 */
	shouldComponentUpdate = () => {
		this.currentPageNeedsRendering = false
		return true
	}

	/**
	 * is invoked immediately after updating occurs. this method is not called for the initial render.
	 * basically it resets currentPageNeedsRendering and scrolls back to the top.
	 */
	componentDidUpdate = () => {
		if (!this.currentPageNeedsRendering && this.props.showQuestionnaireModal) {
			this.props.actions.switchContent(
				this.lastPageNavigationWasForwards,
				this.props.categories[this.props.currentCategoryIndex].item.length,
				this.props.currentPageIndex
			)
			this.handleScrollTo({ y: 0, animated: false })
		}
	}

	componentDidMount() {
		setAccessibilityResponder(this.modalTitleRef)
	}

	// modal events
	/*-----------------------------------------------------------------------------------*/

	/**
	 * handles the scroll-event of the scrollView
	 * @param  {object} event scroll event 
	 */
	handleOnScroll = (event) => {
		// just sets the current scrollOffset
		this.scrollOffset = event.nativeEvent.contentOffset.y
	}

	/**
	 * @param  {{ y: number, animated: boolean }} element UI element that RNModal will scroll to (for example if the software-keyboard is shown)
	 */
	handleScrollTo = element => {
		// scrolls to the given element if the scrollView is currently active
		if (this.scrollViewRef.current) this.scrollViewRef.current.scrollTo({ ...element, animated: true })
	}

	// "getter"
	/*-----------------------------------------------------------------------------------*/

	/**
	 * when an item is of type choice or open-choice it has the attribute "answerOptions".
	 * the entries of that attribute contain the possible choices - and the titles of those
	 * choices are either provided by the attribute valueString ot valueInteger.
	 * this functions determines what is available an returns it.
	 * the title is then stripped of an id, should it be encoded in the string.
	 * for example "01# test-answer" becomes "test-answer".
	 * @param  {AnswerOption} item entry of an answerOption-entry.
	 */
	getItemTitle = item => {

		// default value
		let title = 'NO NAME FOUND'

		// sets the title in case of a valueCoding attribute
		if (item.valueCoding) title = item.valueCoding.display ?? item.valueCoding.code

		// get the string
		title = item.valueString || (item.valueInteger ? item.valueInteger.toString() : title)

		// splits it
		return title.split('#')[title.includes('# ') ? 1 : 0].trim()
	}

	/**
	 * is used to determine what kind of keyboard should be used
	 * @param  {QuestionnaireItem} item a questionnaire item (from props.categories)
	 */
	getKeyboardType = item => {
		switch (item.type) {
			// numpad for integers
			case 'integer':
				return 'number-pad'
			// decimalPad for decimals
			case 'decimal':
				return 'decimal-pad'			
			// and the rest
			default:
				return 'default'
		}
	}

	/**
	 * returns the second position of the linkId
	 * for example: return "2" if the linkId is "8.2.15"
	 * @param  {string} linkId linkId of an questionnaire-item
	 */
	getSecondIndexOfLinkId = linkId => {
		/**
		 * gets and returns the index of the character "." - occurrence defines which "." (the first or the second)
		 * @param  {number} occurrence the occurrence of the char "."
		 */
		let getPosition = (occurrence) => {
			return linkId.split('.', occurrence).join('.').length
		}
		// returns the middle index - the one between the two dots
		// (like the "15" in 308.15.33)
		return linkId.substring(getPosition(1) + 1, getPosition(2))
	}

	// visual calculations
	/*-----------------------------------------------------------------------------------*/

	/**
	 * determines the marginLeft-property for items in the questionnaireModal.
	 * (based on their linkId)
	 * @param  {string} linkId linkId of a questionnaire-item
	 */
	calculateIndent = linkId => {
		// the values and formula are empirical ones - they felt right
		let margin = (Math.round(linkId.split(".").length/2) - 2)
		return margin >= 1 ? margin * 38 : 0
	}

	/**
	 * determines the fontSize-property for items in the questionnaireModal.
	 * (based on their linkId)
	 * @param  {string} linkId linkId of a questionnaire-item
	 */
	calculateFontSize = linkId => {
		// the values and formula are empirical ones - they felt right
		return config.appConfig.scaleFontsFkt((18-((Math.round(linkId.split(".").length/2) - 1) +.5)))
	}

	/**
	 * determines the lineHeight-property for items in the questionnaireModal.
	 * (based on their linkId)
	 * @param  {string} linkId linkId of a questionnaire-item
	 */
	calculateLineHeight = linkId => {
		// the values and formula are empirical ones - they felt right
		return config.appConfig.scaleFontsFkt((18-((Math.round(linkId.split(".").length/2) - 1) +.5))+5)
	}

	// checking the state of the questionnaire / page
	/*-----------------------------------------------------------------------------------*/

	/**
	 * triggers a completion-check of the content of the current page.
	 * is used to determine the color of the button on the bottom of the modal.
	 */
	checkCurrentPageState = () => {
		return exportService.checkCompletionStateOfMultipleItems([
			this.props.categories[this.props.currentCategoryIndex].item[
				// the -1 is necessary as the indexes of the questionnaire-items start wit 1
				this.props.currentPageIndex - 1
			]
		],
		this.props)
	}
	
	/**
	 * checks the dependencies of a single item (presented through its "enableWhen" property).
	 * this basically tells us if the items needs to be rendered or if its answer should have
	 * an impact on the completion state of the whole questionnaire. also, sets the value
	 * "currentPageNeedsRendering"
	 * @param  {QuestionnaireItem} item questionnaire-item
	 */
	getRenderStatusOfItem = item => {
		// uses the checkDependenciesOfSingleItem-function from the export service
		let returnValue = exportService.checkDependenciesOfSingleItem(item)
		// if an item meets its dependencies it needs to be displayed
		if (returnValue) this.currentPageNeedsRendering = true

		return returnValue
	}

	/**
	 * compares two different valueCoding Objects
	 */
	compareCoding = (val1, val2) => {
		
		if (val1 && val2) return val1.system === val2.system && val1.code === val2.code

		return false
	}

	// creating questionnaire items
	/*-----------------------------------------------------------------------------------*/

	/**
	 * renders a choice-type ui-element (if its dependencies check out)
	 * supports the drop-down extension (without repeat)
	 * @param  {QuestionnaireItem} item questionnaire item
	 */
	createChoices = item => {
		// checks the dependencies of the item and renders it (if the dependencies check out)
		return this.getRenderStatusOfItem(item) ? (

			<View>
				{/* title */}
				<Text 
					accessibilityLabel={item.text}
					accessibilityHint={config.text.accessibility.questionnaire.singleChoice}
					style={{...localStyle.contentTitle, marginLeft: this.calculateIndent(item.linkId), fontSize: this.calculateFontSize(item.linkId), lineHeight: this.calculateLineHeight(item.linkId)}}>
						{item.text}
				</Text>

				{/* checks if the drop-down extension is available. */}
				{/* if yes, it will render it. */}
				{/* if not, the default way is chosen. */}
				{ 
					item.extension && 
					item.extension[0].valueCodeableConcept && 
					item.extension[0].valueCodeableConcept.coding &&
					item.extension[0].valueCodeableConcept.coding[0].code === "drop-down" ? 
					(
						<View>
							{/* renders the drop-down */}
							<Picker
								selectedValue={this.props.questionnaireItemMap[item.linkId].answer}
								onValueChange={value => {this.props.actions.setAnswer({linkId: item.linkId, answer: value})}}
							>
								{item.answerOption.map((answerOption, index) => {
									return <Picker.Item
										label={answerOption.valueString}
										value={answerOption.valueString}
										key={index}
									/>
								})}
							</Picker>
						</View>
					) 
					:
					(
						<View>
							{/* repeat: false */}
							{!item.repeats && (
								<View>
									{/* renders a list of answers */}
									{item.answerOption.map((answerOption, index) => {
										return !answerOption.isOpenQuestionAnswer && (
											<CheckBox
												uncheckedIcon='circle-o'
												checkedIcon='dot-circle-o'
												key={`${item.linkId}.a_${index}`}
												textStyle={localStyle.choiceText}
												title={this.getItemTitle(answerOption)}
												checkedColor={config.theme.colors.primary}
												uncheckedColor={config.theme.colors.accent1}
												containerStyle={{...localStyle.choice, marginLeft: this.calculateIndent(item.linkId)}}
												onPress={() =>
													{
														this.props.actions.setAnswer({
															linkId: item.linkId,
															answer: answerOption.valueCoding || answerOption.valueString || answerOption.valueInteger,
														})
														
														this.removeOpenAnswer(item)
													}
												}
												onIconPress={() =>
													{
														this.props.actions.setAnswer({
															linkId: item.linkId,
															answer: answerOption.valueCoding || answerOption.valueString || answerOption.valueInteger,
														})
														
														this.removeOpenAnswer(item)
													}
												}
												checked={
													this.compareCoding(exportService.getCorrectlyFormattedAnswer(this.props.questionnaireItemMap[item.linkId]), answerOption.valueCoding) ||
													exportService.getCorrectlyFormattedAnswer(this.props.questionnaireItemMap[item.linkId]) === answerOption.valueString ||
													exportService.getCorrectlyFormattedAnswer(this.props.questionnaireItemMap[item.linkId]) === answerOption.valueInteger
												}									
											/>
										)
									})}
								</View>	
							)}

							{/* repeat: true */}
							{item.repeats && (
								<View>
									{item.answerOption.map((answerOption, index) => {
										return !answerOption.isOpenQuestionAnswer && (
											<CheckBox
											title={this.getItemTitle(answerOption)}
											checkedColor={config.theme.colors.primary}
											uncheckedColor={config.theme.colors.accent1}
											onPress={() =>
												{
													this.props.actions.setAnswer({
														linkId: item.linkId,
														answer: answerOption.valueCoding || answerOption.valueString || answerOption.valueInteger,
														openAnswer: true,
													})
												}
											}
											onIconPress={() =>
												{
													this.props.actions.setAnswer({
														linkId: item.linkId,
														answer: answerOption.valueCoding || answerOption.valueString || answerOption.valueInteger,
														openAnswer: true,
													})
												}
											}
											checked={
												(this.props.questionnaireItemMap[item.linkId].answer && answerOption.valueCoding && this.props.questionnaireItemMap[item.linkId].answer.some( c => c.code === answerOption.valueCoding.code && c.system === answerOption.valueCoding.system ))
												||
												(this.props.questionnaireItemMap[item.linkId].answer && this.props.questionnaireItemMap[item.linkId].answer.includes( answerOption.valueString ))
												||
												(this.props.questionnaireItemMap[item.linkId].answer && this.props.questionnaireItemMap[item.linkId].answer.includes( answerOption.valueInteger ))
											}
											key={`${item.linkId}.a_${index}`}
											containerStyle={{...localStyle.choice, marginLeft: this.calculateIndent(item.linkId)}}
											textStyle={localStyle.choiceText}
										/>)
									})}
								</View>	
							)}

							{/* if type: 'open-choice' */}
							{item.type === "open-choice" && (
								<Input
									placeholder={item.repeats ? config.text.survey.additionalAnswer : config.text.survey.alternativeAnswer}
									value = {this.procureOpenAnswer(item)}
									accessibilityHint={config.text.accessibility.questionnaire.textFieldHint}
									onChangeText={(text) =>
										{	
											// sets the answer
											this.props.actions.setAnswer({
												linkId: item.linkId,
												answer: text,
												isOpenAnswer: true,
												isAdditionalAnswer: item.repeats
											})
										}
									}
								/>		
							)}
						</View>
					) 
				}
			</View>
		) : null
	}

	removeOpenAnswer = item => {
		if(item.type !== 'open-choice') return
		let a = this.props.questionnaireItemMap[item.linkId].answerOption.filter(e => e.isOpenQuestionAnswer)[0]
		a.answer = null
	}

	procureOpenAnswer = item => {
		if(item.type !== 'open-choice') return
		return this.props.questionnaireItemMap[item.linkId].answerOption.filter(e => e.isOpenQuestionAnswer)[0].answer
	}

	checkIfOpenAnswerWasChosen = (item) => {

		let answer = this.props.questionnaireItemMap[item.linkId].answer

		this.props.questionnaireItemMap[item.linkId].answerOption.some(
			e => {
				return e.valueString === answer || e.valueInteger === answer || e.valueDecimal === answer || e.valueDate === answer
			}
		)
	}

	/**
	 * renders an open-choice-type ui-element (if its dependencies check out)
	 * @param  {QuestionnaireItem} item questionnaire item
	 */
	createOpenChoices = item => {	
		// checks the dependencies of the item and renders it (if the dependencies check out)
		return this.getRenderStatusOfItem(item) ? (
			<View>
				{/* title */}
				<Text 
					accessibilityLabel={item.text}
					accessibilityHint={config.text.accessibility.questionnaire.multipleChoice}
					style={{...localStyle.contentTitle, fontSize: this.calculateFontSize(item.linkId), marginLeft: this.calculateIndent(item.linkId) ,lineHeight: this.calculateLineHeight(item.linkId)}}>
						{item.text}
				</Text>

				{/* renders all answerOptions */}
				<View>
					{item.answerOption.map((answerOption, index) => {
						return (
							<CheckBox
								title={this.getItemTitle(answerOption)}
								checkedColor={config.theme.colors.primary}
								uncheckedColor={config.theme.colors.accent1}
								onPress={() =>
									this.props.actions.setAnswer({
										linkId: item.linkId,
										answer: answerOption.valueCoding || answerOption.valueString || answerOption.valueInteger,
										openAnswer: true,
									})
								}
								onIconPress={() =>
									this.props.actions.setAnswer({
										linkId: item.linkId,
										answer: answerOption.valueCoding || answerOption.valueString || answerOption.valueInteger,
										openAnswer: true,
									})
								}
								checked={
									(this.props.questionnaireItemMap[item.linkId].answer && answerOption.valueCoding && this.props.questionnaireItemMap[item.linkId].answer.some( c => c.code === answerOption.valueCoding.code && c.system === answerOption.valueCoding.system ))
									||
									(this.props.questionnaireItemMap[item.linkId].answer && this.props.questionnaireItemMap[item.linkId].answer.includes( answerOption.valueString ))
									||
									(this.props.questionnaireItemMap[item.linkId].answer && this.props.questionnaireItemMap[item.linkId].answer.includes( answerOption.valueInteger ))
								}
								key={`${item.linkId}.a_${index}`}
								containerStyle={{...localStyle.choice, marginLeft: this.calculateIndent(item.linkId)}}
								textStyle={localStyle.choiceText}
							/>
						)
					})}
				</View>
			</View>
		) : null
	}

	/**
	 * renders a boolean-type ui-element (if its dependencies check out)
	 * @param  {QuestionnaireItem} item questionnaire item
	 */
	createBoolean = item => {
		// checks the dependencies of the item and renders it (if the dependencies check out)
		return this.getRenderStatusOfItem(item) ? (
			<View>
				<CheckBox
					title={item.text}
					checkedColor={config.theme.colors.primary}
					uncheckedColor={config.theme.colors.accent1}
					checked={this.props.questionnaireItemMap[item.linkId].answer}
					onPress={() =>
						this.props.actions.setAnswer({
							linkId: item.linkId,
							answer:
								exportService.getCorrectlyFormattedAnswer(this.props.questionnaireItemMap[item.linkId]) === null
									? true
									: !this.props.questionnaireItemMap[item.linkId].answer,
						})
					}
					onIconPress={() =>
						this.props.actions.setAnswer({
							linkId: item.linkId,
							answer:
							exportService.getCorrectlyFormattedAnswer(this.props.questionnaireItemMap[item.linkId]) === null
									? true
									: !this.props.questionnaireItemMap[item.linkId].answer,
						})
					}
					key={`${item.linkId}`}
					containerStyle={{...localStyle.choice, marginLeft: this.calculateIndent(item.linkId)}}
					textStyle={localStyle.choiceText}
				/>
			</View>
		) : (
			true
		)
	}

	/**
	 * renders an input-type ui-element (if its dependencies check out)
	 * @param  {QuestionnaireItem} item questionnaire item
	 */
	createInput = item => {
		// checks the dependencies of the item and renders it (if the dependencies check out)
		return this.getRenderStatusOfItem(item) ? (
			<View style={localStyle.modalInput}>
				{/* title */}
				<Text style={{...localStyle.contentTitle}}>{item.text}</Text>

				{/* input */}
				<Input
					placeholder={config.text.login.inputPlaceholder}
					value={this.props.questionnaireItemMap[item.linkId].answer}
					keyboardType={this.getKeyboardType(item)}
					maxLength = {item.maxLength || null}
					// accessibilityLabel={ }
					accessibilityHint={config.text.accessibility.questionnaire.textFieldHint}
					onChangeText={(text) =>
						{
							// filters anything that is not a number
							if (item.type === 'integer') {
								text = text
									.split('')
									.filter((a => Number(a) || a === '0'))
									.join('') 	
							}
							// only allows decimals
							if(item.type === 'decimal') {
								text = text
								.split('')
								.filter((a => Number(a) || a === '0' || a === '.' || a === ','))
								.join('')
								.replace(',','.')

								let split = text.split('.')
								if(split.length - 1 > 1) text = split[0] + '.' + split[1]
								if(text === '.') text = ''
							}	
							// sets the answer
							this.props.actions.setAnswer({
								linkId: item.linkId,
								answer: text,
							})
						}
					}
				/>
			</View>
		) : null
	}

	/**
	 * renders a datePicker-type ui-element (if its dependencies check out)
	 * @param  {QuestionnaireItem} item questionnaire item
	 */
	createDatePicker = item => {
		// checks the dependencies of the item and renders it (if the dependencies check out)
		return this.getRenderStatusOfItem(item) ? (
			<View style={localStyle.modalInput}>
				
				{/* title */}
				<Text style={{...localStyle.contentTitle}}>{item.text}</Text>

				{/* android datepicker */}
				{(
					<TouchableOpacity 
						onPress={this.props.actions.showDatePicker} 
						// accessibilityLabel={ }
						// accessibilityRole={config.text.accessibility.types.button} 
						// accessibilityHint={config.text.accessibility.questionnaire.dateFieldHint}
						>
						<Input
							placeholder={config.text.login.inputPlaceholderTime}
							value={this.props.questionnaireItemMap[item.linkId].answer ? exportService.getFormattedDate(this.props.questionnaireItemMap[item.linkId].answer.toString(), true) : null}
							editable={false}
							leftIcon={{ type: 'font-awesome', name: 'calendar' }}
							pointerEvents="none"
						/>
					</TouchableOpacity>
				)}

				{(this.props.showDatePicker ) && (
					<DateTimePicker
						value={this.props.questionnaireItemMap[item.linkId].answer || new Date()}
						mode='date'
						locale='de-de'
						display='spinner'
						onChange={(event, date) => {
							this.props.actions.setAnswer({ linkId: item.linkId, answer: date, showDatePicker:
								Platform.OS === "ios" ? true : false})
							}
						}
					/>
				)}
				{/* ios datepicker- Buttons*/}
				{(Platform.OS === "ios") && (this.props.showDatePicker ) && (
					<View style={localStyle.dateTimePickerButtonBar}>
						<Button title = {config.text.generic.abort}
							onPress = {() => {
								this.props.actions.setAnswer({ linkId: item.linkId, answer: "", showDatePicker: false})
							}}
							style = {localStyle.dateTimePickerButton}
							type = "clear"
							titleStyle ={{color: config.theme.colors.accent4}}
						/>
						<Button title = {config.text.generic.ok} color= {config.theme.colors.secondary}
							onPress = {() => {
								const selectedDate = this.props.questionnaireItemMap[item.linkId].answer|| new Date()
								this.props.actions.setAnswer({ linkId: item.linkId, answer: selectedDate, showDatePicker:false })
							}}
							type = "clear"
							titleStyle ={{color: config.theme.colors.accent4}}
						/>
					</View>
				)}
				
			</View>
		) : null
	}

	/**
	 * renders a slider-type ui-element (if its dependencies check out)
	 * @param  {QuestionnaireItem} item questionnaire item
	 */
	createSlider = item => {
		
		// creates the default slider-object
		let sliderProperties = Object.create({
			'questionnaire-sliderStepVal' : 1,
			'minValue' : 2,
			'maxValue' : 300,
			'HighRangeLabel' : '',
			'LowRangeLabel' : ''
		})

		// gets the slider properties from the extension-attribute and feeds it to the
		// sliderProperties Object
		item.extension.forEach(extension => {
			let propertyName = extension.url.slice(extension.url.lastIndexOf('/')+1, extension.url.length)
			sliderProperties[propertyName] = extension.valueString || extension.valueInteger
		})

		// checks the dependencies of the item and renders it (if the dependencies check out)
		return this.getRenderStatusOfItem(item) ? (
			<View style={localStyle.modalInput}>
				<Text style={{...localStyle.contentTitle}}>{item.text}</Text>
				<Slider
					step={sliderProperties['questionnaire-sliderStepValue']}
					minimumValue={sliderProperties['minValue']}
					maximumValue={sliderProperties['maxValue']}
					minimumTrackTintColor={config.theme.colors.primary}
					maximumTrackTintColor={config.theme.colors.primary}
					accessibilityHint={sliderProperties['minValue'] + config.text.accessibility.questionnaire.sliderFieldEquals + 
										sliderProperties['LowRangeLabel'] + config.text.accessibility.questionnaire.sliderFieldAnd + 
										sliderProperties['maxValue'] + config.text.accessibility.questionnaire.sliderFieldEquals + 
										sliderProperties['HighRangeLabel']}
					onSlidingComplete={(value) => {
							this.props.actions.setAnswer({
								linkId: item.linkId,
								answer: value,
							})
						}
					}
					value={typeof this.props.questionnaireItemMap[item.linkId].answer === 'number' ? this.props.questionnaireItemMap[item.linkId].answer : ((sliderProperties['minValue']+sliderProperties['maxValue'])/2)}
        		/>
				<View style={localStyle.sliderLabel}>
					<Text style={localStyle.sliderTextMin}>{sliderProperties['LowRangeLabel']}</Text>
					<Text style={localStyle.sliderTextMax}>{sliderProperties['HighRangeLabel']}</Text>
                </View>
			</View>
		) : null
	}

	/**
	 * decides what ui-elements needs to be rendered (based on the type of an item)
	 * @param  {QuestionnaireItem} item questionnaire item
	 */
	createUIElement = item => {
		switch (item.type) {
			// creates regular inputs for strings
			case 'string':
				return this.createInput(item)

			// creates a radio-item
			case 'choice':
			case 'open-choice':
				return this.createChoices(item)

			// creates a checkbox
			case 'boolean':
				return this.createBoolean(item)

			// creates a date input
			case 'date':
				return this.createDatePicker(item)

			// creates a group of checkboxes, at least one must be checked
			// case 'open-choice':
			// 	return this.createOpenChoices(item)

			// creates the inputs for decimals and integers (and numerical sliders)
			// this also utilizes the decimal-pad or the num-pad
			case 'integer':		
			case 'decimal':
				let itemControlExtension = item?.extension?.find(e => e.url === "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl")
				let isSlider = itemControlExtension?.valueCodeableConcept?.coding?.find(c => c.system === "http://hl7.org/fhir/questionnaire-item-control" && c.code === "slider")
				return isSlider ? this.createSlider(item) : this.createInput(item)

			// if nothing else matches - display the title if at least the dependencies check out
			default:
				// checks the dependencies of the item and renders it (if the dependencies check out)
				return this.getRenderStatusOfItem(item) ? (
					<Text style={{...localStyle.contentTitle, fontSize: this.calculateFontSize(item.linkId), lineHeight: this.calculateLineHeight(item.linkId),  marginLeft: this.calculateIndent(item.linkId)}}>{item.text}</Text>
				) : null

		}
	}

	/**
	 * iterates over a an array of items and creates a view-component that wraps the item and 
	 * its sub-items (if the sub-items are to be rendered)
	 * @param  {QuestionnaireItem[]} items
	 */
	createItemView = items => {

		// filters the items so that only the ones with an actual title are displayed
		const filteredItems = items.filter((cat) => {
			return (cat.text && cat.text.length != 0)
		})

		// iterates over all filtered questionnaire items
		return filteredItems.map( item =>
			{
				// if the second number in the linkId matches the currentPageIndex:
				// renders the UI Element and then creates another sub-view for the sub-items (if applicable)
				return (this.getSecondIndexOfLinkId(item.linkId) === this.props.currentPageIndex.toString() && (
				<View key={item.linkId}>
					{this.createUIElement(item)}
					{item.item && this.createItemView(item.item)}
				</View>
			))}
		)
	}

	/**
	 * creates the wrapper view and also renders the title of the current modal-page.
	 * triggers createItemView()
	 */
	createModalContent = () => {
		return (
			<View style={localStyle.content}>
				<ScrollView
					ref={this.scrollViewRef}
					onScroll={this.handleOnScroll}
					scrollEventThrottle={16}
				>
					<View style={localStyle.modalViewWrapper}>
						<View>
							<Text style={localStyle.modalTitle} ref={this.modalTitleRef} accessibilityRole={config.text.accessibility.types.header}>
								{`${this.props.categories[this.props.currentCategoryIndex].text}`}
							</Text>
						</View>
						{this.createItemView(
							this.props.categories[this.props.currentCategoryIndex].item
						)}
					</View>
				</ScrollView>
			</View>
		)
	}

	/**
	 * creates the bottom-navigation-bar of the modal
	 */
	createBottomBar = () => {
		return (
			<View style={config.appConfig.useProgressBar ? localStyle.bottomBarWrapper : localStyle.bottomBarWrapperWithShadow}>

				{config.appConfig.useProgressBar && (
					<ProgressBar
            		progress={config.appConfig.useStrictModeProgressBar ? exportService.calculatePageProgress(this.props) : this.props.currentPageIndex /
						this.props.categories[this.props.currentCategoryIndex].item.length
            		}
          		/>
				)}
				
				<View style={localStyle.bottomBarButtons}>
				{/* the left navigational button if we're not on page 1 */}
				{this.props.currentPageIndex > 1 && (
					<Button
						type='clear'
						accessibilityLabel={config.text.accessibility.back}
						accessibilityRole={config.text.accessibility.types.button}
						accessibilityHint={config.text.accessibility.questionnaire.leftButtonHint}
						onPress={() => {
							setAccessibilityResponder(this.modalTitleRef)
							this.lastPageNavigationWasForwards = false
							this.alreadyScrolledUpAfterReloading = false
							this.props.actions.switchContent(false)
						}}
						style={localStyle.modalPaginationButton}
						icon={
							<Icon
								name='arrow-left'
								type='material-community'
								color={config.theme.colors.accent4}
							/>
						}
					/>
				)}

				{/* placeholder for the button on the left side if we're on page 1 */}
				{this.props.currentPageIndex === 1 && (
					<View
						style={{
							...localStyle.modalPaginationButton,
							...localStyle.modalPaginationButtonLeft,
						}}
					/>
				)}

				{/* the confirmation button in the middle - its color depends on checkCurrentPageState() */}
				<Button
					type='clear'
					accessibilityLabel={
						this.checkCurrentPageState()
							? config.text.accessibility.questionnaire.middleButtonFinished 
							: config.text.accessibility.questionnaire.middleButtonUnfinished
					}
					accessibilityRole={config.text.accessibility.types.button}
					accessibilityHint={config.text.accessibility.questionnaire.middleButtonHint}
					onPress={() => {
						setAccessibilityResponder(this.modalTitleRef)
						this.lastPageNavigationWasForwards = true
						this.alreadyScrolledUpAfterReloading = false
						this.props.actions.switchContent(
							true,
							this.props.categories[this.props.currentCategoryIndex].item.length,
							this.props.currentPageIndex
						)
					}}
					icon={
						<Icon
							name='check'
							reverse={true}
							type='material-community'
							color={
								this.checkCurrentPageState() ? config.theme.colors.success : config.theme.colors.accent4
							}
						/>
					}
				/>

				{/* navigational button on the right side - if we're not the last page 
					accessibility: if VoiceOver/TalkBalk is on, we use this button for the closing mechanism,
					as the middle button can be used to go to the next page. */}
				{this.props.currentPageIndex <
					this.props.categories[this.props.currentCategoryIndex].item.length && (
					<Button
						type='clear'
						accessibilityLabel={config.text.accessibility.close}
						accessibilityRole={config.text.accessibility.types.button}
						accessibilityHint={config.text.accessibility.questionnaire.rightButtonHint}
						onPress={() => {
							if (!this.isAccessibilityOn) {
								setAccessibilityResponder(this.modalTitleRef)
								this.alreadyScrolledUpAfterReloading = false
								this.lastPageNavigationWasForwards = true
								this.props.actions.switchContent(true)
							
							} else {
								// when accessibility features are enabled, user should be able to close modal with this button
								this.props.actions.hideQuestionnaireModal()
							}
						}}
						style={localStyle.modalPaginationButton}
						icon={
							<Icon
								name={this.isAccessibilityOn ? 'close' : 'arrow-right'}
								type='material-community'
								color={config.theme.colors.accent4}
							/>
						}
					/>
				)}

				{/* placeholder in for the button on the right side - if we're on the last page */}
				{this.props.currentPageIndex ===
					this.props.categories[this.props.currentCategoryIndex].item.length && (
					<View
						style={{
							...localStyle.modalPaginationButton,
							...localStyle.modalPaginationButtonRight,
						}}
					/>
				)}
				</View>
			</View>
		)
	}

	/**
	 * creates the modal itself if categories are loaded
	 */
	createFormContent = () => {
		return (
			<View>
				{this.props.categories && (
					<RNModal
					scrollOffsetMax={50}
					avoidKeyboard={true}
					propagateSwipe={true}
					backdropOpacity= {0.9}
					style={localStyle.modal}
					swipeDirection={['down']}
					scrollTo={this.handleScrollTo}
					scrollOffset={this.scrollOffset}
					isVisible={this.props.showQuestionnaireModal}
					onBackdropPress={this.props.actions.hideQuestionnaireModal}
					onSwipeComplete={this.props.actions.hideQuestionnaireModal}
					onBackButtonPress={this.props.actions.hideQuestionnaireModal}
					onModalWillHide={() => exportService.checkCompletionStateOfMultipleItems(null, this.props)}
					>
						{/* renders the content of the page */}
						{this.createModalContent()}

						{/* renders the bottom bar */}
						{this.createBottomBar()}
					</RNModal>
				)}
			</View>
		)
	}	
}

/***********************************************************************************************
styles
***********************************************************************************************/

const localStyle = StyleSheet.create({

	modal: {
		justifyContent: 'flex-end',
		marginLeft: 0,
		marginRight: 0,
		marginBottom: 0,
		marginTop: 20,
		borderRadius: 10,
	},

	content: {
		backgroundColor: config.theme.values.defaultModalContentBackgroundColor,
		paddingLeft: 20,
		paddingRight: 20,
		height: 'auto',
		maxHeight: '90%',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},

	contentTitle: {
		marginTop: 5,
		marginBottom: 5,
		...config.theme.fonts.header2,
		color: config.theme.values.defaultModalTitleColor
	},

	modalViewWrapper: {
		paddingTop: 20,
		paddingBottom: 20
	},

	choice: {
		backgroundColor: 'transparent',
		borderColor: "transparent",
		paddingLeft: 0,
		paddingRight: 0,
		margin: 0
	},

	choiceText: {
		margin: 0,
		padding: 0,
		...config.theme.fonts.label,
		color: config.theme.values.defaultModalContentTextColor
	},

	bottomBarWrapper: {
		backgroundColor: config.theme.values.defaultModalBottomBarBackgroundColor
	},

	bottomBarWrapperWithShadow: {
		backgroundColor: config.theme.values.defaultModalBottomBarBackgroundColor,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2
	},

	bottomBarButtons: {
		flexWrap: "nowrap",
		alignItems: "center",
		textAlign: "center",
		flexDirection: "row",
		justifyContent: "space-between",
	},

	modalTitle: {
		fontSize: 24,
		marginBottom: 5,
		...config.theme.fonts.title,
		color: config.theme.values.defaultModalTitleColor
	},

	modalInput: {
		marginBottom: 10
	},

	modalPaginationButton: {
		width: 44,
		height: 44,
	},

	modalPaginationButtonLeft: {
		position: 'relative'
	},

	modalPaginationButtonRight: {
		position: 'relative'
	},

	separator: {
		height: 1,
		backgroundColor: config.theme.values.defaultSeparatorColor
	},

	sliderTextMax: {
		width: '33%',
		textAlign: 'right'
	},

	sliderTextMin: {
		width: '33%',
		textAlign: 'left'
	},

    sliderLabel: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between'
    },
	dateTimePickerButtonBar: {
		flexWrap: "nowrap",
		textAlign: "center",
		flexDirection: "row",
		justifyContent: "flex-end",
		backgroundColor: 'transparent',
		paddingRight: 20,
	  },
	  dateTimePickerButton: {
		paddingRight: 40,
	  },

})

/***********************************************************************************************
export
***********************************************************************************************/

export default QuestionnaireModal