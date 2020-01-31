import {
    View,
    StyleSheet,
    StatusBar,
    Platform,
    TouchableOpacity,
    Text,
} from 'react-native';
import React from 'react';
import { SafeAreaView, StackActions } from 'react-navigation';
import * as BaseStyles from 'homepairs-base-styles';
import {
    HomePairsHeaderTemplate,
    HomePairsHeaderProps,
} from './HomePairsHeaderTemplate';
import { HomePairsHeaderTitle } from './HomePairsHeaderTitle/HomePairsHeaderTitle';
import HomePairsMenu from './HomePairsHeaderMenu/HomePairsHeaderMenu';

const popAction = StackActions.pop({
    n: 1,
});
const backSymbol = '<';

function setColorTheme(colorScheme?: BaseStyles.ColorTheme) {
    const colors =
        colorScheme == null ? BaseStyles.LightColorTheme : colorScheme;
    return StyleSheet.create({
        container: {
            shadowOpacity: 0.1,
            shadowRadius: 1,
            shadowOffset: { width: 0, height: 2 },
            elevation: 1,
            marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
            backgroundColor: colors.secondary,
            shadowColor: colors.shadow,
            minHeight: 50,
        },
        homePairsTitle: {
            fontFamily: BaseStyles.FontTheme.primary,
            fontSize: BaseStyles.FontTheme.title,
            color: colorScheme.primary,
            flex: 1,
        },
        goBackSymbol: {
            fontFamily: BaseStyles.FontTheme.primary,
            fontSize: BaseStyles.FontTheme.lg,
            color: colorScheme.primary,
            flex: 1,
        },
        goBackButton: {
            backgroundColor: colorScheme.secondary,
            padding: BaseStyles.MarginPadding.mediumConst,
            paddingTop: 20,
            alignItems: 'center',
            position: 'absolute',
            zIndex: 1,
        },
    });
}

let styles = null;

class HomePairsHeaderBase extends HomePairsHeaderTemplate {
    colorScheme: BaseStyles.ColorTheme;

    constructor(props: Readonly<HomePairsHeaderProps>) {
        super(props);
        this.colorScheme =
            props.primaryColorTheme == null
                ? BaseStyles.LightColorTheme
                : props.primaryColorTheme;
        styles = setColorTheme(this.colorScheme);
        this.goBack = this.goBack.bind(this);
    }

    renderHeaderTitle() {
        const { header, primaryColorTheme } = this.props;
        return (
            <HomePairsHeaderTitle
                showGoBackButton={header.showBackButton}
                toggleMenuCallBack={this.toggleMenu}
                isDropDown={header.isDropDown}
                primaryColorTheme={primaryColorTheme}
            />
        );
    }

    renderMenu() {
        const { header, primaryColorTheme } = this.props;
        return (
            <HomePairsMenu
                selectedPage={header.currentPage}
                parentCallBack={this.changePage}
                parentCloseMenu={this.toggleMenu}
                isDropDown={header.isDropDown}
                showMenu={header.showMenu}
                primaryColorTheme={primaryColorTheme}
            />
        );
    }

    showBackButton() {
        return this.props.header.showBackButton ? (
            <TouchableOpacity onPress={this.goBack} style={styles.goBackButton}>
                <Text style={styles.goBackSymbol}>{backSymbol}</Text>
            </TouchableOpacity>
        ) : (
            <></>
        );
    }

    /**
     * This function navigates to the previous screen and then hides the goBack button
     * if the screen is the first in the navigation stack.
     * */
    goBack() {
        this.props.navigation.dispatch(popAction);
        if (this.props.navigation.isFirstRouteInParent()) {
            this.props.onShowGoBackbutton(false);
        }
        this.props.onToggleMenu(false);
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View
                    style={
                        this.props.header.isDropDown
                            ? { flexDirection: 'column' }
                            : { flexDirection: 'row' }
                    }
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            backgroundColor: this.colorScheme.secondary,

                        }}
                    >
                        {this.showBackButton()}
                        <View
                            style={{marginLeft: BaseStyles.MarginPadding.largeConst, flex: 1}
                        }

                        >
                            {this.renderHeaderTitle()}
                        </View>
                    </View>
                    {this.renderMenu()}
                </View>
            </SafeAreaView>
        );
    }
}
export default HomePairsHeaderBase;
