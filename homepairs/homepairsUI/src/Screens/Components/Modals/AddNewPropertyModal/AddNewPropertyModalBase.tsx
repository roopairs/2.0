import React from "react";
import {  ScrollView, StyleSheet, SafeAreaView, Platform, StatusBar } from "react-native";
import {ThinButton, ThinButtonProps, Card, InputForm } from 'homepairs-elements';
import strings from 'homepairs-strings';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairsDimensions, Property } from 'homepairs-types';
import Colors from 'homepairs-colors';
import {isNumber} from 'homepairs-utilities';
import {ModalInjectedProps} from '../WithModal/WithModal';
import { DarkModeInjectedProps } from "../../WithDarkMode/WithDarkMode";


export type AddNewPropertyDispatchProps = {
    onCreateProperty: (newProperty: Property, info: AddNewPropertyStateProps, setInitialState: () => void, onChangeModalVisibility: (check: boolean) => void) => void
}

export type AddNewPropertyStateProps = {
    email : string;
    roopairsToken: string;
}

type Props = ModalInjectedProps &
    DarkModeInjectedProps &
    AddNewPropertyDispatchProps &
    AddNewPropertyStateProps;

type State = {
    address: string;
    city: string;
    state: string;
    tenants: string;
    bedrooms: string;
    bathrooms: string;
    pm: string;

};

const addPropertyStrings = strings.propertiesPage.addProperty;
const inputFormStrings = addPropertyStrings.inputForm;

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
            flex:1,
            width: '100%',
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
            flexGrow: 1, // Needed to center the contents of the scroll container
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
    });
}

function checkIfPositiveNumber(arg: string): boolean{
    return (isNumber(arg) && Number(arg) > 0);
}

export default class AddNewPropertyModalBase extends React.Component<Props,State> {
    inputFormStyle;

    submitButton : ThinButtonProps = {
        name: addPropertyStrings.button, 
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

    inputs;

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
        this.onRef = this.onRef.bind(this);
        this.state = initialState;
        this.inputs = [];
    }

    // Pass this function into the input form to get a reference of the Text Input element
    onRef(ref){this.inputs.push(ref);}

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

    // How we reset the forms once we have their references stored in the arraylist
    resetInputForms(){
        this.inputs.forEach(element => {
            element.clearText();
        });
    }

    clickSubmitButton() {
        if(!this.validateInput()){
            return;
        }
        const {address, city, state, tenants, bathrooms, bedrooms} = this.state;
        const {email, onChangeModalVisibility, onCreateProperty, roopairsToken} = this.props;
        const newProperty : Property = {
            address, 
            city, 
            state, 
            tenants: Number(tenants),
            bedrooms: Number(bedrooms), 
            bathrooms: Number(bathrooms),
        };
        const info : AddNewPropertyStateProps = {email, roopairsToken};
        onCreateProperty(newProperty, info, this.setInitialState, onChangeModalVisibility);
        this.resetInputForms();
    }

    renderInputForms() {
        const inputFormProps = [
            {
                name: inputFormStrings.address,
                parentCallBack: this.getFormAddress,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            },
            {
                name: inputFormStrings.city,
                parentCallBack: this.getFormCity,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            },
            {
                name: inputFormStrings.state,
                parentCallBack: this.getFormState,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            },
            {
                name: inputFormStrings.maxTenants,
                parentCallBack: this.getFormMaxTenants,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            },
            {
                name: inputFormStrings.bedrooms,
                parentCallBack: this.getFormNumBed,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            },
            {
                name: inputFormStrings.bathrooms,
                parentCallBack: this.getFormNumBath,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            },
        ];

        return inputFormProps.map(inputFormProp => {
            const {
                name,
                parentCallBack,
                formTitleStyle,
                inputStyle,
            } = inputFormProp;
            return (
                <InputForm
                    key={name}
                    onRef={this.onRef}
                    name={name}
                    parentCallBack={parentCallBack}
                    formTitleStyle={formTitleStyle}
                    inputStyle={inputStyle}
                />
            );
        });
    }

    render() {
        const {onChangeModalVisibility} = this.props;
        const showCloseButton = true;
        return <SafeAreaView style={this.inputFormStyle.modalContainer}>
            <ScrollView style={this.inputFormStyle.scrollStyle}
            contentContainerStyle={this.inputFormStyle.scrollContentContainerStyle}
            showsHorizontalScrollIndicator={false}>
                <Card
                    showCloseButton={showCloseButton}
                    title={addPropertyStrings.title} 
                    closeButtonPressedCallBack={() => onChangeModalVisibility(false)}
                    containerStyle={this.inputFormStyle.cardContainer}
                    titleStyle={this.inputFormStyle.cardTitle}
                    titleContainerStyle={this.inputFormStyle.cardTitleContainer}
                    wrapperStyle={this.inputFormStyle.cardWrapperStyle}
                    >
                    <>{this.renderInputForms()}</>
                    {ThinButton(this.submitButton)}
                </Card>
            </ScrollView>
        </SafeAreaView>;
    }
}
