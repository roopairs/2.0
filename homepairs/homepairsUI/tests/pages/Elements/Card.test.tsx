/**
 * @jest-environment jsdom
 */

import {Card} from 'homepairs-elements';
import { shallow} from 'enzyme';
import * as React from 'react';
import { View, TouchableOpacity, Text, Button} from 'react-native';
import { fireEvent, render } from 'react-native-testing-library';
import StyleFixtures from '../../fixtures/StyleFixture';


const TRUE= true;
const FALSE= false;
const {emptyStyle} = StyleFixtures;
const {emptyContainer, emptyText} = emptyStyle;

describe("Card", () => {
  const message = 'Hello World!';
  const message2= 'Im Pressed But not for the card!';
  const testfunc = () => {return message;};
  const testButtonfunc = () => {return message2;};

  const spyFunction = jest.fn(testfunc);
  const spyFunction2 = jest.fn(testfunc);
  const spyFunction3 = jest.fn(testfunc);
  const spyFunctionButton = jest.fn(testButtonfunc);
  const spyFunctionButton2 = jest.fn(testButtonfunc);
  
  const testComponent1 = <Card/>; // Basic component with defaults 

  // With children passed
  const testComponent2 = <Card><View/><Text>Nadie</Text></Card>;

  // With closeButton defined but the showCloseButton has not been set (Should not render)
  const testComponent3 = (<Card closeButtonPressedCallBack={spyFunction}/>);

  // With closeButton defined and showCloseButton set to false 
  const testComponent4 = 
  (<Card closeButtonPressedCallBack={spyFunction} showCloseButton={FALSE}/>);

  // With closeButton defined and showCloseButton set to true 
  const testComponent5 = (<Card closeButtonPressedCallBack={spyFunction} showCloseButton={TRUE}/>);

  // With close button and a child component that is pressable 
  const testComponent6 = 
  (<Card closeButtonPressedCallBack={spyFunction2} 
    showCloseButton={TRUE}>
        <View/><Text>Nadie</Text><Button testID='child-button' title='' onPress={spyFunctionButton}/></Card>);

// Testing the card components title 
const testComponent7 = <Card title={message}/>;
const testComponent8 = <Card subtitle={message2}/>;
const testComponent9 = <Card title={message} subtitle={message2}/>;
const testComponent10 = <Card title={message} subtitle={message2}><View/></Card>;

  // All properties filled *excluding key
  const testComponent11 = 
  (<Card
    containerStyle={emptyContainer}
    wrapperStyle={emptyContainer}
    title={message} 
    titleStyle={emptyContainer}
    subtitle={message2}
    subtitleStyle={emptyContainer}
    titleContainerStyle={emptyContainer}
    closeButtonStyle={emptyContainer}
    closeButtonContainerStyle={emptyContainer}
    closeButtonPressedCallBack={spyFunction3} 
    showCloseButton={TRUE}>
        <View/><Text>Nadie</Text><Button testID='child-button' title='' onPress={spyFunctionButton2}/>
    </Card>);
  
  const wrapper1 = shallow(testComponent1);
  const wrapper2 = shallow(testComponent2);
  const wrapper3 = shallow(testComponent3);
  const wrapper4 = shallow(testComponent4);
  const wrapper5 = shallow(testComponent5);
  const wrapper7 = shallow(testComponent7);
  const wrapper8 = shallow(testComponent8);
  const wrapper9 = shallow(testComponent9);
  const wrapper10 = shallow(testComponent10);
  const wrapper11 = shallow(testComponent11);


  const rendered5 = render(testComponent5);
  const rendered6 = render(testComponent6);
  const rendered11 = render(testComponent11);

  it('Test defaultProps for Card', () =>{
    // We test the default property functions in here
    expect(Card.defaultProps.children).toStrictEqual(<></>);
    expect(Card.defaultProps.containerStyle).toBeDefined();
    expect(Card.defaultProps.wrapperStyle).toBeDefined();
    expect(Card.defaultProps.title).toBeNull();
    expect(Card.defaultProps.titleStyle).toBeDefined();
    expect(Card.defaultProps.subtitle).toBeNull();
    expect(Card.defaultProps.subtitleStyle).toBeDefined();
    expect(Card.defaultProps.titleContainerStyle).toBeDefined();
    expect(Card.defaultProps.closeButtonStyle).toBeDefined();
    expect(Card.defaultProps.closeButtonContainerStyle).toBeDefined();
    expect(Card.defaultProps.showCloseButton).toBeFalsy();
    expect(Card.defaultProps.closeButtonPressedCallBack).toBeDefined();

    expect(Card.defaultProps.closeButtonPressedCallBack()).toBeUndefined();

  });

  
  it("Test for proper Component structure", () => {
    // Test Component 1   
    expect(wrapper1.find(View)).toHaveLength(2);

    // Test Component 2 
    expect(wrapper2.find(View)).toHaveLength(3);
    expect(wrapper2.find(Text)).toHaveLength(1);

    // Test Components 3
    expect(wrapper3.find(View)).toHaveLength(2);

    // Test Components 4 
    expect(wrapper4.find(View)).toHaveLength(2);

    // Test Component 5
    expect(wrapper5.find(View)).toHaveLength(3);
    expect(wrapper5.find(Text)).toHaveLength(1);
    expect(wrapper5.find(TouchableOpacity)).toHaveLength(1);

    // Test Component 7 *Skip 6, it will be used for rendering
    expect(wrapper7.find(View)).toHaveLength(4);
    expect(wrapper7.find(Text)).toHaveLength(1);
    // Test Component 8
    expect(wrapper8.find(View)).toHaveLength(2);

    // Test Component 9
    expect(wrapper9.find(View)).toHaveLength(4);
    expect(wrapper9.find(Text)).toHaveLength(2);

    // Test Component 10
    expect(wrapper10.find(View)).toHaveLength(5);
    expect(wrapper10.find(Text)).toHaveLength(2);

    // Test Component 11
    expect(wrapper11.find(View)).toHaveLength(6);
    expect(wrapper11.find(Text)).toHaveLength(4);
    expect(wrapper11.find(TouchableOpacity)).toHaveLength(1);

  });


  
  it("Test if close button executes with no other props", () => {
    
    const {getByTestId} = rendered5;

    fireEvent.press(getByTestId('click-card-close-button'));
    fireEvent.press(getByTestId('click-card-close-button'));

    expect(spyFunction.mock.calls).toHaveLength(2);
    expect(spyFunction.mock.results[1].value).toBe(message);

  });

  it("Test if close button executes with children buttons. Also test children props behaviors", () => {
    
    const {getByTestId} = rendered6;

    fireEvent.press(getByTestId('click-card-close-button'));
    fireEvent.press(getByTestId('click-card-close-button'));

    expect(spyFunction.mock.calls).toHaveLength(2);
    expect(spyFunction.mock.results[1].value).toBe(message);

    fireEvent.press(getByTestId('child-button'));
    fireEvent.press(getByTestId('child-button'));

    expect(spyFunctionButton.mock.calls).toHaveLength(2);
    expect(spyFunctionButton.mock.results[1].value).toBe(message2);

  });

  it("Test if close button executes with children buttons and styles rendered. Also test children props behaviors", () => {
    const {getByTestId} = rendered11;

    fireEvent.press(getByTestId('click-card-close-button'));
    fireEvent.press(getByTestId('click-card-close-button'));

    expect(spyFunction3.mock.calls).toHaveLength(2);
    expect(spyFunction3.mock.results[1].value).toBe(message);

    fireEvent.press(getByTestId('child-button'));
    fireEvent.press(getByTestId('child-button'));

    expect(spyFunctionButton2.mock.calls).toHaveLength(2);
    expect(spyFunctionButton2.mock.results[1].value).toBe(message2);

  });
  
});