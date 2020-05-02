import React, { ReactElement } from "react";
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
} from "react-native";
import {Card} from 'homepairs-elements';

export type LoadingModalProps = {
  children?: ReactElement[] | ReactElement;
};

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
    borderRadius: 10,
  },
});

/**
 * ------------------------------------------------------------
 * Loading Modal
 * ------------------------------------------------------------
 * A card component that should be navigated to when assets, requests,
 * and async awaits are being loaded/invoked. It is capable of taking in 
 * children to show messages about the status of what is invoked.
 * @param {LoadingModalProps} props 
 */
export function LoadingModal(props: LoadingModalProps) {
  const {children} = props;
  return (
    <Card
      containerStyle={styles.loadingCardContents}
      wrapperStyle={{ alignItems: "center" }}
    >
      <ActivityIndicator />
      <StatusBar barStyle="default" />
      <>{children}</>
    </Card>
  );
}
