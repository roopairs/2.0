import { connect } from "react-redux";
import strings from "homepairs-strings";
import HomePairColors from "res/colors";
import { fetchAccount, fetchGoogleApiKey } from 'homepairs-endpoints';
import {NavigationRouteHandler, prepareNavigationHandlerComponent } from 'src/routes';
import { LoginScreenBase, LoginViewDispatchProps } from "./LoginScreenBase";
import {
  AuthPassProps,
  withAuthPage,
} from '../AuthPage/WithAuthPage';
import withAndroidBackHandler from '../../WithBackHandler';

const signInStrings = strings.signInPage;
const authPageParam: AuthPassProps = {
  button: signInStrings.button,
  subtitle: signInStrings.subtitle,
  buttonColor: HomePairColors.LightModeColors.blueButton,
  loadingModalText: signInStrings.modal,
  underButtonText: signInStrings.newUserText,
  highlightedText: signInStrings.signUpHighlight,
};

const mapDispatchToProps : (dispatch: any) => LoginViewDispatchProps = (dispatch: any) => ({
    onFetchAccount: async (username: string, password: string, 
        modalSetOff: (error?:string) => any, navigation: NavigationRouteHandler) => {
        dispatch(fetchGoogleApiKey());
        await dispatch(fetchAccount(username, password, navigation, modalSetOff));
    },
});

/* * Inject the HOCs for the base login screen * */
const LoginScreen = connect(null, mapDispatchToProps)(LoginScreenBase);
const NavigateReadyLoginScreen = prepareNavigationHandlerComponent(LoginScreen);

/* * Now that the Base is prepared, wrap the base to get a complete Homepairs AuthScreen * */
const AuthPage = withAuthPage(NavigateReadyLoginScreen, authPageParam);

export default AuthPage;
