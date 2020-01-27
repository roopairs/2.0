import { AppState, Property } from 'homepairs-types';
import { PropertyListActions } from 'homepairs-redux-actions';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import DetailedPropertyScreenBase, {
    DetailedPropertyStateProps,
    DetailedPropertyDispatchProps,
} from './DetailedPropertyScreenBase';

function mapStateToProps(state: AppState): DetailedPropertyStateProps {
    return { 
        propertyIndex: state.propertyList.selectedPropertyIndex,
        property: state.propertyList.properties[state.propertyList.selectedPropertyIndex],
    };
}

const mapDispatchToProps: (
    dispath: any
) => DetailedPropertyDispatchProps = dispatch => ({
    onUpdateProperty: (
        index: number,
        updatedProperty: Property,
    ) => {
        dispatch(
            PropertyListActions.updateProperty(
                index,
                updatedProperty,
            ),
        );
    },
    onRemoveProperty: (_index: number) => {
        // TODO: Deal with removing properties
    },
});

const DetailedPropertyScreen = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DetailedPropertyScreenBase);

export default withNavigation(DetailedPropertyScreen);
