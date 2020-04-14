/**
 * @jest-environment jsdom
 */

import {InputForm} from 'homepairs-elements';
import { shallow} from 'enzyme';
import * as React from 'react';
import { View, Text, TextInput} from 'react-native';
import {fireEvent, render} from 'react-native-testing-library';
import {HelperText} from 'react-native-paper';

describe("InputForm", () => {
  const TRUE = true;
  const testfunc = (child:string) => {return child;};

  const spyFunction = jest.fn(testfunc);

  const wrapper = shallow(<InputForm/>);
  const wrapper2 = shallow(<InputForm name='Test' parentCallBack={spyFunction} secureTextEntry={TRUE}/>);

  const rendered = render(<InputForm name='Test' parentCallBack={spyFunction} secureTextEntry={TRUE}/>);
  const rendered2 = render(<InputForm name='Test2' testID='error text'/>);
  
  it('Test defaultProps for InputForm', () =>{
    expect(InputForm.defaultProps.name).toBeNull();
    expect(InputForm.defaultProps.parentCallBack).toBeDefined();
    expect(InputForm.defaultProps.secureTextEntry).toBeDefined();
    expect(InputForm.defaultProps.secureTextEntry).toBeFalsy();
    expect(InputForm.defaultProps.secureTextEntry).toBeFalsy();
    expect(InputForm.defaultProps.ref).toBeUndefined();

    expect(InputForm.defaultProps.formTitleStyle).toBeDefined();
    expect(InputForm.defaultProps.containerStyle).toBeDefined();
    expect(InputForm.defaultProps.inputStyle).toBeDefined();

    expect(InputForm.defaultProps.parentCallBack("Hellow")).toBe("Hellow");

  });

  it("Test for proper Components", () => {
    expect(wrapper.find(View)).toHaveLength(1);
    expect(wrapper.find(Text)).toHaveLength(0);
    expect(wrapper.find(TextInput)).toHaveLength(1);
    expect(wrapper.find(HelperText)).toHaveLength(1);
    expect(wrapper2.find(View)).toHaveLength(1);
    expect(wrapper2.find(Text)).toHaveLength(1);
    expect(wrapper2.find(TextInput)).toHaveLength(1);
    expect(wrapper.find(HelperText)).toHaveLength(1);
  });

  it("Method Test: Checks the onClick Method and checks to see if the image was updated", () => {
    const {getByTestId, getByType} = rendered;
    const messageText = 'My Message';
    const messageText2 = 'Hello World';
    // Use getByType to get the instance of the type. However, we should not unit test components. 
    // React Developers highly suggest that we test for input about what a user would want. We should 
    // only unit test when not dealing with direct components. 
    const renderedForm = getByType(InputForm);
    // We will need to go into elements that we want to examine and give them test ids
    fireEvent.changeText(getByTestId('user-text-input'), messageText);
    expect(spyFunction).toHaveBeenCalledWith(messageText);
    
    renderedForm.props.parentCallBack(messageText2);
    expect(spyFunction).toHaveBeenCalledWith(messageText2);
    expect(spyFunction.mock.calls).toHaveLength(2);
    expect(spyFunction.mock.results[0].value).toBe(messageText);
    expect(spyFunction.mock.results[1].value).toBe(messageText2);

    // Test to see if references are being assigned and pass. We will 
    // attempt to call its function and check the state 
    expect(spyFunction.mock.calls).toHaveLength(2);
  });

  it ("Testing error messages turns true", () => {
    const {getByTestId, getByType} = rendered2;

    const renderedForm = getByType(InputForm);
    renderedForm.instance.setError(true);
    const helperText = getByTestId('helper-text');
    expect(helperText.props.visible).toBeTruthy();
    renderedForm.instance.setError(false);
    expect(helperText.props.visible).toBeFalsy();
  });

  
});