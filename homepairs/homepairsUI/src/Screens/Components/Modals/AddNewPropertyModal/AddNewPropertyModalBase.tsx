import React from "react";
import {  ScrollView, StyleSheet, SafeAreaView } from "react-native";
import {InputFormProps, renderInputForm, ThinButton, ThinButtonProps, Card } from 'homepairs-elements';
import strings from 'homepairs-strings';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairsDimensions, Property } from 'homepairs-types';
import Colors from 'homepairs-colors';
import {isNumber} from 'homepairs-utilities';
import {ModalInjectedProps} from '../WithModal/WithModal';
import { DarkModeInjectedProps } from "../../WithDarkMode/WithDarkMode";


export type AddNewPropertyDispatchProps = {
    onCreateProperty: (
        newProperty: Property,
        email: string,
        setInitialState: () => void,
        onChangeModalVisibility: (check: boolean) => void,
    ) => void;
};

export type NewPropertyState = {
    email: string;
};

type Props = ModalInjectedProps &
    DarkModeInjectedProps &
    AddNewPropertyDispatchProps &
    NewPropertyState;

type State = {
    address: string;
    city: string;
    state: string;
    tenants: string;
    bedrooms: string;
    bathrooms: string;
    pm: string
};

const signUpStrings = strings.signUpPage;

const initialState : State = {
    address: '', 
    city: '', 
    state: '', 
    bedrooms: '', 
    bathrooms: '',
    tenants: '',
    pm: '',
};

function setInputStyles(colorTheme?: BaseStyles.ColorTheme){
    const colors = (colorTheme == null) ? BaseStyles.LightColorTheme : colorTheme;
    return StyleSheet.create({
        formTitle: {
            marginVertical: '3.5%',
            fontFamily: BaseStyles.FontTheme.primary,
            color: colors.lightGray,
        },
        input: {
            alignItems: 'center',
            alignSelf: 'center',
            margin: BaseStyles.MarginPadding.xsmallConst,
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
            maxWidth: 500,
            width: '100%',
            maxHeight: 1000,
            alignSelf: 'center',
        },
    });
}

function checkIfPositiveNumber(arg: string): boolean{
    return (isNumber(arg) && Number(arg) > 0);
}

export default class AddNewPropertyModalBase extends React.Component<Props,State> {
    inputFormStyle;

    submitButton : ThinButtonProps = {
        name: 'Submit', 
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
            fontSize: BaseStyles.FontTheme.lg,
            alignSelf: 'center',
        },
        containerStyle: {
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
            minHeight: 50,
        },
    };

    constructor(props: Readonly<Props>) {
        super(props);
        this.inputFormStyle = setInputStyles(props.primaryColorTheme);
        this.getFormAddress = this.getFormAddress.bind(this);
        this.getFormCity = this.getFormCity.bind(this);
        this.getFormState = this.getFormState.bind(this);
        this.getFormNumBed = this.getFormNumBed.bind(this);
        this.getFormNumBath = this.getFormNumBath.bind(this);
        this.getFormMaxTenants = this.getFormMaxTenants.bind(this);
        this.setInitialState = this.setInitialState.bind(this);
        this.state = initialState;
    }

    getFormAddress(address : string) {
        this.setState({address});
    }

    getFormCity(city : string) {
        this.setState({city});
    }

    getFormState(state: string) {
        this.setState({state});
    }

    getFormNumBed(bedrooms: string) {
        this.setState({bedrooms});
    }

    getFormNumBath(bathrooms: string) {
        this.setState({bathrooms});
    }

    getFormMaxTenants(tenants: string) {
        this.setState({tenants});
    }

    setInitialState() {
        this.setState(initialState);
    }

    validateInput() {
        // TODO: Validate the input for Valid Address, City, and State Using the Google Maps API
        const {address, city, state, bathrooms, bedrooms, tenants} = this.state;
        if(!checkIfPositiveNumber(bathrooms) || !checkIfPositiveNumber(bedrooms) || !checkIfPositiveNumber(tenants)){
            return false;
        }
        return true; 
    }

    clickSubmitButton() {
        if(!this.validateInput()){
            return;
        }
        const {address, city, state, tenants, bathrooms, bedrooms} = this.state;
        const {email, onChangeModalVisibility, onCreateProperty} = this.props;
        const newProperty : Property = {
            address, 
            city, 
            state, 
            tenants: Number(tenants),
            bedrooms: Number(bedrooms), 
            bathrooms: Number(bathrooms),
        };
        onCreateProperty(newProperty, email, this.setInitialState, onChangeModalVisibility);
    }

    inputFormProps(): { [id: string]: InputFormProps } {
        return {
            streetAddress: {
                name: signUpStrings.inputForms.address,
                parentCallBack: this.getFormAddress,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            },
            city: {
                name: signUpStrings.inputForms.city,
                parentCallBack: this.getFormCity,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            },
            state: {
                name: signUpStrings.inputForms.state,
                parentCallBack: this.getFormState,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            },
            numBed: {
                name: signUpStrings.inputForms.numBed,
                parentCallBack: this.getFormNumBed,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            },
            numBath: {
                name: signUpStrings.inputForms.numBath,
                parentCallBack: this.getFormNumBath,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            },
            maxTenants: {
                name: signUpStrings.inputForms.maxTenants,
                parentCallBack: this.getFormMaxTenants,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            },
        };
    }

    render() {
        const {streetAddress, city, state, numBed, numBath, maxTenants} = this.inputFormProps();
        const {onChangeModalVisibility} = this.props;
        const showCloseButton = true;
        return <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
            <ScrollView style = {this.inputFormStyle.modalContainer}>
                <Card
                    showCloseButton={showCloseButton}
                    title= "Create New Property"
                    closeButtonPressedCallBack={() => onChangeModalVisibility(false)}
                    >
                    {renderInputForm(streetAddress)}
                    {renderInputForm(city)}
                    {renderInputForm(state)}
                    {renderInputForm(maxTenants)}
                    {renderInputForm(numBed)}
                    {renderInputForm(numBath)}
                    {ThinButton(this.submitButton)}
                </Card>
            </ScrollView>
        </SafeAreaView>;
    }
}
