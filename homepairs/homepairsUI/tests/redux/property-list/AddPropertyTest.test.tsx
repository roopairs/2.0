import { PropertyListActions } from 'homepairs-redux-actions';
import {
    Property,
    AddNewPropertyState,
    AddPropertyAction,
} from 'homepairs-types';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { propertyManagerMock1 } from '../../fixtures/StoreFixture';

const URL = 'https://homepairs-alpha.herokuapp.com/API/property/create/';

const { postNewProperty, PROPERTY_LIST_ACTION_TYPES } = PropertyListActions;
const newPropertyTest: Property = {
    streetAddress: 'Cool Aid Drive',
    city: 'HoodRat City',
    state: 'Georgia',
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
        const onChangeModalVisibilitySpy = jest.fn((arg: boolean) => {});

        beforeEach(() => {
            propertyManagerMock1.clearActions();
        });

        it('Test the dispatch and callback methods', async () => {
            const data = {
                status: 'success',
            };
            const expectedResult: AddPropertyAction = {
                type: PROPERTY_LIST_ACTION_TYPES.ADD_PROPERTY,
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
                    postNewProperty(
                        newPropertyTest,
                        newPropertyCredentials,
                        setInitialStateSpy,
                        onChangeModalVisibilitySpy,
                    ),
                )
                .then(() => {
                    expect(setInitialStateSpy.mock.calls).toHaveLength(1);
                    expect(onChangeModalVisibilitySpy.mock.calls).toHaveLength(1);
                    expect(onChangeModalVisibilitySpy).toHaveBeenCalledWith(
                        false,
                    );
                    const actionResults = propertyManagerMock1.getActions();
                    expect(actionResults).toHaveLength(1);
                    expect(actionResults[0]).toStrictEqual(expectedResult);
                });
        });
    });

    describe('Tests Action when on failure', () => {
        const setInitialStateSpy = jest.fn();
        const onChangeModalVisibilitySpy = jest.fn((arg: boolean) => {});

        beforeEach(() => {
            propertyManagerMock1.clearActions();
            setInitialStateSpy.mockClear();
            onChangeModalVisibilitySpy.mockClear();
        });

        it('Test when failure to get response', async () => {
            mock.onPost(URL).reply(500, null);
            await propertyManagerMock1
                .dispatch(
                    postNewProperty(
                        newPropertyTest,
                        newPropertyCredentials,
                        setInitialStateSpy,
                        onChangeModalVisibilitySpy,
                    ),
                )
                .then(() => {
                    expect(setInitialStateSpy.mock.calls).toHaveLength(0);
                    expect(onChangeModalVisibilitySpy.mock.calls).toHaveLength(0);
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
                    postNewProperty(
                        newPropertyTest,
                        newPropertyCredentials,
                        setInitialStateSpy,
                        onChangeModalVisibilitySpy,
                    ),
                )
                .then(() => {
                    expect(setInitialStateSpy.mock.calls).toHaveLength(0);
                    expect(onChangeModalVisibilitySpy.mock.calls).toHaveLength(0);
                    const actionResults = propertyManagerMock1.getActions();
                    expect(actionResults).toHaveLength(0);
                });
        });
    });
});
