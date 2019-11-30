import { 
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    TouchableOpacity, 
    Image,} from 'react-native';
import React from 'react'
import { Platform } from 'react-native';
import hamburgerButton from '../../../../assets/Hamburger.png';


interface HomePairsHeaderState{
    showMenu : boolean,
}
interface HomePairsTitleProps {
    /**
     * This callBack function is intended to notify the parent header of when the 
     * hamburger icon has been clicked. The parameter intended to be passed should 
     * be this components showMenu property. 
    */
    parentCallBack?: (arg0?: any) => any
}

/**
 * This class is intended to hold all information for the first component of the header. There are a few 
 * conditions. This page is essentially the same if running as a native app or if the web page window has 
 * a resolution of less than 600px. 
 * 
 * This page has an optional props to send information back to the parent. This is function is intended to
 * help toggle the drop down menu of the header when the hamburger menu is present. 
 */
export class HomePairsHeaderTitle extends React.Component<HomePairsTitleProps, HomePairsHeaderState>{
    sendData(){
        this.props.parentCallBack()
    }

    /**
     * This should be called when running on a native application. 
     * NOTE: require('') seems to only work in native apps. 
     */
    nativeRender(){
        return (
            <TouchableOpacity
            onPress={() => this.sendData()}
            style={styles.hamburgerStyle}>
                <Image 
                style={styles.homePairsHamburgerImage} 
                source={require('../../../../assets/Hamburger.png')}/>
            </TouchableOpacity> 
        )
    }

    /**
     * This should be called when running on native-web. It seems react-native-web is 
     * required to import local images in order to render them. 
     */
    webRender(){
        let window = Dimensions.get('window').width
        /**
         * Case 1: If window is large, show all navigation options next to title
         * Else:: If window is tiny, show hamburger menu for dropdown navigation
         */
        if(window >= 600){
            return(
                <View style={{height:'0%', width:'0%'}}></View>
            )
        }else{
            return(<TouchableOpacity
                onPress={() => this.sendData()}
                style={styles.hamburgerStyleWeb}>
                    <Image 
                    style={styles.homePairsHamburgerImageWeb} 
                    source={hamburgerButton}/>
                </TouchableOpacity> )
        }
    }

    /**
     * Use the Platorm.OS library to determine if running on the web. Appropriate render is executed 
     * based on the returned result.
     */
    chooseRender(){
        if(Platform.OS === 'web')
            return this.webRender()
        else 
            return this.nativeRender()
    }

    render() {
        return (
           <View style={styles.homePairsTitleContianer}>
               <Text style={styles.homePairsTitle}>HomePairs</Text>
               {this.chooseRender()}
           </View>
        )
    }
}

const styles = StyleSheet.create({
    homePairsTitleContianer : {
        flexDirection: 'row', 
        padding: 15,
        height: 80,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignContent: 'center'
    },
    homePairsTitle: {
        color: '#0098CD', 
        fontFamily: 'nunito-regular', 
        fontSize: 32,
        flex: 6,
    },
    homePairsHamburgerImage: {
        alignSelf:'center', 
        width: 45,
        height: 45,
    },
    hamburgerStyle: {
       flex: 1,
       marginRight: "3%",
       height: null,
       width: null,
       resizeMode: 'contain',
       maxWidth: 50,
    },
    homePairsHamburgerImageWeb: {
        width: 45,
        height: 45,
    },
    hamburgerStyleWeb: {
        flex: 1,
        marginRight: "3%",
        width: null,
        height: null,
    },

})