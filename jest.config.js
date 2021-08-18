module.exports = {

  	preset: "react-native",

  	moduleDirectories: [
		'node_modules', 
		'src'
	],

	testEnvironment: 'jsdom',

    setupFiles: [
        "./node_modules/react-native-gesture-handler/jestSetup.js",
        "<rootDir>/__mocks__/mocks.js"
	],

    globals: {
      	"__DEV__": true
    },

	transform: {
		'^.+\\.(js|ts|tsx)$': 'babel-jest',
	},

    transformIgnorePatterns: [ 
        "node_modules/(?!((jest-)?@react-native|react-native|react-navigation|react-native-gesture-handler|react-native-firebase|react-native-keyboard-aware-scroll-view/.*))"
    ]
};