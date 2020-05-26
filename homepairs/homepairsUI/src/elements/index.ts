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

export * from './Forms';
export * from './Panels';
export * from './Cards/Card';
export * from './Stickers/Sticker';
export * from './Tiles/Tiles';
export * from './Buttons';

export {default as DatePicker} from './DatePicker/DatePicker';
export {default as Card } from './Cards/Card';
export {default as Sticker} from './Stickers/Sticker';
export {default as LocationItem } from './LocationItem/LocationItem';
