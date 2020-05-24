/* eslint-disable react/static-property-placement */
import { View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import { MainAppStackType, AccountTypes } from 'homepairs-types';
import * as BaseStyles from 'homepairs-base-styles';
import { 
    NavigationRouteHandler, 
    MainAppStack as MainAppStackManager, 
    MainAppStackTenant,
    ChooseMainPage, 
} from 'homepairs-routes';
import setStyles from './styles';

export type HomePairsMenuProps = {

    /**
     * Used to indicate an instance of this component during testing
     */
    testID?: string;

    /**
     * Navigator passed from the parent that will be used to navigate between
     * the various stacks and screens of the application.
     */
    navigation: NavigationRouteHandler;

    /**
     * Value of the page that is currently navigated to and whose text is 
     * slightly
     */
    selectedPage: MainAppStackType;

    /**
     * Function intended invoke actions after navigation has occurred. 
     */
    parentCallBack?: (arg0?: any) => any;

    /**
     * Indicates to component if the drop down menu should be rendered or if a 
     * nav bar should be rendered
     */
    isDropDown?: boolean;

    /**
     * If the component is a dropdown menu, this indicates if the drop down contents 
     * should be revealed or not.
     */
    showMenu?: boolean;

    /**
     * 
     */
    setAuthenticatedState?: (auth: boolean) => any;

    /**
     * Callback function intended to change the state of the menu from hiding or showing
     * the dropdown menu. 
     */
    toggleMenu?: (arg0?: any) => any;

    /**
     * Identifier that allows the header to navigate and render properly based on account status
     */
    accountType: AccountTypes
};

type Props = HomePairsMenuProps;

let styles = null;

/**
 * ---------------------------------------------------
 * HomePairs Header Menu 
 * ---------------------------------------------------
 * A child component for the HomePairs header that will contain the navigation
 * fields for the header. This component has the ability to navigate between 
 * the different stacks. It also is capable of rendering as a dropdown or a 
 * navigation bar based on a passed property of the state of the parent. 
 * @param {HomePairsMenuProps} props 
 */
export default class HomePairsMenu extends React.Component<Props> {
    pages: any[];

    colorScheme: any;

    MainAppStack: MainAppStackType[];

    static defaultProps = {
        testID: 'homepairs-header-menu',
        parentCallBack: (page?: any) => {return page;},
        isDropDown: false,
        showMenu: false,
        toggleMenu: (toggle?: boolean) => {return toggle;},
        setAuthenticatedState: (auth: boolean) => {return auth;},
    };

    constructor(props: Readonly<Props>) {
        super(props);

        this.navigatePages = this.navigatePages.bind(this);
        this.setSelected = this.setSelected.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.buttonFormat = this.buttonFormat.bind(this);
        this.displayCorrectMenu = this.displayCorrectMenu.bind(this);

        this.MainAppStack = props.accountType === AccountTypes.PropertyManager ? MainAppStackManager : MainAppStackTenant;
        this.colorScheme = BaseStyles.LightColorTheme;
        styles = setStyles(props.isDropDown);
    }

    /**
     * After a user has clicked on a menu item, the item's information will invoke the 
     * parent's callback function
     * @param {MainAppStackType} value 
     */
    setSelected(value: MainAppStackType) {
        const {parentCallBack} = this.props;
        const [first] = this.MainAppStack; 
        let page = value;
        if (value.title === this.MainAppStack[this.MainAppStack.length - 1].title)
            page = first;
        parentCallBack(page);
    }

    /**
     * After a menu item has been clicked, the header is notified of change to be 
     * rerendered. Then the user is navigated to the selcted page.
     * @param {MainAppStackType} value 
     */
    navigatePages(value: MainAppStackType) {
        const {navigation, setAuthenticatedState, accountType} = this.props;
        // Check to see if logout had been clicked. If so, set the selected value 
        // to the Properties
        this.setSelected(value);
        this.closeMenu();
        if(value.title === 'Log Out'){
            setAuthenticatedState(false);
        }

        if(value.title === 'Properties'){
            ChooseMainPage(accountType, navigation);
        }else{
            navigation.navigate(value.navigate);
        }
    }

    closeMenu() {
        const {toggleMenu} = this.props;
        toggleMenu();
    }

    /**
     * Renders the menu based on if the isDropDown value. On true, it renders
     * a dropDown menu which can render the menu's contents based on the showMenu
     * value. Otherwise, nothing is rendered and the menu is rendered with 
     * the homepairs title. 
     * @param {MainAppStackType} currentPage 
     */
    displayCorrectMenu(currentPage: MainAppStackType) {
        const {isDropDown, showMenu} = this.props;
        if (isDropDown) {
            if (!showMenu) {
                return <></>;
            }
        }
        return this.buttonFormat(currentPage);
    }


     /**
      * This function renders all the selections of a button in the format the we want.
      * Notice the use of the maps function. This function requires that we iterate through a list
      * of objects with a specific key. Each key must be unique in the array/list.
      * @param {MainAppStackType} currentPage 
      */
    buttonFormat(currentPage: MainAppStackType) {
        return this.MainAppStack.map((page, i) => {
            return (
                <View 
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                    style={styles.selectable}>
                    <TouchableOpacity 
                        testID='homepairs-header-menu-buttons' 
                        onPress={() => this.navigatePages(page)}>
                        <Text 
                            style={ page.title === currentPage.title ? styles.menuSelectedText : styles.menuText}>
                            {page.title}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        });
    }

    render() {
        const {isDropDown, selectedPage} = this.props;
        styles = setStyles(isDropDown);

        return (
            <View
                style={!isDropDown ? styles.container : styles.containerDropDown}>
                {this.displayCorrectMenu(selectedPage)}
            </View>
        );
    }
}