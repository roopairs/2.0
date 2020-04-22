import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {ProviderTiles} from 'homepairs-elements';
import { HomePairsDimensions } from 'homepairs-types';
import * as BaseStyles from 'homepairs-base-styles';
import {roopairsLogo, bolt, fan, blender, tint} from 'homepairs-images';
import {styles} from './styles';

const images = [roopairsLogo, bolt, fan, blender, tint];

/**
 * ---------------------------------------------------
 * Preferred Provider FlatList
 * ---------------------------------------------------
 * Component that whom intially is intended to rendered within the Service Requests 
 * page. It has a scrollable set of preffered service providers that is recieved from 
 * the redux store. It also holds a navigator that navigates to a Preffered Provider 
 * modal (based on the service provider selected) or an add Service Provider modal.  
 * 
 * @param {any} props -Base component that will be contained 
 */
export default class PreferredProviderFlatList extends React.Component {
    render(){
        return <View style={styles.container}>
            {/* * TODO: To rerender a FlatList, you must use the extraData prop * */}
            <FlatList
                data={images}
                renderItem={({ item }) => (
                    <View style={{marginHorizontal: 10, alignSelf:'center', alignItems: 'center', justifyContent: 'center'}}>
                        <ProviderTiles image={item}/>
                    </View>
                )}
                horizontal
                    />

        </View>;
    };
    
} 
