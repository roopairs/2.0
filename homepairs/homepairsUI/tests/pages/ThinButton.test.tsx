import {ThinButton} from 'homepair-elements';
import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { View } from 'react-native';


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