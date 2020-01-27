import { AppState, MainAppStackType } from 'homepairs-types';
import { connect } from 'react-redux';
import {
    withSceneHeader,
    withDarkMode,
    withModal,
    AddNewPropertyModal,
} from 'homepairs-components';
import { HeaderActions, PropertyListActions } from 'homepairs-redux-actions';
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
        propertyState: state.propertyList,
        header: state.header,
    };
}
const mapDispatchToProps: (
    dispatch: any
) => PropertiesScreenDispatchProps = dispatch => ({
    onRevealGoBack: (showBackButton: boolean) => {
        dispatch(HeaderActions.showGoBackButton(showBackButton));
    },
    onSelectProperty: (selectedPropertyIndex: number) => {
        dispatch(PropertyListActions.setSelectedProperty(selectedPropertyIndex));
    },
});

const PropertiesScreen = connect(
    mapStateToProps,
    mapDispatchToProps,
)(PropertiesScreenBase);

export default withDarkMode(
    withModal(
        withSceneHeader(PropertiesScreen, sceneParams),
        AddNewPropertyModal,
    ),
);
