import React from 'react';
import { Card, ThinButton } from 'homepairs-elements';
import { fireEvent, render } from 'react-native-testing-library';
import  AccountConnectedCard from './AccountConnectedCard';
import ConnectAccountCard from './ConnectAccountCard';

describe('Connect Account Card Test', () => {
    const connectAccountCallBackSpy = jest.fn();
    it('Default Props', () => {
        const {connectAccountCallBack} = ConnectAccountCard.defaultProps;
        expect(connectAccountCallBack).toBeDefined();
        expect(connectAccountCallBack()).toBeUndefined();
    });
    it('Basic functionality', () =>{
        const rendered = render(
            <ConnectAccountCard 
                connectAccountCallBack={connectAccountCallBackSpy}/>);
        
        const {getAllByType, getByTestId} = rendered;
        fireEvent.press(getByTestId('click-thin-button'));
        expect(connectAccountCallBackSpy).toHaveBeenCalled();
        expect(getAllByType(Card)).toHaveLength(1);
        expect(getAllByType(ThinButton)).toHaveLength(1);

    });

});

describe('Disconnect Account Card Test', () => {
    const disconnectAccountCallBackSpy = jest.fn();
    it('Default Props', () => {
        const {disconnectAccountCallBack} = AccountConnectedCard.defaultProps;
        expect(disconnectAccountCallBack).toBeDefined();
        expect(disconnectAccountCallBack()).toBeUndefined();
    });
    it('Basic functionality', () =>{
        const rendered = render(
            <AccountConnectedCard 
                disconnectAccountCallBack={disconnectAccountCallBackSpy}/>);
        
        const {getAllByType, getByTestId} = rendered;
        fireEvent.press(getByTestId('click-thin-button'));
        expect(disconnectAccountCallBackSpy).toHaveBeenCalled();
        expect(getAllByType(Card)).toHaveLength(1);
        expect(getAllByType(ThinButton)).toHaveLength(1);

    });
});