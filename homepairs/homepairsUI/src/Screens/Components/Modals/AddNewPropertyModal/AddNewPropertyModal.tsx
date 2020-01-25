import {ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import { Card } from "homepair-elements";
import { HomePairsDimensions } from "homepair-types";
import { ModalInjectedProps } from "../WithModal/WithModal";

type Props = ModalInjectedProps;
type State = {};

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

