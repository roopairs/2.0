/**
 * We must first import all non default modules and give them different names. Bable limits
 * us to exporting modules with the same name once per file.
 *
 * Essentially, you cannot import a module and export it with the same name. You must rename it and
 * then export it.
 */
import { AddressStickerProps as ASP } from "./AddressSticker/AddressSticker";
import { SceneHeaderProps as SHP} from './SceneHeader/SceneHeader';
import { GeneralHomeInfoProps as GHIP } from "./GeneralHomeInfo/GeneralHomeInfo";
import { PrimaryContactInfoProps as PCIP } from "./PrimaryContactInfo/PrimaryContactInfo";
import { AccountTypeRadioProps as ATRBP } from "./AccounttypeRadioButton/AccountTypeRadioButton";
import { ViewPropertyCardProps as VPCP } from "./ViewPropertyCard/ViewPropertyCard";
import { AccountConnectedCardProps as ACCP } from "./AuthenticationCards/AccountConnectedCard";
import { ConnectAccountCardProps as CACP } from "./AuthenticationCards/ConnectAccountCard";
import * as HomePairsHeaderProps from "./HomePairsHeader/HomePairsHeaderBase";
import { LoggingInModal, CreatingAccountModal } from './Modals/AuthenticationModals';
import { LoadingModal, LoadingModalProps as LMP} from './Modals/LoadingModal';


import {
    SceneInjectedProps as SIP,
    withSceneHeader,
} from './SceneHeader/WithSceneHeader';

import {
    AuthPageInjectedProps as APIP,
    AuthPassProps as APP,
    withAuthPage,
} from './AuthPage/WithAuthPage';
import {
    DarkModeInjectedProps as DMIP,
    withDarkMode,
} from './WithDarkMode/WithDarkMode';
import {
    ModalInjectedProps as MIP,
    withModal,
} from './Modals/WithModal/WithModal';

export { default as AddressSticker } from './AddressSticker/AddressSticker';
export { default as SceneHeader } from './SceneHeader/SceneHeader';
export { default as GeneralHomeInfo } from './GeneralHomeInfo/GeneralHomeInfo';
export { default as PrimaryContactInfo } from './PrimaryContactInfo/PrimaryContactInfo';
export { default as AccountTypeRadioButton } from './AccounttypeRadioButton/AccountTypeRadioButton';
export { default as ViewPropertyCard } from './ViewPropertyCard/ViewPropertyCard';
export { default as AccountConnectedCard } from './AuthenticationCards/AccountConnectedCard';
export { default as ConnectAccountCard } from './AuthenticationCards/ConnectAccountCard';
export { default as HomePairsHeader } from './HomePairsHeader/HomePairsHeader';
export { default as AddNewPropertyModal } from './Modals/AddNewPropertyModal/AddNewPropertyModal';
export { default as AddNewPropertyModalBase } from './Modals/AddNewPropertyModal/AddNewPropertyModalBase';
export { default as EditPropertyModal } from './Modals/EditPropertyModal/EditPropertyModal';
export { default as EditPropertyModalBase } from './Modals/EditPropertyModal/EditPropertyModalBase';
export { default as PrefferedProviderModal } from './Modals/ServiceRequestModal/PrefferedProviderModal';

/**
 * When importing non default modules, we must rename it in order to export it since bable only allows
 * singular exporting for each module. This is a simple workaround.
 *   */
export type SceneHeaderProps = SHP;
export type AddressStickerProps = ASP;
export type GeneralHomeInfoProps = GHIP;
export type PrimaryContactInfoProps = PCIP;
export type AccountTypeRadioProps = ATRBP;
export type ViewPropertyCardProps = VPCP;
export type AccountConnectedCardProps = ACCP;
export type ConnectAccountCardProps = CACP;
export type SceneInjectedProps = SIP;
export type AuthPageInjectedProps = APIP;
export type AuthPassProps = APP;
export type DarkModeInjectedProps = DMIP;
export type ModalInjectedProps = MIP;
export type LoadingModalProps = LMP;

export {
  HomePairsHeaderProps,
  withAuthPage,
  withSceneHeader,
  withDarkMode,
  withModal,
  LoggingInModal,
  CreatingAccountModal,
  LoadingModal,
};
