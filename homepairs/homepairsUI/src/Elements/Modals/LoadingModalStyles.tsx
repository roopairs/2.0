import { StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window')

export const LoadingModalStyles = StyleSheet.create({        
    modalPallet: {
        flexDirection:'column', 
        alignContent:'center', 
        alignSelf: 'center', 
        justifyContent:'center',
        backgroundColor:'#00000080',
        height: window.height,
        width: window.width,
    },
    loadingCardContents: {
        flex: 1,
        alignContent: 'center', 
        justifyContent: 'center', 
        alignSelf:'center', 
        alignItems: 'center', 
        backgroundColor: '#fff',
        maxHeight: 100, 
        width: '75%',
        maxWidth: 350,
        shadowColor: '#aaa',
        shadowRadius: 10,
        shadowOffset: {width : 1, height: 1,},
        shadowOpacity: 200,
        elevation: 9,
        borderRadius: 10,}
 });
