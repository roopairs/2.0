import { AppState, MainAppStackType } from 'homepairs-types';
import { connect } from 'react-redux';
import { HeaderActions, PropertyListActions} from 'homepairs-redux-actions';
import { navigationPages} from 'src/routes';
import { 
    PropertiesScreenBase,
    PropertiesScreenStateProps,
    PropertiesScreenDispatchProps,
} from './PropertiesScreenBase';

function mapStateToProps(state: AppState): PropertiesScreenStateProps {
    return {
        propertyState: state.properties,
        header: state.header,
        apiKey: state.settings.apiKey,
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
    onSelectProperty: (selectedPropertyId: string) => {
        dispatch(PropertyListActions.setSelectedProperty(selectedPropertyId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesScreenBase);