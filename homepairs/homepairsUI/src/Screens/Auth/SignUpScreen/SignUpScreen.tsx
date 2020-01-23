import { connect } from "react-redux";
import SignUpScreenBase from './SignUpScreenBase';
import { AccountActions } from 'homepair-redux-actions';
import { SignUpViewDispatchProps } from './SignUpScreenBase';
import { Account, AccountTypes } from "homepair-types";
import strings from 'homepair-strings';
import { AuthPassProps, withAuthPage, withDarkMode } from "homepair-components";
import HomePairColors from 'homepair-colors';

const signUpStrings = strings.signUpPage
const authPageParam : AuthPassProps  = {
    button: signUpStrings.button,
    subtitle: signUpStrings.subtitle,
    loadingModalText: signUpStrings.modal,
    buttonColor: HomePairColors.LightModeColors.blueButton,
    underButtonText: signUpStrings.currentUserText,
    highlightedText: signUpStrings.signUpHighlight,
}
const mapDispatchToProps : (dispatch: any) => SignUpViewDispatchProps = (dispatch: any) => ({
    //TODO: Finish sign up when backend is ready 
    generateHomePairsAccount: (details: Account, password: String, modalSetOff: () => any, navigation: any) => {
        //TODO: Remember to Call dispatch when sign up is ready in backend
        if (details.accountType === AccountTypes.Landlord) {
            dispatch(AccountActions.generateAccountForPM(details, password, navigation, modalSetOff));
        } else {
            dispatch(AccountActions.generateAccountForTenant(details, password, navigation, modalSetOff));
        }
    },
});

const SignUpScreen = connect(
    null, 
    mapDispatchToProps)(SignUpScreenBase);
export default withDarkMode(withAuthPage(SignUpScreen, authPageParam));