import React from 'react'; //**For every file that uses jsx, YOU MUST IMPORT REACT  */
import { ScrollView, Platform, View, StyleSheet, Image } from 'react-native';
import { MainAppStyles } from '../MainAppStyles';
import MainStackTitle from '../../../Components/MainAppComponents/MainStackTitle';
import { PropertiesViewModel } from '../../../ViewModel/PropertiesViewModel';
import AddressSticker from '../../../Components/MainAppComponents/DetailPropertiesComponents/AddressSticker';
import defaultPropertyImage from '../../../assets/defaultProperty.png'
import GeneralHomeInfo from '../../../Components/MainAppComponents/DetailPropertiesComponents/GeneralHomeInfo';


interface DetailedPropertySkeletonProps {
    details: any;
}

export default abstract class DetailedPropertySkeleton extends React.Component<DetailedPropertySkeletonProps> {
  /**
   * TODO: Insert any logic for the Properties pages. These pages will need to be divided since our header 
   * responds differently based on the OS. Web will hold a side menu, where IOS and Android navigate differntly. 
   * In order to keep very similar code base, we will simply add any functionality shared between the three 
   * classes here. 
   * */


  render = () => {
    return(
     <ScrollView 
     style={{flex: 1}} 
     contentContainerStyle={MainAppStyles.assetLoadedContainer}
     directionalLockEnabled={true}
     automaticallyAdjustContentInsets={false}>
         <AddressSticker
         address={this.props.details['address']}/>
         <View style={styles.imageWrapper}>
          <View style={styles.imageContainer}>
            <Image
              source={defaultPropertyImage} 
              style={Platform.OS === 'web' ? styles.homePairsPropertiesImageWeb : styles.homePairsPropertiesImage}
              resizeMode='cover'/>
            </View>
          </View>
          <GeneralHomeInfo 
          address={this.props.details['address']}
          tenants={this.props.details['tenants']}
          bedrooms={this.props.details['bedrooms']}
          bathrooms={this.props.details['bathrooms']} />
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