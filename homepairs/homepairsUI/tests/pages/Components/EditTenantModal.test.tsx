import React from 'react';
import { EditTenantModal } from 'homepairs-components';
import { EditTenantModalBase } from 'src/Screens/Components/Modals/EditTenantModal';
import { propertyManagerMock1 } from 'tests/fixtures/StoreFixture';
import { BrowserRouter as Router} from 'react-router-dom';
import { prepareNavigationStackFirstRouteMock, dummyTenantParamParsed } from 'tests/fixtures/DummyComponents';
import { Provider } from 'react-redux';
import { render, fireEvent } from 'react-native-testing-library';
import { TextInput, Platform, TouchableOpacity } from 'react-native';
import ThinButton from 'src/Elements/Buttons/ThinButton';

const mockStore = propertyManagerMock1;
const [mockStackNavigationFirstRoute, navigationStackSpyFunction] = prepareNavigationStackFirstRouteMock({tenant:true});
const Component = Platform.OS === 'web' ? 
<Provider store={mockStore}><Router><EditTenantModal navigation={mockStackNavigationFirstRoute} /></Router></Provider> 
:
<Provider store={mockStore}><EditTenantModal navigation={mockStackNavigationFirstRoute} /></Provider>;

describe('Test Edit Tenant Modal', () => {
    const rendered = render(Component);
    const { queryAllByType, getAllByType, getByType } = rendered;
    const inputForms = queryAllByType(TextInput);
    // Three buttons, close modal, edit tenant, and remove tenant
    const thinButtons = queryAllByType(ThinButton);
    const thinButtonPressable = getAllByType(TouchableOpacity);

    // Use the Base Class to get an instance of the object and insert spy functions 
    const rootObject = getByType(EditTenantModalBase).instance;
    
    const setInitialStateSpy = jest.spyOn(rootObject, "setInitialState");
    const validateFormsSpy = jest.spyOn(rootObject, 'validateForms');
    const resetFormsSpy = jest.spyOn(rootObject, 'resetForms');
    const generateNewTenantInfoSpy = jest.spyOn(rootObject, 'generateNewTenantInfo');
    const clickSubmitButtonSpy = jest.spyOn(rootObject, 'clickSubmitButton');
    const goBackToPreviousPageSpy = jest.spyOn(rootObject, 'goBackToPreviousPage');

    beforeEach(() => {
        navigationStackSpyFunction.mockClear();
        setInitialStateSpy.mockClear();
        validateFormsSpy.mockClear();
        resetFormsSpy.mockClear();
        generateNewTenantInfoSpy.mockClear();
        rendered.rerender(Component);
        goBackToPreviousPageSpy.mockClear();
    });

    it('Test Edit Tenant defined as expected', () => {
        // The initial state should be the tenant object stored by the navigation object
        const expectedState = {...dummyTenantParamParsed};

        // Check if the correct amount of input forms has been rendered. 
        expect(inputForms).toHaveLength(4);
        expect(thinButtons).toHaveLength(2);

        // Check if closeButton functions properly
        fireEvent.press(thinButtonPressable[0]);
        expect(navigationStackSpyFunction).toHaveBeenCalledTimes(1);

        expect(setInitialStateSpy).toHaveBeenCalled();
        expect(resetFormsSpy).toHaveBeenCalled();
        expect(rootObject.state).toStrictEqual(expectedState);

    });


    it('Test Edit Tenant Attempt to add invalid info', () => {
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

    it('Test Remove Tenant functions as intended', () => {
        // Click remove button 
        fireEvent.press(thinButtonPressable[2]);
        // Check to see if remove function executes properly
        expect(resetFormsSpy).toHaveBeenCalledTimes(1);
        expect(navigationStackSpyFunction).toHaveBeenCalledTimes(1);
    });

    it('Test Add function for a valid tenant as intended', () => {
        // Change values to be valid input 
        fireEvent.changeText(inputForms[0], 'Alex');
        fireEvent.changeText(inputForms[1], 'Kavanaugh');
        fireEvent.changeText(inputForms[2], 'alex@roopairs.com');
        fireEvent.changeText(inputForms[3], '838-034-3333');

        // Now press the add button
        fireEvent.press(thinButtonPressable[1]);

        expect(clickSubmitButtonSpy).toHaveBeenCalled();
        expect(validateFormsSpy).toHaveReturnedWith(true);
        // TODO: Write mock function for update tenant 
        expect(true).toBeFalsy();
    });

;});