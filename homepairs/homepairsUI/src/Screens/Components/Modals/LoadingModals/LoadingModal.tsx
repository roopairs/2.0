import React, { ReactElement } from "react";
import { ActivityIndicator, StatusBar, Modal } from "react-native";
import {Card} from "src/Elements/Elements";
import { StyleSheet } from "react-native";
import { ModalInjectedProps } from "../../index";

type Props = ModalInjectedProps & {
  children?: ReactElement[] | ReactElement;
  cardStyle?: any
};

export function LoadingModal(props: Props) {
  let style = typeof props.cardStyle === 'undefined' ? styles : props.cardStyle
  return (
    <Card
      containerStyle={style.loadingCardContents}
      wrapperStyle={{ alignItems: "center" }}
    >
      <ActivityIndicator />
      <StatusBar barStyle="default" />
      <>{props.children}</>
    </Card>
  );
}


const styles = StyleSheet.create({
  loadingCardContents: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    maxHeight: 100,
    width: "75%",
    maxWidth: 350,
    shadowColor: "#aaa",
    shadowRadius: 10,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 200,
    elevation: 9,
    borderRadius: 10
  }
});
