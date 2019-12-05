import { Text, View, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import InputForm from '../../../Components/GeneralComponents/InputForm';
import ThinButton from '../../../Components/GeneralComponents/Buttons/ThinButton';
import AuthStyles from '../AuthStyles.native'
import {NavigationProps} from '../../../utility/NavigationProps'
import { SafeAreaView } from 'react-navigation';
import AccountTypeRadioButton from '../../../Components/GeneralComponents/Buttons/AccountTypeRadioButton'
import { AccountTypes } from '../../../utility/AccountTypes';

/**
 * StyleSheet for all components in this directory and children directories 
 * */
const parentStyles = AuthStyles.AuthScreenStyles
const axios = require('axios')
/** 
 * These define the types for the prop and state attributes for the component. Notice 
 * how the LoginScreenProps extends from NavigationProps. This is so all screens that are 
 * in a NavigationStack (check App.tsx) are defined along with ant properties specific
 * to this component.  
*/
interface SignUpViewProps extends NavigationProps {}
interface SignUpViewState {
    accountType?: AccountTypes,
    firstName? : String,
    lastName? : String,
    email? : String,
    password? : String,
    cPassword? : String,
}

export default class SignUpView extends React.Component<SignUpViewProps, SignUpViewState>{
    constructor(props){
        super(props)
        this.state = {
            accountType : AccountTypes.Tenant,
            firstName : '',
            lastName : '',
            email : '',
            password : '',
            cPassword : '',
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
    getAccountType = (childData : AccountTypes) => {
        this.setState({accountType : childData})
    }
    getFormFirstName = (childData : String) => {
        this.setState({firstName : childData})
    }
    getFormLastName = (childData : String) => {
        this.setState({lastName : childData})
    }
    getFormEmail = (childData : String) => {
        this.setState({email : childData})
    }
    getFormPassword = (childData : String) => {
        this.setState({password : childData})
    }
    getFormCPassword = (childData : String) => {
        this.setState({cPassword : childData})
    }

    /** 
     * Event functions for when something occurs on this component. 
    */
    _clickSignIn = () => {
       this.props.navigation.navigate('Login')
    };
    _clickSignUp = () => {
        alert(this.state.accountType + "\n" +this.state.firstName + " " + this.state.lastName + "\n" + this.state.email 
        + "\n" + this.state.password + " " + this.state.cPassword)
        //TODO: Make authentication request to BackEnd
    }

    render() {
        return(
            <SafeAreaView style={parentStyles.pallet}>
                <ScrollView style={{flex: 1}} 
                contentContainerStyle={parentStyles.assetLoadedSignUpContainer}
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