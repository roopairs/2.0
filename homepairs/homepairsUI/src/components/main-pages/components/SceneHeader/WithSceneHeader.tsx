import React from 'react';
import { MainAppStackType, HomePairsDimensions, AppState } from 'homepairs-types';
import {
    Platform,
    View,
    ScrollView,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import { HeaderActions } from 'homepairs-redux-actions';
import { connect } from 'react-redux';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import * as BaseStyles from 'homepairs-base-styles';
import {NavigationRouteHandler} from 'src/routes';
import { PreferredProviderFlatList } from './PreferredProviderFlatList';
import SceneHeader from './SceneHeader';

type SceneDispatchProps = {
    onSetNavHeaderGoBackButton?: (isSet: boolean) => any;
    onCloseNavHeaderMenu?: () => any;
};

export type SceneInjectedProps = SceneDispatchProps & {
    navigation?: NavigationRouteHandler
}

type Props = NavigationStackScreenProps<any, any> &
SceneDispatchProps;

type State = {
    showModal: boolean;
};

const colorTheme = BaseStyles.LightColorTheme;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignSelf: 'center',
        width: '100%',
        backgroundColor: colorTheme.secondary,
        flexGrow: 1,
    },
    pallet: {
        backgroundColor: colorTheme.secondary,
        width: '100%',
        maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
        minWidth: HomePairsDimensions.MIN_PALLET,
        alignSelf: 'center',
        flex: 1,
    },
    viewStyle: {
        maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
        backgroundColor: colorTheme.secondary,
        alignSelf: 'center',
        width: BaseStyles.ContentWidth.max,
        flex: 1,
    },
    scrollViewContentContainer: {
        maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
        backgroundColor: colorTheme.secondary,
        alignSelf: 'center',
        width: BaseStyles.ContentWidth.max,
        flexGrow: 1,
    },
});



/**
 * ---------------------------------------------------
 * withSceneHeader
 * ---------------------------------------------------
 * A HOC that renders content based off of the Page parameter into a  
 * component. It will provide the component with a title, potentially a button,
 * a background, and a maximum width. Please refer to MainAppStackType for information
 * regarding configuring the button.  
 * 
 * @param {any} WrappedComponent -Base component that will be contained 
 * @param {MainAppStackType} Page -Parameters that determine title, button, and button behavior 
 * @param {boolean} withScrollView -Determines if the scene header requires a scrollview, by default it is true 
 */
export function withSceneHeader(WrappedComponent: any, Page: MainAppStackType, withScrollView: boolean = false) {

    const ReduxComponent = class ReduxComponentBase extends React.Component<Props,State> {

        constructor(props: Readonly<Props>) {
            super(props);
            this.onPressButton = this.onPressButton.bind(this);
        }

        // Based on the passed input, this invokes the change modal visibility for this 
        // HOC or it passes in the neccessary props of this component to allow for 
        // navigation. NOTE: REMEMBER TO CALL withNavigation if a navigator is to be used. 
        onPressButton() {
            return Page.onNavButtonClick(this.props);
        }

        renderChosenView() {
            const {onSetNavHeaderGoBackButton,onCloseNavHeaderMenu,navigation} = this.props;
            const directionalLockEnabled = true;
            const automaticallyAdjustContentInsets = false;
            return withScrollView || Platform.OS !== 'web' ? (
                <ScrollView
                        style={{flex: 1}}
                        testID='with-scene-header-container-view'
                        contentContainerStyle={styles.scrollViewContentContainer}
                        directionalLockEnabled={directionalLockEnabled}
                        automaticallyAdjustContentInsets={automaticallyAdjustContentInsets}>
                        <WrappedComponent
                            testID='with-scene-header-wrapped-component'
                            onSetNavHeaderGoBackButton={onSetNavHeaderGoBackButton}
                            onCloseNavHeaderMenu={onCloseNavHeaderMenu}
                            navigation={navigation}/>
                    </ScrollView>
            ) : (
                <View style={{flex: 1}}>
                <View
                    testID='with-scene-header-container-view'
                    style={styles.viewStyle}>
                        <WrappedComponent
                            testID='with-scene-header-wrapped-component'
                            onSetNavHeaderGoBackButton={onSetNavHeaderGoBackButton}
                            onCloseNavHeaderMenu={onCloseNavHeaderMenu}
                            navigation={navigation}/>
                    </View>
                </View>
            );
        }

        renderContents() {
            return (
                <View style={{flex:1}}>
                    <SceneHeader
                        title={Page.title}
                        buttonTitle={Page.button}
                        onButtonPress={this.onPressButton}/>
                    {this.renderChosenView()}
                </View>
            );
        }

        render() {
            return !(Platform.OS === 'ios') ? (
                <View style={styles.container}>
                    <PreferredProviderFlatList />
                    <View style={styles.pallet}>
                        {this.renderContents()}
                    </View>
                </View>
            ) : (
                <View style={styles.container}>
                    <PreferredProviderFlatList />
                    <SafeAreaView style={styles.pallet}>
                        {this.renderContents()}
                    </SafeAreaView>
                </View>
            );
        }
    };
    
    // Connects dispatch props to this component since all these pages will have the 
    // capability of navigating to a different page. 
    function mapDispatchToProps(dispatch: any): SceneDispatchProps {
        return {
            onSetNavHeaderGoBackButton: (isSet: boolean) => {
                dispatch(HeaderActions.showGoBackButton(isSet));
                dispatch(HeaderActions.toggleMenu(false));
            },
            onCloseNavHeaderMenu: () => {
                dispatch(HeaderActions.toggleMenu(false));
            },
        };
    }

    const WithSceneHeaderComponent = connect(null, mapDispatchToProps)(ReduxComponent);
    return WithSceneHeaderComponent;
}
