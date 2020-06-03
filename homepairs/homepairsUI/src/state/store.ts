import { createStore, combineReducers, AnyAction, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import { AppState, GeneralStateAction, SessionAction } from './types';
import { properties } from './property-list/reducer';
import { accountProfile } from './account/reducer';
import { header } from './header/reducer';
import { serviceRequests } from './service/reducer';
import { settings } from './settings/reducer';
import { authenticated } from './session/reducer';
import { preferredProviders } from './preferred-service-provider/reducer';
import { SESSION_ACTION_TYPES } from './session/actions';

/**
 * Base level Reducer that should always be invoked. This reducer 
 * assumes changes to the state as if it were to run infinintley. 
 */
const appReducer = combineReducers<AppState, AnyAction>(
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

/**
 * This is the reducer that invokes actions at the global application level. 
 * Here, the entire state will be affected based on what types of actions 
 * have passed. State cleanup, application data management, and other such 
 * logic should be defined here.
 * @param state - Current state of the application
 * @param action - Action invoked to change the state
 */
const rootReducer = (state: AppState, action: GeneralStateAction) => {
  let updatedState: AppState = {...state};
  if (action.type === SESSION_ACTION_TYPES.SET_AUTH_STATE 
      && !(action as SessionAction).authed) {
        updatedState = {
          ...state, 
          header: undefined, 
          properties: undefined,
          accountProfile: undefined,
          serviceRequests: undefined,
          preferredProviders: undefined,
      };
      // for all keys defined in your persistConfig(s)
      AsyncStorage.removeItem('persist:root');
  }
  return appReducer(updatedState, action);
};

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