/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { server } from './mockServiceWorker';
import { randomFillSync } from 'crypto';
import translationContent from '../public/locales/en.json';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Initialize i18n
i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: translationContent,
        },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

// eslint-disable-next-line no-undef
Object.defineProperty(globalThis, 'crypto', {
    value: { getRandomValues: randomFillSync },
});
beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
});

global.console = {
    log: jest.fn(), // Mock console.log
    error: jest.fn(), // Mock console.error
    warn: jest.fn(), // Mock console.warn
    // You can add more methods as needed
};

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
