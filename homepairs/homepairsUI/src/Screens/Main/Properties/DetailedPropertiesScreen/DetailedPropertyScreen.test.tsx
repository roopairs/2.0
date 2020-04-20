import React from 'react';
import { MainAppPages } from 'homepairs-pages';
import {
    GeneralHomeInfo,
    AddressSticker,
    CurrentTenantCard,
    ApplianceInfo as ApplianceInfoBase,
    ServiceRequestCount,
    DetailedPropertyScreenBase,
} from 'homepairs-components';
import { Provider } from 'react-redux';
import { fireEvent, render} from 'react-native-testing-library';
import { prepareNavigationMock, mockRoute, propertyManagerMock1 } from 'homepairs-test';
import { TextInput, TouchableOpacity, Platform } from 'react-native';
import { navigationPages, Endpoints } from '../../../../Routes/RouteConstants';
import {BrowserRouter as Router} from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { ThinButton } from 'homepairs-elements';
import { SetSelectedPropertyAction, ShowGoBackOnButtonClick, TenantInfo, Appliance, ApplianceType } from 'homepairs-types';

jest.mock('homepairs-images');
jest.mock('react-widgets/dist/css/react-widgets.css');

const { DetailedPropertyScreen } = MainAppPages.PropertyPages;
const {AddNewPropertyModal, SingleProperty } = navigationPages;
const mockStore = propertyManagerMock1;

const mockAxios = new MockAdapter(axios);
const fakeApp: Appliance = [{
    applianceId: 1, 
    category: ApplianceType.Plumbing, 
    appName: 'Oven', 
    manufacturer: 'Vulcan Equipment', 
    modelNum: 123, 
    serialNum: 432, 
    location: 'Bathroom',
}];
const fakeTenantInfo: TenantInfo = [{
    firstName: 'Bill',
    lastName: 'Foote',
    email: 'billFoote@gmail.com',
    phoneNumber: '999-999-9999',
}];

const mockData = {
    tenants: fakeTenantInfo,
    appliances : fakeApp,
};

const mockAddress = `https://homepairs-alpha.herokuapp.com/property/1`;

const [mockStackNavigation, navigationStackSpyFunction] = prepareNavigationMock();

const ComponentWithStore = Platform.OS === 'web' ? 
<Provider store={mockStore}><Router><DetailedPropertyScreen navigation={mockStackNavigation}/></Router></Provider>
:
<Provider store={mockStore}><DetailedPropertyScreen navigation={mockStackNavigation}/></Provider>;

mockAxios.onGet(mockAddress).reply(200, mockData);

describe('Integration Test for the Properties Lists Screen Page', () => {
    const rendered = render(ComponentWithStore);

    const {getByType, queryAllByType, getAllByType} = rendered;

    const generalHomeInfo = queryAllByType(GeneralHomeInfo);
    const addressSticker= queryAllByType(AddressSticker);
    const applianceInfo = queryAllByType(ApplianceInfoBase);
    const serviceRequestInfo = queryAllByType(ServiceRequestCount);
    const currentTenantCard = queryAllByType(CurrentTenantCard);

    rendered.getByType(DetailedPropertyScreenBase);
    const rootObj = getByType(DetailedPropertyScreenBase).instance;
    

    const openEditPropertyModalSpy = jest.spyOn(rootObj, 'openEditPropertyModal');
    const openAddApplianceModalSpy = jest.spyOn(rootObj, 'openAddApplianceModal');
    const openEditApplianceModalSpy = jest.spyOn(rootObj, 'openEditApplianceModal');

    beforeEach(() =>{
        navigationStackSpyFunction.mockClear();
        
    });

    it('Test for basic structure', () => {
        expect(currentTenantCard).toHaveLength(1);
        expect(generalHomeInfo).toHaveLength(1);

        expect(addressSticker).toHaveLength(1);
        expect(applianceInfo).toHaveLength(1);

        expect(serviceRequestInfo).toHaveLength(1);
        console.log(rootObj.state);
    });


    // TODO: There seems to be a problem with animation when rendering for web. We need to mock this library
    // Also, there seems to be a problem with loading the state on mobile. I'm just going to leave these tests here
    it('Test function behaviors', () => {
       
        rootObj.openEditPropertyModal();
        rootObj.openAddApplianceModal();
        rootObj.openEditApplianceModal();

        expect(openEditPropertyModalSpy).toHaveBeenCalled();
        expect(openAddApplianceModalSpy).toHaveBeenCalled();
        expect(openEditApplianceModalSpy).toHaveBeenCalled();

    });
});