import React, {useState} from 'react';
import { registerRootComponent, AppLoading } from 'expo';
import { Provider } from 'react-redux';
import { LoadFonts } from 'homepairs-fonts';
import { ActivityIndicator, StatusBar } from 'react-native';
import { AppNavigator } from './Routes/Routes';
import store from './state/store';

const App = () => {
    const [dataLoaded, setDataLoaded] = useState(false);

    return !dataLoaded ?  
    <AppLoading startAsync={LoadFonts} onFinish={() => setDataLoaded(true)} onError={(error) => console.log(error)}>
        <ActivityIndicator />
          <StatusBar barStyle="default" />
        </AppLoading>
    : (
        <Provider store={store}>
            <AppNavigator />
        </Provider>
    );
};
registerRootComponent(App);
