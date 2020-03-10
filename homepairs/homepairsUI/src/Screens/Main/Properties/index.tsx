import DetailedPropertyScreen from './DetailedPropertiesScreen/DetailedPropertyScreen';
import PropertiesScreen from './PropertiesScreen/PropertiesScreen';
import TenantPropertiesScreen from './TenantPropertyScreen/TenantPropertyScreen';

/*
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
*/

const PropertyPages = { DetailedPropertyScreen, PropertiesScreen, TenantPropertiesScreen };
export default PropertyPages;
