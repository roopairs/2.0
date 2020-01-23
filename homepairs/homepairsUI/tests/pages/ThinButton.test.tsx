import ThinButton from '../../src/Elements/Buttons/ThinButton';
import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from '../setup/test-setup';


const mockStore = configureStore();
//const mockDispatchfn = jest.fn(() => new Promise(resolve => resolve('')));
const mockDispatchfn = jest.fn();

const createTestProps = (props: Object) => ({
  onClick: jest.fn()
});

describe("ThinButton", () => {
  let wrapper: ShallowWrapper;
  
  wrapper = shallow(<ThinButton name='Test' onClick={()=>{}}/>)
  console.log(wrapper)
  
  it("test single name prop", () => {
    expect(wrapper.find(View)).toHaveLength(1)
  })
});