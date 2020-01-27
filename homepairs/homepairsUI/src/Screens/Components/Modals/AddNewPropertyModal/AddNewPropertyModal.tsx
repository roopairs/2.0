<<<<<<< HEAD
import React from 'react';
import { connect } from "react-redux";
import { PropertyListActions } from 'homepair-redux-actions';
import AddNewPropertyModalBase, {AddNewPropertyDispatchProps} from './AddNewPropertyModalBase';
import { Property, AppState } from 'src/state/types';
=======
import {ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import { Card } from "homepair-elements";
import { HomePairsDimensions } from "homepair-types";
import { ModalInjectedProps } from "../WithModal/WithModal";
>>>>>>> 6c0abe500170f7c4f80d6b59e196169385a97584


<<<<<<< HEAD
const mapDispatchToProps : (dispatch: any) => AddNewPropertyDispatchProps = (dispatch: any) => ({
    onCreateProperty: (newProperty: Property, email: string, setInitialState: () => void, onChangeModalVisiblity: (check: boolean) => void) => {
        dispatch(PropertyListActions.postNewProperty(newProperty, email, setInitialState, onChangeModalVisiblity))
    }
});

function mapStateToProps(state: AppState) : any {
    return {email: state.accountProfile.email};
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps)(AddNewPropertyModalBase);
=======
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginHorizontal: "5%",
    borderRadius: 7,
    shadowColor: "black",
    shadowRadius: 20,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 100,
    elevation: 9,
    maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
    width: '100%',
    alignSelf: 'center',
  },
});

export default function AddNewPropertyModal(props:Props){
  // TODO: Handle the logic of adding a new Property to a HomePairs Account
    const {onChangeModalVisibility} = props;
    return (
      <Card
        showCloseButton
        title="New Property"
        closeButtonPressedCallBack={() =>
          onChangeModalVisibility(false)
        }
        containerStyle={styles.container}
      >
        <ActivityIndicator />
      </Card>
    );
  }
>>>>>>> 6c0abe500170f7c4f80d6b59e196169385a97584

