import * as AccountActions from './account/actions';
import * as HeaderActions from './header/actions';
import * as PropertyListActions from './property-list/actions';
import * as ServiceActions from './service/actions';
import * as SessionActions from './session/actions';
import * as PreferredProviderActions from './preferred-service-provider/actions';

export {AccountActions, HeaderActions, PropertyListActions, ServiceActions, SessionActions, PreferredProviderActions} ;
export const HomePairsStateActions = {AccountActions, HeaderActions, PropertyListActions, ServiceActions};
