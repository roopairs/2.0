import React from 'react';
import { MainAppStackTest, mockStackNavigation, navigationStackSpyFunction } from 'tests/fixtures/DummyComponents';
import { render, fireEvent } from 'react-native-testing-library';
import { TouchableOpacity, View} from 'react-native';
import HomePairsMenu from '../../../../src/Screens/Components/HomePairsHeader/HomePairsHeaderMenu';

const testAppStack = MainAppStackTest;

describe('HomePairsMenu Test', () => {
    it('Test Default Props', () => {
        const {parentCallBack, isDropDown, showMenu, toggleMenu} = HomePairsMenu.defaultProps;
        expect(parentCallBack).toBeDefined();
        expect(isDropDown).toBeFalsy();
        expect(showMenu).toBeFalsy();
        expect(toggleMenu).toBeDefined();

        expect(parentCallBack(testAppStack[0])).toBe(testAppStack[0]);
        expect(toggleMenu(testAppStack[0])).toBe(testAppStack[0]);
    });

    describe('Test Rendered Component', () => {
        const parentCallBackSpy = jest.fn((page?: any) => {return page;});
        const toggleMenuSpy = jest.fn((toggle?: boolean) => {return toggle;});

        beforeEach(() => {
            navigationStackSpyFunction.mockClear();
            parentCallBackSpy.mockClear();
            toggleMenuSpy.mockClear();
        });

        describe('When component is dropdown', () => {
            it('Show Menu is false', () => {
                const rendered = render(
                    <HomePairsMenu 
                        navigation={mockStackNavigation}
                        selectedPage={testAppStack[0]}
                        parentCallBack={parentCallBackSpy}
                        isDropDown={true}
                        showMenu={false}
                        toggleMenu={toggleMenuSpy}/>);
                const {queryAllByType} = rendered;

                expect(queryAllByType(TouchableOpacity)).toHaveLength(0);
                expect(queryAllByType(View)).toHaveLength(1);
            });
            it('Show Menu is true', () => {
                const rendered = render(
                    <HomePairsMenu 
                        navigation={mockStackNavigation}
                        selectedPage={testAppStack[0]}
                        parentCallBack={parentCallBackSpy}
                        isDropDown={true}
                        showMenu={true}
                        toggleMenu={toggleMenuSpy}/>);
                const {queryAllByType, getAllByType} = rendered;

                expect(queryAllByType(TouchableOpacity)).toHaveLength(4);

                const pressables = getAllByType(TouchableOpacity);

                fireEvent.press(pressables[2]);

                expect(navigationStackSpyFunction).toHaveBeenCalledWith(testAppStack[2].navigate);
                expect(parentCallBackSpy).toHaveBeenCalledWith(testAppStack[2]);
                expect(toggleMenuSpy).toHaveBeenCalled();
            });
        });

        describe('Component is not dropdown', () => {
            it('Show Menu is false and selected page is current', () => {
                const rendered = render(
                    <HomePairsMenu 
                        navigation={mockStackNavigation}
                        selectedPage={testAppStack[0]}
                        parentCallBack={parentCallBackSpy}
                        isDropDown={false}
                        showMenu={false}
                        toggleMenu={toggleMenuSpy}/>);
                const {queryAllByType, getAllByType} = rendered;

                expect(queryAllByType(TouchableOpacity)).toHaveLength(4);

                const pressables = getAllByType(TouchableOpacity);

                // Test Selected Page 
                fireEvent.press(pressables[0]);
                expect(navigationStackSpyFunction).toHaveBeenCalledWith(testAppStack[0].navigate);
                expect(parentCallBackSpy).toHaveBeenCalledWith(testAppStack[0]);

                // Test behavior of selecting a different page 
                fireEvent.press(pressables[2]);

                expect(navigationStackSpyFunction).toHaveBeenCalledWith(testAppStack[2].navigate);
                expect(parentCallBackSpy).toHaveBeenCalledWith(testAppStack[2]);
                expect(toggleMenuSpy).toHaveBeenCalled();


            });

            it('Show Menu is true and logout option is selected', () => {
                const rendered = render(
                    <HomePairsMenu 
                        navigation={mockStackNavigation}
                        selectedPage={testAppStack[0]}
                        parentCallBack={parentCallBackSpy}
                        isDropDown={false}
                        showMenu={true}
                        toggleMenu={toggleMenuSpy}/>);
                const {queryAllByType, getAllByType} = rendered;

                expect(queryAllByType(TouchableOpacity)).toHaveLength(4);

                const pressables = getAllByType(TouchableOpacity);

                fireEvent.press(pressables[3]);

                expect(navigationStackSpyFunction).toHaveBeenCalledWith(testAppStack[3].navigate);
                expect(parentCallBackSpy).toHaveBeenCalledWith(testAppStack[0]);
                expect(toggleMenuSpy).toHaveBeenCalled();
            });
        });
    });
});