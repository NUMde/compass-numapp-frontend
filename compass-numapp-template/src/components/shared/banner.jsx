// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

/***********************************************************************************************
import
***********************************************************************************************/

import React from 'react';
import { Icon } from 'react-native-elements';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';

// services & config
import { appConfig, theme } from '~config';
import translate from '~services/localization';

// import logo and background image
const customLogo = require('~CUSTOMIZATION/images/logo.png');
const defaultLogo = require('~assets/images/defaultLogo.png');
const customBackground = require('~CUSTOMIZATION/images/logoBackground.png');
const defaultBackground = require('~assets/images/defaultLogoBackground.png');

/***********************************************************************************************
 * component:
 * renders a banner with title, subtitle, logo, background image, and navigational buttons
 * @param  {object}    props
 * @param  {object}    props.nav the navigation object provided by 'react-navigation'
 * @param  {string}    props.title the title displayed
 * @param  {boolean}   props.noMenu if true no menu-button will be rendered in the top right corner
 * @param  {string}    props.subTitle the subtitle displayed
 * @param  {boolean}   props.isCheckIn true if the banner is used on the checkIn-screen
 * @param  {boolean}   props.noWayBack if true no 'back'-button will be rendered
 * @param  {boolean}   props.noRefresh if true no 'refesh'-button will be rendered
 * @param  {function}  props.updateUser triggers a user update
 ***********************************************************************************************/
function Banner({
  nav,
  title,
  noMenu,
  subTitle,
  isCheckIn,
  noWayBack,
  noRefresh,
  updateUser,
}) {
  /** holds the correct logo file */
  const logo = theme.ui.useCustomLogo ? customLogo : defaultLogo;

  /** holds the correct logoBackground file */
  const logoBackground = theme.ui.useCustomLogoBackground
    ? customBackground
    : defaultBackground;

  const hasSubTitle = subTitle && subTitle.length;
  const hasTitle = title && title.length;

  return (
    <ImageBackground
      style={localStyle.banner}
      resizeMode="cover"
      source={theme.ui.useBannerBackground ? logoBackground : null}
    >
      <View style={localStyle.menuBar}>
        {/* if this is the checkIn-screen and reloads are not forbidden shows a reload button in the top left corner */}
        {isCheckIn && !noRefresh && (
          <Icon
            size={appConfig.scaleUiFkt(28)}
            name="refresh"
            type="material-community"
            color={theme.values.defaultBannerButtonColor}
            onPress={updateUser}
            accessibilityLabel={translate('accessibility').refresh}
            accessibilityRole={translate('accessibility').types.button}
            accessibilityHint={translate('accessibility').refreshHint}
            testID="banner_refresh_btn"
          />
        )}

        {/* If navigating back is allowed and there actually is a 'back' in the nav-stack,
        shows the back-button in the top left corner.
        There will be no back-button on the checkIn-screen as it is the first screen of the SignedInView defined in '~navigation/appNavigator.js'  */}
        {!noWayBack && nav && (
          <Icon
            size={appConfig.scaleUiFkt(28)}
            name="arrow-left"
            type="material-community"
            color={theme.values.defaultBannerButtonColor}
            onPress={nav.goBack}
            accessibilityLabel={translate('accessibility').back}
            accessibilityRole={translate('accessibility').types.button}
            accessibilityHint={translate('accessibility').backHint}
            testID="banner_back_btn"
          />
        )}

        {/* Renders an empty icon if none of the other options came back positive. */}
        {!(isCheckIn || (!noWayBack && nav)) ||
          (isCheckIn && noRefresh && (
            <View style={localStyle.iconPlaceholder} />
          ))}

        {/* The title string. */}
        {!!title && (
          <View style={localStyle.titleWrapper}>
            <Text
              numberOfLines={1}
              style={localStyle.bannerTitle}
              accessibilityRole={translate('accessibility').types.header}
            >
              {title}
            </Text>
            {/* Rendering the subtitle */}
            {!!subTitle && (
              <Text
                numberOfLines={1}
                style={localStyle.bannerSubtitle}
                accessibilityRole={translate('accessibility').types.header}
              >
                {subTitle}
              </Text>
            )}
          </View>
        )}

        {/* Renders a menu button in the top right corner that navigates to the about-screen. */}
        {!noMenu && (
          <Icon
            size={appConfig.scaleUiFkt(28)}
            name="menu"
            type="material-community"
            color={theme.values.defaultBannerButtonColor}
            onPress={() => nav.navigate('About')}
            containerStyle={localStyle.bannerIcon}
            accessibilityLabel={translate('accessibility').menu}
            accessibilityRole={translate('accessibility').types.button}
            accessibilityHint={translate('accessibility').menuHint}
            testID="banner_menu_btn"
          />
        )}
        {/* Another empty icon in case there is no menu-button to be rendered. */}
        {noMenu && <View style={localStyle.iconPlaceholder} />}
      </View>
      {/* Renders the logo. */}
      <View style={localStyle.bannerHalf}>
        <Image
          resizeMode="contain"
          style={(() => {
            // depending on whether title and/or subtitle is/are set, the logo is scaled
            if (hasTitle && hasSubTitle) {
              // small logo with title and subtitle
              return localStyle.bannerImageLogoUnderSubtitleAndTitle;
            }
            if (hasTitle) {
              // medium logo with title only
              return localStyle.bannerImageLogoUnderTitle;
            }
            // large logo with neither title nor subtitle
            return localStyle.bannerImageLogoFullSize;
          })()}
          source={logo}
        />
      </View>
    </ImageBackground>
  );
}

Banner.propTypes = {
  nav: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  title: PropTypes.string,
  noMenu: PropTypes.bool,
  subTitle: PropTypes.string,
  isCheckIn: PropTypes.bool,
  noWayBack: PropTypes.bool,
  noRefresh: PropTypes.bool,
  updateUser: PropTypes.func,
};

Banner.defaultProps = {
  title: null,
  subTitle: null,
  noWayBack: false,
  noMenu: false,
  isCheckIn: false,
  noRefresh: false,
  updateUser: () => {},
};

/***********************************************************************************************
local styling
***********************************************************************************************/

const bannerHeight =
  Platform.OS === 'ios'
    ? appConfig.scaleUiFkt(290, 0.7)
    : appConfig.scaleUiFkt(290, 0.6);
const bannerWidth = Dimensions.get('window').width;

const localStyle = StyleSheet.create({
  // Some values need to be calculated in the context of the platform the app is running on
  // as well as the hight of the statusbar. 'Plattform' and 'getStatusBarHeight()' are used
  // to accomplish that. Additionally, scaleUiFkt() (located in src/config/appConfig.js)
  // will dynamically alter some sized based on the physical device-measurements.

  banner: {
    width: '100%',
    flexDirection: 'column',
    paddingTop: Platform.OS === 'ios' ? 30 : 0,
    backgroundColor: theme.values.defaultBannerBackgroundColor,
    height: bannerHeight,
  },

  iconPlaceholder: {
    width: 26,
    height: 26,
  },

  menuBar: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },

  titleWrapper: {
    alignItems: 'center',
  },

  bannerTitle: {
    color: theme.values.defaultBannerTitleColor,
    ...theme.fonts.header2,
  },

  bannerSubtitle: {
    color: theme.values.defaultBannerSubTitleColor,
    ...theme.fonts.subHeader1,
  },

  bannerHalf: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  bannerImageLogoUnderSubtitleAndTitle: {
    position: 'relative',
    alignSelf: 'center',
    maxHeight: appConfig.scaleUiFkt(bannerHeight, 0.4),
    maxWidth: bannerWidth - 100,
    bottom: appConfig.scaleUiFkt(15, 0.3),
  },

  bannerImageLogoUnderTitle: {
    position: 'relative',
    alignSelf: 'center',
    maxHeight: appConfig.scaleUiFkt(bannerHeight, 0.5),
    maxWidth: bannerWidth - 100,
    bottom: appConfig.scaleUiFkt(15, 0.5),
  },

  bannerImageLogoFullSize: {
    position: 'relative',
    alignSelf: 'center',
    maxHeight: appConfig.scaleUiFkt(bannerHeight, 0.7),
    maxWidth: bannerWidth - 100,
    bottom: appConfig.scaleUiFkt(15, 0.7),
  },
});

/***********************************************************************************************
export
***********************************************************************************************/

export default Banner;
