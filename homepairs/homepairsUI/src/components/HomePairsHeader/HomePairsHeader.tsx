import { AppState, MainAppStackType } from "homepairs-types";
import { connect } from "react-redux";
import { HeaderActions, SessionActions, onGoBack } from 'homepairs-redux-actions';
import {prepareNavigationHandlerComponent} from 'homepairs-routes';
import HomePairsHeaderBase , { HomePairsHeaderStateProps, HomePairsHeaderDispatchProps } from "./HomePairsHeaderBase";

function mapStateToProps(state: AppState): HomePairsHeaderStateProps{ 
  return {
    header: state.header,
    accountType: state.accountProfile.accountType,
  };
};

const mapDispatchToProps: (dispatch:any) => HomePairsHeaderDispatchProps = dispatch => ({
  onToggleMenu: (showMenu:boolean) => {
      dispatch(HeaderActions.toggleMenu(showMenu));
  },
  onShowGoBackbutton: (showBackButton: boolean) => {
      dispatch(HeaderActions.showGoBackButton(showBackButton));
  },
  onSwitchNavBar: (switchNavBar: boolean) => {
    dispatch(HeaderActions.switchDropdownNavbar(switchNavBar));
  },
  onUpdateSelected: (selected: MainAppStackType) => {
    dispatch(HeaderActions.showGoBackButton(false));
    dispatch(HeaderActions.updateSelectedPage(selected));
  },
  onLogOut: (authed:boolean) => {
    dispatch(SessionActions.setAccountAuthenticationState(authed));
  },
  onClickBackButton: () => {
    dispatch(onGoBack());
  },
});

const HomePairsHeader = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePairsHeaderBase);

/**
 * ---------------------------------------------------
 * HomePairs Navigation Header
 * ---------------------------------------------------
 * A fully functional navigation header that is rendered based on the size of the 
 * encapsulating window. It connects to the redux store to maintain a state of how 
 * to render itself. It can present itself as navigation bar or a navigation 
 * drop down menu. This is intended to be used on the Main App Stack of a react-native
 * navigators although, it should be able to be rendered in all other components 
 * provided it is able to invoke the proper dispatch actions from the store.
 * 
 * Children Components: 
 *  HomePairsHeaderBase
 *  HomePairsHeaderMenu
 *  HomePairsTitle
 */
export default prepareNavigationHandlerComponent(HomePairsHeader);
