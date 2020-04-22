/**
 * ------------------------------------------------------------
 * Elements 
 * ------------------------------------------------------------
 * Elements are designed to be the base level components akin to React.Elements.
 * These components have hard coded values included into them are intended to be the 
 * building blocks of larger components. 
 * 
 * ------------------------------------------------------------
 * About aliases:
 *      index.js file intended to act as an alias to the Components packages. 
 *      It is in this file where all general purpose components (components common 
 *      are shared between multiple Screens/Scenes/ParenentComponents) should be 
 *      defined and exported. 
 * 
 *      An example of using this would be: 
 *          import { HomePairsHeader, SceneHeader } from 'homepairs-components';
 *          import AddressSticker from './AddressSticker';
 * 
 *      * Note, for any components specific to the scene (i.e. not used by any other scene), 
 *        please define a Components folder for the topmost parent and define it there. 
 */

export * from './Forms/InputForm';
export * from './Buttons/ThinButton';
export * from './Panels/AppliancePanel';
export * from './Panels/ApplianceCategoryPanel';
export * from './Buttons/ServiceRequestButton';
export * from './Buttons/ServiceProviderButton';
export * from './Cards/Card';
export * from './Stickers/Sticker';
export * from './Tiles/Tiles';

export {default as DatePicker} from './DatePicker/DatePicker';
export {default as ButtonWithBitmap} from './Buttons/ButtonWithBitmap';
export {default as InputForm } from './Forms/InputForm';
export {default as GoogleInputForm} from './Forms/GoogleInputForm';
export {default as ThinButton} from './Buttons/ThinButton';
export {default as LoginButton} from './Buttons/LoginButton';
export {default as Card } from './Cards/Card';
export {default as Sticker} from './Stickers/Sticker';
export {default as HamburgerButton} from './Buttons/HamburgerButton';
export {default as AppliancePanel} from './Panels/AppliancePanel';
export {default as ServiceRequestAddressPanel} from './Panels/ServiceRequestAddressPanel';
export {default as AddressPanel} from './Panels/AddressPanel';
export {default as ApplianceCategoryPanel} from './Panels/ApplianceCategoryPanel';
export {default as ServiceTypePanel} from './Panels/ServiceTypePanel';
export {default as ServiceRequestButton} from './Buttons/ServiceRequestButton';
export {default as ServiceProviderButton} from './Buttons/ServiceProviderButton';
export {default as LocationItem } from './LocationItem/LocationItem';
