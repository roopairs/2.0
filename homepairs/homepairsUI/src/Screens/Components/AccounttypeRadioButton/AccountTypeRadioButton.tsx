import React from 'react'
import { AccountTypes } from 'homepair-types';
import strings from 'homepair-strings';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet
} from 'react-native'
import * as BaseStyles from 'homepair-base-styles';
import { DarkModeInjectedProps } from 'homepair-components';

export type AccountTypeRadioProps = DarkModeInjectedProps & {
  name?: String,
  parentCallBack? : (childData : AccountTypes) => any, //Define a funtion with parameters
}
type AccountTypeRadioState = {
  landLordSelected : boolean
}

const accountRadioStrings = strings.signUpPage.accountTypeRadioButton
export default class AccountTypeRadioButton extends React.Component<AccountTypeRadioProps, AccountTypeRadioState> {
  constructor(props: Readonly<AccountTypeRadioProps>) {
    super(props)
    this.onPressLandLord = this.onPressLandLord.bind(this)
    this.onPressTenant = this.onPressTenant.bind(this)

    this.state = { landLordSelected : false}
    this.props.parentCallBack(AccountTypes.Tenant)
  }

  onPressLandLord() {
    this.setState({ landLordSelected : true })
    this.props.parentCallBack(AccountTypes.Landlord)
  }

  onPressTenant() {
    this.setState({ landLordSelected : false })
    this.props.parentCallBack(AccountTypes.Tenant)
  }

 render() {
   let style = setStyle(this.props.primaryColorTheme)
   let leftButtonStyle = this.state.landLordSelected ? style.unselectedLeftButton : style.selectedLeftButton
   let rightButtonStyle = this.state.landLordSelected ? style.selectedRightButton : style.unselectedRightButton
   return (
     <View style={style.titleContainer}>
       <Text style={style.title}>
         {accountRadioStrings.name}
         </Text>
      <View style={style.buttonContainer}>
        <TouchableOpacity
          style={leftButtonStyle}
          onPress={this.onPressTenant}>
          <Text style={this.state.landLordSelected ? 
            style.unselectedText : style.selectedText}>
              {accountRadioStrings.tenant}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={rightButtonStyle}
          onPress={this.onPressLandLord}>
          <Text style={this.state.landLordSelected ? 
            style.selectedText : style.unselectedText }>
              {accountRadioStrings.landlord}
          </Text>
        </TouchableOpacity>
        </View>
      </View>
    )
  }
}

function setStyle(colorTheme: BaseStyles.ColorTheme){
  let colors = (colorTheme == null) ? BaseStyles.LightColorTheme : colorTheme
  return StyleSheet.create({
    buttonContainer: {
      flexDirection: 'row',
      marginBottom: BaseStyles.MarginPadding.inputForm, 
      paddingTop: BaseStyles.MarginPadding.xsmallConst,
      paddingHorizontal: BaseStyles.MarginPadding.xsmallConst,
      width: BaseStyles.ContentWidth.max,
    },
    title: {
      marginVertical: BaseStyles.MarginPadding.inputForm, 
      fontFamily: BaseStyles.FontTheme.primary, 
      color: colors.lightGray
    },
    titleContainer: {
      width: BaseStyles.ContentWidth.max,
    },
    selectedLeftButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
      padding: BaseStyles.MarginPadding.mediumConst,
      width: BaseStyles.ContentWidth.half,
      borderTopLeftRadius: BaseStyles.BorderRadius.small,
      borderBottomLeftRadius: BaseStyles.BorderRadius.small,
      borderWidth: 1,
      borderColor: colors.space,
    },
    selectedRightButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
      padding: BaseStyles.MarginPadding.mediumConst,
      width: BaseStyles.ContentWidth.half,
      borderTopRightRadius: BaseStyles.BorderRadius.small,
      borderBottomRightRadius: BaseStyles.BorderRadius.small,
      borderWidth: 1,
      borderColor: colors.space,
    },
    selectedText:{
      color: colors.secondary, 
      fontSize: BaseStyles.FontTheme.reg,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    unselectedLeftButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.transparent,
      padding: BaseStyles.MarginPadding.mediumConst,
      width: BaseStyles.ContentWidth.half,
      borderTopLeftRadius: BaseStyles.BorderRadius.small,
      borderBottomLeftRadius: BaseStyles.BorderRadius.small,
      borderWidth: 1,
      borderColor: colors.lightGray,
    },
    unselectedRightButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.transparent,
      padding: BaseStyles.MarginPadding.mediumConst,
      width: BaseStyles.ContentWidth.half,
      borderTopRightRadius: BaseStyles.BorderRadius.small,
      borderBottomRightRadius: BaseStyles.BorderRadius.small,
      borderWidth: 1,
      borderColor: colors.lightGray,
    },
    unselectedText:{
      color: colors.lightGray, 
      fontSize: BaseStyles.FontTheme.reg,
      alignSelf: 'center',
    }
  });
}