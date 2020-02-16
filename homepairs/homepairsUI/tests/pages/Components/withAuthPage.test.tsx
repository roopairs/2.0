import { shallow} from "enzyme";
import * as React from "react";
import { View, Text, Button } from "react-native";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {render, fireEvent} from "react-native-testing-library";
import {
  withAuthPage,
  AuthPassProps,
  AuthPageInjectedProps,
} from "homepairs-components";
import { testStore1 } from '../../fixtures/StoreFixture';
import ThinButton from '../../../src/Elements/Buttons/ThinButton';

/**
 * Here we will test the High Order Component HOC of withAuthPage. We will pass in some dum parameters
 * and test to see if the component renders. This will be wrapped within a Shallow Wrapper.
 */

const passProps1: AuthPassProps = {
  button: "I am a button",
  subtitle: "I am a subtitle",
  buttonColor: "blue",
  loadingModalText: "I should appear when my state is true",
  underButtonText: "I am below the button",
  highlightedText: "I am highlighted",
};

const passProps2: AuthPassProps = {
  ...passProps1, 
  subtitle: <Button testID='pass-prop-button'  title='Pass Props' onPress={()=>{}} />,
};

const passProps3: AuthPassProps = {
  ...passProps1, 
  subtitle: undefined,
};

const onClickButtonSpy = jest.fn();
const onClickHighlightedTextSpy = jest.fn();

function testComponent(props: AuthPageInjectedProps ) {
  const {clickButton, clickHighlightedText, setErrorState} = props;

  // Single function will call all injected methods for the test. 
  function invokeInjected(){
    clickButton(onClickButtonSpy);
    clickHighlightedText(onClickHighlightedTextSpy);
    setErrorState(true, 'Error');
  }

  return(
    <>
      <Button testID='test-injected' title='Injected' onPress={invokeInjected}/>
    </>);

}

describe("test withAuthPage", ()=> {
  const mockStore = configureMockStore([thunk]);

  describe("Test that the component renders properly", () => {
    const store = mockStore(testStore1);
    beforeEach(() => {
      store.clearActions();
    });

    it("Should render the property and have behavior we should examine", () => {
      const AuthHOC = withAuthPage(View, passProps1);
      const authObj = <AuthHOC />;
      const renderedComponent1 = render(authObj);

      const wrapper = shallow(authObj);
      const {getAllByType, getByTestId} = renderedComponent1;
      
      const thinButtons = getAllByType(ThinButton);
      
      const clickable = getByTestId('click-thin-button');


      // Test to see if the correct amount of elements have been rendered
      expect(wrapper.find(View)).toHaveLength(5);
      expect(wrapper.find(Text)).toHaveLength(3);

      // We need to use the renderer for user defined components 
      expect(thinButtons).toHaveLength(1);

      // Test if the button invokes a function. Since this HOC's click functions all 
      // rely on the wrapped components, this should be false. 
      fireEvent.press(clickable);
      expect(onClickButtonSpy).toHaveBeenCalledTimes(0);

    });

    it("Test to if we can succesfully pass a React.Element into the button", () => {
      const AuthHOC = withAuthPage(View, passProps2);
      const authObj = <AuthHOC />;
      const renderedComponent1 = render(authObj);
      const {getByTestId} = renderedComponent1;

      const clickable = getByTestId('pass-prop-button');
      expect(clickable.instance).toBeInstanceOf(Button);
    });

    it("Test to see if what occurs when the button is not defined", () => {
      const AuthHOC = withAuthPage(View, passProps3);
      const authObj = <AuthHOC />;
      const renderedComponent1 = render(authObj);
      const {queryByTestId} = renderedComponent1;

      // Both of these should be false. Therefore, nothing was rendered for the subtitle
      expect(queryByTestId('auth-subtitle')).toBeFalsy();
      expect(queryByTestId('auth-subtitle-element')).toBeFalsy();
    });

    it("Test for an actual component that invokes the functions", () => {
      const AuthHOC = withAuthPage(testComponent, passProps1);
      const authObj = <AuthHOC />;
      const renderedComponent1 = render(authObj);


      const {getAllByType, getByTestId, queryByTestId} = renderedComponent1;
      const clickableButtons = getAllByType(Button);
      const clickableTouchables = getByTestId('click-thin-button');

      // Subtitle should be defined this time since we have passed in a subtitle
      expect(getByTestId('auth-subtitle')).toBeDefined();

      // Error message and Modal should be not be shown. In this case error should be undefined
      expect(queryByTestId('auth-error')).toBeFalsy();


      // Check if the wrapped component renders. 
      clickableButtons.forEach(button => {
        fireEvent.press(button);
      });

      fireEvent.press(clickableTouchables);


      // The injected functions should now be called. 
      expect(onClickButtonSpy).toHaveBeenCalledTimes(1);
      // Error message should be defined now
      expect(getByTestId('auth-error')).toBeDefined();

    });
  });

});
