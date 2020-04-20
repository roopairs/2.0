import React, { PureComponent } from 'react';
import { Text, StyleSheet, TouchableOpacity} from 'react-native';
import * as BaseStyles from 'homepairs-base-styles';

type LocationItemProps = {
    testID?: string,
    key?: string,
    description?: string,
    placeId?: string, 
    parentCallBack?: (child: string) => any
    clearSearch?: () => any
};

const colors = BaseStyles.LightColorTheme;
const styles = StyleSheet.create({
    container: {
        padding: BaseStyles.MarginPadding.medium,
        borderBottomColor: colors.lightGray, 
        borderBottomWidth: 1,
    },
    itemText: {
        fontSize: BaseStyles.FontTheme.reg,
        fontFamily: BaseStyles.FontTheme.primary,
    },
});


export default class LocationItem extends PureComponent<LocationItemProps> {

    render() {
        const {description, parentCallBack, clearSearch} = this.props; 
        return (
            <TouchableOpacity style={styles.container} onPress={() => {
                parentCallBack(description);
                clearSearch();
            }}>
                <Text style={styles.itemText}>{description}</Text>
            </TouchableOpacity>
        );
    }
}

