/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { View, ScrollView } from 'react-native';
import { BrowserRouter as Router, Route, Redirect, Switch, useLocation, useHistory} from 'react-router-dom';
import {
  NewRequestScreen,
  ServiceRequestScreen,
  LoginScreen,
  SignUpScreen,
  RoopairsLogin,
  AccountScreen,
  DetailedPropertyScreen,
  PropertiesScreen,
  TenantPropertiesScreen,
} from 'src/screens';
import {HomePairsHeader} from 'src/components';
import { CreatingAccountModal, LoggingInModal, AddNewPropertyModal, 
  EditPropertyModal, AddApplianceModal, EditApplianceModal, AddTenantModal, 
  EditTenantModal, ServiceRequestModal, AddServiceProviderModal, PreferredProviderModal } from 'homepairs-modals';
import {
  LOGIN, SIGNUP, ROOPAIRS_LOGIN, PROPERTY_LIST, TENANT_PROPERTY,
  PROPERTY, LOGIN_MODAL, CREATE_ACCOUNT_MODAL, ADD_PROPERTY_MODAL, EDIT_PROPERTY_MODAL, 
  ROOPAIRS_LOGIN_MODAL, EDIT_TENANT_MODAL, ADD_TENANT_MODAL, ADD_APPLIANCE_MODAL, EDIT_APPLIANCE_MODAL,
  SERVICE_REQUEST, NEW_SERVICE_REQUEST, ACCOUNT_SETTINGS, SERVICE_REQUEST_INFO_MODAL,
  ADD_SERVICE_PROVIDER_MODAL, PREFERRED_PROVIDER_MODAL,
} from 'homepairs-routes';



export function withNavHeader(NavigableComponent: any){
  return class PageWithNavHeader extends React.Component{
    render() {
      return (<>
        <HomePairsHeader/>
        <ScrollView>
          <NavigableComponent {...this.props} />
          </ScrollView> 
        </>)
      }
  }
}


/**
 * ------------------------------------------------------------
 * withScrollTop High-Order-Component
 * ------------------------------------------------------------
 * A high order component that forces a component to scroll to the window position (0,0) upon mounting
 * This function is intended to be used for modals on long pages for website modals.
 * @param ScrollComponent - The component that will scroll to the top position upon mounting
 */
export function withScrollTop(ScrollComponent: any){
  return class ScrollToTopOnMount extends React.Component {
    componentDidMount() {
      window.scrollTo(0, 0);
    }

    render() {
      return <ScrollComponent {...this.props}/>;
    }
  };
}


/**
 * ------------------------------------------------------------
 * withModal High-Order-Component
 * ------------------------------------------------------------
 * A high order component that wraps a component and gives it the format for a modal. This is intended 
 * to be used with switch component that renders a another component for its background overlay
 * 
 * NOTE: Remove all set all flex grow properties to null. This will cause the modal to grow the size of the background 
 * which is unwarranted behavior!!!
 */
export function withModal(ModalComponent: any) {
    const ScrollableComponent = withScrollTop(ModalComponent);
    
    return function Modal(props:any) {
        const history = useHistory();
        const back = e => {
          e.stopPropagation();
            history.goBack();
        };
        return (
            <View 
            style={{
                position: "absolute",
                flex: 1,
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                backgroundColor: "rgba(0, 0, 0, 0.15)",
                overflow: 'scroll',
            }}>
              <View style={{flex:1, overflow: 'hidden'}}>
                <ScrollableComponent {...props} />
                </View>
            </View>
        );
    };
};

/**
 * ------------------------------------------------------------
 * Private Route
 * ------------------------------------------------------------
 * A Route that only is permited for the user to see if they have been successfully authenticated. This should be the result 
 * of session management from the homepairs api. If the user has not been authenticated, they WILL be redirected to the 
 * login page. 
 * @param {{Component, ...any}} param -a list of props that must contain a component. This will be the protected component 
 */
function PrivateRoute ({Component, ...rest}) {
  const {authed} = rest;
  const location = useLocation();
  return (
    <Route {...rest}
      render={ props => authed
        ? <Component {...props} />
        : <Redirect to={{pathname: LOGIN, state: {from: location}}} />}
    />
  );
}

/* Modal Ready Components for Routers */

const LoginModal = withModal(LoggingInModal);
const RegisterModal = withModal(CreatingAccountModal);
const AddPropertyModal = withModal(AddNewPropertyModal);
const EditPropertyReadyModal = withModal(EditPropertyModal);
const AddApplianceReadyModal = withModal(AddApplianceModal);
const EditApplianceReadyModal = withModal(EditApplianceModal);
const AddTenantReadyModal = withModal(AddTenantModal);
const EditTenantReadyModal = withModal(EditTenantModal);
const AddServiceProviderReadyModal = withModal(AddServiceProviderModal);
const PreferredProviderReadyModal = withModal(PreferredProviderModal);
const ServiceRequestInfoReadyModal = withModal(ServiceRequestModal);
/* Modal Ready Components for Routers */

/* Authentication Modal Switch Routers */

function LoginModalSwitch() {
    const location = useLocation();
    
    // Remember to set the location's state when navigating to a modal. Please look into 
    // 2.0/homepairs/homepairsUI/src/utility/NavigationRouterHandler.tsx for more information.
    const background = location.state && location.state.background;
    return (
      <>
      
            <Switch path={LOGIN} location={background || location}>
                <Route exact path={LOGIN}><LoginScreen/></Route>
                <Route path={LOGIN_MODAL}><LoggingInModal/></Route>
            </Switch>
            {/* Show the modal when a background page is set */}
            {background && <Route path={LOGIN_MODAL}><LoginModal/></Route> }
       
        </>
    );
  }

  function SignUpModalSwitch() {
    const location = useLocation();
    const background = location.state && location.state.background;
    return (
      <>
        <Switch path={SIGNUP} location={background || location}>
          <Route exact path={SIGNUP}><SignUpScreen/></Route>
          <Route path={CREATE_ACCOUNT_MODAL}> <CreatingAccountModal/> </Route>
        </Switch>
        {/* Show the modal when a background page is set */}
        {background && <Route path={CREATE_ACCOUNT_MODAL}><RegisterModal/> </Route>}
      </>
    );
  }

  function RoopairsLoginModalSwitch() {
    const location = useLocation();
    const background = location.state && location.state.background;
    return (
      <>
        <Switch location={background || location}>
          <Route exact path={ROOPAIRS_LOGIN}><RoopairsLogin/></Route>
          <Route path={ROOPAIRS_LOGIN_MODAL}><LoggingInModal/></Route>
        </Switch>
  
        {/* Show the modal when a background page is set */}
        {background && <Route path={ROOPAIRS_LOGIN_MODAL}><LoginModal/></Route>}

      </>   
    );
  }

/* Authentication Modal Switch Routers */


/* Main Application Switch Routers */
// TODO: Uses the match to resolve urls. This will allow users to navigate with proper params in order

function TenantAccountPropertySwitch() {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <>
    <HomePairsHeader />
    <ScrollView>
    <Route path='/tenant/home' render={(matches) => (
          <View style={{overflow: 'hidden'}}>                
              <Switch path={`${TENANT_PROPERTY}`} location={background || location}>
                  <Route exact path={`${TENANT_PROPERTY}`}><TenantPropertiesScreen/></Route>
              </Switch>
          </View>
      )}/>
      </ScrollView>
      </>
  );
}

function AccountSettingsSwitch() {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <>
    <HomePairsHeader />
    <Route path='/admin/account-settings' render={(matches) => (
          <>                
              <Switch path='/admin/account-settings' location={background || location}>
                  <Route exact path={`${ACCOUNT_SETTINGS}`}><AccountScreen/></Route>
              </Switch>
          </>
      )}/>
    </>
  );
}

function ServiceRequestSwitch() {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <>
    <HomePairsHeader />
    <Route path={SERVICE_REQUEST} render={(matches) => (
          <>                
              <Switch path={SERVICE_REQUEST} location={background || location}>
                  <Route exact path={`${SERVICE_REQUEST}`}><ServiceRequestScreen/></Route>
                  <Route exact path={`${NEW_SERVICE_REQUEST}`}><NewRequestScreen /></Route>
                  <Route exact path={`${SERVICE_REQUEST_INFO_MODAL}/:serviceRequest`}> <ServiceRequestModal/></Route>
                  <Route exact path={`${ADD_SERVICE_PROVIDER_MODAL}`}><AddServiceProviderReadyModal/></Route>
                  <Route exact path={`${PREFERRED_PROVIDER_MODAL}/:serviceProvider`}><PreferredProviderReadyModal/></Route>
              </Switch>

              {background && <Route path={`${SERVICE_REQUEST_INFO_MODAL}/:serviceRequest`}><ServiceRequestInfoReadyModal/></Route>}
              {background && <Route path={`${ADD_SERVICE_PROVIDER_MODAL}`}><AddServiceProviderReadyModal/></Route>}
              {background && <Route path={`${PREFERRED_PROVIDER_MODAL}/:serviceProvider`}><PreferredProviderReadyModal/></Route>}
          </>
      )}/>
      </>
  );
}

function SinglePropertySwitch() {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <>
    <HomePairsHeader />
    <Route path={`${PROPERTY}/:propId`} render={(matches) => (
          <>                
              <Switch path={`${PROPERTY}/:propId`} location={background || location}>
                  <Route exact path={`${PROPERTY}/:propId`}><DetailedPropertyScreen/></Route>
                  <Route exact path={`${EDIT_PROPERTY_MODAL}/:propId`}><EditPropertyModal /></Route>
                  <Route path={`${ADD_TENANT_MODAL}/:propId`}><AddTenantModal/></Route>
                  <Route path={`${EDIT_TENANT_MODAL}/:propId`}><EditTenantModal/></Route>
                  <Route path={`${ADD_APPLIANCE_MODAL}/:propId/:property`}><AddApplianceModal/></Route>
                  <Route path={`${EDIT_APPLIANCE_MODAL}/:propId/:appliance`}><EditApplianceModal/></Route>
              </Switch>
      
              {/* Show the modal when a background page is set */}
              {background && <Route path={`${EDIT_PROPERTY_MODAL}/:propId`}> <EditPropertyReadyModal /> </Route>}
              {background && <Route path={`${ADD_TENANT_MODAL}/:propId`}><AddTenantReadyModal/></Route>}
              {background && <Route path={`${EDIT_TENANT_MODAL}/:tenant/:propId`}><EditTenantReadyModal/></Route>}
              {background && <Route path={`${ADD_APPLIANCE_MODAL}/:token/:property`}><AddApplianceReadyModal/></Route>}
              {background && <Route path={`${EDIT_APPLIANCE_MODAL}/:propId/:appliance`}><EditApplianceReadyModal/></Route>}

          </>
      
      )}/>
    </>
  );
}

function PropertiesSwitch() {
    const location = useLocation();
    const background = location.state && location.state.background;
  
    return (
      <>
      <HomePairsHeader />
      <Route path={PROPERTY_LIST} render={(matches) => (
            <>
                <Switch path={PROPERTY_LIST} location={background || location}>
                    <Route exact path={PROPERTY_LIST}><PropertiesScreen/></Route>
                    <Route exact path={ADD_PROPERTY_MODAL}><AddNewPropertyModal/></Route>
                </Switch>
        
                {/* Show the modal when a background page is set */}
                {background && <Route path={ADD_PROPERTY_MODAL}><AddPropertyModal/></Route>}
            </>
        )}/>
      </>
    );
}

/* Main Application Switch Routers */

/**
 * ------------------------------------------------------------
 * AppNavigator (Web)
 * ------------------------------------------------------------
 * The means of user navigation on web platforms. This is different from mobile in which url navigation 
 * is supported via the react-router-dom library. This is the expected application based that will be 
 * used for web platforms on all devices and tests should be written using a mock RouterProps object. 
 * @param props 
 */
export default function AppNavigator(props:any){  
    // TODO: Set PrivateRoute to auth status from session token
    // <Router basename={`${process.env.PUBLIC_URL}`}> is needed for web routing resolution for remote servers 
    return (
        <Router basename={`${process.env.PUBLIC_URL}`}>  
            <Switch>
                <Route path='/authentication'>
                  <RoopairsLoginModalSwitch/>
                  <LoginModalSwitch />
                  <SignUpModalSwitch />
                </Route>
                <Route exact path='/'> <Redirect to={{pathname: LOGIN}} /></Route>
                <PrivateRoute path={PROPERTY_LIST} Component={PropertiesSwitch} {...props}/>
                <PrivateRoute path='/admin/property/' Component={SinglePropertySwitch} {...props}/>
                <PrivateRoute path='/admin/service-requests' Component={ServiceRequestSwitch} {...props}/>
                <PrivateRoute path={ACCOUNT_SETTINGS} Component={AccountSettingsSwitch} {...props}/>

                {/** Tenant Property Screen */}
                <PrivateRoute path={TENANT_PROPERTY} Component={TenantAccountPropertySwitch} {...props}/>

                <Route path='/*'>404 Does not Exist</Route>
            </Switch>
        </Router> 

    );
};
export {AppNavigator};