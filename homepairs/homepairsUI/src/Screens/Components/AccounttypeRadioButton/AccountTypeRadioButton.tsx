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
import { isNullOrUndefined } from 'src/utility/ParameterChecker';

export type AccountTypeRadioProps = {
  name?: String,
  parentCallBack? : (childData : AccountTypes) => any, // Define a funtion with parameters
  resetForms?: any,
}

type AccountTypeRadioState = {
  landLordSelected : boolean
}

const accountRadioStrings = strings.signUpPage.accountTypeRadioButton;

function setStyle(colorTheme: BaseStyles.ColorTheme){
  const colors = isNullOrUndefined(colorTheme) ? BaseStyles.LightColorTheme : colorTheme;
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
    this.onPressLandLord = this.onPressLandLord.bind(this);
    this.onPressTenant = this.onPressTenant.bind(this);
    this.state = { landLordSelected : false};
    props.parentCallBack(AccountTypes.Tenant);
  }

  onPressLandLord() {
    const {parentCallBack, resetForms} = this.props;
    resetForms();
    this.setState({ landLordSelected : true });
    parentCallBack(AccountTypes.Landlord);
  }

  onPressTenant() {
    const {parentCallBack, resetForms} = this.props;
    resetForms();
    this.setState({ landLordSelected : false });
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
   const {landLordSelected} = this.state;
   const style = setStyle(null);

   const leftButtonStyle = landLordSelected ? style.unselectedLeftButton : style.selectedLeftButton;
   const rightButtonStyle = landLordSelected ? style.selectedRightButton : style.unselectedRightButton;
   return (
     <>
     {this.renderName(style)}
      <View style={style.buttonContainer}>
        <TouchableOpacity
          style={leftButtonStyle}
          onPress={this.onPressTenant}>
          <Text style={landLordSelected ? 
            style.unselectedText : style.selectedText}>
              {accountRadioStrings.tenant}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={rightButtonStyle}
          onPress={this.onPressLandLord}>
          <Text style={landLordSelected ? 
            style.selectedText : style.unselectedText }>
              {accountRadioStrings.landlord}
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