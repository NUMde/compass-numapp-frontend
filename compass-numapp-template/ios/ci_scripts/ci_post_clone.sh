#!/bin/sh

# Install CocoaPods and yarn using Homebrew.
brew install cocoapods
brew install node@18

# Install dependencies
npm install node
cd ios
pod install