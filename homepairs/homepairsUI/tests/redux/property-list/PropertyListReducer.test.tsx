import {
    FetchPropertiesAction,
    FetchPropertyAction,
    AddPropertyAction,
    RemovePropertyAction,
    Property,
    PropertyListState,
    UpdatePropertyAction,
    SetSelectedPropertyAction,
} from 'homepairs-types';
import { PropertyListActions } from 'homepairs-redux-actions';
import { properties, initialState } from '../../../src/state/property-list/reducer';

const { PROPERTY_LIST_ACTION_TYPES } = PropertyListActions;

const PMProperties: Property[] = [
    {
        city: 'San Luis Obispo',
        tenants: 5,
        bathrooms: 2,
        bedrooms: 3,
        state: 'CA',
        streetAddress: '200 N. Santa Rosa',
    },
    {
        city: 'Glenndale',
        tenants: 5,
        bathrooms: 2,
        bedrooms: 3,
        state: 'CA',
        streetAddress: '200 N. Santa Fey',
    },
    {
        city: 'Dublin',
        tenants: 5,
        bathrooms: 2,
        bedrooms: 3,
        state: 'CA',
        streetAddress: '200 New Fields Lane',
    },
];

const testPropertyListStateWithoutIndex: PropertyListState = {
    selectedPropertyIndex: undefined,
    properties: PMProperties,
};

const testPropertyListStateWithIndex: PropertyListState = {
    selectedPropertyIndex: 1,
    properties: PMProperties,
};

describe('PropertyList Reducer Test', () => {

    describe('Test action with Invalid Property type', () => {
        it('Undefined State', () => {
            const testAction: FetchPropertiesAction = {
                type: 'INVALID_STATE',
                properties: [],
            };
            const updatedProperties = properties(undefined, testAction);
            expect(updatedProperties).toStrictEqual(initialState);
        });

        it('Defined State', () => {
            const testAction: FetchPropertiesAction = {
                type: 'INVALID_STATE',
                properties: [],
            };
            const updatedProperties = properties(testPropertyListStateWithoutIndex, testAction);
            expect(updatedProperties).toStrictEqual(testPropertyListStateWithoutIndex);
        });
    });

    describe('Test action with ADD_PROPERTY type', () => {
        const testProperty: Property = {
            city: 'San Luis Obispo',
            tenants: 5,
            bathrooms: 2,
            bedrooms: 3,
            state: 'CA',
            streetAddress: '200 N. Santa Rosa',
        };
        const testAction: AddPropertyAction = {
            type: PROPERTY_LIST_ACTION_TYPES.ADD_PROPERTY,
            userData: testProperty,
        };
        it('Default State', () => {
            const expectedResult: PropertyListState = {
                selectedPropertyIndex: null,
                properties: [testProperty],
            };
            const updatedProperties = properties(undefined, testAction);
            expect(updatedProperties).toStrictEqual(expectedResult);
        });

        it('Passed State', () => {
            const updatedList = [...PMProperties, testProperty];
            const expectedResult: PropertyListState = {
                selectedPropertyIndex: null,
                properties: updatedList,
            };
            const updatedProperties = properties(
                testPropertyListStateWithoutIndex,
                testAction,
            );
            expect(updatedProperties).toStrictEqual(expectedResult);
        });
    });

    describe('Test action with REMOVE_PROPERTY type', () => {
        const testAction: RemovePropertyAction = {
            type: PROPERTY_LIST_ACTION_TYPES.REMOVE_PROPERTY,
            index: 1,
        };
        it('Passed State', () => {
            const updatedList = [PMProperties[0], PMProperties[2]];
            const expectedResult: PropertyListState = {
                selectedPropertyIndex: null,
                properties: updatedList,
            };
            const updatedProperties = properties(
                testPropertyListStateWithIndex,
                testAction,
            );
            expect(updatedProperties).toStrictEqual(expectedResult);
        });
    });

    describe('Test action with UPDATE_PROPERTY type', () => {
        const testProperty: Property = {
            city: 'Los Lobos',
            tenants: 4,
            bathrooms: 2,
            bedrooms: 3,
            state: 'CA',
            streetAddress: '200 N. Santa Rosa',
        };
        const testAction: UpdatePropertyAction = {
            type: PROPERTY_LIST_ACTION_TYPES.UPDATE_PROPERTY,
            index: 1,
            userData: testProperty,
        };
        it('Passed State', () => {
            const updatedList = [
                PMProperties[0],
                testProperty,
                PMProperties[2],
            ];
            const expectedResult: PropertyListState = {
                selectedPropertyIndex: 1,
                properties: updatedList,
            };
            const updatedProperties = properties(
                testPropertyListStateWithIndex,
                testAction,
            );
            expect(updatedProperties).toStrictEqual(expectedResult);
        });
    });

    describe('Test action with FETCH_PROPERTY type', () => {
        const testProperty: Property[] = [
            {
                city: 'San Luis Obispo',
                tenants: 5,
                bathrooms: 2,
                bedrooms: 3,
                state: 'CA',
                streetAddress: '200 N. Santa Rosa',
            },
        ];
        const testAction: FetchPropertyAction = {
            type: PROPERTY_LIST_ACTION_TYPES.FETCH_PROPERTY,
            property: testProperty,
        };
        it('Default State', () => {
            const expectedResult: PropertyListState = {
                selectedPropertyIndex: null,
                properties: testProperty,
            };
            const updatedProperties = properties(undefined, testAction);
            expect(updatedProperties).toStrictEqual(expectedResult);
        });
    });

    describe('Test action with FETCH_PROPERTIES type', () => {
        const testAction: FetchPropertiesAction = {
            type: PROPERTY_LIST_ACTION_TYPES.FETCH_PROPERTIES,
            properties: PMProperties,
        };
        it('Passed State', () => {
            const expectedResult: PropertyListState = {
                selectedPropertyIndex: null,
                properties: PMProperties,
            };
            const updatedProperties = properties(undefined, testAction);
            expect(updatedProperties).toStrictEqual(expectedResult);
        });
    });

    describe('Test action with SET_SELECTED_PROPERTIES type', () => {
        const testAction: SetSelectedPropertyAction = {
            type: PROPERTY_LIST_ACTION_TYPES.SET_SELECTED_PROPERTY,
            index: 2,
        };
        it('Passed State: With Index', () => {
            const expectedResult: PropertyListState = {
                selectedPropertyIndex: 2,
                properties: PMProperties,
            };
            const updatedProperties = properties(
                testPropertyListStateWithIndex,
                testAction,
            );
            expect(updatedProperties).toStrictEqual(expectedResult);
        });

        it('Passed State: Without Index', () => {
            const expectedResult: PropertyListState = {
                selectedPropertyIndex: 2,
                properties: PMProperties,
            };
            const updatedProperties = properties(
                testPropertyListStateWithoutIndex,
                testAction,
            );
            expect(updatedProperties).toStrictEqual(expectedResult);
        });
    });
});
