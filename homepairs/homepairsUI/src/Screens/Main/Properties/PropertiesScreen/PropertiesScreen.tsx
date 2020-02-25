import { AppState, MainAppStackType } from 'homepairs-types';
import { connect } from 'react-redux';
import {
    withSceneHeader,
} from 'homepairs-components';
import { HeaderActions, PropertyListActions } from 'homepairs-redux-actions';
import { withNavigation } from 'react-navigation';
import { navigationPages } from 'src/Routes/RouteConstants';
import { withNavigationRouteHandler } from 'src/utility/NavigationRouterHandler';
import { Platform } from 'react-native';
import { withRouter } from 'react-router-dom';
import PropertiesScreenBase, {
    PropertiesScreenStateProps,
    PropertiesScreenDispatchProps,
} from './PropertiesScreenBase';

const sceneParams: MainAppStackType = {
    title: 'Properties',
    navigate: 'AccountProperties',
    key: 'Properties',
    button: 'Add Property',
    onNavButtonClick: (props:any)=> {
        props.navigation.navigate(navigationPages.AddNewPropertyModal);
    },
    doesButtonUseNavigate: true,
};

function mapStateToProps(state: AppState): PropertiesScreenStateProps {
    return {
        propertyState: state.properties,
        header: state.header,
    };
}
const mapDispatchToProps: (
    dispatch: any
) => PropertiesScreenDispatchProps = dispatch => ({
    // Changes the header to render a back button 
    onRevealGoBack: (showBackButton: boolean) => {
        dispatch(HeaderActions.showGoBackButton(showBackButton));
    },
    // Sets the selectedProperty to the position of the value in the property[]
    onSelectProperty: (selectedPropertyIndex: number) => {
        dispatch(PropertyListActions.setSelectedProperty(selectedPropertyIndex));
    },
});


// First give the base a navigation object. It will not be recieving a navigation object from its parent so this set up is necessary 
const PropertiesScreen = connect(
    mapStateToProps,
    mapDispatchToProps,
)(PropertiesScreenBase);
const NavigablePropertiesScreen = withNavigationRouteHandler(PropertiesScreen);
const PropertiesScreenBaseWithNavigation = Platform.OS === 'web' ? withRouter(NavigablePropertiesScreen) : withNavigation(NavigablePropertiesScreen);


/**
 * ---------------------------------------------------
 * PropertiesScreen
 * ---------------------------------------------------
 * This is intended to be used in the Main Navigation Stack. This component is connected to the 
 * HomePairs redux store, the react-native Navigator, and our very own withSceneHeader HOC. It also 
 * has been injected with a Modal; this gives this component the capability to reveal a smaller page 
 * that allows the user to add a new property to their account. 
 */
const PropertiesScreenWithHeader = withNavigationRouteHandler(withSceneHeader(PropertiesScreenBaseWithNavigation, sceneParams));
const PropertiesScreenWithNavigation = Platform.OS === 'web' ? withRouter(PropertiesScreenWithHeader) : withNavigation(PropertiesScreenWithHeader);
export default PropertiesScreenWithNavigation;
