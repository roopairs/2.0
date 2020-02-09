/**
 * @jest-environment jsdom
 */

import {ThinButton} from 'homepairs-elements';
import { shallow } from 'enzyme';
import * as React from 'react';
import { View, TouchableOpacity, Text} from 'react-native';
import { fireEvent, render } from 'react-native-testing-library';


describe("ThinButton", () => {
  const message = 'Hello World!';
  const testfunc = () => {return message;};
  const testfunc2 = () => {return message + '!';};
  const testfunc3 = () => {return message + '!!';};

  const spyFunction = jest.fn(testfunc);
  const spyFunction2 = jest.fn(testfunc2);
  const spyFunction3 = jest.fn(testfunc3);

  const wrapper = shallow(<ThinButton />);
  const rendered = render(<ThinButton name='Test' onClick={spyFunction} onPressIn={spyFunction2} onPressOut={spyFunction3}/>);

  it('Test defaultProps for ThinButton', () =>{
    // We test the default property functions in here
    expect(ThinButton.defaultProps.onClick).toBeDefined();
    expect(ThinButton.defaultProps.onPressIn).toBeDefined();
    expect(ThinButton.defaultProps.onPressOut).toBeDefined();
    expect(ThinButton.defaultProps.name).toBeDefined();
    expect(ThinButton.defaultProps.containerStyle).toBeDefined();
    expect(ThinButton.defaultProps.buttonStyle).toBeDefined();
    expect(ThinButton.defaultProps.buttonTextStyle).toBeDefined();
    
    expect(ThinButton.defaultProps.name).toBe('');
    expect(ThinButton.defaultProps.onClick()).toBeUndefined();
    expect(ThinButton.defaultProps.onPressIn()).toBeUndefined();
    expect(ThinButton.defaultProps.onPressOut()).toBeUndefined();

  });

  it("Test for proper Components", () => {
    expect(wrapper.find(View)).toHaveLength(1);
    expect(wrapper.find(TouchableOpacity)).toHaveLength(1);
    expect(wrapper.find(Text)).toHaveLength(1);
  });


  /**
   * Please refer to here for the api of the react-native-testing-library:
   * https://github.com/callstack/react-native-testing-library/blob/master/docs/API.md#fireevent
   */
  it("Method onClick Test", () => {
    const {getByTestId} = rendered;
    const testId = 'click-thin-button';

    fireEvent.press(getByTestId(testId));
    fireEvent.press(getByTestId(testId));

    // How to fire Events that are not defined by convience methods 
    fireEvent(getByTestId(testId), 'pressIn');
    fireEvent(getByTestId(testId), 'pressOut');
    fireEvent(getByTestId(testId), 'pressIn');
    fireEvent(getByTestId(testId), 'pressOut');

    expect(spyFunction.mock.calls).toHaveLength(2);
    expect(spyFunction.mock.results[1].value).toBe(message);

    expect(spyFunction2.mock.calls).toHaveLength(2);
    expect(spyFunction2.mock.results[1].value).toBe(message + '!');

    expect(spyFunction2.mock.calls).toHaveLength(2);
    expect(spyFunction3.mock.results[1].value).toBe(message + '!!');

  });
  
});