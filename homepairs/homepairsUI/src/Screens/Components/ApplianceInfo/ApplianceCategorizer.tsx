import React from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import { StyleSheet, Text, View } from 'react-native';
import { AppliancePanel } from 'homepairs-elements';
import { HomePairFonts } from 'homepairs-fonts';
import * as BaseStyles from 'homepairs-base-styles';
import { Appliance } from 'homepairs-types';
import {NavigationRouteScreenProps} from 'homepairs-utilities';



type ApplianceCategorizerProps = {
    appliances: Appliance[];
    onEditApplianceModal?: (appliance: Appliance) => any;
};

type Props = ApplianceCategorizerProps & NavigationRouteScreenProps;

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
    const { appliances, onEditApplianceModal } = props;
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
        const buttonCheck = true;
        findCategories();
        categorizeAppliances();
        categories.forEach((value, locationKey) => {
            const key = locationKey;
            finalApps.push(
                <View key={key} style={styles.categoryContainer}>
                    <Text style={styles.categoryText}>{locationKey}</Text>
                    {value.map(app => {
                        return (
                            <AppliancePanel
                                hasButton={buttonCheck}
                                onEditApplianceModal={onEditApplianceModal}
                                key={app.applianceId.toString()}
                                appliance={app}
                            />
                        );
                    })}
                </View>,
            );
        });
        return finalApps;
    }

    return (
        <View style={styles.container}>
            {appliances.length === 0 ? (
                <Text style={styles.emptyText}>
                    No appliances have been added
                </Text>
            ) : (
                <>{categorize()}</>
            )}
        </View>
    );
}
