import { withSinglePropertyConnect } from './components';
import { DetailedPropertyScreenBase } from './DetailedPropertiesScreen';
import { PropertiesScreen } from './PropertiesScreen';
import { TenantPropertyScreen} from './TenantPropertyScreen';

/**
 * Prepare these property pages for parent usage. The components in the parent directory
 * should only care about these modules for usage.
 */


export const DetailedPropertyPage = withSinglePropertyConnect(DetailedPropertyScreenBase);
export const PropertiesPage = PropertiesScreen;
export const TenantPropertyPage = withSinglePropertyConnect(TenantPropertyScreen);
