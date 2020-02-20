import React from 'react';
import { EditTenantModal } from 'homepairs-components';
import { propertyManagerMock1 } from 'tests/fixtures/StoreFixture';
import { navigationStackSpyFunction, mockStackNavigation, navigation } from 'tests/fixtures/DummyComponents';
import { Provider } from 'react-redux';
import { render, fireEvent } from 'react-native-testing-library';

const mockStore = propertyManagerMock1;
const Component = <Provider store={mockStore}><EditTenantModal navigation={mockStackNavigation} /></Provider>;

describe('Test Edit Tenant Modal', () => {
    //const rendered = render(Component);
    it('Test Edit Tenant Modal', () => {
        const {getAllByTestId, getAllByType, queryByType, queryAllByType} = rendered;
        expect(true).toBeFalsy();
    })
;});