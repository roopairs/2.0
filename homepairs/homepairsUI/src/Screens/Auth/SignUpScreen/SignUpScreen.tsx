import { connect } from "react-redux";
import { AccountActions } from 'homepairs-redux-actions';
import { Account, AccountTypes } from "homepairs-types";
import strings from 'homepairs-strings';
import { AuthPassProps, withAuthPage, withDarkMode } from "homepairs-components";
import HomePairColors from 'homepairs-colors';
import SignUpScreenBase, { SignUpViewDispatchProps } from './SignUpScreenBase';


const signUpStrings = strings.signUpPage;
const authPageParam : AuthPassProps  = {
    button: signUpStrings.button,
    subtitle: signUpStrings.subtitle,
    loadingModalText: signUpStrings.modal,
    buttonColor: HomePairColors.LightModeColors.blueButton,
    underButtonText: signUpStrings.currentUserText,
    highlightedText: signUpStrings.signUpHighlight,
};
const mapDispatchToProps : (dispatch: any) => SignUpViewDispatchProps = (dispatch: any) => ({
    // TODO: Finish sign up when backend is ready 
    generateHomePairsAccount: (details: Account, password: String, modalSetOff: () => any, navigationRouteCallback: () => any) => {
        // TODO: Remember to Call dispatch when sign up is ready in backend
        if (details.accountType === AccountTypes.Landlord) {
            dispatch(AccountActions.generateAccountForPM(details, password, modalSetOff, navigationRouteCallback));
        } else {
            dispatch(AccountActions.generateAccountForTenant(details, password, modalSetOff, navigationRouteCallback));
        }
    },
});

const SignUpScreen = connect(
    null, 
    mapDispatchToProps)(SignUpScreenBase);
export default withDarkMode(withAuthPage(SignUpScreen, authPageParam));