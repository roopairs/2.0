/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { BrowserRouter as Router, Route, Redirect, Switch, useLocation, useHistory, useParams } from 'react-router-dom';
import {
  MainAppPages, AuthenticationPages,
} from 'homepairs-pages';
import {
  LOGIN, SIGNUP, ROOPAIRS_LOGIN, PROPERTY_LIST, TENANT_PROPERTY,
  PROPERTY, LOGIN_MODAL, CREATE_ACCOUNT_MODAL, ADD_PROPERTY_MODAL, EDIT_PROPERTY_MODAL, 
  ROOPAIRS_LOGIN_MODAL, EDIT_TENANT_MODAL, ADD_TENANT_MODAL,
} from 'src/Routes/RouteConstants.web';
import { HomePairsHeader, CreatingAccountModal, LoggingInModal, AddNewPropertyModal, 
  EditPropertyModal, AddApplianceModal, EditApplianceModal, AddTenantModal, EditTenantModal } from 'homepairs-components';

// A way we can import css and simply use their classes
import './styles.css';

// Pages and components that need to be retrieved in order to route properly 
const {LoginScreen, SignUpScreen, RoopairsLogin} = AuthenticationPages; 
const {PropertiesScreen, TenantPropertiesScreen, DetailedPropertyScreen} = MainAppPages.PropertyPages;

/**
 * ------------------------------------------------------------
 * withModal High-Order-Component
 * ------------------------------------------------------------
 * A high order component that wraps a component and gives it the format for a modal. This is intended 
 * to be used with switch component that renders a another component for its background overlay
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

function SinglePropertySwitch() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <Route path={`${PROPERTY}/:propId`} render={(matches) => (
          <>                
              <HomePairsHeader />
              <Switch path={`${PROPERTY}/:propId`} location={background || location}>
                  <Route exact path={`${PROPERTY}/:propId`}  children={<DetailedPropertyScreen/>} />
                  <Route exact path={`${EDIT_PROPERTY_MODAL}/:propId`} children={<EditPropertyModal />} />
                  <Route path={`${ADD_TENANT_MODAL}/:propId`}><AddTenantModal/></Route>
                  <Route path={`${EDIT_TENANT_MODAL}/:propId`}><EditTenantModal/></Route>
              </Switch>
      
              {/* Show the modal when a background page is set */}
              {background && <Route path={`${EDIT_PROPERTY_MODAL}/:propId`} children={<EditPropertyReadyModal />} />}
              {background && <Route path={`${ADD_TENANT_MODAL}/:propId`}><AddTenantReadyModal/></Route>}
              {background && <Route path={`${EDIT_TENANT_MODAL}/:tenant/:propId`}><EditTenantReadyModal/></Route>}

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
                <Route path='/*'>404 Does not Exist</Route>
            </Switch>
        </Router> 

    );
};
export {AppNavigator};