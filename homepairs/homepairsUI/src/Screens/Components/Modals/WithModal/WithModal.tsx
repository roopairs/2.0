import {
  Modal as MobileModal,
  View,
  Platform,
  StyleSheet,
  Dimensions
} from "react-native";
import React, { Component } from "react";
import { default as WebModal } from "modal-enhanced-react-native-web";
import * as BaseStyles from "homepair-base-styles";

const window = Dimensions.get("window");

type Props = {};
type State = {
  isVisible: boolean;
  styles: StyleSheet.NamedStyles<any>;
};

export type ModalInjectedProps = {
  _onChangeModalVisibility: (isVisible?: boolean) => void;
};

const Modal = Platform.OS === "web" ? WebModal : MobileModal;

export function withModal(BaseComponent: any, ModalComponent: any) {
  class WithModal extends Component<Props, State> {
    constructor(props: Readonly<Props>) {
      super(props);
      this.state = {
        isVisible: false,
        styles: setStyle()
      }
      this.updateStyles = this.updateStyles.bind(this);
      this._onChangeModalVisibility = this._onChangeModalVisibility.bind(this);
    }

    updateStyles() {
      this.setState({styles: setStyle()})
    }
    /**Here we will add our window listener */
    componentDidMount() {
      Dimensions.addEventListener("change", this.updateStyles);
    }
    /**
     * Here we clean up our component by removing the listener
     */
    componentWillUnmount() {
      Dimensions.removeEventListener("change", this.updateStyles);
    }
    /**
     * Intended to be called during the render. It will pass the return value
     * to components that this is called in.
     */
    injectProps(): ModalInjectedProps {
      return {
        _onChangeModalVisibility: this._onChangeModalVisibility
      };
    }

    /**
     * The bounded function will toggle the visiblity of the module or will
     * set the visiblity based on the argument passed in.
     */
    _onChangeModalVisibility(isVisible?: boolean) {
      let changedVisibility: boolean =
        isVisible == null ? !this.state.isVisible : isVisible;
      this.setState({ isVisible: changedVisibility });
    }

    render() {
      return (
        <View style={this.state.styles.container}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.isVisible}
          >
            <View style={this.state.styles.modalPallet}>
              <ModalComponent {...this.injectProps()} />
            </View>
          </Modal>
          <BaseComponent {...this.injectProps()} />
        </View>
      );
    }
  }
  return WithModal;
}

function setStyle() {
  let window = Dimensions.get("window");
  let width = window.width;
  let height = window.height;
  return StyleSheet.create({
    container: {
      flex: 1,
      alignContent: "center",
      alignSelf: "center",
      justifyContent: "center",
      width: BaseStyles.ContentWidth.max
    },
    modalPallet: {
      flexDirection: "column",
      alignContent: "center",
      alignSelf: "center",
      justifyContent: "center",
      backgroundColor: "#00000080",
      height: height,
      width: width
    }
  });
}

