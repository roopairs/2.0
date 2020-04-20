import AccountPages from './Account/index';
import PropertyPages from './Properties/index';
import ServiceRequestPages from './ServiceRequest/index';

const MainAppPages = {AccountPages, PropertyPages, ServiceRequestPages};
export default MainAppPages;
export {default as AccountPages} from './Account/index';
export {default as PropertyPages} from './Properties/index';
export {default as ServiceRequestPages} from './ServiceRequest/index';