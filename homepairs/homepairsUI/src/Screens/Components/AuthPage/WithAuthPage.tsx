import * as React from 'react';
import {
    Platform,
    View,
    Text,
    ScrollView,
    ScrollViewProps,
    SafeAreaView,
    StyleSheet,
    StatusBar,
    Dimensions,
} from 'react-native';
import {
    CardProps,
    InputFormProps,
    ThinButtonProps,
    renderCard,
    LoadingModal,
    renderThinButton,
} from 'homepairs-elements';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import strings from 'homepairs-strings';
import { HomePairFonts } from 'homepairs-fonts';
import { HomePairsDimensions } from 'homepairs-types';
import * as BaseStyles from 'homepairs-base-styles';
import { DarkModeInjectedProps } from '../WithDarkMode/WithDarkMode';

export type AuthPassProps = {
    button: String;
    buttonColor: string;
    subtitle: String | React.ReactElement;
    loadingModalText: String;
    underButtonText: String;
    highlightedText: String;
};

export type AuthPageInjectedProps = DarkModeInjectedProps &
    NavigationInjectedProps & {
        inputFormProps?: { [id: string]: InputFormProps };
        clickHighlightedText?: (arg?: any) => any;
        clickButton?: (arg: any) => any;
        setErrorState?: (arg1: boolean, arg2?: string) => any;
        showModal?: (arg1: boolean, arg2?: string) => any;
    };

type DefaultAuthPageState = {
    username: String;
    password: String;
    modalVisible: boolean;
    modalMessage: string;
    error: boolean;
    errorMessage: string;
    thinButtonStyle: ThinButtonProps;
    clickHighlightedText: () => void;
};

const initalState: DefaultAuthPageState = {
    username: '',
    password: '',
    error: false,
    errorMessage: '',
    modalVisible: false,
    modalMessage: strings.signInPage.modal,
    thinButtonStyle: {},
    clickHighlightedText: () => {},
};

function setStyles(buttonColor: string, colorTheme?: BaseStyles.ColorTheme) {
    const colors = colorTheme == null ? BaseStyles.LightColorTheme : colorTheme;
    return StyleSheet.create({
        container: {
            alignItems: 'center',
            alignSelf: 'center',
            width: BaseStyles.ContentWidth.max,
            flex: 1,
        },
        pallet: {
            backgroundColor: colors.space,
            width: BaseStyles.ContentWidth.max,
            alignSelf: 'center',
            alignContent: 'center',
            flex: 1,
            minWidth: HomePairsDimensions.MIN_CONTENT_SIZE,
        },
        scrollStyle: {
            marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        },
        scrollContentContainerStyle: {
            maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            width: BaseStyles.ContentWidth.max,
            paddingVertical: BaseStyles.MarginPadding.large,
            flexGrow: 1, // Needed to center the contents of the scroll container
        },
        cardContainerStyle: {
            width: BaseStyles.ContentWidth.reg,
            paddingBottom: BaseStyles.MarginPadding.mediumConst,
            backgroundColor: colors.secondary,
            marginHorizontal: BaseStyles.MarginPadding.large,
            borderRadius: BaseStyles.BorderRadius.large,
            shadowColor: colors.shadow,
            shadowRadius: 5,
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.25,
            elevation: 2,
        },
        cardTitleStyle: {
            color: colors.primary,
            fontFamily: HomePairFonts.nunito_semibold,
            fontSize: BaseStyles.FontTheme.title,
            alignSelf: 'center',
        },
        cardTitleContainerStyle: {
            width: BaseStyles.ContentWidth.max,
            borderBottomColor: colors.veryLightGray,
            paddingTop:
                (BaseStyles.MarginPadding.largeConst +
                    BaseStyles.MarginPadding.mediumConst) /
                2,
            paddingBottom: BaseStyles.MarginPadding.smallConst,
            borderBottomWidth: 1,
            alignSelf: 'center',
            justifyContent: 'center',
        },
        cardWrapperStyle: {
            paddingTop: BaseStyles.MarginPadding.medium,
            paddingHorizontal: BaseStyles.MarginPadding.large,
        },
        errorText: {
            fontSize: BaseStyles.FontTheme.small,
            color: colors.red,
        },
        modalText: {
            fontFamily: HomePairFonts.nunito_regular,
            fontSize: BaseStyles.FontTheme.reg,
        },
        thinButtonContainer: {
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
            minHeight: 50,
        },
        thinButton: {
            alignItems: 'center',
            backgroundColor: colorTheme.transparent,
            padding: BaseStyles.MarginPadding.mediumConst,
            maxWidth: HomePairsDimensions.MAX_BUTTON_WIDTH,
            minWidth: HomePairsDimensions.MIN_BUTTON_WIDTH,
            borderRadius: BaseStyles.BorderRadius.large,
            borderWidth: 1,
            borderColor: buttonColor,
        },
        thinButtonText: {
            color: buttonColor,
            fontSize: BaseStyles.FontTheme.lg,
            alignSelf: 'center',
        },
        subTitleText: {
            color: colors.tertiary,
            fontFamily: BaseStyles.FontTheme.primary,
            fontSize:
                Dimensions.get('window').width >
                HomePairsDimensions.DROP_MENU_WIDTH
                    ? BaseStyles.FontTheme.reg
                    : BaseStyles.FontTheme.small,
            marginVertical: BaseStyles.MarginPadding.medium,
        },
        submitSection: {
            flexDirection: 'column',
            padding: BaseStyles.MarginPadding.mediumConst,
            marginTop: BaseStyles.MarginPadding.largeConst,
            width: BaseStyles.ContentWidth.half,
            alignSelf: 'center',
            justifyContent: 'center',
        },
        signUpSection: {
            justifyContent: 'center',
            alignItems: 'center',
            width: '65%',
            minWidth: 250,
            marginBottom: BaseStyles.MarginPadding.xlargConst,
            alignSelf: 'center',
        },
        standardText: {
            fontFamily: BaseStyles.FontTheme.primary,
            fontSize:
                Dimensions.get('window').width >
                HomePairsDimensions.DROP_MENU_WIDTH
                    ? BaseStyles.FontTheme.reg
                    : BaseStyles.FontTheme.small,
            color: '#9BA0A2',
            marginTop: BaseStyles.MarginPadding.medium,
        },
    });
}

export function withAuthPage(
    WrappedComponent: any,
    defaultAuthPassProps: AuthPassProps,
) {
    let styles: any = null;

    function cardProps(style: {
        cardContainerStyle: any;
        cardTitleStyle: any;
        cardTitleContainerStyle: any;
        cardWrapperStyle: any;
    }): CardProps {
        return {
            containerStyle: style.cardContainerStyle,
            title: strings.title,
            titleStyle: style.cardTitleStyle,
            titleContainerStyle: style.cardTitleContainerStyle,
            wrapperStyle: style.cardWrapperStyle,
        };
    }

    function scrollViewProps(style: {
        scrollStyle: any;
        scrollContentContainerStyle: any;
    }): ScrollViewProps {
        return {
            style: style.scrollStyle,
            contentContainerStyle: style.scrollContentContainerStyle,
            directionalLockEnabled: true,
            automaticallyAdjustContentInsets: false,
        };
    }

    function renderSubtitle() {
        if (typeof defaultAuthPassProps.subtitle === 'string') {
            return (
                <Text style={styles.subTitleText}>Sign into your account</Text>
            );
        }
        if (React.isValidElement(defaultAuthPassProps.subtitle)) {
            return defaultAuthPassProps.subtitle;
        }
        return <></>;
    }

    class ComponentBase extends React.Component<
        AuthPageInjectedProps,
        DefaultAuthPageState
    > {
        constructor(props: Readonly<AuthPageInjectedProps>) {
            super(props);
            styles = setStyles(
                defaultAuthPassProps.buttonColor,
                props.primaryColorTheme,
            );
            this.presentLoading = this.presentLoading.bind(this);
            this.showError = this.showError.bind(this);
            this.setThinButtonClick = this.setThinButtonClick.bind(this);
            this.setHighlightedClick = this.setHighlightedClick.bind(this);
            this.setErrorFlag = this.setErrorFlag.bind(this);
            this.showModal = this.showModal.bind(this);
            this.renderSignInButton = this.renderSignInButton.bind(this);
            this.renderCardContents = this.renderCardContents.bind(this);
            this.state = initalState;
        }

        setHighlightedClick(arg: () => void): void {
            this.setState({
                clickHighlightedText: arg,
            });
        }

        setThinButtonClick(arg: () => void): void {
            this.setState({
                thinButtonStyle: {
                    name: defaultAuthPassProps.button,
                    onClick: arg,
                    buttonStyle: styles.thinButton,
                    buttonTextStyle: styles.thinButtonText,
                    containerStyle: styles.thinButtonContainer,
                },
            });
        }

        setErrorFlag(isShown: boolean, message?: string) {
            this.setState({
                error: isShown,
                errorMessage: message,
            });
        }

        showModal(
            isShown: boolean,
            message: string = strings.signInPage.modal,
        ) {
            this.setState({
                modalVisible: isShown,
                modalMessage: message,
            });
        }

        presentLoading() {
            const { modalVisible, modalMessage } = this.state;
            return (
                <LoadingModal visible={modalVisible}>
                    <Text style={styles.modalText}>{modalMessage}</Text>
                </LoadingModal>
            );
        }

        showError() {
            const { error, errorMessage } = this.state;
            if (!error) {
                return <></>;
            }
            return <Text style={styles.errorText}>{errorMessage}</Text>;
        }

        renderSignInButton() {
            const { thinButtonStyle } = this.state;
            return (
                <View style={styles.submitSection}>
                    {renderThinButton(thinButtonStyle)}
                </View>
            );
        }

        renderCardContents() {
            const { primaryColorTheme, navigation } = this.props;
            const { clickHighlightedText } = this.state;

            return (
                <View style={styles.container}>
                    {renderSubtitle()}
                    {this.showError()}
                    <WrappedComponent
                        navigation={navigation}
                        primaryColorTheme={primaryColorTheme}
                        clickButton={this.setThinButtonClick}
                        clickHighlightedText={this.setHighlightedClick}
                        setErrorState={this.setErrorFlag}
                        showModal={this.showModal}
                    />
                    {this.renderSignInButton()}
                    <View style={styles.signUpSection}>
                        <Text style={styles.standardText}>
                            {defaultAuthPassProps.underButtonText}
                            <Text
                                style={{
                                    color: primaryColorTheme.primary,
                                }}
                                onPress={clickHighlightedText}
                            >
                                {defaultAuthPassProps.highlightedText}
                            </Text>
                        </Text>
                    </View>
                </View>
            );
        }

        render() {
            const {
                style,
                contentContainerStyle,
                directionalLockEnabled,
                automaticallyAdjustContentInsets,
            } = scrollViewProps(styles);
            const cardProperty = cardProps(styles);
            const renderedCardContents = this.renderCardContents();
            return (
                <SafeAreaView style={styles.pallet}>
                    {this.presentLoading()}
                    <ScrollView
                        style={style}
                        contentContainerStyle={contentContainerStyle}
                        directionalLockEnabled={directionalLockEnabled}
                        automaticallyAdjustContentInsets={
                            automaticallyAdjustContentInsets
                        }
                    >
                        {renderCard(cardProperty, renderedCardContents)}
                    </ScrollView>
                </SafeAreaView>
            );
        }
    }
    return withNavigation(ComponentBase);
}
