import { PropertyListActions } from 'homepairs-redux-actions';
import {
    Property,
    AddNewPropertyState,
    AddPropertyAction,
} from 'homepairs-types';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {HOMEPAIRS_PROPERTY_ENDPOINT, postNewProperty } from 'homepairs-endpoints';

import { prepareNavigationMock, displayErrorMock } from 'tests/fixtures/DummyComponents';
import { propertyManagerMock1 } from '../../fixtures/StoreFixture';

const URL = HOMEPAIRS_PROPERTY_ENDPOINT;
const {PROPERTY_LIST_ACTION_TYPES } = PropertyListActions;
const [mockStackNavigator, navigationStackSpyFunction] = prepareNavigationMock();

const newPropertyTest: Property = {
    address: 'Cool Aid Drive, HoodRat City, GA',
    tenants: 3,
    bedrooms: 3,
    bathrooms: 3,
};
const newPropertyCredentials: AddNewPropertyState = {
    email: 'jackylynne@gmail.com',
    roopairsToken: '1B88484KDKSLIEK058UDDD',
};

// To test nested actions with an async REST request, we need to call an await on the
// dispatch methods in order to get an updated state.
describe('postNewProperty Action', () => {
    const mock = new MockAdapter(axios);

    describe('Tests Action when response returned is success', () => {
        const setInitialStateSpy = jest.fn();

        beforeEach(() => {
            propertyManagerMock1.clearActions();
            navigationStackSpyFunction.mockClear();
            setInitialStateSpy.mockClear();
            displayErrorMock.mockClear();
        });

        it('Test the dispatch and callback methods', async () => {
            const data = {
                status: 'success',
            };
            const expectedResult: AddPropertyAction = {
                type: PROPERTY_LIST_ACTION_TYPES.ADD_PROPERTY,
                userData: {
                    address: 'Cool Aid Drive, HoodRat City, GA',
                    tenants: 3,
                    bedrooms: 3,
                    bathrooms: 3,
                    propId: undefined,
                },
            };

            mock.onPost(URL).reply(200, data);
            await propertyManagerMock1
                .dispatch(
                    postNewProperty(
                        newPropertyTest,
                        newPropertyCredentials,
                        setInitialStateSpy,
                        displayErrorMock,
                        mockStackNavigator,
                    ),
                )
                .then(() => {
                    expect(setInitialStateSpy).toHaveBeenCalledTimes(1);
                    const actionResults = propertyManagerMock1.getActions();
                    expect(actionResults).toHaveLength(1);
                    expect(actionResults[0]).toStrictEqual(expectedResult);
                });
        });
    });

    describe('Tests Action when on failure', () => {
        const setInitialStateSpy = jest.fn();

        beforeEach(() => {
            propertyManagerMock1.clearActions();
            navigationStackSpyFunction.mockClear();
            setInitialStateSpy.mockClear();
            displayErrorMock.mockClear();
        });

        it('Test when failure to get response', async () => {
            mock.onPost(URL).reply(404);
            await propertyManagerMock1
                .dispatch(
                    postNewProperty(
                        newPropertyTest,
                        newPropertyCredentials,
                        setInitialStateSpy,
                        displayErrorMock,
                        mockStackNavigator,
                    ),
                )
                .then(() => {
                    expect(setInitialStateSpy).toHaveBeenCalledTimes(0);
                    const actionResults = propertyManagerMock1.getActions();
                    expect(actionResults).toHaveLength(0);
                    expect(navigationStackSpyFunction).toHaveBeenCalledTimes(0);                    
                });
        });

        it('Test when response success but returns failure', async () => {
            const data = {
                status: 'failure',
            };
            mock.onPost(URL).reply(200, data);
            await propertyManagerMock1
                .dispatch(
                    postNewProperty(
                        newPropertyTest,
                        newPropertyCredentials,
                        setInitialStateSpy,
                        displayErrorMock,
                        mockStackNavigator,
                    ),
                )
                .then(() => {
                    expect(setInitialStateSpy).toHaveBeenCalledTimes(0);
                    const actionResults = propertyManagerMock1.getActions();
                    expect(actionResults).toHaveLength(0);
                    expect(navigationStackSpyFunction).toHaveBeenCalledTimes(0);                    
                });
        });
    });
});
