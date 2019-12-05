import React from 'react'
import {DefaultAccountTypeRadioButtonStyle} from '../UIComponentStyles';
import { AccountTypes } from '../../../utility/AccountTypes';
import {
  TouchableOpacity,
  Text,
  View,
} from 'react-native'

interface AccountTypeRadioProps{
  name?: String,
  parentCallBack? : (childData : AccountTypes) => any, //Define a funtion with parameters
}
interface AccountTypeRadioState{
  landLordSelected : boolean
}

export default class AccountTypeRadioButton extends React.Component<AccountTypeRadioProps, AccountTypeRadioState> {
  constructor(props: Readonly<AccountTypeRadioProps>) {
    super(props)
    this.state = { landLordSelected : false}
    this.props.parentCallBack(AccountTypes.Tenant)
  }

  onPressLandLord = () => {
    this.setState({
      landLordSelected : true
    })
    this.props.parentCallBack(AccountTypes.Landlord)
  }

  onPressTenant = () => {
    this.setState({
      landLordSelected : false
    })
    this.props.parentCallBack(AccountTypes.Tenant)
  }

 render() {
   return (
     <View style={{width: '100%'}}>
       <Text style={{marginVertical: '3.5%', fontFamily:'nunito-regular', color: '#9BA0A2'}}>ACCOUNT TYPE</Text>
     <View style={DefaultAccountTypeRadioButtonStyle.container}>
       <TouchableOpacity
         style={this.state.landLordSelected ? 
          DefaultAccountTypeRadioButtonStyle.unselectedButton : DefaultAccountTypeRadioButtonStyle.selectedButton }
         onPress={this.onPressTenant}
       >
         <Text style={this.state.landLordSelected ? 
          DefaultAccountTypeRadioButtonStyle.unselectedText : DefaultAccountTypeRadioButtonStyle.selectedText}>
            Tenant
            </Text>
       </TouchableOpacity>
       <TouchableOpacity
         style={this.state.landLordSelected ?
          DefaultAccountTypeRadioButtonStyle.selectedButton : DefaultAccountTypeRadioButtonStyle.unselectedButton  }
         onPress={this.onPressLandLord}
       >
         <Text style={this.state.landLordSelected ? 
          DefaultAccountTypeRadioButtonStyle.selectedText : DefaultAccountTypeRadioButtonStyle.unselectedText }>
            Landlord
            </Text>
       </TouchableOpacity>
      </View>
      </View>
    )
  }
}