import { AppState } from "../../../state/types";
import { connect } from "react-redux";
import { toggleMenu, showGoBackButton, switchDropdownNavbar, updateSelectedPage } from '../../../state/header/actions';
import HomePairsHeaderBase from "./HomePairsHeaderBase";

function mapStateToProps(state: AppState){ 
  return {
    header: state.header,
  }
};

const mapDispatchToProps = dispatch => ({
  onToggleMenu: (showMenu:boolean) => {
      dispatch(toggleMenu(showMenu));
  },
  onShowGoBackbutton: (showBackButton: boolean) => {
      dispatch(showGoBackButton(showBackButton));
  },
  onSwitchNavBar: (switchNavBar: boolean) => {
    dispatch(switchDropdownNavbar(switchNavBar))
  },
  onUpdateSelected: (selected: number) => {
    dispatch(showGoBackButton(false))
    dispatch(updateSelectedPage(selected))
  }
});
  
const HomePairsHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePairsHeaderBase);
export default HomePairsHeader;