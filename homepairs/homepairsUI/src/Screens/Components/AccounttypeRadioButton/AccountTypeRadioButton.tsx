/* eslint-disable react/static-property-placement */
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


export type AccountTypeRadioProps = {
  /**
   * Used to find this component when testing.
   */
  testID?: String,

  /**
   * Function that invokes when an option has been selected. This is intended to 
   * tell the parent which AccountType has been selected.
   */
  parentCallBack?: (childData : AccountTypes) => any, 

  /**
   * Callback function that is intended to remove user input of the forms of sibling 
   * components. This should only be used when switching between 
   */
  resetForms?: (resetform?:boolean, ...others:any[] ) => any,
}

type AccountTypeRadioState = {
  landLordSelected : boolean
}

const accountRadioStrings = strings.signUpPage.accountTypeRadioButton;
const colors = BaseStyles.LightColorTheme;

const styles = StyleSheet.create({
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

/**
 * ---------------------------------------------------
 * Account Type Radio Button
 * ---------------------------------------------------
 * A simple component that permits the user to select between a Tenant or 
 * Landlord account. It contains an optional name prop if a title is needed 
 * for this component.   
 */
export default class AccountTypeRadioButton extends React.Component<AccountTypeRadioProps, AccountTypeRadioState> {
  static defaultProps: AccountTypeRadioProps = {
    testID: null,
    parentCallBack: (childData : AccountTypes) => {return childData;}, 
    resetForms: () => {},
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

 render() {
   const {landLordSelected} = this.state;

   const leftButtonStyle = landLordSelected ? styles.unselectedLeftButton : styles.selectedLeftButton;
   const rightButtonStyle = landLordSelected ? styles.selectedRightButton : styles.unselectedRightButton;
   return (
     <>
     <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {accountRadioStrings.name}
        </Text>
    </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          testID='account-radio-tenant'
          style={leftButtonStyle}
          onPress={this.onPressTenant}>
          <Text style={landLordSelected ? 
            styles.unselectedText : styles.selectedText}>
              {accountRadioStrings.tenant}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID='account-radio-landlord'
          style={rightButtonStyle}
          onPress={this.onPressLandLord}>
          <Text style={landLordSelected ? 
            styles.selectedText : styles.unselectedText }>
              {accountRadioStrings.landlord}
          </Text>
        </TouchableOpacity>
        </View>
      </>
    );
  }
}