import React from 'react';
import { SafeAreaView } from 'react-navigation';
import {DrawerItems, createDrawerNavigator} from 'react-navigation-drawer'
import { View, Image, ScrollView, Text} from 'react-native';
//import { Icon } from 'native-base';

const CustomDrawerNavigation = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ height: 250, backgroundColor: '#d2d2d2', opacity: 0.9 }}>
                <View style={{ height: 200, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../../../assets/icon.png')} style={{ height: 150, width: 150, borderRadius: 60 }} />
                </View>
                <View style={{ height: 50, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center' }}>
                    <Text>John Doe</Text>
                </View>
            </View>
            <ScrollView>
                <DrawerItems {...props} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default createDrawerNavigator({
	HomePairsMenu: {
		screen: CustomDrawerNavigation,
		navigationOptions: {
	    	drawerLabel: 'HomePairs Menu',
		},
    },
});