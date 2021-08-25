
// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import React, { Component } from 'react'
import { WebView } from 'react-native-webview'
import { View, StyleSheet } from 'react-native'

import store from '../../store'
import config from '../../config/configProvider'
import Banner from '../../components/banner/banner'

/***********************************************************************************************
component:
renders the webView screen
***********************************************************************************************/

class WebViewScreen extends Component {
	
	/**
	* @constructor
	* @param  {object}    props
	* @param  {object}    props.navigation the navigation object provided by 'react-navigation'
	*/
	constructor(props) {
		super(props)
	}

	// rendering
	/*-----------------------------------------------------------------------------------*/
	
	render() {

		return(
			<View>
				<View style={localStyle.wrapper}>

					{/* banner */}
					<Banner
						nav={this.props.navigation}
						title={store.getState().About.currentWebView.title}
						subTitle={store.getState().About.currentWebView.screenSubTitle}
					/>

					{/* content */}
					<View style={{ ...localStyle.flexi, ...localStyle.wrapper }}>
						<WebView
							originWhitelist={['*']}
							source={{ uri: store.getState().About.currentWebView.uri }}
						/>
					</View>
				</View>
			</View>
		)
	}
}


/***********************************************************************************************
localStyle
***********************************************************************************************/

const localStyle = StyleSheet.create({
	wrapper: {
		height: '100%',
		flexDirection: 'column',
		backgroundColor: config.theme.values.defaultBackgroundColor
	},

	flexi: {
		flex: 1
	}
})

/***********************************************************************************************
export
***********************************************************************************************/

export default WebViewScreen
