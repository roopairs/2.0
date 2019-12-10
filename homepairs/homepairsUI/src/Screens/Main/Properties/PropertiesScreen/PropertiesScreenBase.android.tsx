import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import { View } from 'react-native';
import { MainAppStyles } from '../../MainAppStyles';
//import HomePairsHeader from '../../../../Components/Navigation/HomePairsHeader/HomePairsHeader';
import PropertiesScreenSkeleton from './PropertiesScreenSkeleton';

export default class PropertiesScreenBase extends PropertiesScreenSkeleton {
   render(){
    return(
      <View style={MainAppStyles.container}>
          <View style={MainAppStyles.pallet}>
            {this.renderContents()}
          </View>
        </View>
    );
  }
}