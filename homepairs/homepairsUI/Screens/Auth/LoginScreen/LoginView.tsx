import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import {NavigationProps} from '../../../utility/NavigationProps'
import { PropertiesViewModel } from '../../../ViewModel/PropertiesViewModel';

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

const axios = require('axios')

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
    _clickSignIn = async () => {
        //alert(this.state.username + " " + this.state.password)
        //TODO: Make authentication request to BackEnd
        await axios.post('http://vertical-proto-homepairs.herokuapp.com/verticalAPI/', {
          username: this.state.username,
          password: this.state.password,
        })
        .then((response) => {
          //alert(response['data'])  
          //console.log(response['data']);
          if(!('ERROR' in response)){
            PropertiesViewModel.initProperties(response['data'])
            //console.log(PropertiesViewModel.properties)
            this.props.navigation.navigate('Main')
          }else{
              alert(response['ERROR'])
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    _clickSignUp = () => { 
       this.props.navigation.navigate('SignUp')
    };
}

