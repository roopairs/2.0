import { AccountActions } from 'homepairs-redux-actions';
import { AccountTypes, AccountStateAction } from 'homepairs-types';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { testStore1 as storeContents } from 'homepairs-test';


const middleWares = [thunk];
const TYPE = 'ACCOUNT/FETCH_PROFILE';

const expectedResults: {[id:string]: AccountStateAction} = {
  PM_WITHOUT_TOKEN: { // PM Account w/out token 
    type: TYPE,
    profile: {
      accountType: AccountTypes.PropertyManager,
      firstName: 'Jack',
      address: undefined,
      lastName: 'profile[accountKeys.LASTNAME]',
      email: 'jacklame@gmail.com',
      roopairsToken: '',
      pmId: 102449555,
    },
  },
  PM_WITH_TOKEN: { // PM Account with token
    type: TYPE,
    profile: {
      accountType: AccountTypes.PropertyManager,
      firstName: 'Jack',
      address: 'lifelike line Apt. 3',
      lastName: 'profile[accountKeys.LASTNAME]',
      email: 'jacklame@gmail.com',
      roopairsToken: '8f2974bdc4c19c5d0276f0a51b163087a23f9e42',
      pmId: 102449555,
    },
  },
  TENANT_WITH_TOKEN: { // Tenant account with Token 
    type: TYPE,
    profile: {
      accountType: AccountTypes.Tenant,
      firstName: 'Kyle',
      address: undefined,
      lastName: 'Lion',
      email: 'kylelion@gmail.com',
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
      address: 'lifelike line Apt. 3',
      lastName: 'Lion',
      email: 'kylelion@gmail.com',
      roopairsToken: '',
      tenantId: 20,
      propId: 99,
    },
  },
  NO_TOKEN_DEFINED: { // Account of a response with no token
    type: TYPE,
    profile: {
      accountType: AccountTypes.PropertyManager,
      firstName: 'Jack',
      address: undefined,
      lastName: 'profile[accountKeys.LASTNAME]',
      email: 'jacklame@gmail.com',
      roopairsToken: undefined,
      pmId: 102449555,
    },
  },
};

const testJsonValues: {[id:string]: any} =
{
  PM_WITHOUT_TOKEN: { // PM without token
    role: 'pm',
    pm: {
      accountType: AccountTypes.PropertyManager,
      firstName: 'Jack',
      lastName: 'profile[accountKeys.LASTNAME]',
      email: 'jacklame@gmail.com',
      pmId: 102449555,
    },
    token: '',
  },
  PM_WITH_TOKEN: { // PM with token
    role: 'pm',
    pm: {
      accountType: AccountTypes.Tenant,
      firstName: 'Jack',
      lastName: 'profile[accountKeys.LASTNAME]',
      email: 'jacklame@gmail.com',
      address: 'lifelike line Apt. 3',
      pmId: 102449555,
    },
    token: '8f2974bdc4c19c5d0276f0a51b163087a23f9e42',
  },
  TENANT_WITH_TOKEN: {
    role: 'tenant',
    tenant: {
      accountType: AccountTypes.Tenant,
      firstName: 'Kyle',
      lastName: 'Lion',
      email: 'kylelion@gmail.com',
      propId: 99,
      tenantID: 20,
    },
    token: '8f2974bdc4c19c5d0276f0a51b163087a23f9e42',
  },
  TENANT_WITHOUT_TOKEN: { // Tenant without a token
    role: 'tenant',
    tenant: {
      accountType: AccountTypes.Tenant,
      firstName: 'Kyle',
      lastName: 'Lion',
      address: 'lifelike line Apt. 3',
      email: 'kylelion@gmail.com',
      propId: 99,
      tenantID: 20,
    },
    token: '',
  },
  NO_TOKEN_DEFINED: { // Response with no token key
    role: 'pm',
    pm: {
      accountType: AccountTypes.PropertyManager,
      firstName: 'Jack',
      lastName: 'profile[accountKeys.LASTNAME]',
      email: 'jacklame@gmail.com',
      pmId: 102449555,
    },
  },
};


describe('FetchAccount Action Test', () => {
  const mockStore = configureMockStore(middleWares);
  let testStore : any;
  beforeEach(() => {
    testStore = mockStore(storeContents);
  });

  it('Test PM without Roopairs Token', async () => {
    await testStore.dispatch(AccountActions.parseAccount(testJsonValues.PM_WITHOUT_TOKEN));
    expect(testStore.getActions()[0]).toStrictEqual(expectedResults.PM_WITHOUT_TOKEN);
  });

  it('Test PM with Roopairs Token', async () => {
    await testStore.dispatch(AccountActions.parseAccount(testJsonValues.PM_WITH_TOKEN));
    expect(testStore.getActions()[0]).toStrictEqual(expectedResults.PM_WITH_TOKEN);
  });

  it('Test Tenant with Roopairs Token', async () => {
    await testStore.dispatch(AccountActions.parseAccount(testJsonValues.TENANT_WITH_TOKEN));
    expect(testStore.getActions()[0]).toStrictEqual(expectedResults.TENANT_WITH_TOKEN);
  });

  it('Test Tenant without Roopairs Token', async () => {
    await testStore.dispatch(AccountActions.parseAccount(testJsonValues.TENANT_WITHOUT_TOKEN));
    expect(testStore.getActions()[0]).toStrictEqual(expectedResults.TENANT_WITHOUT_TOKEN);
  });

  it('Test Account without any Token', async () => {
    await testStore.dispatch(AccountActions.parseAccount(testJsonValues.NO_TOKEN_DEFINED));
    expect(testStore.getActions()[0]).toStrictEqual(expectedResults.NO_TOKEN_DEFINED);
  });
 });
 