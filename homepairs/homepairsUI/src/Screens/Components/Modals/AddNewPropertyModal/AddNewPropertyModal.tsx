import React, { Component, ReactElement } from "react"
import { Text, View, Modal, TouchableHighlight, StyleSheet } from "react-native"
import Card, {CardProps} from '../../../../../src/Elements/Cards/Card';
import HomePairColors from 'homepair-colors';
import {ModalInjectedProps} from '../WithModal/WithModal';
import {InputForm, InputFormProps } from 'homepair-elements';
import strings from 'homepair-strings';
import * as BaseStyles from 'homepair-base-styles';

type Props = ModalInjectedProps;

type CreateState = {
    streetAddress: string, 
    city: string, 
    state: string, 
    numBed: number, 
    numBath: number, 
    pm: string
};

const signUpStrings = strings.signUpPage;

const initialState = {
    streetAddress: '', 
    city: '', 
    state: '', 
    numBed: 0, 
    numBath: 0,
    pm: '',
}

export class AddNewPropertyModal extends Component<Props, CreateState> {
    private inputFormStyle;
    constructor(props: Readonly<Props>) {
        super(props);
        this.inputFormStyle = setInputStyles(props.primaryColorTheme);
        this.getFormAddress = this.getFormAddress.bind(this);
        this.getFormCity = this.getFormCity.bind(this);
        this.getFormState = this.getFormState.bind(this);
        this.getFormNumBed = this.getFormNumBed.bind(this);
        this.getFormNumBath = this.getFormNumBath.bind(this);
        this.state = initialState;
    } 

    getFormAddress(childData : string) {
        this.setState({streetAddress: childData})
    }

    getFormCity(childData : string) {
        this.setState({city: childData})
    }

    getFormState(childData : string) {
        this.setState({state: childData})
    }

    getFormNumBed(childData : string) {

        this.setState({numBed: childData})
    }

    getFormNumBath(childData : string) {
        this.setState({numBath: childData})
    }


    inputFormProps() : {[id: string] : InputFormProps} {
        return {
            streetAddress: {
                name: signUpStrings.inputForms.address,
                parentCallBack: this.getFormAddress,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            }, 
            city: {
                name: signUpStrings.inputForms.address,
                parentCallBack: this.getFormCity,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            }, 
            state: {
                name: signUpStrings.inputForms.address,
                parentCallBack: this.getFormState,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            }, 
            numBed: {
                name: signUpStrings.inputForms.address,
                parentCallBack: this.getFormNumBed,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            }, 
            numBath: {
                name: signUpStrings.inputForms.address,
                parentCallBack: this.getFormNumBath,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
            }, 
        }
    }
    
    render() {
        return <View>
            <Card
                showCloseButton= {true}
                title= "Create New Property"
                closeButtonPressedCallBack={() => this.props._onChangeModalVisibility(false)}
                >
            </Card>
        </View>
    }
}

function setInputStyles(colorTheme?: BaseStyles.ColorTheme){
    let colors = (colorTheme == null) ? BaseStyles.LightColorTheme : colorTheme
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
    })
}
