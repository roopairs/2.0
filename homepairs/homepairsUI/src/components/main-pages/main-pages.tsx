import { prepareNavigationHandlerComponent, navigationPages, HOME_INDEX, SERVICE_REQUEST, NEW_SERVICE_REQUEST } from 'src/routes';
import { MainAppStackType } from 'homepairs-types';
import { DetailedPropertyPage, TenantPropertyPage, PropertiesPage} from './Properties';
import { ServiceRequestPage, NewRequestPage, ServiceRequestScreenProps } from './ServiceRequest';
import { AccountPage} from './Account';
import { withSceneHeader, withHeaderUpdate } from './components';
import {withAndroidBackExit, withAndroidBackRegular} from '../WithBackHandler';

const propertySceneParams: MainAppStackType = {
    title: 'My Properties',
    navigate: 'AccountProperties',
    button: 'Add Property',
    onNavButtonClick: (props:any)=> {
        props.navigation.navigate(navigationPages.AddNewPropertyModal, null, true);
    },
    doesButtonUseNavigate: true,
};

const sceneParam: MainAppStackType = {
    title: 'Service Requests',
    navigate: SERVICE_REQUEST,
    button: 'New Request',
    onNavButtonClick: (props: ServiceRequestScreenProps) => {
        props.navigation.navigate(navigationPages.NewRequest);
        props.onSetNavHeaderGoBackButton(true);
    },
    doesButtonUseNavigate: true,
};

const newRequestSceneParam: MainAppStackType = {
    title: 'New Service Request',
    navigate: NEW_SERVICE_REQUEST,
};

const accountSceneParam: MainAppStackType = {
    title: 'Account Settings',
    navigate: 'Account',
};

export const DetailedProperty = prepareNavigationHandlerComponent(withAndroidBackRegular(DetailedPropertyPage));

/**
 * ---------------------------------------------------
 * PropertiesScreen
 * ---------------------------------------------------
 * This is intended to be used in the Main Navigation Stack. This component is connected to the 
 * HomePairs redux store, the react-native Navigator, and our very own withSceneHeader HOC. It also 
 * has been injected with a Modal; this gives this component the capability to reveal a smaller page 
 * that allows the user to add a new property to their account. 
 */
export const Properties = withAndroidBackExit(
    withHeaderUpdate(prepareNavigationHandlerComponent(withSceneHeader(PropertiesPage, propertySceneParams))));
export const TenantProperty = withAndroidBackExit(withHeaderUpdate(prepareNavigationHandlerComponent(TenantPropertyPage), HOME_INDEX));



/**
 * ---------------------------------------------------
 * ServiceRequestScreen
 * ---------------------------------------------------
 * This is intended to be used in the Main Navigation Stack. This component is connected to the 
 * HomePairs redux store, the react-native Navigator, and our very own withSceneHeader HOC. It also 
 * can be injected with a Modal; this gives this component the capability to reveal a smaller page 
 * that allows the user to add a new service request to their account. 
 */
export const ServiceRequest = withHeaderUpdate(withAndroidBackExit(
    prepareNavigationHandlerComponent(withSceneHeader(ServiceRequestPage, sceneParam, false))), sceneParam);

export const NewRequest = prepareNavigationHandlerComponent(withHeaderUpdate(
    withSceneHeader(prepareNavigationHandlerComponent(NewRequestPage), newRequestSceneParam), newRequestSceneParam, false));

export const Account = 
    prepareNavigationHandlerComponent(withSceneHeader(AccountPage, accountSceneParam, false));
