/* eslint-disable react/jsx-props-no-spreading */
/**
 * @jest-environment jsdom
 */

import {InputForm, InputFormProps, renderInputForm} from 'homepairs-elements';
import { shallow} from 'enzyme';
import * as React from 'react';
import { View, Text, TextInput} from 'react-native';
import {fireEvent, render} from 'react-native-testing-library';
import { SceneHeader, withSceneHeader, withModal } from 'homepairs-components';
import { SceneHeaderProps } from '../../../../src/Screens/Components/SceneHeader/SceneHeader';
import ThinButton from '../../../../src/Elements/Buttons/ThinButton';
import { propertyManagerMock1 as store} from '../../../fixtures/StoreFixture';
import { MainAppStackType } from 'homepairs-types';
import { Provider } from 'react-redux';


describe("SceneHeader Test: This is not the HOC", () => {
  const thinButtonTestId = 'click-thin-button';
  it('Test defaultProps for SceneHeader', () =>{
    expect(SceneHeader.defaultProps.buttonTitle).toBeNull();
    expect(SceneHeader.defaultProps.onButtonPress).toBeDefined();

    expect(SceneHeader.defaultProps.onButtonPress()).toBeUndefined();
  });

  describe ("Test for proper rendering:", () => {

    it("Button Title Not Provided", () => {
        const testProps: SceneHeaderProps = {
            title: 'Test',
        };
        const rendered = render(<SceneHeader {...testProps}/>);
        const {queryByType, getByText} = rendered;
        const thinButton = queryByType(ThinButton);

        // We test to indicate if the title has been rendered. 
        expect(getByText('Test')).toBeDefined();
        // We also test to see if the button has been rendered. It should not!
        expect(thinButton).toBeNull();

    });

    it("Button Title Provided", () => {
        const testProps: SceneHeaderProps = {
            title: 'Test',
            buttonTitle: 'Test Button',
        };
        const rendered = render(<SceneHeader {...testProps}/>);
        const {getByType, getByText} = rendered;
        const thinButton = getByType(ThinButton);

        // We test to indicate if the title has been rendered. 
        expect(getByText('Test')).toBeDefined();
        // We also test to see if the button has been rendered. 
        expect(thinButton).toBeDefined();

    });

    it("Button Title Provided with Defined Function", () => {
        const spyFunction = jest.fn();
        const testProps: SceneHeaderProps = {
            title: 'Test',
            buttonTitle: 'Test Button',
            onButtonPress: spyFunction,
        };
        const rendered = render(<SceneHeader {...testProps}/>);
        const {getByTestId} = rendered;
        
        // The thinButton itself has no way of handling press events, so we need to call its 
        // child component: Touchable Opacity. We have given this a testId. 
        const thinButtonPressable = getByTestId(thinButtonTestId);
        fireEvent.press(thinButtonPressable);

        expect(spyFunction).toHaveBeenCalled();

    });
  });
});


// We are going to use same file to test the HOC component that uses the SceneHeader
describe('withSceneHeader Test', () => {
    const mockStore = {...store};

    it("Test when only the header is to be defined", () => {
        const pageParams : MainAppStackType = {
            title: 'Test',
            navigate: 'None',
            key: 'Test',
        };
        const testComponent = withModal(withSceneHeader(View, pageParams), View);
        testComponent as 
        const testWithHOC = <testComponent />;
        const testComponetWithStore = <Provider store={mockStore}><testComponent/></Provider>;
    });
});