import React from "react";
import { TenantInfo } from 'homepairs-types';
import { isEmailSyntaxValid, isAlphaCharacterOnly, isPhoneNumberValid, isNullOrUndefined  } from 'src/utility';
import {navigationPages, prepareNavigationHandlerComponent, NavigationRouteScreenProps} from 'src/routes';
import { updateTenant } from "homepairs-endpoints";
import { DetailedPropertyMutatorDispatchProps, DetailedPropertyMutatorModal, withTitle } from '../CommonProps';
import { FormProps, ValidationFunction, FormState, PropertyMutatorModal } from '../PropertyMutatorModal';

const {SingleProperty} = navigationPages;
type Props =  NavigationRouteScreenProps & DetailedPropertyMutatorDispatchProps & {title: string};

const formProps: FormProps[] = [
    {
        key: 'firstName',
        name: 'FIRST NAME',
        errorMessage: 'Tenant must have a first name.',
    }, 
    {
        key: 'lastName',
        name: 'LAST NAME',
        errorMessage: 'Tenant must have a last name.',
    }, 
    {
        key: 'email',
        name: 'EMAIL',
        errorMessage: 'Tenant must have an email.',
    }, 
    {
        key: 'phoneNumber',
        name: 'PHONE NUMBER',
        errorMessage: 'Tenant must have a phone number',
    }, 
];

/* Helper methods used to valid the forms */
function isNotAlphaCharacterOnly(data: string): boolean {
    return !isAlphaCharacterOnly(data);
}

function isNotEmailSyntaxValid(data: string): boolean {
    return !isEmailSyntaxValid(data);
}

function isNotPhoneNumberValid(data: string): boolean {
    return !isPhoneNumberValid(data);
}
/* Helper methods used to valid the forms */

/**
 * Functions passed into the Property Mutator Modal that 
 * will be used to valid the forms in order.
 */
const validationMethods: ValidationFunction[] = [
    isNotAlphaCharacterOnly,
    isNotAlphaCharacterOnly,
    isNotEmailSyntaxValid,
    isNotPhoneNumberValid,
];


/**
 * Helper method that converts a tenant object to an array in the 
 * order that the Property Mutator Modal can properly process.
 * @param tenant - Object to be converted
 */
function tenantObjectToArray(tenant?: TenantInfo){
    if(isNullOrUndefined(tenant)){
        return null;
    }
    const {firstName, lastName, email, phoneNumber} = tenant;
    return [firstName, lastName, email, phoneNumber];
}


/**
 * ---------------------------------------------------------------
 * Property Modal
 * ---------------------------------------------------------------
 * A Component that renders an overlay modal intended to Add or Edit 
 * exisiting tenants. Adding and editing tenants fundamentally
 * have the same form with slightly different changes. Editing a tenant
 * will consists of preexisting data while Adding does not.
 * To render a prepopulated form, pass in data into initialValues. 
 */
export class TenantModalBase extends React.Component<Props> {
    initialValues;

    propId;
  
    constructor(props: Readonly<Props>) {
        super(props);
        this.onClickSubmit = this.onClickSubmit.bind(this);
        this.onClickRemove = this.onClickRemove.bind(this);

        const currentTenant = props.navigation.getParam('tenant');
        this.propId = props.navigation.getParam('propId');
        this.initialValues = tenantObjectToArray(currentTenant);
    } 
  
    /**
     * Function to invoke when the Property Mutator Modal's blue submit button 
     * has been pressed.
     * @param state - State of the Property Mutator Modal used to send the api request
     * @param displayError - Callback that invokes upon submission failure
     */
    async onClickSubmit(state: FormState, displayError: (msg: string) => void) {
        const {setAppliancesAndTenants} = this.props;
        const newTenantInfo: TenantInfo = state as TenantInfo;
        const postValues = {propId: this.propId, ...newTenantInfo};
        await updateTenant(postValues, displayError).then(() => {
            setAppliancesAndTenants(String(this.propId));
        }).catch(error => {
            console.log(error)
            throw error;
        });
    };

    /**
     * Function to invoke when the Property Mutator Modal's red remove button 
     * has been pressed.
     * @param state - State of the Property Mutator Modal used to send the api request
     * @param displayError - Callback that invokes upon submission failure
     */
    onClickRemove(state: FormState, displayError: (msg: string) => void){};

    render() {
        const {propId, initialValues, onClickRemove, onClickSubmit, props} = this;
        const {title} = props;
        const {navigation} = this.props;
        const renderRemove = (title === 'Edit Tenant'); 

        return(
            <PropertyMutatorModal
                title={title}
                navigation={navigation}
                formProps={formProps} 
                validationMethods={validationMethods}
                initialValues={initialValues}
                goBackRoute={{route: SingleProperty, params: {propId}}}
                onClickSubmit={onClickSubmit}
                onClickRemove={renderRemove ? onClickRemove : undefined}/>
        );
    }
}

const TenantModal = DetailedPropertyMutatorModal(TenantModalBase);
const NavigableTenantModal = prepareNavigationHandlerComponent(TenantModal);

export const AddTenantModal = withTitle(NavigableTenantModal, 'Add Tenant');
export const EditTenantModal = withTitle(NavigableTenantModal, 'Edit Tenant');
