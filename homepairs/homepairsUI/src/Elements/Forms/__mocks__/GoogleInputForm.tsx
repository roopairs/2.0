import React from 'react';
import { Text, ViewStyle, StyleSheet, View} from 'react-native';
import {FontTheme} from 'homepairs-base-styles';
import InputForm from '../InputForm';
import * as BaseStyles from 'homepairs-base-styles';

export type GoogleInputFormProps = {
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
    locationsContainer?: any
};
type GoogleInputFormState = {
    value?: string;
    error?: boolean;
};
const initialState: GoogleInputFormState = { value: '', error: false};

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
    locationsContainers: {
        maxHeight: 180,
        borderLeftColor: BaseStyles.LightColorTheme.lightGray,
        borderLeftWidth: 1, 
        borderRightColor: BaseStyles.LightColorTheme.lightGray,
        borderRightWidth: 1,
    },
});


/**
 * ------------------------------------------------------------
 * Google Input Form Mock
 * ------------------------------------------------------------
 * A mock component that will be used in place of the GoogleInputForm. 
 * */
export default class GoogleInputFormMock extends React.Component<GoogleInputFormProps, GoogleInputFormState> {

    static defaultProps: GoogleInputFormProps;

    constructor(props){
        super(props);
        this.state = {...initialState};
        this.setError = this.setError.bind(this);
    }

    setError(input: boolean) {
        this.setState({error: input});
    }

    renderName() {
        const {name, formTitleStyle} = this.props;
        if (name == null) return <></>;
        return <Text testID='autocomplete-text'style={formTitleStyle}>{name}</Text>;
    }
    
    render(){
        return (
           // eslint-disable-next-line react/jsx-props-no-spreading
           <View testID='autocomplete-text-input'>
            <InputForm {...this.props} />
           </View>
        );
    }
}

GoogleInputFormMock.defaultProps = {
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
    locationsContainer: DefaultInputFormStyle.locationsContainers,
    value: undefined,
    placeholder: null,
    errorMessage: 'Placeholder error message',
};