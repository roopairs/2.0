import React, { ReactElement } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { HomePairFonts } from 'homepairs-fonts';

export type CardProps = {
    children?: ReactElement<any,any>[] | ReactElement<any,any>;
    containerStyle?: {};
    wrapperStyle?: {};
    title?: String;
    titleStyle?: {};
    subtitle?: String;
    subtitleStyle?: {};
    titleContainerStyle?: {};
    closeButtonContainerStyle?: {};
    closeButtonStyle?: {};
    showCloseButton?: Boolean;
    closeButtonPressedCallBack?: (arg0?: any) => any;
};

const defaultStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginHorizontal: '5%',
        borderRadius: 7,
        shadowColor: 'black',
        shadowRadius: 20,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 100,
        elevation: 9,
    },
    generalIndexContainer: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        flex: 1,
    },
    title: {
        color: '#00ADE9',
        fontFamily: 'nunito-regular',
        fontSize: 32,
        alignSelf: 'center',
    },
    subtitle: {
        color: '#00ADE9',
        fontFamily: 'nunito-regular',
        fontSize: 20,
        alignSelf: 'center',
    },
    titleContainer: {
        width: '95%',
        borderBottomColor: '#AFB3B5',
        paddingVertical: 5,
        borderBottomWidth: 1,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        width: '95%',
        marginVertical: 20,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    closeButton: {
        fontSize: 20,
        color: '#AFB3B5',
        fontFamily: HomePairFonts.nunito_regular,
        alignSelf: 'center',
    },
    closeButtonContainer: {
        alignSelf: 'flex-end',
        justifyContent: 'center',
        paddingHorizontal: '2.5%',
        paddingVertical: 25,
        maxHeight: 40,
        marginHorizontal: '5%',
        position: 'absolute',
        zIndex: 1, // Needed for absolution position within TouchableOpacity
    },
    titleCloseButtonContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    closeButtonWrapper: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
});

export default function Card(props: CardProps) {
    const {
        children,
        containerStyle,
        wrapperStyle,
        title,
        titleStyle,
        subtitle,
        subtitleStyle,
        titleContainerStyle,
        closeButtonStyle,
        showCloseButton,
        closeButtonPressedCallBack,
    } = props;

    const { closeButtonContainer, closeButtonWrapper } = defaultStyles;

    function renderCloseButton() {
        if (showCloseButton) {
            return (
                <TouchableOpacity
                    style={closeButtonContainer}
                    onPress={closeButtonPressedCallBack}
                >
                    <View style={closeButtonWrapper}>
                        <Text style={closeButtonStyle}>X</Text>
                    </View>
                </TouchableOpacity>
            );
        }
        return <></>;
    }

    function renderSubtitle() {
        if (subtitle == null) {
            return <></>;
        }
        return <Text style={subtitleStyle}>{subtitle}</Text>;
    }

    function renderTitle() {
        if (title == null) return <></>;

        return (
            <View style={defaultStyles.generalIndexContainer}>
                <View style={titleContainerStyle}>
                    <Text style={titleStyle}>{title}</Text>
                    {renderSubtitle()}
                </View>
            </View>
        );
    }

    return (
        <View style={containerStyle}>
            {renderCloseButton()}
            {renderTitle()}
            <View style={wrapperStyle}>{children}</View>
        </View>
    );
}

Card.defaultProps = {
    children: <></>,
    containerStyle: defaultStyles.container,
    wrapperStyle: defaultStyles.wrapper,
    title: null,
    titleStyle: defaultStyles.title,
    subtitle: null,
    subtitleStyle: defaultStyles.subtitle,
    titleContainerStyle: defaultStyles.titleContainer,
    closeButtonStyle: defaultStyles.closeButton,
    closeButtonContainerStyle: defaultStyles.closeButtonContainer,
    showCloseButton: false,
    closeButtonPressedCallBack: () => {},
};

export function renderCard(cardProperties: CardProps, innerComponent: ReactElement[] | ReactElement ) {
    const {
        containerStyle,
        wrapperStyle,
        title,
        titleStyle,
        subtitle,
        subtitleStyle,
        titleContainerStyle,
        closeButtonStyle,
        showCloseButton,
        closeButtonPressedCallBack,
    } = cardProperties;
    return (
        <Card
            containerStyle={containerStyle}
            wrapperStyle={wrapperStyle}
            title={title}
            titleStyle={titleStyle}
            titleContainerStyle={titleContainerStyle}
            subtitle={subtitle}
            subtitleStyle={subtitleStyle}
            closeButtonStyle={closeButtonStyle}
            showCloseButton={showCloseButton}
            closeButtonPressedCallBack={closeButtonPressedCallBack}
        >
            {innerComponent}
        </Card>
    );
}
