import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import { StyleSheet, Text, View, Platform} from 'react-native';
import ThinButton from '../../GeneralComponents/Buttons/ThinButton';


interface GeneralHomeInfoProps {
    address: string
    tenants: number
    bedrooms: number
    bathrooms: number 
}
interface GeneralHomeInfoState {
    address: string
    tenants: number
    bedrooms: number
    bathrooms: number 
}

export default class GeneralHomeInfo extends React.Component<GeneralHomeInfoProps, GeneralHomeInfoState> {
    
    constructor(props){
        super(props)
        this.state = {
            address : this.props.address,
            tenants: this.props.tenants,
            bedrooms: this.props.bedrooms,
            bathrooms: this.props.bathrooms
        }
    }

    detailBox = (arg0: string, arg1: number) => {
        return(
            <View style={{flex: 1}}> 
                <Text>{arg0}</Text>
                <Text>{arg1}</Text>
            </View>
        )
    }

    livingSpace = () => {
        return (
            <View style={styles.livingSpaceContainer}> 
                {this.detailBox('Max Tenants',this.state.tenants)}
                {this.detailBox('Bedrooms',this.state.bedrooms)}
                {this.detailBox('Bathrooms',this.state.bathrooms)}
            </View>
        )
    }
    
    render() {
        /**Need the wrapper View so iOS can render the content properly. I don't know why it does this. */
        return(
            <View>
            <View style={styles.container}>
            <View style={styles.addressContainer}>
                    <Text style={styles.streetAddress}>{this.state.address}</Text>
                    <Text style={styles.cityStateText}>San Luis Obispo, CA</Text>
                </View>
                {this.livingSpace()}
                <ThinButton 
                name='Edit Property'
                onClick={() => {alert('TODO: Create Edit Property Modal!')}}/>
            </View>
            
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        marginHorizontal: '5%',
        marginTop: 20,
        borderRadius: 7,
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 1,
        paddingVertical: '5%',
        paddingHorizontal: '5%',
        width: '90%',
        //maxWidth: 380,
        alignSelf: 'center',
        //alignItems: 'center',
        //maxHeight: Platform.OS === 'web' ? null : 175,
        shadowColor: '#aaaaaa',
        shadowRadius: 10,
        shadowOffset: {width : 1, height: 1,},
        shadowOpacity: 100,
        elevation: 9,
    },
    livingSpaceContainer: {
        flexDirection: 'row',
    },
    addressContainer: {
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 1,
        paddingBottom:5,
    },
    streetAddress: {
        fontSize: 14,
        fontFamily: 'nunito-bold',
    },
    cityStateText: {
        fontSize: 12,
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