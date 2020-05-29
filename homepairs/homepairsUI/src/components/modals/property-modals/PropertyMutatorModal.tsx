import React from "react";
import { ScrollView, StyleSheet, StatusBar, Platform, View, Dimensions, Text } from 'react-native';
import { ThinButton, ThinButtonProps, Card, InputFormProps, InputForm, ApplianceCategoryPanel, GoogleInputForm } from 'src/elements';
import strings from 'homepairs-strings';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairsDimensions, Appliance, ApplianceType } from 'homepairs-types';
import Colors from 'homepairs-colors';
import { isPositiveWholeNumber, isEmptyOrSpaces, isNullOrUndefined } from 'src/utility';
import { HelperText } from 'react-native-paper';
import { FontTheme } from 'homepairs-base-styles';
import { navigationPages, NavigationRouteScreenProps, prepareNavigationHandlerComponent } from 'src/routes';
import { postUpdatedAppliance } from 'homepairs-endpoints';
import { DetailedPropertyMutatorDispatchProps, DetailedPropertyMutatorModal } from '../CommonDispatchProps';



const { SingleProperty } = navigationPages;
const APPLIANCE = 'appliance';
const GOOGLE_INPUT = 'google-input-form';

type FormProps = InputFormProps | 'appliance' | 'google-input-form';
type InputTypes = string | ApplianceType
type Forms = InputForm | GoogleInputForm | ApplianceCategoryPanel;

type Props = {
    title: | string | number;
    formProps: FormProps[],
    parentCallBack: (key: string, value: InputTypes, ...rest: any[]) => void,
    goBack: (...any) => any;
    onClickSubmit: (...any) => void;
    onClickRemove: (...any) => void;
    submitButtonName?: string,
    removeButtonName?: string,
};

type State = {
    error: boolean,

}

const editApplianceStrings = strings.applianceInfo.applianceModal;

const DefaultMessage: string = "The specified appliance for this property could not be found in our system. This may be a server issue.";

function setInputStyles(colorTheme?: BaseStyles.ColorTheme) {
    const { width } = Dimensions.get('window');
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
            minWidth: 40,
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
            alignSelf: 'center',
        },
        scrollStyle: {
            flex: 1,
            marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            width: '100%',
        },
        scrollContentContainerStyle: {
            maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            width: BaseStyles.ContentWidth.reg,
            paddingVertical: BaseStyles.MarginPadding.large,
            flexGrow: Platform.OS === 'web' ? null : 1, // Needed to center the contents of the scroll container for mobile 
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
            marginTop: BaseStyles.MarginPadding.small,
            marginBottom: BaseStyles.MarginPadding.smallConst,
            alignSelf: 'center',
            justifyContent: 'center',
        },
        errorStyle: {
            fontFamily: FontTheme.secondary,
            fontSize: 16,
        },
    });
}

const buttonStyles = StyleSheet.create({
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
});


export class PropertyMutatorModal extends React.Component<Props> {
    
    inputFormStyle;

    formRef: any[] = [];

    // TODO: Pass these parameters in the render function
    submitButton: ThinButtonProps = {
        name: editApplianceStrings.editSave,
        onClick: () => { this.clickSubmitButton(); },
        buttonStyle: buttonStyles.buttonStyle,
        buttonTextStyle: buttonStyles.buttonTextStyle,
        containerStyle: buttonStyles.containerStyle,
    };

    constructor(props: Readonly<Props>) {
        super(props);
        const {formProps} = props;

        this.inputFormStyle = setInputStyles(null);
        this.getFormData = this.getFormData.bind(this);

        this.resetForms = this.resetForms.bind(this);
        this.displayError = this.displayError.bind(this);

        // Set the references that will be used for the input forms. In the case 
        // that the form is an appliance, a string is assigned instead.
        for(let i: number = 0; i < formProps.length; i++){
            if( formProps[i] === APPLIANCE )
                this.formRef.push(formProps);
            else 
                this.formRef.push(React.createRef());
        } 
    }

    /**
     * Invokes a the callback method given by the parent. Typically, this will set 
     * the state of the parent using the key -> value pair provided by the input
     * form. 
     * @param {string} key - Key passed via the formProps. Will default to address and appliance 
     * if the form is a GoogleInputForm or Appliance Categorizer respectively
     * @param {InputType} childData - Data provided from the component. 
     */
    getFormData(key: string, childData: InputTypes) {
        const {parentCallBack} = this.props;
        parentCallBack(key, childData);
    }

    validateForms() {
        const { appName, modelNum, serialNum, location } = this.state;
        let check = true;
        if (isEmptyOrSpaces(appName)) {
            this.setState({errorMsg: "Invalid appliance name."});
            this.appNameRef.current.setError(true);
            check = false;
        } // Should model numbers be allowed to be alphanumeric?
        if (!isPositiveWholeNumber(modelNum)) {
            this.setState({errorMsg: "Invalid model number."});
            this.modelNumRef.current.setError(true);
            check = false;
        } // Should serial numbers be allowed to be alphanumeric?
        if (!isPositiveWholeNumber(serialNum)) {
            this.setState({errorMsg: "Invalid serial number."});
            this.serialNumRef.current.setError(true);
            check = false;
        } 
        if (isEmptyOrSpaces(location)) {
            this.setState({errorMsg: "Invalid location."});
            this.locationRef.current.setError(true);
            check = false;
        }
        return check;
    }

    /**
     * Iterate through each form and set reset the error message of each form 
     * to false. 
     */
    resetForms() {
        this.formRef.forEach(ref => {
            if(typeof ref !== 'string')
                ref.current.setError(false);
        });
    }

    displayError(msg: string) {
        this.setState({ errorMsg: msg, errorCheck: true });
    }

    clickSubmitButton() {
        this.resetForms();
        this.setState({ errorCheck: false });
        if (this.validateForms()) {
            this.updateAppliance();
        }
    }

    renderInputForms() {
        const {formProps} = this.props;
        let Forms: any[] = [];

        formProps.forEach(formProp => {
            if(formProp === APPLIANCE){
                const form = (
                    <>
                        <Text style={this.inputFormStyle.formTitle}>{editApplianceStrings.category}</Text>
                        <ApplianceCategoryPanel initialCategory={category} parentCallBack={this.getFormData} />
                    </>
                )
            }
        });

        const { appName, manufacturer, modelNum, serialNum, location } = this.state;
        const inputForms: InputFormProps[] = [
            {
                ref: this.appNameRef,
                key: editApplianceStrings.name,
                name: editApplianceStrings.name,
                parentCallBack: this.getFormName,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                value: appName,
                errorMessage: 'Name cannot be empty',
            },
            {
                ref: this.manufacturerRef,
                key: editApplianceStrings.manufacturer,
                name: editApplianceStrings.manufacturer,
                parentCallBack: this.getFormManufacturer,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                value: manufacturer,
            },
            {
                ref: this.modelNumRef,
                key: editApplianceStrings.modelNum,
                name: editApplianceStrings.modelNum,
                parentCallBack: this.getFormModelNum,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                value: modelNum,
                errorMessage: 'Model number must be a number',
            },
            {
                ref: this.serialNumRef,
                key: editApplianceStrings.serialNum,
                name: editApplianceStrings.serialNum,
                parentCallBack: this.getFormSerialNum,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                value: serialNum,
                errorMessage: 'Serial number must be a number',
            },
            {
                ref: this.locationRef,
                key: editApplianceStrings.location,
                name: editApplianceStrings.location,
                parentCallBack: this.getFormLocation,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                value: location,
                errorMessage: 'Locations cannot be empty',
            },
        ];

        return inputForms.map(inputFormProp => {
            const { ref, key, name, parentCallBack, formTitleStyle, inputStyle, errorMessage, secureTextEntry, errorStyle, value, placeholder } = inputFormProp;
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
                errorMessage={errorMessage} />;
        });
    }

    renderError() {
        const { errorMsg, errorCheck } = this.state;
        return <View style={{ alignSelf: 'center' }}>
            <HelperText type='error' visible={errorCheck} style={this.inputFormStyle.errorStyle}>{errorMsg}</HelperText>
        </View>;
    }

    render() {
        const { category } = this.state;
        const showCloseButton = true;
        return (
            <View style={this.inputFormStyle.modalContainer}>
                <ScrollView style={this.inputFormStyle.scrollStyle}
                    contentContainerStyle={this.inputFormStyle.scrollContentContainerStyle}
                    showsHorizontalScrollIndicator={false}>
                    <Card
                        containerStyle={this.inputFormStyle.cardContainer}
                        showCloseButton={showCloseButton}
                        title={editApplianceStrings.editTitle}
                        closeButtonPressedCallBack={() => {
                            this.goBackToPreviousPage();
                            this.setInitialState();
                            this.resetForms();
                        }}
                        titleStyle={this.inputFormStyle.cardTitle}
                        titleContainerStyle={this.inputFormStyle.cardTitleContainer}
                        wrapperStyle={this.inputFormStyle.cardWrapperStyle}
                    >
                        <Text style={this.inputFormStyle.formTitle}>{editApplianceStrings.category}</Text>
                        <ApplianceCategoryPanel initialCategory={category} parentCallBack={this.getFormCategory} />
                        <>{this.renderInputForms()}</>
                        {this.renderError()}
                        <ThinButton
                            name={this.submitButton.name}
                            onClick={async () => { await this.submitButton.onClick(); }}
                            buttonStyle={this.submitButton.buttonStyle}
                            buttonTextStyle={this.submitButton.buttonTextStyle}
                            containerStyle={this.submitButton.containerStyle}
                        />
                    </Card>
                </ScrollView>
            </View>);
    }
}

const EditApplianceModal = DetailedPropertyMutatorModal(EditApplianceModalBase);
export default prepareNavigationHandlerComponent(EditApplianceModal);