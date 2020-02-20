import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { FontTheme, ColorTheme } from 'homepairs-base-styles';
import { MainAppStackType } from 'homepairs-types';
import HomePairColors from 'homepairs-colors';
import MainAppStack from '../../../../Routes/RouteConstants';
import { DarkModeInjectedProps } from '../../WithDarkMode/WithDarkMode';


export type HomePairsMenuProps = DarkModeInjectedProps & {
    selectedPage: MainAppStackType;
    parentCallBack?: (arg0?: any) => any;
    isDropDown?: boolean;
    showMenu?: boolean;
    toggleMenu?: (arg0?: any) => any;
};

type Props = NavigationInjectedProps & HomePairsMenuProps;

const setColorScheme = (
    colorScheme: ColorTheme,
    baseStyles: any,
    isDropDown: boolean,
) => {
    const newStyle = StyleSheet.create({
        container: {
            ...baseStyles.container,
            backgroundColor: colorScheme.secondary,
        },
        containerDropDown: {
            ...baseStyles.containerDropDown,
            backgroundColor: colorScheme.secondary,
        },
        menuText: {
            ...baseStyles.menuText,
            color: colorScheme.tertiary,
            paddingLeft: isDropDown ? 33 : 15,
        },
        menuSelectedText: {
            ...baseStyles.menuSelectedText,
            color: colorScheme.lightGray,
            paddingLeft: isDropDown ? 33 : 15,
        },
    });
    return newStyle;
};

let styles = null;
/**
 * Native Applications can read from the StyleSheet directly. However, react-native-web is unable to do this
 * so we will simply pass in a dictionary to stylize our color scheme.
 */
const baseStyles = {
    container: {
        flexDirection: 'row',
        width: '100%',
        maxHeight: 150,
        minWidth: 500,
    },
    containerDropDown: {
        flexDirection: 'column',
        width: '100%',
        minWidth: 500,
    },
    menuText: {
        fontFamily: FontTheme.primary,
        paddingVertical: 15,
        maxHeight: 50,
        fontSize: 16,
    },
    menuSelectedText: {
        fontFamily: FontTheme.primary,
        paddingVertical: 15,
        maxHeight: 50,
        fontSize: 16,
    },
};


class HomePairsMenu extends React.Component<Props> {
    pages: any[];

    colorScheme: any;

    constructor(props: Readonly<Props>) {
        super(props);

        this.navigatePages = this.navigatePages.bind(this);
        this.setSelected = this.setSelected.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.buttonFormat = this.buttonFormat.bind(this);
        this.displayCorrectMenu = this.displayCorrectMenu.bind(this);

        this.colorScheme =
            props.primaryColorTheme == null
                ? HomePairColors.LightModeColors
                : props.primaryColorTheme;
        styles = setColorScheme(this.colorScheme, baseStyles, props.isDropDown);
    }

    
    setSelected(value: MainAppStackType) {
        const {parentCallBack} = this.props;
        let page = value;
        if (value.key === MainAppStack[MainAppStack.length - 1].key)
            page = value;
        parentCallBack(page);
    }

    navigatePages(value: MainAppStackType) {
            const {navigation} = this.props;

            // Check to see if logout had been clicked. If so, set the selected value 
            // to the Properties
            if(value.key === MainAppStack[MainAppStack.length-1].key){
                this.setSelected(MainAppStack[0]);
            }else{
                this.setSelected(value);
            }
            this.closeMenu();
            navigation.navigate(value.navigate);
    }

    closeMenu() {
        const {toggleMenu} = this.props;
        toggleMenu();
    }

    displayCorrectMenu(currentPage: MainAppStackType) {
        const {isDropDown, showMenu} = this.props;
        if (isDropDown) {
            if (!showMenu) {
                return <></>;
            }
        }
        return this.buttonFormat(currentPage);
    }

    /** This function renders all the selections of a button in the format the we want.
     * Notice the use of the maps function. This function requires that we iterate through a list
     * of objects with a specific key. Each key must be unique in the array/list. */

    buttonFormat(currentPage: MainAppStackType) {
        return MainAppStack.map((page, i) => {
            return (
                <View 
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                    style={{ marginHorizontal: 3, justifyContent: 'center' }}
                >
                    <TouchableOpacity onPress={() => this.navigatePages(page)}>
                        <Text
                            style={
                                page === currentPage
                                    ? styles.menuSelectedText
                                    : styles.menuText
                            }
                        >
                            {page.title}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        });
    }

    render() {
        const {isDropDown, selectedPage} = this.props;
        styles = setColorScheme(
            this.colorScheme,
            baseStyles,
            isDropDown,
        );

        return (
            <View
                style={
                    !isDropDown
                        ? styles.container
                        : styles.containerDropDown
                }
            >
                {this.displayCorrectMenu(selectedPage)}
            </View>
        );
    }
}
export default withNavigation(HomePairsMenu);