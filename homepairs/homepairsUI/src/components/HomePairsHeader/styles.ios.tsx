import {StyleSheet} from 'react-native';
import * as BaseStyles from 'homepairs-base-styles';

const colorScheme = BaseStyles.LightColorTheme;

export default StyleSheet.create({
    container: {
        flex: 1,
        shadowOpacity: 0.1,
        shadowRadius: 1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 1,
        backgroundColor: colorScheme.secondary,
        shadowColor: colorScheme.shadow,
        minHeight: 50,
    },
    titleContainer:{
        marginLeft: BaseStyles.MarginPadding.largeConst,
    },
    titleBackContainer:{
        flexDirection: 'row', 
        backgroundColor: colorScheme.secondary,
    },
    homePairsTitle: {
        fontFamily: BaseStyles.FontTheme.primary,
        fontSize: BaseStyles.FontTheme.title,
        color: colorScheme.primary,
        flex: 1,
    },
    goBackSymbol: {
        fontFamily: BaseStyles.FontTheme.primary,
        fontSize: BaseStyles.FontTheme.lg,
        color: colorScheme.primary,
        flex: 1,
    },
    goBackButton: {
        backgroundColor: colorScheme.secondary,
        padding: BaseStyles.MarginPadding.mediumConst,
        paddingTop: 20,
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1,
    },
    goBackButtonEnd: {
        backgroundColor: colorScheme.secondary,
        padding: BaseStyles.MarginPadding.mediumConst,
        paddingTop: 20,
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1,
        opacity: .2,
    },
    hamburgerContainer: { 
        flex: 1, 
    },
    dropDownFlexDirection: { 
        flexDirection: 'column',
    },
    navBarFlexDirection: { 
        flexDirection: 'row',
    },
});