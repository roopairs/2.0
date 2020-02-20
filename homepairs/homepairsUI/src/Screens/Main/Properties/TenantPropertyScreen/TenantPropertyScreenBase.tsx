import React from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import { 
    View, 
    Platform, 
    SafeAreaView, 
    ScrollView, 
    Image, 
    StyleSheet, 
} from 'react-native';
import { defaultProperty } from 'homepairs-images';
import {GeneralHomeInfo, AddressSticker , DarkModeInjectedProps, PrimaryContactInfo } from 'homepairs-components';
import { HomepairsPropertyAttributes, PropertyListState, Property, HomePairsDimensions as HomepairsDimensions } from 'homepairs-types';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import * as BaseStyles from 'homepairs-base-styles';
import { isNullOrUndefined } from '../../../../utility/ParameterChecker';

/* tenants cannot edit properties */
const canEditProps = false;

export type TenantPropertyStateProps = DarkModeInjectedProps & {
  propertyState: PropertyListState,
}

export type TenantPropertyDispatchProps = {
    onRevealGoBack: (showGoBack:boolean) => any;
  }

type Props = NavigationStackScreenProps & TenantPropertyStateProps // & TenantPropertyDispatchProps
const propertyKeys = HomepairsPropertyAttributes;

function setStyles(colorTheme?:BaseStyles.ColorTheme) { 
    const colors = isNullOrUndefined(colorTheme) ? BaseStyles.LightColorTheme : colorTheme;
    return (    
        StyleSheet.create({
            container : {
                alignItems: 'center',
                backgroundColor: colors.space,
                width: BaseStyles.ContentWidth.max,
                flex:1,
            },
            pallet:{
                backgroundColor: colors.secondary,
                width: BaseStyles.ContentWidth.max,
                flex: 1,
                maxWidth: HomepairsDimensions.MAX_CONTENT_SIZE,
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
                alignSelf:'center',
                alignContent: 'center',
                shadowColor: colors.shadow,
                shadowRadius: 10,
                shadowOffset: {width : 1, height: 1},
                shadowOpacity: .25,
                elevation: 9,
            },
            scrollViewContentContainer: {
                maxWidth: HomepairsDimensions.MAX_CONTENT_SIZE,
                backgroundColor: colors.secondary,
                alignSelf: 'center',
                width: BaseStyles.ContentWidth.max,
                flexGrow: 1,
            },
            addBottomMargin: {
                flex: 1,
                marginBottom: BaseStyles.MarginPadding.largeConst,
            },
            homepairsPropertiesImage: {
                flex: 1,
                alignSelf:'center', 
                width: BaseStyles.ContentWidth.max,
                height: '100%',
                overflow: 'hidden',
            },
            homepairsPropertiesImageWeb: {
                alignSelf:'center', 
                width: BaseStyles.ContentWidth.max,
                height: '100%',
                overflow: 'hidden',
            },
        })
    );};

export default function TenantPropertyScreenBase(props:Props){
    const {propertyState, primaryColorTheme} = props;
    const {properties, propertyManager} = propertyState;

    const property: Property = properties[0]; // THIS IS BAD CODING, ASSUMING AN ARRAY IS OF SIZE 1
    const styles = setStyles(primaryColorTheme);

    function renderContents(){
        return(
        <ScrollView style={{flexGrow: 1}}>
            <View style={styles.addBottomMargin}>
                <AddressSticker
                address={property[propertyKeys.ADDRESS]}
                primaryColorTheme={primaryColorTheme}/>
                <View style={styles.imageWrapper}>
                <View style={styles.imageContainer}>
                    <Image 
                    source={defaultProperty}
                    style={Platform.OS === 'web' ? styles.homepairsPropertiesImageWeb : styles.homepairsPropertiesImage}
                    resizeMode='cover'/>
                </View>
                </View>
                <GeneralHomeInfo property={property} primaryColorTheme={primaryColorTheme} hasEdit={canEditProps} />
                <PrimaryContactInfo propertyManager={propertyManager} primaryColorTheme={primaryColorTheme}/>
            </View>
        </ScrollView>
        );
    }
    
    return(
        !(Platform.OS === 'ios') ? 
        (
            <View style={styles.container}>
                <View style={styles.pallet}>
                    {renderContents()}
                </View>
            </View>
        ) : (
            <View style={styles.container}>
                <SafeAreaView style={styles.pallet}>
                    {renderContents()}
                </SafeAreaView>
            </View>
    ));
}
