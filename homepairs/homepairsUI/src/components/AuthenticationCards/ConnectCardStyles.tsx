import * as BaseStyles from 'homepairs-base-styles';
import { HomePairsDimensions } from 'homepairs-types';
import { StyleSheet, Platform } from 'react-native';
import { HomePairFonts } from 'homepairs-fonts';

const colors = BaseStyles.LightColorTheme;
export default StyleSheet.create({
    cardTitle: {
        color: colors.tertiary,
        fontSize: 25,
        fontFamily: HomePairFonts.nunito_bold,
    },
    cardDescription: {
        color: colors.tertiary,
        fontFamily: BaseStyles.FontTheme.primary,
        fontSize: BaseStyles.FontTheme.small,
        paddingTop: 5,
    },
    textContainer: {
        width: BaseStyles.ContentWidth.reg,
        paddingBottom: BaseStyles.MarginPadding.mediumConst,
        flex: 1,
        fontSize: 20,
    },
    titleContainerStyle: {
        width: '95%',
        borderBottomColor: BaseStyles.LightColorTheme.veryLightGray,
        paddingVertical: 5,
        borderBottomWidth: 1,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    accountContainer: {
        backgroundColor: colors.secondary,
        marginHorizontal: BaseStyles.MarginPadding.large,
        marginTop: BaseStyles.MarginPadding.largeConst,
        borderRadius: 7,
        paddingVertical: BaseStyles.MarginPadding.large,
        paddingHorizontal: BaseStyles.MarginPadding.medium,
        width: BaseStyles.ContentWidth.thin,
        maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
        alignSelf: 'center',
        alignItems: 'center',
        maxHeight: Platform.OS === 'web' ? 175 : null,
        shadowColor: colors.tertiary,
        shadowRadius: 10,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.25,
        elevation: 9,
    },
    thinButtonContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        paddingHorizontal: BaseStyles.MarginPadding.mediumConst,
        minHeight: 50,
        paddingTop: 70,
    },
    thinButton: {
        alignItems: 'center',
        backgroundColor: colors.transparent,
        padding: BaseStyles.MarginPadding.mediumConst,
        maxWidth: 300,
        minWidth: 200,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.primary,
    },
    thinButtonText: {
        color: colors.primary,
        fontSize: BaseStyles.FontTheme.reg,
        alignSelf: 'center',
    },
    wrapper: {
        marginTop: BaseStyles.MarginPadding.large,
        marginBottom: !(Platform.OS === 'web')
            ? BaseStyles.MarginPadding.medium
            : null,
        justifyContent: 'center',
    },
});

