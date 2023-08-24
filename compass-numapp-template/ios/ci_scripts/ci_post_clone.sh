#!/bin/sh

# Install CocoaPods and yarn using Homebrew.
brew install cocoapods
brew install node@18
brew link node@18
brew install npm

echo "$PWD"

# Install dependencies
cd ../../compass-numapp-template
npm ci
cd ios
pod install 