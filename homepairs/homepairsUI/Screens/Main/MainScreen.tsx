import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import {NavigationProps} from '../../utility/NavigationProps';
import { View } from 'react-native';
import {MainAppStyles} from './MainAppStyles';

export default abstract class MainScreen extends React.Component<NavigationProps> {
  /**
   * TODO: Insert any attributes that all pages of the Application will hold. This class is intended 
   * to hold the functionality, behavior, and attributes that all Pages of the application will be expected 
   * to have. Note: This class may not have anything in the future. So we may be able to outright remove this. 
   * */
  
   /**Function will return contents relied for specific pages. Define this in Screen pages*/
   protected renderContents: () => any
   
   openPropertyPage = (arg0:number, arg1: any) => {
      this.props.navigation.navigate('DetailedProperty', {itemId: arg0, details : arg1})
   } 

   render(){
     return (
      <View style={MainAppStyles.container}>
        {this.renderContents()}
      </View>
     )
   }

}