import {
    AccountTypes,
    AccountStateAction,
    AccountState,
} from 'homepairs-types';
import { AccountActions } from 'homepairs-redux-actions';
import { accountProfile } from '../../../src/state/account/reducer';

const { FETCH_PROFILE } = AccountActions.FETCH_PROFILE_ACTION_TYPES;

const EMPTY = {};

const prevState: AccountState = {
    accountType: AccountTypes.Landlord,
    firstName: 'Louis The Third',
    streetAddress: '2222 LifeLine Ave.',
    city: undefined,
    lastName: 'Et tu nevouw',
    email: 'iamKing@gmail.com',
    phone: '555.333.5555',
    roopairsToken: '',
    manId: 102449555,
};

const newPMState: AccountState = {
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
const newTenantState: AccountState = {
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
};

describe('AccountProfile Reducer Test', () => {
    it('Test action with FETCH_PROFILE type: Default State', () => {
        const testAction = {
            type: FETCH_PROFILE,
            profile: newPMState,
        };
        const expectedResults = newPMState;
        const updatedProfile = accountProfile(undefined, testAction);
        expect(updatedProfile).toStrictEqual(expectedResults);
    });

    it('Test action with no type: Default State', () => {
        const testAction = {
            type: undefined,
            profile: newPMState,
        };
        const updatedProfile = accountProfile(undefined, testAction);
        expect(updatedProfile).toStrictEqual(EMPTY);
    });

    it('Test action with no type: Defined State', () => {
        const testAction = {
            type: undefined,
            profile: newTenantState,
        };
        const updatedProfile = accountProfile(prevState, testAction);
        expect(updatedProfile).toStrictEqual(prevState);
    });

    it('Test action with FETCH_PROFILE (Tenant) type: Defined State', () => {
        const testAction: AccountStateAction = {
            type: FETCH_PROFILE,
            profile: newTenantState,
        };
        const expectedResults = newTenantState;
        const updatedProfile = accountProfile(prevState, testAction);
        expect(updatedProfile).toStrictEqual(expectedResults);
    });
});
