import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import { ScrollView } from 'react-native';
import { MainAppStyles } from '../MainAppStyles';
import MainStackTitle from '../../../Components/MainAppComponents/MainStackTitle';
import ViewPropertyCard from '../../../Components/MainAppComponents/ViewPropertyCard';
import { PropertiesModel } from '../../../ViewModel/PropertiesModel';


interface PropertiesScreenSkeletonProps {
  openPropertyDetails?: (arg0:number, arg1:any) => any
}

export default abstract class PropertiesScreenSkeleton extends React.Component<PropertiesScreenSkeletonProps> {
  /**
   * TODO: Insert any logic for the Properties pages. These pages will need to be divided since our header 
   * responds differently based on the OS. Web will hold a side menu, where IOS and Android navigate differntly. 
   * In order to keep very similar code base, we will simply add any functionality shared between the three 
   * classes here. 
   * */

  addNewProperty = (arg0?:any) => {
    //TODO: Handle the logic of adding a new Property to a HomePairs Account
    alert('I need to open a modal Page')
  }


  propertyList(){
    var properties = []
    for(let i=0; i < PropertiesModel.properties.length; i++){

      properties.push(
        <ViewPropertyCard 
        key={i}
        viewPropertyDetails={this.props.openPropertyDetails}
        propertyIndex={i}/>
      )
    };
    return properties
  }

  render = () => {
    return(
     <ScrollView 
     style={{flex: 1}} 
     contentContainerStyle={MainAppStyles.assetLoadedContainer}
     directionalLockEnabled={true}
     automaticallyAdjustContentInsets={false}>
         <MainStackTitle 
         title='Properties'
         buttonTitle='Add Property'
         onButtonPress={this.addNewProperty}
         />
         {this.propertyList()}
         {/*<ViewPropertyCard 
         viewPropertyDetails={this.props.openPropertyDetails}
         propertyIndex={1}/>*/}
     </ScrollView>
    )
  }
}