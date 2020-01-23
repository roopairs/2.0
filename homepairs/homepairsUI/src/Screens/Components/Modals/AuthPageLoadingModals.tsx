import React from "react";
import { Text, StyleSheet } from "react-native";
import { LoadingModal } from "./LoadingModals/LoadingModal";
import { FontTheme } from "homepair-base-styles";

export function LoginLoadingModal(props: any) {
  return (
    <LoadingModal {...props}>
      <Text style={styles.modalText}>Logging in...</Text>
    </LoadingModal>
  );
}

export function SigningUpModal(props: any){
    return (
        <LoadingModal {...props}>
          <Text style={styles.modalText}>Signing Up...</Text>
        </LoadingModal>
      );
}

const styles = StyleSheet.create({
  modalText: {
    fontFamily: FontTheme.primary,
    fontSize: FontTheme.reg
  }
});
