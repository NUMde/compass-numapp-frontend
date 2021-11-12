
import defaultThemeValues from '../theme/theme'
import defaultTextValues from './textConfig'
import defaultAppConfigValues from './appConfig'

import customThemeValues from '../CUSTOMIZATION/customTheme'
import customTextValues from '../CUSTOMIZATION/customTextConfig'
import customAppConfigValues from '../CUSTOMIZATION/customAppConfig'

/** provides options to alter the behaviour of the app */
export const appConfig = {
    ...defaultAppConfigValues,
    ...customAppConfigValues
};

/** provides variables controlling the style of the application */
export const theme = {
    ...defaultThemeValues,
    ...customThemeValues
};

/** provides the text-strings visible the application */
export const text = {
    ...defaultTextValues,
    ...customTextValues
};

/** combine the default values with the custom values */
export default {

    /** provides variables controlling the style of the application */
    theme,

    /** provides the text-strings visible the application */
    text,

    /** provides options to alter the behaviour of the app */
    appConfig
};