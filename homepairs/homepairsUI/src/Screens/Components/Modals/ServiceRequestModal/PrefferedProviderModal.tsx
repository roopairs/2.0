import React from "react";
import { Text, Modal as MobileModal, ActivityIndicator, Platform } from "react-native";
import { Card } from "homepair-elements";
import {default as WebModal} from 'modal-enhanced-react-native-web'
import { ModalInjectedProps } from '../WithModal/WithModal';

type Props = ModalInjectedProps
export function PrefferedProviderModal(props: Props) {
  //TODO: Present Modal for new Request
  return (
      <Card
        showCloseButton={true}
        title="New Property"
        closeButtonPressedCallBack={()=>props.onChangeModalVisibility(false)}
      >
        <ActivityIndicator />
      </Card>
  );
}
