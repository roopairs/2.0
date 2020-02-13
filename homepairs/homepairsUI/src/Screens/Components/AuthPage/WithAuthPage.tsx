import * as React from 'react';
import {
    Platform,
    View,
    Text,
    ScrollView,
    StyleSheet,
    StatusBar,
    Dimensions,
} from 'react-native';
import {Card} from 'homepairs-elements';
import strings from 'homepairs-strings';
import { HomePairFonts } from 'homepairs-fonts';
import { HomePairsDimensions } from 'homepairs-types';
import * as BaseStyles from 'homepairs-base-styles';
import { isNullOrUndefined } from 'homepairs-utilities';
import { DarkModeInjectedProps } from '../WithDarkMode/WithDarkMode';
import { ModalInjectedProps } from '../Modals/WithModal/WithModal';
import ThinButton from '../../../Elements/Buttons/ThinButton';


export type AuthPassProps = {
    /**
     * Text of the button rendered at the bottom of the component 
     */
    button: string;

    /**
     * Color of the button rendered at the bottom of the component
     */
    buttonColor: string;

    /**
     * Contents of the subtitle, renders a TextInput if a string is passed.
     * Otherwise, the reactElement is used
     */
    subtitle: string | React.ReactElement;

    /**
     * Text presented when the modal is visible 
     */
    loadingModalText: string;

    /**
     * Text for the unclickable content below the button
     */
    underButtonText: string;

    /**
     * Text for the clickable content below the button
     */
    highlightedText: string;
};

export type AuthPageInjectedProps = ModalInjectedProps & {
    /**
     * Callback Function that invokes after the highlighted text has been clicked. 
     */
    clickHighlightedText?: (arg?: any) => any;

    /**
     * Callback Function that invokes after the thin button has been clicked. 
     */
    clickButton?: (arg: any) => any;

    /**
     * Callback Function the Base component invokes in order to change toggle the 
     * error state of withAuthPage component. Also takes in an optional string 
     * parameter
     */
    setErrorState?: (arg1: boolean, arg2?: string) => any;
};

type AuthPageProps = DarkModeInjectedProps & ModalInjectedProps

type AuthPageState = {
    /**
     * Indicates if an error message should be displayed by the card. This should be set to true
     * if authorization fails. Do not set this for invalid input.
     */
    error: boolean;

    /**
     * The error message to display on the card. This should be interpreted from error messages 
     * recieved from the Homepairs API or if a 400/500 error occurs. 
     */
    errorMessage: string;

    /**
     * Callback function that is intended to get defined by the wrapped component. This will
     * invoke a method when the thin button has been clicked.
     */
    clickThinButton:() => void;

    /**
     * Callback function that is intended to get defined by the wrapped component. This will
     * invoke a method when the highlighted text underneath the button has been clicked.
     */
    clickHighlightedText: () => void;
};

const initalState: AuthPageState = {
    error: false,
    errorMessage: '',
    clickThinButton: () => {},
    clickHighlightedText: () => {},
};

function setStyles(buttonColor: string, colorTheme: BaseStyles.ColorTheme = BaseStyles.LightColorTheme) {
    return StyleSheet.create({
        container: {
            alignItems: 'center',
            alignSelf: 'center',
            width: BaseStyles.ContentWidth.max,
            flex: 1,
        },
        pallet: {
            backgroundColor: colorTheme.space,
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
            backgroundColor: colorTheme.secondary,
            marginHorizontal: BaseStyles.MarginPadding.large,
            borderRadius: BaseStyles.BorderRadius.large,
            shadowColor: colorTheme.shadow,
            shadowRadius: 5,
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.25,
            elevation: 2,
        },
        cardTitleStyle: {
            color: colorTheme.primary,
            fontFamily: HomePairFonts.nunito_semibold,
            fontSize: BaseStyles.FontTheme.title,
            alignSelf: 'center',
        },
        cardTitleContainerStyle: {
            width: BaseStyles.ContentWidth.max,
            borderBottomColor: colorTheme.veryLightGray,
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
            color: colorTheme.red,
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
            color: colorTheme.tertiary,
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

/**
 * ------------------------------------------------------------
 * withAuthPage
 * ------------------------------------------------------------
 * A High Order Component (HOC) that renders a smaller component into the homepairs 
 * authorization page styles. It will inject into the wrapped component, callback functions
 * for error presentation, clicking the highlighted text, clicking the button, and for 
 * toggling the visibility of the modal. Please refer to the AuthPassProps Type for information
 * regarding the data presented by this modal
 * @param {React.ReactElement} WrappedComponent 
 * @param {AuthPassProps} defaultAuthPassProps  */
export function withAuthPage(WrappedComponent: any,defaultAuthPassProps: AuthPassProps) {
    let styles: any = null;

    function renderSubtitle() {
        // The subtitle passed is a simple string. We render a new Text Element for it
        if (typeof defaultAuthPassProps.subtitle === 'string') {
            return (
                <Text testID='auth-subtitle' style={styles.subTitleText}>{defaultAuthPassProps.subtitle}</Text>
            );
        }
        // If the subtitle is an actual component, render the component then. 
        if (React.isValidElement(defaultAuthPassProps.subtitle)) {
            return <View testID='auth-subtitle-element'>{defaultAuthPassProps.subtitle}</View>;
        }
        // Default case, we return essentially nothing. 
        return <></>;
    }
    return class ComponentBase extends React.Component<AuthPageProps,AuthPageState> {
        colors: BaseStyles.ColorTheme;

        constructor(props: Readonly<AuthPageProps>) {
            super(props);
            this.colors = isNullOrUndefined(props.primaryColorTheme) ? BaseStyles.LightColorTheme : props.primaryColorTheme;
            styles = setStyles(
                defaultAuthPassProps.buttonColor,
                this.colors,
            );

            // Bind methods that are called outside of this class
            this.setThinButtonClick = this.setThinButtonClick.bind(this);
            this.setHighlightedClick = this.setHighlightedClick.bind(this);
            this.setErrorFlag = this.setErrorFlag.bind(this);

            this.state = initalState;
        }


        /* ******** Methods that will be injected into the Wrapped Component ******* */
        setHighlightedClick(arg: () => void): void {
            this.setState({
                clickHighlightedText: arg,
            });
        }

        setThinButtonClick(arg: () => void): void {
            this.setState({
                clickThinButton: arg,
            });
        }

        setErrorFlag(isShown: boolean, message?: string) {
            this.setState({
                error: isShown,
                errorMessage: message,
            });
        }
        /* ******** Methods that will be injected into the Wrapped Component ******* */


        showError() {
            const { error, errorMessage } = this.state;
            if (!error) {
                return <></>;
            }
            return <Text testID='auth-error' style={styles.errorText}>{errorMessage}</Text>;
        }

        renderSignInButton() {
            const { clickThinButton } = this.state;
            return (
                <View style={styles.submitSection}>
                    <ThinButton
                    name={defaultAuthPassProps.button}
                    onClick={clickThinButton}
                    containerStyle={styles.thinButtonContainer}
                    buttonStyle={styles.thinButton}
                    buttonTextStyle={styles.thinButtonText}/>
                </View>
            );
        }

        renderUnderButtonText() {
            const {clickHighlightedText} = this.state;
            return (
                <View style={styles.signUpSection}>
                    <Text style={styles.standardText}>
                        {defaultAuthPassProps.underButtonText}
                        <Text
                        style={{color: this.colors.primary}}
                        onPress={clickHighlightedText}>
                            {defaultAuthPassProps.highlightedText}
                        </Text>
                    </Text>
                </View>
            );
        }

        renderContents() {
          const {onChangeModalVisibility} = this.props;
          return (
            <View style={styles.container}>
                {renderSubtitle()}
                {this.showError()}
                <WrappedComponent
                onChangeModalVisibility={onChangeModalVisibility}
                clickButton={this.setThinButtonClick}
                clickHighlightedText={this.setHighlightedClick}
                setErrorState={this.setErrorFlag}/>
                {this.renderSignInButton()}
                {this.renderUnderButtonText()}
            </View>);
        }

        render() {
            const directionalLockEnabled = true; 
            const automaticallyAdjustContentInsets = false;
            return (
                <View style={styles.pallet}>
                    <ScrollView
                    style={styles.scrollStyle}
                    contentContainerStyle={styles.scrollContentContainerStyle}
                    directionalLockEnabled={directionalLockEnabled}
                    automaticallyAdjustContentInsets={automaticallyAdjustContentInsets}>
                        <Card
                        title={strings.title}
                        titleStyle={styles.cardTitleStyle}
                        titleContainerStyle={styles.cardTitleContainerStyle}
                        containerStyle={styles.cardContainerStyle}
                        wrapperStyle={styles.cardWrapperStyle}>
                            {this.renderContents()}
                        </Card>
                    </ScrollView>
                </View>
            );
        }
    };
}
