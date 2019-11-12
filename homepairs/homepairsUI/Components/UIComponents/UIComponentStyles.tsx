import { StyleSheet } from 'react-native'

const DefaultThinButtonStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignSelf: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
      minHeight: 50,
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 10,
      maxWidth: 300,
      minWidth: 200,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#798285',
    },
    signUpButtonText: {
        color: '#798285', 
        fontSize: 16,
        alignSelf: 'center',
    },
});

const DefaultAccountTypeRadioButtonStyle = StyleSheet.create({
    container: {
       flexDirection: 'row',
       marginBottom: '3.5%', 
       paddingTop: 1,
       paddingHorizontal: 3,
       borderRadius: 4,
       width: '100%',
       opacity: 50,
  
    },
  
    selectedButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#00ADE9',
      padding: 10,
      width:'50%',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#58BEEF',
    },
    selectedText:{
      color: '#ffffff', 
      fontSize: 16,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    unselectedButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff',
      padding: 10,
      width:'50%',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#E5E5E5',
    },
  
    unselectedText:{
      color: '#354043', 
      fontSize: 16,
      alignSelf: 'center',
    }
  
});

const DefaultInputFormStyle = StyleSheet.create({
    container: {
       marginBottom: '3.5%', 
       paddingTop: 1,
       paddingHorizontal: 3,
       borderRadius: 4,
       width: '100%',
       opacity: 50,
    },
    formTitle: {
      marginVertical: '3.5%', 
      fontFamily:'nunito-regular', 
      color: '#9BA0A2'
    },
    input: {
       alignItems: 'center',
       alignSelf: 'center',
       margin: 1,
       minWidth:40,
       width: '100%',
       height: 40,
       borderColor: '#AFB3B5',
       borderWidth: 1,
       borderRadius: 4,
       paddingHorizontal: 10,
    },
});

export default {DefaultThinButtonStyles, DefaultAccountTypeRadioButtonStyle, DefaultInputFormStyle}; 

export {DefaultThinButtonStyles, DefaultAccountTypeRadioButtonStyle, DefaultInputFormStyle};