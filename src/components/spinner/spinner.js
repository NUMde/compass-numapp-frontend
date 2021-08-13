
// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
import
***********************************************************************************************/

import * as React from 'react';
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native'

import config from '../../config/configProvider'

/***********************************************************************************************
component:
displays a fullscreen-loading animation (a simple spinner)
***********************************************************************************************/

class Spinner extends React.PureComponent {
	
	/**
	* @constructor
	* @param  {object}      props
	* @param  {boolean}     props.visible if true, shows the spinner
	*/
	constructor(props) {
		super(props)
	}

	// rendering
	/*-----------------------------------------------------------------------------------*/
	
	render() {
		return <Modal visible={this.props.visible}>
			<View style={localStyle.container}>
				<View style={localStyle.background}>
					<ActivityIndicator
						color={config.theme.values.defaultSpinnerColor}
						size={'large'}
						style={localStyle.activityIndicator}
					/>
				</View>
			</View>
		</Modal>
	}
}


/***********************************************************************************************
local styling
***********************************************************************************************/

const localStyle = StyleSheet.create({

	activityIndicator: {
		flex: 1
	},

	background: {
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center'
	},

	container: {
		flex: 1,
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		position: 'absolute',
		backgroundColor: config.theme.values.defaultSpinnerBackgroundColor
	}
})

/***********************************************************************************************
export
***********************************************************************************************/

export default Spinner