import React, {useState} from 'react';
import { registerRootComponent, AppLoading} from 'expo';
import { Provider, connect } from 'react-redux';
import { LoadFonts } from 'homepairs-fonts';
import { AppState } from 'homepairs-types';
import { ActivityIndicator, StatusBar, AsyncStorage } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { fetchGoogleApiKey } from 'homepairs-endpoints';
import { AppNavigator } from './src/app-navigators/AppNavigation';
import initializeStore from './src/state/store';

/* TODO: We can optimize this. Instead of holding the entire response, 
    we can hold only the information we need and create actions that deal with this use case.
    Also, we should be fetching our properties and preferredProviders after we have confirmed a 
    session is still valid. 
    */

const checkSession = async () => {
    await LoadFonts();
    await AsyncStorage.getItem('persist:root').then(response => {
        
    });
};

function mapStateToProps(state: AppState): any {
    return {
        authed: state.authenticated,
    };
}
const ConnectedApp = connect(mapStateToProps)(AppNavigator);

const App = () => {
    const [dataLoaded, setDataLoaded] = useState(false);

    const {store, persistor} = initializeStore();
    store.dispatch(fetchGoogleApiKey());

    // Check to see if we have a valid session token. If we do, fetch the profile information again. 
    return !dataLoaded ?  
    <AppLoading startAsync={checkSession} onFinish={() => {setDataLoaded(true);}} onError={(error) => console.log(error)}>
        <ActivityIndicator />
          <StatusBar barStyle="default" />
        </AppLoading>
    : (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ConnectedApp />
            </PersistGate>
        </Provider>
    );
};

export default App;

registerRootComponent(App);
