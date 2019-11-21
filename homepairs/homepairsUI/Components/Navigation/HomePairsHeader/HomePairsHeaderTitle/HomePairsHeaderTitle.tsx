import { 
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    TouchableOpacity, 
    Image,} from 'react-native';
import React from 'react'
import { Platform } from 'react-native';


interface HomePairsHeaderState{
    showMenu : boolean,
}
interface HomePairsTitleProps {
    parentCallBack : (arg0?: any) => any
}

export class HomePairsHeaderTitle extends React.Component<HomePairsTitleProps, HomePairsHeaderState>{
    sendData(){
        this.props.parentCallBack()
    }

    nativeButton(){
        return (
            <TouchableOpacity
            onPress={() => this.sendData()}
            style={styles.hamburgerStyle}>
                <Image style={styles.homePairsHamburgerImage} source={require('../../../../assets/Hamburger.png')}/>
            </TouchableOpacity> 
        )
    }
    webButton(){
        return(
        <TouchableOpacity
                onPress={() => this.sendData()}
                style={styles.hamburgerStyle}>
                    <Text style={styles.homePairsHamburgerImage}>=</Text>
                </TouchableOpacity>
        )
    }

    chooseRender(){
        if(Platform.OS === 'web')
            return this.webButton()
        else 
            return this.nativeButton()
    }

    render() {
        return (
           <View style={styles.homePairsTitleContianer}>
               <Text style={styles.homePairsTitle} >HomePairs</Text>
               {this.chooseRender()}
           </View>
        )
    }
}

const styles = StyleSheet.create({
    homePairsTitleContianer : {
        flexDirection: 'row', 
        padding: '5%', 
        maxHeight: 100,
        backgroundColor: '#fff',
    },
    homePairsTitle: {
        color: '#0098CD', 
        fontFamily: 'nunito-regular', 
        fontSize: 32,
        flex: 6,
        alignSelf: 'baseline',
    },
    homePairsHamburgerImage: {
        alignSelf:'center', 
    },
    hamburgerStyle: {
       flex: 1,
       marginRight: "3%",
       height:"75%",
       width:"100%",
       maxWidth: 50,
    },
})