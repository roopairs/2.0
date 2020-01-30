import React from "react";
import { ScrollView, StyleSheet, SafeAreaView, Platform, StatusBar } from "react-native";
import {ThinButton, renderInputForm, ThinButtonProps } from 'homepairs-elements';
import strings from 'homepairs-strings';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairsDimensions, Property } from 'homepairs-types';
import Colors from 'homepairs-colors';
import { DarkModeInjectedProps } from 'homepairs-components';
import {isNumber, isNullOrUndefined, isEmptyOrSpaces} from 'homepairs-utilities';
import {ModalInjectedProps} from '../WithModal/WithModal';
import Card from '../../../../Elements/Cards/Card';

export type EditPropertyDispatchProps = {
    onEditProperty: (newProperty: Property, info: EditPropertyState, onChangeModalVisibility: (check: boolean) => void) => void
}

export type EditPropertyState = {
    email : string;
    index: number;
    oldProp: Property;
    roopairsToken: string;
}

type Props = ModalInjectedProps & DarkModeInjectedProps & EditPropertyDispatchProps & EditPropertyState;

type EditState = {
    address: string, 
    city: string,
    state: string, 
    bedrooms: string, 
    bathrooms: string, 
    tenants: string,
};


const signUpStrings = strings.signUpPage;

function setInputStyles(colorTheme?: BaseStyles.ColorTheme){
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
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf:'center',
        },
        scrollStyle: {
            marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            alignSelf: 'center',
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
            maxHeight: 75,
            minHeight: 50,
            justifyContent: 'flex-start',
        },
        cardWrapperStyle: {
            // flex:1,
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

export default class EditNewPropertyModalBase extends React.Component<Props, EditState> {
    inputFormStyle;

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
        this.validateNums = this.validateNums.bind(this);
        const {oldProp} = this.props;
        const {address, city, state, bedrooms, bathrooms, tenants} = oldProp;
        this.state = {
            address, city, state, 
            bedrooms: bedrooms.toString(), 
            bathrooms: bathrooms.toString(),
            tenants: tenants.toString(),
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
        this.setState({bedrooms: childData});
    }

    getFormNumBath(childData : string) {
        this.setState({bathrooms: childData});
    }

    getFormMaxTenants(childData: string) {
        this.setState({tenants: childData});
    }

    validateNums() {
        const {bedrooms, bathrooms, tenants} = this.state;
        if (isNumber(bedrooms) && isNumber(bathrooms) && isNumber(tenants)) {
            return true;
        } 
        return false;
    }

    clickSubmitButton() {
        const {email, onChangeModalVisibility, onEditProperty, index, oldProp, roopairsToken} = this.props;
        const {address, state, city, bedrooms, bathrooms, tenants} = this.state;
        if (this.validateNums()) {
            const newProperty : Property = {
                address, state, city, 
                bedrooms: Number(bedrooms), 
                bathrooms: Number(bathrooms), 
                tenants: Number(tenants),
            };
            const info : EditPropertyState = { email, index, oldProp, roopairsToken};
            onEditProperty(newProperty, info, onChangeModalVisibility);
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
                    title='Edit Property'
                    closeButtonPressedCallBack={() => onChangeModalVisibility(false)}
                    >
                    <>{this.renderInputForms()}</>
                    {ThinButton(this.submitButton)}
                </Card>
            </ScrollView>
        </SafeAreaView>);
    }
}
