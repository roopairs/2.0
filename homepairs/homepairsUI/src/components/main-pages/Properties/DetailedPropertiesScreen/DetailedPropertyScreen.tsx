import { prepareNavigationHandlerComponent } from 'src/routes';
import { DetailedPropertyScreenBase } from './DetailedPropertyScreenBase';
import { withSinglePropertyConnect } from '../components';


export default prepareNavigationHandlerComponent(withSinglePropertyConnect(DetailedPropertyScreenBase));
