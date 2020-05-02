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
import setInputStyles from './styles';

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