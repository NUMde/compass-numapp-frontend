module.exports = {
  dependencies: {
    ...(process.env.CI
      ? { 'react-native-flipper': { platforms: { ios: null } } }
      : {}),
  },
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/assets/fonts', './src/CUSTOMIZATION/fonts'],
};
