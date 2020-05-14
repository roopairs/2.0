import { 
    SettingsActions,
    SettingsState,
    ToggleDarkModeActivationAction,
    ToggleNotificationActivationAction,
    AddGoogleApiKeyAction,
} from '../types';
import { SETTINGS_ACTION_TYPES } from './actions';

export const initialState : SettingsState = {
    isDarkModeActive: false,
    areNotificationsActive: true,
    apiKey: null,
};

export const settings = (
    state: SettingsState = initialState,
    action: SettingsActions,
) => {
    const newState = {...state, modalOpen: true };
    switch (action.type){
      case SETTINGS_ACTION_TYPES.TOGGLE_DARKMODE_ACTIVATION:
            newState.isDarkModeActive = (action as ToggleDarkModeActivationAction).isDarkModeActive;
            return newState;
      case SETTINGS_ACTION_TYPES.TOGGLE_NOTIFICATION_ACTIVATION: 
            newState.isDarkModeActive = (action as ToggleNotificationActivationAction).areNotificationsActive;
            return newState;
      case SETTINGS_ACTION_TYPES.ADD_GOOGLE_API_KEY: 
            newState.apiKey = (action as AddGoogleApiKeyAction).apiKey;
            return newState;
      default:
          return state;
  }
};