import { StyleSheet } from "react-native";
import React, { Component } from "react";
import { Card } from "src/Elements/Elements";
import { ModalInjectedProps } from "./WithModal";
import { HomePairsDimensions } from "homepair-types";

type Props = ModalInjectedProps;
type State = {};

export class AddNewPropertyModal extends React.Component<Props, State> {
  //TODO: Handle the logic of adding a new Property to a HomePairs Account

  constructor(props: Readonly<Props>) {
    super(props);
  }

  render() {
    return (
      <Card
        showCloseButton={true}
        title="New Property"
        closeButtonPressedCallBack={() =>
          this.props._onChangeModalVisibility(false)
        }
        containerStyle={styles.container}
      >
      </Card>
    );
  }
}

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
  }
});
