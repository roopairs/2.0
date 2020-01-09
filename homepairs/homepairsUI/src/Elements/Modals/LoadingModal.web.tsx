import React, { ReactElement } from "react"
import { View, ActivityIndicator, StatusBar } from "react-native"
import Card from '../Cards/Card';
import Modal from 'modal-enhanced-react-native-web';
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
            onRequestClose={props.onRequestClose}
            backdropColor='#0000080'
            backdropOpacity={8}
            style={{height: '100%', width:'100%', alignSelf: 'center'}}>
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