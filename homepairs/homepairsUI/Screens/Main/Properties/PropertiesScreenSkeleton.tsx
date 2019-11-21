import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import {NavigationProps} from '../../utility/NavigationProps';
import HomePairsHeader from '../../Components/Navigation/HomePairsHeader/HomePairsHeader';
import { View } from 'react-native';
import MainScreen from './PropertiesScreenSkeleton';

export default abstract class PropertiesScreenSkeleton extends MainScreen {
  /**
   * TODO: Insert any logic for the Properties pages. These pages will need to be divided since our header 
   * responds differently based on the OS. Web will hold a side menu, where IOS and Android navigate differntly. 
   * In order to keep very similar code base, we will simply add any functionality shared between the three 
   * classes here. 
   * */

}