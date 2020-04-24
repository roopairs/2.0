import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        aspectRatio: 1, // Use this to make the component dimensions relative to its height/width
        alignSelf: 'flex-end',
        justifyContent: 'center',
        paddingHorizontal: '5%',
        marginRight: '5%',
    },
    button: {
        flex: 1,
        aspectRatio: 1, // Use this to make the component dimensions relative to its height/width
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 8,
        height: 45,
        width: 45,
        borderColor: '#rgba(0,0,0, .08)',
    },
    imageStyle: {
        height: 45, 
        width: 45,
        aspectRatio: 1,
        justifyContent: 'center',
        resizeMode: 'contain',
    },
});

export {styles};