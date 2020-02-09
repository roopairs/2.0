/**
 * @jest-environment jsdom
 */

import {LoginButton} from 'homepairs-elements';
import { shallow} from 'enzyme';
import * as React from 'react';
import { View, TouchableOpacity, Text, Image} from 'react-native';
import { roopairsLogo, defaultProperty } from 'homepairs-images';
import { fireEvent, render } from 'react-native-testing-library';


describe("LoginButton", () => {
  const message = 'Hello World!';
  const testfunc = () => {return message;};
  const spyFunction = jest.fn(testfunc);


  const wrapper = shallow(<LoginButton key={1}/>);
  const wrapper2 = shallow(<LoginButton key={1} name='Test' onClick={spyFunction} image={defaultProperty}/>);
  const rendered = render(<LoginButton key={1} name='Test' onClick={spyFunction}  image={defaultProperty}/>);

  it('Test defaultProps for LoginButton', () =>{
    // We test the default property functions in here
    expect(LoginButton.defaultProps.onClick).toBeDefined();
    expect(LoginButton.defaultProps.image).toBeDefined();
    expect(LoginButton.defaultProps.imageStyle).toBeDefined();
    expect(LoginButton.defaultProps.name).toBeDefined();
    expect(LoginButton.defaultProps.containerStyle).toBeDefined();
    expect(LoginButton.defaultProps.buttonStyle).toBeDefined();
    expect(LoginButton.defaultProps.buttonTextStyle).toBeDefined();
    
    expect(LoginButton.defaultProps.name).toBe('');
    expect(LoginButton.defaultProps.onClick()).toBeUndefined();
    expect(LoginButton.defaultProps.image).toBe(roopairsLogo);

  });

  it("Test for proper Components", () => {
    expect(wrapper.find(View)).toHaveLength(1);
    expect(wrapper.find(TouchableOpacity)).toHaveLength(1);
    expect(wrapper.find(Text)).toHaveLength(1);
    expect(wrapper.find(Image)).toHaveLength(1);
    expect(wrapper.find(Image).props().source).toBe(roopairsLogo);
    expect(wrapper2.find(Image).props().source).toBe(roopairsLogo);
  });


  it("Method Test: Checks the onClick Method and checks to see if the image was updated", () => {
    const {getByTestId} = rendered;

    fireEvent.press(getByTestId('click-login-button'));
    fireEvent.press(getByTestId('click-login-button'));

    expect(spyFunction.mock.calls).toHaveLength(2);
    expect(spyFunction.mock.results[1].value).toBe(message);
  });
  
});