import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import { StyleSheet, Text, View, Platform} from 'react-native';
import ThinButton from '../GeneralComponents/Buttons/ThinButton';


interface AccountConnectedCardProps {
    disconnectAccountCallBack?: (arg0?:any) => any
}

export default class AccountConnectedCard extends React.Component<AccountConnectedCardProps> {
    
    disconnectAccount = () => {
        //TODO: Call asyncronous fetch (From fetch or axios) to connect Roopairs account
        alert('I need to disconnect')
        this.props.disconnectAccountCallBack('TODO: Insert Parameters for call back (might be a json)!')
    }

    render() {
        return(
           <View style={styles.accountContainer}>
               <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>Account Connected</Text>
                <Text style ={styles.cardDescription}>
                    Your roopairs account is ready for on-demand service 
                     </Text>
                </View>
                <View style={{marginTop: Platform.OS === 'web' ? 25 : '4%'}}>
                <ThinButton 
                name='Disconnect Account'
                containerStyle={styles.thinButtonContainer}
                buttonStyle={styles.thinButton}
                buttonTextStyle={styles.thinButtonText}
                onClick={this.disconnectAccount}/>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
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
    accountContainer: {
        backgroundColor: '#fff',
        marginHorizontal: '5%',
        marginTop: 20,
        borderRadius: 7,
        paddingVertical: '5%',
        paddingHorizontal: '2.5%',
        width: '90%',
        maxWidth: 380,
        alignSelf: 'center',
        alignItems: 'center',
        maxHeight: Platform.OS === 'web' ? null : 175,
        shadowColor: '#E3E3E3',
        shadowRadius: 20,
        shadowOffset: {width : 1, height: 1,},
        shadowOpacity: 100,
        elevation: 9,
    },
    thinButtonContainer: {
        flex: 1,
        alignSelf: 'center',
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
        borderColor: '#58BEEF',
    },
    thinButtonText:{
        color: '#0098CD', 
        fontSize: 16,
        alignSelf: 'center',
    },
});