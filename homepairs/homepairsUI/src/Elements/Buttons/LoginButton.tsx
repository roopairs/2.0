import React from 'react'
import {
  TouchableOpacity,
  Text,
  View,
  ViewStyle,
  TextStyle,
  StyleSheet,
  TouchableOpacityProps,
  Image,
} from 'react-native'
import {roopairsLogo} from 'homepair-images';
import HomePairColors from 'homepair-colors';

export type LoginButtonProps = {
    name?: String, 
    onClick?: () => any, //Define a function and its return type
    image?: Image,
    containerStyle? : ViewStyle,
    buttonStyle?: ViewStyle,
    buttonTextStyle?: TextStyle,
  }

export default function LoginButton(props: LoginButtonProps) {
    //This function will call the parent callback function. 
    function onPress(){
        props.onClick()
    }

    let touchableOpacityProps : TouchableOpacityProps = {...props} as TouchableOpacityProps 
    touchableOpacityProps = {...touchableOpacityProps, 
        style: (props.buttonStyle == null) ? DefaultLoginButtonStyles.button : props.buttonStyle,
        onPress: props.onClick
    }
  
    return (
       <View 
       style={DefaultLoginButtonStyles.container} >
         <TouchableOpacity
           style={DefaultLoginButtonStyles.button}
           onPress={onPress}>
           <Image style = {DefaultLoginButtonStyles.imageStyle} source={roopairsLogo}/>
           <Text 
           style={(props.buttonTextStyle == null) ? DefaultLoginButtonStyles.signUpButtonText : props.buttonTextStyle}>
             {props.name}
             </Text>
         </TouchableOpacity>
        </View>
    )
  }

const DefaultLoginButtonStyles = StyleSheet.create({
    container: {
      flex: 2,
      alignSelf: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
      minHeight: 50,
    },
    imageStyle: {
      width: 40, 
      height: 40, 
      resizeMode: 'contain',
    },
    button: {
      alignItems: 'center',
      backgroundColor: 'transparent',
      flexDirection: 'row',
      padding: 10,
      maxWidth: 300,
      minWidth: 200,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: HomePairColors.LightModeColors.roopairs,
    },
    signUpButtonText: {
        color: HomePairColors.LightModeColors.roopairs, 
        fontSize: 15,
        alignSelf: 'center',
    },
  });