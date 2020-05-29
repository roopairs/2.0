import {
    AccountTypes,
    AccountStateAction,
    AccountState,
} from '../types';
import { FETCH_PROFILE_ACTION_TYPES } from './actions';
import { accountProfile } from './reducer';

const { FETCH_PROFILE } = FETCH_PROFILE_ACTION_TYPES;

const EMPTY = {};

const prevState: AccountState = {
    accountType: AccountTypes.PropertyManager,
    firstName: 'Louis The Third',
    streetAddress: '2222 LifeLine Ave.',
    city: undefined,
    lastName: 'Et tu nevouw',
    email: 'iamKing@gmail.com',
    token: '',
    manId: 102449555,
};

const newPMState: AccountState = {
    accountType: AccountTypes.PropertyManager,
    firstName: 'Jack',
    streetAddress: undefined,
    city: undefined,
    lastName: 'profile[accountKeys.LASTNAME]',
    email: 'jacklame@gmail.com',
    token: '',
    manId: 102449555,
};
const newTenantState: AccountState = {
    accountType: AccountTypes.Tenant,
    firstName: 'Kyle',
    streetAddress: undefined,
    city: undefined,
    lastName: 'Lion',
    email: 'kylelion@gmail.com',
    token: '8f2974bdc4c19c5d0276f0a51b163087a23f9e42',
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
