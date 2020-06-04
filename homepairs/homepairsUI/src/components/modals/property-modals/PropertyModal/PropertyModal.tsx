import React from "react";
import strings from 'homepairs-strings';
import { Property, EditPropertyState, AddNewPropertyState } from 'homepairs-types';
import { isNotPositiveWholeNumber, isEmptyOrSpaces, isNullOrUndefined } from 'src/utility';
import {navigationPages, NavigationRouteScreenProps } from 'homepairs-routes';
import { PropertyMutatorModal, FormProps, ValidationFunction, FormState } from '../PropertyMutatorModal';

const {SingleProperty} = navigationPages;

export type EditPropertyDispatchProps = {
    onSendPropertyRequest: (newProperty: Property, info: EditPropertyState, 
        displayError: (msg: string) => void) => Promise<void>;
}

export type AddNewPropertyDispatchProps = {
    onSendPropertyRequest: (newProperty: Property, info: AddNewPropertyState,
         displayError: (msg: string) => void) => Promise<void>;
}

export type PropertyDispatchProps = 
    | EditPropertyDispatchProps
    | AddNewPropertyDispatchProps;

export type PropertyState = {
    email: string,
    roopairsToken: string,
    oldProp: Property,
    propId: string,
}

type Props =  NavigationRouteScreenProps & PropertyDispatchProps & PropertyState & { title: string };

const editPropertyStrings = strings.detailedPropertyPage.editProperty;
const inputFormStrings = editPropertyStrings.inputForm;
const ADDRESS = 'address';

/**
 * Helper method that checks if a string is not a positive whole number or if 
 * it has only whitespace (blank/undefined numbers results in 0).
 * @param data 
 */
function isStrictlyNotPositiveWholeOrBlank(data: string){
    return isNotPositiveWholeNumber(data) || isEmptyOrSpaces(data);
}

/**
 * The list of propertys used to render the neccessary input forms 
 * inside the PropertyMutatorModal.
 */
const formProps: FormProps[]  = [ 
    ADDRESS,
    {
        key: 'tenants',
        name: inputFormStrings.maxTenants,
        errorMessage: 'Tenants must be a number',
    },
    {
        key: 'bedrooms',
        name: inputFormStrings.bedrooms,
        errorMessage: 'Bedrooms must be a number',
    }, 
    {
        key: 'bathrooms',
        name: inputFormStrings.bathrooms,
        errorMessage: 'Bathrooms must be a number',
    }, 
];

/**
 * Methods used to validate the forms in the component. This 
 * is passed into the validate PropertyMutatorModal's 
 * validationMethod props.
 */
const validationMethods: ValidationFunction[] = [
    isEmptyOrSpaces, 
    isStrictlyNotPositiveWholeOrBlank,
    isStrictlyNotPositiveWholeOrBlank,
    isStrictlyNotPositiveWholeOrBlank,
];

/**
 * Converts a property into the the initial value array to 
 * prepopulate the forms. 
 * @param property 
 */
function addressObjectToArray(property?: Property){
    // Base Case: Property is null or undefined
    if(isNullOrUndefined(property)){
        return undefined;
    }
    const {address, tenants, bedrooms, bathrooms} = property;
    return [address, tenants, bedrooms, bathrooms];
}


/**
 * ---------------------------------------------------------------
 * Property Modal
 * ---------------------------------------------------------------
 * A Component that renders an overlay modal intended to Add or Edit 
 * exisiting properties. Adding and editing properties fundamentally
 * have the same form with slightly different changes. For example: 
 * Adding properties do not require a propId or the previous property. 
 * 
 * To render a prepopulated form, pass in data into initialValues. 
 */
export default class PropertyModalBase extends React.Component<Props> {
    propId;

    initialValues;

    constructor(props: Readonly<Props>) {
        super(props);
        this.onClickSubmit = this.onClickSubmit.bind(this);

        /* Initialize component members */
        this.propId = props.navigation.getParam('propId');
        this.initialValues = addressObjectToArray(props.oldProp);
    } 

    /**
     * A callback method bounded to this component intended to be invoked when the 
     * Property Mutator Modal's Thin Button has been pressed.
     * @param state - State of the PropertyMutatorModal to pull that data from.
     * @param displayError - Callback method to render errors when a submission has failed
     */
    async onClickSubmit(state: FormState, displayError: (msg: string) => void){
        const {email, onSendPropertyRequest, propId, oldProp, roopairsToken} = this.props;
        const {address, bedrooms, bathrooms, tenants} = state;
        const newProperty : Property = {
            propId,
            address,
            bedrooms: Number(bedrooms), 
            bathrooms: Number(bathrooms), 
            tenants: Number(tenants),
        };
        const info: PropertyState = { email, propId, oldProp, roopairsToken};

        await onSendPropertyRequest(newProperty, info, displayError).catch(error => {console.log(error); throw error;});   
    }

    render() {
        const {navigation, title} = this.props;
        const {onClickSubmit, initialValues, propId} = this;
        return( 
            <PropertyMutatorModal
                title={title}
                navigation={navigation}
                formProps={formProps} 
                validationMethods={validationMethods}
                initialValues={initialValues}
                goBackRoute={{route: SingleProperty, params: {propId}}}
                submitButtonName='Save'
                onClickSubmit={onClickSubmit}/>
        );
    }
};