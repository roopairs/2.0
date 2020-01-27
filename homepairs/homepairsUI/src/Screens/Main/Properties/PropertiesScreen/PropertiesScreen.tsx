import { AppState, MainAppStackType } from 'homepair-types';
import { connect } from 'react-redux';
import {
    withSceneHeader,
    withDarkMode,
    withModal,
    AddNewPropertyModal,
} from 'homepair-components';
import { HeaderActions } from 'homepair-redux-actions';
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
        properties: state.propertyList,
        header: state.header,
    };
}
const mapDispatchToProps: (
    dispatch: any
) => PropertiesScreenDispatchProps = dispatch => ({
    onRevealGoBack: (showBackButton: boolean) => {
        dispatch(HeaderActions.showGoBackButton(showBackButton));
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
