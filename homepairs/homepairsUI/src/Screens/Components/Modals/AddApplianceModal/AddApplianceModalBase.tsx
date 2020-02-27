import React from "react";
import { ScrollView, StyleSheet, StatusBar, Platform, View, Dimensions, Text } from 'react-native';
import { ThinButton, ThinButtonProps, Card, InputFormProps, InputForm, ApplianceCategoryPanel } from 'homepairs-elements';
import strings from 'homepairs-strings';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairsDimensions, Appliance, AddApplianceState, ApplianceType } from 'homepairs-types';
import Colors from 'homepairs-colors';
import {isPositiveWholeNumber, isEmptyOrSpaces, isNullOrUndefined, NavigationRouteHandler, NavigationRouteScreenProps} from 'homepairs-utilities';
import {HelperText} from 'react-native-paper';
import {FontTheme} from 'homepairs-base-styles';


export type AddApplianceDispatchProps = {
    onCreateAppliance: (newAppliance: Appliance, info: AddApplianceState, setInitialState: () => void, 
         displayError: (msg: string) => void, navigation: NavigationRouteHandler) => void
}

type Props = NavigationRouteScreenProps &
    AddApplianceDispatchProps;

type CreateState = {
    category: ApplianceType, 
    appName: string, 
    manufacturer: string, 
    modelNum: string,
    serialNum: string, 
    location: string,
    errorMsg: string, 
    errorCheck: boolean,
};

const addApplianceStrings = strings.applianceInfo.applianceModal;

const initialState : CreateState = {
    category: ApplianceType.None, 
    appName: '', 
    manufacturer: '', 
    modelNum: '',
    serialNum: '', 
    location: '',
    errorMsg: '',
    errorCheck: false,
};

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
            flex:1,
            maxWidth: HomePairsDimensions.MAX_PALLET,
            width: Platform.OS === 'web' ? width : BaseStyles.ContentWidth.max,
            alignSelf: 'center',
        },
        scrollStyle: {
            flex:1,
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
        menuStyle: {
            backgroundColor: colors.secondary,
            marginHorizontal: BaseStyles.MarginPadding.large,
            borderRadius: BaseStyles.BorderRadius.large,
            padding: BaseStyles.MarginPadding.large,
            paddingTop: 10,
            paddingBottom: 30,
            width: BaseStyles.ContentWidth.thin,
            alignSelf: 'center',
            borderColor: colors.lightGray,
            borderWidth: 1,
            overflow: 'hidden',
            marginBottom: 20,
        },
        titleText: {
            fontSize: BaseStyles.FontTheme.reg,
            fontFamily: 'nunito_regular',
        },
    });
}


export default class AddApplianceModalBase extends React.Component<Props,CreateState> {
    inputFormStyle;

    categoryRef;

    nameRef;

    manufacturerRef;

    modelNumRef;

    serialNumRef;

    locationRef;

    property;

    submitButton : ThinButtonProps = {
        name: addApplianceStrings.add, 
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
        this.getFormCategory= this.getFormCategory.bind(this);
        this.getFormName = this.getFormName.bind(this);
        this.getFormManufacturer = this.getFormManufacturer.bind(this);
        this.getFormModelNum = this.getFormModelNum.bind(this);
        this.getFormSerialNum = this.getFormSerialNum.bind(this);
        this.getFormLocation = this.getFormLocation.bind(this);
        this.setInitialState = this.setInitialState.bind(this);
        this.resetForms = this.resetForms.bind(this);
        this.displayError = this.displayError.bind(this);
        this.property = props.navigation.getParam('property');
        this.state = initialState;
        this.categoryRef = React.createRef();
        this.nameRef = React.createRef();
        this.manufacturerRef = React.createRef();
        this.modelNumRef = React.createRef();
        this.serialNumRef = React.createRef();
        this.locationRef = React.createRef();
    }

    getFormCategory(childData : ApplianceType) {
        this.setState({category: childData});
    }

    getFormName(childData : string) {
        this.setState({appName: childData});
    }

    getFormManufacturer(childData : string) {
        this.setState({manufacturer: childData});
    }

    getFormModelNum(childData : string) {
        this.setState({modelNum: childData});
    }

    getFormSerialNum(childData : string) {
        this.setState({serialNum: childData});
    }

    getFormLocation(childData: string) {
        this.setState({location: childData});
    }

    setInitialState() {
        this.setState(initialState);
    }

    validateForms() {
        const {category, appName,  modelNum, serialNum, location} = this.state;
        let check = true;
        if (category.toString() === 'None') {
            console.log('Please select a category');
            check = false;
        }
        if (isEmptyOrSpaces(appName)) {
            this.nameRef.current.setError(true);
            check = false;
        } 
        if (!isPositiveWholeNumber(modelNum)) {
            this.modelNumRef.current.setError(true);
            check = false;
        } 
        if (!isPositiveWholeNumber(serialNum)) {
            this.serialNumRef.current.setError(true);
            check = false;
        } 
        if (isEmptyOrSpaces(location)) {
            this.locationRef.current.setError(true);
            check = false;
        }
        return check;
    }

    resetForms() {
        this.nameRef.current.setError(false);
        this.manufacturerRef.current.setError(false);
        this.modelNumRef.current.setError(false);
        this.serialNumRef.current.setError(false);
        this.locationRef.current.setError(false);
    }

    displayError(msg: string) {
        this.setState({errorMsg: msg, errorCheck: true});
    }

    clickSubmitButton() {
        const {category, appName, manufacturer, modelNum, serialNum, location} = this.state;
        const { navigation, onCreateAppliance} = this.props;
        this.resetForms();
        this.setState({errorCheck: false});
        if (this.validateForms()) {
            const newAppliance : Appliance = {
                applianceId: undefined,
                category, appName, manufacturer, 
                modelNum: Number(modelNum), 
                serialNum: Number(serialNum), 
                location,
            };
            const info : AddApplianceState = {property: this.property};
            console.log(`Add Appliance Validation`)
            console.log(info)
            onCreateAppliance(newAppliance, info, this.setInitialState, this.displayError, navigation);
        }
    }

    renderInputForms() {
        const {appName, manufacturer, modelNum, serialNum, location} = this.state;
        const inputForms: InputFormProps[]  = [
            {
                ref: this.nameRef,
                key: addApplianceStrings.name,
                name: addApplianceStrings.name,
                parentCallBack: this.getFormName,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                value: appName,
                errorMessage: 'Display name cannot be empty',
            }, 
            {
                ref: this.manufacturerRef,
                key: addApplianceStrings.manufacturer,
                name: addApplianceStrings.manufacturer,
                parentCallBack: this.getFormManufacturer,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                value: manufacturer, 
            }, 
            {
                ref: this.modelNumRef,
                key: addApplianceStrings.modelNum,
                name: addApplianceStrings.modelNum,
                parentCallBack: this.getFormModelNum,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                value: modelNum,
                errorMessage: 'Model number must be a number',
            },
            {
                ref: this.serialNumRef,
                key: addApplianceStrings.serialNum,
                name: addApplianceStrings.serialNum,
                parentCallBack: this.getFormSerialNum,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                value: serialNum,
                errorMessage: 'Serial number must be a number',
            }, 
            {
                ref: this.locationRef,
                key: addApplianceStrings.location,
                name: addApplianceStrings.location,
                parentCallBack: this.getFormLocation,
                formTitleStyle: this.inputFormStyle.formTitle,
                inputStyle: this.inputFormStyle.input,
                value: location,
                errorMessage: 'Location cannot be empty',
            }, 
        ];

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
        const {category} = this.state;
        const showCloseButton = true;
        return(
            <View style={this.inputFormStyle.modalContainer}>
            <ScrollView style={this.inputFormStyle.scrollStyle}
            contentContainerStyle={this.inputFormStyle.scrollContentContainerStyle}
            showsHorizontalScrollIndicator={false}>
                <Card
                    containerStyle={this.inputFormStyle.cardContainer}
                    showCloseButton={showCloseButton}
                    title={addApplianceStrings.addTitle} 
                    closeButtonPressedCallBack={() => { 
                        navigation.goBack();
                        this.setInitialState();
                        this.resetForms();
                    }} 
                    titleStyle={this.inputFormStyle.cardTitle}
                    titleContainerStyle={this.inputFormStyle.cardTitleContainer}
                    wrapperStyle={this.inputFormStyle.cardWrapperStyle}
                    >
                    <Text style={this.inputFormStyle.formTitle}>{addApplianceStrings.category}</Text>
                    <ApplianceCategoryPanel initialCategory={category} parentCallBack={this.getFormCategory}/>
                    <>{this.renderInputForms()}</>
                    {this.renderError()}
                    {ThinButton(this.submitButton)}
                </Card>
            </ScrollView>
        </View>);
    }
}
