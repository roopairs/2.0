import { connect } from "react-redux";
import { AccountActions } from "homepairs-redux-actions";
import { Account, AccountTypes } from "homepairs-types";
import strings from "homepairs-strings";
import {
  AuthPassProps,
  withAuthPage,
} from "homepairs-components";
import HomePairColors from "res/colors";
import { NavigationSwitchProp } from 'react-navigation';
import SignUpScreenBase, { SignUpViewDispatchProps } from "./SignUpScreenBase";


const signUpStrings = strings.signUpPage;
const authPageParam: AuthPassProps = {
  button: signUpStrings.button,
  subtitle: signUpStrings.subtitle,
  loadingModalText: signUpStrings.modal,
  buttonColor: HomePairColors.LightModeColors.blueButton,
  underButtonText: signUpStrings.currentUserText,
  highlightedText: signUpStrings.signUpHighlight,
};
const mapDispatchToProps : (dispatch: any) => SignUpViewDispatchProps = (dispatch: any) => ({
    // TODO: Finish sign up when backend is ready 
    generateHomePairsAccount: (details: Account, password: String, modalSetOff: () => any, navigation: NavigationSwitchProp) => {
        // TODO: Remember to Call dispatch when sign up is ready in backend
        if (details.accountType === AccountTypes.PropertyManager) {
            dispatch(AccountActions.generateAccountForPM(details, password, navigation, modalSetOff));
        } else {
            dispatch(AccountActions.generateAccountForTenant(details, password, navigation, modalSetOff));
        }
    },
});

const SignUpScreen = connect(null, mapDispatchToProps)(SignUpScreenBase);

const AuthPage = withAuthPage(SignUpScreen, authPageParam);
export default AuthPage;
