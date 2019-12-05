import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import { View, } from 'react-native';
import { MainAppStyles } from '../MainAppStyles';
import MainScreen from '../MainScreen';
import DetailedPropertySkeleton from './DetailedPropertySkeleton';

export default class DetailedPropertyScreen extends MainScreen {
    
    protected id = JSON.stringify(this.props.navigation.getParam('itemId', 'NO-ID'))
    protected details = this.props.navigation.getParam('details', 'default-value')

    renderContents = () => {
        return(
            <View style={MainAppStyles.pallet}>
                <DetailedPropertySkeleton details={this.details}/>
            </View>
        );
    }
}