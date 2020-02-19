import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mocks from 'react-native-jest-mocks';
import {ReactDOM} from 'react-dom';

const jsDOM = new ReactDOM('<!doctype html><html><body></body></html>');
// const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsDOM;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.requestAnimationFrame = function (callback) {
  return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function (id) {
  clearTimeout(id);
};
copyProps(window, global);


// React 16 Enzyme adapter
mocks.initAll();
Enzyme.configure({ adapter: new Adapter() });

export { shallow, mount, render };
// export default Enzyme;