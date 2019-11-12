import { Text, View, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import InputForm from '../../../UIComponents/InputForm';
import ThinButton from '../../../UIComponents/Buttons/ThinButton';
import AuthStyles from '../AuthStyles.native'
import { SafeAreaView } from 'react-navigation';
import LoginView from './LoginView'


/**
 * StyleSheet for all components in this directory and children directories 
 * */
const parentStyles = AuthStyles.AuthScreenStyles

export default class LoginScreen extends LoginView {
    constructor(props: any){
        super(props);
    }

    /**
     * NOTE: If you want your ScrollView to actually scroll, you must set the style of the ScrollView {{flex:1}}. Do not 
     * have the contentContainerStyle have a flex. This will effectively make your ScrollView unable to scroll!
     */
    render() {
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
    }
}
