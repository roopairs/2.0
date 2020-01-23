import React, { ReactElement } from "react";
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet
} from "react-native";
import {Card} from 'homepair-elements';

export type LoadingModalProps = {
  children?: ReactElement[] | ReactElement;
  containerStyle?: {};
  wrapperStyle?: {};
};

export function LoadingModal(props: LoadingModalProps) {
  return (
    <Card
      containerStyle={styles.loadingCardContents}
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
