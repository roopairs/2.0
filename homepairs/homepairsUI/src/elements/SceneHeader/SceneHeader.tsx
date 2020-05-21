import React from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import { StyleSheet, Text, View } from 'react-native';
import * as BaseStyles from 'homepairs-base-styles';
import { isNullOrUndefined } from 'homepairs-utilities';
import ThinButton from '../Buttons/ThinButton';

export type SceneHeaderProps = {
    /**
     * String that will be rendered at the top of the page 
     */
    title: String;

    /**
     * Name of the button at the right side of the header 
     */
    buttonTitle?: String;

    /**
     * Callback function for the button rendered
     */
    onButtonPress?: (arg0?: any) => any;
};

const colorTheme = BaseStyles.LightColorTheme;
const styles = StyleSheet.create({
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
        marginLeft: BaseStyles.MarginPadding.small,
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


export default function SceneHeader(props: SceneHeaderProps) {
    const {buttonTitle, onButtonPress, title } = props;

    /**
     * Renders the button next to the Page Title if the user has 
     * defined a name for the button.
     */
    function renderButton() {
        return !isNullOrUndefined(buttonTitle) ?
            <ThinButton 
                name={buttonTitle}
                containerStyle={styles.thinButtonContainer}
                buttonStyle={styles.thinButton}
                buttonTextStyle={styles.thinButtonText}
                onClick={onButtonPress}/> 
        :
            <></>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>{title}</Text>
            {renderButton()}
        </View>
    );
}

SceneHeader.defaultProps = {
    buttonTitle: null,
    onButtonPress: () => {},
};
