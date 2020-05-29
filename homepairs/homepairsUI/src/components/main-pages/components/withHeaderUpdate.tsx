import React from 'react';
import { MainAppStack, MainAppStackTenant, HOME_INDEX } from 'src/routes';
import {updateSelectedPage} from 'homepairs-redux-actions';
import { connect } from 'react-redux';
import { AppState, MainAppStackType, AccountTypes } from 'homepairs-types';


export type WithHeaderUpdateInjectedProps = {
    /**
     * Method that will update the header when the component is mounted.
     */
    onUpdateHeader: () => void;
} & any;

/**
 * -----------------------------------------------
 * withHeaderUpdate
 * -----------------------------------------------
 * 
 * A High Order Component that maps the component with the menu item in the 
 * homepairs header reducer.
 * 
 * @param {any} WrappedComponent - Page component attached to header
 * @param {number} pageIndex - Referenced value on the app page index. If the page does not have a 
 * proper mapping, set it to -1 so nothing is selected.
 * @param {boolean} withRef - Defines if the Connected Component should be accessed using react 
 * references. 
 */
export default function withHeaderUpdate(WrappedComponent: any, page: number | MainAppStackType = HOME_INDEX, withRef?: boolean){

    // Define the updateHeader function so the Smart Component can be returned 
    function mapStateToProps(state: AppState) {
        const {accountProfile} = state;
        return {
            accountType: accountProfile.accountType,
        };
    }

    const mapDispatchToProps = dispatch => ({
        onUpdateHeader: (selectedPage: MainAppStackType) => {
            dispatch(updateSelectedPage(selectedPage));
        },
    });

    class UpdateHeaderComponent extends React.Component<WithHeaderUpdateInjectedProps>{
        MainAppStack: MainAppStackType[];

        constructor(props: Readonly<WithHeaderUpdateInjectedProps>){
            super(props);
            this.MainAppStack = props.accountType === AccountTypes.PropertyManager ? MainAppStack : MainAppStackTenant;
        };

        componentDidMount(){
            const {onUpdateHeader} = this.props;
            let selectedPage: MainAppStackType = {title: '', navigate: ''};

            if(typeof page === 'object'){
                selectedPage = page;
            } else if (page !== -1){
                selectedPage = this.MainAppStack[page];
            }
            onUpdateHeader(selectedPage);
        };
        
        render(){
            return <WrappedComponent {...this.props}/>;
        };
    };

    return connect(mapStateToProps, mapDispatchToProps, null, {withRef})(UpdateHeaderComponent);
}