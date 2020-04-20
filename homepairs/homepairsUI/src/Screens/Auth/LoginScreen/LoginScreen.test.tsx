import React from 'react';
import {AuthenticationPages} from 'homepairs-pages';
import { propertyManagerMock1 } from 'tests/fixtures/StoreFixture';
import { Provider } from 'react-redux';
import { fireEvent, render } from 'react-native-testing-library';
import { prepareNavigationMock } from 'homepairs-test';
import { TextInput, TouchableOpacity, Platform } from 'react-native';
import { navigationPages } from '../../../src/Routes/RouteConstants';
import {BrowserRouter as Router} from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import LoginScreenBase from './LoginScreenBase';

const mockStore = propertyManagerMock1;
const {LoginScreen} = AuthenticationPages;
const mockAxios = new MockAdapter(axios);
const [mockStackNavigation, navigationStackSpyFunction] = prepareNavigationMock()
const ComponentWithStore = Platform.OS === 'web' ? 
<Provider store={mockStore}><Router><LoginScreen navigation={mockStackNavigation}/></Router></Provider>
:
<Provider store={mockStore}><LoginScreen navigation={mockStackNavigation}/></Provider>;

describe("Test for Login Screen", () => {
    const expectedInitialState= {
        username: '', 
        password: '', 
    };
    const rendered = render(ComponentWithStore);
    const {getAllByType, getByType, getByTestId} = rendered;
    
    // Test instance of the base 
    const loginScreenBaseInstance = getByType(LoginScreenBase).instance;

    // Test UI elements. The highlighted text, the inputforms, and the thinbutton
    const loginInputForms = getAllByType(TextInput);
    const loginThinButton = getByType(TouchableOpacity);
    const loginHighlightedText = getByTestId('highlighted-pressable-text');

    getByType(LoginScreenBase).props.onFetchAccount();

    // Spy functions 
    const resetFormsSpy = jest.spyOn(loginScreenBaseInstance, 'resetForms');
    const validateFormsSpy = jest.spyOn(loginScreenBaseInstance, 'validateForms');
    const setModalOffSpy = jest.spyOn(loginScreenBaseInstance, 'setModalOff');
    const {setModalOff} = loginScreenBaseInstance;


    beforeEach(() => {
        navigationStackSpyFunction.mockClear();
        resetFormsSpy.mockClear();
        validateFormsSpy.mockClear();
        setModalOffSpy.mockClear();
    });

    it("Test for basic functionality", () => {
        // Test Initial state of LoginScreen 
        expect(loginScreenBaseInstance.state).toStrictEqual(expectedInitialState);
    });

    it('Test if the clickHighlighted text works as intended', () =>{
        // Test if the clickHighlighted text works as intended 
        fireEvent.press(loginHighlightedText);
        expect(navigationStackSpyFunction).toHaveBeenCalledWith(navigationPages.SignUpScreen);
    });
    
    it('Now test change of value, the first time should pass', () => {
        // Now test change of value, the first time should pass
        fireEvent.changeText(loginInputForms[0], 'eerongrant@gmail.com');
        fireEvent.changeText(loginInputForms[1], 'hello000');

        fireEvent.press(loginThinButton);
        expect(validateFormsSpy).toHaveReturnedWith(true);
        expect(resetFormsSpy).toHaveBeenCalled();  
        
        // This should test if the information was valid and that onFetchAccount and navigator has been called
        if(Platform.OS === 'web'){
            const expectedPassParam = {background: mockStackNavigation.navigation.location}
            expect(navigationStackSpyFunction).toHaveBeenCalledWith(navigationPages.LoggingInModal, expectedPassParam);
        }else{
            expect(navigationStackSpyFunction).toHaveBeenCalledWith(navigationPages.LoggingInModal);
        }
    });

    it('Now test for invalid value changes ', () => {
       fireEvent.changeText(loginInputForms[0], 'eerongrant');
       fireEvent.changeText(loginInputForms[1], 'hello');

       fireEvent.press(loginThinButton);
       expect(validateFormsSpy).toHaveReturnedWith(false);
       expect(resetFormsSpy).toHaveBeenCalledTimes(1);

    });

    it(`Finally, test to see if setModalOff function runs as expected. I could not get this to work as an integration test :(np`,
    () => {
        setModalOff();
        expect(navigationStackSpyFunction).toHaveBeenCalledWith(navigationPages.LoginScreen);

        setModalOff('Error');
        expect(navigationStackSpyFunction).toHaveBeenNthCalledWith(2, navigationPages.LoginScreen);
    });

});