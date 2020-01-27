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
<<<<<<< HEAD
      >
        <ActivityIndicator />
      </Card>
=======
      />
 
>>>>>>> 6c0abe500170f7c4f80d6b59e196169385a97584
  );
}
