import { connect } from "react-redux";
import { AccountActions } from 'homepair-redux-actions';
<<<<<<< HEAD
import {withAuthPage, AuthPassProps, withDarkMode } from 'homepair-components'
import strings from 'homepair-strings'
=======
import {withAuthPage, AuthPassProps, withDarkMode } from 'homepair-components';
import strings from 'homepair-strings';
>>>>>>> 6c0abe500170f7c4f80d6b59e196169385a97584
import HomePairColors from 'res/colors';
import LoginScreenBase, { LoginViewDispatchProps } from './LoginScreenBase';


const signInStrings = strings.signInPage;
const authPageParam : AuthPassProps  = {
    button: signInStrings.button,
    subtitle: signInStrings.subtitle,
    buttonColor: HomePairColors.LightModeColors.blueButton,
    loadingModalText: signInStrings.modal,
    underButtonText: signInStrings.newUserText,
    highlightedText: signInStrings.signUpHighlight,
};
const mapDispatchToProps : (dispatch: any) => LoginViewDispatchProps = (dispatch: any) => ({
    onFetchAccountProfile: (username: string, password: string, 
        modalSetOff: () => any, navigationRouteCallback: () => any) => {
        dispatch(AccountActions.fetchAccount(username, password, modalSetOff, navigationRouteCallback));
    },
});

const LoginScreen = connect(
    null, 
    mapDispatchToProps)(LoginScreenBase);
const AuthPage = withAuthPage(LoginScreen, authPageParam);
export default withDarkMode(AuthPage);