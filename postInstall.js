/* eslint-disable import/no-extraneous-dependencies */
const fetch = require("node-fetch");
const fs = require("fs");
const { exit } = require("process");

// create directory
if (!fs.existsSync("./src/assets/files")) {
    fs.mkdirSync("./src/assets/files", { recursive: true });
}

// get questionnaire
fetch(
    "https://raw.githubusercontent.com/NUMde/compass-implementation-guide/master/input/questionnaire-generic.json"
)
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.text();
    })
    .then((data) => {
        fs.writeFile("./src/assets/files/questionnaire.json", data, (error) => {
            if (error) {
                console.error(
                    `Something went wrong while trying to create the questionnaire file:\n${error}`
                );
                exit(1);
            }
        });
    })
    .catch((error) => {
        console.error(
            `Something went wrong while trying to fetch the questionnaire:\n${error}`
        );
        exit(1);
    });

// create config file
if (!fs.existsSync("./src/config/appConfig.js")) {
    fs.copyFile(
        "./src/config/appConfig.sample.js",
        "./src/config/appConfig.js",
        (error) => {
            if (error) {
                console.error(
                    `Something went wrong while trying to copy config file:\n${error}`
                );
                exit(1);
            }
        }
    );
}

// create config file for dev options
if (!fs.existsSync("./src/config/devConfig.js")) {
    fs.copyFile(
        "./src/config/devConfig.sample.js",
        "./src/config/devConfig.js",
        (error) => {
            if (error) {
                console.error(
                    `Something went wrong while trying to copy config file:\n${error}`
                );
                exit(1);
            }
        }
    );
}

// create config file for theme
if (!fs.existsSync("./src/config/theme.js")) {
    fs.copyFile(
        "./src/config/theme.sample.js",
        "./src/config/theme.js",
        (error) => {
            if (error) {
                console.error(
                    `Something went wrong while trying to copy config file:\n${error}`
                );
                exit(1);
            }
        }
    );
}

if (!fs.existsSync("./android/app/google-services.json")) {
    fs.copyFile(
        "./android/app/google-services.sample.json",
        "./android/app/google-services.json",
        (error) => {
            if (error) {
                console.error(
                    `Something went wrong while trying to copy config file:\n${error}`
                );
                exit(1);
            }
        }
    );
}

if (!fs.existsSync("./ios/GoogleService-Info.plist")) {
    fs.copyFile(
        "./ios/GoogleService-Info.sample.plist",
        "./ios/GoogleService-Info.plist",
        (error) => {
            if (error) {
                console.error(
                    `Something went wrong while trying to copy config file:\n${error}`
                );
                exit(1);
            }
        }
    );
}
