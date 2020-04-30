import {blender} from 'homepairs-images';
import { 
    arrayToDictionary, 
    removeKey, 
    preferredProviders, 
    initialState,
} from './reducer';
import { 
    ServiceProvider, 
    ProviderDictionary,
    PreferredServiceProviderAction, 
    RefreshServiceProvidersAction, 
    RemoveServiceProviderAction, 
    PreferredServiceProviderState,
} from '../types';
import { PREFERRED_SERVICE_PROVIDER_ACTION_TYPES } from './actions';

/** Required Definitions */
jest.mock('homepairs-images');
const {REFRESH_SERVICE_PROVIDERS, REMOVE_SERVICE_PROVIDER} = PREFERRED_SERVICE_PROVIDER_ACTION_TYPES;

/* * Fake Data * */
const testPhoneNumber = '925-577-0000';
const testRemainingPhoneNumber = '925-588-0000';
const testInvalidPhoneNumber = '999-999-9999';

const serviceProviderList : ServiceProvider[] = [
    {
        provId: 9255770000,
        name: 'Bob the Builder',
        email: 'billybob@yahoo.com',
        phoneNum: testPhoneNumber,
        contractLic: '#12345678',
        skills: 'Hot Equipment, Flood Prevention, Pest Control',
        founded: 'string',
        payRate: 35.25,
        timesHired: 202, 
        earliestHire: new Date(2018, 10, 17),
        logo: blender,
    },
    {
        provId: 9294,
        name: 'Electro Bud',
        email: 'ebuds@ebuddy.org',
        phoneNum: testRemainingPhoneNumber,
        contractLic: '#123456',
        skills: 'Hot Equipment, Lighting, Power',
        founded: 'string',
        payRate: 40.25,
        timesHired: 33, 
        earliestHire: new Date(2020, 1, 3),
        logo: undefined,
    },
];

/** These Definitions are used for testing remove and refresh actions */
const serviceProivderDict: ProviderDictionary = {
    [serviceProviderList[0].phoneNum] : serviceProviderList[0],
    [serviceProviderList[1].phoneNum] : serviceProviderList[1],
};

const fakeStateMultProv: PreferredServiceProviderState = {
    serviceProviders: serviceProivderDict,
};

const singleServiceProivderDict: ProviderDictionary = {
    [serviceProviderList[0].phoneNum] : serviceProviderList[0],
};

const fakeStateSingleProvider: PreferredServiceProviderState = {
    serviceProviders: singleServiceProivderDict,
};


describe('Test arrayToDictionary', () => {
    it('Case 1: Empty ', () => {
        const expectedResult: ProviderDictionary = {}; 
        expect(arrayToDictionary([])).toStrictEqual(expectedResult);
    });
    it('Case 2: 1 item', () => {
        const test: ServiceProvider[] = [serviceProviderList[1]];
        const {phoneNum} = serviceProviderList[1];
        const expectedResult: ProviderDictionary = { [phoneNum] : serviceProviderList[1]};
        
        expect(arrayToDictionary(test)).toStrictEqual(expectedResult);
    });

    it('Case 3: Multiple items', () => {
        const test: ServiceProvider[] = serviceProviderList;
        const phoneNum0 = serviceProviderList[0].phoneNum;
        const phoneNum1 = serviceProviderList[1].phoneNum;
        const expectedResult: ProviderDictionary = { [phoneNum0] : serviceProviderList[0] , [phoneNum1] : serviceProviderList[1]};
        
        expect(arrayToDictionary(test)).toStrictEqual(expectedResult);
    });
});

describe('Test removeKey', () => {
    it('Case 1: Key exists ', () => {
        const expectedResult: ProviderDictionary = {[testRemainingPhoneNumber] : serviceProivderDict[testRemainingPhoneNumber]}; 
        expect(removeKey(serviceProivderDict, testPhoneNumber)).toStrictEqual(expectedResult);
    });
    it('Case 2: Key does not exist', () => {
        expect(removeKey(serviceProivderDict, testInvalidPhoneNumber)).toStrictEqual(serviceProivderDict);
    });

});

describe('Test reducer', () => {
    describe('Test Default Action in Reducer', () => {
        const fakeAction: PreferredServiceProviderAction = {
            type: 'NONE',
            serviceProvider: null,
        };
        it('Initial State', () => {
            expect(preferredProviders(undefined, fakeAction)).toStrictEqual(initialState);
        });
        it('New State', () => {
            const testState = fakeStateMultProv;
            expect(preferredProviders(testState, fakeAction)).toStrictEqual(testState);
        });
    });
    
    describe('Test Refresh Action in Reducer', () => {
        const testAction: RefreshServiceProvidersAction = {
            type: REFRESH_SERVICE_PROVIDERS,
            preferredServiceProviders: serviceProviderList,
        };
        const expectedState : PreferredServiceProviderState = {
            serviceProviders: serviceProivderDict,
        };
        it('Initial State', () => {
            const testState = undefined;
            expect(preferredProviders(testState, testAction)).toStrictEqual(expectedState);
        });
        it('New State', () => {
            const testState = fakeStateSingleProvider;
            expect(preferredProviders(testState, testAction)).toStrictEqual(expectedState);
        });    
    });

    describe('Test Remove Action in Reducer', () => {
        const removeValue = serviceProviderList[1];
        const testAction: RemoveServiceProviderAction = {
            type: REMOVE_SERVICE_PROVIDER,
            serviceProvider: removeValue,
        };
        it('Initial State', () => {
            const testState = undefined;
            expect(preferredProviders(testState, testAction)).toStrictEqual(initialState);
        });
        it('New State', () => {
            const testState = fakeStateMultProv;
            const remainingProviders: ProviderDictionary = {
                [serviceProviderList[0].phoneNum] : serviceProviderList[0],
            };
            const expectedState: PreferredServiceProviderState = {
                serviceProviders: remainingProviders,
            };
            expect(preferredProviders(testState, testAction)).toStrictEqual(expectedState);
        });    
    });

});