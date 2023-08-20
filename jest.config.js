/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
module.exports = {
    rootDir: 'src',
    testEnvironment: 'jest-environment-jsdom',
    moduleFileExtensions: ['js', 'jsx'],
    verbose: true,
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|scss|sass|less)$': 'identity-obj-proxy',
        '^@components(.*)$': '<rootDir>/components$1',
        '^@pages(.*)$': '<rootDir>/pages$1',
        '^@Icons(.*)$': '<rootDir>/Icons$1',
        '^@store(.*)$': '<rootDir>/store$1',
        '^@utils(.*)$': '<rootDir>/utils$1',
        '^@mocks(.*)$': '<rootDir>/mocks$1',
    },
    moduleDirectories: ['node_modules', 'src'],
    testMatch: ['**/__tests__/**/*.test.(js|jsx)'],
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom', '<rootDir>/jest.setup.js'],
    coveragePathIgnorePatterns: ['<rootDir>/language/', '<rootDir>/assets/', '<rootDir>/utils/', '<rootDir>/mocks/', '<rootDir>/components/common/RoleManagement'],
    transformIgnorePatterns: ['<rootDir>/node_modules/(?![a-z])', '<rootDir>/assets/(?![a-z])'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10,
        },
    },
};
