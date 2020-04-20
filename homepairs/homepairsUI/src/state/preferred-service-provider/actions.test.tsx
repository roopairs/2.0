import {
    PreferredServiceProviderAction ,
    RefreshServiceProvidersAction, 
    RemoveServiceProviderAction,
    ServiceProvider,
} from 'homepairs-types';
import { PreferredProviderActions } from 'homepairs-redux-actions';

const {refreshServiceProviders, removeServiceProvider, PREFERRED_SERVICE_PROVIDER_ACTION_TYPES} = PreferredProviderActions;
const { REFRESH_SERVICE_PROVIDERS, REMOVE_SERVICE_PROVIDER } = PREFERRED_SERVICE_PROVIDER_ACTION_TYPES;

const serviceProvider : ServiceProvider = {
   provId: 9255770000,
   name: 'Bob the Builder',
   email: 'billybob@yahoo.com',
   phoneNum: '925-577-0000',
   contractLic: '#12345678',
   skills: 'Hot Equipment, Flood Prevention, Pest Control',
   founded: 'string',
   payRate: 35.25,
   timesHired: '202', 
   earliestJobDate: new Date(2018, 10, 17),
};

const serviceProviderList : ServiceProvider[] = [
    {
        provId: 9255770000,
        name: 'Bob the Builder',
        email: 'billybob@yahoo.com',
        phoneNum: '925-577-0000',
        contractLic: '#12345678',
        skills: 'Hot Equipment, Flood Prevention, Pest Control',
        founded: 'string',
        payRate: 35.25,
        timesHired: '202', 
        earliestJobDate: new Date(2018, 10, 17),
    },
    {
        provId: 9294,
        name: 'Electro Bud',
        email: 'ebuds@ebuddy.org',
        phoneNum: '925-588-0000',
        contractLic: '#123456',
        skills: 'Hot Equipment, Lighting, Power',
        founded: 'string',
        payRate: 40.25,
        timesHired: '33', 
        earliestJobDate: new Date(2020, 1, 3),
    },

];

describe('Test suite for refreshing preffered providers', () => {
    it('Test the refreshServiceProviders Action', () => {
        const expectedResult : RefreshServiceProvidersAction = {
            type: REFRESH_SERVICE_PROVIDERS,
            preferredServiceProviders: serviceProviderList,
        };
        const result = refreshServiceProviders(serviceProviderList);
        expect(result).toStrictEqual(expectedResult);
    });

});


describe('Test suite for removing a preffered provider', () => {
    it('Test the removeServiceProvider Action', () => {
        const expectedResult : RemoveServiceProviderAction = {
            type: REMOVE_SERVICE_PROVIDER,
            serviceProvider,
        };
        const result = removeServiceProvider(serviceProvider);
        expect(result).toStrictEqual(expectedResult);
    });

});