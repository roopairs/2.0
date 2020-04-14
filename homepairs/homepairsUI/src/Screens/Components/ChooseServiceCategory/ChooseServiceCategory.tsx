import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { ApplianceType } from 'src/state/types';
import { ButtonWithBitmap } from 'homepairs-elements';
import {bolt, fan, tint, blender} from 'homepairs-images';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairFonts } from 'res/fonts';
import { categoryToString } from 'src/utility/ApplianceCategories';

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
        minHeight: 115, // TODO: Play around with the height to keep consistent accross all platforms 
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
    option: {
        fontSize : BaseStyles.FontTheme.reg,
        fontFamily: HomePairFonts.nunito_regular,
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
 * pages for requesting a new requests. Depending on the 
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
        const {container, buttonContainer, button, option} = styles;
        const {hasBeenClicked, selectedOption} = this.state;
        return hasBeenClicked ? 
        (<View style={{alignSelf: 'center', width: BaseStyles.ContentWidth.reg}}>
            <Text style={option}>{selectedOption}</Text>
            </View>
        ) 
        : 
        (
            <View style={{alignSelf: 'center', width: BaseStyles.ContentWidth.reg}}>
                <View style={container}>
                    <View style={{flexDirection:'row', flex: 1, marginBottom: BaseStyles.MarginPadding.large}}>
                        <ButtonWithBitmap 
                            image={bolt} 
                            name='Lighting and Electrical' 
                            onPress={() => {this.setServiceCategory(ApplianceType.LightingAndElectric);}}
                            containerStyle={buttonContainer}
                            buttonStyle={button}/>
                        <ButtonWithBitmap 
                            image={tint} 
                            name='Plumbing' 
                            onPress={() => {this.setServiceCategory(ApplianceType.Plumbing);}}
                            containerStyle={buttonContainer}
                            buttonStyle={button}/>
                    </View>
                    <View style={{flexDirection:'row', flex: 1, marginTop: BaseStyles.MarginPadding.large}}>
                        <ButtonWithBitmap 
                            image={fan} 
                            name='Heating and Air Conditioning' 
                            onPress={() => {this.setServiceCategory(ApplianceType.HVAC);}}
                            containerStyle={buttonContainer}
                            buttonStyle={button}/>
                        <ButtonWithBitmap 
                            image={blender} 
                            name='Appliance' 
                            onPress={() => {this.setServiceCategory(ApplianceType.GeneralAppliance);}}
                            containerStyle={buttonContainer}
                            buttonStyle={button}/>
                    </View>
                </View>
            </View>
        );
    };
}

ChooseServiceCategory.defaultProps ={
    testID: 'choose-service-category',
};