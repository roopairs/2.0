import React from "react";
import Routes from "./Routes/Routes";
import { registerRootComponent } from 'expo';

const App = () => <Routes/>
registerRootComponent(App);

