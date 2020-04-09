import { 
    RequestServiceAction,
    AcceptServiceAction,
    DenyServiceAction,
    CancelServiceAction,
    CompleteServiceAction,
    RequestedService,
    ServiceProvider,
    Service,
    AcceptedService,
    ServiceRequestStatus,
} from '../types';


export const SERVICES_ACTION_TYPES = {
    REQUEST_SERVICE: 'SERVICES/REQUEST_SERVICE',
    ACCEPT_SERVICE: 'SERVICES/ACCEPT_SERVICE',
    DENY_SERVICE: 'SERVICES/DENY_SERVICE',
    CANCEL_SERVICE: 'SERVICES/CANCEL_SERVICE',
    COMPLETE_SERVICE: 'SERVICES/COMPLETE_SERVICE',
};

export const requestServiceAction = (serviceProvider : ServiceProvider) : RequestServiceAction => {
    // TODO: Define this action 
    const newRequest : RequestedService = {
        provider : serviceProvider,
        status : ServiceRequestStatus.Pending,
    } ;

    return({
        type: SERVICES_ACTION_TYPES.REQUEST_SERVICE,
        request: newRequest,     
    });
};

export const acceptServiceAction = (request : RequestedService) : AcceptServiceAction => {
    // TODO: Define this function 
    return({
        type : SERVICES_ACTION_TYPES.ACCEPT_SERVICE,
        request,
    });
};

export const denyServiceAction = (request : RequestedService) : DenyServiceAction => {
    // TODO: Define this function 
    return({
        type : SERVICES_ACTION_TYPES.DENY_SERVICE,
        request,
    });
};

export const cancelServiceAction = (service : Service) : CancelServiceAction => {
    // TODO: Define this function 
    return ({
        type : SERVICES_ACTION_TYPES.CANCEL_SERVICE,
        service,
    });
};

export const completeServiceAction = (service : AcceptedService) : CompleteServiceAction => {
    // TODO: Define this function 
    return ({
        type : SERVICES_ACTION_TYPES.COMPLETE_SERVICE,
        service,
    });
};
