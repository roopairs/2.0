import React from 'react';
import {
    Text,
    View,
    Animated,
    StyleSheet,
    Image,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { HomePairFonts } from 'homepairs-fonts';
import strings from 'homepairs-strings';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairsDimensions, Appliance } from 'homepairs-types';
import { upArrow, downArrow} from 'homepairs-images';
import ThinButton, { ThinButtonProps } from '../Buttons/ThinButton';

export type AppliancePanelProps = {
    key?: string;
    appliance: Appliance;
    hasButton: boolean;
    buttonName?: string;
    onClick?: (child?: any) => any;
};

export type AppliancePanelState = {
    expanded: boolean;
    animation: Animated.Value;
    minHeight: number;
    maxHeight: number;
};

type Props = AppliancePanelProps;

const initialState: AppliancePanelState = {
    expanded: false,
    animation: undefined,
    minHeight: 0,
    maxHeight: 0,
};

const applianceInfoStrings = strings.applianceInfo.details;
const colors = BaseStyles.LightColorTheme;

function setStyles() {
    const bodyPadding = Platform.OS === 'web' ? 25 : 300; 
    return StyleSheet.create({
        container: {
            backgroundColor: colors.secondary,
            marginHorizontal: BaseStyles.MarginPadding.large,
            borderRadius: BaseStyles.BorderRadius.large,
            padding: BaseStyles.MarginPadding.mediumConst,
            paddingBottom: BaseStyles.MarginPadding.xlarge,
            minHeight: 30,
            width: BaseStyles.ContentWidth.thin,
            alignSelf: 'center',
            borderColor: colors.lightGray,
            borderWidth: 1,
            overflow: 'hidden',
            marginBottom: 20,
        },
        titleContainer: {
            flexDirection: 'row',
            borderBottomColor: colors.veryLightGray,
            borderBottomWidth: 1,
            justifyContent: 'space-between',
            minHeight: 50,
            paddingTop: 5,
        },
        infoRowContainer: {
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            width: BaseStyles.ContentWidth.wide,
            paddingVertical: BaseStyles.MarginPadding.mediumConst,
        },
        titleText: {
            minHeight: 20,
            fontSize: BaseStyles.FontTheme.reg,
            fontFamily: HomePairFonts.nunito_regular,
        },
        textContainer: {
            width: BaseStyles.ContentWidth.reg,
            borderBottomColor: colors.veryLightGray,
            borderBottomWidth: 1,
        },
        editButton: {
            alignItems: 'center',
            backgroundColor: colors.transparent,
            padding: BaseStyles.MarginPadding.mediumConst,
            width: HomePairsDimensions.MIN_BUTTON_WIDTH,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.lightGray,
            alignSelf: 'center',
        },
        editButtonText: {
            color: colors.lightGray,
            fontSize: 20,
        },
        buttonImage: {
            width: 20,
            height: 20,
        },
        body: {
            alignItems: 'center',
            paddingTop: BaseStyles.MarginPadding.mediumConst,
            paddingBottom: bodyPadding,
        },
        detailName: {
            fontSize: BaseStyles.FontTheme.xsmal,
            marginBottom: BaseStyles.MarginPadding.mediumConst,
            color: colors.lightGray,
        },
        detail: {
            color: colors.tertiary,
            fontSize: BaseStyles.FontTheme.reg,
            fontFamily: HomePairFonts.nunito_regular,
        },
        detailContainer: {
            flex: 1,
            alignSelf: 'center',
            alignItems: 'center',
        },
    });
}

export default class AppliancePanel extends React.Component<Props, AppliancePanelState> {
    styles;

    icons;

    thinButtonProps: ThinButtonProps = {
        buttonStyle: {
            alignItems: 'center',
            backgroundColor: colors.transparent,
            padding: BaseStyles.MarginPadding.mediumConst,
            width: HomePairsDimensions.MIN_BUTTON_WIDTH,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.lightGray,
        },
        buttonTextStyle: {
            color: colors.lightGray,
        },
    };

    constructor(props: Readonly<Props>) {
        super(props);
        this.styles = setStyles();
        this.state = {...initialState, animation: new Animated.Value(0)};
        this.toggle = this.toggle.bind(this);
        this.setMaxHeight = this.setMaxHeight.bind(this);
        this.setMinHeight = this.setMinHeight.bind(this);
        this.icons = {
            up: upArrow,
            down: downArrow,
        };
    }

    setMaxHeight(event) {
        this.setState({ maxHeight: event.nativeEvent.layout.height });
    }

    setMinHeight(event) {
        this.setState({ minHeight: event.nativeEvent.layout.height });
    }

    toggle() {
        const { expanded, minHeight, maxHeight, animation } = this.state;
        const initialValue = expanded ? maxHeight + minHeight : minHeight;
        const finalValue = expanded ? minHeight : maxHeight + minHeight;

        this.setState({ expanded: !expanded });

        animation.setValue(initialValue);
        Animated.spring(animation, { toValue: finalValue }).start();
    }

    renderThinButton() {
        const {hasButton, buttonName, onClick, appliance} = this.props;
        if (hasButton) {
            return <ThinButton 
                name={buttonName} 
                buttonStyle={this.thinButtonProps.buttonStyle} 
                buttonTextStyle={this.thinButtonProps.buttonTextStyle} 
                onClick={() => onClick(appliance)}/>;
        }
        return <></>;
    }

    renderBody() {
        const { appliance } = this.props;
        const { manufacturer, modelNum, serialNum, location } = appliance;
        console.log(appliance);
        return (
            <View style={this.styles.body} onLayout={this.setMaxHeight}>
                <View style={this.styles.infoRowContainer}>
                    <View style={this.styles.detailContainer}>
                        <Text style={this.styles.detailName}>
                            {applianceInfoStrings.manufacturer}
                        </Text>
                        <Text style={this.styles.detail}>{manufacturer}</Text>
                    </View>
                    <View style={this.styles.detailContainer}>
                        <Text style={this.styles.detailName}>
                            {applianceInfoStrings.modelNum}
                        </Text>
                        <Text style={this.styles.detail}>{modelNum}</Text>
                    </View>
                </View>
                <View style={this.styles.infoRowContainer}>
                    <View style={this.styles.detailContainer}>
                        <Text style={this.styles.detailName}>
                            {applianceInfoStrings.location}
                        </Text>
                        <Text style={this.styles.detail}>{location}</Text>
                    </View>
                    <View style={this.styles.detailContainer}>
                        <Text style={this.styles.detailName}>
                            {applianceInfoStrings.serialNum}
                        </Text>
                        <Text style={this.styles.detail}>{serialNum}</Text>
                    </View>
                </View>
                <View style={this.styles.infoRowContainer}>
                    <View style={this.styles.detailContainer}>
                        <Text style={this.styles.detailName}>
                            {applianceInfoStrings.lastServiceBy}
                        </Text>
                        <Text style={this.styles.detail}>--</Text>
                    </View>
                    <View style={this.styles.detailContainer}>
                        <Text style={this.styles.detailName}>
                            {applianceInfoStrings.lastServiceDate}
                        </Text>
                        <Text style={this.styles.detail}>--</Text>
                    </View>
                </View>
                {this.renderThinButton()}
            </View>
        );
    }

    render() {
        const { up, down } = this.icons;
        const { expanded, animation } = this.state;
        const { appliance} = this.props;
        const { appName } = appliance;
        let icon = down;

        if (expanded) {
            icon = up;
        }

        return (
            <Animated.View
                style={[this.styles.container, { height: animation}, {borderColor: expanded ? colors.primary : colors.lightGray}]}
            >
                <View style={this.styles.titleContainer} onLayout={this.setMinHeight}>
                    <Text style={[this.styles.titleText, {color: expanded ? colors.primary : colors.tertiary}]}>{appName}</Text>
                    <TouchableOpacity
                        onPress={this.toggle}
                    >
                        <Image style={this.styles.buttonImage} source={icon} />
                    </TouchableOpacity>
                </View>
                {this.renderBody()}
            </Animated.View>
        );
    }
}