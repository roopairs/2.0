import React, { ReactElement } from "react"
import { View, ActivityIndicator, StatusBar, Modal } from "react-native"
import Card from '../Cards/Card';
import {LoadingModalStyles} from './LoadingModalStyles'


export type LoadingModalProps = {
    children?: ReactElement[] | ReactElement,
    visible?: boolean,
    onRequestClose?: () => void,
    containerStyle?: {},
    wrapperStyle?: {},
}

export default function LoadingModal(props: LoadingModalProps){
        return(
            <Modal
                animationType='fade'
                transparent={true}
                visible={props.visible}
                onRequestClose={props.onRequestClose}>
                    <View style={styles.modalPallet}>
                        <Card 
                        containerStyle={styles.loadingCardContents}
                        wrapperStyle={{alignItems: 'center'}}>
                            <ActivityIndicator />
                            <StatusBar barStyle="default"/>
                            <>
                                {props.children}
                            </>
                        </Card>
                    </View>
            </Modal>
        )
}

const styles = LoadingModalStyles