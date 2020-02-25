/* eslint-disable react/jsx-props-no-spreading */
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import { BrowserRouter as Router, Route, Redirect, Switch, RouteProps, useLocation} from 'react-router-dom';
import {
    MainAppPages, AuthenticationPages,
} from 'homepairs-pages';
import { LOGIN, SIGNUP, ROOPAIRS_LOGIN, PROPERTY_LIST, TENANT_PROPERTY, PROPERTY, LOGIN_MODAL, CREATE_ACCOUNT_MODAL } from 'src/Routes/RouteConstants.web';
import {HomePairsHeader, CreatingAccountModal, LoggingInModal} from 'homepairs-components';


const {PropertiesScreen, TenantPropertiesScreen, DetailedPropertyScreen} = MainAppPages.PropertyPages;


const modalStyles = StyleSheet.create({
    modalBackground:{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,.2)",
    },
});

function ModalBackground(component: any) {
    return function WrappedComponent(props:any){
        return (
            <View style={modalStyles.modalBackground}>
                <Component {...props}/>
            </View>
        );
    };
}

function withNavigationHeader(BaseComponent: any){
    return function WrappedComponet(props: any){
        return (<>
            <HomePairsHeader />
            <BaseComponent {...props}/>
        </>);
    };
}
const LoginModal = ModalBackground(LoggingInModal);
const RegisterModal = ModalBackground(CreatingAccountModal);

const PropertyListPage = withNavigationHeader(PropertiesScreen);
const TenantPropertyPage = withNavigationHeader(TenantPropertiesScreen);
const PropertyPage = withNavigationHeader(DetailedPropertyScreen);

type PrivateRouteProps = {
    authed: boolean;
    location?: string;
    path: string
    match: any,
} & RouteProps


function PropertiesRoutes(props:any){
    const {PropertiesScreen, TenantPropertiesScreen, DetailedPropertyScreen} = MainAppPages.PropertyPages;
    return (
        <Route {...props} path='/admin'>
            <HomePairsHeader />
                <Switch {...props} path='/admin/tenant'>
                    <Route {...props} path={PROPERTY_LIST} component={PropertiesScreen}/>
                    <Route {...props} path={TENANT_PROPERTY} component={TenantPropertiesScreen}/>
                    <Route {...props} path={PROPERTY} component={DetailedPropertyScreen}/>
                </Switch>
        </Route>
    );
}

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

type ModalSwitchProps = {
    path: string, parentPath: string, modalPath: string, 
    BaseComponent: Component, ModalComponent: Component
}
function ModalSwitch(props:ModalSwitchProps) {
    
    const {path, parentPath, modalPath, BaseComponent, ModalComponent} = props;
    const location = useLocation();
    // This piece of state is set when one of the
    // gallery links is clicked. The `background` state
    // is the location that we were at when one of
    // the gallery links was clicked. If it's there,
    // use it as the location for the <Switch> so
    // we show the gallery in the background, behind
    // the modal.
    const background = location.state && location.state.background;
    console.log(`This is the location ${location.state}`);

    return (
      <Route>
        <Switch path={path} location={background || location}>
            <Route path={path} component={BaseComponent}/>
            <Route path='/authentication/logging-in' component={ModalComponent}/>
        </Switch>
        {/* Show the modal when a background page is set */}
        {background && <Route path={modalPath} ><LoginModal /> </Route>}
      </Route>
    );
}

export default function AppNavigator(props:any){
    const {LoginScreen, SignUpScreen, RoopairsLogin} = AuthenticationPages; 
    const {PropertiesScreen, TenantPropertiesScreen, DetailedPropertyScreen} = MainAppPages.PropertyPages;
    
    // TODO: Set PrivateRoute to auth status from session token
    return (
        <Router>
            <Switch>
                <Route path={SIGNUP}>
                    <SignUpScreen/>
                </Route>

                <Route path={ROOPAIRS_LOGIN} >
                    <RoopairsLogin/>
                </Route>

                <Route path={CREATE_ACCOUNT_MODAL}>
                    <RegisterModal/>
                </Route>
                <Route exact path='/'> <Redirect to={{pathname: LOGIN}} /></Route>
                <ModalSwitch 
                    path={LOGIN}
                    parentPath='/authentication'
                    modalPath={LOGIN_MODAL}
                    BaseComponent={LoginScreen}
                    ModalComponent={LoginModal}
                    {...props}/>

                {/** Main Routes for the application that will occur */}    
                <PrivateRoute path={PROPERTY_LIST} Component={PropertyListPage} {...props} />
                <PrivateRoute path={TENANT_PROPERTY} Component={TenantPropertyPage} {...props} />
                <PrivateRoute path={PROPERTY} Component={PropertyPage} {...props} />

                <Route path='/*'>404 Does not Exist</Route>
            </Switch>

        </Router> 

    );
};

export {AppNavigator};