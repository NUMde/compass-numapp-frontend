/* eslint-disable import/no-extraneous-dependencies */
import fetch from 'node-fetch';
import { initLocalization } from '../src/services/localization';

global.fetch = fetch;

beforeAll(() => initLocalization('en'));
