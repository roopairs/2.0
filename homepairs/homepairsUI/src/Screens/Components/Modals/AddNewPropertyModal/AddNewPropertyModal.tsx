import React, { Component, ReactElement } from "react"
import { Text, View, Modal, TouchableHighlight, StyleSheet } from "react-native"
import Card, {CardProps} from '../../../../../src/Elements/Cards/Card';
import HomePairColors from 'homepair-colors';
import {ModalInjectedProps} from '../WithModal/WithModal';

type Props = ModalInjectedProps;

type State = {};


export class AddNewPropertyModal extends Component<Props, State> {
    constructor(props: any) {
        super(props);
    } 
    
    render() {
        return <View>
            <Card
                showCloseButton= {true}
                title= "Create New Property"
                closeButtonPressedCallBack={() => this.props._onChangeModalVisibility(false)}
                >
            </Card>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
    }
});
