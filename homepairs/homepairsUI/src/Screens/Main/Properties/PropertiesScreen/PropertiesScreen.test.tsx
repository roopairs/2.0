import React from 'react';
import { MainAppPages } from 'homepairs-pages';
import { Provider } from 'react-redux';
import { fireEvent, render } from 'react-native-testing-library';
import { prepareNavigationMock, mockRoute , propertyManagerMock1} from 'homepairs-test';
import { TouchableOpacity, Platform } from 'react-native';
import {BrowserRouter as Router} from 'react-router-dom';
import {
    ViewPropertyCard, 
    SceneHeader } from 'homepairs-components';
import { ThinButton }  from 'homepairs-element';
import { SetSelectedPropertyAction, ShowGoBackOnButtonClick } from 'homepairs-types';
import { navigationPages } from '../../../../Routes/RouteConstants';

jest.mock('homepairs-images');
jest.mock('react-widgets/dist/css/react-widgets.css');


const {PropertiesScreen} = MainAppPages.PropertyPages;
const {AddNewPropertyModal, SingleProperty } = navigationPages;
const mockStore = propertyManagerMock1;
const [mockStackNavigation, navigationStackSpyFunction] = prepareNavigationMock();
const ComponentWithStore = Platform.OS === 'web' ? 
<Provider store={mockStore}><Router><PropertiesScreen navigation={mockStackNavigation}/></Router></Provider>
:
<Provider store={mockStore}><PropertiesScreen navigation={mockStackNavigation}/></Provider>;


describe('Integration Test for the Properties Lists Screen Page', () => {
    const rendered = render(ComponentWithStore);
    const {queryAllByType} = rendered;
    const viewPropertyCardQuery = queryAllByType(ViewPropertyCard);
    const sceneHeaderQuery = queryAllByType(SceneHeader);
    const thinButtonQuery = queryAllByType(ThinButton);
    const pressables = queryAllByType(TouchableOpacity);
    const [addPropertyButton, , viewPropertyButton] = pressables; 

    beforeEach(() =>{
        navigationStackSpyFunction.mockClear();
    });

    it('Test for basic structure', () => {
        // The component with rendered with the store should have two view property cards 
        expect(viewPropertyCardQuery).toHaveLength(2);
        expect(sceneHeaderQuery).toHaveLength(1);

        // This component should have 3 thin buttons, one with the sceneHeader and one each for the 
        // view property cards
        expect(thinButtonQuery).toHaveLength(3);
    });

    it('If navigation to modal functions as intended', () => {
        fireEvent.press(addPropertyButton);
        expect(navigationStackSpyFunction).toHaveBeenCalledTimes(1);

        // Examine if the correct route was navigated to. 
        if(Platform.OS === 'web')
            expect(navigationStackSpyFunction).toHaveBeenCalledWith(AddNewPropertyModal, {background: mockRoute.location});
        else    
            expect(navigationStackSpyFunction).toHaveBeenCalledWith(AddNewPropertyModal);
    });

    it('Test if viewProperty Card invokes proper functions', () => {
        const expectedSelectedPropertyAction : SetSelectedPropertyAction = {
            type: 'PROPERTY_LIST/SET_SELECTED_PROPERTY', index: 1,
        };
        const expectedHeaderGoBackAction : ShowGoBackOnButtonClick = {
            type: 'HEADER/SHOW_GOBACK_BUTTON', showBackButton: true,
        };
        const expectedActions = [
            expectedSelectedPropertyAction,
            expectedHeaderGoBackAction,
        ];
        const expectedNavigationWebRoute = `${SingleProperty}/2`;
        fireEvent.press(viewPropertyButton);
        expect(mockStore.getActions()).toStrictEqual(expectedActions);
        if(Platform.OS === 'web')
            expect(navigationStackSpyFunction).toHaveBeenCalledWith(expectedNavigationWebRoute);
        else    
            expect(navigationStackSpyFunction).toHaveBeenCalledWith(SingleProperty);
    });
});