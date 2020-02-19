import React from 'react';
import { AccountTypes } from 'homepairs-types';
import strings from 'homepairs-strings';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import * as BaseStyles from 'homepairs-base-styles';
import { DarkModeInjectedProps } from '../WithDarkMode/WithDarkMode';

export type AccountTypeRadioProps = DarkModeInjectedProps & {
  name?: String,
  parentCallBack? : (childData : AccountTypes) => any, // Define a funtion with parameters
  resetForms?: any,
}

type AccountTypeRadioState = {
  propertyManagerSelected : boolean
}

const accountRadioStrings = strings.signUpPage.accountTypeRadioButton;

function setStyle(colorTheme: BaseStyles.ColorTheme){
  const colors = (colorTheme == null) ? BaseStyles.LightColorTheme : colorTheme;
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
      color: colors.lightGray,
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
      height: 40,
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
      height: 40,
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
      height: 40,
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
      height: 40,
    },
    unselectedText:{
      color: colors.lightGray, 
      fontSize: BaseStyles.FontTheme.reg,
      alignSelf: 'center',
    },
  });
}

export default class AccountTypeRadioButton extends React.Component<AccountTypeRadioProps, AccountTypeRadioState> {
  static defaultProps: { 
    name: AccountTypes; 
    parentCallBack: (childData: AccountTypes) => void; 
    primaryColorTheme: BaseStyles.ColorTheme;
    resetForms: any;
  };

  constructor(props: Readonly<AccountTypeRadioProps>) {
    super(props);
    this.onPressPropertyManager = this.onPressPropertyManager.bind(this);
    this.onPressTenant = this.onPressTenant.bind(this);

    this.state = { propertyManagerSelected : false};
    props.parentCallBack(AccountTypes.Tenant);
  }

  onPressPropertyManager() {
    const {parentCallBack, resetForms} = this.props;
    resetForms();
    this.setState({ propertyManagerSelected : true });
    parentCallBack(AccountTypes.PropertyManager);
  }

  onPressTenant() {
    const {parentCallBack, resetForms} = this.props;
    resetForms();
    this.setState({ propertyManagerSelected : false });
    parentCallBack(AccountTypes.Tenant);
  }


  renderName(style){
    const {name} = this.props;
    return name == null ? <></> : <View style={style.titleContainer}>
    <Text style={style.title}>
      {accountRadioStrings.name}
      </Text>
   </View>;
  }

 render() {
   const {primaryColorTheme} = this.props;
   const {propertyManagerSelected} = this.state;
   const style = setStyle(primaryColorTheme);
   const leftButtonStyle = propertyManagerSelected ? style.unselectedLeftButton : style.selectedLeftButton;
   const rightButtonStyle = propertyManagerSelected ? style.selectedRightButton : style.unselectedRightButton;
   return (
     <>
     {this.renderName(style)}
      <View style={style.buttonContainer}>
        <TouchableOpacity
          style={leftButtonStyle}
          onPress={this.onPressTenant}>
          <Text style={propertyManagerSelected ? 
            style.unselectedText : style.selectedText}>
              {accountRadioStrings.tenant}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={rightButtonStyle}
          onPress={this.onPressPropertyManager}>
          <Text style={propertyManagerSelected ? 
            style.selectedText : style.unselectedText }>
              {accountRadioStrings.propertyManager}
          </Text>
        </TouchableOpacity>
        </View>
      </>
    );
  }
}

/** VSCode does not recognize this notation. This works for setting default props in a class */
AccountTypeRadioButton.defaultProps = {
  name: AccountTypes.Tenant,
  parentCallBack: (childData : AccountTypes) => {return childData;}, 
  resetForms: null,
  primaryColorTheme: BaseStyles.LightColorTheme,
};