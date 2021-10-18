// (C) Copyright IBM Deutschland GmbH 2021.  All rights reserved.

// the object provided by this file will be merged with the return-object of the module "theme.js".
// should you want to update a value from that file (for example the primary color of the theme),
// than copy the content of 'src/theme/theme.js' (as described in that file) below the marked comment
// at the end of this file. this ensures that you do not need to touch the rest of the source code and
// because of that, you won't loose the ability to merge updated from the repository.

// necessary imports
// eslint-disable-next-line no-unused-vars
import { StyleSheet } from 'react-native'; // lgtm [js/unused-local-variable]
import customAppConfig from './customAppConfig';
import originalAppConfig from '../config/appConfig';

// this adds a needed function to your customAppConfig.js should you not have added it.
if (!customAppConfig.scaleFontsFkt || !customAppConfig.scaleUiFkt) {
  customAppConfig.scaleFontsFkt = originalAppConfig.scaleFontsFkt;
  customAppConfig.scaleUiFkt = originalAppConfig.scaleUiFkt;
}

//   /$$                                           /$$                                     /$$
//  |__/                                          | $$                                    | $$
//   /$$ /$$$$$$$   /$$$$$$$  /$$$$$$   /$$$$$$  /$$$$$$          /$$$$$$$  /$$$$$$   /$$$$$$$  /$$$$$$
//  | $$| $$__  $$ /$$_____/ /$$__  $$ /$$__  $$|_  $$_/         /$$_____/ /$$__  $$ /$$__  $$ /$$__  $$
//  | $$| $$  \ $$|  $$$$$$ | $$$$$$$$| $$  \__/  | $$          | $$      | $$  \ $$| $$  | $$| $$$$$$$$
//  | $$| $$  | $$ \____  $$| $$_____/| $$        | $$ /$$      | $$      | $$  | $$| $$  | $$| $$_____/
//  | $$| $$  | $$ /$$$$$$$/|  $$$$$$$| $$        |  $$$$/      |  $$$$$$$|  $$$$$$/|  $$$$$$$|  $$$$$$$
//  |__/|__/  |__/|_______/  \_______/|__/         \___/         \_______/ \______/  \_______/ \_______/
//
//   /$$                 /$$
//  | $$                | $$
//  | $$$$$$$   /$$$$$$ | $$  /$$$$$$  /$$  /$$  /$$
//  | $$__  $$ /$$__  $$| $$ /$$__  $$| $$ | $$ | $$
//  | $$  \ $$| $$$$$$$$| $$| $$  \ $$| $$ | $$ | $$
//  | $$  | $$| $$_____/| $$| $$  | $$| $$ | $$ | $$
//  | $$$$$$$/|  $$$$$$$| $$|  $$$$$$/|  $$$$$/$$$$/
//  |_______/  \_______/|__/ \______/  \_____/\___/

/***********************************************************************************************
                                    ADD BELOW THIS COMMENT
                            PLEASE DO ONLY ADD VALUES BELOW THIS LINE
***********************************************************************************************/
