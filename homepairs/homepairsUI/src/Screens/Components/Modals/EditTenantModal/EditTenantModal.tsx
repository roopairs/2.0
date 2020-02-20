import { connect } from "react-redux";
import { PropertyListActions } from 'homepairs-redux-actions';
import { NavigationStackProp } from 'react-navigation-stack';
import { withNavigation } from "react-navigation";
import EditTenantModalBase, {EditTenantDispatchProps} from './EditTenantModalBase';
import { TenantInfo } from 'src/state/types';

const mapDispatchToProps : (dispatch: any) => EditTenantDispatchProps = (dispatch: any) => ({
    onEditTenantInfo: (propertyId: number, info: TenantInfo, navigation: NavigationStackProp) => {
        dispatch(PropertyListActions.updateTenantInfo(propertyId, info, navigation));
    },
});



export default withNavigation(connect(
    null, 
    mapDispatchToProps)(EditTenantModalBase));