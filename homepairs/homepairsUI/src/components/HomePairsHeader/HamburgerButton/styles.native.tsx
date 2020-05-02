import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    imageStyle: {
        aspectRatio: 1,
        flex: 1,
        resizeMode: 'contain',
    },
    container: {
        flex: 1,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '5%',
        marginRight: '5%',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'transparent',
        borderRadius: 8,
        height: 45,
        width: 45,
    },
});

export {styles}