import React from "react";
import { ScrollView, StyleSheet, SafeAreaView, Platform, StatusBar, View } from "react-native";
import {InputFormProps, ThinButton, ThinButtonProps, Card, InputForm } from 'homepairs-elements';
import strings from 'homepairs-strings';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairsDimensions, Property } from 'homepairs-types';
import Colors from 'homepairs-colors';
import {isNumber, isEmptyOrSpaces} from 'homepairs-utilities';
import { ModalInjectedProps } from "../WithModal/WithModal";
import { DarkModeInjectedProps } from "../../WithDarkMode/WithDarkMode";
import { isNullOrUndefined } from '../../../../utility/ParameterChecker';

export type EditPropertyDispatchProps = {
    onEditProperty: (oldProperty: Property, newProperty: Property, propIndex: number, email: string, onChangeModalVisibility: (check: boolean) => void) => void
}

export type EditPropertyStateProps = {
    email : string;
    index: number;
    oldProp: Property;
}

type Props = ModalInjectedProps & DarkModeInjectedProps & EditPropertyDispatchProps & EditPropertyStateProps;

type State = {
    address: string;
    city: string;
    state: string;
    tenants: string;
    bedrooms: string;
    bathrooms: string;
}

const editPropertyStrings = strings.detailedPropertyPage.editProperty;
const inputFormStrings = editPropertyStrings.inputForm;

function setInputStyles(colorTheme?: BaseStyles.ColorTheme){
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
            width: '100%',
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
            width: BaseStyles.ContentWidth.max,
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
            justifyContent: 'flex-start',
        },
        cardWrapperStyle: {
            width: BaseStyles.ContentWidth.thin,
            marginVertical: BaseStyles.MarginPadding.smallConst,
            alignSelf: 'center',
            justifyContent: 'center',
        },
    });
}

function checkIfPositiveNumber(arg: string): boolean{
    return (isNumber(arg) && Number(arg) > 0);
 }

export default class EditNewPropertyModalBase extends React.Component<Props, State> {
    inputFormStyle

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
        this.inputFormStyle = setInputStyles(props.primaryColorTheme);
        this.getFormAddress = this.getFormAddress.bind(this);
        this.getFormCity = this.getFormCity.bind(this);
        this.getFormState = this.getFormState.bind(this);
        this.getFormNumBed = this.getFormNumBed.bind(this);
        this.getFormNumBath = this.getFormNumBath.bind(this);
        this.getFormMaxTenants = this.getFormMaxTenants.bind(this);
        this.oldProperty = props.oldProp;
        this.state = {
            address: this.oldProperty.address,
            city: this.oldProperty.city,
            state: this.oldProperty.city,
            bathrooms: this.oldProperty.bathrooms.toString(),
            bedrooms: this.oldProperty.bedrooms.toString(),
            tenants: this.oldProperty.tenants.toString(),
        };
    } 

    getFormAddress(childData : string) {
        const address = isEmptyOrSpaces(childData) ? this.oldProperty.address : childData;
        this.setState({address});
    }

    getFormCity(childData : string) {
        const city = isEmptyOrSpaces(childData) ? this.oldProperty.city : childData;
        this.setState({city});
    }

    getFormState(childData : string) {
        const state = isEmptyOrSpaces(childData) ? this.oldProperty.state : childData;
        this.setState({state});
    }

    getFormNumBed(childData : string) {
        const oldBedrooms = this.oldProperty.bedrooms.toString();
        const bedrooms = isEmptyOrSpaces(childData) ? oldBedrooms : childData;
        this.setState({bedrooms});
    }

    getFormNumBath(childData : string) {
        const oldBathrooms = this.oldProperty.bathrooms.toString();
        const bathrooms = isEmptyOrSpaces(childData) ? oldBathrooms : childData;
        this.setState({bathrooms});
    }

    getFormMaxTenants(childData: string) {
        const oldTenants = this.oldProperty.tenants.toString();
        const tenants = isEmptyOrSpaces(childData) ? oldTenants : childData;
        this.setState({tenants});
   
    }

    validateInput(){
        // TODO: Validate the input for Valid Address, City, and State Using the Google Maps API
        const {address, city, state, bathrooms, bedrooms, tenants} = this.state;
        if(!checkIfPositiveNumber(bathrooms) || !checkIfPositiveNumber(bedrooms) || !checkIfPositiveNumber(tenants)){
            return false;
        }
        return true;
    }

    clickSubmitButton() {
        const {email, onChangeModalVisibility, onEditProperty, index, oldProp} = this.props;
        const {address, city, state, bathrooms, bedrooms, tenants} = this.state;
        if(!this.validateInput()){
            return;
        }
        const newProperty : Property = {
            address,
            city,
            state,
            bathrooms: Number(bathrooms),
            bedrooms: Number(bedrooms),
            tenants: Number(tenants),
        };
        onEditProperty(oldProp, newProperty, index, email, onChangeModalVisibility);
    }

    renderInputForms(): React.ReactElement[]{
        const {address, city, state, bedrooms, bathrooms, tenants} = this.state;
        const inputFormProps : InputFormProps[] = [
            {
                name: inputFormStrings.address,
                parentCallBack: this.getFormAddress,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                placeholder: address,
            }, 
            {
                name: inputFormStrings.city,
                parentCallBack: this.getFormCity,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                placeholder: city,
            }, 
            {
                name: inputFormStrings.state,
                parentCallBack: this.getFormState,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                placeholder: state,
            }, 
            {
                name: inputFormStrings.bedrooms,
                parentCallBack: this.getFormNumBed,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                placeholder: bedrooms.toString(),
            }, 
            {
                name: inputFormStrings.bathrooms,
                parentCallBack: this.getFormNumBath,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                placeholder: bathrooms.toString(),
            }, 
            {
                name: inputFormStrings.maxTenants,
                parentCallBack: this.getFormMaxTenants,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                placeholder: tenants.toString(),
            },
        ];

        return inputFormProps.map(inputFormProp => {
            const {
                name,
                parentCallBack,
                formTitleStyle,
                inputStyle,
                placeholder,
            } = inputFormProp;
            return (
                <InputForm
                    key={name}
                    name={name}
                    parentCallBack={parentCallBack}
                    formTitleStyle={formTitleStyle}
                    inputStyle={inputStyle}
                    placeholder={placeholder}
                />
            );
        });
        
    }
    
    render() {
        const {onChangeModalVisibility} = this.props;
        const showCloseButton = true;
        return (
        <SafeAreaView style={this.inputFormStyle.modalContainer}>
            <ScrollView style={this.inputFormStyle.scrollStyle}
            contentContainerStyle={this.inputFormStyle.scrollContentContainerStyle}>
                <Card
                    containerStyle={this.inputFormStyle.cardContainer}
                    showCloseButton={showCloseButton}
                    titleStyle={this.inputFormStyle.cardTitle}
                    titleContainerStyle={this.inputFormStyle.cardTitleContainer}
                    wrapperStyle={this.inputFormStyle.cardWrapperStyle}
                    title={editPropertyStrings.title}
                    closeButtonPressedCallBack={() => onChangeModalVisibility(false)}
                    >
                    <View>{this.renderInputForms()}</View>
                    {ThinButton(this.submitButton)}
                </Card>
            </ScrollView>
        </SafeAreaView>);
    }
}
