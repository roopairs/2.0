import React, { Component } from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import { StyleSheet, Text, View, TextInput, ViewStyle } from 'react-native';
import {DefaultInputFormStyle} from './UIComponentStyles'

interface InputFormProp{
    name?: String,
    parentCallBack?: (child: String) => any,
    secureTextEntry?: boolean,
    formTitleStyle? : ViewStyle,
    containerStyle? : ViewStyle,
    inputStyle? : ViewStyle,
}

interface InpuptFormState{
    value?: String 
}

export default class InputForm extends Component<InputFormProp, InpuptFormState>{
    constructor(props : Readonly<InputFormProp>){
        super(props)
        this.state = {
            value : '',
        }
    }

    getSecureTextEntry(){
        return (this.props.secureTextEntry == null) ? false : this.props.secureTextEntry
    }
    sendData(text){
        this.props.parentCallBack(text)
    }


    render(){
        if(this.props.name == null){
            return(
                <View style={(this.props.containerStyle == null) ? DefaultInputFormStyle.container : this.props.containerStyle}>
                    <TextInput 
                    style = {(this.props.inputStyle == null) ? DefaultInputFormStyle.input: this.props.inputStyle}
                    underlineColorAndroid = "transparent"
                    autoCapitalize = "none"
                    secureTextEntry = {this.getSecureTextEntry()}
                    onChangeText = {(text) => this.sendData(text)}/>
                </View>
            );
        } else {
            return(
                <View style={(this.props.containerStyle == null) ? DefaultInputFormStyle.container : this.props.containerStyle}>
                    <Text 
                    style={(this.props.formTitleStyle == null) ? DefaultInputFormStyle.formTitle : this.props.formTitleStyle}>
                        {this.props.name}
                        </Text>
                    <TextInput 
                    style = {(this.props.inputStyle == null) ? DefaultInputFormStyle.input: this.props.inputStyle}
                    underlineColorAndroid = "transparent"
                    autoCapitalize = "none"
                    secureTextEntry = {this.getSecureTextEntry()}
                    onChangeText = {(text) => this.sendData(text)}/>
                </View>
            );
        }
    }
}