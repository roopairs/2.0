import React from "react";
import { ScrollView, StyleSheet, StatusBar, Platform, View, Dimensions} from 'react-native';
import { ThinButton, ThinButtonProps, Card, InputForm } from 'homepairs-elements';
import strings from 'homepairs-strings';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairsDimensions} from 'homepairs-types';
import Colors from 'homepairs-colors';
import {isPhoneNumberValid, isNullOrUndefined} from 'homepairs-utilities';
import {FontTheme} from 'homepairs-base-styles';
import { navigationPages, NavigationRouteScreenProps, NavigationRouteHandler } from 'homepairs-routes';


export type AddServiceProviderDispatchProps = {
    onAddServiceProvider: (
        pmId: number, 
        phoneNum: string,
        setInitialState: () => void, 
        displayError: (check: boolean) => void, 
        navigation: NavigationRouteHandler,
    ) => void
}

type ServiceProviderInfo = {
    pmId: number,
}

const { ServiceRequestScreen } = navigationPages;

type Props = NavigationRouteScreenProps & AddServiceProviderDispatchProps & ServiceProviderInfo;

type CreateState = {
    phoneNum: string,
};

const addServiceProviderStrings = strings.addServiceProvider;

const initialState : CreateState = {
    phoneNum: '',
};

function setInputStyles(colorTheme?: BaseStyles.ColorTheme){
    const {width} = Dimensions.get('window');
    const colors = isNullOrUndefined(colorTheme) ? BaseStyles.LightColorTheme : colorTheme;
    return StyleSheet.create({
        formTitle: {
            marginVertical: '3.5%',
            fontFamily: BaseStyles.FontTheme.primary,
            color: colors.lightGray,
        },
        input: {
            alignItems: 'center',
            alignSelf: 'center',
            margin: 0,
            minWidth: 40,
            width: BaseStyles.ContentWidth.max,
            height: 40,
            color: colors.lightGray,
            borderColor: colors.lightGray,
            borderWidth: 1,
            borderRadius: BaseStyles.BorderRadius.small,
            paddingHorizontal: BaseStyles.MarginPadding.mediumConst,
        },
        modalContainer: {
            flex: 1,
            maxWidth: HomePairsDimensions.MAX_PALLET,
            width: Platform.OS === 'web' ? width : BaseStyles.ContentWidth.max,
            alignSelf: 'center',
        },
        scrollStyle: {
            flex:1,
            marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            width: '100%',
        },
        scrollContentContainerStyle: {
            maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            width: BaseStyles.ContentWidth.reg,
            paddingVertical: BaseStyles.MarginPadding.large,
            flexGrow: Platform.OS === 'web' ? null : 1, // Needed to center the contents of the scroll container for mobile 
        },
        cardContainer: {
            backgroundColor: 'white',
            maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
            width: BaseStyles.ContentWidth.reg,
            marginHorizontal: '5%',
            borderRadius: 7,
            shadowColor: 'black',
            shadowRadius: 20,
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 100,
            elevation: 9,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flex: 1,
        },
        cardTitle: {
            color: colors.tertiary,
            fontFamily: 'nunito-regular',
            fontSize: 20,
        },
        cardTitleContainer: {
            width: BaseStyles.ContentWidth.max,
            borderBottomColor: '#AFB3B5',
            paddingVertical: BaseStyles.MarginPadding.largeConst,
            paddingHorizontal: BaseStyles.MarginPadding.largeConst,
            borderBottomWidth: 1,
            alignSelf: 'center',
            justifyContent: 'flex-start',
        },
        cardWrapperStyle: {
            width: BaseStyles.ContentWidth.thin,
            marginTop: BaseStyles.MarginPadding.small,
            marginBottom: BaseStyles.MarginPadding.smallConst,
            alignSelf: 'center',
            justifyContent: 'center',
        },
        errorStyle: {
            fontFamily: FontTheme.secondary, 
            fontSize: 16,
            margin: 0, 
            padding: 0,
        },
        menuStyle: {
            backgroundColor: colors.secondary,
            marginHorizontal: BaseStyles.MarginPadding.large,
            borderRadius: BaseStyles.BorderRadius.large,
            padding: BaseStyles.MarginPadding.large,
            paddingTop: 10,
            paddingBottom: 30,
            width: BaseStyles.ContentWidth.thin,
            alignSelf: 'center',
            borderColor: colors.lightGray,
            borderWidth: 1,
            overflow: 'hidden',
            marginBottom: 20,
        },
        titleText: {
            fontSize: BaseStyles.FontTheme.reg,
            fontFamily: 'nunito_regular',
        },
    });
}


export class AddServiceProviderModalBase extends React.Component<Props,CreateState> {
    inputFormStyle;

    phoneNumRef;

    submitButton : ThinButtonProps = {
        name: addServiceProviderStrings.add, 
        onClick: () => {this.clickSubmitButton();}, 
        buttonStyle: {
            alignItems: 'center',
            backgroundColor: Colors.LightModeColors.transparent,
            padding: BaseStyles.MarginPadding.mediumConst,
            maxWidth: HomePairsDimensions.MAX_BUTTON_WIDTH,
            minWidth: HomePairsDimensions.MIN_BUTTON_WIDTH,
            borderRadius: BaseStyles.BorderRadius.large,
            borderWidth: 1,
            borderColor: Colors.LightModeColors.blueButton,
        },
        buttonTextStyle: {
            color: Colors.LightModeColors.blueButtonText, 
            fontSize: BaseStyles.FontTheme.reg,
            alignSelf: 'center',
        },
        containerStyle: {
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
            marginBottom: BaseStyles.MarginPadding.xlarge,
            minHeight: 50,
        },
    };

    constructor(props: Readonly<Props>) {
        super(props);
        this.inputFormStyle = setInputStyles(null);
        this.state = initialState;

        this.setInitialState = this.setInitialState.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.getFormPhoneNum = this.getFormPhoneNum.bind(this);
        this.goBackToPreviousPage = this.goBackToPreviousPage.bind(this);
        this.phoneNumRef = React.createRef();
    }

    getFormPhoneNum(childData : string) {
        this.setState({phoneNum: childData});
    }

    goBackToPreviousPage() {
        const{navigation} = this.props;
        navigation.resolveModalReplaceNavigation(ServiceRequestScreen);
    }

    setInitialState() {
        this.setState(initialState);
    }

    resetForm() {
        this.phoneNumRef.current.setError(false);
    }

    validatePhoneNumber() {
        const {phoneNum} = this.state;
        let check = true;
        if (!isPhoneNumberValid(phoneNum)) {
            this.phoneNumRef.current.setError(true);
            check = false;
        }
        return check;

    }

    clickSubmitButton() {
        const {phoneNum} = this.state;
        const {onAddServiceProvider, navigation, pmId} = this.props;
        this.resetForm();
        console.log(pmId);
        if (this.validatePhoneNumber()) {
            onAddServiceProvider(pmId, phoneNum, this.setInitialState, this.phoneNumRef.current.setError, navigation);
        }
    }

    renderInputForms() {
        const {phoneNum} = this.state;
        return <InputForm
                    ref={this.phoneNumRef}
                    key={addServiceProviderStrings.phoneNumber}
                    name={addServiceProviderStrings.phoneNumber}
                    parentCallBack={this.getFormPhoneNum}
                    formTitleStyle={this.inputFormStyle.formTitle}
                    inputStyle={this.inputFormStyle.input}
                    containerStyle={this.inputFormStyle.container}
                    value={phoneNum}
                    errorMessage='No service provider with this phone number was found in our system.'
                />;
    }

    render() {
        const showCloseButton = true;
        return(
            <View style={this.inputFormStyle.modalContainer}>
            <ScrollView style={this.inputFormStyle.scrollStyle}
            contentContainerStyle={this.inputFormStyle.scrollContentContainerStyle}
            showsHorizontalScrollIndicator={false}>
                <Card
                    containerStyle={this.inputFormStyle.cardContainer}
                    showCloseButton={showCloseButton}
                    title={addServiceProviderStrings.title} 
                    closeButtonPressedCallBack={() => { 
                        this.goBackToPreviousPage();
                        this.setInitialState();
                        this.resetForm();
                    }} 
                    titleStyle={this.inputFormStyle.cardTitle}
                    titleContainerStyle={this.inputFormStyle.cardTitleContainer}
                    wrapperStyle={this.inputFormStyle.cardWrapperStyle}
                    >
                    <>{this.renderInputForms()}</>
                    <ThinButton
                        name={this.submitButton.name}
                        onClick={this.submitButton.onClick}
                        buttonStyle={this.submitButton.buttonStyle}
                        buttonTextStyle={this.submitButton.buttonTextStyle}
                        containerStyle={this.submitButton.containerStyle}
                    />
                </Card>
            </ScrollView>
        </View>);
    }
}