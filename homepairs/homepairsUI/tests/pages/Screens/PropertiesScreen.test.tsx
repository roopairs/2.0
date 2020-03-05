import React from 'react';
import {MainAppPages} from 'homepairs-pages';
import { propertyManagerMock1 } from 'tests/fixtures/StoreFixture';
import { Provider } from 'react-redux';
import { fireEvent, render } from 'react-native-testing-library';
import { prepareNavigationMock } from 'tests/fixtures/DummyComponents';
import { TextInput, TouchableOpacity, Platform } from 'react-native';
import LoginScreenBase from 'src/Screens/Auth/LoginScreen/LoginScreenBase';
import { navigationPages } from 'src/Routes/RouteConstants';
import {BrowserRouter as Router} from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

jest.mock('homepairs-images');

const {PropertiesScreen} = MainAppPages.PropertyPages;
const mockStore = propertyManagerMock1;
const mockAxios = new MockAdapter(axios);
const [mockStackNavigation, navigationStackSpyFunction] = prepareNavigationMock();
const ComponentWithStore = Platform.OS === 'web' ? 
<Provider store={mockStore}><Router><PropertiesScreen navigation={mockStackNavigation}/></Router></Provider>
:
<Provider store={mockStore}><PropertiesScreen navigation={mockStackNavigation}/></Provider>;


describe('Integration Test for the Properties Lists Screen Page', () => {
    const rendered = render(ComponentWithStore);
    const {getByType, getAllByType, queryByType, getByTestId} = rendered;

    it('Test for basic structure', () => {
        expect(true).toBeFalsy();
    });
});