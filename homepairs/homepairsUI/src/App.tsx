import React from "react";
import {AppNavigator} from "./Routes/Routes";
import { registerRootComponent } from 'expo';
import { Provider} from 'react-redux';
import store from "./state/store";

const App = () => {
    return(<Provider store={store}><AppNavigator/></Provider>)
}
registerRootComponent(App);

