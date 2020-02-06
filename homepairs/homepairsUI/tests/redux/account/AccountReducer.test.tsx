import { AccountTypes, AccountStateAction, AccountState } from 'homepairs-types';
import { accountProfile } from '../../../src/state/account/reducer';


const TYPE = 'ACCOUNT/FETCH_PROFILE';
const EMPTY = {};
const prevState: AccountState = { 
    accountType: AccountTypes.Landlord,
    firstName: 'Jack',
    streetAddress: undefined,
    city: undefined,
    lastName: 'profile[accountKeys.LASTNAME]',
    email: 'jacklame@gmail.com',
    phone: '555555555',
    roopairsToken: '',
    manId: 102449555,
};

const expectedResults: {[id:string]: AccountState} = {
    PM: { 
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
      TENANT: { 
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
};

const testActions: {[id:string]: AccountStateAction} = {
  PM: { // PM Account w/out token 
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
  ACTION_WITH_NO_TYPE: { // PM Account with token
    type: undefined,
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
  TENANT: { // Tenant account with Token 
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
};

describe('AccountProfile Reducer Test', () => {
  it('Test action with FETCH_PROFILE type: Default State', () => {
    const updatedProfile = accountProfile(undefined , testActions.PM);
    expect(updatedProfile).toStrictEqual(expectedResults.PM);
  });

  it('Test action with no type: Default State', () => {
    const updatedProfile = accountProfile(undefined , testActions.ACTION_WITH_NO_TYPE);
    expect(updatedProfile).toStrictEqual(EMPTY);
  });

  it('Test action with no type: Defined State', () => {
    const updatedProfile = accountProfile(prevState, testActions.ACTION_WITH_NO_TYPE);
    expect(updatedProfile).toStrictEqual(prevState);
  });

  it('Test action with FETCH_PROFILE type: Defined State', () => {
    const updatedProfile = accountProfile(prevState, testActions.TENANT);
    expect(updatedProfile).toStrictEqual(expectedResults.TENANT);
  });

 });