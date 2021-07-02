module.exports = {

    collectCoverage: true,

    moduleDirectories: ['node_modules', 'src'],

    setupFiles: [
        "<rootDir>/__mocks__/mocks.js"
    ],

    transformIgnorePatterns: [
        "node_modules/(?!(react-native"
        + "|react-navigation"
        + "|react-native-splash-screen"
        + "|react-native-screens"
        + "|react-native-reanimated"
        + "|fbjs-scripts" +
        '|@react-native-community' +
      '|@react-navigation' +
      '|native-base' +
      '|@expo(nent)?/.*' +
      '|expo-.*/.*' +
      '|@unimodules' +
      '|@codler/react-native-keyboard-aware-scroll-view' +
      '|@react-native-picker' +
      '|victory-.*/.*' 
        + ")/)",
    ],
    
    coveragePathIgnorePatterns: ['/node_modules/', '/jest'],

    testEnvironment: 'jsdom',
  };