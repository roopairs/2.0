import ThinButton from '../src/Components/GeneralComponents/Buttons/ThinButton';
import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { View } from 'react-native';

const createTestProps = (props: Object) => ({
  ...props
});

describe("ThinButton", () => {
  let wrapper: ShallowWrapper;
  
  wrapper = shallow(<ThinButton name='Test'/>)
  console.log(wrapper)
  
  it("test single name prop", () => {
    expect(wrapper.find(View)).toHaveLength(1)
  })
});