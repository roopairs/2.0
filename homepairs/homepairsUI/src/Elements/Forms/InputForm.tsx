import React, {useState} from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import { Text, View, TextInput, ViewStyle, TextInputProps, StyleSheet } from 'react-native';

export type InputFormProps = {
    name?: String,
    parentCallBack?: (child: String) => any,
    secureTextEntry?: boolean,
    formTitleStyle? : ViewStyle,
    containerStyle? : ViewStyle,
    inputStyle? : ViewStyle,
}

type InputFormState = {
    value?: String 
}

const initialState : InputFormState = {value: ''}

export default function InputForm(props: InputFormProps) {
    const [value, sendData] : [InputFormState, any] = useState(initialState)
    
    function passInputValue(text:String) : void{
        sendData(text)
        props.parentCallBack(text)
    }
 
    function renderName(){
        if(props.name == null){
            return(<></>)
        }
        return(
            <Text 
            style={ props.formTitleStyle == null ? DefaultInputFormStyle.formTitle : props.formTitleStyle}>
                { props.name }
            </Text>
        );
    }

    function textInputProps() : TextInputProps {
        return {
            style: props.inputStyle == null ? DefaultInputFormStyle.input: props.inputStyle,
            underlineColorAndroid: 'transparent',
            autoCapitalize: "none",
            secureTextEntry: props.secureTextEntry,
            onChangeText: passInputValue,
        }
    }


    return(
        <View style={ props.containerStyle == null ? DefaultInputFormStyle.container : props.containerStyle}>
            {renderName()}
            <TextInput {...textInputProps()}/>
        </View>
    );
}

const DefaultInputFormStyle = StyleSheet.create({
    container: {
       marginBottom: '3.5%', 
       paddingTop: 1,
       paddingHorizontal: 3,
       borderRadius: 4,
       width: '100%',
       opacity: 50,
    },
    formTitle: {
      marginVertical: '3.5%', 
      fontFamily: 'nunito_regular', 
      color: '#AFB3B5',
    },
    input: {
       alignItems: 'center',
       alignSelf: 'center',
       margin: 1,
       minWidth:40,
       width: '100%',
       height: 40,
       borderColor: '#AFB3B5',
       borderWidth: 1,
       borderRadius: 4,
       paddingHorizontal: 10,
    },
});