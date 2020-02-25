/* eslint-disable react/jsx-props-no-spreading */
import { NavigationStackProp } from 'react-navigation-stack';
import { RouteProps, useLocation } from 'react-router-dom';
import { NavigationSwitchProp } from 'react-navigation';
import { isNullOrUndefined } from 'src/utility/ParameterChecker';
import { Platform } from 'react-native';
import React from 'react';

type Navigators = NavigationStackProp | RouteProps | NavigationSwitchProp

/**
 * ---------------------------------------------------
 * Navigation-Route Handler  
 * ---------------------------------------------------
 * Since the Homepairs application is going to be a PWA, it is necessary for the application to be able to run on 
 * both mobile and webdevices. Using expo, we initially decided that it would be wise to use react-navigation. This 
 * works perfectly for mobile, however, this does not allow us to navigate the web application with its fullest potential.
 * Therefore, we are forced to use both navigation-stack and react-router to achieve the full functionality of what is needed.
 * This will take the types provided from withNavigation or withRouter and property define an object that has the functionality 
 * to invoke actions based on what is passed. 
 * @param {NavigationStackProp | RouteProps | NavigationSwitchProp} navigation -a router that allows the application 
 * to navigate across endpoints/paths/screens of mobile and web apps 
 */
export default class NavigationRouteHandler{
    navigation;

    /**
     * ---------------------------------------------------
     * createFromProps 
     * ---------------------------------------------------
     * A helper method that renders a navigation Route Handler object from props passed/injected into a react component. 
     * This function assumes that the user is passing in the correct property for the platform that they are using. Otherwise, 
     * a instance of the NavigationRouteHandler object will be built with an undefined object 
     * @param {any} props 
     */
    static createFromProps(props:any){
        const {navigation, history} = props;
        const navObject = Platform.OS === 'web' ? history : navigation;

        // Case if the navigation has already been converted to a NavigationRouteHandler.
        if(!isNullOrUndefined(navigation) && navigation instanceof NavigationRouteHandler){
            return navigation;
        }
        
        return new NavigationRouteHandler(navObject);
    }

    constructor(navigation: Navigators){
        this.navigation = navigation; 
    }

    /**
     * Invokes a forward navigation to a page on the navigation route stack. 
     * @param {string} route -the route a navigator should go to
     * @param {any} params -the data to be stored into the url for proper rendering
     * @param {boolean} asBackground -Indicates if the state of the navigation object should be a modal only 
     * works for react-router
     */
    // TODO: pass in state param to allow user to pass in state for router 
    navigate(route:string, params?:any, asBackground?:boolean){
        if(isNullOrUndefined(this.navigation.navigate)){
            const {location} = this.navigation;
            if(asBackground)
                this.navigation.push(route, {background: location});
            else
                this.navigation.push(route);
        } else {
          this.navigation.navigate(route, params);  
        }
    }

    /**
     * Invokes a standard push to the navigation route stack. On switch navigators, it simply navigates
     * @param {string} route -the route a navigator should go to
     * @param {any} params -the data to be stored into the url for proper rendering
     * @param {boolean} asBackground -Indicates if the state of the navigation object should be a modal only 
     */
    push(route:string, params?:any, asBackground?:boolean){
        if(isNullOrUndefined(this.navigation.navigate)){
            this.navigation.push(route);
        } else if(!isNullOrUndefined(this.navigation.push)){
            const {location} = this.navigation;
            if(asBackground){
                this.navigation.push(route, {background: location});
            }
            else{
                this.navigation.push(route);
            }
            this.navigation.push(route);

        } else { // TODO: Might want to throw error instead 
            this.navigation.navigate(route);
        }
    }

    /**
     * Invokes the goBackFunction. All possible router objects have built in goBack Functions. 
     */
    goBack(){
        this.navigation.goBack();
    }

    /**
     * Invokes the pop action an a navigation stack object or goes back the equivalent amount on a router object 
     * If this is invoked on a navigation switch object, an error is printed
     * @param {number} amount -Amount of pages to navigate backwards from 
     * @param {any} params -Parameters to passed when navigating backward
     */
    pop(amount?:number, params?:any){
        if(!isNullOrUndefined(this.navigation.pop)){
            (this.navigation as NavigationStackProp).pop(amount);
        } else if(isNullOrUndefined(this.navigation.navigate)){
            (this.navigation as RouteProps).go(amount * -1);
        } else { // TODO: Might want to throw error instead 
            console.log('Error: Will not call prop on an undefined function. Most likely you are attempting to pop a navigationSwitch object');
        }
    }
}

/**
 * ---------------------------------------------------
 * With Navigation-Route Handler  
 * ---------------------------------------------------
 * A high order component that injects a NavigationRouteHandler object into a component. This should be called 
 * first and expects itself to be passed a NavigationSwitch, NavigationStack, or Route object. 
 * @param {any} Component 
 */
export function withNavigationRouteHandler(Component: any){
    return function BaseComponent(props:any){
        const navigation = NavigationRouteHandler.createFromProps(props);
        return(
            <Component {...props} navigation={navigation} />
        );
    };
}