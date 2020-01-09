import PropertiesScreen from '../../src/Screens/Main/Properties/PropertiesScreen/PropertiesScreen'
import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PropertiesScreenBase from '../../src/Screens/Main/Properties/PropertiesScreen/PropertiesScreenBase';
import MainStackTitle from '../../src/Components/MainAppComponents/MainStackTitle';

const mockStore = configureStore();
// const mockDispatchfn = jest.fn(() => new Promise(resolve => resolve('')));
const mockDispatchfn = jest.fn();

const createTestProps = (props: Object) => ({
  onClick: jest.fn()
});


describe("PropertiesScreen", () => {

  const props: any = {
    onSetHeaderGoBackButton: jest.fn(),
  };

  let wrapper = shallow(
    <Provider store={mockStore()}>
      <PropertiesScreen {...props}/>
      </Provider>)
  console.log(wrapper)
  
  it("test single name prop", () => {
    expect(wrapper.find(View)).toHaveLength(0)
  })
});


/**This is for testing the Presentation Components */
describe("PropertiesScreenBase", () => {
  const props: any = {
    onSetHeaderGoBackButton: jest.fn(),
    properties: []
  };

  let wrapper = shallow(<PropertiesScreenBase {...props}/>)
  console.log(wrapper)
  
  it("Test amount of Views with no Properties", () => {
    expect(wrapper.find(View)).toHaveLength(1)
    expect(wrapper.find(ScrollView)).toHaveLength(1)
    expect(wrapper.find(MainStackTitle)).toHaveLength(1)
  })
})