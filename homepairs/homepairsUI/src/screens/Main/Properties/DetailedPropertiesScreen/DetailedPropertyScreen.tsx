import { prepareNavigationHandlerComponent } from 'homepairs-routes';
import { DetailedPropertyScreenBase } from './DetailedPropertyScreenBase';
import { withSinglePropertyConnect } from '../components';

export default prepareNavigationHandlerComponent(withSinglePropertyConnect(DetailedPropertyScreenBase));
