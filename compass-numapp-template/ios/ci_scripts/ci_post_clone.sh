#!/bin/sh

set -e

# Install CocoaPods and yarn using Homebrew.
brew install cocoapods

NODE_VERSION=18
brew install node@$NODE_VERSION
brew link node@$NODE_VERSION
echo 'export PATH="/usr/local/opt/node@18/bin:$PATH"' >> ~/.zshrc
brew install npm

# Install dependencies
cd ../..
npm ci
cd ./src/config && mv appConfig.sample.js appConfig.js && mv devConfig.sample.js devConfig.js && mv theme.sample.js theme.js

cd ../../ios 

echo "$GOOGLE_SERVICES_SECRET" > ./GoogleService-Info.plist
pod install 