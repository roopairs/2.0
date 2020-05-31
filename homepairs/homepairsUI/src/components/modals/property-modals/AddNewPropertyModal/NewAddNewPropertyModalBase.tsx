import React from "react";
import strings from 'homepairs-strings';
import { Property, AddNewPropertyState } from 'homepairs-types';
import {isNotPositiveWholeNumber, isEmptyOrSpaces} from 'src/utility';
import { NavigationRouteHandler, navigationPages } from 'src/routes';
import { ValidationFunction, FormProps, PropertyMutatorModal, FormState, ADDRESS } from '../PropertyMutatorModal';

export type AddNewPropertyDispatchProps = {
    onCreateProperty: (newProperty: Property, info: AddNewPropertyState,
         displayError: (msg: string) => void) => void
}

type Props = 
    & AddNewPropertyDispatchProps 
    & AddNewPropertyState 
    & { navigation: NavigationRouteHandler };

const addPropertyStrings = strings.propertiesPage.addProperty;
const inputFormStrings = addPropertyStrings.inputForm;

function isStrictlyNotPositiveWholeOrBlank(data: string){
    return isNotPositiveWholeNumber(data) || isEmptyOrSpaces(data);
}

const validationMethods: ValidationFunction[] = [
    isEmptyOrSpaces,
    isStrictlyNotPositiveWholeOrBlank,
    isStrictlyNotPositiveWholeOrBlank,
    isStrictlyNotPositiveWholeOrBlank,
];

const formProps: FormProps[] = [
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

export default class AddNewPropertyModalBase extends React.Component<Props> {
    constructor(props: Readonly<Props>) {
        super(props);
        this.onClickSubmit = this.onClickSubmit.bind(this);
    }

    onClickSubmit(state: FormState, displayError: (msg: string) => void) {
        const {address, tenants, bathrooms, bedrooms} = state;
        const {email, onCreateProperty, roopairsToken} = this.props;
        const newProperty : Property = {
            propId: undefined,
            address,
            tenants: Number(tenants),
            bedrooms: Number(bedrooms), 
            bathrooms: Number(bathrooms),
        };
        const info : AddNewPropertyState = {email, roopairsToken};
        onCreateProperty(newProperty, info, displayError); 
    }

    render() {
        const {navigation} = this.props;
        const {onClickSubmit} = this;
        return( 
            <PropertyMutatorModal
                title="Edit Property"
                navigation={navigation}
                formProps={formProps} 
                validationMethods={validationMethods}
                goBackRoute={navigationPages.PropertiesScreen}
                submitButtonName='Save'
                onClickSubmit={onClickSubmit}/>
        );
    }
}
