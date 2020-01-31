import {isNullOrUndefined} from 'homepairs-utilities';

type optionalProps = {
    test1?: any
    test2?: any
    test3?: any
    test4?: any
};

const testProps: optionalProps = {
    test1: null,
    test3: 'Hello World',
    test4: 'undefined',
};

describe('Test isNullOrUndefined', () =>{
    const {test1, test2, test3, test4} = testProps;

    test('This value should return true', () => {
        expect(isNullOrUndefined(test1)).toBeTruthy();
    });
    test('This value should return true', () => {
        expect(isNullOrUndefined(test2)).toBeTruthy();
    });
    test('This value should return false', () => {
        expect(isNullOrUndefined(test3)).toBeFalsy();
    });
    test('This value should return false', () => {
        expect(isNullOrUndefined(test4)).toBeFalsy();
    });
});