/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { View } from 'react-native';
import { BrowserRouter as Router, Route, Redirect, Switch, useLocation, useHistory} from 'react-router-dom';
import {
  MainAppPages, AuthenticationPages,
} from 'homepairs-pages';
import {
  LOGIN, SIGNUP, ROOPAIRS_LOGIN, PROPERTY_LIST, TENANT_PROPERTY,
  PROPERTY, LOGIN_MODAL, CREATE_ACCOUNT_MODAL, ADD_PROPERTY_MODAL, EDIT_PROPERTY_MODAL, 
  ROOPAIRS_LOGIN_MODAL, EDIT_TENANT_MODAL, ADD_TENANT_MODAL, ADD_APPLIANCE_MODAL, EDIT_APPLIANCE_MODAL,
  SERVICE_REQUEST, NEW_SERVICE_REQUEST, ACCOUNT_SETTINGS,
} from 'src/Routes/RouteConstants.web';
import { HomePairsHeader, CreatingAccountModal, LoggingInModal, AddNewPropertyModal, 
  EditPropertyModal, AddApplianceModal, EditApplianceModal, AddTenantModal, EditTenantModal } from 'homepairs-components';


// Pages and components that need to be retrieved in order to route properly 
const {LoginScreen, SignUpScreen, RoopairsLogin} = AuthenticationPages; 
const {PropertiesScreen, TenantPropertiesScreen, DetailedPropertyScreen} = MainAppPages.PropertyPages;
const {ServiceRequestScreen, NewRequestScreen} = MainAppPages.ServiceRequestPages;
const {AccountScreen} = MainAppPages.AccountPages;

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
function withModal(ModalComponent: any) {
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
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                backgroundColor: "rgba(0, 0, 0, 0.15)",
            }}>
              <View style={{flex:1}}>
                <ModalComponent />
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
function PrivateRoute ({Component: Component, ...rest}) {
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
                <Route exact path={LOGIN} children={<LoginScreen />} />
                <Route path={LOGIN_MODAL} children={<LoggingInModal />} />
            </Switch>
            {/* Show the modal when a background page is set */}
            {background && <Route path={LOGIN_MODAL} children={<LoginModal />} />}
       
        </>
    );
  }

  function SignUpModalSwitch() {
    const location = useLocation();
    const background = location.state && location.state.background;
    return (
      <>
        <Switch path={SIGNUP} location={background || location}>
          <Route exact path={SIGNUP} children={<SignUpScreen />} />
          <Route path={CREATE_ACCOUNT_MODAL} children={<CreatingAccountModal />} />
        </Switch>
        {/* Show the modal when a background page is set */}
        {background && <Route path={CREATE_ACCOUNT_MODAL} children={<RegisterModal />} />}
      </>
    );
  }

  function RoopairsLoginModalSwitch() {
    const location = useLocation();
    const background = location.state && location.state.background;
    return (
      <>
        <Switch location={background || location}>
          <Route exact path={ROOPAIRS_LOGIN} children={<RoopairsLogin/>} />
          <Route path={ROOPAIRS_LOGIN_MODAL} children={<LoggingInModal />} />
        </Switch>
  
        {/* Show the modal when a background page is set */}
        {background && <Route path={ROOPAIRS_LOGIN_MODAL} children={<LoginModal />} />}

      </>   
    );
  }

/* Authentication Modal Switch Routers */


/* Main Application Switch Routers */
// TODO: Uses the matche to resolve urls. This will allow users to navigate with proper params in order

function TenantAccountPropertySwitch() {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <Route path='/tenant/home' render={(matches) => (
          <>                
              <HomePairsHeader />
              <Switch path={`${TENANT_PROPERTY}`} location={background || location}>
                  <Route exact path={`${TENANT_PROPERTY}`}><TenantPropertiesScreen/></Route>
              </Switch>
          </>
      )}/>
  );
}

function AccountSettingsSwitch() {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <Route path='/admin/account-settings' render={(matches) => (
          <>                
              <HomePairsHeader />
              <Switch path='/admin/account-settings' location={background || location}>
                  <Route exact path={`${ACCOUNT_SETTINGS}`}><AccountScreen/></Route>
              </Switch>
          </>
      )}/>
  );
}

function ServiceRequestSwitch() {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <Route path='/admin/service-requests' render={(matches) => (
          <>                
              <HomePairsHeader />
              <Switch path='/admin/service-requests' location={background || location}>
                  <Route exact path={`${SERVICE_REQUEST}`}><ServiceRequestScreen/></Route>
                  <Route exact path={`${NEW_SERVICE_REQUEST}`}><NewRequestScreen /></Route>
              </Switch>
          </>
      )}/>
  );
}

function SinglePropertySwitch() {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <Route path={`${PROPERTY}/:propId`} render={(matches) => (
          <>                
              <HomePairsHeader />
              <Switch path={`${PROPERTY}/:propId`} location={background || location}>
                  <Route exact path={`${PROPERTY}/:propId`}><DetailedPropertyScreen/></Route>
                  <Route exact path={`${EDIT_PROPERTY_MODAL}/:propId`}><EditPropertyModal /></Route>
                  <Route path={`${ADD_TENANT_MODAL}/:propId`}><AddTenantModal/></Route>
                  <Route path={`${EDIT_TENANT_MODAL}/:propId`}><EditTenantModal/></Route>
                  <Route path={`${ADD_APPLIANCE_MODAL}/:propId/:property`}><AddApplianceModal/></Route>
                  <Route path={`${EDIT_APPLIANCE_MODAL}/:propID/:appliance`}><EditApplianceModal/></Route>
              </Switch>
      
              {/* Show the modal when a background page is set */}
              {/* TODO: Set these to the center of the window!!*/}
              {background && <Route path={`${EDIT_PROPERTY_MODAL}/:propId`}> <EditPropertyReadyModal /> </Route>}
              {background && <Route path={`${ADD_TENANT_MODAL}/:propId`}><AddTenantReadyModal/></Route>}
              {background && <Route path={`${EDIT_TENANT_MODAL}/:tenant/:propId`}><EditTenantReadyModal/></Route>}
              {background && <Route path={`${ADD_APPLIANCE_MODAL}/:propId/:property`}><AddApplianceReadyModal/></Route>}
              {background && <Route path={`${EDIT_APPLIANCE_MODAL}/:propID/:appliance`}><EditApplianceReadyModal/></Route>}

          </>
      )}/>
  );
}

function PropertiesSwitch() {
    const location = useLocation();
    const background = location.state && location.state.background;
  
    return (
      <Route path={PROPERTY_LIST} render={(matches) => (
            <>
                <HomePairsHeader />
                <Switch path={PROPERTY_LIST} location={background || location}>
                    <Route exact path={PROPERTY_LIST} children={<PropertiesScreen/>} />
                    <Route exact path={ADD_PROPERTY_MODAL} children={<AddNewPropertyModal />} />
                </Switch>
        
                {/* Show the modal when a background page is set */}
                {background && <Route path={ADD_PROPERTY_MODAL} children={<AddPropertyModal />} />}
            </>
        )}/>
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
    return (
        <Router>         
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