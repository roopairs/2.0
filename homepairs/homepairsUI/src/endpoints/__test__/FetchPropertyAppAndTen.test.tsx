import {Appliance, ApplianceType, TenantInfo} from 'homepairs-types';
import { propertyManagerMock1 } from 'homepairs-test';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {HOMEPAIRS_PROPERTY_ENDPOINT} from '../index';
import { fetchPropertyAppliancesAndTenants } from '../api-request';

/* * Required Data * */

/* * Test Data * */
const testPmId: string = '393933';
const URL = `${HOMEPAIRS_PROPERTY_ENDPOINT}${testPmId}`;

/* * Mock Return Data * */
const mockData = {
    tenants: [{
        firstName: 'Jim',
        lastName: 'Jang',
        email: 'fake@gmail.com',
        phoneNumber: '939-333-3333',
    }],
    appliances: [{
        appId: '33333',
        category: 'Plumbing',
        name: 'Toilet',
        manufacturer: 'Potty Johns', 
        modelNum: 444, 
        serialNum: 33944, 
        location: 'Guest Bathroom',
    }],
};

/* * Expected parsed results * */

const Appliances: Appliance[] = [
    {
        applianceId: '33333',
        category: ApplianceType.Plumbing,
        appName: 'Toilet',
        manufacturer: 'Potty Johns', 
        modelNum: 444, 
        serialNum: 33944, 
        location: 'Guest Bathroom',
    },
];

const Tenants: TenantInfo[] = [
    {
        firstName: 'Jim',
        lastName: 'Jang',
        email: 'fake@gmail.com',
        phoneNumber: '939-333-3333',
    },
];


describe('Test fetchPropertyAppliancesAndTenants function', () => {
    const mock = new MockAdapter(axios);
    
    it('Case 1: Successful request with valid response', async () => {
        mock.onGet(URL).reply(200, mockData);
        await fetchPropertyAppliancesAndTenants(testPmId).then(response => {
            const {appliances, tenants} = response;
            expect(appliances).toStrictEqual(Appliances);
            expect(tenants).toStrictEqual(Tenants);
        });
    });

    it('Case 2: Failed Response', async () => {
        mock.onGet(URL).reply(404);
        const response = await fetchPropertyAppliancesAndTenants(testPmId);
        expect(response).toBeUndefined();
    });

});