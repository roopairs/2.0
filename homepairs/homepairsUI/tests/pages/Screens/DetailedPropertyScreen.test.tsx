import React from 'react';
import {MainAppPages} from 'homepairs-pages';
import {
    GeneralHomeInfo,
    AddressSticker,
    CurrentTenantCard,
    ApplianceInfo as ApplianceInfoBase,
    ServiceRequestCount,
} from 'homepairs-components';
import { propertyManagerMock1 } from 'tests/fixtures/StoreFixture';
import { Provider } from 'react-redux';
import { fireEvent, render} from 'react-native-testing-library';
import {create} from 'react-test-renderer'
import { prepareNavigationMock, mockRoute } from 'tests/fixtures/DummyComponents';
import { TextInput, TouchableOpacity, Platform } from 'react-native';
import { navigationPages, Endpoints } from 'src/Routes/RouteConstants';
import {BrowserRouter as Router} from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import ThinButton from 'src/Elements/Buttons/ThinButton';
import DetailedPropertyScreenBase from '../../../src/Screens/Main/Properties/DetailedPropertiesScreen/DetailedPropertyScreenBase';
import { SetSelectedPropertyAction, ShowGoBackOnButtonClick, TenantInfo, Appliance, ApplianceType } from 'homepairs-types';

jest.mock('homepairs-images');

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

const {HOMEPAIRS_PROPERTY_ENDPOINT} = Endpoints;
const mockAddress = `https://homepairs-alpha.herokuapp.com/property/1`;

const [mockStackNavigation, navigationStackSpyFunction] = prepareNavigationMock();

const ComponentWithStore = Platform.OS === 'web' ? 
<Provider store={mockStore}><Router><DetailedPropertyScreen navigation={mockStackNavigation}/></Router></Provider>
:
<Provider store={mockStore}><DetailedPropertyScreen navigation={mockStackNavigation}/></Provider>;

mockAxios.onGet(mockAddress).reply(200, mockData);
const rendered = create(ComponentWithStore);

describe('Integration Test for the Properties Lists Screen Page', () => {
    //const {getByType, queryAllByType, getAllByType} = rendered;
    console.log(rendered.root.findByType(DetailedPropertyScreenBase).instance)

    const currentTenantCard = queryAllByType(CurrentTenantCard);
    const currentTenantPressables = currentTenantCard[0].findAllByType(TouchableOpacity)

    const generalHomeInfo = queryAllByType(GeneralHomeInfo);
    const addressSticker= queryAllByType(AddressSticker);
    const applianceInfo = queryAllByType(ApplianceInfoBase);
    const serviceRequestInfo = queryAllByType(ServiceRequestCount);
    const rootObj = getByType(DetailedPropertyScreenBase).instance;
    
    beforeEach(() =>{
        navigationStackSpyFunction.mockClear();
    });

    it('Test for basic structure', () => {
        expect(currentTenantCard).toHaveLength(1);
        expect(generalHomeInfo).toHaveLength(1);

        expect(addressSticker).toHaveLength(1);
        expect(applianceInfo).toHaveLength(1);

        expect(serviceRequestInfo).toHaveLength(1);
        console.log(rootObj.state)
    });

    it('Test function behaviors', () => {
        const navigateModalSpy = jest.spyOn(rootObj, 'navigateModal');
        const openAddApplianceModalSpy = jest.spyOn(rootObj, 'openAddApplianceModal');
        const openEditApplianceModalSpy = jest.spyOn(rootObj, 'openEditApplianceModal');


    });
});