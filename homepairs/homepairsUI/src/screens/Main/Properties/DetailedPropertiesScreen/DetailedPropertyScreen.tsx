import { AppState, MainAppStackType } from 'homepairs-types';
import { updateSelectedPage} from 'homepairs-redux-actions';
import { connect } from 'react-redux';
import { prepareNavigationHandlerComponent, PROPERTY } from 'homepairs-routes';
import {
    DetailedPropertyScreenBase,
    DetailedPropertyStateProps,
    DetailedPropertyScreenDispatchProps,
} from './DetailedPropertyScreenBase';

function mapStateToProps(state: AppState): DetailedPropertyStateProps {
    const {properties} = state;
    return { 
        properties: properties.properties,
        token: state.accountProfile.roopairsToken,
    };
}

const mapDispatchToProps: (dispatch:any) => DetailedPropertyScreenDispatchProps = dispatch => ({
    onUpdateHeader: () => {
      const selected: MainAppStackType = {
          title: 'Detailed Property',
          navigate: PROPERTY,
          key: 'My Properties',
      };
      dispatch(updateSelectedPage(selected));
    },
});

const DetailedPropertyScreen = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DetailedPropertyScreenBase);
export default prepareNavigationHandlerComponent(DetailedPropertyScreen);
