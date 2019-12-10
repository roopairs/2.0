import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import { ScrollView } from 'react-native';
import { MainAppStyles } from '../../MainAppStyles';
import MainStackTitle from '../../../../Components/MainAppComponents/MainStackTitle';
import ViewPropertyCard from '../../../../Components/MainAppComponents/ViewPropertyCard';
import { PropertyListState, Property, HeaderState } from '../../../../state/types';
import { NavigationProps } from '../../../../utility/NavigationProps';

type Props = NavigationProps & {
  properties?: PropertyListState,
  header?: HeaderState
  onSetHeaderGoBackButton?: (isSet:boolean) => any 
  store: any,
}

//export default 
export default abstract class PropertiesScreenSkeleton extends React.Component<Props> {
  /**
   * TODO: Insert any logic for the Properties pages. These pages will need to be divided since our header 
   * responds differently based on the OS. Web will hold a side menu, where IOS and Android navigate differntly. 
   * In order to keep very similar code base, we will simply add any functionality shared between the three 
   * classes here. 
   * */
  
  protected addNewProperty = (arg0?:any) => {
    //TODO: Handle the logic of adding a new Property to a HomePairs Account
    alert('I need to open a modal Page')
  }

  protected navigateToDetiailedProperty = (index:number) => {
    let property: Property = this.props.properties[index]
    this.props.onSetHeaderGoBackButton(true)
    this.props.navigation.push('DetailedProperty', {propertyIndex : index, selectedProperty : property, globalStore : this.props.store})
  } 

  protected propertyList = () => {
    var properties = []
    for(let i=0; i < this.props.properties.length; i++){
      properties.push(
        <ViewPropertyCard 
        key={i}
        viewButtonSelectedCallBack={this.navigateToDetiailedProperty}
        propertyAddress={this.props.properties[i]['address']}
        propertyIndex={i}/>
      )
    };
    return properties
  }

  protected renderContents = () => {
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
     </ScrollView>
    )
  }
}
