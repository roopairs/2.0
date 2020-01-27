import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mocks from 'react-native-jest-mocks';

// React 16 Enzyme adapter
mocks.initAll();
Enzyme.configure({ adapter: new Adapter() });
export { shallow, mount, render };
// export default Enzyme;