import React from 'react';
import { 
    Platform, View, Text, 
    ScrollView, ScrollViewProps, SafeAreaView, 
    StyleSheet, StatusBar, Dimensions 
} from 'react-native';
import { CardProps, InputFormProps, ThinButtonProps, Card, LoadingModal, ThinButton} from 'homepair-elements'
import { withNavigation} from 'react-navigation';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import strings from 'homepair-strings';
import { HomePairFonts } from 'homepair-fonts';
import { HomePairsDimensions } from 'homepair-types';
import colors from 'homepair-colors';
import * as BaseStyles from 'homepair-base-styles';
import { DarkModeInjectedProps } from '../WithDarkMode/WithDarkMode';
import HomePairColors from 'homepair-colors';


export type AuthPassProps = {
    button: String
    buttonColor: string
    subtitle: String | React.ReactElement
    loadingModalText: String
    underButtonText: String
    highlightedText: String
}

export type AuthPageInjectedProps = DarkModeInjectedProps & NavigationStackScreenProps<any,any> &
{ 
    inputFormProps?: {[id: string] : InputFormProps},
    thinButtonProps: ThinButtonProps,
    _clickHighlightedText?: (arg?:any) => any
    _clickButton?: (arg:any) => any 
    _setErrorState?: (arg1:boolean, arg2?:string) => any
    _showModal?: (arg1:boolean, arg2?:string) => any
}

type DefaultAuthPageState = {
    username: String,
    password: String,
    modalVisible: boolean,
    modalMessage: string,
    error: boolean,
    errorMessage: string,
    thinButtonStyle: ThinButtonProps,
    _clickHighlightedText: () => void
}

const initalState : DefaultAuthPageState = {
    username : '',
    password : '',
    error: false,
    errorMessage: '',
    modalVisible: false,
    modalMessage: strings.signInPage.modal,
    thinButtonStyle: null,
    _clickHighlightedText: () => {},
}

export default function withAuthPage(WrappedComponent: any, defaultAuthPassProps : AuthPassProps){
    var styles: any = null;
    class ReduxComponentBase 
        extends React.Component<AuthPageInjectedProps, DefaultAuthPageState> {
        constructor(props: Readonly<AuthPageInjectedProps>) {
          super(props);
          styles = setStyles(defaultAuthPassProps.buttonColor, props.primaryColorTheme)
          this.presentLoading = this.presentLoading.bind(this);
          this.showError = this.showError.bind(this);
          this.setThinButtonClick = this.setThinButtonClick.bind(this);
          this.setHighlightedClick = this.setHighlightedClick.bind(this);
          this.setErrorFlag = this.setErrorFlag.bind(this);
          this.showModal = this.showModal.bind(this);
          this.renderSubtitle = this.renderSubtitle.bind(this);
          this.renderSignInButton = this.renderSignInButton.bind(this);
          this.state = initalState;
        }

        scrollViewProps(): ScrollViewProps {
            return({
                style: styles.scrollStyle,
                contentContainerStyle: styles.scrollContentContainerStyle,
                directionalLockEnabled: true,
                automaticallyAdjustContentInsets: false,
            })
        }
        cardProps() : CardProps {
            return({
                containerStyle: styles.cardContainerStyle,
                title: strings.title,
                titleStyle: styles.cardTitleStyle,
                titleContainerStyle: styles.cardTitleContainerStyle,
                wrapperStyle: styles.cardWrapperStyle,
            })
        }
    
        setHighlightedClick(arg: () => void) : void {
            this.setState({
                _clickHighlightedText: arg
            })
        }
        setThinButtonClick(arg: () => void) : void {
            this.setState({
                thinButtonStyle: {
                    name: defaultAuthPassProps.button,
                    onClick: arg,
                    buttonStyle: styles.thinButton,
                    buttonTextStyle: styles.thinButtonText,
                    containerStyle: styles.thinButtonContainer,
                }
            })
        }
        setErrorFlag(isShown: boolean, message?: string){
            this.setState({
                error: isShown,
                errorMessage: message
            })
        }

        showModal(isShown: boolean, message: string = strings.signInPage.modal){
            this.setState({
                modalVisible: isShown,
                modalMessage: message,
            })
        }

        presentLoading(){
            return(
                <LoadingModal visible={this.state.modalVisible}>
                    <Text style={styles.modalText}>
                        {this.state.modalMessage}
                    </Text>
                </LoadingModal>
        )};

        showError(){
            if(!this.state.error){
                return (<></>)
            }
            return (
                <Text style={styles.errorText}>{this.state.errorMessage}</Text>
            )
        }

        renderSubtitle() {
            if (typeof defaultAuthPassProps.subtitle === 'string') {
                return <Text style={styles.subTitleText}>Sign into your account</Text>;
            } else if (React.isValidElement(defaultAuthPassProps.subtitle)) {
                return defaultAuthPassProps.subtitle;
            }
        }

        renderSignInButton() {
            return <View style={styles.submitSection}>
                <ThinButton {...this.state.thinButtonStyle}/>
            </View>
        }


        render() {
            return(
                <SafeAreaView style={styles.pallet}>
                    {this.presentLoading()}
                    <ScrollView {...this.scrollViewProps()}>
                        <Card {...this.cardProps()}>
                            <View style={styles.container}>
                                {this.renderSubtitle()}
                                {this.showError()}
                                <WrappedComponent {...this.props}
                                _clickButton={this.setThinButtonClick}
                                _clickHighlightedText={this.setHighlightedClick}
                                _setErrorState={this.setErrorFlag}
                                _showModal={this.showModal}
                                />
                                {this.renderSignInButton()}
                                <View style={styles.signUpSection}>
                                    <Text style={styles.standardText}>
                                        {defaultAuthPassProps.underButtonText}
                                        <Text style={{color: colors.LightModeColors.title}} 
                                        onPress={this.state._clickHighlightedText}>
                                            {defaultAuthPassProps.highlightedText}
                                        </Text>
                                    </Text>
                                </View>
                            </View>
                        </Card>
                    </ScrollView>
                </SafeAreaView>
            );
        }
    }
    return withNavigation(ReduxComponentBase)
}

function setStyles(buttonColor: string, colorTheme?: BaseStyles.ColorTheme){ 
    let colors = (colorTheme == null) ? BaseStyles.LightColorTheme : colorTheme
    return(
        StyleSheet.create ({
            container : {
                alignItems: 'center',
                alignSelf: 'center',
                width: BaseStyles.ContentWidth.max,
                flex: 1,
            },
            pallet:{
                backgroundColor: colors.space,
                width: BaseStyles.ContentWidth.max,
                alignSelf: 'center',
                alignContent: 'center',
                flex: 1,
                minWidth: HomePairsDimensions.MIN_CONTENT_SIZE,
            },
            scrollStyle: { 
                marginTop : Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            },
            scrollContentContainerStyle: {
                maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                width: BaseStyles.ContentWidth.max,
                paddingVertical: BaseStyles.MarginPadding.large, 
                flexGrow: 1, //Needed to center the contents of the scroll container
            },
            cardContainerStyle: {
                width: BaseStyles.ContentWidth.reg,
                paddingBottom: BaseStyles.MarginPadding.mediumConst,
                backgroundColor: colors.secondary,
                marginHorizontal: BaseStyles.MarginPadding.large,
                borderRadius: BaseStyles.BorderRadius.large,
                shadowColor: colors.shadow,
                shadowRadius: 5,
                shadowOffset: {width : 1, height: 1,},
                shadowOpacity: .25,
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
                paddingTop: (BaseStyles.MarginPadding.largeConst + BaseStyles.MarginPadding.mediumConst)/2,
                paddingBottom: BaseStyles.MarginPadding.smallConst,
                borderBottomWidth: 1, 
                alignSelf: 'center',
                justifyContent: 'center',
            },
            cardWrapperStyle: {
                paddingTop: BaseStyles.MarginPadding.medium,
                paddingHorizontal: BaseStyles.MarginPadding.large,
            },
            errorText:{
                fontSize: BaseStyles.FontTheme.small, 
                color: colors.red,
            },
            modalText:{
                fontFamily: HomePairFonts.nunito_regular, 
                fontSize: BaseStyles.FontTheme.reg
            },
            thinButtonContainer: {
                flex: 1,
                alignSelf: 'center',
                justifyContent: 'center',
                minHeight: 50,
            },
            thinButton:{
                alignItems: 'center',
                backgroundColor: colors.transparent,
                padding: BaseStyles.MarginPadding.mediumConst,
                maxWidth: HomePairsDimensions.MAX_BUTTON_WIDTH,
                minWidth: HomePairsDimensions.MIN_BUTTON_WIDTH,
                borderRadius: BaseStyles.BorderRadius.large,
                borderWidth: 1,
                borderColor: buttonColor,
            },
            thinButtonText:{
                color: buttonColor, 
                fontSize: BaseStyles.FontTheme.lg,
                alignSelf: 'center',
            },
            subTitleText:{
                color: colors.tertiary,
                fontFamily: BaseStyles.FontTheme.primary, 
                fontSize: (Dimensions.get('window').width > HomePairsDimensions.DROP_MENU_WIDTH) ? BaseStyles.FontTheme.reg : BaseStyles.FontTheme.small,
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
                fontSize: (Dimensions.get('window').width > HomePairsDimensions.DROP_MENU_WIDTH) ? BaseStyles.FontTheme.reg : BaseStyles.FontTheme.small, 
                color: '#9BA0A2',
                marginTop: BaseStyles.MarginPadding.medium
            },
    })
)}