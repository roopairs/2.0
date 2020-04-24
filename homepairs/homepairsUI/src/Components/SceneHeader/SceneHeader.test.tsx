/* eslint-disable react/jsx-props-no-spreading */

import * as React from 'react';
import { View, Button, ScrollView} from 'react-native';
import {fireEvent, render} from 'react-native-testing-library';
import { NavigationStackProp } from 'react-navigation-stack';
import { Provider } from 'react-redux';
import { MainAppStackType } from 'homepairs-types';
import { ThinButton } from 'homepairs-elements';
import { 
    propertyManagerMock1 as store,
    navigationStackSpyFunction, 
    mockStackNavigation, 
    thinButtonFireEventTestId } from 'homepairs-test';
import SceneHeader, { SceneHeaderProps } from './SceneHeader';
import { SceneInjectedProps , withSceneHeader} from './WithSceneHeader';


const thinButtonTestId = thinButtonFireEventTestId.onPress;


describe("SceneHeader Test: This is not the HOC", () => {
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

const ONE ='1';
const TWO = '2';
function TestClass(props: SceneInjectedProps){
    const {onSetNavHeaderGoBackButton, onCloseNavHeaderMenu} = props;
    return<><Button testID={ONE} title="Prop1" onPress={() => onSetNavHeaderGoBackButton(true)}/>
    <Button testID={TWO} title="Prop2" onPress={() => onCloseNavHeaderMenu()}/></>;
}

describe('withSceneHeader Test', () => {
    const mockStore = {...store};
    const modalVisibilitySpy = jest.fn((isVisible?: boolean) => {});
    const navigationSpyFunction = navigationStackSpyFunction;
    const mockNavigation: NavigationStackProp = mockStackNavigation;
    const basePageParams: MainAppStackType = {
        title: 'Test',
        navigate: 'None',
        key: 'Test',
    };


    beforeEach(() =>{
        modalVisibilitySpy.mockClear();
        navigationSpyFunction.mockClear();
    });

    it.each([true, false])('TODO: Test withScrollView is set to false', (param) => {
        const testId = 'with-scene-header-container-view';
        const pageParams : MainAppStackType = basePageParams;
        const TestComponent = withSceneHeader(View, pageParams, param);
        const TestComponetWithStore = (
            <Provider store={mockStore}>
                <TestComponent navigation={mockNavigation} theme={null} screenProps={null}/>
            </Provider>);
        const rendered = render(TestComponetWithStore);
        const {getByTestId} = rendered;
        
        if(param){
            expect(getByTestId(testId).instance instanceof ScrollView).toBeTruthy();
        }else {
            expect(getByTestId(testId).instance instanceof View).toBeTruthy();
        }
    });

    it("Test when only the header is to be defined", () => {
        const pageParams : MainAppStackType = basePageParams;
        const TestComponent = withSceneHeader(View, pageParams);
        const TestComponetWithStore = (
            <Provider store={mockStore}>
                <TestComponent navigation={mockNavigation} theme={null} screenProps={null}/>
            </Provider>);
        const rendered = render(TestComponetWithStore);

        const {queryAllByType, queryByTestId} = rendered;

        const wrappedComponent = queryByTestId('with-scene-header-wrapped-component');
        const sceneHeaders = queryAllByType(SceneHeader);

        // Test to see if the component actually can render 
        expect(rendered).toBeDefined();

        // Check if only ONE SceneHeader has been rendered 
        expect(sceneHeaders).toBeDefined();
        expect(sceneHeaders).toHaveLength(1);

        // Check if the props have been injected into the wrapped component and that the 
        // wrapped component is an instance of the first parameter passed 
        expect(wrappedComponent.props.onSetNavHeaderGoBackButton).toBeDefined();
        expect(wrappedComponent.props.onCloseNavHeaderMenu).toBeDefined();
        expect(wrappedComponent.instance).toBeInstanceOf(View);
    });

    describe("When button is rendered", () => {
        const buttonDefinedParams: MainAppStackType = {
            ...basePageParams,
            button: 'Test',
        };

        describe ('Button is configured for revealing Modal', () => {
            const onNavButtonClickMock = jest.fn();
            const buttonModalDefinedParams: MainAppStackType = {
                ...buttonDefinedParams,
                onNavButtonClick: onNavButtonClickMock,
            };

            it('Param does not assign value to doesButtonUseNavigate', () => {
                const TestComponent = withSceneHeader(View, buttonModalDefinedParams);
                const TestComponetWithStore = (
                    <Provider store={mockStore}>
                        <TestComponent navigation={mockNavigation} 
                        theme={null} 
                        screenProps={null} />
                    </Provider>);
                const rendered = render(TestComponetWithStore);
                const {queryAllByType, getByTestId} = rendered;

                const clickable = getByTestId(thinButtonTestId);
                const sceneHeaders = queryAllByType(SceneHeader);
                const thinButtons = queryAllByType(ThinButton);
                    
                // Check if only ONE SceneHeader has been rendered 
                expect(sceneHeaders).toBeDefined();
                expect(sceneHeaders).toHaveLength(1);

                // Check if only ONE ThinButton has been rendered for this specific case
                expect(thinButtons).toBeDefined();
                expect(thinButtons).toHaveLength(1);
        
                // Check to see if the button clicked performs the correct action 
                fireEvent.press(clickable);
                expect(navigationSpyFunction).toHaveBeenCalledTimes(0);
                expect(onNavButtonClickMock).toHaveBeenCalledTimes(1);
                
            });

            it('Param does assign false to doesButtonUseNavigate', () => {
                const buttonUseNavigationFalseParams: MainAppStackType = {
                    ...buttonModalDefinedParams,
                    doesButtonUseNavigate: false,
                };
                const TestComponent = withSceneHeader(View, buttonUseNavigationFalseParams);
                const TestComponetWithStore = (
                    <Provider store={mockStore}>
                        <TestComponent navigation={mockNavigation} 
                        theme={null} 
                        screenProps={null} />
                    </Provider>);

                const rendered = render(TestComponetWithStore);
                const {queryAllByType, getByTestId} = rendered;

                const clickable = getByTestId(thinButtonTestId);
                const sceneHeaders = queryAllByType(SceneHeader);
                const thinButtons = queryAllByType(ThinButton);
                    
                // Check if only ONE SceneHeader has been rendered 
                expect(sceneHeaders).toBeDefined();
                expect(sceneHeaders).toHaveLength(1);

                // Check if only ONE ThinButton has been rendered for this specific case
                expect(thinButtons).toBeDefined();
                expect(thinButtons).toHaveLength(1);
        
                // Check to see if the button clicked performs the correct action 
                fireEvent.press(clickable);
                expect(navigationSpyFunction).toHaveBeenCalledTimes(0);
                expect(onNavButtonClickMock).toHaveBeenCalledTimes(2);
            });
        });

        it('Button is configured for navigation', () => {
            const buttonUseNavigationTrueParams: MainAppStackType = {
                ...buttonDefinedParams,
                doesButtonUseNavigate: true,
                onNavButtonClick: navigationStackSpyFunction,
            };

            const TestComponent = withSceneHeader(View, buttonUseNavigationTrueParams);
            const TestComponetWithStore = (
                <Provider store={mockStore}>
                    <TestComponent navigation={mockNavigation} 
                    theme={null} 
                    screenProps={null} />
                </Provider>);

            const rendered = render(TestComponetWithStore);
            const {queryAllByType, getByTestId} = rendered;

            const clickable = getByTestId(thinButtonTestId);
            const sceneHeaders = queryAllByType(SceneHeader);
            const thinButtons = queryAllByType(ThinButton);
                    
            // Check if only ONE SceneHeader has been rendered 
            expect(sceneHeaders).toBeDefined();
            expect(sceneHeaders).toHaveLength(1);

            // Check if only ONE ThinButton has been rendered for this specific case
            expect(thinButtons).toBeDefined();
            expect(thinButtons).toHaveLength(1);
        
            // Check to see if the button clicked performs the correct action 
            fireEvent.press(clickable);
            expect(modalVisibilitySpy).toHaveBeenCalledTimes(0);
            expect(navigationSpyFunction).toHaveBeenCalledTimes(1);
        }); 
    });

    // Final test to see if the component actually updates the store. We really care more about it communicating properly and 
    // not if the store itself updates. That is already tested in another file.
    it('Test to see if dispatch props invoke as intended', () => {
        const pageParams : MainAppStackType = basePageParams;
        const TestComponent = withSceneHeader(TestClass, pageParams);
        const TestComponetWithStore = (
            <Provider store={mockStore}>
                <TestComponent navigation={mockNavigation} theme={null} screenProps={null}/>
            </Provider>);
        const rendered = render(TestComponetWithStore);
        const {queryAllByType, getByTestId} = rendered;
        const sceneHeaders = queryAllByType(SceneHeader);

        const expectedResults = [
            { type: 'HEADER/SHOW_GOBACK_BUTTON', showBackButton: true },
            { type: 'HEADER/TOGGLE_MENU', showMenu: false },
            { type: 'HEADER/TOGGLE_MENU', showMenu: false },
        ];

        // Check if only ONE SceneHeader has been rendered 
        expect(sceneHeaders).toBeDefined();
        expect(sceneHeaders).toHaveLength(1);

        // Check if the props have been injected into the wrapped component and that the 
        // wrapped component is an instance of the first parameter passed 
        const clickable1 = getByTestId(ONE);
        const clickable2 = getByTestId(TWO);

        fireEvent.press(clickable1);
        fireEvent.press(clickable2);
        
        const dispatchedActions = mockStore.getActions();
        expect(dispatchedActions).toHaveLength(3);
        
        expect(dispatchedActions[0]).toStrictEqual(expectedResults[0]);
        expect(dispatchedActions[1]).toStrictEqual(expectedResults[1]);
        expect(dispatchedActions[2]).toStrictEqual(expectedResults[2]);

    });
});