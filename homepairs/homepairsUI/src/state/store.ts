import { createStore, combineReducers, AnyAction, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import { AppState } from './types';
import { properties } from './property-list/reducer';
import { accountProfile } from './account/reducer';
import { header } from './header/reducer';
import { serviceRequests } from './service/reducer';
import { settings } from './settings/reducer';
import { authenticated } from './session/reducer';
import { preferredProviders } from './preferred-service-provider/reducer';



const rootReducer = combineReducers<AppState, AnyAction>(
    {   
        header,
        properties,
        accountProfile,
        serviceRequests,
        settings,
        authenticated,
        preferredProviders,
        /** REMEMBER TO GO INTO ./types AND UPDATE THE AppState TYPE */
    },
);

const persistConfig = {
  key: 'root',
  storage : AsyncStorage,
  blacklist: ["settings"],
};
 
const persistedReducer = persistReducer(persistConfig, rootReducer);
 
export default () => {
  const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
  const persistor = persistStore(store);
  return {store, persistor};
};