/**
 * @jest-environment jsdom
 */

import {HamburgerButton} from 'homepairs-elements';
import { shallow} from 'enzyme';
import * as React from 'react';
import { View, TouchableOpacity, Text, Image} from 'react-native';
import { roopairsLogo, defaultProperty } from 'homepairs-images';
import { fireEvent, render } from 'react-native-testing-library';


describe("HamburgerButton", () => {
  const message = 'Hello World!';
  const testfunc = () => {return message;};
  const spyFunction = jest.fn(testfunc);


  const wrapper = shallow(<HamburgerButton key={1}/>);
  const rendered = render(<HamburgerButton key={1} onClick={spyFunction}/>);

  it('Test defaultProps for HamburgerButton', () =>{
    // We test the default property functions in here
    expect(HamburgerButton.defaultProps.onClick).toBeDefined();
    expect(HamburgerButton.defaultProps.onClick()).toBeUndefined();

  });

  it("Test for proper Components", () => {
    expect(wrapper.find(View)).toHaveLength(1);
    expect(wrapper.find(TouchableOpacity)).toHaveLength(1);
    expect(wrapper.find(Text)).toHaveLength(1);
    console.log(wrapper.find(Text).);

  });


  it("Method Test: Checks the onClick Method and checks to see if the image was updated", () => {
    const {getByTestId} = rendered;

    fireEvent.press(getByTestId('click-hamburger-button'));
    fireEvent.press(getByTestId('click-hamburger-button'));

    expect(spyFunction.mock.calls).toHaveLength(2);
    expect(spyFunction.mock.results[1].value).toBe(message);

    // Test to make sure no unexpected changes occured. This is an element so this should always pass
    expect(rendered.toJSON()).toMatchSnapshot();
  });
  
});