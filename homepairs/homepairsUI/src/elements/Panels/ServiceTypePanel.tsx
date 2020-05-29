import React from 'react';
import {
    Text,
    View,
    Animated,
    StyleSheet,
    TouchableHighlight,
    Image,
    Platform,
} from 'react-native';
import { HomePairFonts } from 'homepairs-fonts';
import * as BaseStyles from 'homepairs-base-styles';
import { upArrow, downArrow } from 'homepairs-images';


export type ServiceTypePanelProps = {
    parentCallBack: (child: string) => any
};

type PanelState = {
    expanded: boolean;
    animation: Animated.Value;
    selectedIndex: number;
    selectedString: string;
    minHeight: number;
    maxHeight: number;
     /**
     * If a button has been selected, this state value will force a string to render 
     */
    hasBeenClicked: boolean,
};


const initialState: PanelState = {
    expanded: false,
    selectedIndex: 0,
    selectedString: 'Choose a Service Type',
    animation: undefined,
    minHeight: 0,
    maxHeight: 0,
    hasBeenClicked: false,
};

type PanelProps = {
    parentCallBack: (child: string) => any
};

const colors = BaseStyles.LightColorTheme;

function setStyles() {
    const bodyPadding = Platform.OS === 'web' ? 25 : 140; 
    return StyleSheet.create({
        container: {
            backgroundColor: colors.secondary,
            marginHorizontal: BaseStyles.MarginPadding.large,
            borderRadius: BaseStyles.BorderRadius.small,
            padding: BaseStyles.MarginPadding.large,
            paddingTop: 10,
            paddingBottom: 30,
            width: BaseStyles.ContentWidth.thin,
            alignSelf: 'center',
            borderColor: '#B3C0C2',
            borderWidth: 1,
            overflow: 'hidden',
        },
        titleContainer: {
            flexDirection: 'row',
            backgroundColor: colors.secondary,
            borderBottomColor: colors.veryLightGray,
            borderBottomWidth: 1,
            justifyContent: 'space-between',
            minHeight: 50,
        },
        infoRowContainer: {
            alignContent: 'center',
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
            paddingBottom: BaseStyles.MarginPadding.mediumConst,
            borderBottomWidth: 1,
        },
        buttonImage: {
            width: 20,
            height: 20,
        },
        body: {
            alignItems: 'center',
            paddingBottom: bodyPadding,
            width: '100%',
        },
        option: {
            fontSize : BaseStyles.FontTheme.reg,
            fontFamily: HomePairFonts.nunito_regular,
        },
    });
}

const serviceTypes = ['Repair', 'Installation', 'Maintenance'];

export default class ServiceTypePanel extends React.Component<ServiceTypePanel, PanelState> {
    styles;

    icons;

    constructor(props: Readonly<PanelProps>) {
        super(props);
        this.styles = setStyles();
        this.state = {...initialState, 
            animation: new Animated.Value(0)};
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

    selectServiceType(selected: string) {
        const {parentCallBack} = this.props;
        parentCallBack(selected);
        this.setState({selectedString: selected, hasBeenClicked: true,});
        this.toggle();
    }

    renderBody() {
        return (
            <View style={this.styles.body} onLayout={this.setMaxHeight}>
                <>{serviceTypes.map((address) => 
                    <TouchableHighlight 
                        testID='click-service-type'
                        underlayColor="#f1f1f1"
                        onPress={() => this.selectServiceType(address)}
                        style={this.styles.infoRowContainer}>
                        <Text style={this.styles.detail}>{address}</Text>
                    </TouchableHighlight>)}</>
            </View>
        );
    }

    render() {
        const { up, down } = this.icons;
        const { expanded, animation, selectedString, hasBeenClicked } = this.state;
        let icon = down;
        if (expanded) {
            icon = up;
        }

        return hasBeenClicked ? 
        (<View style={{alignSelf: 'center', width: BaseStyles.ContentWidth.reg}}>
            <Text style={this.styles.option}>{selectedString}</Text>
            </View>)
        :
        (
            <Animated.View
                style={[this.styles.container, { height: animation}, {borderColor: expanded ? colors.primary : colors.lightGray}]}
            >
                <View style={this.styles.titleContainer} onLayout={this.setMinHeight}>
                    <Text style={this.styles.titleText}>{selectedString}</Text>
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