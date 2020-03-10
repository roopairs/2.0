import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {ThinButton, ThinButtonProps} from 'homepairs-elements';
import {Appliance, HomePairsDimensions, ApplianceType} from 'homepairs-types';
import * as BaseStyles from 'homepairs-base-styles';
import Colors from 'homepairs-colors';
import {categoryToString} from 'homepairs-utilities';
import {Divider} from 'react-native-divider';
import {ApplianceCategorizer} from 'homepairs-components';


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
}

export default class ChooseAppliance extends Component<ChooseApplianceProps,ChooseApplianceState> {

    buttonProps: ThinButtonProps = {
        containerStyle: {
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: BaseStyles.MarginPadding.largeConst,
            marginBottom: BaseStyles.MarginPadding.xlarge,
            minHeight: 50,
        }, 
        buttonStyle: {
            alignItems: 'center',
            backgroundColor: Colors.LightModeColors.transparent,
            padding: BaseStyles.MarginPadding.mediumConst,
            borderRadius: BaseStyles.BorderRadius.large,
            borderWidth: 1,
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
    }

    render() {
        const {clicked} = this.state;
        const {appliances, applianceType} = this.props;

        return (
            <View>
                <ThinButton 
                name={categoryToString(applianceType)}
                containerStyle={this.buttonProps.containerStyle}
                buttonStyle={this.buttonProps.buttonStyle}
                buttonText={this.buttonProps.buttonText}
                />
                <Divider />
                <ApplianceCategorizer appliances={appliances} hasButton={false}/>
            </View>

        );
    }
}