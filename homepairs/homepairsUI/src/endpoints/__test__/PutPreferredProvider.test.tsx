import { ServiceProvider } from 'homepairs-types';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { HOMEPAIRS_PREFERRED_PROVIDER_ENDPOINT, putPreferredProvider } from '../index';

/* * Required Data * */

/* * Test Data * */
const testEmail: string = 'jacksonJaves@gmail.com';
const testPhoneNumber: string = '999-555-3333';
const endpoint = `${HOMEPAIRS_PREFERRED_PROVIDER_ENDPOINT}${testEmail}/${testPhoneNumber}/`;

/* * Expected Results * */
const testServiceProvider: ServiceProvider = {
    provId: 2,
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


describe('Test putPreferredProvider function', () => {
    const mock = new MockAdapter(axios);
    const mockHandleError = jest.fn((error:string) => {return error;});

    it('Case 1: Successful request with valid response', async () => {
        mock.onPut(endpoint).reply(200);
        const result = await putPreferredProvider(testEmail,testServiceProvider);
        const {status} = result;
        expect(status).toEqual(200);
    });

    it('Case2: Failed Request', async () =>{
        mock.onPut(endpoint).reply(500);
        await putPreferredProvider(testEmail,testServiceProvider, mockHandleError);
        expect(mockHandleError).toHaveBeenCalledTimes(1);
    });
});