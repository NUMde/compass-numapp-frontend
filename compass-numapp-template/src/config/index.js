import defaultConfig from './appConfig';
import devConfig from './devConfig';

export { default as theme } from './theme';

export const appConfig = {
  ...defaultConfig,
  ...devConfig,
  baseURI: __DEV__ ? devConfig.baseUri : defaultConfig.baseUri,
};
