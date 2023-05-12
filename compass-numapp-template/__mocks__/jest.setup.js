/* eslint-disable import/no-extraneous-dependencies */
import fetch, { Request, Response, Headers } from 'node-fetch';
import { initLocalization } from '~services/localization';
import { NativeModules } from 'react-native';

global.fetch = fetch;
global.Request = Request;
global.Response = Response;
global.Headers = Headers;

NativeModules.CameraView = {
  CameraModule: {
    getAvailableCameraDevices: jest.fn(),
    requestCameraPermission: jest.fn(),
  },
};

jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(),
}));

beforeEach(() => initLocalization('en'));
