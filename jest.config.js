module.exports = {

    moduleDirectories: [
		'node_modules', 
		'src'
	],

    setupFiles: [
		"<rootDir>/__mocks__/mocks.js"
	],

    transformIgnorePatterns: [

    ],
    
    globals: {
      	"__DEV__": true
    },

	transform: {
		'^.+\\.(js|ts|tsx)$': 'babel-jest',
	},

  };