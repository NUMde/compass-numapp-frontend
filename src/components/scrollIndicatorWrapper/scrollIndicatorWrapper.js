
// (C) Copyright IBM Deutschland GmbH 2020.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { Component } from 'react'
import { Icon } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AccessibilityInfo, StyleSheet, TouchableOpacity, View, Platform, Dimensions } from 'react-native'

import config from '../../config/configProvider'

/***********************************************************************************************
component
***********************************************************************************************/

export default class ScrollIndicatorWrapper extends Component {

	/**
	* adds a scroll-indicator button at the bottom of a ScrollView. this can be de-activated by
	* manipulating the property 'allowScrollIndicators' in src/config/developmentConfig.js
	* @constructor
	* @param  {object}      props
	* @param  {JSX.Element} props.contentData react-native content to be rendered
	*/
	constructor(props) {
		super(props)
		this.showIndicator = false
		this.scrollViewRef = React.createRef()
		// hides the accessibility indicator when voice over is activated
		AccessibilityInfo.isScreenReaderEnabled().then(
			screenReaderEnabled => {
				this.isAccessibilityOn = screenReaderEnabled
			}
		)
	}

	// public members
	/*-----------------------------------------------------------------------------------*/

	/**
	* used to persist the state of the indicator (show/no show)
	* @type {boolean}
	*/
	showIndicator

	/**
	* reference for the scrollView component
	* @type {object}
	*/
	scrollViewRef

	/**
	* tells us if the screen reader is enabled
	* @type {boolean}
	*/
	isAccessibilityOn

	/**
	* holds the position where to scroll next (when hitting the scrollIndicator-Button)
	* @type {number}
	*/
	nextScrollValue

	// rendering
	/*-----------------------------------------------------------------------------------*/

	render() {
		return (
			<View style={localStyle.wrapper}>
				{/* the regular ScrollView & content */}
				<KeyboardAwareScrollView
					{...this.props}
					enableOnAndroid={true}
					extraScrollHeight={100}
					ref={this.scrollViewRef}
					style={localStyle.wrapper}
					innerRef={ref => this.scroll = ref}
					contentContainerStyle={localStyle.contentContainerStyle}
					onScroll={(event) => {
						// calculating the next scroll-position
						let bannerHeight = Platform.OS === "ios" ? config.appConfig.scaleUiFkt(290, 0.7) : config.appConfig.scaleUiFkt(290, 0.6)
						let contentHeight = Dimensions.get('window').height - bannerHeight
						this.nextScrollValue = event.nativeEvent.contentOffset.y + contentHeight - localStyle.indicator.height - localStyle.indicator.bottom - 20
						
						// determines if the indicator should be displayed or not
						this.showIndicator =
						event.nativeEvent.layoutMeasurement.height < event.nativeEvent.contentSize.height &&
						event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height - event.nativeEvent.contentOffset.y > 30

						// applies the updates
						this.forceUpdate()
					}}
				>
					{/* the content */}
					{this.props.contentData}
				</KeyboardAwareScrollView>

				{/* if "allowScrollIndicators" is true and the situation calls for a scroll indicator ("showIndicator") and
				we are not in accessibility-mode */}
				{
					(config.theme.ui.allowScrollIndicators && this.showIndicator && !this.isAccessibilityOn )
					&& 
					(<TouchableOpacity
						accessibilityRole={config.text.accessibility.types.button}
						style={localStyle.indicator}
						onPress={()=>this.scroll.scrollTo({x: 0, y: this.nextScrollValue, animated: true})}
					>
						<Icon
							name='chevron-down'
							type='font-awesome'
							color={config.theme.values.defaultScrollIndicatorIconColor}
							size={15}
						/>
					</TouchableOpacity>)
				}
			</View>
		)
	}

	// class events
	/*-----------------------------------------------------------------------------------*/
	
	/**
	 * just executes the scroll-event after the component mounted (so that the indicator
	 * will be rendered)
	 */
	componentDidMount = () => this.scrollElement()

	// modal events
	/*-----------------------------------------------------------------------------------*/

	/**
	 * basically, a scroll-to-top function
	 */
	scrollElement() {
		window.requestAnimationFrame(() => {
			let node = this.scrollViewRef
			if (node !== undefined) {
				if (node.current) node.current.scrollToPosition(0,1)
			}
		})
	}
}

/***********************************************************************************************
localStyle
***********************************************************************************************/

const localStyle = StyleSheet.create({

	contentContainerStyle:{ 
		flexGrow: 1 
	},

	container: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'blue',
		overflow: 'hidden',
	},

	wrapper: {
		flex: 1,
		flexDirection: 'column',
		width: '100%',
	},

	indicator: {
		backgroundColor: config.theme.values.defaultScrollIndicatorBackgroundColor,
		width: config.appConfig.scaleUiFkt(75),
		height: config.appConfig.scaleUiFkt(75),
		position: 'absolute',
		borderRadius: 100,
		left: (Dimensions.get('window').width / 2) - (config.appConfig.scaleUiFkt(75) / 2),
		bottom: 20,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})
