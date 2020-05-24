/**
 * We must first import all non default modules and give them different names. Bable limits
 * us to exporting modules with the same name once per file.
 *
 * Essentially, you cannot import a module and export it with the same name. You must rename it and
 * then export it.
 */
export * from "./AddressSticker/AddressSticker";
export * from "./GeneralHomeInfo/GeneralHomeInfo";
export * from "./PrimaryContactInfo/PrimaryContactInfo";
export * from "./ServiceRequestCount/ServiceRequestCount";
export * from "./AuthenticationCards/AccountConnectedCard";
export * from "./AuthenticationCards/ConnectAccountCard";
export * from "./HomePairsHeader/HomePairsHeaderBase";
export * from './PreferredProviderFlatList/withPreferredProviderFlatList';

export { default as PreferredProviderFlatList} from './PreferredProviderFlatList/PreferredProviderFlatList';
export { default as AddressSticker } from './AddressSticker/AddressSticker';
export { default as GeneralHomeInfo } from './GeneralHomeInfo/GeneralHomeInfo';
export { default as ChooseServiceCategory } from './ChooseServiceCategory/ChooseServiceCategory';
export { default as ChooseServiceProvider } from './ChooseServiceProvider/ChooseServiceProvider';
export { default as PrimaryContactInfo } from './PrimaryContactInfo/PrimaryContactInfo';
export { default as ServiceRequestCount } from "./ServiceRequestCount/ServiceRequestCount";
export { default as AccountConnectedCard } from './AuthenticationCards/AccountConnectedCard';
export { default as ConnectAccountCard } from './AuthenticationCards/ConnectAccountCard';
export { default as HomePairsHeader } from './HomePairsHeader/HomePairsHeader';
export { default as ChooseAppliance } from './ChooseAppliance/ChooseAppliance';
export { default as ApplianceCategorizer} from './ApplianceCategorizer/ApplianceCategorizer';
