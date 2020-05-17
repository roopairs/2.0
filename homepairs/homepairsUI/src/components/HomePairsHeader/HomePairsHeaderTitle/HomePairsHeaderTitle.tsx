import {
    View,
    Text,
} from 'react-native';
import React from 'react';
import styles from './styles';


export type HomePairsHeaderTitleProps = {

    /**
     * Used to indicate instances of this component during testing
     */
    testID?: string;

    /**
     * Indicates to the header whether the menu is rendered a nav bar or 
     * dropdown menu. 
     */
    isDropDown: boolean;
};

/**
 * ---------------------------------------------------
 * HomePairs Header Title
 * ---------------------------------------------------
 * This class is intended to hold all information for the first component of the header. There are a few
 * conditions. This page is essentially the same if running as a native app or if the web page window has
 * a resolution of less than 600px.
 */
export function HomePairsHeaderTitle(props:HomePairsHeaderTitleProps) {
    const {isDropDown} = props;

    function getProperTitleStyle() {
        return isDropDown
            ? styles.homePairsTitleContainer
            : styles.homePairsTitleContainerNavSet;
    }

    return (
        <>
        <View testID='homepairs-header-title-style' style={getProperTitleStyle()}>
            <Text style={styles.homePairsTitle}>HomePairs</Text>
        </View>
        </>
    ); 
}

HomePairsHeaderTitle.defaultProps = {
    testID: 'homepairs-header-title',
};