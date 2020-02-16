import React from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import {
    View,
    Platform,
    SafeAreaView,
    ScrollView,
    Image,
    StyleSheet,
    ImageProps,
} from 'react-native';
import { defaultProperty } from 'homepairs-images';
import {
    GeneralHomeInfo,
    AddressSticker,
} from 'homepairs-components';
import {
    HomepairsPropertyAttributes,
    Property,
    HomePairsDimensions,
} from 'homepairs-types';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import * as BaseStyles from 'homepairs-base-styles';
import { isNullOrUndefined } from 'src/utility/ParameterChecker';
import { navigationKeys } from 'src/Routes/RouteConstants';

export type DetailedPropertyStateProps = {
    property: Property;
};

type Props = NavigationStackScreenProps & DetailedPropertyStateProps;

const propertyKeys = HomepairsPropertyAttributes;

function setStyles(colorTheme?: BaseStyles.ColorTheme) {
    const colors = isNullOrUndefined(colorTheme) ? BaseStyles.LightColorTheme : colorTheme;
    return StyleSheet.create({
        container: {
            alignItems: 'center',
            backgroundColor: colors.space,
            width: BaseStyles.ContentWidth.max,
            flex: 1,
        },
        pallet: {
            backgroundColor: colors.secondary,
            width: BaseStyles.ContentWidth.max,
            flex: 1,
            maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
            alignSelf: 'center',
        },
        imageContainer: {
            width: BaseStyles.ContentWidth.max,
            height: '100%',
            overflow: 'hidden',
            borderRadius: BaseStyles.BorderRadius.large,
        },
        imageWrapper: {
            width: BaseStyles.ContentWidth.thin,
            height: '50%',
            maxHeight: 200,
            borderRadius: BaseStyles.BorderRadius.large,
            backgroundColor: 'white',
            alignSelf: 'center',
            alignContent: 'center',
            shadowColor: colors.shadow,
            shadowRadius: 10,
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.25,
            elevation: 9,
        },
        scrollViewContentContainer: {
            maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
            backgroundColor: colors.secondary,
            alignSelf: 'center',
            width: BaseStyles.ContentWidth.max,
            flexGrow: 1,
        },
        addBottomMargin: {
            flex: 1,
            marginBottom: BaseStyles.MarginPadding.largeConst,
        },
        homePairsPropertiesImage: {
            flex: 1,
            alignSelf: 'center',
            width: BaseStyles.ContentWidth.max,
            height: '100%',
            overflow: 'hidden',
        },
        homePairsPropertiesImageWeb: {
            alignSelf: 'center',
            width: BaseStyles.ContentWidth.max,
            height: '100%',
            overflow: 'hidden',
        },
    });
}

export default function DetailedPropertyScreenBase(props: Props) {
    const { property, navigation } = props;
    const styles = setStyles(null);

    const imageProps: ImageProps = {
        source: defaultProperty,
        style:
            Platform.OS === 'web'
                ? styles.homePairsPropertiesImageWeb
                : styles.homePairsPropertiesImage,
        resizeMode: 'cover',
    };

    function navigateModal() {
        navigation.navigate(navigationKeys.EditPropertyModal);
    }

    function renderImage() {
        const { source, style, resizeMode } = imageProps;
        return <Image source={source} style={style} resizeMode={resizeMode} />;
    }

    function renderGeneralHomeInfo() {
        return (
            <GeneralHomeInfo
                property={property}
                onClick={navigateModal}
            />
        );
    }

    function renderContents() {
        return (
            <ScrollView style={{ flexGrow: 1 }}>
                <View style={styles.addBottomMargin}>
                    <AddressSticker
                        address={property[propertyKeys.ADDRESS]}
                        city={property[propertyKeys.CITY]}
                        state={property[propertyKeys.STATE]}
                    />
                    <View style={styles.imageWrapper}>
                        <View style={styles.imageContainer}>
                            {renderImage()}
                        </View>
                    </View>
                    {renderGeneralHomeInfo()}
                </View>
            </ScrollView>
        );
    }

    return !(Platform.OS === 'ios') ? (
        <View style={styles.container}>
            <View style={styles.pallet}>{renderContents()}</View>
        </View>
    ) : (
        <View style={styles.container}>
            <SafeAreaView style={styles.pallet}>
                {renderContents()}
            </SafeAreaView>
        </View>
    );
}

DetailedPropertyScreenBase.defaultProps = {
    primaryColorTheme: BaseStyles.LightColorTheme,
};