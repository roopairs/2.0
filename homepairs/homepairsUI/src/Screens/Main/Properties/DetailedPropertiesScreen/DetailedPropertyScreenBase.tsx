import React from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import {
    View,
    Platform,
    SafeAreaView,
    ScrollView,
    Image,
    StyleSheet,
    ImageProps,
} from 'react-native';
import { defaultProperty } from 'homepairs-images';
import {
    GeneralHomeInfo,
    AddressSticker,
    CurrentTenantCard,
    ApplianceInfo,
    
} from 'homepairs-components';
import {
    HomepairsPropertyAttributes,
    Property,
    HomePairsDimensions,
    AccountTypes,
    TenantAccount,
} from 'homepairs-types';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import * as BaseStyles from 'homepairs-base-styles';
import { isNullOrUndefined } from 'src/utility/ParameterChecker';
import { navigationKeys, navigationPages } from 'src/Routes/RouteConstants';
import { withNavigation } from 'react-navigation';

export type DetailedPropertyStateProps = {
    property: Property;
};

type Props = NavigationStackScreenProps & DetailedPropertyStateProps;
const CurrentTenants = withNavigation(CurrentTenantCard);
const propertyKeys = HomepairsPropertyAttributes;

function setStyles(colorTheme?: BaseStyles.ColorTheme) {
    const colors = isNullOrUndefined(colorTheme) ? BaseStyles.LightColorTheme : colorTheme;
    return StyleSheet.create({
        container: {
            alignItems: 'center',
            backgroundColor: colors.space,
            width: BaseStyles.ContentWidth.max,
            flex: 1,
        },
        pallet: {
            backgroundColor: colors.secondary,
            width: BaseStyles.ContentWidth.max,
            flex: 1,
            maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
            alignSelf: 'center',
        },
        imageContainer: {
            width: BaseStyles.ContentWidth.max,
            height: '100%',
            overflow: 'hidden',
            borderRadius: BaseStyles.BorderRadius.large,
        },
        imageWrapper: {
            width: BaseStyles.ContentWidth.thin,
            height: '50%',
            maxHeight: 200,
            borderRadius: BaseStyles.BorderRadius.large,
            backgroundColor: 'white',
            alignSelf: 'center',
            alignContent: 'center',
            shadowColor: colors.shadow,
            shadowRadius: 10,
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.25,
            elevation: 9,
        },
        scrollViewContentContainer: {
            maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
            backgroundColor: colors.secondary,
            alignSelf: 'center',
            width: BaseStyles.ContentWidth.max,
            flexGrow: 1,
        },
        addBottomMargin: {
            flex: 1,
            marginBottom: BaseStyles.MarginPadding.largeConst,
        },
        homePairsPropertiesImage: {
            flex: 1,
            alignSelf: 'center',
            width: BaseStyles.ContentWidth.max,
            height: '100%',
            overflow: 'hidden',
        },
        homePairsPropertiesImageWeb: {
            alignSelf: 'center',
            width: BaseStyles.ContentWidth.max,
            height: '100%',
            overflow: 'hidden',
        },
    });
}

// TODO: Get list of tenants from property and pass information to currentTenantCard 
const fakeTenants: TenantAccount[] = [
    {
        propId: 1,
        tenantId: 1,
        firstName: 'Alex',
        lastName: 'Kavanaugh',
        accountType: AccountTypes.Tenant,
        email: 'alex@roopairs.com',
        streetAddress: '1111 Some Street',
        city: 'San Luis Obispo',
        roopairsToken: '000000',
    },
];

export default function DetailedPropertyScreenBase(props: Props) {
    const { property, navigation } = props;
    const styles = setStyles(null);

    const imageProps: ImageProps = {
        source: defaultProperty,
        style:
            Platform.OS === 'web'
                ? styles.homePairsPropertiesImageWeb
                : styles.homePairsPropertiesImage,
        resizeMode: 'cover',
    };

    function navigateModal() {
        navigation.navigate(navigationPages.EditPropertyModal);
    }

    function renderImage() {
        const { source, style, resizeMode } = imageProps;
        return <Image source={source} style={style} resizeMode={resizeMode} />;
    }

    function renderGeneralHomeInfo() {
        return (
            <GeneralHomeInfo
                property={property}
                onClick={navigateModal}
            />
        );
    }

    function renderCurrentTenantInfo() {
        return(
            <CurrentTenantCard
                tenants={fakeTenants}
                maxTenants={property.tenants}
            />
        );
    }

    function renderApplianceInfo() {
        return (
            <ApplianceInfo/>
        );
    }

    function renderContents() {
        return (
            <ScrollView style={{ flexGrow: 1 }}>
                <View style={styles.addBottomMargin}>
                    <AddressSticker
                        address={property[propertyKeys.ADDRESS]}
                        city={property[propertyKeys.CITY]}
                        state={property[propertyKeys.STATE]}
                    />
                    <View style={styles.imageWrapper}>
                        <View style={styles.imageContainer}>
                            {renderImage()}
                        </View>
                    </View>
                    {renderGeneralHomeInfo()}
                    {renderApplianceInfo()}
                    {renderCurrentTenantInfo()}
                </View>
            </ScrollView>
        );
    }

    return !(Platform.OS === 'ios') ? (
        <View style={styles.container}>
            <View style={styles.pallet}>{renderContents()}</View>
        </View>
    ) : (
        <View style={styles.container}>
            <SafeAreaView style={styles.pallet}>
                {renderContents()}
            </SafeAreaView>
        </View>
    );
}

DetailedPropertyScreenBase.defaultProps = {
    primaryColorTheme: BaseStyles.LightColorTheme,
};