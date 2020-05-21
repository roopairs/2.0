import {
    isPasswordValid,
    isEmailSyntaxValid,
    isPhoneNumberValid,
    isAlphaCharacterOnly,
    isEmptyOrSpaces,
    isPositiveWholeNumber,
} from '../SyntaxVerification';


/** isPasswordValid Test * */
const test1 = '';
const test2 = 't';
const test3 = '_;';
const test4 = 'helpMeNow';
const test5 = '88888222';
const test6 = 'dkfjd833';
const test7 = 'dslkdd888;4dfkjdf';
const test8 = 'HelloIShouldBeTooLongOfAMessageForThisPassworddddddelloIShouldBeTooLongOfAMessageForThisPasswordddddd';
const test9 = 'I have spaced out';
const test10 = '<script> alert("You fool, I will inject!") </script>';
const test11 = '%dIIeed-dkkee';
const test12 = 'kekIII-e33@dfakdf';

test('isPasswordValid Test', () => {
    expect(isPasswordValid(test1)).toBeFalsy();
    expect(isPasswordValid(test2)).toBeFalsy();
    expect(isPasswordValid(test3)).toBeFalsy();
    expect(isPasswordValid(test4)).toBeTruthy();
    expect(isPasswordValid(test5)).toBeTruthy();
    expect(isPasswordValid(test6)).toBeTruthy();
    expect(isPasswordValid(test7)).toBeFalsy();
    expect(isPasswordValid(test8)).toBeFalsy();
    expect(isPasswordValid(test9)).toBeFalsy();
    expect(isPasswordValid(test10)).toBeFalsy();
    expect(isPasswordValid(test11)).toBeTruthy();
    expect(isPasswordValid(test12)).toBeTruthy();
});


/** isEmailSyntaxValid Test * */
test('isEmailSyntaxValid Test', () => {
    expect(isEmailSyntaxValid('test1')).toBeFalsy();
    expect(isEmailSyntaxValid('test2@gmail.com')).toBeTruthy();
    expect(
        isEmailSyntaxValid(
            'test3..@gmail.com; <script> alert("I have you now!") </script>',
        ),
    ).toBeFalsy();
    expect(isEmailSyntaxValid(test10)).toBeFalsy();
    expect(isEmailSyntaxValid('te/._*3q^st2@gmail.com')).toBeTruthy();
    expect(isEmailSyntaxValid('hero@hero@gmail.com')).toBeFalsy();
});


/** isPhoneNumberValid Test * */
const validPhoneNumbers: string[] = [
    '(123) 456-7890',
    '123-456-7890',
    '123.456.7890',
    '1234567890',
    '+31636363634',
    '075-63546725',
    '123.4567890',
    '123456.7890',
];

const invalidPhoneNumbers: string[] = [
    '123) 456-789', // Format issue 
    ' (123456-7890', // Formatt issue 
    '1234567;890', // Invalid character passed
    '+3163655655363634', // Number too long 
    '075.635.46725.', // Too many dots 
    '12.454.744890', // Invalid digits 
    '124.45.744890', 
    '124.454.890', 
    '1242.454.8904',
    '124.4543.8904',
    '124.4543.8904534',
    '123890',  // Format does not have enough digits 
    'aaaaaaaaaa', // Letters cannot be phone numbers
    ' (123)456-7890', // Leading Spaces not accepted 
    '(123)456-7890 ', // Trailing Spaces not accepted
];

describe('Test isPhoneNumberValid for syntax verification', () =>{
    test.each(validPhoneNumbers)('This value should return true', (value) => {
        // All results are expected to be true for the first values
        expect(isPhoneNumberValid(value)).toBeTruthy();
    });
    test.each(invalidPhoneNumbers)('This value should return false', (value) => {
        // All results are expected to be true for the first values
        expect(isPhoneNumberValid(value)).toBeFalsy();
    });

});


/** isAlphaCharacterOnly Test * */
const validAlphaValues: string[] = [
    'a',
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    'hello',
    'COrina',
];

const invalidAlpahValues: string[] = [
    '', // Empty String
    '   ', // Spaces
    '   t',
    'Hello my name is Bob   ',
    '89899', // Digits
    'MyNumberis9456664042',
    ';', // Special Characters 
    'ThisIsStrange;Ilikethis',
    '<script> alert("You fool, I will inject!") </script>', // Injection
    '=<script> alert("You fool, I will inject!") </script>', // Injection
    '=alert("You fool, I will inject!");', // Injection
];

describe('Test isAlphaCharacterOnly Function', () =>{
    test.each(validAlphaValues)('This value should return true', (value) => {
        // All results are expected to be true for the first values
        expect(isAlphaCharacterOnly(value)).toBeTruthy();
    });
    test.each(invalidAlpahValues)('This value should return false', (value) => {
        // All results are expected to be true for the first values
        expect(isAlphaCharacterOnly(value)).toBeFalsy();
    });

});


/** isEmptyOrSpaces Test * */
const emptyStrings: string[] = [
    '',
    '           ',
    '\t\n',
    '\t\t\t\t\t\t\t\t',
    '\n\n\n\n\n\n\n\n\n',
    '\t\n    ',
    '\n',
    '\t',
];

const nonEmptyString: string[] = [
    'a',
    ' a ',
    '\ta\t',
    '\na\n',
    'a\n',
    'a\t',
    'a ',
];

describe('Test isEmptyOrSpaces Function', () =>{
    test.each(emptyStrings)('This value should return true', (value) => {
        expect(isEmptyOrSpaces(value)).toBeTruthy();
    });
    test.each(nonEmptyString)('This value should return false', (value) => {
        expect(isEmptyOrSpaces(value)).toBeFalsy();
    });

});



/** isPositiveWholeNumber Test * */
const positiveWholeNumbers: string[] = [
    '1',
    '12345678910',
    '90',
    '10000',
    '00000000',
];

const nonPositiveWholeNumbers: string[] = [
    '1.0',
    '-12345678910',
    '994.44',
    'Hello',
    ' 99 ',
    '-10.3',
    '-0.007',
    '0.0008',
];

describe('Test isPositiveWholeNumber Function', () =>{
    test.each(positiveWholeNumbers)('This value should return true', (value) => {
        expect(isPositiveWholeNumber(value)).toBeTruthy();
    });
    test.each(nonPositiveWholeNumbers)('This value should return false', (value) => {
        expect(isPositiveWholeNumber(value)).toBeFalsy();
    });

});