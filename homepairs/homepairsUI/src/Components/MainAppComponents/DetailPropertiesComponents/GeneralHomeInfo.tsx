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
    
    constructor(props: Readonly<GeneralHomeInfoProps>){
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
            <View style={{flex: 1, alignSelf: 'center', alignItems: 'center'}}> 
                <Text style={{fontSize:12, marginBottom: 10, color: '#727A7C'}}>{arg0}</Text>
                <Text style={{fontSize: 18, fontFamily: 'nunito-bold'}}>{arg1}</Text>
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
                buttonStyle={styles.editButton}
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
        alignSelf: 'center',
        shadowColor: '#aaaaaa',
        shadowRadius: 10,
        shadowOffset: {width : 1, height: 1,},
        shadowOpacity: 100,
        elevation: 9,
    },
    livingSpaceContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '99%',
        paddingVertical: 10,
    },
    addressContainer: {
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 1,
        paddingBottom:10,
        marginBottom: 10,
    },
    streetAddress: {
        fontSize: 16,
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
    editButton: {
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        maxWidth: 200,
        minWidth: 150,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#798285',
    },
})