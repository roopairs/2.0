import { connect } from "react-redux";
import SignUpScreenBase from './SignUpScreenBase';
import { AccountActions } from 'homepair-redux-actions';
import { SignUpViewDispatchProps } from './SignUpScreenBase';
import { Account } from "homepair-types";
import strings from 'homepair-strings';
import { AuthPassProps, withAuthPage, withDarkMode } from "homepair-components";

const signUpStrings = strings.signUpPage
const authPageParam : AuthPassProps  = {
    button: signUpStrings.button,
    subtitle: signUpStrings.subtitle,
    loadingModalText: signUpStrings.modal,
    underButtonText: signUpStrings.currentUserText,
    highlightedText: signUpStrings.signUpHighlight,
}
const mapDispatchToProps : (dispatch: any) => SignUpViewDispatchProps = (dispatch: any) => ({
    //TODO: Finish sign up when backend is ready 
    generateHomePairsAccount: (details: Account, password: String) => {
        //TODO: Remember to Call dispatch when sign up is ready in backend
        AccountActions.generateAccount(details, password)
    },
});

const SignUpScreen = connect(
    null, 
    mapDispatchToProps)(SignUpScreenBase);
export default withDarkMode(withAuthPage(SignUpScreen, authPageParam));