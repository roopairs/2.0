import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import { StyleSheet, Text, View} from 'react-native';
import ThinButton from '../Buttons/ThinButton';


interface MainStackTitleProps {
    title: String
    buttonTitle?: String
    onButtonPress?: (arg0?:any) => any
}

export default class MainStackTitle extends React.Component<MainStackTitleProps> {
    
    renderButton= () => {
        if(!(this.props.buttonTitle == null)){
            return(
                <ThinButton 
                name={this.props.buttonTitle}
                containerStyle={styles.thinButtonContainer}
                buttonStyle={styles.thinButton}
                buttonTextStyle={styles.thinButtonText}
                onClick={this.props.onButtonPress}/>
            )
        }
        return(
            <></>
        )
    }
    
    render() {
        return(
           <View style={styles.accountContainer}>
                <Text style={styles.pageTitle}>
                    {this.props.title}
                </Text>
                {this.renderButton()}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    pageTitle: {
      fontSize: 32,
      maxWidth: 450,
      fontFamily: 'nunito-regular',
      flex: 2,
    },
    accountContainer: {
        marginHorizontal: '2.5%',
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E3E3E3',
        paddingBottom: 4,
        width: '95%',
        flexDirection: 'row',
    },
    thinButtonContainer: {
        flex: 1.2,
        justifyContent: 'center',
        paddingHorizontal: 10,
        height: 50,
        width: '15%', 
        maxWidth: 150,
        alignSelf: 'flex-end',
    },
    thinButton:{
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#58BEEF',
        height: 30,
        justifyContent: 'center',
    },
    thinButtonText:{
        color: '#0098CD', 
        fontSize: 16,
        alignSelf: 'center',
    },
});