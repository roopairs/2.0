import React from "react";
import { ScrollView, StyleSheet, SafeAreaView } from "react-native";
import {InputFormProps, ThinButton, renderInputForm, ThinButtonProps } from 'homepairs-elements';
import strings from 'homepairs-strings';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairsDimensions, Property } from 'homepairs-types';
import Colors from 'homepairs-colors';
import { DarkModeInjectedProps } from 'homepairs-components';
import {isNumber} from 'homepairs-utilities';
import {ModalInjectedProps} from '../WithModal/WithModal';
import Card from '../../../../Elements/Cards/Card';

export type EditPropertyDispatchProps = {
    onEditProperty: (oldProperty: Property, newProperty: Property, propIndex: number, email: string, onChangeModalVisibility: (check: boolean) => void) => void
}

export type EditPropertyState = {
    email : string;
    index: number;
    oldProp: Property;
}

type Props = ModalInjectedProps & DarkModeInjectedProps & EditPropertyDispatchProps & EditPropertyState;

type EditState = Property;

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


export default class EditNewPropertyModalBase extends React.Component<Props, EditState> {
    private inputFormStyle;

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
        this.state = {...props.oldProp};
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
        if (isNumber(childData)) {
            this.setState({bedrooms: Number(childData)});
        } else {
            // alert
        }
    }

    getFormNumBath(childData : string) {
        if (isNumber(childData)) {
            this.setState({bathrooms: Number(childData)});
        } else {
            // alert
        }
    }

    getFormMaxTenants(childData: string) {
        if (isNumber(childData)) {
            this.setState({tenants: Number(childData)});
        } else {
            // alert
        }
    }

    clickSubmitButton() {
        const {email, onChangeModalVisibility, onEditProperty, index, oldProp} = this.props;
        const newProperty : Property = {...this.state};
        onEditProperty(oldProp, newProperty, index, email, onChangeModalVisibility);
    }

    inputFormProps() : {[id: string] : InputFormProps} {
        const {address, city, state, bedrooms, bathrooms, tenants} = this.state;
        return {
            streetAddress: {
                name: signUpStrings.inputForms.address,
                parentCallBack: this.getFormAddress,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                placeholder: address,
            }, 
            city: {
                name: signUpStrings.inputForms.city,
                parentCallBack: this.getFormCity,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                placeholder: city,
            }, 
            state: {
                name: signUpStrings.inputForms.state,
                parentCallBack: this.getFormState,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                placeholder: state,
            }, 
            numBed: {
                name: signUpStrings.inputForms.numBed,
                parentCallBack: this.getFormNumBed,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                placeholder: bedrooms.toString(),
            }, 
            numBath: {
                name: signUpStrings.inputForms.numBath,
                parentCallBack: this.getFormNumBath,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                placeholder: bathrooms.toString(),
            }, 
            maxTenants: {
                name: signUpStrings.inputForms.maxTenants,
                parentCallBack: this.getFormMaxTenants,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                placeholder: tenants.toString(),
            },
        };
    }
    
    render() {
        const {streetAddress, city, state, numBed, numBath, maxTenants} = this.inputFormProps();
        const {onChangeModalVisibility} = this.props;
        return <SafeAreaView>
            <ScrollView style = {this.inputFormStyle.modalContainer}>
                <Card
                    showCloseButton = {true}
                    title= "Edit Property"
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
