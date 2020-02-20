import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import React from 'react';
import HomePairColors from 'homepairs-colors';
import { HomePairFonts } from 'homepairs-fonts';
import { DarkModeInjectedProps } from '../WithDarkMode/WithDarkMode';
import * as BaseStyles from 'homepairs-base-styles';

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
        padding: 15,
        paddingRight: 0,
        height: 80,
        width: '100%',
    },
    homePairsTitleContainerNavSet: {
        flexDirection: 'row',
        padding: 15,
        paddingRight: 0,
        height: 80,
        minWidth: 175,
        maxWidth: 185,

    },
    homePairsTitle: {
        fontFamily: HomePairFonts.nunito_regular,
        fontSize: 32,
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
    colorScheme: any;

    constructor(props: Readonly<HomePairsHeaderTitleProps>) {
        super(props);
        this.colorScheme = BaseStyles.LightColorTheme;
        styles = setColorScheme(this.colorScheme, baseStyles);
        this.getProperTitleStyle = this.getProperTitleStyle.bind(this);
    }

    getProperTitleStyle() {
        const {isDropDown} = this.props;
        return isDropDown
            ? styles.homePairsTitleContainer
            : styles.homePairsTitleContainerNavSet;
    }

    render() {
        return (
            <>
            <View style={this.getProperTitleStyle()}>
                <Text style={styles.homePairsTitle}>HomePairs</Text>
            </View>
            </>
        );
    }
}