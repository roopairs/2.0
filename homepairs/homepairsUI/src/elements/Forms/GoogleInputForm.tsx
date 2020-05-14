import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import React from 'react';
import { AppState } from 'homepairs-types';
import { connect } from 'react-redux';
import { Text, View, TextInput, ViewStyle, StyleSheet, ScrollView } from 'react-native';
import {HelperText} from 'react-native-paper';
import {FontTheme} from 'homepairs-base-styles';
import * as BaseStyles from 'homepairs-base-styles';
import LocationItem from '../LocationItem/LocationItem';

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
    apiKey?: string,
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
        maxHeight: 230,
        borderLeftColor: BaseStyles.LightColorTheme.lightGray,
        borderLeftWidth: 1, 
        borderRightColor: BaseStyles.LightColorTheme.lightGray,
        borderRightWidth: 1,
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
class GoogleInputFormBase extends React.Component<GoogleInputFormProps, GoogleInputFormState> {

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
        const {
            secureTextEntry,
            containerStyle,
            inputStyle,
            errorStyle,
            placeholder,
            value,
            errorMessage,
            parentCallBack,
            locationsContainer,
            apiKey,
        } = this.props;
        const {error} = this.state;

        return (
            <GoogleAutoComplete apiKey={apiKey}
                components="country:us" >
                {({ handleTextChange, locationResults, clearSearch }) => (
                    <React.Fragment key='google autocomplete'>
                        <View testID='autocomplete-view' style={containerStyle}>
                            {this.renderName()}
                            <TextInput
                                testID='autocomplete-text-input'
                                style={inputStyle}
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                                value={value}
                                placeholder={placeholder}
                                secureTextEntry={secureTextEntry}
                                onChangeText={(text) => {
                                    handleTextChange(text);
                                    parentCallBack(text);
                                }}
                            />
                            <ScrollView testID='autocomplete-scrollview' style={locationsContainer}>
                                {locationResults.map((el, i) => (
                                <LocationItem
                                    testID='autocomplete-location-item'
                                    description={el.description}
                                    key={String(i)}
                                    parentCallBack={parentCallBack}
                                    clearSearch={clearSearch}
                                />
                                ))}
                            </ScrollView>
                            <HelperText
                                testID= 'autocomplete-helper-text'
                                type= 'error'
                                visible={error}
                                style={errorStyle}
                            >
                            {errorMessage}
                            </HelperText>
                        </View>
                    </React.Fragment>
                )}
            </GoogleAutoComplete>
        );
    }
}

function mapStateToProps(state: AppState): GoogleInputFormProps {
    return {
        apiKey: state.settings.apiKey,
    };
}

const GoogleInputForm = connect(mapStateToProps)(GoogleInputFormBase);
export default GoogleInputForm;

GoogleInputFormBase.defaultProps = {
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