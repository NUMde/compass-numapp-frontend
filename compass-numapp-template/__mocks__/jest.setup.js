/* eslint-disable import/no-extraneous-dependencies */
import fetch from 'node-fetch';
import { initLocalization } from '~services/localization';

global.fetch = fetch;

beforeEach(() => initLocalization('en'));