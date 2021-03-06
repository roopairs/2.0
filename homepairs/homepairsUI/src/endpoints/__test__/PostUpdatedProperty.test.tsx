import { PropertyListActions } from 'homepairs-redux-actions';
import {
    Property,
    EditPropertyState,
    UpdatePropertyAction,
} from 'homepairs-types';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { prepareNavigationMock, displayErrorMock, propertyManagerMock1 } from 'homepairs-test';
import { HOMEPAIRS_PROPERTY_ENDPOINT, postUpdatedProperty } from '../index';

const URL = HOMEPAIRS_PROPERTY_ENDPOINT;
const { PROPERTY_LIST_ACTION_TYPES } = PropertyListActions;
const [mockNavigator, mockNavigationFunction] = prepareNavigationMock();

const prevProperty: Property = {
    address: 'Cool Aid Road',
    propId: '0',
    tenants: 4,
    bedrooms: 3,
    bathrooms: 3,
};
const updatedPropertyTest: Property = {
    address: 'Cool Aid Drive',
    propId: '0',
    tenants: 3,
    bedrooms: 3,
    bathrooms: 3,
};
const updatedPropertyCredentials: EditPropertyState = {
    email: 'jackylynne@gmail.com',
    propId: '0',
    oldProp: prevProperty,
    token: '1B88484KDKSLIEK058UDDD',
};

// To test nested actions with an async REST request, we need to call an await on the
// dispatch methods in order to get an updated state.
describe('postUpdatedProperty Action', () => {
    const mock = new MockAdapter(axios);

    describe('Tests Action when response returned is success', () => {

        beforeEach(() => {
            propertyManagerMock1.clearActions();
            mockNavigationFunction.mockClear();
        });

        it('Test the dispatch and callback methods', async () => {
            const data = {
                status: 'success',
            };
            const expectedResult: UpdatePropertyAction = {
                type: PROPERTY_LIST_ACTION_TYPES.UPDATE_PROPERTY,
                propId: '0',
                userData: {
                    propId: '0',
                    address: 'Cool Aid Drive',
                    tenants: 3,
                    bedrooms: 3,
                    bathrooms: 3,
                },
            };

            mock.onPut(URL).reply(200, data);
            await propertyManagerMock1
                .dispatch(
                    postUpdatedProperty(
                        updatedPropertyTest,
                        updatedPropertyCredentials,
                        displayErrorMock,
                        mockNavigator,
                    ),
                )
                .then(() => {
                    const actionResults = propertyManagerMock1.getActions();
                    expect(actionResults).toHaveLength(1);
                    expect(actionResults[0]).toStrictEqual(expectedResult);
                });
        });
    });

    describe('Tests Action when on failure', () => {
        beforeEach(() => {
            propertyManagerMock1.clearActions();
            mockNavigationFunction.mockClear();
        });

        it('Test when failure to get response', async () => {
            mock.onPut(URL).reply(500);
            await propertyManagerMock1
                .dispatch(
                    postUpdatedProperty(
                        updatedPropertyTest,
                        updatedPropertyCredentials,
                        displayErrorMock,
                        mockNavigator,
                    ),
                )
                .then(() => {
                    expect(mockNavigationFunction).toHaveBeenCalledTimes(0);
                    const actionResults = propertyManagerMock1.getActions();
                    expect(actionResults).toHaveLength(0);
                });
        });

        it('Test when response success but returns failure', async () => {
            const data = {
                status: 'failure',
            };
            mock.onPut(URL).reply(200, data);
            await propertyManagerMock1
                .dispatch(
                    postUpdatedProperty(
                        updatedPropertyTest,
                        updatedPropertyCredentials,
                        displayErrorMock,
                        mockNavigator,
                    ),
                )
                .then(() => {
                    expect(mockNavigationFunction).toHaveBeenCalledTimes(0);
                    const actionResults = propertyManagerMock1.getActions();
                    expect(actionResults).toHaveLength(0);
                });
        });
    });
});