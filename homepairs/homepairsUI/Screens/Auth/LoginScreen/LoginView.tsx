import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import {NavigationProps} from '../../../utility/NavigationProps'
import { PropertiesModel } from '../../../ViewModel/PropertiesModel';
import axios from 'axios';
import { View, Modal, Alert, ActivityIndicator, StatusBar, Text, Platform } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

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
    modalVisible: boolean,
    error: boolean,
    errorMessage: string,
}

export default abstract class LoginView extends React.Component<LoginViewProps, LoginViewState>{
    constructor(props : any){
        super(props)
        this.state = {
            username : '',
            password : '',
            modalVisible: false,
            error: false,
            errorMessage: '',
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
    _clickSignIn = async () => {
        this.setState({modalVisible : true})
        //alert('There is a click')
        //TODO: Make authentication request to BackEnd
        await axios.post('http://vertical-proto-homepairs.herokuapp.com/verticalAPI/', {
          username: this.state.username,
          password: this.state.password,
        })
        .then((response) => {
          if(!((response["data"]['status']) === 'failure')){
            console.log(response['data'])
            PropertiesModel.initProperties(response['data']['properties'])
            //alert(PropertiesViewModel.properties)
            this.props.navigation.navigate('Main')
          }else{
              this.setState({modalVisible : false, error: true, errorMessage: "Home Pairs was unable to log in. Please try again."})
              //alert(response['data'])
          }
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
        });
    }
    _clickSignUp = () => { 
       this.props.navigation.navigate('SignUp')
    };

    showError = () => {
        if(!this.state.error){
            return (<View />)
        }
        return (
            <Text style={{fontSize: 12, color:'red'}}>{this.state.errorMessage}</Text>
        )
    }

    presentModal = () => {
        if(Platform.OS === 'web'){
            return (
                <View style={{height:0, width:0}}/>
            )
        }
        return (
        <Modal
          animationType='fade'
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
              <View 
              style={{
                  flexDirection:'column', 
                  alignContent:'center', 
                  alignSelf:'center', 
                  justifyContent:'center',
                  backgroundColor:'#00000080',
                  height:'100%',
                  width: '100%',}}>
              <View 
              style={{
                  flex: 1,
                  alignContent: 'center', 
                  justifyContent: 'center', 
                  alignSelf:'center', 
                  alignItems: 'center', 
                  backgroundColor: '#fff',
                  maxHeight: 100, 
                  width: '75%',
                  maxWidth: 350,
                  shadowColor: '#aaa',
                  shadowRadius: 10,
                  shadowOffset: {width : 1, height: 1,},
                  shadowOpacity: 200,
                  elevation: 9,
                  borderRadius: 10,}}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
                <Text style={{fontFamily: 'nunito-regular', fontSize: 16}}>Logging In....</Text>
             </View>
             </View>
        </Modal>
        )
    }
}

