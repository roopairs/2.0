import React from 'react';
import { Text, View, TextInput, ViewStyle, StyleSheet } from 'react-native';
import {HelperText} from 'react-native-paper';
import {FontTheme} from 'homepairs-base-styles';

export type InputFormProps = {
    key?: any,
    name?: string;
    ref?: any,
    parentCallBack?: (child: string) => any;
    secureTextEntry?: boolean;
    formTitleStyle?: ViewStyle;
    containerStyle?: ViewStyle;
    inputStyle?: ViewStyle;
    errorStyle?: any;
    placeholder?: string;
    value?: string;
    errorMessage?: string;
};
type InputFormState = {
    value?: string;
    error?: boolean;
};
const initialState: InputFormState = { value: '', error: false};

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
        minWidth: 40,
        width: '100%',
        height: 40,
        borderColor: '#AFB3B5',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 10,
    },
    errorStyle: {
        fontFamily: FontTheme.secondary, 
        fontSize: 14,
    },
});


/**
 * ------------------------------------------------------------
 * Input Form
 * ------------------------------------------------------------
 * Renders an area where the user is able to input keyboard data.
 * It inherits most of its functionality from the TextInput state but
 * allows for a stylized version of it. It also is capable of rendering
 * title for the state for UI clarity through the name property.
 *
 * 
 * */
export default class InputForm extends React.Component<InputFormProps, InputFormState> {

    textInput

    static defaultProps: InputFormProps;

    constructor(props){
        super(props);
        this.state = {...initialState};
        this.setError = this.setError.bind(this);
    }

    setError(input: boolean) {
        this.setState({error: input});
    }

    passInputValue(text: string): void {
        const {parentCallBack} = this.props;
        parentCallBack(text);
    }

    renderName() {
        const {name, formTitleStyle} = this.props;
        if (name == null) return <></>;
        return <Text style={formTitleStyle}>{name}</Text>;
    }
    
    render(){
        const {
            secureTextEntry,
            containerStyle,
            inputStyle,
            errorStyle,
            placeholder,
            value,
            errorMessage,
        } = this.props;
        const {error} = this.state;

        return (
            <View style={containerStyle}>
                {this.renderName()}
                <TextInput
                    testID='userTextInput'
                    style={inputStyle}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    value={value}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    onChangeText={text => {this.passInputValue(text);}}
                />
                <HelperText
                    type= 'error'
                    visible={error}
                    style={errorStyle}
                >
                {errorMessage}
                </HelperText>
            </View>
        );
    }
}

InputForm.defaultProps = {
    ref: undefined,
    key: null,
    name: null,
    parentCallBack: (child: string) => {
        return child;
    },
    secureTextEntry: false,
    formTitleStyle: DefaultInputFormStyle.formTitle,
    containerStyle: DefaultInputFormStyle.container,
    inputStyle: DefaultInputFormStyle.input,
    errorStyle: DefaultInputFormStyle.errorStyle,
    value: undefined,
    placeholder: null,
    errorMessage: 'Placeholder error message',
};


/**
 * ------------------------------------------------------------
 * renderInputForm (deprecated)
 * ------------------------------------------------------------
 * @deprecated Please do not use this function. We are going to remove it in 
 * future use. 
 */
export function renderInputForm(formProps: InputFormProps) {
    console.log("Warning: renderInputForm is deprecated and will be removed upon the next release.");
    const {ref, name, parentCallBack, formTitleStyle, inputStyle, secureTextEntry, value, placeholder, key, errorStyle, errorMessage} = formProps;
    return (
        <InputForm
            ref={ref}
            key={key}
            name={name}
            parentCallBack={parentCallBack}
            formTitleStyle={formTitleStyle}
            inputStyle={inputStyle}
            errorStyle={errorStyle}
            secureTextEntry={secureTextEntry}
            value={value}
            placeholder={placeholder}
            errorMessage={errorMessage}
        />
    );
}
