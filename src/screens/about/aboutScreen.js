
// (C) Copyright IBM Deutschland GmbH 2020.  All rights reserved.

/***********************************************************************************************
imports
***********************************************************************************************/

import  React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

import RedirectModal from '../../components/modal/redirectModal.js'
import Banner from '../../components/banner/banner'
import { ListItem } from 'react-native-elements'
import AboutListItem from '../../components/about/aboutListItem'
import AboutListLink from '../../components/about/aboutListLink'
import ScrollIndicatorWrapper from '../../components/scrollIndicatorWrapper/scrollIndicatorWrapper'

import config from '../../config/configProvider'

/***********************************************************************************************
Component
***********************************************************************************************/

class AboutScreen extends Component {

	/**
	* renders the About-Screen
	* @constructor
	* @param  {object}    props
	* @param  {object}    props.navigation the navigation object provided by 'react-navigation'
	* @param  {function}  props.logout logs out the user
	* @param  {function}  props.clearAll deletes all local data
	*/
    constructor(props) {
        super(props)
    }

    // rendering
    /*-----------------------------------------------------------------------------------*/

    render() {
		return (
			<View style={localStyle.wrapper}>
				{/* top banner */}
				<Banner
					nav={this.props.navigation}
					title={config.text.about.title}
					subTitle={config.text.about.subTitle}
					noMenu
				/>

				{/* the modal to be opened */}
				<RedirectModal {...this.props}></RedirectModal>

				{/* ScrollView with content */}
				<View style={localStyle.wrapper}>
					<ScrollIndicatorWrapper
						contentData={
							<View style={localStyle.wrapper}>
								{/* holds the list-items */}
								<View style={localStyle.wrapper}>

									{/* links to the LegalInformationScreen */}
									{config.appConfig.allowAccessToLegalInformationScreen && (
										<ListItem 
											containerStyle={localStyle.containerStyle}
											onPress={() => this.props.navigation.navigate("LegalInformation")}
										>
											{/* title & subtitle of the listItem - the strings a identified by the webView*/}
											<ListItem.Content>
												<ListItem.Title style={localStyle.title}>
													{config.text.about.legal.title}
												</ListItem.Title>

												<ListItem.Subtitle style={localStyle.subtTitle}>
													{config.text.about.legal.subTitle}
												</ListItem.Subtitle>
											</ListItem.Content>

											{/* the icon on the right-hand-side */}
											<ListItem.Chevron
												{
													...{
														type: config.text.about.legal.iconType,
														name: config.text.about.legal.iconTitle,
														color: config.theme.values.legalListLinkIconColor,
														reverse: true,
														size: 12,
													}
												}
											/>

											{/* the icon on the right-hand-side */}
											
										</ListItem>
									)}
									
									{/* iterates over all items in config.text.wevViews */}
									{config.text.webViews.map((webView, index) => 
										// navigates to the webview screen
										<AboutListLink key={webView.title} {...this.props} navigate webView={webView}/>		
									)}

									{/* iterates over all items in config.text.modalLinks */}
									{config.text.modalLinks.map((modalLink, index) => 
										// navigates to the webview screen
										<AboutListItem {...this.props} key={modalLink.title} modalLink={modalLink}/>
									)}
								</View>

								{/* optional buttons on the bottom of the screen - JUST FOR DEVELOPMENT*/}
								<View style={localStyle.bottom}>
									{/* logout button */}
									{config.appConfig.showLogout && (
										<TouchableOpacity
											style={localStyle.button}
											onPress={this.props.logout}
											accessibilityRole={config.text.accessibility.types.button}
											accessibilityHint={config.text.accessibility.logoutHint}
										>
											<Text style={localStyle.buttonLabel}>
												{config.text.about.logout}
											</Text>
										</TouchableOpacity>	
									)}

									{/* delete-all-data button */}
									{config.appConfig.showEraseAll && (
										<TouchableOpacity
											style={localStyle.buttonAlert}
											onPress={this.props.clearAll}
											accessibilityRole={config.text.accessibility.types.button}
											accessibilityHint={config.text.accessibility.logoutHint}
										>
											<Text style={localStyle.buttonLabel}>
											{config.text.about.delete}
											</Text>
										</TouchableOpacity>	
									)}
								</View>
							</View>
						}
					/>
				</View>
			</View>
		)
	}
}

/***********************************************************************************************
local styling
***********************************************************************************************/

const localStyle = StyleSheet.create({
	
	wrapper: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		width: '100%',
		height: '100%',
		backgroundColor: config.theme.values.defaultBackgroundColor
	},

	bottom: {
		flex: 1,
		justifyContent: 'flex-end',
		marginBottom: 36,
		height: '100%',
		marginTop: 20,
		width: '80%'
	},
	
	button: {
		...config.theme.classes.buttonPrimary,
		bottom: 0,
		marginTop: 10,
	},
	
	buttonAlert: {
		...config.theme.classes.buttonAlert,
		bottom: 0,
		marginTop: 10,
	},
	
	buttonLabel: {
		...config.theme.classes.buttonLabel
	},

	containerStyle: {
		width: '100%',
		borderBottomColor: config.theme.colors.accent3,
		borderBottomWidth: 1,
		backgroundColor: config.theme.values.defaultListLinkBackgroundColor
	},

	subtTitle: {
		color: config.theme.colors.accent4,
		...config.theme.fonts.body	
	},

	title: {
		...config.theme.fonts.title2
	}
})

export default AboutScreen