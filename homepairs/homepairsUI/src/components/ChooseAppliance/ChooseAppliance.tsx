import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ThinButton, ThinButtonProps} from 'src/elements';
import {Appliance, ApplianceType} from 'homepairs-types';
import * as BaseStyles from 'homepairs-base-styles';
import Colors from 'homepairs-colors';
import {categoryToString} from 'src/utility';
import {Divider} from 'react-native-elements';
import ApplianceCategorizer from '../ApplianceCategorizer/ApplianceCategorizer';


export type ChooseApplianceProps = {
    parentCallBack?: (child? : any) => any, 
    appliances?: Appliance[],
    applianceType?: ApplianceType,
}


export type ChooseApplianceState = {
    clicked: boolean, 
    selected: string, 
}

const initialState : ChooseApplianceState = {
    clicked: false, 
    selected: '',
};

const styles = StyleSheet.create({
    selectedText: {
        color: Colors.LightModeColors.greyButtonText, 
        fontSize: BaseStyles.FontTheme.reg,
        alignSelf: 'center',
    },
    resultContainerStyle: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: BaseStyles.MarginPadding.small,
        marginBottom: BaseStyles.MarginPadding.small,
        minHeight: 50,
        width: 400,
        borderRadius: BaseStyles.BorderRadius.large,
        borderWidth: 2,
        borderColor: Colors.LightModeColors.greyButton,
    }, 
});

export default class ChooseAppliance extends Component<ChooseApplianceProps,ChooseApplianceState> {

    buttonProps: ThinButtonProps = {
        containerStyle: {
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: BaseStyles.MarginPadding.largeConst,
            marginBottom: BaseStyles.MarginPadding.large,
            minHeight: 50,
            maxWidth: 300,
            width: BaseStyles.ContentWidth.thin,
        }, 
        buttonStyle: {
            alignItems: 'center',
            backgroundColor: Colors.LightModeColors.transparent,
            padding: BaseStyles.MarginPadding.mediumConst,
            borderRadius: BaseStyles.BorderRadius.large,
            borderWidth: 2,
            borderColor: Colors.LightModeColors.greyButton,
        },
        buttonTextStyle: {
            color: Colors.LightModeColors.greyButtonText, 
            fontSize: BaseStyles.FontTheme.reg,
            alignSelf: 'center',
        },
    }

    constructor(props: Readonly<ChooseApplianceProps>) {
        super(props);
        this.state = initialState;
        this.setSelectedAppliance = this.setSelectedAppliance.bind(this);
    }

    setSelectedAppliance(appliance: Appliance) {
        const {parentCallBack} = this.props;
        this.setState({selected: appliance.appName, clicked: true});
        parentCallBack(appliance.applianceId);
    }
    
    render() {
        const {clicked, selected} = this.state;
        const {appliances, applianceType} = this.props;

        return clicked ? 
            <View style={styles.resultContainerStyle}>
                <Text style={styles.selectedText}>{selected}</Text>
            </View> :
        (
            <View>
                <ThinButton 
                    key={categoryToString(applianceType)}
                    name={`${categoryToString(applianceType)} (No Appliance)`}
                    containerStyle={this.buttonProps.containerStyle}
                    buttonStyle={this.buttonProps.buttonStyle}
                    buttonTextStyle={this.buttonProps.buttonTextStyle}
                    onClick={() => {
                        const app : Appliance = {
                            applianceId: '-1',
                            appName: `General ${categoryToString(applianceType)} (No Appliance)`, 
                            modelNum: 0, 
                            serialNum: 0, 
                            category: ApplianceType.None, 
                            manufacturer: '', 
                            location: '',
                        };
                        this.setSelectedAppliance(app);
                    }}
                />
                <Divider />
                <ApplianceCategorizer onClick={this.setSelectedAppliance} appliances={appliances} buttonName='Select'/>
            </View>

        );
    }
}