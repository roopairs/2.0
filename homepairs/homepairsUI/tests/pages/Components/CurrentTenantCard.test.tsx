import React from 'react';
import { TenantAccount, AccountTypes } from 'src/state/types';
import { fireEvent, render } from 'react-native-testing-library';
import CurrentTenantCard from 'src/Screens/Components/CurrentTenantCard/CurrentTenantCard';
import { prepareNavigationMock } from 'tests/fixtures/DummyComponents';
import ThinButton from 'src/Elements/Buttons/ThinButton';
import { navigationPages } from 'src/Routes/RouteConstants';
import { TouchableOpacity, Platform } from 'react-native';

const [mockStackNavigation, navigationStackSpyFunction] = prepareNavigationMock();

const fakeTenants: TenantAccount[] = [
    {
        propId: 1,
        tenantId: 1,
        firstName: 'Alex',
        lastName: 'Kavanaugh',
        accountType: AccountTypes.Tenant,
        email: 'alex@roopairs.com',
        streetAddress: '1111 Some Street',
        city: 'San Luis Obispo',
        roopairsToken: '000000',
    },
    {
        propId: 1,
        tenantId: 2,
        firstName: 'David',
        lastName: 'Bartolomucci',
        accountType: AccountTypes.Tenant,
        email: 'david@roopairs.com',
        streetAddress: '1111 Some Street',
        city: 'San Luis Obispo',
        roopairsToken: '000000',
    },
    {
        propId: 1,
        tenantId: 3,
        firstName: 'Ray',
        lastName: 'Bartolomucci',
        accountType: AccountTypes.Tenant,
        email: 'ray@roopairs.com',
        streetAddress: '1111 Some Street',
        city: 'San Luis Obispo',
        roopairsToken: '000000',
    },
];

describe('Current Tenant Card Test', () => {
    describe('When an empty list of tenants has been passed', ()=> {
        const emptyTenants: TenantAccount[] = [];
        const testValues = [ emptyTenants, undefined, null];
        const maxTenants = 1;
        it.each(testValues)('Test when the list is empty, undefined, or null', (tenants) => {
            const rendered = render(
            <CurrentTenantCard 
                testID='tenant-card-test'
                tenants={tenants} 
                maxTenants={maxTenants} 
                navigation={mockStackNavigation}/>);
            const {getByTestId, queryAllByType, getByText} = rendered;
            
            // Check if the correct title has been rendered
            expect(getByText('Current Tenants')).toBeDefined();
            // Check if only one thin button has been rendered. The add tenant button
            expect(queryAllByType(ThinButton)).toHaveLength(1);
            
            // Test to see if the button fires the correct event 
            fireEvent.press(getByTestId('click-thin-button'));
            expect(navigationStackSpyFunction).toHaveBeenCalled();
            
            // Web will have different values passed in to it's spy. So here we define different test. 
            if(Platform.OS === 'web'){
                const expectedWebRoute = `${navigationPages.AddTenantModal}`;
                const expectedWebParam = {background: mockStackNavigation.navigation.location};
                expect(navigationStackSpyFunction).toHaveBeenLastCalledWith(expectedWebRoute, expectedWebParam);
            }else{
                expect(navigationStackSpyFunction).toHaveBeenCalledWith(navigationPages.AddTenantModal);
            }

        });

    });

    describe('When an a list of tenants has been passed', ()=> {
        const tenants = fakeTenants;
        const error= 'This property has reached its maximum amount of tenants. Please remove a tenant if you wish to add another.';

        beforeEach(() => {
            navigationStackSpyFunction.mockClear();
        });
        it('The list is less than the max amount of tenants', () => {
            const validAmount = 4;
            const rendered = render(
                <CurrentTenantCard 
                    tenants={tenants} 
                    maxTenants={validAmount} 
                    navigation={mockStackNavigation}/>);
                const {queryAllByType, getAllByType, queryByText} = rendered;

            // Check if 3 thin buttons have been rendered. The add tenant button, and two edit buttons
            expect(queryAllByType(ThinButton)).toHaveLength(4);
            const pressables = getAllByType(TouchableOpacity);

            // Test to see if the buttons fire the correct events
            pressables.forEach(pressable => {
                fireEvent.press(pressable);
            });
            expect(navigationStackSpyFunction).toHaveBeenCalledTimes(4);
            expect(queryByText(error)).toBeNull();
        });

        it('The list is equal to the max amount of tenants', () => {
            const validAmount = 3;
            const rendered = render(
                <CurrentTenantCard 
                    tenants={tenants} 
                    maxTenants={validAmount} 
                    navigation={mockStackNavigation}/>);
            const {queryAllByType, getAllByType, getByText} = rendered;

            // Check if 3 thin buttons have been rendered. The add tenant button, and two edit buttons
            expect(queryAllByType(ThinButton)).toHaveLength(4);
            const pressables = getAllByType(TouchableOpacity);

            // Test to see if the buttons fire the correct events
            pressables.forEach(pressable => {
                fireEvent.press(pressable);
            });
            
            expect(navigationStackSpyFunction).toHaveBeenCalledTimes(3);

            // Now check if error had been rendered. It should in this case
            expect(getByText(error)).toBeDefined();

        });

        it('The list is greater than the max amount of tenants', () => {
            const maxTenants = 2;
            expect(() => render(
                <CurrentTenantCard 
                    tenants={tenants} 
                    maxTenants={maxTenants} 
                    navigation={mockStackNavigation}/>)).toThrowError('Maximum Amount of Tenants Exceeded');
        });
    });

});