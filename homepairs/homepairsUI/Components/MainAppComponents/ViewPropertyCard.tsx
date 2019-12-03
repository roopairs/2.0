import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import { StyleSheet, Text, View, Platform, ImageBackground, } from 'react-native';
import ThinButton from '../GeneralComponents/Buttons/ThinButton';
import defaultPropertyImage from '../../assets/defaultProperty.png'
import { PropertiesViewModel } from '../../ViewModel/PropertiesViewModel';

interface ViewPropertyCardProps {
    viewPropertyDetails?: (arg0:number, arg1: any) => any
    propertyIndex: number
}

export default class ViewPropertyCard extends React.Component<ViewPropertyCardProps> {
    constructor(props){
        super(props)
    }

    getAddress = () => {
        return PropertiesViewModel.properties[this.props.propertyIndex]['address']
    }

    viewProperty = () => {
        //TODO: Call asyncronous fetch (From fetch or axios) to connect Roopairs account
        //alert('I need to open a New Page')
        this.props.viewPropertyDetails(this.props.propertyIndex, PropertiesViewModel.properties[this.props.propertyIndex])
    }

    render() {
        return(
           <View style={styles.container}>
               <View style={styles.imageContainer}>
                <ImageBackground
                source={defaultPropertyImage} 
                style={(Platform.OS === 'web') ? styles.homePairsPropertiesImageWeb : styles.homePairsPropertiesImage}
                imageStyle={styles.imageStyle}
                resizeMode='cover'>
                    <View style={styles.propertyAddressContainer}>
                <Text style={styles.streetText}>{this.getAddress()}</Text>
                <Text style={styles.cityText}>San Luis Obispo, CA</Text>
                </View>
                </ImageBackground>
                </View>
                <View style={styles.remainingContainer}>
                <ThinButton 
                name='View Property'
                containerStyle={styles.thinButtonContainer}
                buttonStyle={styles.thinButton}
                buttonTextStyle={styles.thinButtonText}
                onClick={this.viewProperty} />
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    streetText:{
        fontSize: 22,
        fontFamily: 'nunito-regular',
        color: '#fff',
    },
    cityText:{
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
        justifyContent: 'center'
    },
    container: {
        backgroundColor: '#fff',
        marginHorizontal: '5%',
        marginTop: 30,
        borderRadius: 10,
        width: '90%',
        maxWidth: 380,
        alignSelf: 'center',
        alignItems: 'center',
        height: Platform.OS === 'web' ? 400 : '100%',
        maxHeight: !(Platform.OS === 'web') ? 350 : null,
        shadowColor: '#E3E3E3',
        shadowRadius: 20,
        shadowOffset: {width : 1, height: 1,},
        shadowOpacity: 100,
        elevation: 9,
    },
    thinButtonContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        minHeight: 50,  
    },
    thinButton:{
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        maxWidth: 300,
        minWidth: 200,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#B3C0C2',
    },
    thinButtonText:{
        color: '#798285', 
        fontSize: 16,
        alignSelf: 'center',
    },
    homePairsPropertiesImage: {
        flex: 1,
        alignSelf:'center', 
        width: '100%',
        height: '100%',
    },
    homePairsPropertiesImageWeb: {
        alignSelf:'center', 
        width: '100%',
        height: '100%',
    },
    imageStyle: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    }
});