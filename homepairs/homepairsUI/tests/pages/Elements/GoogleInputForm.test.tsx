/**
 * @jest-environment jsdom
 */

import {GoogleInputForm} from 'homepairs-elements';
import { shallow} from 'enzyme';
import React, {Fragment} from 'react';
import {LocationItem} from 'homepairs-components';
import { View, Text, TextInput, ScrollView} from 'react-native';
import {fireEvent, render} from 'react-native-testing-library';
import {HelperText} from 'react-native-paper';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';

jest.mock('homepairs-images');

describe("InputForm", () => {
  const TRUE = true;
  const testfunc = (child:string) => {return child;};

  const spyFunction = jest.fn(testfunc);


  const wrapper = render(<GoogleInputForm/>);
  const wrapper2 = render(<GoogleInputForm name='Test' parentCallBack={spyFunction} secureTextEntry={TRUE}/>);

  const rendered = render(<GoogleInputForm name='Test' parentCallBack={spyFunction} secureTextEntry={TRUE}/>);
  const rendered2 = render(<GoogleInputForm name='Test2' testID='error text'/>);
  
  it('Test defaultProps for InputForm', () =>{
    expect(GoogleInputForm.defaultProps.name).toBeNull();
    expect(GoogleInputForm.defaultProps.parentCallBack).toBeDefined();
    expect(GoogleInputForm.defaultProps.secureTextEntry).toBeDefined();
    expect(GoogleInputForm.defaultProps.secureTextEntry).toBeFalsy();
    expect(GoogleInputForm.defaultProps.ref).toBeUndefined();

    expect(GoogleInputForm.defaultProps.formTitleStyle).toBeDefined();
    expect(GoogleInputForm.defaultProps.containerStyle).toBeDefined();
    expect(GoogleInputForm.defaultProps.inputStyle).toBeDefined();
    expect(GoogleInputForm.defaultProps.errorStyle).toBeDefined();
    expect(GoogleInputForm.defaultProps.locationsContainer).toBeDefined();

    expect(GoogleInputForm.defaultProps.parentCallBack("Hellow")).toBe("Hellow");

  });

  it("Test for proper Components", () => {
    expect(wrapper.getByType(GoogleAutoComplete)).toBeDefined();
    expect(wrapper.getAllByTestId('autocomplete-view')).toHaveLength(1);
    expect(wrapper.getAllByTestId('autocomplete-text-input')).toHaveLength(1);
    // fails because it does not exist but that technically passes lol
    // expect(wrapper.getAllByTestId('autocomplete-text')).toHaveLength(0);
    expect(wrapper.getAllByTestId('autocomplete-scrollview')).toHaveLength(1);
    expect(wrapper.getAllByTestId('autocomplete-helper-text')).toHaveLength(1);

    expect(wrapper2.getByType(GoogleAutoComplete)).toBeDefined();
    expect(wrapper2.getAllByTestId('autocomplete-view')).toHaveLength(1);
    expect(wrapper2.getAllByTestId('autocomplete-text-input')).toHaveLength(1);
    expect(wrapper2.getAllByTestId('autocomplete-text')).toHaveLength(1);
    expect(wrapper2.getAllByTestId('autocomplete-scrollview')).toHaveLength(1);
    expect(wrapper2.getAllByTestId('autocomplete-helper-text')).toHaveLength(1);
  });

  it("Method Test: Checks the onClick Method and checks to see if the image was updated", () => {
    const {getByTestId, getByType} = rendered;
    const messageText = 'My Message';
    const messageText2 = 'Hello World';
    // Use getByType to get the instance of the type. However, we should not unit test components. 
    // React Developers highly suggest that we test for input about what a user would want. We should 
    // only unit test when not dealing with direct components. 
    const renderedForm = getByType(GoogleInputForm);
    // We will need to go into elements that we want to examine and give them test ids
    fireEvent.changeText(getByTestId('autocomplete-text-input'), messageText);
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

    const renderedForm = getByType(GoogleInputForm);
    renderedForm.instance.setError(true);
    const helperText = getByTestId('autocomplete-helper-text');
    expect(helperText.props.visible).toBeTruthy();
    renderedForm.instance.setError(false);
    expect(helperText.props.visible).toBeFalsy();
  });

  
});