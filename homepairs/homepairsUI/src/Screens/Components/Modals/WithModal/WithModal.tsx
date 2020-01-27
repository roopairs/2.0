import {
    Modal as MobileModal,
    View,
    Platform,
    StyleSheet,
    Dimensions,
} from 'react-native';
import React, { Component } from 'react';
import WebModal from 'modal-enhanced-react-native-web';
import * as BaseStyles from 'homepair-base-styles';

type Props = {};
type State = {
    isVisible: boolean;
    styles: StyleSheet.NamedStyles<any>;
};

export type ModalInjectedProps = {
<<<<<<< HEAD
  onChangeModalVisibility: (isVisible?: boolean) => void;
=======
    onChangeModalVisibility: (isVisible?: boolean) => void;
>>>>>>> 6c0abe500170f7c4f80d6b59e196169385a97584
};

const Modal = Platform.OS === 'web' ? WebModal : MobileModal;

function setStyle() {
    const { width, height } = Dimensions.get('window');
    return StyleSheet.create({
        container: {
            flex: 1,
            alignContent: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            width: BaseStyles.ContentWidth.max,
        },
        modalPallet: {
            flexDirection: 'column',
            alignContent: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            backgroundColor: '#00000080',
            height,
            width,
        },
    });
}

export function withModal(BaseComponent: any, ModalComponent: any) {
<<<<<<< HEAD
  class WithModal extends Component<Props, State> {
    constructor(props: Readonly<Props>) {
      super(props);
      this.state = {
        isVisible: false,
        styles: setStyle()
      }
      this.updateStyles = this.updateStyles.bind(this);
      this.onChangeModalVisibility = this.onChangeModalVisibility.bind(this);
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
        onChangeModalVisibility: this.onChangeModalVisibility
      };
    }

    /**
     * The bounded function will toggle the visiblity of the module or will
     * set the visiblity based on the argument passed in.
     */
    onChangeModalVisibility(isVisible?: boolean) {
      let changedVisibility: boolean =
        isVisible == null ? !this.state.isVisible : isVisible;
      this.setState({ isVisible: changedVisibility });
    }
=======
    class WithModal extends Component<Props, State> {
        constructor(props: Readonly<Props>) {
            super(props);
            this.state = {
                isVisible: false,
                styles: setStyle(),
            };
            this.updateStyles = this.updateStyles.bind(this);
            this.onChangeModalVisibility = this.onChangeModalVisibility.bind(
                this,
            );
        }

        /** Here we will add our window listener */
        componentDidMount() {
            Dimensions.addEventListener('change', this.updateStyles);
        }

        /**
         * Here we clean up our component by removing the listener
         */
        componentWillUnmount() {
            Dimensions.removeEventListener('change', this.updateStyles);
        }
>>>>>>> 6c0abe500170f7c4f80d6b59e196169385a97584

        /**
         * The bounded function will toggle the visiblity of the module or will
         * set the visiblity based on the argument passed in.
         */
        onChangeModalVisibility(isVisible: boolean) {
            this.setState({ isVisible });
        }

        updateStyles() {
            this.setState({ styles: setStyle() });
        }

        render() {
            const { styles, isVisible } = this.state;
            return (
                <View style={styles.container}>
                    <Modal animationType="fade" transparent visible={isVisible}>
                        <View style={styles.modalPallet}>
                            <ModalComponent
                                onChangeModalVisibility={
                                    this.onChangeModalVisibility
                                }
                            />
                        </View>
                    </Modal>
                    <BaseComponent
                        onChangeModalVisibility={this.onChangeModalVisibility}
                    />
                </View>
            );
        }
    }
    return WithModal;
}
