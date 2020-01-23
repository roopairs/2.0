import { AppState } from "homepair-types";
import { PropertyListActions } from "homepair-redux-actions";
import { connect } from "react-redux";
import TenantPropertyScreenBase, { TenantPropertyStateProps} from './TenantPropertyScreenBase';
import { withNavigation } from "react-navigation";
import { withDarkMode } from 'homepair-components';

function mapStateToProps(state: AppState) : TenantPropertyStateProps {
    return { properties: state.propertyList,}
};
  
/*const mapDispatchToProps : (dispath: any) => TenantPropertyDispatchProps = 
(dispatch)=> ({
    onUpdateProperty: (index : number, address: string, tenants: number, bedrooms:number, bathrooms:number) => {
        dispatch(PropertyListActions.updateProperty(index, address, tenants, bedrooms, bathrooms));
    },
    onRemoveProperty: (index: number) => {
        //TODO: Deal with removing properties
    }
});*/

const DetailedPropertyScreen = connect(
  mapStateToProps,
  //mapDispatchToProps,
)(TenantPropertyScreenBase);

export default withDarkMode(withNavigation(DetailedPropertyScreen));