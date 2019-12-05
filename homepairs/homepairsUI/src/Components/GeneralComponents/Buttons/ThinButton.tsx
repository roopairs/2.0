import * as React from 'react'
import {DefaultThinButtonStyles} from '../UIComponentStyles';
import {
  TouchableOpacity,
  Text,
  View,
  ViewStyle,
} from 'react-native'

interface ThinButtonProp{
  name?: String, 
  onClick?: () => any, //Define a function and its return type
  containerStyle? : ViewStyle,
  buttonStyle?: ViewStyle,
  buttonTextStyle?: ViewStyle,
}

interface ThinButtonState {}

export default class ThinButton extends React.Component<ThinButtonProp, ThinButtonState> {
  constructor(props : Readonly<ThinButtonProp>) {
    super(props)
  }

  //This function will call the parent callback function. 
  onPress = () => {
    this.props.onClick()
  }

 render() {
   return (
     <View 
     style={(this.props.containerStyle == null) ? DefaultThinButtonStyles.container : this.props.containerStyle}>
       <TouchableOpacity
         style={(this.props.buttonStyle == null) ? DefaultThinButtonStyles.button : this.props.buttonStyle}
         onPress={this.onPress}>
         <Text 
         style={(this.props.buttonTextStyle == null) ? DefaultThinButtonStyles.signUpButtonText : this.props.buttonTextStyle}>
           {this.props.name}
           </Text>
       </TouchableOpacity>
      </View>
    )
  }
}
