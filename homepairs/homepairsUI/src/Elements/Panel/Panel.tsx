import React from 'react';
import {
    Text,
    View,
    Animated,
    StyleSheet,
    TouchableHighlight,
    Image,
} from 'react-native';
import { ThinButtonProps, ThinButton } from 'homepairs-elements';
import { HomePairFonts } from 'homepairs-fonts';
import strings from 'homepairs-strings';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairsDimensions, Appliance } from 'homepairs-types';
import { upArrow, downArrow } from 'homepairs-images';

export type PanelProps = {
    key?: string;
    appliance?: Appliance;
};

export type PanelState = {
    expanded: boolean;
    animation: Animated.Value;
    minHeight: number;
    maxHeight: number;
};

const initialState: PanelState = {
    expanded: false,
    animation: undefined,
    minHeight: 0,
    maxHeight: 0,
};

const applianceInfoStrings = strings.applianceInfo.details;
const colors = BaseStyles.LightColorTheme;

function setStyles() {
    return StyleSheet.create({
        container: {
            backgroundColor: colors.secondary,
            marginHorizontal: BaseStyles.MarginPadding.large,
            borderRadius: BaseStyles.BorderRadius.large,
            padding: BaseStyles.MarginPadding.large,
            paddingTop: 10,
            paddingBottom: 30,
            width: BaseStyles.ContentWidth.thin,
            alignSelf: 'center',
            borderColor: colors.lightGray,
            borderWidth: 1,
            overflow: 'hidden',
            marginBottom: 20,
        },
        titleContainer: {
            flexDirection: 'row',
            backgroundColor: colors.secondary,
            borderBottomColor: colors.veryLightGray,
            borderBottomWidth: 1,
            justifyContent: 'space-between',
            paddingBottom: 15,
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
            fontSize: BaseStyles.FontTheme.reg,
            fontFamily: HomePairFonts.nunito_regular,
        },
        textContainer: {
            width: BaseStyles.ContentWidth.reg,
            borderBottomColor: colors.veryLightGray,
            paddingBottom: BaseStyles.MarginPadding.mediumConst,
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
        },
        editButtonText: {
            color: colors.lightGray,
        },
        buttonImage: {
            width: 20,
            height: 20,
        },
        body: {
            alignItems: 'center',
            paddingBottom: 35,
        },
    });
}

export default class Panel extends React.Component<PanelProps, PanelState> {
    styles;

    icons;

    thinButtonProps: ThinButtonProps = {
        name: 'Edit',
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
        onClick: () => {},
    };

    constructor(props: Readonly<PanelProps>) {
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

    renderBody() {
        const { appliance } = this.props;
        const { manufacturer, modelNum, serialNum, location } = appliance;
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
                <ThinButton 
                    name={this.thinButtonProps.name} 
                    buttonStyle={this.thinButtonProps.buttonStyle} 
                    buttonTextStyle={this.thinButtonProps.buttonTextStyle} 
                    onClick={this.thinButtonProps.onClick}/>
            </View>
        );
    }

    render() {
        const { up, down } = this.icons;
        const { expanded, animation } = this.state;
        const { appliance } = this.props;
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
                    <TouchableHighlight
                        onPress={this.toggle}
                        underlayColor="#f1f1f1"
                    >
                        <Image style={this.styles.buttonImage} source={icon} />
                    </TouchableHighlight>
                </View>
                {this.renderBody()}
            </Animated.View>
        );
    }
}
