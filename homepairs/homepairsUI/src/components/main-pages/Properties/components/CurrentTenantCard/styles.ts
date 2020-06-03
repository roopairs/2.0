import {StyleSheet} from 'react-native';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairsDimensions } from 'homepairs-types';

const colors = BaseStyles.LightColorTheme;
export default StyleSheet.create({
    CircleShapeView: {
        height: 63,
        width: 63,
        borderRadius: 63/2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BaseStyles.LightColorTheme.transparent,
        borderColor: BaseStyles.LightColorTheme.gray,
        borderWidth:1.4,
    },
    initialsContainer: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tenantContact: {
        flex: 4,
        paddingVertical: BaseStyles.MarginPadding.mediumConst,
        paddingHorizontal: BaseStyles.MarginPadding.largeConst,
        alignItems: 'flex-start',
    },
    buttonContainer: {
        flex: 1.5,
        alignItems: 'center',
        paddingVertical: BaseStyles.MarginPadding.largeConst,
        paddingHorizontal: BaseStyles.MarginPadding.smallConst,
    },
    tenantInfoContainer: {
        flex:1,
        flexDirection: 'row',
        marginVertical: BaseStyles.MarginPadding.mediumConst,
    },
    container: {
        backgroundColor: colors.secondary,
        marginHorizontal: BaseStyles.MarginPadding.large,
        marginTop: BaseStyles.MarginPadding.largeConst,
        borderRadius: BaseStyles.BorderRadius.large,
        borderBottomColor: colors.veryLightGray,
        borderBottomWidth: 1,
        padding: BaseStyles.MarginPadding.mediumConst,
        paddingBottom: BaseStyles.MarginPadding.mediumConst,
        width: BaseStyles.ContentWidth.thin,
        alignSelf: 'center',
        shadowColor: colors.shadow,
        shadowRadius: 10,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.25,
        elevation: 9,
    },
    livingSpaceContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: BaseStyles.ContentWidth.wide,
        paddingVertical: BaseStyles.MarginPadding.mediumConst,
    },
    addressContainer: {
        borderBottomColor: colors.veryLightGray,
        borderBottomWidth: 1,
        paddingBottom: BaseStyles.MarginPadding.mediumConst,
        marginBottom: BaseStyles.MarginPadding.mediumConst,
    },
    streetAddress: {
        color: colors.tertiary,
        fontSize: BaseStyles.FontTheme.reg,
        fontFamily: BaseStyles.FontTheme.secondary,
    },
    cityStateText: {
        color: colors.tertiary,
        fontSize: BaseStyles.FontTheme.xsmal,
    },
    cardTitle: {
        fontSize: BaseStyles.FontTheme.reg + 2,
        maxWidth: 450,
        fontFamily: BaseStyles.FontTheme.secondary,
    },
    cardDescription: {
        fontFamily: BaseStyles.FontTheme.primary,
        fontSize: BaseStyles.FontTheme.small,
    },
    textContainer: {
        width: BaseStyles.ContentWidth.reg,
        borderBottomColor: colors.veryLightGray,
        paddingBottom: BaseStyles.MarginPadding.mediumConst,
        borderBottomWidth: 1,
    },
    detailContainer: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
    },
    detailName: {
        fontSize: BaseStyles.FontTheme.xsmal,
        marginBottom: BaseStyles.MarginPadding.mediumConst,
        color: colors.tertiary,
    },
    detail: {
        color: colors.tertiary,
        fontSize: BaseStyles.FontTheme.reg + 2,
        fontFamily: BaseStyles.FontTheme.secondary,
    },
    addButton: {
        alignItems: 'center',
        backgroundColor: colors.transparent,
        padding: BaseStyles.MarginPadding.mediumConst,
        width: HomePairsDimensions.MIN_BUTTON_WIDTH,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.lightGray,
    },
    editButton: {
        alignItems: 'center',
        backgroundColor: colors.transparent,
        paddingVertical: BaseStyles.MarginPadding.xsmallConst,
        width: BaseStyles.ContentWidth.thin,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.lightGray,
    },
    addButtonText: {
        color: colors.lightGray,
        fontSize: 20,
    },
    editButtonText: {
        color: colors.lightGray,
        fontSize: 19,
    },
    titleContainerStyle: {
        width: BaseStyles.ContentWidth.wide,
        borderBottomColor: BaseStyles.LightColorTheme.veryLightGray,
        paddingVertical: 5,
        borderBottomWidth: 1,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    addButtonContainer: {
        alignSelf: 'center',
    },
    emptyText: {
        alignSelf: 'center',
        fontSize: BaseStyles.FontTheme.reg,
        margin: BaseStyles.MarginPadding.largeConst,
    },
    
});
