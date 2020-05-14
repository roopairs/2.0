import { 
    ToggleDarkModeActivationAction,
    ToggleNotificationActivationAction,
} from '../types';

export const SETTINGS_ACTION_TYPES = {
    TOGGLE_DARKMODE_ACTIVATION: 'SETTINGS/TOGGLE_DARKMODE_ACTIVATION',
    TOGGLE_NOTIFICATION_ACTIVATION: 'SETTINGS/TOGGLE_NOTIFICATION_ACTIVATION',   
    ADD_GOOGLE_API_KEY: 'SETTINGS/ADD_GOOGLE_API_KEY', 
};

export const toggleDarkModeActivation = (isActive : boolean) : ToggleDarkModeActivationAction => {
    return({
        type: SETTINGS_ACTION_TYPES.TOGGLE_DARKMODE_ACTIVATION,
        isDarkModeActive: isActive,     
    });
};

export const toggleNotificationActivation = (isActive : boolean) : ToggleNotificationActivationAction => {
    return({
        type: SETTINGS_ACTION_TYPES.TOGGLE_NOTIFICATION_ACTIVATION,
        areNotificationsActive: isActive,     
    });
};

export const addGoogleApiKey = (apiKey: string) => {
    return ({
        type: SETTINGS_ACTION_TYPES.ADD_GOOGLE_API_KEY, 
        apiKey,
    });
};