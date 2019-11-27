import { View, StyleSheet, Dimensions} from 'react-native';
import React from 'react'
import {HomePairsHeaderTemplate, HeaderStyles} from './HomePairsHeaderTemplate';
import { HomePairsHeaderTitle } from './HomePairsHeaderTitle/HomePairsHeaderTitle';
import HomePairsMenu from './HomePairsHeaderMenu/HomePairsHeaderMenu';

/**
 * Unlike the native components, this one will need to render multiple views 
 * based on the size of the browsers window. 
 */
export default class HomePairsHeader extends HomePairsHeaderTemplate {

    /**
     * Function that helps re-render the component when neccessary. This will be 
     * passed into our listener. 
     */
    handleChange = () => {
        var width= Dimensions.get('window').width
        if(width < 600){
            this.setState({isDropDown : true})
        }else{
            this.setState({isDropDown: false})
        }
        
    }

    /**
     * Upon mounting, we check the window size and set the state appropriatly. 
     * Here is where we initialize our window listner in which it will invoke the 
     * handleChange function when ever a change to the browsers window size occurs. 
     */
    componentDidMount(){
        var width = Dimensions.get('window').width
        if(width < 600){
            this.setState({isDropDown : true})
        }
        Dimensions.addEventListener("change", this.handleChange)
    }

    /**
     * Here we clean up our component by removing the listener
     */
    componentWillUnmount(){
        Dimensions.removeEventListener("change", this.handleChange)
    }
    changePage = (arg0 : number) => {
        this.setState({currentPage : arg0}) //Flips true/false
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={!this.state.isDropDown? {flexDirection: 'row'} : {flexDirection: 'column'}}>
                    <HomePairsHeaderTitle parentCallBack={!this.state.isDropDown ? null : this.toggleMenu}/>
                    <HomePairsMenu
                        navigation={this.props.navigation}
                        parentCallBack={this.changePage}
                        parentCloseMenu={this.toggleMenu}
                        isDropDown={this.state.isDropDown}
                        showMenu={this.state.showMenu}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: HeaderStyles.container.backgroundColor,
        width: '100%',
        shadowColor: '#000',
        minWidth: 300,
        shadowOpacity: 0.1,
        shadowRadius: 1,
        shadowOffset: {width: 0, height: 2},

    }
})