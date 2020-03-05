import React, {useState} from 'react';
import { registerRootComponent, AppLoading} from 'expo';
import { Provider, connect } from 'react-redux';
import { LoadFonts } from 'homepairs-fonts';
import { AppState } from 'homepairs-types';
import { ActivityIndicator, StatusBar, AsyncStorage } from 'react-native';
import { fetchProperties, setSelectedProperty } from 'src/state/property-list/actions';
import { fetchAccountProfile } from 'src/state/account/actions';
import { isNullOrUndefined } from 'src/utility/ParameterChecker';
import { navigationPages } from 'src/Routes/RouteConstants';
import { AppNavigator } from './Routes/Routes';
import store from './state/store';


/* TODO: We can optimize this. Instead of holding the entire response, 
    we can hold only the information we need and create actions that deal with this use case.*/

const checkSession = async () => {
    await LoadFonts();
    /*
    await AsyncStorage.getItem('session').then(async (sessionToken) => {
        if(isNullOrUndefined(sessionToken)){
            await AsyncStorage.clear();
            AppNavigator.navigation.navigate(navigationPages.LoginScreen);
            return;
        }
        
        // TODO: Sene session token to backend to check if valid
        await AsyncStorage.getItem('profile').then(profile => {
            console.log(profile);
            const storedAccountProfile= JSON.parse(profile);
            const {properties} = storedAccountProfile;
    
            store.dispatch(fetchAccountProfile(storedAccountProfile));
            store.dispatch(fetchProperties(properties));
        }).catch();
        await AsyncStorage.getItem('selectedProperty').then(selectedPropertyIndex => {
            console.log(`Selected Property is: ${selectedPropertyIndex}`);
            const storedSelectedPropertyIndex = Number(selectedPropertyIndex);
            store.dispatch(setSelectedProperty(storedSelectedPropertyIndex));
        });
    }).catch(async () => {
        await AsyncStorage.clear();
    });
    */

    /**
     * TODO: Create async request that confirms if a session token from the Homepairs api is still valid. If it is 
     * then send the load the information from the local store back into the store to maintain the users information!
     */
};

function mapStateToProps(state: AppState): any {
    return {
        authed: state.authenticated,
    };
}

const ConnectedApp = connect(mapStateToProps)(AppNavigator);

const App = () => {
    const [dataLoaded, setDataLoaded] = useState(false);

    // Check to see if we have a valid session token. If we do, fetch the profile information again. 
    return !dataLoaded ?  
    <AppLoading startAsync={checkSession} onFinish={() => setDataLoaded(true)} onError={(error) => console.log(error)}>
        <ActivityIndicator />
          <StatusBar barStyle="default" />
        </AppLoading>
    : (
        <Provider store={store}>
            <ConnectedApp />
        </Provider>
    );
};

registerRootComponent(App);
