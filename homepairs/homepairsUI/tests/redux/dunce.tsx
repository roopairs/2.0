import { AccountActions } from 'homepairs-redux-actions';
import { LandlordAccount, AccountTypes, } from 'homepairs-types';
import { fetchAccountProfile } from '../../src/state/account/actions';

const fakeLandLord : LandlordAccount = {
  accountType: AccountTypes.Landlord,
  firstName: 'Jack',
  lastName: 'profile[accountKeys.LASTNAME]',
  email: 'jacklame@gmail.com',
  phone: '555555555',
  roopairsToken: '',
  manId: 102449555,
};

const json : any = {
  pmInfo: {
    accountType: AccountTypes.Landlord,
    FirstName: 'Jack',
    LastName: 'profile[accountKeys.LASTNAME]',
    email: 'jacklame@gmail.com',
    phone: '555555555',
    manId: 102449555,
  },
  roopairs: '',
};

const json2 : any = {
  pmInfo: {
    accountType: AccountTypes.Tenant,
    FirstName: 'Jack',
    LastName: 'profile[accountKeys.LASTNAME]',
    email: 'jacklame@gmail.com',
    phone: '555555555',
    manId: 102449555,
  },
  roopairs: '',
};


test('ACTIONS', () => {
       const expectedAction = {
          type: 'ACCOUNT/FETCH_PROFILE',
          profile: fakeLandLord,
       };
       expect(AccountActions.fetchAccountProfile(json)).toEqual(expectedAction);
       expect( () => AccountActions.fetchAccountProfile(json.pmInfo)).toThrow(TypeError);

 });
 