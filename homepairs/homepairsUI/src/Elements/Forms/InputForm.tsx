import React from 'react';
import { Text, View, TextInput, ViewStyle, StyleSheet } from 'react-native';

export type InputFormProps = {
    key?: any,
    name?: string;
    onRef?: (ref:any) => any,
    parentCallBack?: (child: string) => any;
    secureTextEntry?: boolean;
    formTitleStyle?: ViewStyle;
    containerStyle?: ViewStyle;
    inputStyle?: ViewStyle;
    placeholder?: string;
    value?: string;
};
type InputFormState = {
    value?: string;
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
export default class InputForm extends React.Component<InputFormProps, InputFormState> {

    textInput

    static defaultProps: InputFormProps;

    constructor(props){
        super(props);
        this.state = {...initialState};
    }

    componentDidMount(){
        const {onRef} = this.props;
        onRef(this);
    }

    passInputValue(text: string): void {
        const {parentCallBack} = this.props;
        parentCallBack(text);
    }

    clearText(){
        this.textInput.setNativeProps({text: ''});
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
            placeholder,
            value,
        } = this.props;
    return (
        <View style={containerStyle}>
            {this.renderName()}
            <TextInput
                testID='userTextInput'
                ref={(ref)=> {this.textInput = ref;}}
                style={inputStyle}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                value={value}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                onChangeText={text => {this.passInputValue(text);}}
            />
        </View>
    );
    }
}

InputForm.defaultProps = {
    key: null,
    name: null,
    onRef: ref => {return ref;},
    parentCallBack: (child: string) => {
        return child;
    },
    secureTextEntry: false,
    formTitleStyle: DefaultInputFormStyle.formTitle,
    containerStyle: DefaultInputFormStyle.container,
    inputStyle: DefaultInputFormStyle.input,
    value: null,
    placeholder: null,
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
    const { name, parentCallBack, formTitleStyle, inputStyle, secureTextEntry, onRef, value, placeholder, key} = formProps;
    return (
        <InputForm
            key={key}
            name={name}
            onRef={onRef}
            parentCallBack={parentCallBack}
            formTitleStyle={formTitleStyle}
            inputStyle={inputStyle}
            secureTextEntry={secureTextEntry}
            value={value}
            placeholder={placeholder}
        />
    );
}
