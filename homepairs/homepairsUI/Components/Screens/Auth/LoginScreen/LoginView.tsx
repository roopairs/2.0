import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import {NavigationProps} from '../../../../utility/NavigationProps'

/**
 * StyleSheet for all components in this directory and children directories 
 * */
//const parentStyles = AuthStyles.AuthScreenStyles

/** 
 * These define the types for the prop and state attributes for the component. Notice 
 * how the LoginViewProps extends from NavigationProps. This is so all screens that are 
 * in a NavigationStack (check App.tsx) are defined along with ant properties specific
 * to this component.  
*/
interface LoginViewProps extends NavigationProps {}
interface LoginViewState {
    username? : String,
    password? : String,
}

export default abstract class LoginView extends React.Component<LoginViewProps, LoginViewState>{
    constructor(props : any){
        super(props)
        this.state = {
            username : '',
            password : '',
        }
    }
    /**
     * Optional navigation options. Here is where will will define animations, headers, and other 
     * settings for navigationg from this screen.
     * */
    static navigationOptions = {}
    
    /**
     * Callback functions for child components. These functions are intended to passed into a childs components 
     * parentCallBack attribute. 
     * EX: 
     * <InputForm name='EMAIL' parentCallBack={this.getFormUsername} />
     */
    getFormUsername = (childData : String) => {
        this.setState({username : childData})
    }
    getFormPassword = (childData : String) => {
        this.setState({password : childData})
    }

    /** 
     * Event functions for when something occurs on this component. 
    */
    _clickSignIn = () => {
        //alert(this.state.username + " " + this.state.password)
        //TODO: Make authentication request to BackEnd
        this.props.navigation.navigate('Home')
    }
    _clickSignUp = () => { 
       this.props.navigation.navigate('SignUp')
    };
    
    /**
     * NOTE: If you want your ScrollView to actually scroll, you must set the style of the ScrollView {{flex:1}}. Do not 
     * have the contentContainerStyle have a flex. This will effectively make your ScrollView unable to scroll!
     */
    /*render() {
        return(
            <SafeAreaView style={parentStyles.pallet}>

            <ScrollView style={{flex: 1}} 
            contentContainerStyle={parentStyles.assetLoadedLogInContainer}
            directionalLockEnabled={true}
            automaticallyAdjustContentInsets={false}>
            <Card
            containerStyle={parentStyles.authCardContainer} 
            title="HomePairs"
            titleStyle={parentStyles.homePairsTitle}>
                <View style={parentStyles.container}>
                    <Text style={parentStyles.subTitleText}>Sign in to your Account</Text>
                    <InputForm name='EMAIL' parentCallBack={this.getFormUsername} />
                    <InputForm 
                    name='PASSWORD' 
                    parentCallBack ={this.getFormPassword}
                    secureTextEntry={true}/>
                    <View style={parentStyles.submitSection}>
                        <ThinButton 
                        name='Sign In' 
                        onClick={this._clickSignIn}
                        buttonStyle={parentStyles.thinButton}
                        buttonTextStyle={parentStyles.thinButtonText}/>
                    </View>
                    <View style={parentStyles.signUpSection}>
                        <Text style={parentStyles.standardText}>New to HomePairs?{" "} 
                            <Text 
                            style={{color: '#0098CD'}} 
                            onPress={this._clickSignUp}>
                                Sign Up
                                </Text>
                        </Text>
                    </View>
                </View>
            </Card>
            </ScrollView>
            </SafeAreaView>
        );
    }*/
}

