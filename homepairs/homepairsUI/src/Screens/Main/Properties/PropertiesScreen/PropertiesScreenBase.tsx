import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import { PropertyListState, Property, HeaderState, HomepairsPropertyAttributes } from 'homepair-types';
import { ViewPropertyCard, ViewPropertyCardProps, SceneInjectedProps } from 'homepair-components';
import { View } from 'react-native';



export type PropertiesScreenStateProps = {
  properties?: PropertyListState,
  header?: HeaderState,
}

export type PropertiesScreenProps = SceneInjectedProps & 
PropertiesScreenStateProps  & 
{ store: any }

export default class PropertiesScreenBase extends React.Component<PropertiesScreenProps> {

  constructor(props: Readonly<PropertiesScreenProps>){
    super(props)
    this.navigateToDetiailedProperty = this.navigateToDetiailedProperty.bind(this)
  }
  
  navigateToDetiailedProperty(index:number){
    let property: Property = this.props.properties[index]
    let navParams = {propertyIndex : index, selectedProperty: property}
    this.props.navigation.push('DetailedProperty', navParams)
  } 

  render(){
    var properties = []
    for(let i=0; i < this.props.properties.length; i++){
      let viewPropertyProps : ViewPropertyCardProps = {
        viewButtonSelectedCallBack : this.navigateToDetiailedProperty,
        propertyAddress: this.props.properties[i][HomepairsPropertyAttributes.ADDRESS],
        propertyIndex: i,
      }
      properties.push(
        <ViewPropertyCard 
        key={i} {...viewPropertyProps}/>
      )
    };
    return properties
  }

}
