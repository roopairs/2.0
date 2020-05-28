import React from "react";
import { ScrollView, View} from 'react-native';
import { ThinButton, ThinButtonProps, Card, InputForm } from 'src/elements';
import strings from 'homepairs-strings';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairsDimensions} from 'homepairs-types';
import Colors from 'homepairs-colors';
import {isPhoneNumberValid} from 'src/utility';
import { navigationPages, NavigationRouteScreenProps, NavigationRouteHandler } from 'src/routes';
import setInputStyles from './styles';

export type AddServiceProviderDispatchProps = {
    onAddServiceProvider: (
        pmId: number, 
        phoneNum: string,
        setInitialState: () => void, 
        displayError: (check: boolean, message?: string) => void, 
        navigation: NavigationRouteHandler,
    ) => void
}

type ServiceProviderInfo = {
    pmId: number,
}

const { ServiceRequestScreen } = navigationPages;

type Props = NavigationRouteScreenProps & AddServiceProviderDispatchProps & ServiceProviderInfo;

const primaryErrorMessage = 'No service provider with this phone number was found in our system.';

type CreateState = {
    phoneNum: string,
    errorMessage: string,
};

const addServiceProviderStrings = strings.addServiceProvider;

const initialState : CreateState = {
    phoneNum: '', errorMessage: primaryErrorMessage,
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
            marginTop: BaseStyles.MarginPadding.largeConst,
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
        this.setError = this.setError.bind(this);
        this.phoneNumRef = React.createRef();
    }

    getFormPhoneNum(childData : string) {
        this.setState({phoneNum: childData});
    }

    setError(show: boolean, errorMessage: string = primaryErrorMessage){
        this.setState({errorMessage});
        this.phoneNumRef.current.setError(show);
    }

    setInitialState() {
        this.setState(initialState);
    }

    goBackToPreviousPage() {
        const{navigation} = this.props;
        navigation.resolveModalReplaceNavigation(ServiceRequestScreen);
    }

    resetForm() {
        this.phoneNumRef.current.setError(false);
    }

    validatePhoneNumber() {
        const {phoneNum} = this.state;
        let check = true;
        if (!isPhoneNumberValid(phoneNum.trim())) {
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
        if (this.validatePhoneNumber()) 
            onAddServiceProvider(pmId, phoneNum.trim(), this.setInitialState, this.setError, navigation);
        else
            this.setError(true,'Please enter a valid phone number.');    
        
    }

    renderInputForms() {
        const {phoneNum, errorMessage} = this.state;
        return <InputForm
                    ref={this.phoneNumRef}
                    key={addServiceProviderStrings.phoneNumber}
                    name={addServiceProviderStrings.phoneNumber}
                    parentCallBack={this.getFormPhoneNum}
                    formTitleStyle={this.inputFormStyle.formTitle}
                    inputStyle={this.inputFormStyle.input}
                    containerStyle={this.inputFormStyle.container}
                    value={phoneNum}
                    errorMessage={errorMessage}
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