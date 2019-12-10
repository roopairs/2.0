import { connect } from "react-redux";
import LoginScreenBase from './LoginScreenBase';
import { fetchAccount } from '../../../state/account/actions';

const mapDispatchToProps = dispatch => ({
    onFetchAccountProfile: (username: string, password: string, modalSetOff: () => any, navigationRouteCallback: () => any) => {
        dispatch(fetchAccount(username, password, modalSetOff, navigationRouteCallback));
    },
});

const LoginScreen = connect(
    null, 
    mapDispatchToProps)(LoginScreenBase);
export default LoginScreen;