import { connect } from "react-redux";
import { Account, AccountTypes, TenantAccount } from "homepairs-types";
import strings from "homepairs-strings";
import {LightColorTheme} from "homepairs-base-styles";
import {NavigationRouteHandler,  prepareNavigationHandlerComponent } from 'src/routes';
import { generateAccountForPM, generateAccountForTenant, fetchGoogleApiKey } from 'homepairs-endpoints';
import { SignUpScreenBase, SignUpViewDispatchProps } from "./SignUpScreenBase";
import {
  AuthPassProps,
  withAuthPage,
} from '../AuthPage/WithAuthPage';


const signUpStrings = strings.signUpPage;
const authPageParam: AuthPassProps = {
  button: signUpStrings.button,
  subtitle: signUpStrings.subtitle,
  loadingModalText: signUpStrings.modal,
  buttonColor: LightColorTheme.primary,
  underButtonText: signUpStrings.currentUserText,
  highlightedText: signUpStrings.signUpHighlight,
};
const mapDispatchToProps : (dispatch: any) => SignUpViewDispatchProps = (dispatch: any) => ({
    generateHomePairsAccount: (
      details: Account, 
      password: String, 
      modalSetOff: () => any,
      navigation?: NavigationRouteHandler,
      displayError?: (msg: string) => any) => {
        dispatch(fetchGoogleApiKey());
        if (details.accountType === AccountTypes.PropertyManager) {
            dispatch(generateAccountForPM(details, password, navigation, modalSetOff, displayError));
        } else {
            dispatch(generateAccountForTenant((details as TenantAccount), password, navigation, modalSetOff));
        }
    },
});


const SignUpScreen = connect(null, mapDispatchToProps)(SignUpScreenBase);
const NavigableAuthPage = prepareNavigationHandlerComponent(SignUpScreen);
const AuthPage = withAuthPage(NavigableAuthPage, authPageParam);
export default AuthPage;
