import React from "react";
import { ScrollView, StyleSheet, SafeAreaView, Platform, StatusBar, Dimensions, View } from "react-native";
import {ThinButton, ThinButtonProps, Card, InputForm } from 'homepairs-elements';
import strings from 'homepairs-strings';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairsDimensions, Property, EditPropertyState } from 'homepairs-types';
import Colors from 'homepairs-colors';
import {HelperText} from 'react-native-paper';
import {isPositiveWholeNumber, isNullOrUndefined, isEmptyOrSpaces} from 'homepairs-utilities';
import { NavigationStackProp, NavigationStackScreenProps } from 'react-navigation-stack';
import { InputFormProps } from 'src/Elements/Forms/InputForm';

export type EditPropertyDispatchProps = {
    onEditProperty: (newProperty: Property, info: EditPropertyState, 
        displayError: (msg: string) => void, navigation: NavigationStackProp) => void
}


type Props =  NavigationStackScreenProps & EditPropertyDispatchProps & EditPropertyState;

type EditState = {
    address: string, 
    city: string,
    state: string, 
    bedrooms: string, 
    bathrooms: string, 
    tenants: string,
    errorMsg: string,
    errorCheck: boolean,
};


const editPropertyStrings = strings.detailedPropertyPage.editProperty;
const inputFormStrings = editPropertyStrings.inputForm;

function setInputStyles(colorTheme?: BaseStyles.ColorTheme){
    const {width} = Dimensions.get('window');
    const colors = isNullOrUndefined(colorTheme) ? BaseStyles.LightColorTheme : colorTheme;
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
            flex: 1,
            maxWidth: HomePairsDimensions.MAX_PALLET,
            width: Platform.OS === 'web' ? width : BaseStyles.ContentWidth.max,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf:'center',
        },
        scrollStyle: {
            marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            alignSelf: 'center',
            width: '100%',
        },
        scrollContentContainerStyle: {
            maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            width: BaseStyles.ContentWidth.reg,
            paddingVertical: BaseStyles.MarginPadding.large,
            flexGrow: 1, // Needed to center the contents of the scroll container
        },
        cardContainer: {
            backgroundColor: 'white',
            maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
            width: BaseStyles.ContentWidth.reg,
            marginHorizontal: '5%',
            borderRadius: 7,
            shadowColor: 'black',
            shadowRadius: 20,
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 100,
            elevation: 9,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flex: 1,
        },
        cardTitle: {
            color: colors.tertiary,
            fontFamily: 'nunito-regular',
            fontSize: 20,
        },
        cardTitleContainer: {
            width: BaseStyles.ContentWidth.max,
            borderBottomColor: '#AFB3B5',
            paddingVertical: BaseStyles.MarginPadding.largeConst,
            paddingHorizontal: BaseStyles.MarginPadding.largeConst,
            borderBottomWidth: 1,
            alignSelf: 'center',
            maxHeight: 75,
            minHeight: 50,
            justifyContent: 'flex-start',
        },
        cardWrapperStyle: {
            // flex:1,
            width: BaseStyles.ContentWidth.thin,
            marginTop: BaseStyles.MarginPadding.small,
            marginBottom: BaseStyles.MarginPadding.smallConst,
            alignSelf: 'center',
            justifyContent: 'center',
        },
    });
}

export default class EditNewPropertyModalBase extends React.Component<Props, EditState> {
    inputFormStyle;

    addressRef;

    stateRef;

    cityRef;

    bedRef;

    bathRef;

    tenantRef;

    oldProperty: Property;

    submitButton : ThinButtonProps = {
        name: editPropertyStrings.title, 
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
            fontSize: BaseStyles.FontTheme.reg,
            alignSelf: 'center',
        },
        containerStyle: {
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: BaseStyles.MarginPadding.largeConst,
            marginBottom: BaseStyles.MarginPadding.xlarge,
            minHeight: 50,
        },
    };

    constructor(props: Readonly<Props>) {
        super(props);
        this.inputFormStyle = setInputStyles(null);
        this.getFormAddress = this.getFormAddress.bind(this);
        this.getFormCity = this.getFormCity.bind(this);
        this.getFormState = this.getFormState.bind(this);
        this.getFormNumBed = this.getFormNumBed.bind(this);
        this.getFormNumBath = this.getFormNumBath.bind(this);
        this.getFormMaxTenants = this.getFormMaxTenants.bind(this);
        this.displayError = this.displayError.bind(this);
        this.resetForms = this.resetForms.bind(this);
        this.setInitialState = this.setInitialState.bind(this);
        const {oldProp} = this.props;
        const {streetAddress, city, state, bedrooms, bathrooms, tenants} = oldProp;
        this.state = {
            address: streetAddress, 
            city, 
            state, 
            bedrooms: bedrooms.toString(), 
            bathrooms: bathrooms.toString(),
            tenants: tenants.toString(),
            errorMsg: '',
            errorCheck: false,

        };
        this.addressRef = React.createRef();
        this.stateRef = React.createRef();
        this.cityRef = React.createRef();
        this.bedRef = React.createRef();
        this.bathRef = React.createRef();
        this.tenantRef = React.createRef();
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

    getFormMaxTenants(childData: string) {
        this.setState({tenants: childData});
    }

    getFormNumBath(childData: string) {
        this.setState({bathrooms: childData});
    } 

    setInitialState() {
        const {oldProp} = this.props;
        const {streetAddress: address, city, state, bedrooms, bathrooms, tenants} = oldProp;
        this.setState({
            address, city, state, 
            bedrooms: bedrooms.toString(), 
            bathrooms: bathrooms.toString(),
            tenants: tenants.toString(),
        });
    }

    validateForms() {
        const {address, city, state, bedrooms, bathrooms, tenants} = this.state;
        let check = true;
        if (isEmptyOrSpaces(address)) {
            this.addressRef.current.setError(true);
            check = false;
        } 
        if (isEmptyOrSpaces(city)) {
            this.cityRef.current.setError(true);
            check = false;
        } 
        if (isEmptyOrSpaces(state)) {
            this.stateRef.current.setError(true);
            check = false;
        } 
        if (!isPositiveWholeNumber(bedrooms)) {
            this.bedRef.current.setError(true);
            check = false;
        } 
        if (!isPositiveWholeNumber(bathrooms)) {
            this.bathRef.current.setError(true);
            check = false;
        }
        if (!isPositiveWholeNumber(tenants)) {
            this.tenantRef.current.setError(true);
            check = false;
        }
        return check;
    }

    resetForms() {
        this.addressRef.current.setError(false);
        this.cityRef.current.setError(false);
        this.stateRef.current.setError(false);
        this.tenantRef.current.setError(false);
        this.bedRef.current.setError(false);
        this.bathRef.current.setError(false);
    }

    displayError(msg: string) {
        this.setState({errorMsg: msg, errorCheck: true});
    }

    clickSubmitButton() {
        const {email, navigation, onEditProperty, index, oldProp, roopairsToken} = this.props;
        const {address, state, city, bedrooms, bathrooms, tenants} = this.state;
        this.resetForms();
        if (this.validateForms()) {
            const newProperty : Property = {
                propId: oldProp.propId,
                streetAddress: address, state, city, 
                bedrooms: Number(bedrooms), 
                bathrooms: Number(bathrooms), 
                tenants: Number(tenants),
            };
            const info : EditPropertyState = { email, index, oldProp, roopairsToken};
            onEditProperty(newProperty, info, this.displayError, navigation);
        } 
    }

    renderInputForms() {
        const {address, city, state, bedrooms, bathrooms, tenants} = this.state;
        const inputForms: InputFormProps[]  = [
            {
                ref: this.addressRef,
                key: inputFormStrings.address,
                name: inputFormStrings.address,
                parentCallBack: this.getFormAddress,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                value: address,
                errorMessage: 'Address cannot be empty',
            }, 
            {
                ref: this.cityRef,
                key: inputFormStrings.city,
                name: inputFormStrings.city,
                parentCallBack: this.getFormCity,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                value: city,
                errorMessage: 'City cannot be empty',
            }, 
            {
                ref: this.stateRef,
                key: inputFormStrings.state,
                name: inputFormStrings.state,
                parentCallBack: this.getFormState,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                value: state, 
                errorMessage: 'State cannot be empty',
            }, 
            {
                ref: this.tenantRef,
                key: inputFormStrings.maxTenants,
                name: inputFormStrings.maxTenants,
                parentCallBack: this.getFormMaxTenants,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                value: tenants,
                errorMessage: 'Tenants must be a number',
            },
            {
                ref: this.bedRef,
                key: inputFormStrings.bedrooms,
                name: inputFormStrings.bedrooms,
                parentCallBack: this.getFormNumBed,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                value: bedrooms,
                errorMessage: 'Bedrooms must be a number',
            }, 
            {
                ref: this.bathRef,
                key: inputFormStrings.bathrooms,
                name: inputFormStrings.bathrooms,
                parentCallBack: this.getFormNumBath,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                value: bathrooms,
                errorMessage: 'Bathrooms must be a number',
            }, 
        ];

        /**
         * NOTE: As with AddNewProperty Modal I have also changed the EditPropertyModal to use the actual Inputform instead 
         * of the helper function. 
         */
        return inputForms.map(inputFormProp => {
            const {ref, key, name, parentCallBack, formTitleStyle, inputStyle,errorMessage, secureTextEntry, errorStyle, value, placeholder} = inputFormProp;
            return <InputForm
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
                        errorMessage={errorMessage}/>;
        });
    }

    renderError () {
        const {errorMsg, errorCheck} = this.state;
        return <View style={{alignSelf:'center'}}>
            <HelperText type='error' visible={errorCheck} style={this.inputFormStyle.errorStyle}>{errorMsg}</HelperText>
        </View>;
    }
    
    render() {
        const {navigation} = this.props;
        const showCloseButton = true;
        return(
            <SafeAreaView style={this.inputFormStyle.modalContainer}>
            <ScrollView style={this.inputFormStyle.scrollStyle}
            contentContainerStyle={this.inputFormStyle.scrollContentContainerStyle}
            showsHorizontalScrollIndicator={false}>
                <Card
                    containerStyle={this.inputFormStyle.cardContainer}
                    showCloseButton={showCloseButton}
                    titleStyle={this.inputFormStyle.cardTitle}
                    titleContainerStyle={this.inputFormStyle.cardTitleContainer}
                    wrapperStyle={this.inputFormStyle.cardWrapperStyle}
                    title={editPropertyStrings.title}
                    closeButtonPressedCallBack={() => {
                        navigation.goBack();
                        this.setInitialState();
                        this.resetForms();
                    }}>
                    <>{this.renderInputForms()}</>
                    {this.renderError()}
                    {ThinButton(this.submitButton)}
                </Card>
            </ScrollView>
        </SafeAreaView>);
    }
}