import React, { useState } from 'react';
import { Text, View, TextInput, ViewStyle, StyleSheet } from 'react-native';

export type InputFormProps = {
    name?: String;
    parentCallBack?: (child: String) => any;
    secureTextEntry?: boolean;
    formTitleStyle?: ViewStyle;
    containerStyle?: ViewStyle;
    inputStyle?: ViewStyle;
};
type InputFormState = {
    value?: String;
};
const initialState: InputFormState = { value: '' };

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
export default function InputForm(props: InputFormProps) {
    // Below shows how to ignore a returned value in an array/ dictionary
    const [, sendData]: [InputFormState, any] = useState(initialState);
    const {
        name,
        parentCallBack,
        secureTextEntry,
        formTitleStyle,
        containerStyle,
        inputStyle,
    } = props;

    function passInputValue(text: String): void {
        sendData(text);
        parentCallBack(text);
    }

    function renderName() {
        if (name == null) return <></>;

        return <Text style={formTitleStyle}>{name}</Text>;
    }

    return (
        <View style={containerStyle}>
            {renderName()}
            <TextInput
                testID='userTextInput'
                style={inputStyle}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                secureTextEntry={secureTextEntry}
                onChangeText={passInputValue}
            />
        </View>
    );
}

InputForm.defaultProps = {
    name: null,
    parentCallBack: (child: string) => {
        return child;
    },
    secureTextEntry: false,
    formTitleStyle: DefaultInputFormStyle.formTitle,
    containerStyle: DefaultInputFormStyle.container,
    inputStyle: DefaultInputFormStyle.input,
};

export function renderInputForm(formProps: InputFormProps) {
    const {
        name,
        parentCallBack,
        formTitleStyle,
        inputStyle,
        secureTextEntry,
    } = formProps;
    return (
        <InputForm
            name={name}
            parentCallBack={parentCallBack}
            formTitleStyle={formTitleStyle}
            inputStyle={inputStyle}
            secureTextEntry={secureTextEntry}
        />
    );
}
