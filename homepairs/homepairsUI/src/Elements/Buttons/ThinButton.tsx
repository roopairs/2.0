import React from 'react'
import {
  TouchableOpacity,
  Text,
  View,
  ViewStyle,
  TextStyle,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native'

export type ThinButtonProps = {
  name?: String, 
  onClick?: () => any, //Define a function and its return type
  onPressIn? : () => any,
  onPressOut? : () => any,
  containerStyle? : ViewStyle,
  buttonStyle?: ViewStyle,
  buttonTextStyle?: TextStyle,
}

export default function ThinButton(props: ThinButtonProps) {
  //This function will call the parent callback function. 
  function onPress(){
    props.onClick()
  }

  let touchableOpacityProps : TouchableOpacityProps = {...props} as TouchableOpacityProps 
  touchableOpacityProps = {...touchableOpacityProps, 
    style: (props.buttonStyle == null) ? DefaultThinButtonStyles.button : props.buttonStyle,
    onPress: props.onClick
  }

  return (
     <View 
     style={(props.containerStyle == null) ? DefaultThinButtonStyles.container : props.containerStyle}>
       <TouchableOpacity
         style={(props.buttonStyle == null) ? DefaultThinButtonStyles.button : props.buttonStyle}
         onPress={onPress}
         onPressIn={props.onPressIn}
         onPressOut={props.onPressOut}>
         <Text 
         style={(props.buttonTextStyle == null) ? DefaultThinButtonStyles.signUpButtonText : props.buttonTextStyle}>
           {props.name}
           </Text>
       </TouchableOpacity>
      </View>
  )

}

const DefaultThinButtonStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    minHeight: 50,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 10,
    maxWidth: 300,
    minWidth: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#B3C0C2',
  },
  signUpButtonText: {
      color: '#B3C0C2', 
      fontSize: 16,
      alignSelf: 'center',
  },
});