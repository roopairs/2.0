import React from "react";
import strings from 'homepairs-strings';
import { Property, EditPropertyState } from 'homepairs-types';
import { isNotPositiveWholeNumber, isEmptyOrSpaces } from 'src/utility';
import {navigationPages, NavigationRouteScreenProps, NavigationRouteHandler} from 'homepairs-routes';
import { PropertyMutatorModal, FormProps, ValidationFunction, FormState } from '../PropertyMutatorModal';

const {SingleProperty} = navigationPages;

export type EditPropertyDispatchProps = {
    onEditProperty: (newProperty: Property, info: EditPropertyState, 
        displayError: (msg: string) => void, navigation: NavigationRouteHandler) => void
}


type Props =  NavigationRouteScreenProps & EditPropertyDispatchProps & EditPropertyState;

const editPropertyStrings = strings.detailedPropertyPage.editProperty;
const inputFormStrings = editPropertyStrings.inputForm;
const APPLIANCE_CATEGORY = 'category';
const ADDRESS = 'address';

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

const validationMethods: ValidationFunction[] = [
    isEmptyOrSpaces, 
    isNotPositiveWholeNumber,
    isNotPositiveWholeNumber,
    isNotPositiveWholeNumber,
];

function addressObjectToArray(property: Property){
    const {address, tenants, bedrooms, bathrooms} = property;
    return [address, tenants, bedrooms, bathrooms];
}

export default class EditPropertyModalBase extends React.Component<Props> {
    propId;

    initialValues;

    constructor(props: Readonly<Props>) {
        super(props);
        this.propId = props.navigation.getParam('propId');
        this.onClickSubmit = this.onClickSubmit.bind(this);
        this.initialValues = addressObjectToArray(props.oldProp);
    } 

    onClickSubmit(state: FormState, displayError: (msg: string) => void){
        const {email, navigation, onEditProperty, propId, oldProp, roopairsToken} = this.props;
        const {address, bedrooms, bathrooms, tenants} = state;
        const newProperty : Property = {
            propId,
            address,
            bedrooms: Number(bedrooms), 
            bathrooms: Number(bathrooms), 
            tenants: Number(tenants),
        };
        const info: EditPropertyState = { email, propId, oldProp, roopairsToken};
        onEditProperty(newProperty, info, displayError, navigation);   
    }

    render() {
        const {navigation} = this.props;
        const {onClickSubmit, initialValues, propId} = this;
        return( 
            <PropertyMutatorModal
                title="Edit Property"
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