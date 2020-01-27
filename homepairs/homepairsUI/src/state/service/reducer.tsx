import { 
    ServiceState,
    ServiceAction,
} from '../types';
import { SERVICES_ACTION_TYPES } from './actions';

export const initialState : ServiceState = {
    requested : [],
    accepted : [],
    closed : [],
};

export const serviceRequests = (
    state: ServiceState = initialState,
    action: ServiceAction,
) => {
    const newState = {...state, modalOpen: true };
    switch (action.type){
      case SERVICES_ACTION_TYPES.ACCEPT_SERVICE:
            // TODO: Complete AcceptServiceAction reducer 
            return newState;
      case SERVICES_ACTION_TYPES.DENY_SERVICE: 
            // TODO: Complete DenyServiceAction reducer
            return newState;
      case SERVICES_ACTION_TYPES.CANCEL_SERVICE: 
            // TODO: Complete CancelServiceAction reducer
            return newState;
      case SERVICES_ACTION_TYPES.COMPLETE_SERVICE:
            // TODO: Complete CompleteServiceAction reducer
            return newState;
      case SERVICES_ACTION_TYPES.REQUEST_SERVICE:
            // TODO: Complete RequestServiceACtion reducer 
            return newState;
      default:
          return state;
  }
};