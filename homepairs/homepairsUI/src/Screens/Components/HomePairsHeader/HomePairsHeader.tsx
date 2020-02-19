import { AppState, MainAppStackType } from "homepairs-types";
import { connect } from "react-redux";
import { HeaderActions } from 'homepairs-redux-actions';
import { withNavigation } from "react-navigation";
import HomePairsHeaderBase , { HomePairsHeaderStateProps, HomePairsHeaderDispatchProps } from "./HomePairsHeaderBase";
import { withDarkMode } from '../WithDarkMode/WithDarkMode';

function mapStateToProps(state: AppState): HomePairsHeaderStateProps{ 
  return {
    header: state.header,
    isDarkModeActive: state.settings.isDarkModeActive,
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
});

const HomePairsHeader = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePairsHeaderBase);

export default withNavigation(HomePairsHeader);
