import {
    FetchPropertiesAction,
    FetchPropertyAction,
    AddPropertyAction,
    RemovePropertyAction,
    Property,
    PropertyListState,
    UpdatePropertyAction,
    SetSelectedPropertyAction,
    PropertyDict,
} from 'homepairs-types';
import { PROPERTY_LIST_ACTION_TYPES, setSelectedProperty, removeProperty } from './actions';
import { properties, initialState } from './reducer';

const testKey = '12';
const testKeyLastKey = '13';

const PMProperties: PropertyDict= {
    '11': {
        propId: '11',
        tenants: 5,
        bathrooms: 2,
        bedrooms: 3,
        address: '200 N. Santa Rosa, San Luis Obispo, CA',
    },
    [testKey]: {
        propId: testKey,
        tenants: 5,
        bathrooms: 2,
        bedrooms: 3,
        address: '200 N. Santa Fey, Glenndale, CA',
    },
    '13': {
        propId: '13',
        tenants: 5,
        bathrooms: 2,
        bedrooms: 3,
        address: '200 New Fields Lane, Dublin, CA',
    },
};
const testPropertyListStateWithoutIndex: PropertyListState = {
    selectedPropertyId: undefined,
    properties: PMProperties,
    appliances: undefined,
};
const testPropertyListStateWithIndex: PropertyListState = {
    selectedPropertyId: testKey,
    properties: PMProperties,
    appliances: undefined,
};

describe('PropertyList Reducer Test', () => {

    describe('Test action with Invalid Property type', () => {
        const testAction: FetchPropertiesAction = {
            type: 'INVALID_STATE',
            properties: {},
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
            propId: '14',
            tenants: 5,
            bathrooms: 2,
            bedrooms: 3,
            address: '200 N. Santa Rosa, San Luis Obispo, CA',
        };
        const testAction: AddPropertyAction = {
            type: PROPERTY_LIST_ACTION_TYPES.ADD_PROPERTY,
            userData: testProperty,
        };
        const testPropertyObject = {[testProperty.propId] : testProperty};

        it('Default State', () => {
            const expectedResult: PropertyListState = {
                appliances: [],
                selectedPropertyId: null,
                properties: testPropertyObject,
                propertyManager: null,
            };
            const updatedProperties = properties(undefined, testAction);
            expect(updatedProperties).toStrictEqual(expectedResult);
        });

        it('Passed State', () => {
            const updatedList = {...PMProperties, ...testPropertyObject};
            const expectedResult: PropertyListState = {
                selectedPropertyId: null,
                properties: {...updatedList},
                appliances: undefined,
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
            propId: testKey,
        };
        it('Test if removeProperty returns correct results', () => {
            expect(removeProperty(testKey)).toStrictEqual(testAction);
        });
        
        it('Passed State', () => {
            let updatedList = {...PMProperties};
            delete updatedList[testKey];
            const expectedResult: PropertyListState = {
                selectedPropertyId: null,
                properties: updatedList,
                appliances: undefined,
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
            propId: testKey,
            tenants: 4,
            bathrooms: 2,
            bedrooms: 3,
            address: '200 N. Santa Rosa, Los Lobos, CA',
        };
        const testAction: UpdatePropertyAction = {
            type: PROPERTY_LIST_ACTION_TYPES.UPDATE_PROPERTY,
            propId: testKey,
            userData: testProperty,
        };
        it('Passed State', () => {
            let updatedList = {...PMProperties};
            updatedList[testKey] = testProperty;
            const expectedResult: PropertyListState = {
                selectedPropertyId: testKey,
                properties: updatedList,
                appliances: undefined,
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
                selectedPropertyId: null,
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
            propId: testKeyLastKey,
        };
        const expectedResult: PropertyListState = {
            selectedPropertyId: testKeyLastKey,
            properties: PMProperties,
            appliances: undefined,
        };

        it('Test the actual Action: SetSelectedPropertyAction', () => {
            expect(setSelectedProperty(testKeyLastKey)).toStrictEqual(testAction);
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
