import React from 'react';
import {Text} from 'react-native';
import {render, fireEvent} from 'react-native-testing-library';
import {propertyManagerMock1, prepareNavigationMock} from 'homepairs-test';
import {navigationPages} from 'homepairs-routes';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {TextTile, ImageTile} from 'homepairs-elements';
import PreferredProviderFlatList, {PreferredProviderFlatListBase} from './PreferredProviderFlatList';


// jest.mock('homepairs-images');
jest.mock('react-widgets/dist/css/react-widgets.css');

const {AddNewPropertyModal, SingleProperty } = navigationPages;
const mockStore = propertyManagerMock1;
const [mockNavigation, navigationStackSpyFunction] = prepareNavigationMock();
const ComponentWithStore = Platform.OS === 'web' ? 
<Provider store={mockStore}><Router><PreferredProviderFlatList navigation={mockNavigation}/></Router></Provider>
:
<Provider store={mockStore}><PreferredProviderFlatList navigation={mockNavigation}/></Provider>;

describe('Test for the Preferred Provider FlatList', () => {
    const rendered = render(ComponentWithStore);
    const {getAllByType, getByText} = rendered;
    it('Test to see if the component renders properly', () => {
        const textTiles = getAllByType(TextTile);
        const imageTiles = getAllByType(ImageTile);
        const textElement = getByText('+');

        expect(textElement).toBeDefined();
        expect(textTiles).toHaveLength(2);
        expect(imageTiles).toHaveLength(1);
    });

    it('TODO: Test to if navigation is behaving as expected', () => {
        expect(true).toBeFalsy();
    });
});