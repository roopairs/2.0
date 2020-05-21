import { LightColorTheme, FontTheme } from 'homepairs-base-styles';
import { StyleSheet } from 'react-native';

const colorScheme = LightColorTheme;
export default StyleSheet.create({
    
    homePairsTitleContainer: {
        padding: 15,
        paddingRight: 0,
        height: 80,
        width: '100%',
        backgroundColor: colorScheme.secondary,
    },
    homePairsTitleContainerNavSet: {
        flexDirection: 'row',
        padding: 15,
        paddingRight: 0,
        height: 80,
        minWidth: 175,
        maxWidth: 185,
        backgroundColor: colorScheme.secondary,
    },
    homePairsTitle: {
        fontFamily: FontTheme.primary,
        fontSize: 32,
        color: colorScheme.primary,
    },
    
});