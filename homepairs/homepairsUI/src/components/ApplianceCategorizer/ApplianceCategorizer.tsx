import React from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import { StyleSheet, Text, View } from 'react-native';
import { AppliancePanel } from 'src/elements';
import { HomePairFonts } from 'homepairs-fonts';
import * as BaseStyles from 'homepairs-base-styles';
import { Appliance } from 'homepairs-types';

type ApplianceCategorizerProps = {
    key?: string,
    appliances: Appliance[];
    onClick?: (child?: any) => any;
    hasButton?: boolean,
    buttonName?: string,
};

type Props = ApplianceCategorizerProps;

function setStyles(colorTheme?: BaseStyles.ColorTheme) {
    const colors = colorTheme == null ? BaseStyles.LightColorTheme : colorTheme;
    return StyleSheet.create({
        container: {
            backgroundColor: colors.secondary,
            marginTop: BaseStyles.MarginPadding.largeConst,
            marginBottom: BaseStyles.MarginPadding.medium,
            width: BaseStyles.ContentWidth.max,
            alignSelf: 'center',
            justifyContent: 'center',
        },
        categoryContainer: {
            paddingBottom: BaseStyles.MarginPadding.mediumConst,
        },
        categoryText: {
            fontSize: BaseStyles.FontTheme.small,
            fontFamily: HomePairFonts.nunito_regular,
            alignSelf: 'center',
            marginBottom: BaseStyles.MarginPadding.mediumConst,
            color: colors.lightGray,
        },
        emptyText: {
            color: colors.red,
            alignSelf: 'center',
            fontSize: BaseStyles.FontTheme.reg,
            margin: BaseStyles.MarginPadding.largeConst,
        },
    });
}

export default function ApplianceCategorizer(props: Props) {
    const { appliances, onClick, hasButton, buttonName } = props;
    const styles = setStyles();

    const locations: string[] = [];

    const categories: Map<string, Appliance[]> = new Map();

    const finalApps = [];

    function findCategories() {
        appliances.forEach(app => {
            const { location } = app;
            if (!locations.includes(location.toUpperCase())) {
                locations.push(location.toUpperCase());
            }
        });
    }

    function categorizeAppliances() {
        locations.forEach(homeLocation => {
            categories.set(
                homeLocation,
                [...appliances].filter(
                    app => homeLocation === app.location.toUpperCase(),
                ),
            );
        });
    }

    function categorize() {
        findCategories();
        categorizeAppliances();
        categories.forEach((value, locationKey) => {
            const key = locationKey;
            finalApps.push(
                <View key={key} style={styles.categoryContainer}>
                    <Text key={key} style={styles.categoryText}>{locationKey}</Text>
                    {value.map(app => {
                        return (
                            <AppliancePanel
                                key={app.applianceId}
                                hasButton={hasButton}
                                buttonName={buttonName}
                                onClick={onClick}
                                appliance={app}
                            />
                        );
                    })}
                </View>);
        });
        return finalApps;
    }

    return (
        appliances.length === 0 ? (<Text style={styles.emptyText}>
            No appliances have been added
        </Text>) :(
        <View style={styles.container}>
            <>{categorize()}</>
        </View>
    ));
}

ApplianceCategorizer.defaultProps = {
    hasButton: true,
    buttonName: 'Edit',
};
