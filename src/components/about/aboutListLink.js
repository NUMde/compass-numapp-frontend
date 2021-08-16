
// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import  React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { ListItem } from 'react-native-elements'

import config from '../../config/configProvider'

/***********************************************************************************************
component:
Renders a ListItem which will navigate to another screen when clicked on 
***********************************************************************************************/

class aboutListLink extends Component {

	/**
	* @param  {object}	props
	* @param  {object}	props.actions redux-actions of the currently active screen
	* @param  {object}  props.navigation the navigation object provided by 'react-navigation'
	* @param  {{
			title:string,
			subTitle: string,
			uri: string
		}}	props.webView holds the strings and the link to open in the webView
	*/
	constructor(props) {
		super(props)
	}

	// rendering
	/*-----------------------------------------------------------------------------------*/
	
	render() {
		return (
			<ListItem 
				containerStyle={localStyle.containerStyle}
				onPress={() => {
					this.props.actions.setCurrentWebView(this.props.webView)
					this.props.navigation.navigate("WebView")}}
			>
				{/* title & subtitle of the listItem - the strings a identified by the webView*/}
				<ListItem.Content>
					<ListItem.Title style={localStyle.title}>
						{this.props.webView.title}
					</ListItem.Title>

					{
						this.props.webView.subTitle 
						&& 
						(<ListItem.Subtitle style={localStyle.subTitle}>
							{this.props.webView.subTitle }
						</ListItem.Subtitle>)
					}
				</ListItem.Content>

				{/* the icon on the right-hand-side */}
				<ListItem.Chevron
					{
						...{
							type: this.props.webView.iconType,
							name: this.props.webView.iconTitle,
							color: config.theme.values.defaultListLinkIconColor,
							reverse: true,
							size: 12,
						}
					}
				/>
			</ListItem>
		)
	}
}

/***********************************************************************************************
local styling
***********************************************************************************************/

const localStyle = StyleSheet.create({
	
	containerStyle: {
		width: '100%',
		borderBottomColor: config.theme.colors.accent3,
		borderBottomWidth: 1,
		backgroundColor: config.theme.values.defaultListLinkBackgroundColor
	},

	subTitle: {
		color: config.theme.colors.accent4,
		...config.theme.fonts.body	
	},

	title: {
		...config.theme.fonts.title2
	}
})

/***********************************************************************************************
export
***********************************************************************************************/

export default aboutListLink
