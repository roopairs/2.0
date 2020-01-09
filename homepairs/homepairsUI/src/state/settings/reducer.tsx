import { 
    SettingsActions,
    SettingsState,
    ToggleDarkModeActivationAction,
    ToggleNotificationActivationAction,
} from '../types';
import { SETTINGS_ACTION_TYPES } from './actions';

export const initialState : SettingsState = {
    isDarkModeActive: false,
    areNotificationsActive: true,
}

export const settings = (
    state: SettingsState = initialState,
    action: SettingsActions
) => {
    const newState = {...state, modalOpen: true };
    switch (action.type){
      case SETTINGS_ACTION_TYPES.TOGGLE_DARKMODE_ACTIVATION:
            newState.isDarkModeActive = (action as ToggleDarkModeActivationAction).isDarkModeActive
            return newState
      case SETTINGS_ACTION_TYPES.TOGGLE_NOTIFICATION_ACTIVATION: 
            newState.isDarkModeActive = (action as ToggleNotificationActivationAction).areNotificationsActive
            return newState
      default:
          return state;
  }
}