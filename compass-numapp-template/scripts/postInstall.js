/* eslint-disable import/no-extraneous-dependencies */
const fetch = require('node-fetch');
const fs = require('fs');

// create directory
if (!fs.existsSync('./src/assets/files')) {
  fs.mkdirSync('./src/assets/files', { recursive: true });
}

// get questionnaire
fetch(
  'https://raw.githubusercontent.com/NUMde/compass-implementation-guide/master/input/questionnaire-generic.json',
)
  .then((response) => response.text())
  .then((data) => {
    fs.writeFile('./src/assets/files/questionnaire.json', data, (error) => {
      error
        ? console.error(
            `Something went wrong while trying to create the questionnaire file:\n${error}`,
          )
        : null;
    });
  })
  .catch((error) => {
    console.error(
      `Something went wrong while trying to fetch the questionnaire:\n${error}`,
    );
  });

// create config file
fs.copyFile(
  './src/config/appConfig.sample.js',
  './src/config/appConfig.js',
  (error) => {
    error
      ? console.error(
          `Something went wrong while trying to copy config file:\n${error}`,
        )
      : null;
  },
);

// create config file for dev options
fs.copyFile(
  './src/config/devConfig.sample.js',
  './src/config/devConfig.js',
  (error) => {
    error
      ? console.error(
          `Something went wrong while trying to copy config file:\n${error}`,
        )
      : null;
  },
);

// create config file for theme
fs.copyFile(
  './src/config/theme.sample.js',
  './src/config/theme.js',
  (error) => {
    error
      ? console.error(
          `Something went wrong while trying to copy config file:\n${error}`,
        )
      : null;
  },
);

if (!fs.existsSync('./android/app/google-services.json')) {
  fs.copyFile(
    './android/app/google-services.sample.json',
    './android/app/google-services.json',
    (error) => {
      error
        ? console.error(
            `Something went wrong while trying to copy config file:\n${error}`,
          )
        : null;
    },
  );
}

if (!fs.existsSync('./ios/GoogleService-Info.plist')) {
  fs.copyFile(
    './ios/GoogleService-Info.sample.plist',
    './ios/GoogleService-Info.plist',
    (error) => {
      error
        ? console.error(
            `Something went wrong while trying to copy config file:\n${error}`,
          )
        : null;
    },
  );
}
