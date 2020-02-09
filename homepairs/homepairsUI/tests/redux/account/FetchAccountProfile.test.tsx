import { AccountActions } from 'homepairs-redux-actions';
import { AccountTypes, AccountStateAction } from 'homepairs-types';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { testStore1 as storeContents } from '../../fixtures/StoreFixture';


const middleWares = [thunk];
const TYPE = 'ACCOUNT/FETCH_PROFILE';

const expectedResults: {[id:string]: AccountStateAction} = {
  PM_WITHOUT_TOKEN: { // PM Account w/out token 
    type: TYPE,
    profile: {
      accountType: AccountTypes.Landlord,
      firstName: 'Jack',
      streetAddress: undefined,
      city: undefined,
      lastName: 'profile[accountKeys.LASTNAME]',
      email: 'jacklame@gmail.com',
      phone: '555555555',
      roopairsToken: '',
      manId: 102449555,
    },
  },
  PM_WITH_TOKEN: { // PM Account with token
    type: TYPE,
    profile: {
      accountType: AccountTypes.Landlord,
      firstName: 'Jack',
      streetAddress: 'lifelike line Apt. 3',
      city: undefined,
      lastName: 'profile[accountKeys.LASTNAME]',
      email: 'jacklame@gmail.com',
      phone: '555555555',
      roopairsToken: '8f2974bdc4c19c5d0276f0a51b163087a23f9e42',
      manId: 102449555,
    },
  },
  TENANT_WITH_TOKEN: { // Tenant account with Token 
    type: TYPE,
    profile: {
      accountType: AccountTypes.Tenant,
      firstName: 'Kyle',
      streetAddress: undefined,
      city: undefined,
      lastName: 'Lion',
      email: 'kylelion@gmail.com',
      phone: '555555555',
      roopairsToken: '8f2974bdc4c19c5d0276f0a51b163087a23f9e42',
      tenantId: 20,
      propId: 99,
    },
  },
  TENANT_WITHOUT_TOKEN: { // Tenant account with Token 
    type: TYPE,
    profile: {
      accountType: AccountTypes.Tenant,
      firstName: 'Kyle',
      streetAddress: 'lifelike line Apt. 3',
      city: 'San Luis Obispo',
      lastName: 'Lion',
      email: 'kylelion@gmail.com',
      phone: '555555555',
      roopairsToken: '',
      tenantId: 20,
      propId: 99,
    },
  },
  NO_TOKEN_DEFINED: { // Account of a response with no token
    type: TYPE,
    profile: {
      accountType: AccountTypes.Landlord,
      firstName: 'Jack',
      streetAddress: undefined,
      city: undefined,
      lastName: 'profile[accountKeys.LASTNAME]',
      email: 'jacklame@gmail.com',
      phone: '555555555',
      roopairsToken: undefined,
      manId: 102449555,
    },
  },
};

const testJsonValues: {[id:string]: any} =
{
  PM_WITHOUT_TOKEN: { // PM without token
    pm: {
      accountType: AccountTypes.Landlord,
      firstName: 'Jack',
      lastName: 'profile[accountKeys.LASTNAME]',
      email: 'jacklame@gmail.com',
      phone: '555555555',
      manId: 102449555,
    },
    token: '',
  },
  PM_WITH_TOKEN: { // PM with token
    pm: {
      accountType: AccountTypes.Tenant,
      firstName: 'Jack',
      lastName: 'profile[accountKeys.LASTNAME]',
      email: 'jacklame@gmail.com',
      streetAddress: 'lifelike line Apt. 3',
      phone: '555555555',
      manId: 102449555,
    },
    token: '8f2974bdc4c19c5d0276f0a51b163087a23f9e42',
  },
  TENANT_WITH_TOKEN: {
    tenant: {
      accountType: AccountTypes.Tenant,
      firstName: 'Kyle',
      lastName: 'Lion',
      email: 'kylelion@gmail.com',
      phone: '555555555',
      propId: 99,
      tenantID: 20,
    },
    token: '8f2974bdc4c19c5d0276f0a51b163087a23f9e42',
  },
  TENANT_WITHOUT_TOKEN: { // Tenant without a token
    tenant: {
      accountType: AccountTypes.Tenant,
      firstName: 'Kyle',
      lastName: 'Lion',
      streetAddress: 'lifelike line Apt. 3',
      city: 'San Luis Obispo',
      email: 'kylelion@gmail.com',
      phone: '555555555',
      propId: 99,
      tenantID: 20,
    },
    token: '',
  },
  NO_TOKEN_DEFINED: { // Response with no token key
    pm: {
      accountType: AccountTypes.Landlord,
      firstName: 'Jack',
      lastName: 'profile[accountKeys.LASTNAME]',
      email: 'jacklame@gmail.com',
      phone: '555555555',
      manId: 102449555,
    },
  },
};


describe('FetchAccountProfile Action Test', () => {
  const mockStore = configureMockStore(middleWares);
  let testStore : any;
  beforeEach(() => {
    testStore = mockStore(storeContents);
  });

  it('Test PM without Roopairs Token', () => {
    testStore.dispatch(AccountActions.fetchAccountProfile(testJsonValues.PM_WITHOUT_TOKEN));
    expect(testStore.getActions()[0]).toStrictEqual(expectedResults.PM_WITHOUT_TOKEN);
  });

  it('Test PM with Roopairs Token', () => {
    testStore.dispatch(AccountActions.fetchAccountProfile(testJsonValues.PM_WITH_TOKEN));
    expect(testStore.getActions()[0]).toStrictEqual(expectedResults.PM_WITH_TOKEN);
  });

  it('Test Tenant with Roopairs Token', () => {
    testStore.dispatch(AccountActions.fetchAccountProfile(testJsonValues.TENANT_WITH_TOKEN));
    expect(testStore.getActions()[0]).toStrictEqual(expectedResults.TENANT_WITH_TOKEN);
  });

  it('Test Tenant without Roopairs Token', () => {
    testStore.dispatch(AccountActions.fetchAccountProfile(testJsonValues.TENANT_WITHOUT_TOKEN));
    expect(testStore.getActions()[0]).toStrictEqual(expectedResults.TENANT_WITHOUT_TOKEN);
  });

  it('Test Account without any Token', () => {
    testStore.dispatch(AccountActions.fetchAccountProfile(testJsonValues.NO_TOKEN_DEFINED));
    expect(testStore.getActions()[0]).toStrictEqual(expectedResults.NO_TOKEN_DEFINED);
  });
 });
 