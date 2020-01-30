import React from 'react';
import { MainAppStackType, HomePairsDimensions } from 'homepairs-types';
import {
    Platform,
    View,
    TouchableWithoutFeedback,
    ScrollView,
    ScrollViewProps,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import { HeaderActions } from 'homepairs-redux-actions';
import { connect } from 'react-redux';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import * as BaseStyles from 'homepairs-base-styles';
import {isNullOrUndefined} from 'homepairs-utilities';
import { DarkModeInjectedProps } from '../WithDarkMode/WithDarkMode';
import { SceneHeaderProps, renderSceneHeader } from './SceneHeader';
import { ModalInjectedProps } from '../Modals/WithModal/WithModal';

type SceneDispatchProps = {
    onSetHeaderGoBackButton?: (isSet: boolean) => any;
    onCloseHeaderMenu?: () => any;
};
export type SceneInjectedProps = NavigationStackScreenProps<any, any> &
    SceneDispatchProps &
    DarkModeInjectedProps &
    ModalInjectedProps;
type State = {
    showModal: boolean;
};

function setStyle(colorTheme: BaseStyles.ColorTheme) {
    return StyleSheet.create({
        container: {
            alignItems: 'center',
            alignSelf: 'center',
            width: '100%',
            backgroundColor: colorTheme.primary,
            flex: 1,
        },
        pallet: {
            backgroundColor: colorTheme.secondary,
            width: '100%',
            maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
            minWidth: HomePairsDimensions.MIN_PALLET,
            alignSelf: 'center',
            flex: 1,
        },
        scrollViewStyle: {},
        scrollViewContentContainer: {
            maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
            backgroundColor: colorTheme.secondary,
            alignSelf: 'center',
            width: BaseStyles.ContentWidth.max,
            flexGrow: 1,
        },
    });
}

export function withSceneHeader(WrappedComponent: any, Page: MainAppStackType) {
    let styles: any;

    function scrollViewProps(): ScrollViewProps {
        return {
            contentContainerStyle: styles.scrollViewContentContainer,
            directionalLockEnabled: true,
            automaticallyAdjustContentInsets: false,
        };
    }

    const ReduxComponent = class ReduxComponentBase extends React.Component<
        SceneInjectedProps,
        State
    > {
        colorScheme: any;

        constructor(props: Readonly<SceneInjectedProps>) {
            super(props);
            this.colorScheme =
                isNullOrUndefined(props.primaryColorTheme)
                    ? BaseStyles.LightColorTheme
                    : props.primaryColorTheme;
            styles = setStyle(this.colorScheme);
            this.renderContents = this.renderContents.bind(this);
            this.onPressButton = this.onPressButton.bind(this);
        }

        onPressButton() {
            const { onChangeModalVisibility } = this.props;
            return Page.doesButtonUseNavigate
                ? Page.onButtonClick(this.props)
                : onChangeModalVisibility(true);
        }

        sceneHeaderProps(): SceneHeaderProps & DarkModeInjectedProps {
            const { primaryColorTheme } = this.props;
            return {
                title: Page.title,
                buttonTitle: Page.button,
                onButtonPress: this.onPressButton,
                primaryColorTheme,
            };
        }

        renderTouchArea() {
            const { onCloseHeaderMenu } = this.props;
            return !(Platform.OS === 'web') ? (
                <TouchableWithoutFeedback
                    onPressIn={onCloseHeaderMenu}
                    style={{ flex: 1 }}
                >
                    {this.renderContents()}
                </TouchableWithoutFeedback>
            ) : (
                <View style={{ flex: 1 }}>{this.renderContents()}</View>
            );
        }

        renderContents() {
            const {
                contentContainerStyle,
                directionalLockEnabled,
                automaticallyAdjustContentInsets,
            } = scrollViewProps();
            const {
                navigation,
                onSetHeaderGoBackButton,
                onCloseHeaderMenu,
                onChangeModalVisibility,
                primaryColorTheme,
            } = this.props;
            return (
                <>
                    {renderSceneHeader(this.sceneHeaderProps())}
                    <ScrollView
                        contentContainerStyle={contentContainerStyle}
                        directionalLockEnabled={directionalLockEnabled}
                        automaticallyAdjustContentInsets={
                            automaticallyAdjustContentInsets
                        }
                    >
                        <WrappedComponent
                            onSetHeaderGoBackButton={onSetHeaderGoBackButton}
                            onCloseHeaderMenu={onCloseHeaderMenu}
                            navigation={navigation}
                            onChangeModalVisibility={onChangeModalVisibility}
                            primaryColorTheme={primaryColorTheme}
                        />
                    </ScrollView>
                </>
            );
        }

        render() {
            return Platform.OS === 'android' ? (
                <View style={styles.container}>
                    <View style={styles.pallet}>{this.renderTouchArea()}</View>
                </View>
            ) : (
                <View style={styles.container}>
                    <SafeAreaView style={styles.pallet}>
                        {this.renderTouchArea()}
                    </SafeAreaView>
                </View>
            );
        }
    };

    function mapDispatchToProps(dispatch: any): SceneDispatchProps {
        return {
            onSetHeaderGoBackButton: (isSet: boolean) => {
                dispatch(HeaderActions.showGoBackButton(isSet));
                dispatch(HeaderActions.toggleMenu(false));
            },
            onCloseHeaderMenu: () => {
                dispatch(HeaderActions.toggleMenu(false));
            },
        };
    }

    return connect(null, mapDispatchToProps)(ReduxComponent);
}
