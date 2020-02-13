import {
    Modal as MobileModal,
    View,
    Platform,
    StyleSheet,
    Dimensions,
} from 'react-native';
import React from 'react';
import WebModal from 'modal-enhanced-react-native-web';
import * as BaseStyles from 'homepairs-base-styles';
import { HomePairsDimensions } from 'src/state/types';

type Props = {
    /**
     * Use to locate this component on end-to-end test
     */
    testID?: string;
};
type State = {
    isVisible: boolean;
    styles: StyleSheet.NamedStyles<any>;
};

export type ModalInjectedProps = {
    /**
     * A callback function that changes the visibility of the modal. By default, the visiblity
     * will be set to false if not parameter is passed in.
     */
    onChangeModalVisibility: (isVisible?: boolean) => void;

    /**
     * String used for identifying the component during testing
     */
    testID?: string;
};

/** 
 * Modals for websites are not offered in default React Native libraries. Therefore, we must use 
 * a separate library (we can define our own) for the web. 
 * */ 
const Modal = Platform.OS === 'web' ? WebModal : MobileModal;

/**
 * This sets the style to adjust the width and height of the modal shadow to lay over the entire 
 * window. This should be first called in the constructor. This should then be the callback of any
 * window/screen/layout listeners. 
 */
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
        contentPallet: {
            width: HomePairsDimensions.MAX_PALLET, 
            flex: 1, 
            justifyContent:'center', 
            alignSelf:'center',
        },
        scrollContainer: {
            flex: 1,
            justifyContent: 'center',
        },
        scrollViewContentContainer: {
            maxWidth: HomePairsDimensions.MAX_CONTENT_SIZE,
            backgroundColor: BaseStyles.LightColorTheme.transparent,
            alignSelf: 'center',
            width: BaseStyles.ContentWidth.max,
            flexGrow: 1,
        },
    });
}


/**
 * ---------------------------------------------------
 * withModal
 * ---------------------------------------------------
 * A HOC that takes in two ReactElements to render a 
 * component that has a modal with a darkened background. 
 * ModalComponent is revealed when the onChangeModalVisibility() 
 * method is passed a value of true. 
 * 
 * @param {React.Component} BaseComponent
 * The regular component shown in the UI. This component will not have 
 * any significant changes. Only access to the injected prop onChangeModalVisibility.
 * @param {React.Component} ModalComponent
 * The component that is revealed when onChangeModalVisibility is passed 
 * true. This component also has access to this function in order to hide 
 * itself when the user has no need 
 *  
 */
export function withModal(BaseComponent: React.ElementType, ModalComponent: React.ElementType) {
    return class WithModalComponent extends React.Component<Props, State> {
        constructor(props: Readonly<Props>) {
            super(props);
            this.state = {
                isVisible: false,
                styles: setStyle(),
            };
            this.updateStyles = this.updateStyles.bind(this);
            this.onChangeModalVisibility = this.onChangeModalVisibility.bind(this);
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
                            <View style={styles.contentPallet}>
                                <ModalComponent
                                    onChangeModalVisibility={this.onChangeModalVisibility}/>
                            </View>
                        </View>
                    </Modal>
                    <BaseComponent
                        onChangeModalVisibility={this.onChangeModalVisibility}/>
                </View>
            );
        }
    };
}
