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

/** 
 * ------------------------------------------------------------
 * Parameter Checkers
 * ------------------------------------------------------------
 * These functions are intended to be helper functions for the 
 * use of comparison operations.  
 * 
 * Methods:
 *      isNullOrUndefined( arg: any ) => boolean 
*/
const ApplianceCategoryStrings = {categoryToString};
export default ApplianceCategoryStrings;