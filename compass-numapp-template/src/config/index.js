import theme from './theme';
import text from './textConfig';
import appConfig from './appConfig';

/** combine the default values with the custom values */
export {
  /** provides variables controlling the style of the application */
  theme,
  /** provides the text-strings visible the application */
  text as strings,
  /** provides options to alter the behaviour of the app */
  appConfig,
};
