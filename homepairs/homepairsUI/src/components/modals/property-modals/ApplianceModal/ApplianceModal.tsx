import React from "react";
import strings from 'homepairs-strings';
import { Appliance } from 'homepairs-types';
import { isNotPositiveWholeNumber, isEmptyOrSpaces, isNullOrUndefined } from 'src/utility';
import { navigationPages, NavigationRouteScreenProps, prepareNavigationHandlerComponent } from 'src/routes';
import { postUpdatedAppliance, postNewAppliance } from 'homepairs-endpoints';
import { DetailedPropertyMutatorDispatchProps, DetailedPropertyMutatorModal, withTitle, PropertyStateProps } from '../CommonProps';
import { FormProps, ValidationFunction, PropertyMutatorModal, FormState } from '../PropertyMutatorModal';


const { SingleProperty } = navigationPages;

type Props = 
    & NavigationRouteScreenProps 
    & DetailedPropertyMutatorDispatchProps 
    & PropertyStateProps 
    & {title: 'Edit Appliance' | 'Add Appliance'};


// Strings that will be used for keys and rendering text within the component.
const APPLIANCE_CATEGORY = 'category';
const editApplianceStrings = strings.applianceInfo.applianceModal;
const DefaultMessage: string = "The specified appliance for this property could not be found in our system. This may be a server issue.";

/**
 * Form Properties used to indicate to the Property Mutator Modal what 
 * it should render.
 */
const inputForms: FormProps[] = [
    APPLIANCE_CATEGORY,
    {
        key: 'appName',
        name: editApplianceStrings.name,
        errorMessage: 'Name cannot be empty',
    },
    {
        key: "manufacturer",
        name: editApplianceStrings.manufacturer,
        optional: true,
    },
    {
        key: "modelNum",
        name: editApplianceStrings.modelNum,
        errorMessage: 'Model number must be a number',
        optional: true,
    },
    {
        key: "serialNum",
        name: editApplianceStrings.serialNum,
        errorMessage: 'Serial number must be a number',
        optional: true,
    },
    {
        key: "location",
        name: editApplianceStrings.location,
        errorMessage: 'Locations cannot be empty',
    },
];

/**
 * Methods used to verify if a valid form has been given.
 */
const validationMethods: ValidationFunction[] = [
    undefined,
    isEmptyOrSpaces,
    isEmptyOrSpaces,
    isNotPositiveWholeNumber,
    isNotPositiveWholeNumber, 
    isEmptyOrSpaces,
];


/**
 * A method that helps convert an Appliance object into an initalValue array intended 
 * to be used to prepopulate the data in the Property Mutator Modal.
 * @param appliance - Value to be converted 
 */
function applianceObjectToArray(appliance: Appliance){
    if(isNullOrUndefined(appliance)){
        return null;
    }
    const { category, manufacturer, appName, modelNum, serialNum, location } = appliance;
    const modelNumString = isNullOrUndefined(modelNum) ? undefined : modelNum.toString();
    const serialNumString = isNullOrUndefined(serialNum) ? undefined : serialNum.toString();
    return [category, appName, manufacturer, modelNumString, serialNumString, location];
}

/**
 * ---------------------------------------------------------------
 * Appliance Modal Base
 * ---------------------------------------------------------------
 * A Component that renders an overlay modal intended to Add or Edit 
 * exisiting appliances. Adding and editing properties fundamentally
 * have the same form with slightly different changes.
 * 
 * To render data with prepopulated data, pass in assign the navigators
 * param 'appliance' key a value. 
 */
export class ApplianceModalBase extends React.Component<Props> {
    propId;

    property;

    initialValues;

    applianceId: string;

    constructor(props: Readonly<Props>) {
        super(props);
        this.updateAppliance = this.updateAppliance.bind(this);

        this.propId = props.navigation.getParam('propId');
        this.property = props.properties[this.propId];
        const appliance = props.navigation.getParam('appliance');
        this.initialValues = applianceObjectToArray(appliance);
        // Assign appId to null if Adding a New Appliance, Otherwise use the predefined value
        this.applianceId = isNullOrUndefined(appliance) ? null : appliance.applianceId;
    }

    /**
     * An async callback method that is bounded to this component. It a method that is intended 
     * that sends a request to the Homepairs Backend to update or add an appliance. 
     * @param state - Data recieved from the Property Mutator Modal's state used to send the api request
     * @param displayError - Callback method that invokes and renders an error message when 
     * submission has failed.
     */
    async updateAppliance(state: FormState, displayError: (msg: string) => void) {
        const { propId, applianceId } = this;
        const { setAppliancesAndTenants, token, title } = this.props;
        const { category, appName, manufacturer, modelNum, serialNum, location } = state;
        const newAppliance: Appliance = {
            applianceId, category, appName, manufacturer,
            modelNum: Number(modelNum),
            serialNum: Number(serialNum),
            location,
        };
        const info = { property: this.property, token };

        if (title === 'Edit Appliance') {
            await postUpdatedAppliance(token, this.property.propId, newAppliance, displayError).then(() => {
                setAppliancesAndTenants(propId.toString(), token);
            }).catch((error: Error) => {
                console.log(error);
                if (error.message.includes('500')) {
                    displayError(DefaultMessage);
                }
                else {
                    displayError(error.message);
                }
            });
        } else {
            await postNewAppliance(newAppliance, displayError, info).then(() => {
                setAppliancesAndTenants(propId.toString(), token);
            }).catch((error: Error) => {
                console.log(error);
                if (error.message.includes('500')) {
                    displayError(DefaultMessage);
                }
                else {
                    displayError(error.message);
                }
            });
        }
    }

    render() {
        const {navigation, title} = this.props;
        const {updateAppliance, initialValues, propId} = this;
        return( 
            <PropertyMutatorModal
                title={title}
                navigation={navigation}
                formProps={inputForms} 
                validationMethods={validationMethods}
                initialValues={initialValues}
                goBackRoute={{route: SingleProperty, params: {propId}}}
                submitButtonName='Save'
                onClickSubmit={updateAppliance}/>
        );
    }
}

// Wrap the base components in HOC to be fully utilized. 
const ApplianceModal = DetailedPropertyMutatorModal(ApplianceModalBase);
const NavigableComponent = prepareNavigationHandlerComponent(ApplianceModal);

/**
 * ---------------------------------------------------------------
 * Add Appliance Modal
 * ---------------------------------------------------------------
 * A Component that renders an overlay modal intended to Add 
 * appliances to an existing property. It utilizes the Property Mutator 
 * Modal component and will send and api request via the 
 * postNewAppliance Method. 
 */
export const AddApplianceModal = withTitle(NavigableComponent, 'Add Appliance');

/**
 * ---------------------------------------------------------------
 * Edit Appliance Modal
 * ---------------------------------------------------------------
 * A Component that renders an overlay modal intended to Edit and exisiting
 * appliances. It utilizes the Property Mutator Modal component and will send and api 
 * request via the postUpdateAppliance Method. 
 */
export const EditApplianceModal = withTitle(NavigableComponent, 'Edit Appliance');
