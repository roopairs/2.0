import {convertObjectValuesToArray} from '../OtherUtilities';


describe('Test getValueArray', () => {
    it('Test for key strings', () => {
        const testEmpty = {};
        const testString = {'hello' : 1, 'I am Eeron' : 3, 'Help' : 3933};
        const expectedResult = [1, 3, 3933];
        expect(convertObjectValuesToArray(testEmpty)).toStrictEqual([]);
        expect(convertObjectValuesToArray(testString)).toStrictEqual(expectedResult);
    });
});