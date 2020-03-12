import React from "react";
import { ScrollView, StyleSheet, SafeAreaView, Platform, StatusBar, Dimensions} from "react-native";
import {ThinButton, Card, InputForm, InputFormProps } from 'homepairs-elements';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairsDimensions, TenantInfo } from 'homepairs-types';
import { isEmailSyntaxValid, isAlphaCharacterOnly, isPhoneNumberValid, 
    NavigationRouteScreenProps, prepareNavigationHandlerComponent } from 'homepairs-utilities';
import { Endpoints, navigationPages } from 'src/Routes/RouteConstants';


const {updateTenant} = Endpoints;
const {SingleProperty} = navigationPages;

type Props =  NavigationRouteScreenProps;

type AddTenantState = TenantInfo

const {width} = Dimensions.get('window');
const colors = BaseStyles.LightColorTheme;
const styles = StyleSheet.create({
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
    editTenantButtonStyle: {
        alignItems: 'center',
        backgroundColor: BaseStyles.LightColorTheme.transparent,
        padding: BaseStyles.MarginPadding.mediumConst,
        maxWidth: HomePairsDimensions.MAX_BUTTON_WIDTH,
        minWidth: HomePairsDimensions.MIN_BUTTON_WIDTH,
        borderRadius: BaseStyles.BorderRadius.large,
        borderWidth: 1,
        borderColor: BaseStyles.LightColorTheme.primary,
    },
    editTenantButtonTextStyle: {
        color: BaseStyles.LightColorTheme.primary, 
        fontSize: BaseStyles.FontTheme.reg,
        alignSelf: 'center',
    },
    removeTenantButtonStyle: {
        alignItems: 'center',
        backgroundColor: BaseStyles.LightColorTheme.transparent,
        padding: BaseStyles.MarginPadding.mediumConst,
        maxWidth: HomePairsDimensions.MAX_BUTTON_WIDTH,
        minWidth: HomePairsDimensions.MIN_BUTTON_WIDTH,
        borderRadius: BaseStyles.BorderRadius.large,
        borderWidth: 1,
        borderColor: BaseStyles.LightColorTheme.red,
    },
    removeTenantButtonTextStyle: {
        color: BaseStyles.LightColorTheme.red, 
        fontSize: BaseStyles.FontTheme.reg,
        alignSelf: 'center',
    },
    buttonContainerStyle: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: BaseStyles.MarginPadding.largeConst,
        marginBottom: BaseStyles.MarginPadding.xlarge,
        minHeight: 50,
    },
    
});


export class AddTenantModalBase extends React.Component<Props, AddTenantState> {
    firstNameRef;

    lastNameRef;

    emailRef;

    phoneNumberRef;

    propId : number;
  
    constructor(props: Readonly<Props>) {
        super(props);
        this.getFormFirstName = this.getFormFirstName.bind(this);
        this.getFormLastName = this.getFormLastName.bind(this);
        this.getFormEmail = this.getFormEmail.bind(this);
        this.getFormPhoneNumber = this.getFormPhoneNumber.bind(this);
        this.goBackToPreviousPage = this.goBackToPreviousPage.bind(this);
        this.resetForms = this.resetForms.bind(this);
        this.propId = props.navigation.getParam('propId');
        this.state = {
            firstName : '', 
            lastName: '', 
            email: '', 
            phoneNumber: '', 
        };
        this.firstNameRef = React.createRef();
        this.lastNameRef = React.createRef();
        this.emailRef = React.createRef();
        this.phoneNumberRef = React.createRef();
    } 

    getFormFirstName(firstName : string) {
        this.setState({firstName});
    }

    getFormLastName(lastName : string) {
        this.setState({lastName});
    }

    getFormEmail(email : string) {
        this.setState({email});
    }

    getFormPhoneNumber(phoneNumber: string) {
        this.setState({phoneNumber});
    }

    goBackToPreviousPage() {
        const{navigation} = this.props;
        navigation.replace(SingleProperty, {propId: this.propId});
    }

    generateNewTenantInfo(){
        const {firstName, lastName, email, phoneNumber} = this.state;
        const newTenantInfo : TenantInfo = {
            firstName,
            lastName,
            email,
            phoneNumber,
        };
        return newTenantInfo;
    }

    validateForms() {
        const {firstName, lastName, email, phoneNumber} = this.state;
        let check = true;
        if (!isAlphaCharacterOnly(firstName)) {
            this.firstNameRef.current.setError(true);
            check = false;
        } 
        if (!isAlphaCharacterOnly(lastName)) {
            this.lastNameRef.current.setError(true);
            check = false;
        } 
        if (!isEmailSyntaxValid(email)) {
            this.emailRef.current.setError(true);
            check = false;
        } 
        if (!isPhoneNumberValid(phoneNumber)) {
            this.phoneNumberRef.current.setError(true);
            check = false;
        } 
        return check;
    }

    resetForms() {
        this.firstNameRef.current.setError(false);
        this.lastNameRef.current.setError(false);
        this.emailRef.current.setError(false);
        this.phoneNumberRef.current.setError(false);
    }

    async clickSubmitButton() {
        this.resetForms();
        if (this.validateForms()) {
            const newTenantInfo : TenantInfo = this.generateNewTenantInfo();
            const postValues = {propId: this.propId, ...newTenantInfo};
            // TODO: set up fetch request for editing tenant.
            // alert('We need the backend to set up an endpoint to Edit the Tenant');
            await updateTenant(postValues); 
            this.goBackToPreviousPage();
        }; 
    }

    renderInputForms() {
        const inputForms: InputFormProps[]  = [
            {
                ref: this.firstNameRef,
                key: 'FIRST NAME',
                name: 'FIRST NAME',
                parentCallBack: this.getFormFirstName,
                formTitleStyle: styles.formTitle,
                inputStyle: styles.input,
                errorMessage: 'Tenant must have a first name.',
            }, 
            {
                ref: this.lastNameRef,
                key: 'LAST NAME',
                name: 'LAST NAME',
                parentCallBack: this.getFormLastName,
                formTitleStyle: styles.formTitle,
                inputStyle: styles.input,
                errorMessage: 'Tenant must have a last name.',
            }, 
            {
                ref: this.emailRef,
                key: 'EMAIL',
                name: 'EMAIL',
                parentCallBack: this.getFormEmail,
                formTitleStyle: styles.formTitle,
                inputStyle: styles.input,
                errorMessage: 'Tenant must have an email.',
            }, 
            {
                ref: this.phoneNumberRef,
                key: 'PHONE NUMBER',
                name: 'PHONE NUMBER',
                parentCallBack: this.getFormPhoneNumber,
                formTitleStyle: styles.formTitle,
                inputStyle: styles.input,
                errorMessage: 'Tenant must have a phone number',
            }, 
        ];

        return inputForms.map(inputFormProp => {
            const {ref, key, name, parentCallBack, formTitleStyle, inputStyle, errorMessage, 
                secureTextEntry, errorStyle, value, placeholder} = inputFormProp;
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

    render() {
        const showCloseButton = true;
        return(
            <SafeAreaView style={styles.modalContainer}>
            <ScrollView style={styles.scrollStyle}
            contentContainerStyle={styles.scrollContentContainerStyle}
            showsHorizontalScrollIndicator={false}>
                <Card
                    containerStyle={styles.cardContainer}
                    showCloseButton={showCloseButton}
                    titleStyle={styles.cardTitle}
                    titleContainerStyle={styles.cardTitleContainer}
                    wrapperStyle={styles.cardWrapperStyle}
                    title='Add Tenant'
                    closeButtonPressedCallBack={() => {
                        this.goBackToPreviousPage();
                        this.resetForms();
                    }}
                    >
                    <>{this.renderInputForms()}</>
                    <ThinButton 
                        name='Add'
                        onClick={() => {this.clickSubmitButton();}} 
                        buttonStyle={styles.editTenantButtonStyle}
                        buttonTextStyle={styles.editTenantButtonTextStyle}
                        containerStyle={styles.buttonContainerStyle}/>
                </Card>
            </ScrollView>
        </SafeAreaView>);
    }
}

export default prepareNavigationHandlerComponent(AddTenantModalBase);