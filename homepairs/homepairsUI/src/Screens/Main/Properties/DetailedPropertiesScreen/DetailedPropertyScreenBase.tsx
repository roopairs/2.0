import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import { 
    View, 
    Platform, 
    SafeAreaView, 
    ScrollView, 
    ScrollViewProps, 
    Image, 
    StyleSheet, 
    ImageProps 
} from 'react-native';
import { defaultProperty } from 'homepair-images';
import {GeneralHomeInfo, GeneralHomeInfoProps, AddressSticker } from 'homepair-components';
import { HomepairsPropertyAttributes, PropertyListState, Property, HomePairsDimensions } from 'homepair-types';
import { NavigationStackScreenProps } from 'react-navigation-stack'
import strings from 'homepair-strings';
import * as BaseStyles from 'homepair-base-styles'
import { DarkModeInjectedProps } from 'homepair-components';

const navParams = strings.detailedPropertyPage.navigationParams

export type DetailedPropertyStateProps = DarkModeInjectedProps & {
  properties: PropertyListState,
}
export type DetailedPropertyDispatchProps = {
  onUpdateProperty?: (index : number, address: string, tenants: number, bedrooms: number, bathrooms: number) => void,
  onRemoveProperty?: (index : number) => void;
}

type Props = NavigationStackScreenProps & DetailedPropertyStateProps & DetailedPropertyDispatchProps
const propertyKeys = HomepairsPropertyAttributes

export default function DetailedPropertyScreenBase(props:Props){

    const id: number = props.navigation.getParam(navParams.propertyIndex)
    const property: Property = props.properties[id]
    let styles = setStyles(props.primaryColorTheme)

    function editProperty() {
      //TODO: ADD MODAL AND SEND DATA FROM UPDATE PROPERTY 
      props.onUpdateProperty(id, 'New Address', 0, 0, 1)
    }

    const scrollViewProps: ScrollViewProps  = {
        //style: {flex: 1, marginBottom: BaseStyles.MarginPadding.largeConst}, 
        //contentContainerStyle: styles.scrollViewContentContainer,
        //directionalLockEnabled: true,
        //automaticallyAdjustContentInsets: false,
    }

    const imageProps : ImageProps = { 
        source: defaultProperty,
        style: Platform.OS === 'web' ? styles.homePairsPropertiesImageWeb : styles.homePairsPropertiesImage,
        resizeMode: 'cover',
    }

    const generalHomeInfoProps:  GeneralHomeInfoProps = {
        address: property[propertyKeys.ADDRESS],
        tenants: property[propertyKeys.TENANTS],
        bedrooms: property[propertyKeys.BEDROOMS],
        bathrooms: property[propertyKeys.BATHROOMS],
        onClick: editProperty,
        primaryColorTheme: props.primaryColorTheme  
    }

    function renderContents(){
        return(
        <ScrollView style={{flexGrow: 1}}>
            <View style={styles.addBottomMargin}>
                <AddressSticker
                address={property[propertyKeys.ADDRESS]}
                primaryColorTheme={props.primaryColorTheme}/>
                <View style={styles.imageWrapper}>
                <View style={styles.imageContainer}>
                    <Image {...imageProps}/>
                    </View>
                </View>
                <GeneralHomeInfo {...generalHomeInfoProps} />
            </View>
        </ScrollView>
        )
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
    ))

}

function setStyles(colorTheme?:BaseStyles.ColorTheme) { 
    let colors = (colorTheme == null) ? BaseStyles.LightColorTheme : colorTheme
    return (    
        StyleSheet.create({
            container : {
                alignItems: 'center',
                backgroundColor: colors.space,
                borderWidth: 1, 
                width: BaseStyles.ContentWidth.max,
                //minHeight: HomePairsDimensions.MIN_PALLET_HEIGHT,
                //flex: 1,
            },
            pallet:{
                backgroundColor: colors.secondary,
                width: BaseStyles.ContentWidth.max,
                borderWidth: 1, 
                //flex: 1,
                //minHeight: HomePairsDimensions.MIN_PALLET_HEIGHT,
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
                alignSelf:'center',
                alignContent: 'center',
                shadowColor: colors.shadow,
                shadowRadius: 10,
                shadowOffset: {width : 1, height: 1,},
                shadowOpacity: .25,
                elevation: 9,
            },
            scrollViewContentContainer: {
                maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
                backgroundColor: colors.secondary,
                alignSelf: 'center',
                width: BaseStyles.ContentWidth.max,
                //flexGrow: 1,
            },
            addBottomMargin: {
                flex: 1,
                marginBottom: BaseStyles.MarginPadding.largeConst
            },
            homePairsPropertiesImage: {
                flex: 1,
                alignSelf:'center', 
                width: BaseStyles.ContentWidth.max,
                height: '100%',
                overflow: 'hidden',
            },
            homePairsPropertiesImageWeb: {
                alignSelf:'center', 
                width: BaseStyles.ContentWidth.max,
                height: '100%',
                overflow: 'hidden',
            },
        })
    )};