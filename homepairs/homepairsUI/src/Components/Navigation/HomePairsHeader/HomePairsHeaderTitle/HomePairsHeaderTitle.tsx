import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Image,
    Platform,} from 'react-native';
import React from 'react'
import hamburgerButton from '../../../../../assets/Hamburger.png';

interface HomePairsTitleProps {
    /**
     * This callBack function is intended to notify the parent header of when the 
     * hamburger icon has been clicked. The parameter intended to be passed should 
     * be this components showMenu property. 
    */
    toggleMenuCallBack?: (arg0?: any) => any
    showGoBackButton: boolean
    isDropDown: boolean
}

/**
 * This class is intended to hold all information for the first component of the header. There are a few 
 * conditions. This page is essentially the same if running as a native app or if the web page window has 
 * a resolution of less than 600px. 
 * 
 * This page has an optional props to send information back to the parent. This is function is intended to
 * help toggle the drop down menu of the header when the hamburger menu is present. 
 */
export class HomePairsHeaderTitle extends React.Component<HomePairsTitleProps>{
    
    hamburgerButton = (Platform.OS === 'web') ? hamburgerButton : require('../../../../../assets/Hamburger.png') 
    hamburgerStyle = (Platform.OS === 'web') ? styles.hamburgerStyleWeb : styles.hamburgerStyle
    hamburgerImageStyle = (Platform.OS === 'web') ? styles.homePairsHamburgerImageWeb : styles.homePairsHamburgerImage
    
    
    /**
     * This should be called when running on a native application. 
     * NOTE: require('') seems to only work in native apps. 
     */
    dropDownRender(){
        return (
            <TouchableOpacity
            onPress={() => this.props.toggleMenuCallBack()}
            style={this.hamburgerStyle}>
                <Image 
                style={this.hamburgerImageStyle} 
                source={this.hamburgerButton}/>
            </TouchableOpacity> 
        )
    }

    /**
     * This should be called when running on native-web. It seems react-native-web is 
     * required to import local images in order to render them. 
     */
    chooseWideRender(){
        /**
         * Case 1: If window is large, show all navigation options next to title
         * Else:: If window is tiny, show hamburger menu for dropdown navigation
         */
        if(this.props.isDropDown){
            return this.dropDownRender()
        }
        
        return(
            <View style={{height:'0%', width:'0%'}}></View>
        )
    }
    render() {
        return (
           <View style={styles.homePairsTitleContainer}>
               <Text style={styles.homePairsTitle}>HomePairs</Text>
               {this.chooseWideRender()}
           </View>
        )
    }
}

const styles = StyleSheet.create({
    homePairsTitleContainer : {
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
       flex: 2,
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