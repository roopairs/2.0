import { AppState } from "../../../../state/types";
import { updateProperty } from "../../../../state/property-list/actions";
import { connect } from "react-redux";
import DetailedPropertyScreenBase from './DetailedPropertyScreenBase';

//NOTE: THIS COMPONENT ISN'T CALLING ITS CONNECT FUNCTION FOR SOME REASON!!

function mapStateToProps (state: AppState) {
    return { properties: state.propertyList,}
};
  
const mapDispatchToProps = dispatch => ({
    onUpdateProperty: (index : number, address: string, tenants: number, bedrooms:number, bathrooms:number) => {
        dispatch(updateProperty(index, address, tenants, bedrooms, bathrooms));
    },
});

const DetailedPropertyScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailedPropertyScreenBase);

export default DetailedPropertyScreen;