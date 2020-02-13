import { AppState, MainAppStackType } from 'homepairs-types';
import { connect } from 'react-redux';
import {
    withSceneHeader,
    withModal,
    AddNewPropertyModal,
} from 'homepairs-components';
import { HeaderActions, PropertyListActions } from 'homepairs-redux-actions';
import { withNavigation } from 'react-navigation';
import PropertiesScreenBase, {
    PropertiesScreenStateProps,
    PropertiesScreenDispatchProps,
} from './PropertiesScreenBase';

const sceneParams: MainAppStackType = {
    title: 'Properties',
    navigate: 'AccountProperties',
    key: 'Properties',
    button: 'Add Property',
    doesButtonUseNavigate: false,
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

const PropertiesScreen = connect(
    mapStateToProps,
    mapDispatchToProps,
)(PropertiesScreenBase);

const PropertiesScreenWithNavigation = withNavigation(PropertiesScreen);
const PropertiesScreenWithHeader = withSceneHeader(PropertiesScreenWithNavigation, sceneParams);

/**
 * ---------------------------------------------------
 * PropertiesScreen
 * ---------------------------------------------------
 * This is intended to be used in the Main Navigation Stack. This component is connected to the 
 * HomePairs redux store, the react-native Navigator, and our very own withSceneHeader HOC. It also 
 * has been injected with a Modal; this gives this component the capability to reveal a smaller page 
 * that allows the user to add a new property to their account. 
 */
const PropertiesScreenWithModal = withModal(PropertiesScreenWithHeader, AddNewPropertyModal);

export default PropertiesScreenWithModal;
