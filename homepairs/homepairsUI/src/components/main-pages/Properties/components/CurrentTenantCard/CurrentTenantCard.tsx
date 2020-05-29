import React, { useState } from 'react';
import { TenantInfo } from 'homepairs-types';
import { Card, ThinButton } from 'src/elements';
import { isNullOrUndefined } from 'src/utility';
import { View, Text, Platform } from 'react-native';
import * as BaseStyles from 'homepairs-base-styles';
import { navigationPages, NavigationRouteHandler } from 'src/routes';
import styles from './styles';

export type CurrentTenantCardProps =  {
    /**
     * Used to identify this component during testing
     */
    testID?: string,

    /**
     * Unique identifier for the property. This is how the component knows where to edit 
     * the tenant.
     */
    propId: string,

    /**
     * Maximum amount of tenants defined for the property. If somehow, the 
     * amount of tenants passed is large than this value, an error is raised. 
     * This will also prevent users from clicking Add Tenant if the maximum amount
     * has been reached.
     */
    maxTenants?: number,

    /**
     * The tenant information passed into this component. Used to present the information.
     */
    tenants?: TenantInfo[],


    /**
     * Renders add and edit buttons if selected. This is intended to be set to false if a tenant 
     * or guest view of this screen is rendered.
     */
    hasEdit?: boolean,

    /**
     * The navigation object that takes care of navigating between the application. This takes 
     * care of both web and native navigation.
     */
    navigation?: NavigationRouteHandler, 
}

/**
 * ---------------------------------------------------
 * Current Tenants Card
 * ---------------------------------------------------
 * A child component for the Detailed Property Card. This component will 
 * show the user the list of tenants associated with property. If a Property 
 * Manager, they will be able to navigate to pages that will permit them to 
 * add and edit tenants. The component is intended to recieve NavigationInjectedProps. 
 * To use this components to the fullest of its features, pass in a navigation object or 
 * call withNavigation on this component.  
 * @param {CurrentTenantCardProps} props 
 */
function CurrentTenantCard(props: CurrentTenantCardProps){
    const {navigation, tenants, maxTenants, propId, hasEdit} = props;
    const [error, setError] = useState(null);
    const numTenants = isNullOrUndefined(tenants) ? 0 : tenants.length;

    /**
     * This method compares the amount of tenants compared to the maximum amount of tenants permitted per property. 
     * If the total amount of housing capacity has been reached, an error is returned and dipslayed. Otherwise, 
     * the Add Property Modal Overlay is navigated to with the propId being assigned to the website parameter.
     */
    function navigateToAddTenantModal(){
        if(maxTenants <= numTenants){
            setError('This property has reached its maximum amount of tenants. Please remove a tenant if you wish to add another.');
            return;
        }
        setError(null);
        navigation.navigate(navigationPages.AddTenantModal, {propId}, true);
    }

    function navigateToEditTenantModal(tenant: TenantInfo){
        navigation.navigate(navigationPages.EditTenantModal, {propId, tenant}, true);
    }

    function renderError(){
        return isNullOrUndefined(error) ? <></> : (
            <Text>{error}</Text>
        );
    }

    /**
     * Individual rendering for each tenant provided for a specific property.
     * @param {TenantInfo} tenant - The individual Tenant found in the TenantInfo array 
     */
    function renderTenantInfo(tenant : TenantInfo){
        const tenantInitals: string = tenant.firstName[0].concat(tenant.lastName[0]).toUpperCase(); 
        return (
        <View key={tenant.email} style={styles.tenantInfoContainer}>
            <View style={styles.initialsContainer}>
                <View style={styles.CircleShapeView}>
                    <Text style={{fontFamily: BaseStyles.FontTheme.secondary, fontSize: 18, color: BaseStyles.LightColorTheme.gray}}>{tenantInitals}</Text>
                </View>
            </View>
            <View style={styles.tenantContact}>
                <Text style={{fontFamily: BaseStyles.FontTheme.secondary, fontSize: BaseStyles.FontTheme.small}}>{tenant.firstName}{' '}{tenant.lastName}</Text>
                <Text style={{fontFamily: BaseStyles.FontTheme.tertiary, fontSize: BaseStyles.FontTheme.small, color: BaseStyles.LightColorTheme.lightGray}}>{tenant.email}</Text>
                <Text style={{fontFamily: BaseStyles.FontTheme.tertiary, fontSize: BaseStyles.FontTheme.small, color: BaseStyles.LightColorTheme.lightGray}}>{tenant.phoneNumber}</Text>
            </View>
            { hasEdit ? 
                <ThinButton 
                testID='edit-tenant-button' 
                name='Edit' onClick={() => {navigateToEditTenantModal(tenant);}} 
                buttonStyle={styles.editButton} 
                buttonTextStyle={styles.editButtonText} 
                containerStyle={styles.buttonContainer}/>
                :
                <></>
            }
        </View>);
    }

    /**
     * If there is an issue with tenant capacity, then a error is thrown. Although, this should  never
     * be realistically reached. Otherwise the function will return a list of rendered tenant information.
     */
    function renderContent(){
        if(numTenants > maxTenants){
            // Should never reach here!!
            throw Error('Maximum Amount of Tenants Exceeded');
        }    
        return numTenants === 0 ? (
            <Text style={styles.emptyText}>No tenants have been added</Text>) : 
        tenants.map((tenant: TenantInfo) => {
            return renderTenantInfo(tenant);
        });
    }

    return (
        <>
            <View style={{paddingBottom: BaseStyles.MarginPadding.largeConst}}>
            <Card title='Current Tenants' 
                containerStyle={styles.container} 
                titleStyle={styles.cardTitle} 
                titleContainerStyle={styles.titleContainerStyle} >
                    {renderError()}
                    <>{renderContent()}</>
                    <View style={{marginBottom: Platform.OS === 'web' ? undefined: 10}}>
                    {hasEdit ?
                        <ThinButton 
                            name='Add Tenant' 
                            onClick={navigateToAddTenantModal} 
                            buttonTextStyle={styles.addButtonText} 
                            buttonStyle={styles.addButton} />
                        :
                        <></>
                    }
                    </View>
                </Card>
            </View>
        </>
    );
} 

CurrentTenantCard.defaultProps = {
    testID: 'current-tenant-card',
    maxTenants: 100,
    tenants: [],
    hasEdit: true,
};

export default CurrentTenantCard;



