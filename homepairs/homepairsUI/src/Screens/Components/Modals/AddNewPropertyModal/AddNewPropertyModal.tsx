import React, { Component, ReactElement } from "react"
import { Text, View, Modal, TouchableHighlight, StyleSheet } from "react-native"
import Card, {CardProps} from '../../../../../src/Elements/Cards/Card';
import HomePairColors from 'homepair-colors';

export type state = {modalVisible: boolean};

type props = {isShown : boolean};


export class AddNewPropertyModal extends Component<props, state> {
    constructor(props: any) {
        super(props);
        this.state = {modalVisible: props.isShown};
    } 
    
    setModalVisible(visible: boolean) {
        this.setState({modalVisible: visible});
    }

    cardChildren : ReactElement[] = [
        <Text>SUP YOU MADE A MODAL</Text>,
        <TouchableHighlight onPress = {() => {
            this.setModalVisible(false);
        }}>
            <Text>Close this ishhhh</Text>
        </TouchableHighlight>
    ];

    cardProps : CardProps = {
        children: this.cardChildren,
        title: 'Add a New Property', 
        titleStyle: styles.cardTitle,
        showCloseButton: true, 
        closeButtonPressedCallBack: () => {this.setModalVisible(false)}
    };

    render() {
        return <Modal animationType='slide' visible={this.state.modalVisible} transparent={false}>
            <View>
                {Card(this.cardProps)}
            </View>
        </Modal>
    }
}

const styles = StyleSheet.create({
    cardTitle: {}
});
