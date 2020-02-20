import { PropertyListActions } from 'homepairs-redux-actions';
import {
    Property,
    EditPropertyState,
    UpdatePropertyAction,
} from 'homepairs-types';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockStackNavigation, navigationStackSpyFunction } from 'tests/fixtures/DummyComponents';
import { propertyManagerMock1 } from '../../fixtures/StoreFixture';

const URL = 'https://homepairs-alpha.herokuapp.com/API/property/update/';

const { postUpdatedProperty, PROPERTY_LIST_ACTION_TYPES } = PropertyListActions;

const prevProperty: Property = {
    streetAddress: 'Cool Aid Road',
    city: 'HoodRat Town',
    state: 'Georgia',
    tenants: 4,
    bedrooms: 3,
    bathrooms: 3,
};
const updatedPropertyTest: Property = {
    streetAddress: 'Cool Aid Drive',
    city: 'HoodRat City',
    state: 'Georgia',
    tenants: 3,
    bedrooms: 3,
    bathrooms: 3,
};
const updatedPropertyCredentials: EditPropertyState = {
    email: 'jackylynne@gmail.com',
    index: 0,
    oldProp: prevProperty,
    roopairsToken: '1B88484KDKSLIEK058UDDD',
};

// To test nested actions with an async REST request, we need to call an await on the
// dispatch methods in order to get an updated state.
describe('postUpdatedProperty Action', () => {
    const mock = new MockAdapter(axios);

    describe('Tests Action when response returned is success', () => {

        beforeEach(() => {
            propertyManagerMock1.clearActions();
            navigationStackSpyFunction.mockClear();
        });

        it('Test the dispatch and callback methods', async () => {
            const data = {
                status: 'success',
            };
            const expectedResult: UpdatePropertyAction = {
                type: PROPERTY_LIST_ACTION_TYPES.UPDATE_PROPERTY,
                index: 0,
                userData: {
                    streetAddress: 'Cool Aid Drive',
                    city: 'HoodRat City',
                    state: 'Georgia',
                    tenants: 3,
                    bedrooms: 3,
                    bathrooms: 3,
                },
            };

            mock.onPost(URL).reply(200, data);
            await propertyManagerMock1
                .dispatch(
                    postUpdatedProperty(
                        updatedPropertyTest,
                        updatedPropertyCredentials,
                        mockStackNavigation,
                    ),
                )
                .then(() => {
                    expect(navigationStackSpyFunction).toHaveBeenCalledTimes(1);
                    const actionResults = propertyManagerMock1.getActions();
                    expect(actionResults).toHaveLength(1);
                    expect(actionResults[0]).toStrictEqual(expectedResult);
                });
        });
    });

    describe('Tests Action when on failure', () => {
        beforeEach(() => {
            propertyManagerMock1.clearActions();
            navigationStackSpyFunction.mockClear();
        });

        it('Test when failure to get response', async () => {
            mock.onPost(URL).reply(500);
            await propertyManagerMock1
                .dispatch(
                    postUpdatedProperty(
                        updatedPropertyTest,
                        updatedPropertyCredentials,
                        mockStackNavigation,
                    ),
                )
                .then(() => {
                    expect(navigationStackSpyFunction).toHaveBeenCalledTimes(0);
                    const actionResults = propertyManagerMock1.getActions();
                    expect(actionResults).toHaveLength(0);
                });
        });

        it('Test when response success but returns failure', async () => {
            const data = {
                status: 'failure',
            };
            mock.onPost(URL).reply(200, data);
            await propertyManagerMock1
                .dispatch(
                    postUpdatedProperty(
                        updatedPropertyTest,
                        updatedPropertyCredentials,
                        navigationStackSpyFunction,
                    ),
                )
                .then(() => {
                    expect(navigationStackSpyFunction).toHaveBeenCalledTimes(0);
                    const actionResults = propertyManagerMock1.getActions();
                    expect(actionResults).toHaveLength(0);
                });
        });
    });
});