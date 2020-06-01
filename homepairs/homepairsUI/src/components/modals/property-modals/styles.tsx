import { StyleSheet, StatusBar, Platform} from 'react-native';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairsDimensions } from 'homepairs-types';
import Colors from 'homepairs-colors';
import { isNullOrUndefined } from 'src/utility';
import { FontTheme } from 'homepairs-base-styles';


function setInputStyles(colorTheme?: BaseStyles.ColorTheme) {
    const colors = isNullOrUndefined(colorTheme) ? BaseStyles.LightColorTheme : colorTheme;
    return StyleSheet.create({
        formTitle: {
            marginVertical: '3.5%',
            fontFamily: BaseStyles.FontTheme.primary,
            color: colors.lightGray,
        },
        input: {
            alignItems: 'center',
            alignSelf: 'center',
            margin: BaseStyles.MarginPadding.xsmallConst,
            minWidth: 40,
            width: BaseStyles.ContentWidth.max,
            height: 40,
            color: colors.lightGray,
            borderColor: colors.lightGray,
            borderWidth: 1,
            borderRadius: BaseStyles.BorderRadius.small,
            paddingHorizontal: BaseStyles.MarginPadding.mediumConst,
        },
        modalContainer: {
            flex: 1,
            maxWidth: HomePairsDimensions.MAX_PALLET,
            width: BaseStyles.ContentWidth.max,
            alignSelf: 'center',
        },
        scrollStyle: {
            flex: 1,
            marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            width: '100%',
        },
        scrollContentContainerStyle: {
            maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            width: BaseStyles.ContentWidth.reg,
            paddingVertical: BaseStyles.MarginPadding.large,
            flexGrow: Platform.OS === 'web' ? null : 1, // Needed to center the contents of the scroll container for mobile 
        },
        cardContainer: {
            backgroundColor: 'white',
            maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
            width: BaseStyles.ContentWidth.reg,
            marginHorizontal: '5%',
            borderRadius: 8,
            shadowColor: 'black',
            shadowRadius: 8,
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: .1,
            elevation: 2,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flex: 1,
        },
        cardTitle: {
            color: colors.tertiary,
            fontFamily: 'nunito-regular',
            fontSize: 20,
        },
        cardTitleContainer: {
            width: BaseStyles.ContentWidth.max,
            borderBottomColor: '#AFB3B5',
            paddingVertical: BaseStyles.MarginPadding.largeConst,
            paddingHorizontal: BaseStyles.MarginPadding.largeConst,
            borderBottomWidth: 1,
            alignSelf: 'center',
            justifyContent: 'flex-start',
        },
        cardWrapperStyle: {
            width: BaseStyles.ContentWidth.thin,
            marginTop: BaseStyles.MarginPadding.small,
            marginBottom: BaseStyles.MarginPadding.smallConst,
            alignSelf: 'center',
            justifyContent: 'center',
        },
        errorStyle: {
            fontFamily: FontTheme.secondary,
            fontSize: 16,
        },
    });
}

const buttonStyles = StyleSheet.create({
    buttonStyle: {
        alignItems: 'center',
        backgroundColor: Colors.LightModeColors.transparent,
        padding: BaseStyles.MarginPadding.mediumConst,
        maxWidth: HomePairsDimensions.MAX_BUTTON_WIDTH,
        minWidth: HomePairsDimensions.MIN_BUTTON_WIDTH,
        borderRadius: BaseStyles.BorderRadius.large,
        borderWidth: 1,
        borderColor: Colors.LightModeColors.blueButton,
    },
    buttonTextStyle: {
        color: Colors.LightModeColors.blueButtonText,
        fontSize: BaseStyles.FontTheme.reg,
        alignSelf: 'center',
    },
    containerStyle: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: BaseStyles.MarginPadding.largeConst,
        marginBottom: BaseStyles.MarginPadding.xlarge,
        minHeight: 50,
    },
    twoButtonContainer:{
        flexDirection: 'row', 
        width: '100%', 
        justifyContent: 
        'center', 
        alignSelf: 'center',
        marginTop: BaseStyles.MarginPadding.largeConst, 
        marginBottom: 40,
    },
    editButtonConatiner: {
        marginLeft: 3, 
        width: '90%',
    },
    editTenantButtonStyle: {
        alignItems: 'center',
        backgroundColor: BaseStyles.LightColorTheme.transparent,
        padding: BaseStyles.MarginPadding.mediumConst,
        maxWidth: HomePairsDimensions.MAX_BUTTON_WIDTH,
        borderRadius: BaseStyles.BorderRadius.large,
        borderWidth: 1,
        borderColor: BaseStyles.LightColorTheme.primary,
    },
    editTenantButtonTextStyle: {
        color: BaseStyles.LightColorTheme.primary, 
        fontSize: BaseStyles.FontTheme.reg,
        alignSelf: 'center',
    },
    removeButtonConatiner: {
        marginRight: 6, 
        width: '90%', 
        alignSelf:'flex-end',
    },
    removeTenantButtonStyle: {
        alignItems: 'center',
        backgroundColor: BaseStyles.LightColorTheme.transparent,
        padding: BaseStyles.MarginPadding.mediumConst,
        maxWidth: HomePairsDimensions.MAX_BUTTON_WIDTH,
        borderRadius: BaseStyles.BorderRadius.large,
        borderWidth: 1,
        borderColor: BaseStyles.LightColorTheme.red,
    },
    removeTenantButtonTextStyle: {
        color: BaseStyles.LightColorTheme.red, 
        fontSize: BaseStyles.FontTheme.reg,
        alignSelf: 'center',
    },
    editButtonContainerStyle: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: BaseStyles.MarginPadding.largeConst,
        marginBottom: BaseStyles.MarginPadding.xlarge,
        marginRight: BaseStyles.MarginPadding.mediumConst,
        minHeight: 50,
        width: '90%',
    },
    removeButtonContainerStyle: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: BaseStyles.MarginPadding.largeConst,
        marginBottom: BaseStyles.MarginPadding.xlarge,
        marginLeft: BaseStyles.MarginPadding.mediumConst,
        minHeight: 50,
        width: '90%',
    },
});

export {setInputStyles, buttonStyles};