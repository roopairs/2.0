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

    validateNums() {
        const {bedrooms, bathrooms, tenants} = this.state;
        // isNumber function is bugged. It is accepting strings as numbers
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

    inputFormProps() : {[id: string] : InputFormProps} {
        const {address, city, state, bedrooms, bathrooms, tenants} = this.state;
        return {
            streetAddress: {
                name: signUpStrings.inputForms.address,
                parentCallBack: this.getFormAddress,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                value: address,
            }, 
            city: {
                name: signUpStrings.inputForms.city,
                parentCallBack: this.getFormCity,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                value: city, 
            }, 
            state: {
                name: signUpStrings.inputForms.state,
                parentCallBack: this.getFormState,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                value: state, 
            }, 
            numBed: {
                name: signUpStrings.inputForms.numBed,
                parentCallBack: this.getFormNumBed,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                value: bedrooms,
            }, 
            numBath: {
                name: signUpStrings.inputForms.numBath,
                parentCallBack: this.getFormNumBath,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                value: bathrooms,
            }, 
            maxTenants: {
                name: signUpStrings.inputForms.maxTenants,
                parentCallBack: this.getFormMaxTenants,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                value: tenants,
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
