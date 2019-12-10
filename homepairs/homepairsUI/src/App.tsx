import React from "react";
import Routes from "./Routes/Routes";
import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';
import store from "./state/store";

const App = () => <Provider store={store}><Routes/></Provider>
registerRootComponent(App);

