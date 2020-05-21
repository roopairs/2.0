import {convertObjectValuesToArray, filterList} from '../OtherUtilities';


describe('Test getValueArray', () => {
    it('Test for key strings', () => {
        const testEmpty = {};
        const testString = {'hello' : 1, 'I am Eeron' : 3, 'Help' : 3933};
        const expectedResult = [1, 3, 3933];
        expect(convertObjectValuesToArray(testEmpty)).toStrictEqual([]);
        expect(convertObjectValuesToArray(testString)).toStrictEqual(expectedResult);
    });
});


/** Definitions for testing an object that only contains primitive values  */
type NoNest = {
    name: string,
    address: string,
    phoneNumber: string,
    id: number,
}
const testNoNestKeys = [
    'name', 'id',
];
/** Definitions for testing an object that only contains primitive values  */


/** Definitions for testing an object that only contains one or more objects  */
type Nested = {
    name: {
        first: string,
        middle: string,
        last: string,
    }
    id: number;
}
const testNestKeys = [
    'id', 'first',
];
/** Definitions for testing an object that only contains one or more objects  */



describe('Test filteredList', () => {
    it('Test if empty array is passed', () => {
        const testValue = [];
        const expected = [];
        const result = filterList('Gilbert', testValue);
        expect(result).toStrictEqual(expected);
    });

    describe('Test if Non-Nested object is passed', () => {
        const testValue: NoNest[] = [
            {
                name: 'Gilbert',
                address: 'Highland Drive',
                phoneNumber: '555-555-5555',
                id: 1,
            },
            {
                name: 'Tyler',
                address: 'Lowland Drive',
                phoneNumber: '555-665-7879',
                id: 4,
            },
        ];
        const searchName: string = 'Tyler';
        const searchId: string = '1';
        const searchAddress: string = 'Drive';

        it('Test when no keys have been defined', () =>{
            const expectedNameResults: NoNest[] =[testValue[1]];
            const expectedAddressResults: NoNest[] = testValue;
            const expectedIdResult: NoNest[] = [testValue[0]];
            
            // Undefined Keys 
            expect(filterList<NoNest>(searchName, testValue)).toStrictEqual(expectedNameResults);
            expect(filterList<NoNest>(searchId, testValue)).toStrictEqual(expectedIdResult);
            expect(filterList<NoNest>(searchAddress, testValue)).toStrictEqual(expectedAddressResults);

            // Null Keys 
            expect(filterList<NoNest>(searchName, testValue, null)).toStrictEqual(expectedNameResults);
            expect(filterList<NoNest>(searchId, testValue, null)).toStrictEqual(expectedIdResult);
            expect(filterList<NoNest>(searchAddress, testValue, null)).toStrictEqual(expectedAddressResults);

            // Empty Keys 
            expect(filterList<NoNest>(searchName, testValue, [])).toStrictEqual(expectedNameResults);
            expect(filterList<NoNest>(searchId, testValue, [])).toStrictEqual(expectedIdResult);
            expect(filterList<NoNest>(searchAddress, testValue, [])).toStrictEqual(expectedAddressResults);
        });

        it('Test when keys have been defined', () =>{
            const expectedNameResults: NoNest[] =[testValue[1]];
            const expectedAddressResults: NoNest[] = [];
            const expectedIdResult: NoNest[] = [testValue[0]];

            expect(filterList<NoNest>(searchName, testValue, testNoNestKeys)).toStrictEqual(expectedNameResults);
            expect(filterList<NoNest>(searchId, testValue, testNoNestKeys)).toStrictEqual(expectedIdResult);
            expect(filterList<NoNest>(searchAddress, testValue, testNoNestKeys)).toStrictEqual(expectedAddressResults);
        });
    });

    describe('Test if Nested object is passed', () => {
        const testValue: Nested[] = [
            {
                name: {
                    first: 'Gilbert',
                    middle: 'Ryan',
                    last: 'Le Fleur',
                },
                id: 1,
            },
            {
                name: {
                    first: 'Wara',
                    middle: 'Ahmed',
                    last: 'Amibawe',
                },
                id: 4,
            },
        ];
        const searchName: string = 'Ahmed';
        const searchId: string = '1';
        const searchAddress: string = 'Drive';

        it('Test when no keys have been defined', () =>{
            const expectedNameResults: Nested[] =[testValue[1]];
            const expectedAddressResults: Nested[] = [];
            const expectedIdResult: Nested[] = [testValue[0]];
            
            // Undefined Keys 
            expect(filterList<Nested>(searchName, testValue)).toStrictEqual(expectedNameResults);
            expect(filterList<Nested>(searchId, testValue)).toStrictEqual(expectedIdResult);
            expect(filterList<Nested>(searchAddress, testValue)).toStrictEqual(expectedAddressResults);

            // Null Keys 
            expect(filterList<Nested>(searchName, testValue, null)).toStrictEqual(expectedNameResults);
            expect(filterList<Nested>(searchId, testValue, null)).toStrictEqual(expectedIdResult);
            expect(filterList<Nested>(searchAddress, testValue, null)).toStrictEqual(expectedAddressResults);

            // Empty Keys 
            expect(filterList<Nested>(searchName, testValue, [])).toStrictEqual(expectedNameResults);
            expect(filterList<Nested>(searchId, testValue, [])).toStrictEqual(expectedIdResult);
            expect(filterList<Nested>(searchAddress, testValue, [])).toStrictEqual(expectedAddressResults);
        });

        it('Test when keys have been defined', () =>{
            const expectedNameResults: Nested[] =[];
            const expectedAddressResults: Nested[] = [];
            const expectedIdResult: Nested[] = [testValue[0]];

            expect(filterList<Nested>(searchName, testValue, testNestKeys)).toStrictEqual(expectedNameResults);
            expect(filterList<Nested>(searchId, testValue, testNestKeys)).toStrictEqual(expectedIdResult);
            expect(filterList<Nested>(searchAddress, testValue, testNestKeys)).toStrictEqual(expectedAddressResults);
        });
    });
});