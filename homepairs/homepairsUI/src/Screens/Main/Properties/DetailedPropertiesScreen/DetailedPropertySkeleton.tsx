import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import { ScrollView, Platform, View, StyleSheet, Image } from 'react-native';
import { MainAppStyles } from '../../MainAppStyles';
import AddressSticker from '../../../../Components/MainAppComponents/DetailPropertiesComponents/AddressSticker';
import defaultPropertyImage from '../../../../../assets/defaultProperty.png'
import GeneralHomeInfo from '../../../../Components/MainAppComponents/DetailPropertiesComponents/GeneralHomeInfo';
import { PropertyListState } from '../../../../state/types';
import { NavigationProps } from '../../../../utility/NavigationProps';


type Props = NavigationProps & {
  properties: PropertyListState,
  onUpdateProperty?: (index : number, address: string, tenants: number, bedrooms: number, bathrooms: number) => void,
  onRemoveProperty?: (index : number) => void;
}

export default abstract class DetailedPropertySkeleton extends React.Component<Props> {
  /**
   * TODO: Insert any logic for the Properties pages. These pages will need to be divided since our header 
   * responds differently based on the OS. Web will hold a side menu, where IOS and Android navigate differntly. 
   * In order to keep very similar code base, we will simply add any functionality shared between the three 
   * classes here. 
   * */

  protected id:number = this.props.navigation.getParam('propertyIndex', 'NO-ID')
  protected details = this.props.properties[this.id]
  
  editProperty = () => {
    this.props.onUpdateProperty(this.id, 'New Address', 0, 0, 1)
  }

  componentDidUpdate(){
    console.log(this.props.properties[0]['address'])
    
  }

  /**
   * MAKE CHILD COMPENENTS ONLY USE PROPS TO BE RE-RENDERED 
   * CHILD COMPONENTS WILL NOT UPDATE IF RELIANT ON STATE IN CONSTRUCTOR
   * */
  protected renderContents(){
    return(
     <ScrollView 
     style={{flex: 1}} 
     contentContainerStyle={MainAppStyles.assetLoadedContainer}
     directionalLockEnabled={true}
     automaticallyAdjustContentInsets={false}>
         <AddressSticker
         address={this.props.properties[this.id]['address']}/>
         <View style={styles.imageWrapper}>
          <View style={styles.imageContainer}>
            <Image
              source={defaultPropertyImage} 
              style={Platform.OS === 'web' ? styles.homePairsPropertiesImageWeb : styles.homePairsPropertiesImage}
              resizeMode='cover'/>
            </View>
          </View>
          <GeneralHomeInfo 
          address={this.props.properties[this.id]['address']}
          tenants={this.props.properties[this.id]['tenants']}
          bedrooms={this.props.properties[this.id]['bedrooms']}
          bathrooms={this.props.properties[this.id]['bathrooms']}
          onClick={this.editProperty} />
     </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  imageContainer: {
      width: '100%', 
      height: '100%',
      overflow: 'hidden',
      borderRadius: 10,  
  },
  imageWrapper: {
    width: '90%', 
    height: '20%',
    maxHeight: 200,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignSelf:'center',
    alignContent: 'center',
    shadowColor: '#aaa',
    shadowRadius: 10,
    shadowOffset: {width : 1, height: 1,},
    shadowOpacity: 200,
    elevation: 9,
  },
  remainingContainer: {
      flex: 4, 
      alignSelf: 'center', 
      alignContent: 'center', 
      justifyContent: 'center'
  },
  homePairsPropertiesImage: {
      flex: 1,
      alignSelf:'center', 
      width: '100%',
      height: '100%',
      overflow: 'hidden',

  },
  homePairsPropertiesImageWeb: {
      alignSelf:'center', 
      width: '100%',
      height: '100%',
      overflow: 'hidden',

  },
});