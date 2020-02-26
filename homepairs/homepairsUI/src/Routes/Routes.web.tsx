/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import { BrowserRouter as Router, Route, Redirect, Switch, useLocation} from 'react-router-dom';
import {ModalRoute, ModalContainer} from 'react-router-modal';
import {
    MainAppPages, AuthenticationPages,
} from 'homepairs-pages';
import { LOGIN, SIGNUP, ROOPAIRS_LOGIN, PROPERTY_LIST, TENANT_PROPERTY, PROPERTY, LOGIN_MODAL, CREATE_ACCOUNT_MODAL } from 'src/Routes/RouteConstants.web';
import {HomePairsHeader, CreatingAccountModal, LoggingInModal} from 'homepairs-components';

// A way we can import css and simply use their classes
import 'react-router-modal/css/react-router-modal.css';
import './styles.css';

// Pages and components that need to be retrieved in order to route properly 
const {LoginScreen, SignUpScreen, RoopairsLogin} = AuthenticationPages; 
const {PropertiesScreen, TenantPropertiesScreen, DetailedPropertyScreen} = MainAppPages.PropertyPages;

// Small stylesheet intended for modals 
const modalWrapperStyle = StyleSheet.create({
    modalWrapper: {
     width: '100%',
     height: '100%',
     flex:1,
     minHeight: 100,
     alignSelf:'center', 
     alignContent:'center',
    },
});

/**
 * ------------------------------------------------------------
 * withModal High-Order-Component
 * ------------------------------------------------------------
 * A high order component that wraps a route and a ModalRoute around a base component 
 * and a modal giving the application the ability to reveal a modal over the base as a 
 * background. The returned component should always be called within a Routes render props. 
 * @param {Component} BaseComponent  -the background component. This shouldn't really do anything 
 * @param {Component} ModalComponent -the modal component that will be present to the user when an 
 * action has been invoke to reveal this modal. It is rendered upon navigation to it's endpoint
 * @param {string} modalPath -the path that navigates to the component 
 */
function withModal(BaseComponent: any, ModalComponent: any, modalPath: string) {
    return function WrappedComponent(props:any){
        return (
        <Route render={() => (
            <>
                <BaseComponent {...props}/>
                <ModalRoute className='homepairs-modal' backdropClassName='react-router-modal__backdrop' path={modalPath}>
                    <View style={modalWrapperStyle.modalWrapper}>
                        <ModalComponent {...props}/>
                    </View>
                </ModalRoute>
            </>
        )}/>);
};}

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

/* Components and Routes used for the Main Router */
const LoginModal = withModal(LoginScreen, LoggingInModal, LOGIN_MODAL);
const RegisterModal = withModal(SignUpScreen, CreatingAccountModal, CREATE_ACCOUNT_MODAL);
const RoopairsLoginModal = withModal(LoginScreen, RoopairsLogin, ROOPAIRS_LOGIN);
function PropertiesRoutes(props:any){
    return (
        
        <Route {...props} path='/admin' render={(match) => (
            <>
            {/** Notice how the component is within the Route's render props. 
             * This allows us to inject props into components that did not once have them **/}
            <HomePairsHeader />
                <Switch {...props}>
                    <Route {...props} path={PROPERTY_LIST} component={PropertiesScreen}/>
                    <Route {...props} path={TENANT_PROPERTY} component={TenantPropertiesScreen}/>
                    <Route {...props} path={PROPERTY} component={DetailedPropertyScreen}/>
                </Switch>
            </>
        )} />
    );
}


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
                <Route exact path='/'> <Redirect to={{pathname: LOGIN}} /></Route>
                
                {/** Authentication Routes for the application that will occur */} 
                <Route path={LOGIN} render={() => (<LoginScreen/>)}/>
                <Route path={SIGNUP} render={() => (<SignUpScreen/>)}/>
                <Route path={ROOPAIRS_LOGIN} render={() => (<RoopairsLogin/>)}/>

                {/** Main Routes for the application that will occur */}   
                <PrivateRoute path='/admin' Component={PropertiesRoutes} {...props} />

                {/** Modals for the entire application */} 
                <LoginModal />
                <RegisterModal />
                <RoopairsLoginModal />

                {/** Error message for endpoints that don't exists */} 
                <Route path='/*'>404 Does not Exist</Route>
            
            </Switch>
            <ModalContainer/>
        </Router> 

    );
};

export {AppNavigator};