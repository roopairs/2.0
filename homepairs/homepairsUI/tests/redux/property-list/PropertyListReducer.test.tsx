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
import { PropertyListActions} from 'homepairs-redux-actions';
import { setSelectedProperty, removeProperty } from 'src/state/property-list/actions';
import { properties, initialState } from '../../../src/state/property-list/reducer';

const { PROPERTY_LIST_ACTION_TYPES } = PropertyListActions;
const PMProperties: Property[] = [
    {
        tenants: 5,
        bathrooms: 2,
        bedrooms: 3,
        address: '200 N. Santa Rosa, San Luis Obispo, CA',
    },
    {
        tenants: 5,
        bathrooms: 2,
        bedrooms: 3,
        address: '200 N. Santa Fey, Glenndale, CA',
    },
    {
        tenants: 5,
        bathrooms: 2,
        bedrooms: 3,
        address: '200 New Fields Lane, Dublin, CA',
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
        const testAction: FetchPropertiesAction = {
            type: 'INVALID_STATE',
            properties: [],
        };
        it('Undefined State', () => {
            const updatedProperties = properties(undefined, testAction);
            expect(updatedProperties).toStrictEqual(initialState);
        });

        it('Defined State', () => {
            const updatedProperties = properties(testPropertyListStateWithoutIndex, testAction);
            expect(updatedProperties).toStrictEqual(testPropertyListStateWithoutIndex);
        });
    });

    describe('Test action with ADD_PROPERTY type', () => {
        const testProperty: Property = {
            tenants: 5,
            bathrooms: 2,
            bedrooms: 3,
            address: '200 N. Santa Rosa, San Luis Obispo, CA',
        };
        const testAction: AddPropertyAction = {
            type: PROPERTY_LIST_ACTION_TYPES.ADD_PROPERTY,
            userData: testProperty,
        };
        it('Default State', () => {
            const expectedResult: PropertyListState = {
                appliances: [],
                selectedPropertyIndex: null,
                properties: [testProperty],
                propertyManager: null,
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
        it('Test if removeProperty returns correct results', () => {
            expect(removeProperty(1)).toStrictEqual(testAction);
        });
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
            tenants: 4,
            bathrooms: 2,
            bedrooms: 3,
            address: '200 N. Santa Rosa, Los Lobos, CA',
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

    describe('Test action with FETCH_PROPERTIES type', () => {
        const testAction: FetchPropertiesAction = {
            type: PROPERTY_LIST_ACTION_TYPES.FETCH_PROPERTIES,
            properties: PMProperties,
        };

        // This means, no state was passed into the reducer
        it('Default State', () => {
            const expectedResult: PropertyListState = {
                appliances: [],
                selectedPropertyIndex: null,
                properties: PMProperties,
                propertyManager: null,
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
        const expectedResult: PropertyListState = {
            selectedPropertyIndex: 2,
            properties: PMProperties,
        };

        it('Test the actual Action: SetSelectedPropertyAction', () => {
            expect(setSelectedProperty(2)).toStrictEqual(testAction);
        });

        // This means that there is a state passed into the reducer
        it('Passed State: With Index', () => {
            const updatedProperties = properties(
                testPropertyListStateWithIndex,
                testAction,
            );
            expect(updatedProperties).toStrictEqual(expectedResult);
        });

        it('Passed State: Without Index', () => {
            const updatedProperties = properties(
                testPropertyListStateWithoutIndex,
                testAction,
            );
            expect(updatedProperties).toStrictEqual(expectedResult);
        });
    });
});
