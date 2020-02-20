import React, { useState } from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { HomePairsDimensions, TenantInfo } from 'homepairs-types';
import { Card } from 'homepairs-elements';
import ThinButton from 'src/Elements/Buttons/ThinButton';
import { isNullOrUndefined } from 'src/utility/ParameterChecker';
import { View, Text, StyleSheet } from 'react-native';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairFonts } from 'res/fonts';
import { navigationPages } from 'src/Routes/RouteConstants';

type CurrentTenantsCardProps = NavigationStackScreenProps & {
    /**
     * Used to identify this component during testing
     */
    testID?: string,

    /**
     * Unique identifier for the property. This is how the component knows where to edit 
     * the tenant.
     */
    propertyId: number,

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
}

const colors = BaseStyles.LightColorTheme;
const styles = StyleSheet.create({
    CircleShapeView: {
        height: 63,
        width: 63,
        borderRadius: 63/2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BaseStyles.LightColorTheme.transparent,
        borderColor: BaseStyles.LightColorTheme.gray,
        borderWidth:1.4,
    },
    initialsContainer: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tenantContact: {
        flex: 4,
        paddingVertical: BaseStyles.MarginPadding.mediumConst,
        paddingHorizontal: BaseStyles.MarginPadding.largeConst,
        alignItems: 'flex-start',
    },
    buttonContainer: {
        flex: 1.5,
        alignItems: 'center',
        paddingVertical: BaseStyles.MarginPadding.largeConst,
        paddingHorizontal: BaseStyles.MarginPadding.smallConst,
    },
    tenantInfoContainer: {
        flex:1,
        flexDirection: 'row',
        marginVertical: BaseStyles.MarginPadding.mediumConst,
    },
    container: {
        backgroundColor: colors.secondary,
        marginHorizontal: BaseStyles.MarginPadding.large,
        marginTop: BaseStyles.MarginPadding.largeConst,
        borderRadius: BaseStyles.BorderRadius.large,
        borderBottomColor: colors.veryLightGray,
        borderBottomWidth: 1,
        padding: BaseStyles.MarginPadding.large,
        paddingBottom: BaseStyles.MarginPadding.small,
        width: BaseStyles.ContentWidth.thin,
        alignSelf: 'center',
        shadowColor: colors.shadow,
        shadowRadius: 10,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.25,
        elevation: 9,
    },
    livingSpaceContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: BaseStyles.ContentWidth.wide,
        paddingVertical: BaseStyles.MarginPadding.mediumConst,
    },
    addressContainer: {
        borderBottomColor: colors.veryLightGray,
        borderBottomWidth: 1,
        paddingBottom: BaseStyles.MarginPadding.mediumConst,
        marginBottom: BaseStyles.MarginPadding.mediumConst,
    },
    streetAddress: {
        color: colors.tertiary,
        fontSize: BaseStyles.FontTheme.reg,
        fontFamily: HomePairFonts.nunito_bold,
    },
    cityStateText: {
        color: colors.tertiary,
        fontSize: BaseStyles.FontTheme.xsmal,
    },
    cardTitle: {
        fontSize: BaseStyles.FontTheme.reg + 2,
        maxWidth: 450,
        fontFamily: BaseStyles.FontTheme.secondary,
    },
    cardDescription: {
        fontFamily: BaseStyles.FontTheme.primary,
        fontSize: BaseStyles.FontTheme.small,
    },
    textContainer: {
        width: BaseStyles.ContentWidth.reg,
        borderBottomColor: colors.veryLightGray,
        paddingBottom: BaseStyles.MarginPadding.mediumConst,
        borderBottomWidth: 1,
    },
    detailContainer: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
    },
    detailName: {
        fontSize: BaseStyles.FontTheme.xsmal,
        marginBottom: BaseStyles.MarginPadding.mediumConst,
        color: colors.tertiary,
    },
    detail: {
        color: colors.tertiary,
        fontSize: BaseStyles.FontTheme.reg + 2,
        fontFamily: HomePairFonts.nunito_bold,
    },
    addButton: {
        alignItems: 'center',
        backgroundColor: colors.transparent,
        padding: BaseStyles.MarginPadding.mediumConst,
        width: HomePairsDimensions.MIN_BUTTON_WIDTH,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.lightGray,
    },
    editButton: {
        alignItems: 'center',
        backgroundColor: colors.transparent,
        paddingVertical: BaseStyles.MarginPadding.xsmallConst,
        width: BaseStyles.ContentWidth.thin,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.lightGray,
    },
    addButtonText: {
        color: colors.lightGray,
        fontSize: 20,
    },
    editButtonText: {
        color: colors.lightGray,
        fontSize: 19,
    },
    titleContainerStyle: {
        width: BaseStyles.ContentWidth.wide,
        borderBottomColor: BaseStyles.LightColorTheme.veryLightGray,
        paddingVertical: 5,
        borderBottomWidth: 1,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    
});


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
 * @param {Props} props 
 */
function CurrentTenantsCard(props: CurrentTenantsCardProps){
    const {navigation, tenants, maxTenants, propertyId} = props;
    const [error, setError] = useState(null);
    const numTenants = isNullOrUndefined(tenants) ? 0 : tenants.length;

    function navigateToAddTenantModal(){
        // TODO: Show error/alert if user invokes this function with maxTenants already reached.
        if(maxTenants <= numTenants){
            setError('This property has reached its maximum amount of tenants. Please remove a tenant if you wish to add another.');
            return;
        }
        setError(null);
        navigation.navigate(navigationPages.AddTenantModal);
    }

    function navigateToEditTenantModal(tenant: TenantInfo){
        console.log(tenant);
        navigation.navigate(navigationPages.EditTenantModal, {tenant, propertyId});
    }

    function renderError(){
        return isNullOrUndefined(error) ? <></> : (
            <Text>{error}</Text>
        );
    }

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
            <ThinButton name='Edit' onClick={() => {navigateToEditTenantModal(tenant);}} buttonStyle={styles.editButton} buttonTextStyle={styles.editButtonText} containerStyle={styles.buttonContainer}/>
        </View>);
    }

    function renderContent(){
        if(numTenants > maxTenants){
            // Should never reach here!!
            throw Error('Maximum Amount of Tenants Exceeded');
        }    
        return numTenants === 0 ? <></> : 
        tenants.map((tenant) => {
            return renderTenantInfo(tenant);
        });
    }

    return (
        <View style={{paddingBottom: BaseStyles.MarginPadding.largeConst}}>
        <Card title='Current Tenants' containerStyle={styles.container} titleStyle={styles.cardTitle} titleContainerStyle={styles.titleContainerStyle} >
            {renderError()}
            {renderContent()}
            <ThinButton name='Add Tenant' onClick={navigateToAddTenantModal} buttonTextStyle={styles.addButtonText} buttonStyle={styles.addButton} />
        </Card>
        </View>
    );
} 

CurrentTenantsCard.defaultProps = {
    testID: 'current-tenant-card',
    maxTenants: 100,
    tenants: [
        {
            firstName: 'Alex',
            lastName: 'Kavanaugh',
            email: 'alex@roopairs.com',
            phoneNumber: '838-0034-3333',
        },
        {
            firstName: 'David',
            lastName: 'Bartolomucci',
            email: 'david@roopairs.com',
            phoneNumber: '838-0034-3333',
        },
        {
   
            firstName: 'Ray',
            lastName: 'Bartolomucci',
            email: 'ray@roopairs.com',
            phoneNumber: '838-0031-3333',
        },
   ],
};

export default CurrentTenantsCard;



