import { PREFERRED_SERVICE_PROVIDER_ACTION_TYPES } from 'homepairs-redux-actions';
import { RemoveServiceProviderAction, ServiceProvider } from 'homepairs-types';
import { propertyManagerMock1 } from 'homepairs-test';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { HOMEPAIRS_PREFERRED_PROVIDER_ENDPOINT, deletePreferredProvider } from '../index';

/* * Required Data * */
const { REMOVE_SERVICE_PROVIDER } =  PREFERRED_SERVICE_PROVIDER_ACTION_TYPES;

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


describe('Test deletePreferredProvider function', () => {
    const mock = new MockAdapter(axios);
    const mockHandleError = jest.fn((error:string) => {return error;});

    beforeEach(()=>{
        propertyManagerMock1.clearActions();
    });


    it('Case 1: Successful request with valid response', async () => {
        const expectedAction: RemoveServiceProviderAction = {
            type: REMOVE_SERVICE_PROVIDER,
            serviceProvider: testServiceProvider,
        };
        mock.onDelete(endpoint).reply(204);

        const dispatchReadyFunc = deletePreferredProvider(testEmail,testServiceProvider);
        await propertyManagerMock1.dispatch(dispatchReadyFunc);
        const actionResults = propertyManagerMock1.getActions();

        expect(actionResults).toHaveLength(1);
        expect(actionResults[0]).toStrictEqual(expectedAction);
      
    });

    describe('Case 2: Failed Request', () => {
        beforeEach(() => {
            propertyManagerMock1.clearActions();
            mockHandleError.mockClear();
        });

        it('Test not passing param onError', async () =>{
            mock.onDelete(endpoint).reply(500);

            const dispatchReadyFunc = deletePreferredProvider(testEmail, testServiceProvider);
            await propertyManagerMock1.dispatch(dispatchReadyFunc);
            const actionResults = propertyManagerMock1.getActions();

            expect(actionResults).toHaveLength(0);
            expect(mockHandleError).toHaveBeenCalledTimes(0);
        });

        it('Test passing param onError', async () => {
            mock.onDelete(endpoint).reply(400);

            const dispatchReadyFunc = deletePreferredProvider(testEmail, testServiceProvider, mockHandleError);
            await propertyManagerMock1.dispatch(dispatchReadyFunc);
            const actionResults = propertyManagerMock1.getActions();

            expect(actionResults).toHaveLength(0);
            expect(mockHandleError).toHaveBeenCalledTimes(1);
        });
    });
});