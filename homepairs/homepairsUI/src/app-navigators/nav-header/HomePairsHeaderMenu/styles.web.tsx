import {StyleSheet, Dimensions, Platform} from 'react-native';
import {LightColorTheme, FontTheme} from 'homepairs-base-styles';

const {width} = Dimensions.get('window');
const colorScheme = LightColorTheme;

export default (isDropDown: boolean) => {
    const newStyle = StyleSheet.create({
        
        container: {
            flexDirection: 'row',
            flex: 1,
            maxWidth: width,
            maxHeight: 150,
            width: Platform.OS === 'web' ? undefined : '100%',
            backgroundColor: colorScheme.secondary,
        },
        containerDropDown: {
            flexDirection: 'column',
            width: '100%',
            minWidth: 300,
            backgroundColor: colorScheme.secondary,
        },
        menuText: {
            fontFamily: FontTheme.primary,
            paddingVertical: 15,
            maxHeight: 50,
            fontSize: 16,
            color: colorScheme.tertiary,
            paddingLeft: isDropDown ? 33 : 15,
        },
        menuSelectedText: {
            fontFamily: FontTheme.primary,
            paddingVertical: 15,
            maxHeight: 50,
            fontSize: 16,
            color: colorScheme.lightGray,
            paddingLeft: isDropDown ? 33 : 15,
        },
        selectable: { 
            marginHorizontal: 3, 
            justifyContent: 'center',
        },
    });
    return newStyle;
};
