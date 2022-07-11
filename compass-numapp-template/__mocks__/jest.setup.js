/* eslint-disable import/no-extraneous-dependencies */
import fetch from 'node-fetch';
import { initLocalization } from '~services/localization';

global.fetch = fetch;

jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(),
}));

beforeEach(() => initLocalization('en'));
