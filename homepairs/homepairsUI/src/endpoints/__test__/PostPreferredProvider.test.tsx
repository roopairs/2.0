import { ServiceProvider, R } from 'homepairs-types';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { HOMEPAIRS_PREFERRED_PROVIDER_ENDPOINT, postPreferredProvider } from '../index';

/* * Required Data * */

/* * Test Data * */
const testEmail: string = 'jacksonJaves@gmail.com';
const testPM: number = 1292;
const testPhoneNumber: string = '999-555-3333';
const endpoint = `${HOMEPAIRS_PREFERRED_PROVIDER_ENDPOINT}${testEmail}/${testPhoneNumber}/`;
const fetchedProvEndpoint = `${HOMEPAIRS_PREFERRED_PROVIDER_ENDPOINT}${String(testPM)}/`;

/* * Expected Results * */
const testServiceProvider: ServiceProvider = {
    provId: 2,
    prefId: '111',
    name: 'Lighters',
    email: testEmail,
    phoneNum: testPhoneNumber,
    contractLic: 'I do not know what this is', // contract license
    skills: 'Do not need any',
    founded: 'Thursday March 5, 2020', // date founded
    payRate: 34.25, // amount per hour 
    timesHired: 1, 
    earliestHire: new Date(2015, 18, 1),
};


describe('Test PostPreferredProvider function', () => {
    const mock = new MockAdapter(axios);
    const mockHandleError = jest.fn((error:string) => {return error;});

    beforeEach(()=>{
        mockHandleError.mockClear();
    });
    
    it('Case 1: Successful request with valid response', async () => {
        mock.onPut(endpoint).reply(200);
        mock.onPut(fetchedProvEndpoint).reply(200);
        const result = await postPreferredProvider(testPM,testPhoneNumber);
        expect(result).toBeUndefined(); //On success, nothing should return!
        expect(mockHandleError).toHaveBeenCalledTimes(0);

    });

    it('Case2: Failed Request', async () =>{
        mock.onPut(endpoint).reply(500);
        await postPreferredProvider(testPM, testPhoneNumber, mockHandleError);
        expect(mockHandleError).toHaveBeenCalledTimes(1);
    });

    it('Case3: Succesful Request with failure as response', async () =>{
        mock.onPut(endpoint).reply(200, {status: 'failure', error: 'Error 400'});
        await postPreferredProvider(testPM, testPhoneNumber, mockHandleError);
        expect(mockHandleError).toHaveBeenCalledTimes(1);
    });
});