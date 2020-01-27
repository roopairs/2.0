/**
 * @jest-environment jsdom
 */


import {ThinButton} from 'homepairs-elements';
import { shallow } from 'enzyme';
import * as React from 'react';
import { View, TouchableOpacity, Text} from 'react-native';
import renderer from 'react-test-renderer';


describe("ThinButton", () => {
  const testfunc = () => {return 'Hello World!';};
  const spyFunction = jest.fn(testfunc);

  const wrapper = shallow(<ThinButton />);
  const rendered = renderer.create(<ThinButton name='Test' onClick={spyFunction}/>);

  it("Test for proper Components", () => {
    expect(wrapper.find(View)).toHaveLength(1);
    expect(wrapper.find(TouchableOpacity)).toHaveLength(1);
    expect(wrapper.find(Text)).toHaveLength(1);
  });


  it("Method Test", () => {
    rendered.root.props.onClick();
    rendered.root.props.onClick();
    expect(spyFunction.mock.calls).toHaveLength(2);
  });
  
});