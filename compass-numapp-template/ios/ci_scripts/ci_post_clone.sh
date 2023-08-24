#!/bin/sh

# Install CocoaPods and yarn using Homebrew.
brew install cocoapods
brew install node@18
brew link node
brew install npm

# Install dependencies
cd ../../compass-numapp-template
npm ci
cd ios
pod install 