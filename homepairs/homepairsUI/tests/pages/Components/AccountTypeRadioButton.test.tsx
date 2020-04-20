import React from 'react';
import { fireEvent, render} from 'react-native-testing-library';
import { Text } from 'react-native';
import { AccountTypes } from 'homepairs-types';
import AccountTypeRadioButton from '../../../homepairs-components/AccounttypeRadioButton/AccountTypeRadioButton';

describe('Account Type Radio Button Test', () => {

    it('Test that default Props are functionaly', () => {
        expect(AccountTypeRadioButton.defaultProps.testID).toBeNull();
        expect(AccountTypeRadioButton.defaultProps.parentCallBack).toBeDefined();
        expect(AccountTypeRadioButton.defaultProps.resetForms).toBeDefined();

        // Check if default Props functions invoke as expected 
        expect(AccountTypeRadioButton.defaultProps.
            parentCallBack(AccountTypes.Tenant)).toBe(AccountTypes.Tenant);
        expect(AccountTypeRadioButton.defaultProps.resetForms(false, 33, 33)).toBeUndefined();
        expect(AccountTypeRadioButton.defaultProps.resetForms(false)).toBeUndefined();
        expect(AccountTypeRadioButton.defaultProps.resetForms()).toBeUndefined();


    });

    it('Test when no props are passed. This should be rendered', () => {
        const radioButtonWithoutName = render(<AccountTypeRadioButton/>);
        const {queryAllByType, getByText} = radioButtonWithoutName;

        // Should only render two text instances 
        expect(queryAllByType(Text)).toHaveLength(3);
        expect(queryAllByType(AccountTypeRadioButton)).toHaveLength(1);
        expect(getByText('ACCOUNT TYPE')).toBeDefined();
    });

    it('Test when props are passed. We will test when all props are passed.', () => {
        const parentCallBackSpy = jest.fn((childData: AccountTypes) => {return childData;});
        const resetFormsCallBackSpy = jest.fn(() => {return 'forms resetted';});

        const Component =  (
        <AccountTypeRadioButton 
            name='Test' 
            testID='test-radiobutton' 
            parentCallBack={parentCallBackSpy} 
            resetForms={resetFormsCallBackSpy}/>);

        const radioButtonWithoutName = render(Component);
        const {queryAllByType, getByTestId} = radioButtonWithoutName;

        expect(queryAllByType(AccountTypeRadioButton)).toHaveLength(1);
        
        // parentCallBack should have also been called once
        expect(parentCallBackSpy).toBeCalledTimes(1);
        expect(parentCallBackSpy).toHaveNthReturnedWith(1, AccountTypes.Tenant);


        // Test if the buttons render the proper information
        const tenant = getByTestId('account-radio-tenant');
        const landlord = getByTestId('account-radio-pm');

        fireEvent.press(tenant);
        expect(parentCallBackSpy).toHaveBeenCalledTimes(2);
        expect(parentCallBackSpy).toHaveNthReturnedWith(2, AccountTypes.Tenant);
        expect(resetFormsCallBackSpy).toHaveBeenCalledTimes(1);

        fireEvent.press(landlord);
        expect(parentCallBackSpy).toBeCalledTimes(3);
        expect(parentCallBackSpy).toHaveNthReturnedWith(3, AccountTypes.PropertyManager);
        expect(resetFormsCallBackSpy).toHaveBeenCalledTimes(2);
    });


});