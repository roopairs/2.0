// eslint-disable-next-line max-classes-per-file
import React from 'react';
import { BackHandler, Alert } from 'react-native';
import { NavigationRouteHandler } from 'src/routes';


/**
 * Android Alert to prompt the user if they wish to 
 * close the application
 */
const handleBackButton = () => {
    Alert.alert(
        'Exit App',
        'Exiting the application?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            }, 
            {
                text: 'OK',
                onPress: () => BackHandler.exitApp(),
            },
        ], 
        { cancelable: false },
    );
    return true;
};

/**
 * ---------------------------------------------------------------
 * With Android Back Handler
 * ---------------------------------------------------------------
 * A HOC that sets the Android Back button of the component to always 
 * close the application. This is needed since the navigation stack 
 * does no distinguish on pages that should be the bottom of the stack.
 * After navigation, the page will have no affect over the back button 
 * until it is remounted.
 * @param WrappedComponent 
 */
export default function withAndroidBackExit(WrappedComponent: any){
    return class CloseAppOnBackComponent extends React.Component{
        componentDidMount(){
            BackHandler.addEventListener("hardwareBackPress", handleBackButton);
        }

        componentWillUnmount(){
            BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
        };

        render(){return <WrappedComponent {...this.props} />;}
    };

}


function withAndroidBackRegular(WrappedComponent: any){
    return class CloseAppOnBackComponent extends React.Component<{navigation: NavigationRouteHandler & any}>{
        
        componentDidMount(){
            const {navigation} = this.props;
            BackHandler.removeEventListener("hardwareBackPress", () => {navigation.goBack(); return true;});
        }

        componentWillUnmount(){
            const {navigation} = this.props;
            BackHandler.removeEventListener("hardwareBackPress", () => {navigation.goBack(); return true;});
        };

        render(){return <WrappedComponent {...this.props} />;}
    };
}

export {withAndroidBackRegular, withAndroidBackExit};
