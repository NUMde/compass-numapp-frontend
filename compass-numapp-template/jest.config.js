module.exports = {
  preset: 'react-native',

  testEnvironment: 'node',

  setupFiles: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    '<rootDir>/__mocks__/mocks.js',
  ],

  setupFilesAfterEnv: ['<rootDir>/__mocks__/jest.setup.js'],

  globals: {
    __DEV__: true,
  },

  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },

  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?@react-native|react-native|react-navigation|react-native-gesture-handler|react-native-firebase/.*))',
  ],
  moduleNameMapper: {
    '^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  coveragePathIgnorePatterns: ['node_modules', 'config'],
};
