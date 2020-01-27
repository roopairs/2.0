import React from "react";
import { Card } from "homepair-elements";
import { ModalInjectedProps } from '../WithModal/WithModal';

type Props = ModalInjectedProps
export default function PrefferedProviderModal(props: Props) {
  // TODO: Present Modal for new Request
  return (
      <Card
        showCloseButton
        title="New Property"
        closeButtonPressedCallBack={()=>props.onChangeModalVisibility(false)}
      />
 
  );
}
