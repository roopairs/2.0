import React from 'react';
import { Text, View, TextInput, ViewStyle, StyleSheet } from 'react-native';
import {HelperText} from 'react-native-paper';
import {FontTheme} from 'homepairs-base-styles';

export type InputFormProps = {
    key?: any;
    name?: string;
    ref?: any;
    testID?: string;
    parentCallBack?: (child: string) => any;
    secureTextEntry?: boolean;
    formTitleStyle?: ViewStyle;
    containerStyle?: ViewStyle;
    inputStyle?: ViewStyle;
    errorStyle?: any;
    placeholder?: string;
    value?: string;
    errorMessage?: string;
    numberOfLines?: number;
    multiline?: boolean;
    trim?: boolean;
    maxLength?: number;
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
    hide: {
        display: 'none',
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
export class InputForm extends React.Component<InputFormProps, InputFormState> {

    textInput;

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
        const {parentCallBack, trim} = this.props;
        parentCallBack( trim ? text.trim() : text);
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
            numberOfLines,
            multiline,
            maxLength,
        } = this.props;
        const {error} = this.state;

        return (
            <View style={containerStyle}>
                {this.renderName()}
                <TextInput
                    testID='user-text-input'
                    style={inputStyle}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    value={value}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    numberOfLines={numberOfLines}
                    multiline={multiline}
                    maxLength={maxLength}
                    onChangeText={text => {this.passInputValue(text);}}
                />
                <HelperText
                    testID= 'helper-text'
                    type= 'error'
                    visible={error}
                    style={error ? errorStyle : DefaultInputFormStyle.hide}
                    padding='none'
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
    testID: null,
    secureTextEntry: false,
    formTitleStyle: DefaultInputFormStyle.formTitle,
    containerStyle: DefaultInputFormStyle.container,
    inputStyle: DefaultInputFormStyle.input,
    errorStyle: DefaultInputFormStyle.errorStyle,
    value: undefined,
    placeholder: null,
    numberOfLines: 1,
    multiline: false,
    trim: false,
    maxLength: 200,
    errorMessage: 'Placeholder error message',
};
