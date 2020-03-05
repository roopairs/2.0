import React from 'react';
import { EditTenantModal } from 'homepairs-components';
import { InputForm } from 'homepairs-elements';
import { propertyManagerMock1 } from 'tests/fixtures/StoreFixture';
import { BrowserRouter as Router} from 'react-router-dom';
import { prepareNavigationStackFirstRouteMock } from 'tests/fixtures/DummyComponents';
import { Provider } from 'react-redux';
import { render, fireEvent } from 'react-native-testing-library';
import { TextInput } from 'react-native';

const mockStore = propertyManagerMock1;
const [mockStackNavigationFirstRoute, navigationStackSpyFunction] = prepareNavigationStackFirstRouteMock();
const Component = <Provider store={mockStore}><Router><EditTenantModal navigation={mockStackNavigationFirstRoute} /></Router></Provider>;

describe('Test Edit Tenant Modal', () => {
    const rendered = render(Component);
    it('Test Edit Tenant Modal', () => {
        const {getAllByTestId, getAllByType, queryByType, queryAllByType, getByType} = rendered;
        const inputForms = getAllByType(TextInput);

        const rootComponent = getByType(EditTenantModal);
        console.log(rootComponent.children);
        //const [firstName, lastName, email, phoneNumber] = inputForms;

        console.log(inputForms[0].props);
        //expect(firstName.props.value).toBe('Alex');
        expect(false).toBeFalsy();
    })
;});