
// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
import
***********************************************************************************************/

import  React, { Component } from 'react'
import { View, StyleSheet } from "react-native"

import config from '../../config/configProvider'

/***********************************************************************************************
component:
renders a progressbar on the bottom of the questionnaireModal
***********************************************************************************************/

class ProgressBar extends Component {

    /**
     * @constructor
     * @param {object} props 
     * @param {number} props.progress the progress as a decimal value between 0 and 1 
     */
    constructor(props) {
        super(props)
    }

    // rendering
    /*-----------------------------------------------------------------------------------*/

    render() {

        let width = this.setWidth(this.props.progress)
        
        return (
            <View style={localStyle.container}>
                <View style={{...localStyle.progressBar, ...width.progressBarWidth}}></View>   
            </View>
        )
    }

    setWidth(width) {
       
        return StyleSheet.create({
            progressBarWidth: {
              width: (width * 100) + '%',
            }
        })
    }
}

/***********************************************************************************************
local styling
***********************************************************************************************/

const localStyle = StyleSheet.create({
  
    container: {
        width: "95%",
        alignSelf: "center",
        height: 5,
        borderRadius: 2.5,
        marginHorizontal: 5,
        backgroundColor: config.theme.colors.accent2
    },

    progressBar: {
        height: 5,
        borderRadius: 2.5,
        backgroundColor: config.theme.colors.primary
    }
})

export default ProgressBar