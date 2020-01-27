import React from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import {
    StyleSheet,
    Text,
    View,
    Platform,
    ImageBackground,
    ImageSourcePropType,
} from 'react-native';
import {
    ThinButtonProps,
    renderThinButton,
} from 'homepairs-elements';
import { defaultProperty } from 'homepairs-images';
import strings from 'homepairs-strings';
import { HomePairsDimensions } from 'homepairs-types';

/**
 * Main App Components will have similar functionality to the parent components ONLY
 * in terms of Presentation. These are NOT SMART COMPONENTS. These components should never
 * have access the store. They should send information back to the parent class and allow
 * the parent to take care of logic related to the global state.
 */

const styles = StyleSheet.create({
    streetText: {
        fontSize: 22,
        fontFamily: 'nunito-regular',
        color: '#fff',
    },
    cityText: {
        fontSize: 18,
        fontFamily: 'nunito-regular',
        color: '#9DA0A2',
    },
    propertyAddressContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,.6)',
    },
    imageContainer: {
        width: '100%',
        height: '75%',
        flex: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        overflow: 'hidden',
    },
    remainingContainer: {
        flex: 4,
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    container: {
        backgroundColor: '#fff',
        marginHorizontal: '5%',
        marginVertical: 15,
        borderRadius: 10,
        width: '90%',
        maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
        alignSelf: 'center',
        alignItems: 'center',
        height: Platform.OS === 'web' ? 325 : 275,
        shadowColor: 'black',
        shadowRadius: 10,
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.2,
        elevation: 5,
    },
    thinButtonContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        minHeight: 50,
    },
    thinButton: {
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        maxWidth: 300,
        minWidth: 200,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#B3C0C2',
    },
    thinButtonText: {
        color: '#798285',
        fontSize: 16,
        alignSelf: 'center',
    },
    homePairsPropertiesImage: {
        flex: 1,
        alignSelf: 'center',
        width: '100%',
        height: '100%',
    },
    homePairsPropertiesImageWeb: {
        alignSelf: 'center',
        width: '100%',
        height: '100%',
    },
    imageStyle: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
});

export type ViewPropertyCardProps = {
    viewButtonSelectedCallBack?: (arg0?: number, arg1?: any) => any;
    propertyIndex: number;
    propertyAddress: String;
    image?: ImageSourcePropType;
};

const viewPropertyButtonText = strings.propertiesPage.viewPropertyCardButton;
export default function ViewPropertyCard(props: ViewPropertyCardProps) {
    const {
        viewButtonSelectedCallBack,
        propertyAddress,
        propertyIndex,
        image,
    } = props;
    /**
     * This function is inteded to invoke the callback to its parent function. It will return the index of the
     * the Property found in global store's PropertyState which an array of Properties, Property[]
     */
    function sendIndexToParent() {
        viewButtonSelectedCallBack(propertyIndex);
    }

    const thinButtonProps: ThinButtonProps = {
        name: viewPropertyButtonText,
        containerStyle: styles.thinButtonContainer,
        buttonStyle: styles.thinButton,
        buttonTextStyle: styles.thinButtonText,
        onClick: sendIndexToParent,
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageBackground
                    source={image}
                    style={
                        Platform.OS === 'web'
                            ? styles.homePairsPropertiesImageWeb
                            : styles.homePairsPropertiesImage
                    }
                    imageStyle={styles.imageStyle}
                    resizeMode="cover"
                >
                    <View style={styles.propertyAddressContainer}>
                        <Text style={styles.streetText}>{propertyAddress}</Text>
                        <Text style={styles.cityText}>San Luis Obispo, CA</Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.remainingContainer}>
                {renderThinButton(thinButtonProps)}
            </View>
        </View>
    );
}

ViewPropertyCard.defaultProps = {
    viewButtonSelectedCallBack: (arg0?: number, arg1?: any) => {return {arg0, arg1};},
    image: defaultProperty,
};
