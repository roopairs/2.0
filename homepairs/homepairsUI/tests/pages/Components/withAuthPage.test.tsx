import { shallow} from "enzyme";
import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import {render, fireEvent} from "react-native-testing-library";
// import { NavigationStackScreenProps, createStackNavigator } from 'react-navigation-stack';
// import { NavigationParams } from 'react-navigation';
import {
  withAuthPage,
  AuthPassProps,
} from "homepairs-components";
import { createStackNavigator } from "react-navigation-stack";
import PropertiesScreen from '../../../src/Screens/Main/Properties/PropertiesScreen/PropertiesScreen';
import {AppNavigator} from "../../../src/Routes/Routes";
import * as Mocks from '../../fixtures/StoreFixture';
import { testStore1 } from '../../fixtures/StoreFixture';
import ThinButton from '../../../src/Elements/Buttons/ThinButton';
import { NavigationSwitchProp } from "react-navigation";

/**
 * Here we will test the High Order Component HOC of withAuthPage. We will pass in some dum parameters
 * and test to see if the component renders. This will be wrapped within a Shallow Wrapper.
 */

const store1 = Mocks.testStore1;
// const component1 = Components.SingleViewComponent;
const newNavStack = createStackNavigator({test: PropertiesScreen});
const passProps1: AuthPassProps = {
  button: "I am a button",
  subtitle: "I am a subtitle",
  buttonColor: "blue",
  loadingModalText: "I should appear when my state is true",
  underButtonText: "I am below the button",
  highlightedText: "I am highlighted",
};
const spyFunction = jest.fn((arg:string) => {return arg;});
const mockNavigation: NavigationSwitchProp = {
  navigate: (routeNameOrOptions)=>{
    spyFunction(routeNameOrOptions);
    return true;
  },
  state: undefined,
  dispatch: undefined, 
  goBack: undefined,
  dismiss: undefined,
  openDrawer:undefined,
  closeDrawer: undefined, 
  toggleDrawer: undefined, 
  getParam: undefined,
  setParams: undefined,
  emit: undefined, 
  addListener: undefined, 
  isFocused: undefined, 
  isFirstRouteInParent: undefined, 
  dangerouslyGetParent: undefined,
  jumpTo: undefined,
};

describe("test withAuthPage", ()=> {
  const mockStore = configureMockStore([thunk]);
  describe("Test that the component renders properly", () => {
    const store = mockStore(testStore1);
    const modalVisibilitySpy = jest.fn();
    beforeEach(() => {
      store.clearActions();
      spyFunction.mockClear();
      modalVisibilitySpy.mockClear();
    });
    it("Should render the property and have behavior we should examine", () => {
      const AuthHOC = withAuthPage(View, passProps1);
      const authObj = <AuthHOC onChangeModalVisibility={modalVisibilitySpy}/>;
      const renderedComponent1 = render(authObj);

      const wrapper = shallow(authObj);
      const {getAllByType, getByType, getByTestId} = renderedComponent1;
      const PropertiesMock = <Provider store={store}>{newNavStack}</Provider>;
      
      const thinButtons = getAllByType(ThinButton);
      /*
      const views = getByType(View);
      const texts = getAllByType(Text);
      */
      
      const clickable = getByTestId('click-thin-button');

      // Test to see if the correct amount of elements have been rendered
      expect(wrapper.find(View)).toHaveLength(5);
      expect(wrapper.find(Text)).toHaveLength(3);

      // We need to use the renderer for user defined components 
      expect(thinButtons).toHaveLength(1);


      fireEvent.press(clickable);
      console.log(clickable);
      expect(modalVisibilitySpy).toHaveBeenCalledTimes(0);

      /*
      const tree = render(PropertiesMock).toJSON();
      console.log(tree);
      expect(wrapper).not.toBe(null);
      const elements = wrapper.getElements();
      const props = wrapper.getElement();
      console.log(elements);
      wrapper.simulate('setHighlightedClick');
      console.log(wrapper.state());
      */      
     expect(false).toBeTruthy();

      // expect(wrapper.find(View)).toHaveLength(5);
      // expect(wrapper.find(TouchableOpacity)).toHaveLength(1);
      // expect(wrapper.find(Text)).toHaveLength(3);
    });
  });

});

/*
describe("test withAuth Page", () => {
  let store: any;
  const mockStore = configureMockStore([thunk]);
  // creates the store with any initial state or middleware needed
  store = mockStore(store1);
  beforeEach(() => {
    const mockStore = configureMockStore([thunk]);
    // creates the store with any initial state or middleware needed
    store = mockStore(store1);
  });
  // We have renderer working with regular components. Need to figure out how to get this to work with
  // HOCß
  it("Should render the property and have behavior we should examine", () => {
    // const Component1 = component1;
    const AuthHOC = withAuthPage(View, passProps1);
    const authObj = <AuthHOC navigation={null} onChangeModalVisibility={()=>{}}/>;
  
    const PropertiesMock = <Provider store={store}>{newNavStack}</Provider>;
    
    const wrapper = shallow(authObj);
    const tree = render(PropertiesMock).toJSON();
    console.log(tree);
    expect(wrapper).not.toBe(null);
    const elements = wrapper.getElements();
    const props = wrapper.getElement();
    console.log(elements);
    wrapper.simulate('setHighlightedClick');
    console.log(wrapper.state());
    // expect(wrapper.find(View)).toHaveLength(5);
    // expect(wrapper.find(TouchableOpacity)).toHaveLength(1);
    expect(wrapper.find(Text)).toHaveLength(3);
  });
});

/*
describe('<Auth />', () => {
    beforeEach(() => {
      const mockStore = configureStore();
  
      // creates the store with any initial state or middleware needed
      store = mockStore({
        user: {
          isLoaded: true,
        },
      });
    });
    it('Should render the component only when auth prop is true', () => {
      const Component = <h1>Hola</h1>;
      const ConditionalHOC = Auth(Component);
      const wrapper = shallow(<ConditionalHOC store={store} />);
      expect(wrapper).not.toBe(null);
    });
  });
  */