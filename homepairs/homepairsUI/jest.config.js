// jest.config.js
const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
    ...tsjPreset,
    preset: 'jest-expo',
    transform: {
        ...tsjPreset.transform,
        '\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: [
        'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|' +
            '@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|' +
            '@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base)',
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
    setupFilesAfterEnv: ['<rootDir>/tests/setup.ts']
};
