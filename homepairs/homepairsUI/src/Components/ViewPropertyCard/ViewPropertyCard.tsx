import React from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import {
    StyleSheet,
    Text,
    View,
    Platform,
    ImageBackground,
    Image,
} from 'react-native';
import {
    ThinButton,
} from 'homepairs-elements';
import { defaultProperty } from 'homepairs-images';
import strings from 'homepairs-strings';
import { HomePairsDimensions, Property } from 'homepairs-types';


/**
 * Main App Components will have similar functionality to the parent components ONLY
 * in terms of Presentation. These are NOT SMART COMPONENTS. These components should never
 * have access to the store. They should send information back to the parent class and allow
 * the parent to take care of logic related to the global state.
 */

const styles = StyleSheet.create({
    streetText: {
        fontSize: 22,
        fontFamily: 'nunito-regular',
        color: '#fff',
        textAlign: 'center',
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
    /**
     * Callback that will navigate to the DetailedProperty Screen
     */
    viewButtonSelectedCallBack?: (propId: string, navigation?: any, ...propertyInfo: any) => any;

    /**
     * The unique identifier of the property contents in the redux Store. This value will
     * be assigned to the store's selectedPropertyId member when the detailed page is rendered
     */
    propId: string;

    property: Property;

    /**
     * An optional image that is used when the card is rendered. If none is provided, a default 
     * image will be used instead.
     */
    image?: any;
};

const viewPropertyButtonText = strings.propertiesPage.viewPropertyCardButton;

/**
 * ---------------------------------------------------
 * View Property Card
 * ---------------------------------------------------
 * A component that provides very high level information about a property. It is intended 
 * to be passed a callback function from its parent to permit it to navigate to a detailed property 
 * screen with the the card's assigned Property. It is also capable of being passed an image.
 * 
 * TODO: Set Google Maps API to fetch address images.
 * @param {ViewPropertyCardProps} props 
 */
export default function ViewPropertyCard(props: ViewPropertyCardProps) {
    const { viewButtonSelectedCallBack, property, propId, image} = props;
    const { address } = property;
    Image.prefetch(image);

    /**
     * This function is intended to invoke the callback to its parent function. It will return the index of the
     * the Property found in global store's PropertyState which an array of Properties, Property[]
     */
    function sendIndexToParent() {
        viewButtonSelectedCallBack(propId);
    };


    function renderImageContent() {
        return (
            <ImageBackground
                source={image}
                style={
                    Platform.OS === 'web'
                    ? styles.homePairsPropertiesImageWeb
                    : styles.homePairsPropertiesImage
                }
                imageStyle={styles.imageStyle}
                onError={(error) => {console.log(error);}}
                resizeMode="cover">
                <View style={styles.propertyAddressContainer}>
                    <Text style={styles.streetText}>{address}</Text>
                </View>
            </ImageBackground>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {renderImageContent()}
            </View>
            <View style={styles.remainingContainer}>
                <ThinButton 
                    name={viewPropertyButtonText}
                    containerStyle={styles.thinButtonContainer}
                    buttonStyle={styles.thinButton}
                    buttonTextStyle={styles.thinButtonText}
                    onClick={sendIndexToParent} />
            </View>
        </View>
    );
}

ViewPropertyCard.defaultProps = {
    viewButtonSelectedCallBack: (propId: string, navigation?: any) => {return {propId, navigation};},
    image: defaultProperty,
};
