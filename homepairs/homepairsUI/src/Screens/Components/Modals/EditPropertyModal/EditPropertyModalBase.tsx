import React from "react";
import { ScrollView, StyleSheet, SafeAreaView } from "react-native";
import {InputFormProps, ThinButton, ThinButtonProps, Card, InputForm } from 'homepairs-elements';
import strings from 'homepairs-strings';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairsDimensions, Property } from 'homepairs-types';
import Colors from 'homepairs-colors';
import { DarkModeInjectedProps, ModalInjectedProps } from 'homepairs-components';
import {isNumber, isEmptyOrSpaces} from 'homepairs-utilities';

export type EditPropertyDispatchProps = {
    onEditProperty: (oldProperty: Property, newProperty: Property, propIndex: number, email: string, onChangeModalVisibility: (check: boolean) => void) => void
}

export type EditPropertyStateProps = {
    email : string;
    index: number;
    oldProp: Property;
}

type Props = ModalInjectedProps & DarkModeInjectedProps & EditPropertyDispatchProps & EditPropertyStateProps;

type State = {
    address: string;
    city: string;
    state: string;
    tenants: string;
    bedrooms: string;
    bathrooms: string;
}

const signUpStrings = strings.signUpPage;

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
             minWidth:40,
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

export default class EditNewPropertyModalBase extends React.Component<Props, State> {
    inputFormStyle: { formTitle: any; input: any; modalContainer: any; }

    oldProperty: Property;

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
        this.oldProperty = props.oldProp;
        this.state = {
            address: this.oldProperty.address,
            city: this.oldProperty.city,
            state: this.oldProperty.city,
            bathrooms: this.oldProperty.bathrooms.toString(),
            bedrooms: this.oldProperty.bedrooms.toString(),
            tenants: this.oldProperty.tenants.toString(),
        };
    } 

    getFormAddress(childData : string) {
        const address = isEmptyOrSpaces(childData) ? this.oldProperty.address : childData;
        this.setState({address});
    }

    getFormCity(childData : string) {
        const city = isEmptyOrSpaces(childData) ? this.oldProperty.city : childData;
        this.setState({city});
    }

    getFormState(childData : string) {
        const state = isEmptyOrSpaces(childData) ? this.oldProperty.state : childData;
        this.setState({state});
    }

    getFormNumBed(childData : string) {
        const oldBedrooms = this.oldProperty.bedrooms.toString();
        const bedrooms = isEmptyOrSpaces(childData) ? oldBedrooms : childData;
        this.setState({bedrooms});
    }

    getFormNumBath(childData : string) {
        // if (isNumber(childData) && (baths > 0)) {
        const oldBathrooms = this.oldProperty.bathrooms.toString();
        const bathrooms = isEmptyOrSpaces(childData) ? oldBathrooms : childData;
        this.setState({bathrooms});
    }

    getFormMaxTenants(childData: string) {
        // if (isNumber(childData) && tenants > 0) {
        const oldTenants = this.oldProperty.tenants.toString();
        const tenants = isEmptyOrSpaces(childData) ? oldTenants : childData;
        this.setState({tenants});
   
    }

    validateInput(){
        // TODO: Validate the input for Valid Address, City, and State Using the Google Maps API
        const {address, city, state, bathrooms, bedrooms, tenants} = this.state;
        if(!checkIfPositiveNumber(bathrooms) || !checkIfPositiveNumber(bedrooms) || !checkIfPositiveNumber(tenants)){
            return false;
        }
        return true;
    }

    clickSubmitButton() {
        const {email, onChangeModalVisibility, onEditProperty, index, oldProp} = this.props;
        const {address, city, state, bathrooms, bedrooms, tenants} = this.state;
        if(!this.validateInput()){
            return;
        }
        const newProperty : Property = {
            address,
            city,
            state,
            bathrooms: Number(bathrooms),
            bedrooms: Number(bedrooms),
            tenants: Number(tenants),
        };
        onEditProperty(oldProp, newProperty, index, email, onChangeModalVisibility);
    }

    renderInputForms(): React.ReactElement[]{
        const {address, city, state, bedrooms, bathrooms, tenants} = this.state;
        const inputFormProps : InputFormProps[] = [
            {
                name: signUpStrings.inputForms.address,
                parentCallBack: this.getFormAddress,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                placeholder: address,
            }, 
            {
                name: signUpStrings.inputForms.city,
                parentCallBack: this.getFormCity,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                placeholder: city,
            }, 
            {
                name: signUpStrings.inputForms.state,
                parentCallBack: this.getFormState,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                placeholder: state,
            }, 
            {
                name: signUpStrings.inputForms.numBed,
                parentCallBack: this.getFormNumBed,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                placeholder: bedrooms.toString(),
            }, 
            {
                name: signUpStrings.inputForms.numBath,
                parentCallBack: this.getFormNumBath,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                placeholder: bathrooms.toString(),
            }, 
            {
                name: signUpStrings.inputForms.maxTenants,
                parentCallBack: this.getFormMaxTenants,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                placeholder: tenants.toString(),
            },
        ];

        return inputFormProps.map(inputFormProp => {
            const {name, parentCallBack, formTitleStyle, inputStyle, placeholder} = inputFormProp;
            return <InputForm key={name} name={name} parentCallBack={parentCallBack} formTitleStyle={formTitleStyle} inputStyle={inputStyle} placeholder={placeholder}/>;
        });
        
    }
    
    render() {
        const {onChangeModalVisibility} = this.props;
        const showCloseButton = true;
        return <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
            <ScrollView style = {this.inputFormStyle.modalContainer}>
                <Card
                    showCloseButton={showCloseButton}
                    title= "Edit Property"
                    closeButtonPressedCallBack={() => onChangeModalVisibility(false)}
                    >
                    <>{this.renderInputForms()}</>
                    {ThinButton(this.submitButton)}
                </Card>
            </ScrollView>
        </SafeAreaView>;
    }
}
