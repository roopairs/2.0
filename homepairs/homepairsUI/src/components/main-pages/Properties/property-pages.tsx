/**
 * Prepare these property pages for parent usage. The components in the parent directory
 * should only care about these modules for usage.
 */

import { withSinglePropertyConnect } from './components';
import { DetailedPropertyScreenBase } from './DetailedPropertiesScreen';
import { PropertiesScreen } from './PropertiesScreen';
import { TenantPropertyScreen} from './TenantPropertyScreen';

export const DetailedPropertyPage = withSinglePropertyConnect(DetailedPropertyScreenBase);
export const PropertiesPage = PropertiesScreen;
export const TenantPropertyPage = withSinglePropertyConnect(TenantPropertyScreen);
