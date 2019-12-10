import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import {NavigationProps} from '../../../utility/NavigationProps'
import { View, Text} from 'react-native';

/** 
 * These define the types for the prop and state attributes for the component. Notice 
 * how the LoginViewProps extends from NavigationProps. This is so all screens that are 
 * in a NavigationStack (check App.tsx) are defined along with ant properties specific
 * to this component.  
*/
export interface LoginViewState {
    username? : String,
    password? : String,
    modalVisible: boolean,
    error: boolean,
    errorMessage: string,
}

type Props = NavigationProps & {
    onFetchAccountProfile?: (
        username: String,
        password: String,
        modelSetOffCallBack: (error?:string) => any, 
        navigateMainCallBack: () => any, ) => void
  }

export default abstract class LoginView extends React.Component<Props, LoginViewState>{
    constructor(props: Readonly<Props>){
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

    _clickSignIn = () => {
        //console.log(this.props)
        this.setState({modalVisible: true})
        this.props.onFetchAccountProfile(this.state.username, this.state.password, this.setModalOff, this.navigateMain)
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

    setModalOff = (error:string = "Error Message") => {
        this.setState({modalVisible : false, error: true, errorMessage: error})

    }
    navigateMain = () => {
        this.setState({modalVisible : false, error: false})
        this.props.navigation.navigate('Main')
    }

    abstract presentLoading: () => any
}
