import { 
    ToggleDarkModeActivationAction,
    ToggleNotificationActivationAction,
} from '../types';

export const SETTINGS_ACTION_TYPES = {
    TOGGLE_DARKMODE_ACTIVATION: 'SETTINGS/TOGGLE_DARKMODE_ACTIVATION',
    TOGGLE_NOTIFICATION_ACTIVATION: 'SETTINGS/TOGGLE_NOTIFICATION_ACTIVATION',    
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