
import { ServiceRequestScreen } from './ServiceRequestScreen';
import { NewRequestScreen } from './NewRequest';

/**
 * ---------------------------------------------------
 * ServiceRequestScreen
 * ---------------------------------------------------
 * This is intended to be used in the Main Navigation Stack. This component is connected to the 
 * HomePairs redux store, the react-native Navigator, and our very own withSceneHeader HOC. It also 
 * can be injected with a Modal; this gives this component the capability to reveal a smaller page 
 * that allows the user to add a new service request to their account. 
 */
export const ServiceRequestPage = ServiceRequestScreen;
export const NewRequestPage = NewRequestScreen;
