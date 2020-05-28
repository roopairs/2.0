import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { ApplianceType } from 'homepairs-types';
import { ButtonWithBitmap } from 'src/elements';
import {bolt, fan, tint, blender} from 'homepairs-images';
import * as BaseStyles from 'homepairs-base-styles';
import { categoryToString } from 'src/utility';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignSelf: 'center',
        marginTop: BaseStyles.MarginPadding.medium,
    },
    formTitle: {
        fontFamily: BaseStyles.FontTheme.primary,
        fontSize: BaseStyles.FontTheme.small,
        color: '#AFB3B5',
    },
    buttonContainer: {
        flex: 1,
        flexDirection:'row', 
        marginBottom: BaseStyles.MarginPadding.large,
    },
    leftButtonContainer: {
        flex: 1,
        height: '100%',
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: '15%',
        paddingRight: '5%',
    },
    rightButtonContainer: {
        flex: 1,
        height: '100%',
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: '15%',
        paddingLeft: '5%',
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'column',
        padding: 10,
        minWidth: 110,
        minHeight: Platform.OS === 'web' ? 105 : 105,
        maxWidth: 110,
        width: BaseStyles.ContentWidth.max,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#BEC3C7',
        shadowRadius: 2,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: .2,
        elevation: 2,
    },
    option: {
        fontSize : BaseStyles.FontTheme.reg,
        fontFamily: BaseStyles.FontTheme.primary,
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

type State = {
    /**
     * If a button has been selected, this state value will force a string to render 
     */
    hasBeenClicked: boolean,

    /**
     * String that will be presented when an option has been selected. 
     */
    selectedOption: string,
}

/**
 * ------------------------------------------------------------
 * Choose Service Category Component 
 * ------------------------------------------------------------
 * A visual component that shows the user four buttons that help in navigating to different 
 * pages for requesting a new requests. If an option is selected, text will instead 
 * be rendered.  
 * @param props 
 */
export default class ChooseServiceCategory extends React.Component<Props, State>{

    onPress

    constructor(props: Readonly<Props>){
        super(props);

        this.state = {
            hasBeenClicked: false,
            selectedOption: '',
        };
        const {onPress} = props;
        this.onPress = onPress;
    }

    setOptionString(option: string){
        this.setState({
            hasBeenClicked: true,
            selectedOption: option,
        });
    }

    setServiceCategory(type: ApplianceType){
        this.onPress(type);
        this.setOptionString(categoryToString(type));
    }
    
    render(){
        const {container, leftButtonContainer, rightButtonContainer, buttonContainer, button, option} = styles;
        const {hasBeenClicked, selectedOption} = this.state;
        return hasBeenClicked ? 
        (<View style={{alignSelf: 'center', width: BaseStyles.ContentWidth.reg}}>
            <Text style={option}>{selectedOption}</Text>
            </View>
        ) 
        : 
        (
            <View style={{alignSelf: 'center', width: BaseStyles.ContentWidth.reg, marginBottom: 10}}>
                <View style={container}>
                    <View style={buttonContainer}>
                        <ButtonWithBitmap 
                            image={bolt} 
                            name='Lighting and Electrical' 
                            onPress={() => {this.setServiceCategory(ApplianceType.LightingAndElectric);}}
                            containerStyle={leftButtonContainer}
                            buttonStyle={button}/>
                        <ButtonWithBitmap 
                            image={tint} 
                            name='Plumbing' 
                            onPress={() => {this.setServiceCategory(ApplianceType.Plumbing);}}
                            containerStyle={rightButtonContainer}
                            buttonStyle={button}/>
                    </View>
                    <View style={buttonContainer}>
                        <ButtonWithBitmap 
                            image={fan} 
                            name={`Heating and\nAir Conditioning`}
                            onPress={() => {this.setServiceCategory(ApplianceType.HVAC);}}
                            containerStyle={leftButtonContainer}
                            buttonStyle={button}/>
                        <ButtonWithBitmap 
                            image={blender} 
                            name='Appliance' 
                            onPress={() => {this.setServiceCategory(ApplianceType.GeneralAppliance);}}
                            containerStyle={rightButtonContainer}
                            buttonStyle={button}/>
                    </View>
                </View>
            </View>
        );
    };
}

ChooseServiceCategory.defaultProps = {
    testID: 'choose-service-category',
};