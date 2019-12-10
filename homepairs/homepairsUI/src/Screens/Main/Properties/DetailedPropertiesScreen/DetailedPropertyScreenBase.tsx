import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import { View, } from 'react-native';
import { MainAppStyles } from '../../MainAppStyles';
import DetailedPropertySkeleton from './DetailedPropertySkeleton';

export default class DetailedPropertyScreenBase extends DetailedPropertySkeleton {
    render() {
        return(
        <View style={MainAppStyles.container}>
            <View style={MainAppStyles.pallet}>
                {this.renderContents()}
            </View>
        </View>
        );
    }
}