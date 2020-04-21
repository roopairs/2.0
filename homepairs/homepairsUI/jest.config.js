// jest.config.js
const { defaults: tsjPreset } = require('ts-jest/presets');
const { withEnzyme } = require('jest-expo-enzyme');
const iosPreset = require('jest-expo/ios/jest-preset');
const androidPreset = require('jest-expo/android/jest-preset');
const webPreset = require('jest-expo/web/jest-preset');

module.exports = {
    ...tsjPreset,
    automock: true,
    projects: [
        // Skipping Node because we want to test DOM presets only
        withEnzyme(iosPreset),
        withEnzyme(androidPreset),
        // The Enzyme support added to web is different from that added to native, which `withEnzyme` handles
        // Luckily you won't have to do anything special because it reads the platform from
        // `haste.defaultPlatform` of the provided Jest config
        withEnzyme(webPreset),
    ],
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "<rootDir>/src/tests/setup/styleMock.js",
    },
    transform: {
        ...tsjPreset.transform,
        '^[@./a-zA-Z0-9$_-]\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: [
        'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|' +
            '@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|' +
            '@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-widgets)',
    ],
    collectCoverage: false,
    collectCoverageFrom: [
        '**/*.{ts,tsx}',
        '**/src/*.{js,jsx}',
        '!**/res/**',
        '!**/coverage/**',
        '!**/node_modules/**',
        '!**/babel.config.js',
        '!**/jest.setup.js',
        '!**/tests/**',
        '!**/__tests__/**',
        '!**/__mocks__/**',
        '!**/*.{native,ios,android,web}.test.{js, jsx, ts, tsx}',
        '!**/App.{js,jsx,ts,tsx}',
    ],
    globals: {
        'ts-jest': {
            babelConfig: true,
        },
    },
    // This is the only part which you can keep
    // from the above linked tutorial's config:
    cacheDirectory: '.jest/cache',

};
