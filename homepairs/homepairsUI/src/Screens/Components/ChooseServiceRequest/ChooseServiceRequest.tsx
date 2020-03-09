import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { ApplianceType } from 'src/state/types';
import { ButtonWithBitmap } from 'homepairs-elements';
import {bolt, fan, tint, blender} from 'homepairs-images';
import * as BaseStyles from 'homepairs-base-styles';


const styles = StyleSheet.create({
    container: {
        width: '75%',
        alignContent: 'center',
        alignSelf: 'center',
        marginTop: BaseStyles.MarginPadding.medium,
    },
    formTitle: {
        fontFamily: BaseStyles.FontTheme.primary,
        fontSize: BaseStyles.FontTheme.small,
        color: '#AFB3B5',
    },
    buttonContainer: {
        // flex: 1,
        height: '100%',
        width: '50%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        flexDirection: 'column',
        padding: 10,
        height: '100%',
        width: BaseStyles.ContentWidth.thin,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: BaseStyles.LightColorTheme.gray,

        shadowColor: 'black',
        shadowRadius: 3,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: .2,
        elevation: 2,
    },
});

type Props = {
    /**
     * Id used to identify this component during testing 
     */
    testID?: string,

    /**
     * The callback function that should return the selected option to the parent
     */
    onPress: (...args) => any,
}

/**
 * ------------------------------------------------------------
 * Choose Service Request Component 
 * ------------------------------------------------------------
 * A visual component that shows the user four buttons that help in navigating to different 
 * pages for requesting a new requests. Depending on the 
 * @param props 
 */
export default function ChooseServiceRequest(props: any){
    const {onPress} = props;
    const {container, formTitle, buttonContainer, button} = styles;
    
    function setPlumbing() { onPress(ApplianceType.Plumbing); }
    function setLightingAndElectric() { onPress(ApplianceType.LightingAndElectric); }
    function setHVAC() { onPress(ApplianceType.HVAC); }
    function setGeneralAppliance() { onPress(ApplianceType.GeneralAppliance); }

    return(
        <View style={{alignSelf: 'center', width: BaseStyles.ContentWidth.reg}}>
            <Text style={formTitle}>CHOOSE SERVICE REQUEST CATEGORY</Text>
            <View style={container}>
                <View style={{flexDirection:'row', flex: 1, marginBottom: BaseStyles.MarginPadding.large}}>
                    <ButtonWithBitmap 
                        image={bolt} 
                        name='Lighting and Electrical' 
                        onPress={setLightingAndElectric}
                        containerStyle={buttonContainer}
                        buttonStyle={button}/>
                    <ButtonWithBitmap 
                        image={tint} 
                        name='Plumbing' 
                        onPress={setPlumbing}
                        containerStyle={buttonContainer}
                        buttonStyle={button}/>
                </View>
                <View style={{flexDirection:'row', flex: 1, marginTop: BaseStyles.MarginPadding.large}}>
                    <ButtonWithBitmap 
                        image={fan} 
                        name='Heating and Air Conditioning' 
                        onPress={setHVAC}
                        containerStyle={buttonContainer}
                        buttonStyle={button}/>
                    <ButtonWithBitmap 
                        image={blender} 
                        name='Appliance' 
                        onPress={setGeneralAppliance}
                        containerStyle={buttonContainer}
                        buttonStyle={button}/>
                </View>
            </View>
        </View>
    );
}

ChooseServiceRequest.defaultProps ={
    testID: 'choose-service-request',
};