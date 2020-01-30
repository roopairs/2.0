import React from "react";
import {  ScrollView, StyleSheet, SafeAreaView, StatusBar, Platform } from "react-native";
import { renderInputForm, ThinButton, ThinButtonProps, Card } from 'homepairs-elements';

import strings from 'homepairs-strings';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairsDimensions, Property } from 'homepairs-types';
import Colors from 'homepairs-colors';
import { DarkModeInjectedProps } from 'homepairs-components';
import {isNumber} from 'homepairs-utilities';
import {ModalInjectedProps} from '../WithModal/WithModal';



export type AddNewPropertyDispatchProps = {
    onCreateProperty: (newProperty: Property, info: NewPropertyState, setInitialState: () => void, onChangeModalVisibility: (check: boolean) => void) => void
}

export type NewPropertyState = {
    email : string;
    roopairsToken: string;
}

type Props = ModalInjectedProps & DarkModeInjectedProps & AddNewPropertyDispatchProps & NewPropertyState;

type CreateState = {
    address: string, 
    city: string, 
    state: string, 
    bedrooms: string, 
    bathrooms: string, 
    tenants: string,
};

const signUpStrings = strings.signUpPage;

const initialState : CreateState = {
    address: '', 
    city: '', 
    state: '', 
    bedrooms: '', 
    bathrooms: '',
    tenants: '',
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

export default class AddNewPropertyModalBase extends React.Component<Props,CreateState> {
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

    getFormAddress(childData : string) {
        this.setState({address: childData});
    }

    getFormCity(childData : string) {
        this.setState({city: childData});
    }

    getFormState(childData : string) {
        this.setState({state: childData});
    }

    getFormNumBed(childData : string) {
        this.setState({bedrooms: childData});
    }

    getFormNumBath(childData : string) {
        this.setState({bathrooms: childData});
    }

    getFormMaxTenants(childData: string) {
        this.setState({tenants: childData});
    }

    setInitialState() {
        this.setState(initialState);
    }

    validateNums() {
        const {bedrooms, bathrooms, tenants} = this.state;
        // isNumber function is bugged. It is accepting strings as numbers
        if (isNumber(bedrooms) && isNumber(bathrooms) && isNumber(tenants)) {
            return true;
        } 
        return false;
    }

    clickSubmitButton() {
        const {address, city, state, tenants, bathrooms, bedrooms} = this.state;
        const {email, onChangeModalVisibility, onCreateProperty, roopairsToken} = this.props;
        if (this.validateNums()) {
            const newProperty : Property = {
                address, city, state,
                tenants: Number(tenants),
                bedrooms: Number(bedrooms), 
                bathrooms: Number(bathrooms),
            };
            const info : NewPropertyState = {email, roopairsToken};
            onCreateProperty(newProperty, info, this.setInitialState, onChangeModalVisibility);
        } else {
            // throw error
        }
    }

    renderInputForms() {
        const {address, city, state, bedrooms, bathrooms, tenants} = this.state;
        const inputForms  = [
             {
                key: signUpStrings.inputForms.address,
                name: signUpStrings.inputForms.address,
                parentCallBack: this.getFormAddress,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                value: address,
            }, 
            {
                key: signUpStrings.inputForms.city,
                name: signUpStrings.inputForms.city,
                parentCallBack: this.getFormCity,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                value: city, 
            }, 
            {
                key: signUpStrings.inputForms.state,
                name: signUpStrings.inputForms.state,
                parentCallBack: this.getFormState,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                value: state, 
            }, 
            {
                key: signUpStrings.inputForms.numBed,
                name: signUpStrings.inputForms.numBed,
                parentCallBack: this.getFormNumBed,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                value: bedrooms,
            }, 
            {
                key: signUpStrings.inputForms.numBath,
                name: signUpStrings.inputForms.numBath,
                parentCallBack: this.getFormNumBath,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                value: bathrooms,
            }, 
            {
                key: signUpStrings.inputForms.maxTenants,
                name: signUpStrings.inputForms.maxTenants,
                parentCallBack: this.getFormMaxTenants,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                value: tenants,
            },
        ];

        return inputForms.map(inputFromProp => {
            return renderInputForm(inputFromProp);
        });
    }
    
    render() {
        const {onChangeModalVisibility} = this.props;
        const showCloseButton = true;
        return(
            <SafeAreaView style={this.inputFormStyle.modalContainer}>
            <ScrollView style={this.inputFormStyle.scrollStyle}
            contentContainerStyle={this.inputFormStyle.scrollContentContainerStyle}
            showsHorizontalScrollIndicator={false}>
                <Card
                    containerStyle={this.inputFormStyle.cardContainer}
                    showCloseButton={showCloseButton}
                    titleStyle={this.inputFormStyle.cardTitle}
                    titleContainerStyle={this.inputFormStyle.cardTitleContainer}
                    wrapperStyle={this.inputFormStyle.cardWrapperStyle}
                    title='Add Property'
                    closeButtonPressedCallBack={() => onChangeModalVisibility(false)}
                    >
                    <>{this.renderInputForms()}</>
                    {ThinButton(this.submitButton)}
                </Card>
            </ScrollView>
        </SafeAreaView>);
    }
}
