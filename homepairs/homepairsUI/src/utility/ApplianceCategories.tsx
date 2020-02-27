import {ApplianceType} from 'homepairs-types';
import strings from 'homepairs-strings';

const categoryStrings = strings.applianceInfo.categories;
export function categoryToString(appType: ApplianceType) {
    let appTypeString: string;
    if (appType === ApplianceType.Plumbing) {
        appTypeString = categoryStrings.PLUMBING;
    } else if (appType === ApplianceType.GeneralAppliance) {
        appTypeString = categoryStrings.GA;
    } else if (appType === ApplianceType.HVAC) {
        appTypeString = categoryStrings.HVAC;
    } else if (appType === ApplianceType.LightingAndElectric) {
        appTypeString = categoryStrings.LE;
    }
    return appTypeString;
}

export function stringToCategory(selected: string) {
    let appType = ApplianceType.None;
    if (selected === categoryStrings.PLUMBING) {
        appType = ApplianceType.Plumbing;
    } else if (selected === categoryStrings.GA) {
        appType = ApplianceType.GeneralAppliance;
    } else if (selected === categoryStrings.HVAC) {
        appType = ApplianceType.HVAC;
    } else if (selected === categoryStrings.LE) {
        appType = ApplianceType.LightingAndElectric;
    }
    return appType;
}

const ApplianceCategoryStrings = {categoryToString, stringToCategory};
export default ApplianceCategoryStrings;