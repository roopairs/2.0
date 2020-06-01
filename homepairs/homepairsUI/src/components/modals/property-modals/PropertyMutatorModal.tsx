import React from "react";
import { ScrollView, View, Text } from 'react-native';
import { ThinButton, Card, InputFormProps, InputForm, ApplianceCategoryPanel, GoogleInputForm } from 'src/elements';
import strings from 'homepairs-strings';
import { ApplianceType } from 'homepairs-types';
import { isNullOrUndefined, isEmptyOrSpaces } from 'src/utility';
import { HelperText } from 'react-native-paper';
import { NavigationRouteHandler } from 'src/routes';
import {setInputStyles, buttonStyles} from './styles';


export const APPLIANCE_CATEGORY = 'category';
export const ADDRESS = 'address';

export const DEFAULT_APPLIANCE_TYPE = ApplianceType.None;

/**
 * Input form properties that permit the indication of an optional 
 * form. 
 */
export type OptionalInput = InputFormProps & { optional?: boolean}

/**
 * Properties for the the input form. If a form is a appliance categorizer 
 * or an address form, simply pass in the predefined strings respectively.
 */
export type FormProps = OptionalInput | 'category' | 'address';

/**
 * Vald input types to be used by the component
 */
type InputTypes = string | ApplianceType

/**
 * Forms thats can be rendered with this component. Input Forms must have 
 * a key, and and name defined. 
 */
type Forms = InputForm | GoogleInputForm | ApplianceCategoryPanel;

/**
 * Values used for the component's goBack method. 
 */
export type NavParams = string | { route: string, params: {[key: string]: any}}

/**
 * The valid function type that can be used for validating a parameter. It must 
 * always return a boolean.
 */
export type ValidationFunction = (data: InputTypes, ...any: any[]) => boolean; 

/**
 * Expanded state of the component based on the Forms needed to be rendered. 
 */
export type FormState = {[key:string] : any}


type SyncSubmitFunction = (...any) => void;
type AsyncSubmitFunction = (...any) => Promise<void>;
/**
 * Valid functions for submitting a form. This is really used to allow the 
 * use of async functions for submission
 */
export type SubmitFunctions = SyncSubmitFunction | AsyncSubmitFunction;

export type Props = {
    /**
     * Navigation object used to close the modal when a successful submission 
     * or the close button has successfully been pressed/invoked.
     */
    navigation: NavigationRouteHandler;

    /**
     * Name of the Overlay Modal. 
     */
    title: | string | number;

    /**
     * Properties passed for each form. Only the Input Form properties need 
     * to be defined. Google Input and Appliances are predefined and are assummed 
     * to be only used once.
     */
    formProps: FormProps[],

    /**
     * Optional values to pass for resetting the forms. This is intended to be used 
     * with Overlays Modals that are meant to edit properties. This prop ASSUMES a 
     * list of equal length to formProps
     */
    initialValues?: InputTypes[],

    /**
     * The route the component will navigate to when the close button has been pressed 
     * or a successful submissions has been completed. Pass in a string to simply
     * navigate: 
     *  goBackRoute='<STRING>' 
     * 
     * To pass in navigation parameters, pass in an object like so: 
     *  goBackRoute={ route: '<STRING>', params: { '<STRING>' : <DATA> }} 
     */
    goBackRoute: NavParams;

    /**
     * Callback function to when the blue submit button has been pressed. This will 
     * always be called before the resetForms function 
     */
    onClickSubmit: SubmitFunctions

    /**
     * Callback function to when the red submit button has been pressed. This will 
     * always be called before the resetForms function.
     */
    onClickRemove?: SubmitFunctions

    /**
     * Text of the blue submit button. This will default to Edit if not defined
     */
    submitButtonName?: string,

    /**
     * Text of the red submit button. The button will not render if this is not 
     * defined.
     */
    removeButtonName?: string,

    /**
     * Methods that check to see if a user has inputted valid text for the 
     * corresponding form. If a null/undefined value has been passed, then
     * the check will always pass. The component assumes this prop has the 
     * same lenght as form Props.
     */
    validationMethods?: ValidationFunction[];
};

/**
 * The type of state will always have hasError and errorMesg included in 
 * addition to the generic value T.
 * T is intended to represent the forms rendered in the component.
 */
type State = {
    hasError: boolean,
    errorMsg: string,
} & FormState;

const editApplianceStrings = strings.applianceInfo.applianceModal;
const editPropertyStrings = strings.detailedPropertyPage.editProperty;
const inputFormStrings = editPropertyStrings.inputForm;


/**
 * ---------------------------------------------------------------
 * Property Mutator Modal
 * ---------------------------------------------------------------
 * A Component that renders a component in standard form of a Homepairs 
 * overlay modal. It has the capability of validating forms, and taking
 * in the previously initialized values to prepopulate a form, and it 
 * navigates backwards to the previous page upon successful submission 
 * and card closing. 
 */
class PropertyMutatorModal extends React.Component<Props, State> {
    
    /**
     * Default forms used for the entire form. It is dynamic since it requires use
     * of the width of the window. 
     * TODO: May want to play with flex box to fix dependency on window listener
     */
    inputFormStyle;

    /**
     * List of forms that are mapped based on the input form props passed. For 
     * Appliance Panels, the value will be 'appliance'. All other forms will 
     * hold a reference in order to set the Helper Errors for each form.
     */
    formRef: any[] = [];

    constructor(props: Readonly<Props>) {
        super(props);
        const {formProps} = props;
        this.inputFormStyle = setInputStyles(null);

        this.getFormData = this.getFormData.bind(this);
        this.displayError = this.displayError.bind(this);
        this.clickSubmitButton = this.clickSubmitButton.bind(this);

        // Set the references and state that will be used for the input forms. In the case 
        // that the form is an appliance, a string is assigned instead.
        this.state = this.mapInitialState();

        for(let i: number = 0; i < formProps.length; i++){
            if( formProps[i] === APPLIANCE_CATEGORY )
                this.formRef.push(formProps[i]);
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
        this.setState({[key] : childData});
    }

    /**
     * Uses this components navParam properties to navigate to the parent page. This method 
     * can also be passed parameters to navigate to a different page, however, this is not 
     * what this method was intended to be used and may cause unwarranted behavior.
     */
    goBackToPreviousPage() {
        const { navigation, goBackRoute }  = this.props;
        if(typeof goBackRoute === 'string'){
            navigation.resolveModalReplaceNavigation(goBackRoute);
        } else {
            const {route, params} = goBackRoute;
            navigation.resolveModalReplaceNavigation(route, params);
        }
    }

    /**
     * Runs through the list of functions passed in as validationMethods. If any 
     * of the values return false for the corresponding form, it will set the 
     * error state and return false. This function iterates through the entirety 
     * of forms. 
     * 
     * Undefined or null functions will always return true. 
     */
    validateForms() {
        const {formProps, validationMethods} = this.props;
        let check = true;

        for(let i: number = 0; i < formProps.length; i++){
            const validation = validationMethods[i];
            const formProp = formProps[i];
            const ref = this.formRef[i];
            
            let key: string = "";
            let errorMsg: string = "";
            let isOptional: boolean = false;

            // BASE CASE: Validation function is not defined
            if(isNullOrUndefined(validation))
                continue;
            
            // If somehow the Appliance has a validation method, simply ignore it
            if(formProp === APPLIANCE_CATEGORY){
                continue;
            }
            else if (formProp === ADDRESS){
                key = ADDRESS;
                errorMsg = 'Address cannot be empty.'; 
            }
            else {
                key = formProp.key;
                errorMsg = formProp.errorMessage;
                isOptional = isNullOrUndefined(formProp.optional) ? false : formProp.optional; 
            }

            // Check if the value is an user optional and undefined 
            const data = this.state[key];
            if(isEmptyOrSpaces(data) && isOptional){
                continue;
            }
            // With valid refs and errorMsgs, set the state of value
            else if (validation(data)){
                this.setState({errorMsg});
                ref.current.setError(true);
                check = false;
            }
        }
        return check;
    }

    /**
     * Initializes the state based off the formProps passed. Each Input Form 
     * should have a key associatted that can be used to map the data from 
     * its associated form. Appliance and Google Forms will have 'appliance' 
     * and 'address' keys assigned respectively. 
     */
    mapInitialState() {
        const {initialValues, formProps} = this.props;
        const isListUndefined = isNullOrUndefined(initialValues);
        let initialState: State = {hasError: false, errorMsg: ""};

        for(let i: number = 0; i < formProps.length; i++){
            const formProp = formProps[i];
            const initialValue = isListUndefined ? undefined : initialValues[i];
            if(formProp === APPLIANCE_CATEGORY){
                initialState[APPLIANCE_CATEGORY] = initialValue === undefined ? ApplianceType.None : initialValue;
            } else if (formProp === ADDRESS){
                initialState[ADDRESS] = initialValue === undefined ? "" : initialValue;
            } else{
                const { key } = (formProp as InputFormProps);
                initialState[key] = initialValue === undefined ? "" : initialValue;
            }
        }
        return initialState;
    }

    /**
     * Method that sturns off all the Helper Texts' (Error Messages). It should be used when a valid 
     * form as been submitted. This does not mean the form submission will be successful.
     */
    resetForms(){
        this.formRef.forEach(ref => {
            if(typeof ref !== 'string'){
                ref.current.setState({error:false});
            }
        });
    }

    /**
     * Changes the state of the component when a submission has failed to complete. 
     * The message is passed will be what is presented at the bottom of the page. 
     * 
     * Note: This method is intended to be used as a callback function.
     * @param {string} msg - The value rendered when a failed submission has occurred.
     */
    displayError(msg: string) {
        this.setState({ errorMsg: msg, hasError: true });
    }

    /**
     * Invokes the parent method that is passed into the function upon completion 
     * of the form. If the forms pass the validation check, then the relevant 
     * forms are resetted and then proper cleanup (navigation, setting of initial state)
     * are invoked. 
     */
    async clickSubmitButton() {
        const {onClickSubmit} = this.props;
        
        // Invoke clean up for this components contents 
        this.setState({ hasError: false, errorMsg: "" });

        // Now check the forms for validation. Note that onClickSubmit should invoke an 
        // API requests to update. Then it should set the state of the parent component to 
        // its initial values. 
        if (this.validateForms()) {
            if (onClickSubmit.constructor.name === "AsyncFunction"){
                await onClickSubmit(this.state, this.displayError, this.props).then(() =>{
                    this.cleanComponent();
                }).catch(() => {
                    this.resetForms();
                });
            } else{
                onClickSubmit(this.state, this.displayError, this.props);
                this.goBackToPreviousPage();
            }
        }
    }

    /**
     * Invokes the parent method that is passed into the function upon completion 
     * of the form. If the forms pass the validation check, then the relevant 
     * forms are resetted and then proper cleanup (navigation, setting of initial state)
     * are invoked. 
     */
    async clickRemoveButton() {
        const {onClickRemove} = this.props;
        
        // Invoke clean up for this components contents 
        this.setState({ hasError: false, errorMsg: "" });

        // Now check the forms for validation. Note that onClickSubmit should invoke an 
        // API requests to update. Then it should set the state of the parent component to 
        // its initial values. 
        if (this.validateForms()) {
            await onClickRemove(this.state, this.displayError, this.props);
            this.cleanComponent();
        }
    }

    /**
     * A method that resets the forms and sets the values of the parent state (via callback)
     * to the intitial values. It then will navigate back to the previous page. 
     */
    cleanComponent(){
        const initialState = this.mapInitialState();
        this.setState(initialState);
        this.resetForms();
        this.goBackToPreviousPage(); 
    }

    /**
     * A method that iterates through the passed properties for each of the forms. 
     * Appliance Categorizers and Google-Input Forms are predefined and will render 
     * a default style. Input Form styles are also predefined but certain values 
     * key, name, errorMessage, secureTextEntry, and placeholder are defined by the 
     * passed in properties.
     * 
     * Note: To initialize a preset Form, simply pass the value into the corresponding 
     * index of the intialValues property of this component.
     */
    renderInputForms() {
        const {formProps} = this.props;
        let Forms: Forms[] = [];
        let form: any; 

        for(let i: number = 0; i < formProps.length; i++){
            const formProp = formProps[i];
            if(formProp === APPLIANCE_CATEGORY){
                const {category} = this.state;
                form = (
                    <View key={APPLIANCE_CATEGORY}>
                        <Text style={this.inputFormStyle.formTitle}>
                            {editApplianceStrings.category}
                        </Text>
                        <ApplianceCategoryPanel 
                            initialCategory={category} 
                            parentCallBack={(data: InputTypes) => 
                            this.getFormData(APPLIANCE_CATEGORY, data)} />
                    </View>
                );
            } else if (formProp === ADDRESS){
                const ref = this.formRef[i];
                const {address} = this.state;
                form = (
                    <GoogleInputForm 
                        ref={ref}
                        key={ADDRESS}
                        name={inputFormStrings.address}
                        parentCallBack={(data: InputTypes) => this.getFormData(ADDRESS, data)}
                        formTitleStyle={this.inputFormStyle.formTitle}
                        inputStyle={this.inputFormStyle.input}
                        value={address}
                        errorMessage='Address cannot be empty'/>
                );
            } else {
                const { key, name, errorMessage, secureTextEntry, placeholder} = (formProp as InputFormProps);
                const ref = this.formRef[i];
                const value = this.state[key];
                form = (
                    <InputForm
                        ref={ref}
                        key={key}
                        name={name}
                        parentCallBack={(data: InputTypes) => this.getFormData(key, data)}
                        formTitleStyle={this.inputFormStyle.formTitle}
                        inputStyle={this.inputFormStyle.inputStyle}
                        errorStyle={this.inputFormStyle.errorStyle}
                        secureTextEntry={secureTextEntry}
                        value={value.toString()}
                        placeholder={placeholder}
                        errorMessage={errorMessage} />
                );
            }
            Forms.push(form);
        }
        return Forms;
    }

    renderError() {
        const { errorMsg, hasError } = this.state;
        return <View style={{ alignSelf: 'center' }}>
            <HelperText 
                type='error' 
                visible={hasError}
                style={this.inputFormStyle.errorStyle}>
                    {errorMsg}
            </HelperText>
        </View>;
    }

    /**
     * Render one thin button if no callback has been defined for the remove 
     * button. If this value has been defined, the red remove button will be 
     * rendered and will be pressable.
     */
    renderThinButtons() {
        const {submitButtonName, removeButtonName, onClickRemove} = this.props;
        return isNullOrUndefined(onClickRemove) ?  (
            <ThinButton
                name={submitButtonName}
                onClick={async () => {await this.clickSubmitButton();}}
                buttonStyle={buttonStyles.buttonStyle}
                buttonTextStyle={buttonStyles.buttonTextStyle}
                containerStyle={buttonStyles.containerStyle}/>
        ) : (
            <View style={buttonStyles.twoButtonContainer}>
                <View style={{flex: 1}}>
                <ThinButton 
                    name={submitButtonName}
                    onClick={async () => {await this.clickSubmitButton();}} 
                    buttonStyle={buttonStyles.editTenantButtonStyle}
                    buttonTextStyle={buttonStyles.editTenantButtonTextStyle}
                    containerStyle={buttonStyles.editButtonConatiner}
                    />
                </View>
                <View style={{flex: 1}}>
                <ThinButton 
                    name={removeButtonName}
                    onClick={async () => { await this.clickRemoveButton();}} 
                    buttonStyle={buttonStyles.removeTenantButtonStyle}
                    buttonTextStyle={buttonStyles.removeTenantButtonTextStyle}
                    containerStyle={buttonStyles.removeButtonConatiner}
                    />
                </View>
            </View>
        );
    }

    render() {
        const {title} = this.props;
        return (
            <View style={this.inputFormStyle.modalContainer}>
                <ScrollView style={this.inputFormStyle.scrollStyle}
                    contentContainerStyle={this.inputFormStyle.scrollContentContainerStyle}
                    showsHorizontalScrollIndicator={false}>
                    <Card
                        containerStyle={this.inputFormStyle.cardContainer}
                        title={title.toString()}
                        closeButtonPressedCallBack={() => {
                            this.cleanComponent();
                        }}
                        titleStyle={this.inputFormStyle.cardTitle}
                        titleContainerStyle={this.inputFormStyle.cardTitleContainer}
                        wrapperStyle={this.inputFormStyle.cardWrapperStyle}
                        showCloseButton>
                        <>{this.renderInputForms()}</>
                        {this.renderError()}
                        {this.renderThinButtons()}
                    </Card>
                </ScrollView>
            </View>);
    }
}

PropertyMutatorModal.defaultProps = {
    initialValues: null,
    onClickSubmit: () => {},
    onClickRemove: null,
    submitButtonName: 'Save',
    removeButtonName: 'Remove',
    validationMethods: null,
};

export {PropertyMutatorModal};