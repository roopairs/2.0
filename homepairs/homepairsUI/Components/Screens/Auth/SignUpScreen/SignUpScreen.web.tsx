 import { Text, View, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import InputForm from '../../../UIComponents/InputForm';
import ThinButton from '../../../UIComponents/Buttons/ThinButton';
import AuthStyles from '../AuthStyles'
import { SafeAreaView } from 'react-navigation';
import AccountTypeRadioButton from '../../../UIComponents/Buttons/AccountTypeRadioButton'
import SignUpView from './SignUpView';

/**
 * StyleSheet for all components in this directory and children directories 
 * */
const parentStyles = AuthStyles.AuthScreenStyles


export default abstract class SignUpScreen extends SignUpView{
    
    render() {
        return(
            <SafeAreaView style={parentStyles.pallet}>
                <ScrollView style={{flex: 1}} 
                contentContainerStyle={parentStyles.assetLoadedContainer}
                directionalLockEnabled={true}
                automaticallyAdjustContentInsets={false}>
                    <Card
                    containerStyle={parentStyles.authCardContainer} 
                    title="HomePairs"
                    titleStyle={parentStyles.homePairsTitle}>
                        <View style={parentStyles.container}>
                            <Text style={parentStyles.subTitleText}>Create your account</Text>
                            <AccountTypeRadioButton parentCallBack={this.getAccountType}/>
                            <InputForm name='FIRST NAME' parentCallBack={this.getFormFirstName} />
                            <InputForm name='LAST NAME' parentCallBack={this.getFormLastName}/>
                            <InputForm name='EMAIL' parentCallBack={this.getFormEmail}/>
                            <InputForm 
                            name='PASSWORD' 
                            parentCallBack={this.getFormPassword}
                            secureTextEntry={true}/>
                            <InputForm 
                            name='CONFIRM PASSWORD' 
                            parentCallBack={this.getFormCPassword}
                            secureTextEntry={true}/>
                            <View style={parentStyles.submitSection}>
                                <ThinButton 
                                name='Sign Up' 
                                onClick={this._clickSignUp}
                                buttonStyle={parentStyles.thinButton}
                                buttonTextStyle={parentStyles.thinButtonText}/>
                            </View>
                            <View style={parentStyles.signUpSection}>
                                <Text style={parentStyles.standardText}>Already have an account?{" "} 
                                    <Text 
                                    style={{color: '#0098CD'}} 
                                    onPress={this._clickSignIn}>
                                        Sign In
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