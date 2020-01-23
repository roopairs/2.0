import { connect } from "react-redux";
import LoginScreenBase from './LoginScreenBase';
import { AccountActions } from 'homepair-redux-actions';
import { LoginViewDispatchProps } from './LoginScreenBase';
import {withAuthPage, AuthPassProps, withDarkMode, withModal, LoginLoadingModal } from 'homepair-components'
import strings from 'homepair-strings'
import HomePairColors from 'res/colors';
import { withNavigation } from "react-navigation";

const signInStrings = strings.signInPage
const authPageParam : AuthPassProps  = {
    button: signInStrings.button,
    subtitle: signInStrings.subtitle,
    buttonColor: HomePairColors.LightModeColors.blueButton,
    underButtonText: signInStrings.newUserText,
    highlightedText: signInStrings.signUpHighlight,
}
const mapDispatchToProps : (dispatch: any) => LoginViewDispatchProps = (dispatch: any) => ({
    onFetchAccountProfile: (username: string, password: string, 
        modalSetOff: () => any, navigationRouteCallback: () => any) => {
        dispatch(AccountActions.fetchAccount(username, password, modalSetOff, navigationRouteCallback));
    },
});

const LoginScreen = connect(
    null, 
    mapDispatchToProps)(LoginScreenBase);
const AuthPage = withModal(withAuthPage(withNavigation(LoginScreen), authPageParam), LoginLoadingModal);
export default withDarkMode(AuthPage)