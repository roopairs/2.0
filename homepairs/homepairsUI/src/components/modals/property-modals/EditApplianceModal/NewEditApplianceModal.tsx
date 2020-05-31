import React from "react";
import strings from 'homepairs-strings';
import { Appliance } from 'homepairs-types';
import { isNotPositiveWholeNumber, isEmptyOrSpaces, isNullOrUndefined } from 'src/utility';
import { navigationPages, NavigationRouteScreenProps, prepareNavigationHandlerComponent } from 'src/routes';
import { postUpdatedAppliance } from 'homepairs-endpoints';
import { DetailedPropertyMutatorDispatchProps, DetailedPropertyMutatorModal } from '../CommonDispatchProps';
import { FormProps, ValidationFunction, PropertyMutatorModal, FormState } from '../PropertyMutatorModal';


const { SingleProperty } = navigationPages;
const APPLIANCE_CATEGORY = 'category';

type Props = NavigationRouteScreenProps & DetailedPropertyMutatorDispatchProps;
const editApplianceStrings = strings.applianceInfo.applianceModal;
const DefaultMessage: string = "The specified appliance for this property could not be found in our system. This may be a server issue.";

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

const validationMethods: ValidationFunction[] = [
    undefined,
    isEmptyOrSpaces,
    isEmptyOrSpaces,
    isNotPositiveWholeNumber,
    isNotPositiveWholeNumber, 
    isEmptyOrSpaces,
];

function applianceObjectToArray(appliance: Appliance){
    const { category, manufacturer, appName, modelNum, serialNum, location } = appliance;
    const modelNumString = isNullOrUndefined(modelNum) ? undefined : modelNum.toString();
    const serialNumString = isNullOrUndefined(serialNum) ? undefined : serialNum.toString();
    return [category, appName, manufacturer, modelNumString, serialNumString, location];
}

export class EditApplianceModalBase extends React.Component<Props> {
    propId;

    initialValues;

    applianceId: string;

    constructor(props: Readonly<Props>) {
        super(props);
        this.updateAppliance = this.updateAppliance.bind(this);

        this.propId = props.navigation.getParam('propId');
        const appliance = props.navigation.getParam('appliance');
        this.initialValues = applianceObjectToArray(appliance);
        this.applianceId = appliance.applianceId;
    }

    async updateAppliance(state: FormState, displayError: (msg: string) => void) {
        const { propId, applianceId } = this;
        const { setAppliancesAndTenants } = this.props;
        const { category, appName, manufacturer, modelNum, serialNum, location } = state;
        const newAppliance: Appliance = {
            applianceId, category, appName, manufacturer,
            modelNum: Number(modelNum),
            serialNum: Number(serialNum),
            location,
        };
        await postUpdatedAppliance(newAppliance, displayError).then(() => {
            setAppliancesAndTenants(String(propId));
        }).catch((error: Error) => {
            if (error.message.includes('500')) {
                console.log(error.message);
                displayError(DefaultMessage);
            }
            else {
                console.log(error.message);
                displayError(error.message);
            }
        });
    }

    render() {
        const {navigation} = this.props;
        const {updateAppliance, initialValues, propId} = this;
        return( 
            <PropertyMutatorModal
                title="Edit Appliance"
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

const EditApplianceModal = DetailedPropertyMutatorModal(EditApplianceModalBase);
export default prepareNavigationHandlerComponent(EditApplianceModal);