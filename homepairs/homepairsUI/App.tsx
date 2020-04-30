import React, {useState} from 'react';
import { registerRootComponent, AppLoading} from 'expo';
import { Provider, connect } from 'react-redux';
import { LoadFonts } from 'homepairs-fonts';
import { AppState, ServiceProvider } from 'homepairs-types';
import { ActivityIndicator, StatusBar, AsyncStorage} from 'react-native';
import { fetchProperties, setSelectedProperty, parseAccount, refreshServiceProviders} from 'homepairs-redux-actions';
import { isNullOrUndefined } from 'homepairs-utilities';
import { navigationPages } from 'homepairs-routes';
import { AppNavigator } from './src/app-navigators/AppNavigation';
import { parsePreferredProviders } from 'homepairs-endpoints'
import store from './src/state/store';


/* TODO: We can optimize this. Instead of holding the entire response, 
    we can hold only the information we need and create actions that deal with this use case.
    Also, we should be fetching our properties and preferredProviders after we have confirmed a 
    session is still valid. 
    */

const checkSession = async () => {
    await LoadFonts();
    
    await AsyncStorage.getItem('profile').then(profile => {
        const storedAccountProfile= JSON.parse(profile);
        const {properties} = storedAccountProfile;
        store.dispatch(parseAccount(storedAccountProfile));
        store.dispatch(fetchProperties(properties));
    }).catch(() => {});

    /*
    await AsyncStorage.getItem('preferredProviders').then(preferredProviders => {
        const json = JSON.parse(preferredProviders);
        const {providers} = json;
        const parsedProviders = parsePreferredProviders(providers);
        store.dispatch(refreshServiceProviders(parsedProviders as ServiceProvider[]));
    }).catch(() => {});
    
    await AsyncStorage.getItem('selectedProperty').then(selectedPropertyId => {
        const storedSelectedPropertyId = selectedPropertyId;
        store.dispatch(setSelectedProperty(storedSelectedPropertyId));
    }).catch(() => {});
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
