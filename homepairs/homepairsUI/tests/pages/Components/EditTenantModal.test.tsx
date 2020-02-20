import React from 'react';
import { EditTenantModal } from 'homepairs-components';
import {InputForm} from 'homepairs-elements';
import { propertyManagerMock1 } from 'tests/fixtures/StoreFixture';
import { navigationStackSpyFunction, mockStackNavigationFirstRoute, navigation } from 'tests/fixtures/DummyComponents';
import { Provider } from 'react-redux';
import { render, fireEvent } from 'react-native-testing-library';
import { TextInput } from 'react-native';

const mockStore = propertyManagerMock1;
const Component = <Provider store={mockStore}><EditTenantModal navigation={mockStackNavigationFirstRoute} /></Provider>;

describe('Test Edit Tenant Modal', () => {
    const rendered = render(Component);
    it('Test Edit Tenant Modal', () => {
        const {getAllByTestId, getAllByType, queryByType, queryAllByType} = rendered;
        const inputForms = getAllByType(InputForm);
        const [firstName, lastName, email, phoneNumber] = inputForms;

        console.log(lastName.props)
        expect(firstName.props.value).toBe('Alex');
        expect(true).toBeFalsy();
    })
;});