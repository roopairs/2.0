import React from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import { StyleSheet, Text, View } from 'react-native';
import { ThinButtonProps, renderThinButton } from 'homepairs-elements';
import * as BaseStyles from 'homepairs-base-styles';
import { DarkModeInjectedProps } from '../WithDarkMode/WithDarkMode';

export type SceneHeaderProps = DarkModeInjectedProps & {
    title: String;
    buttonTitle?: String;
    onButtonPress?: (arg0?: any) => any;
};

function setStyle(
    colorTheme: BaseStyles.ColorTheme = BaseStyles.LightColorTheme,
) {
    return StyleSheet.create({
        container: {
            marginHorizontal: 15,
            alignSelf: 'center',
            marginTop: 20,
            width: BaseStyles.ContentWidth.reg,
            borderBottomWidth: 1,
            borderBottomColor: colorTheme.veryLightGray,
            paddingBottom: 4,
            flexDirection: 'row',
        },
        pageTitle: {
            fontSize: 32,
            maxWidth: 450,
            color: colorTheme.tertiary,
            fontFamily: BaseStyles.FontTheme.primary,
            flex: 2,
        },
        thinButtonContainer: {
            flex: 1.2,
            justifyContent: 'center',
            paddingHorizontal: 10,
            height: 50,
            width: 150,
            alignSelf: 'flex-end',
        },
        thinButton: {
            alignItems: 'center',
            backgroundColor: colorTheme.transparent,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colorTheme.primary,
            height: 30,
            justifyContent: 'center',
        },
        thinButtonText: {
            color: colorTheme.primary,
            fontSize: BaseStyles.FontTheme.reg,
            alignSelf: 'center',
        },
    });
}

export default function SceneHeader(props: SceneHeaderProps) {
    const { primaryColorTheme, buttonTitle, onButtonPress, title } = props;

    const styles = setStyle(primaryColorTheme);
    const thinButtonProps: ThinButtonProps = {
        name: buttonTitle,
        containerStyle: styles.thinButtonContainer,
        buttonStyle: styles.thinButton,
        buttonTextStyle: styles.thinButtonText,
        onClick: onButtonPress,
    };

    function renderButton() {
        if (!(buttonTitle == null)) {
            return renderThinButton(thinButtonProps);
        }
        return <></>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>{title}</Text>
            {renderButton()}
        </View>
    );
}

export function renderSceneHeader(sceneHeaderProps: SceneHeaderProps) {
    const {
        title,
        buttonTitle,
        onButtonPress,
        primaryColorTheme,
    } = sceneHeaderProps;

    return (
        <SceneHeader
            title={title}
            buttonTitle={buttonTitle}
            onButtonPress={onButtonPress}
            primaryColorTheme={primaryColorTheme}
        />
    );
}
