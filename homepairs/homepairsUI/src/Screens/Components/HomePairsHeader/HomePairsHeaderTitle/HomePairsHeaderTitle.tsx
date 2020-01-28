import {
    View,
    Text,
    StyleSheet,
    Platform,
} from 'react-native';
import React from 'react';
import HomePairColors from 'homepairs-colors';
import { HomePairFonts } from 'homepairs-fonts';
import {HamburgerButton} from 'homepairs-elements';
import { DarkModeInjectedProps } from '../../WithDarkMode/WithDarkMode';

export type HomePairsHeaderTitleProps = DarkModeInjectedProps & {
    /**
     * This callBack function is intended to notify the parent header of when the
     * hamburger icon has been clicked. The parameter intended to be passed should
     * be this components showMenu property.
     */
    toggleMenuCallBack?: (arg0?: any) => any;
    showGoBackButton: boolean;
    isDropDown: boolean;
};

let styles = null;
const baseStyles = {
    homePairsTitleContainer: {
        flexDirection: 'row',
        padding: 15,
        paddingRight: 0,
        height: 80,
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        flex: 1,
    },
    homePairsTitleContainerNavSet: {
        flexDirection: 'row',
        padding: 15,
        paddingRight: 0,
        height: 80,
        minWidth: 175,
        maxWidth: 185,
        justifyContent: 'center',
        alignContent: 'center',
        flex: 5,
    },
    homePairsTitle: {
        fontFamily: HomePairFonts.nunito_regular,
        fontSize: 32,
        flex: 6,
    },
    homePairsHamburgerImage: {
        alignSelf: 'center',
        width: 45,
        height: 45,
    },
    hamburgerStyle: {
        flex: 2,
        marginRight: '3%',
        height: null,
        width: null,
        resizeMode: 'contain',
        maxWidth: 50,
    },
    homePairsHamburgerImageWeb: {
        width: 45,
        height: 45,
    },
    hamburgerStyleWeb: {
        flex: 1,
        marginRight: '3%',
        width: null,
        height: null,
    },
    buttonContainer: {
        //alignSelf: 'center',
        //justifyContent: 'center',
        //alignItems: 'center',
        paddingHorizontal: 10,
        minHeight: 40,
    },
    button: {
        //flex:1,
        //alignItems: 'center',
        //justifyContent: 'center',
        //alignSelf: 'center',
        backgroundColor: 'transparent',
        width: 50, 
        height: 40,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#B3C0C2',
    },
    buttonText: {
        //flex:1,
        color: '#B3C0C2',
        fontSize: 80,
    },
};

const setColorScheme = (colorScheme: any, base: any) => {
    const newStyle = StyleSheet.create({
        homePairsTitleContainer: {
            ...base.homePairsTitleContainer,
            backgroundColor: colorScheme.secondary,
        },
        homePairsTitleContainerNavSet: {
            ...base.homePairsTitleContainerNavSet,
            backgroundColor: colorScheme.secondary,
        },
        homePairsTitle: {
            ...base.homePairsTitle,
            color: colorScheme.primary,
        },
        homePairsHamburgerImage: { ...base.homePairsHamburgerImage },

        hamburgerStyle: { ...base.hamburgerStyle },
        homePairsHamburgerImageWeb: {
            ...base.homePairsHamburgerImageWeb,
        },
        hamburgerStyleWeb: { ...base.hamburgerStyleWeb },
        buttonContainer: {...base.buttonContainer},
        button: {...base.button},
        buttonText: {...base.buttonText},
    });
    return newStyle;
};

/**
 * This class is intended to hold all information for the first component of the header. There are a few
 * conditions. This page is essentially the same if running as a native app or if the web page window has
 * a resolution of less than 600px.
 *
 * This page has an optional props to send information back to the parent. This is function is intended to
 * help toggle the drop down menu of the header when the hamburger menu is present.
 */
export class HomePairsHeaderTitle extends React.Component<
    HomePairsHeaderTitleProps
> {
    hamburgerStyle: any;

    hamburgerImageStyle: any;

    colorScheme: any;

    constructor(props: Readonly<HomePairsHeaderTitleProps>) {
        super(props);
        this.colorScheme =
            props.primaryColorTheme == null
                ? HomePairColors.LightModeColors
                : props.primaryColorTheme;
        styles = setColorScheme(this.colorScheme, baseStyles);
        this.getProperTitleStyle = this.getProperTitleStyle.bind(this);

        this.hamburgerStyle =
            Platform.OS === 'web'
                ? styles.hamburgerStyleWeb
                : styles.hamburgerStyle;
        this.hamburgerImageStyle =
            Platform.OS === 'web'
                ? styles.homePairsHamburgerImageWeb
                : styles.homePairsHamburgerImage;
    }

    getProperTitleStyle() {
        const {isDropDown} = this.props;
        return isDropDown
            ? styles.homePairsTitleContainer
            : styles.homePairsTitleContainerNavSet;
    }

    dropDownRender() {
        const {toggleMenuCallBack} = this.props;
        
        
        /*return (
            <TouchableOpacity
                onPress={() => toggleMenuCallBack()}
                style={this.hamburgerStyle}
            >
                <Image style={this.hamburgerImageStyle} source={hamburger} />
            </TouchableOpacity>
        );*/
        
        
       return (<HamburgerButton onClick={toggleMenuCallBack} />);

    }

    chooseWideRender() {
        const {isDropDown} = this.props;
        /**
         * Case 1: If window is large, show all navigation options next to title
         * Else:: If window is tiny, show hamburger menu for dropdown navigation
         */
        return isDropDown ?
            this.dropDownRender()
        :
        <View style={{ height: '0%', width: '0%' }} />;
    }

    render() {
        return (
            <View style={this.getProperTitleStyle()}>
                <Text style={styles.homePairsTitle}>HomePairs</Text>
                {this.chooseWideRender()}
            </View>
        );
    }
}