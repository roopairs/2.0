import {PREFERRED_SERVICE_PROVIDER_ACTION_TYPES} from 'homepairs-redux-actions';
import {RefreshServiceProvidersAction, ServiceProvider} from 'homepairs-types';
import { propertyManagerMock1 } from 'homepairs-test';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {HOMEPAIRS_PREFERRED_PROVIDER_ENDPOINT, fetchPreferredProviders} from '../index';

/* * Required Data * */
const {REFRESH_SERVICE_PROVIDERS} =  PREFERRED_SERVICE_PROVIDER_ACTION_TYPES;

/* * Test Data * */
const testPmId: string = '393933';
const URL = `${HOMEPAIRS_PREFERRED_PROVIDER_ENDPOINT}${testPmId}/`;

/* * Mock Return Data * */
// TODO: Tests for log assets retrieved from the backend.
const fakeServiceProviders = [
    {
        provId: 1,
        prefId: '10',
        name: 'Bob the Builders',
        email: 'billybob@fake.com',
        phoneNum: '999-555-3333',
        contractLic: 'I do not know what this is', // contract license
        skills: 'Do not need any',
        founded: 'Thursday March 5, 2020', // date founded
        payRate: 35.25, // amount per hour 
        timesHired: 80, 
    },
    {
        provId: 2,
        prefId: '22',
        name: 'Lighters',
        email: 'billybob@fake.com',
        phoneNum: '999-555-3333',
        contractLic: 'I do not know what this is', // contract license
        skills: 'Do not need any',
        founded: 'Thursday March 5, 2020', // date founded
        payRate: 34.25, // amount per hour 
        timesHired: 1, 
        earliestHire: new Date(2015, 18, 1).toDateString(),
    },
];


/* * Expected Results * */
const expectedParsedResults: ServiceProvider[] = [
    {
        provId: 1,
        prefId: '10',
        name: 'Bob the Builders',
        email: 'billybob@fake.com',
        phoneNum: '999-555-3333',
        contractLic: 'I do not know what this is', // contract license
        skills: 'Do not need any',
        founded: 'Thursday March 5, 2020', // date founded
        payRate: 35.25, // amount per hour 
        timesHired: 80, 
        earliestHire: undefined,
        logo: undefined,
    },
    {
        provId: 2,
        prefId: '22',
        name: 'Lighters',
        email: 'billybob@fake.com',
        phoneNum: '999-555-3333',
        contractLic: 'I do not know what this is', // contract license
        skills: 'Do not need any',
        founded: 'Thursday March 5, 2020', // date founded
        payRate: 34.25, // amount per hour 
        timesHired: 1, 
        earliestHire: new Date(2015, 18, 1),
        logo: undefined,
    },
];

describe('Test fetchPreferredProviders function', () => {
    const mock = new MockAdapter(axios);
    
    beforeEach(()=>{
        propertyManagerMock1.clearActions();
    });

    it('Case 1: Successful request with valid response', async () => {
        const expectedAction: RefreshServiceProvidersAction = {
            type: REFRESH_SERVICE_PROVIDERS,
            preferredServiceProviders: expectedParsedResults,
        };
        const data = { 
            status: 'success',
            providers: fakeServiceProviders,
        };
        mock.onGet(URL).reply(200, data);
        const dispatchReadyFunc = fetchPreferredProviders(testPmId);
        await propertyManagerMock1.dispatch(dispatchReadyFunc);
        const actionResults = propertyManagerMock1.getActions();
        expect(actionResults).toHaveLength(1);
        expect(actionResults[0]).toStrictEqual(expectedAction);
      
    });

    it('Case 2: Successful request with failed response', async () => {
        const data = { 
            status: 'failure',
        };
        mock.onGet(URL).reply(200, data);
        const dispatchReadyFunc = fetchPreferredProviders(testPmId);
        await propertyManagerMock1.dispatch(dispatchReadyFunc)
        .catch(() => {
            const actionResults = propertyManagerMock1.getActions();
            expect(actionResults).toHaveLength(0);
        });
    });

    it('Case 3: Failed Request', async () => {
        mock.onGet(URL).reply(400, null);

        const dispatchReadyFunc = fetchPreferredProviders(testPmId);
        await propertyManagerMock1.dispatch(dispatchReadyFunc)
        .catch(() => {
            const actionResults = propertyManagerMock1.getActions();
            expect(actionResults).toHaveLength(0);
        });
    });
});