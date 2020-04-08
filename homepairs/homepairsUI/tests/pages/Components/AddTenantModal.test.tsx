import React from 'react';
import { AddTenantModal } from 'homepairs-components';
import { AddTenantModalBase } from 'src/Screens/Components/Modals/AddTenantModal';
import { propertyManagerMock1 } from 'tests/fixtures/StoreFixture';
import { BrowserRouter as Router} from 'react-router-dom';
import { prepareNavigationStackFirstRouteMock } from 'tests/fixtures/DummyComponents';
import { Provider } from 'react-redux';
import { render, fireEvent } from 'react-native-testing-library';
import { TextInput, Platform, TouchableOpacity } from 'react-native';
import ThinButton from 'src/Elements/Buttons/ThinButton';
import { TenantInfo } from 'homepairs-types';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { HOMEPAIRS_TENANT_EDIT_ENDPOINT } from 'homepairs-endpoints';

const mockStore = propertyManagerMock1;
const mockAxios = new MockAdapter(axios);
const url = new RegExp(`${HOMEPAIRS_TENANT_EDIT_ENDPOINT}/*`);
const [mockStackNavigationFirstRoute, navigationStackSpyFunction] = prepareNavigationStackFirstRouteMock({tenant:true});
const Component = Platform.OS === 'web' ? 
<Provider store={mockStore}><Router><AddTenantModal navigation={mockStackNavigationFirstRoute} /></Router></Provider> 
:
<Provider store={mockStore}><AddTenantModal navigation={mockStackNavigationFirstRoute} /></Provider>;

describe('Test Add Tenant Modal', () => {
    // All successful replies to the API should always close the modal and function the same. 
    // It is the backend that will handle all the changes.
    const testResponseData = [
        { status: 'success'},
        { status: 'failure'},
        { status: 'foo'},
    ];

    const rendered = render(Component);
    const { queryAllByType, getAllByType, getByType } = rendered;
    const inputForms = queryAllByType(TextInput);
    // Three buttons, close modal, edit tenant, and remove tenant
    const thinButtons = queryAllByType(ThinButton);
    const thinButtonPressable = getAllByType(TouchableOpacity);

    // Use the Base Class to get an instance of the object and insert spy functions 
    const rootObject = getByType(AddTenantModalBase).instance;
    const validateFormsSpy = jest.spyOn(rootObject, 'validateForms');
    const resetFormsSpy = jest.spyOn(rootObject, 'resetForms');
    const generateNewTenantInfoSpy = jest.spyOn(rootObject, 'generateNewTenantInfo');
    const clickSubmitButtonSpy = jest.spyOn(rootObject, 'clickSubmitButton');

    beforeEach(() => {
        navigationStackSpyFunction.mockClear();
        validateFormsSpy.mockClear();
        resetFormsSpy.mockClear();
        generateNewTenantInfoSpy.mockClear();
        rendered.rerender(Component);
    });

    it('Test Adit Tenant Attempt defined as expected', () => {
        // The initial state should be the tenant object stored by the navigation object
        const expectedState: TenantInfo = {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
        };

        // Check if the correct amount of input forms has been rendered. 
        expect(inputForms).toHaveLength(4);
        expect(thinButtons).toHaveLength(1);

        // Check if closeButton functions properly
        fireEvent.press(thinButtonPressable[0]);
        expect(navigationStackSpyFunction).toHaveBeenCalledTimes(1);

        expect(resetFormsSpy).toHaveBeenCalled();
        expect(rootObject.state).toStrictEqual(expectedState);

    });


    it('Test Add Tenant Attempt to add invalid info', () => {
        // Check to see if change of any of the text inputs cause failure
        inputForms.forEach(form => {
            fireEvent.changeText(form, '');
        });
        fireEvent.press(thinButtonPressable[1]);

        // Check to see if function executes properly
        expect(resetFormsSpy).toHaveBeenCalledTimes(1);

        // navigator and generateTenant function should not have been called 
        expect(generateNewTenantInfoSpy).toHaveBeenCalledTimes(0);
        expect(navigationStackSpyFunction).toHaveBeenCalledTimes(0);

    });

    describe('Test is Add button behavior functions as expected', () => {
        beforeEach(() => {
            // Here we will initialize the forms for these test suits 
            fireEvent.changeText(inputForms[0], 'Alex');
            fireEvent.changeText(inputForms[1], 'Kavanaugh');
            fireEvent.changeText(inputForms[2], 'alex@roopairs.com');
            fireEvent.changeText(inputForms[3], '838-034-3333');
            navigationStackSpyFunction.mockClear();
        });

        it('Test Add Button Execution without care for response', () => {
            // Simulate pressing the add button
            fireEvent.press(thinButtonPressable[1]);

            // Only using mock request to prevent errors 
            mockAxios.onPost(url).reply(200, testResponseData[0]);
            // Now press the add button    
            expect(clickSubmitButtonSpy).toHaveBeenCalled();
            expect(validateFormsSpy).toHaveBeenCalled();
            expect(resetFormsSpy).toHaveBeenCalled();
        });

        it.each(testResponseData)('Test Response on success connection', async (data) => {
            mockAxios.onPost(url).reply(200, data);

            // Now test the clickSumbitButton that is was invoked when the add button was pressed
            await rootObject.clickSubmitButton().then(() =>{
                expect(clickSubmitButtonSpy).toHaveBeenCalled();
                expect(validateFormsSpy).toHaveReturnedWith(true);
                // Check to see if remove function executes properly
                expect(generateNewTenantInfoSpy).toHaveBeenCalled();
                expect(resetFormsSpy).toHaveBeenCalled();
                expect(navigationStackSpyFunction).toHaveBeenCalled();
            });
        });
    
        it('Test Add function for a valid tenant and unsuccessful response', async () => {
            // Change values to be valid input 
            fireEvent.changeText(inputForms[0], 'Alex');
            fireEvent.changeText(inputForms[1], 'Kavanaugh');
            fireEvent.changeText(inputForms[2], 'alex@roopairs.com');
            fireEvent.changeText(inputForms[3], '838-034-3333');

            mockAxios.onPost(url).reply(500);
            // Now press the add button
            await rootObject.clickSubmitButton().then(() =>{
                expect(clickSubmitButtonSpy).toHaveBeenCalled();
                expect(validateFormsSpy).toHaveReturnedWith(true);
                // Check to see if remove function executes properly
                expect(generateNewTenantInfoSpy).toHaveBeenCalled();
                expect(resetFormsSpy).toHaveBeenCalled();
                expect(navigationStackSpyFunction).toHaveBeenCalledTimes(1);
            });
        });
    })

;});