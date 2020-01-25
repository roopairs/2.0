import { isPasswordValid, isEmailSyntaxValid } from 'homepair-helpers';

const test1 = '';
const test2 = 't';
const test3 = '_;';
const test4 = 'helpMeNow';
const test5 = '88888222';
const test6 = 'dkfjd833';
const test7 = 'dslkdd888;4dfkjdf';
const test8 = 'HelloIShouldBeTooLongOfAMessageForThisPassword';
const test9 = 'I have spaced out';
const test10 = '<script> alert("You fool, I will inject!") </script>';

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
});

test('isEmailSyntaxValid Test', () => {
    expect(isEmailSyntaxValid('test1')).toBeFalsy();
    expect(isEmailSyntaxValid('test2@gmail.com')).toBeTruthy();
    expect(isEmailSyntaxValid('test3..@gmail.com; <script> alert("I have you now!") </script>')).toBeFalsy();
    expect(isEmailSyntaxValid(test10)).toBeFalsy();
    expect(isEmailSyntaxValid('te/._*3q^st2@gmail.com')).toBeTruthy();
    expect(isEmailSyntaxValid('hero@hero@gmail.com')).toBeFalsy();
});