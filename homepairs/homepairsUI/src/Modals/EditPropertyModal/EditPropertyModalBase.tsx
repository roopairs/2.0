import React from "react";
import { ScrollView, StyleSheet, SafeAreaView, Platform, StatusBar, Dimensions, View } from "react-native";
import {ThinButton, ThinButtonProps, Card, InputForm, GoogleInputForm } from 'homepairs-elements';
import strings from 'homepairs-strings';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairsDimensions, Property, EditPropertyState } from 'homepairs-types';
import Colors from 'homepairs-colors';
import {HelperText} from 'react-native-paper';
import { isPositiveWholeNumber, isNullOrUndefined, isEmptyOrSpaces, NavigationRouteScreenProps, NavigationRouteHandler } from 'homepairs-utilities';
import { InputFormProps } from 'src/Elements/Forms/InputForm';
import {navigationPages} from 'homepairs-routes';

const {SingleProperty} = navigationPages;

export type EditPropertyDispatchProps = {
    onEditProperty: (newProperty: Property, info: EditPropertyState, 
        displayError: (msg: string) => void, navigation: NavigationRouteHandler) => void
}


type Props =  NavigationRouteScreenProps & EditPropertyDispatchProps & EditPropertyState;

type EditState = {
    address: string, 
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
            alignSelf:'center',
        },
        scrollStyle: {
            marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            flex: 1,
            width: '100%',
        },
        scrollContentContainerStyle: {
            maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            width: BaseStyles.ContentWidth.reg,
            paddingVertical: BaseStyles.MarginPadding.large,
            flexGrow: Platform.OS === 'web' ? null : 1, // Needed to center the contents of the scroll container
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
            width: BaseStyles.ContentWidth.thin,
            marginTop: BaseStyles.MarginPadding.small,
            marginBottom: BaseStyles.MarginPadding.smallConst,
            alignSelf: 'center',
            justifyContent: 'center',
        },
        errorStyle: {
            fontFamily: BaseStyles.FontTheme.secondary, 
            fontSize: 16,
        },
    });
}

export default class EditNewPropertyModalBase extends React.Component<Props, EditState> {
    inputFormStyle;

    addressRef;

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
        this.getFormNumBed = this.getFormNumBed.bind(this);
        this.getFormNumBath = this.getFormNumBath.bind(this);
        this.getFormMaxTenants = this.getFormMaxTenants.bind(this);
        this.displayError = this.displayError.bind(this);
        this.resetForms = this.resetForms.bind(this);
        this.setInitialState = this.setInitialState.bind(this);
        const {oldProp} = this.props;
        const {address, bedrooms, bathrooms, tenants} = oldProp;
        this.state = {
            address, 
            bedrooms: bedrooms.toString(), 
            bathrooms: bathrooms.toString(),
            tenants: tenants.toString(),
            errorMsg: '',
            errorCheck: false,
        };
        this.addressRef = React.createRef();
        this.bedRef = React.createRef();
        this.bathRef = React.createRef();
        this.tenantRef = React.createRef();
    } 

    getFormAddress(childData : string) {
        this.setState({address: childData});
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

    goBackToPreviousPage() {
        const{navigation} = this.props;
        const propId = navigation.getParam('propId');
        navigation.resolveModalReplaceNavigation(SingleProperty, {propId});
    }

    setInitialState() {
        const {oldProp} = this.props;
        const {address, bedrooms, bathrooms, tenants} = oldProp;
        this.setState({
            address,
            bedrooms: bedrooms.toString(), 
            bathrooms: bathrooms.toString(),
            tenants: tenants.toString(),
        });
    }

    validateForms() {
        const {address, bedrooms, bathrooms, tenants} = this.state;
        let check = true;
        if (isEmptyOrSpaces(address)) {
            this.addressRef.current.setError(true);
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
        this.tenantRef.current.setError(false);
        this.bedRef.current.setError(false);
        this.bathRef.current.setError(false);
    }

    displayError(msg: string) {
        this.setState({errorMsg: msg, errorCheck: true});
    }

    clickSubmitButton() {
        const {email, navigation, onEditProperty, index, oldProp, roopairsToken} = this.props;
        const {address, bedrooms, bathrooms, tenants} = this.state;
        this.resetForms();
        if (this.validateForms()) {
            const newProperty : Property = {
                propId: oldProp.propId,
                address,
                bedrooms: Number(bedrooms), 
                bathrooms: Number(bathrooms), 
                tenants: Number(tenants),
            };
            const info : EditPropertyState = { email, index, oldProp, roopairsToken};
            onEditProperty(newProperty, info, this.displayError, navigation);
        } 
    }

    renderInputForms() {
        const {bedrooms, bathrooms, tenants} = this.state;
        const inputForms: InputFormProps[]  = [ 
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

    renderAddressForm() {
        const {address} = this.state;
        return (
            <GoogleInputForm 
                ref={this.addressRef}
                key={inputFormStrings.address}
                name={inputFormStrings.address}
                parentCallBack={this.getFormAddress}
                formTitleStyle={this.inputFormStyle.formTitle}
                inputStyle={this.inputFormStyle.input}
                value={address}
                errorMessage='Address cannot be empty'        
            />
        );
    }

    renderError () {
        const {errorMsg, errorCheck} = this.state;
        return <View style={{alignSelf:'center'}}>
            <HelperText type='error' visible={errorCheck} style={this.inputFormStyle.errorStyle}>{errorMsg}</HelperText>
        </View>;
    }
    
    render() {
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
                        this.goBackToPreviousPage();
                        this.setInitialState();
                        this.resetForms();
                    }}>
                    {this.renderAddressForm()}
                    <>{this.renderInputForms()}</>
                    {this.renderError()}
                    <ThinButton
                    name={this.submitButton.name}
                    onClick={this.submitButton.onClick}
                    buttonStyle={this.submitButton.buttonStyle}
                    buttonTextStyle={this.submitButton.buttonTextStyle}
                    containerStyle={this.submitButton.containerStyle}
                    />
                </Card>
            </ScrollView>
        </SafeAreaView>);
    }
}