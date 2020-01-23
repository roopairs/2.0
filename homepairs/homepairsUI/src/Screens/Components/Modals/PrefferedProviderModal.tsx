import React from "react";
import { Text, Modal as MobileModal, ActivityIndicator, Platform } from "react-native";
import { Card } from "src/Elements/Elements";
import {default as WebModal} from 'modal-enhanced-react-native-web'
import { ModalInjectedProps } from './WithModal';

type Props = ModalInjectedProps

export function PrefferedProviderModal(props: Props) {
  //TODO: Present Modal for new Request
  return (
      <Card
        showCloseButton={true}
        title="New Property"
        closeButtonPressedCallBack={()=>props._onChangeModalVisibility(false)}
      >
      </Card>
  );
}
