import { AppState, MainAppStackType } from 'homepair-types';
import { connect } from "react-redux";
import { AccountActions } from 'homepair-redux-actions';
import AccountScreenBase from './AccountScreenBase';
import { AccountScreenStateProps, AccountScreenDispatchProps } from './AccountScreenBase';
import { withSceneHeader, withDarkMode} from 'homepair-components'
import React from 'react'
import { withNavigation } from 'react-navigation';

const sceneParam : MainAppStackType = {  
    title: 'Account Settings',
    navigate: 'Account',
    key: 'AccountSettings',
}

function mapStateToProps(state: AppState) : AccountScreenStateProps {
    return { accountProfile: state.accountProfile}
};
  
const mapDispatchToProps : (dispatch:any) => AccountScreenDispatchProps = (dispatch : any) => ({
    onConnectRoopairsAccount: () => {
        //TODO: Add action to connect to Roopairs api
    },
    onDisconnectRoopairsAccount: () => {
        //TODO: Add action for when disconnecting Roopairs Account 
    }
});

const AccountScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountScreenBase);

export default withDarkMode(withNavigation(withSceneHeader(AccountScreen, sceneParam)));