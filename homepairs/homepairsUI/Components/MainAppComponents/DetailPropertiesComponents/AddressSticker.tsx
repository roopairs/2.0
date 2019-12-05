import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import { StyleSheet, Text, View, Platform} from 'react-native';

interface AddressStickerProps {
    address: string
}

export default class AddressSticker extends React.Component<AddressStickerProps> {
    render() {
        return(
           <View style={styles.container}>
                <Text style={styles.cityStateText}>San Luis Obispo, CA / 
                    <Text>{this.props.address}</Text>
                    </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#E9ECEF',
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        //justifyContent: 'center',
        marginVertical: 30,
        padding: 20,
        borderRadius: 5,
    },
    streetAddress: {

    },
    cityStateText: {
        fontSize: 16,
        fontFamily: 'nunito-regular',
    },
    cardTitle: {
      fontSize: 18,
      maxWidth: 450,
      fontFamily: 'nunito-semibold',
    },
    cardDescription: {
        fontFamily: 'nunito-regular',
        fontSize: Platform.OS === 'web' ? 13 : 12,
    },
    textContainer: {
        width: '95%',
        borderBottomColor: '#EFEFEF',
        paddingBottom: 10,
        borderBottomWidth: 1,
    },
})