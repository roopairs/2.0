import { createStore, combineReducers, AnyAction, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { AppState } from './types';
import { propertyList } from './property-list/reducer';
import { accountProfile } from './account/reducer';
import { header } from './header/reducer';
import { serviceRequests } from './service/reducer';
import { settings } from './settings/reducer';

export default createStore(
    combineReducers<AppState, AnyAction>(
        {   
            header,
            propertyList,
            accountProfile,
            serviceRequests,
            settings,
            /** REMEMBER TO GO INTO ./types AND UPDATE THE AppState TYPE */
        },
    ),
    composeWithDevTools(applyMiddleware(thunk)),
);