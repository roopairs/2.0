import LoginScreen from '../src/Screens/Auth/LoginScreen/LoginScreenBase.web';
import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { View } from 'react-native';
import Routes from '../src/Routes/Routes'

const createTestProps = (props: Object) => ({
  ...props
});

describe("LoginScreen ", () => {
  let wrapper: ShallowWrapper;
  
  wrapper = shallow(<LoginScreen navigation={Routes}/>)
  console.log(wrapper)
  
  it("test single name prop", () => {
    expect(wrapper.find(View)).toHaveLength(1)
  })
});