#!/bin/sh

# Install CocoaPods and yarn using Homebrew.
brew install cocoapods

NODE_VERSION=18
brew install node@$NODE_VERSION
brew link node@$NODE_VERSION
echo 'export PATH="/usr/local/opt/node@18/bin:$PATH"' >> ~/.zshrc
brew install npm

# Install dependencies
cd ../../compass-numapp-template
npm ci

echo "$PWD"

echo "$GOOGLE_SERVICES_SECRET" > ./GoogleService-Info.plist
ls
pod install 