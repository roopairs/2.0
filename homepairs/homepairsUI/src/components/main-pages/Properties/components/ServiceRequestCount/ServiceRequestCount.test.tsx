import React from 'react';
// eslint-disable-next-line import/order
import ServiceRequestCount from './ServiceRequestCount';
import { render } from 'react-native-testing-library';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { HOMEPAIRS_SERVICE_REQUEST_ENDPOINT } from 'homepairs-endpoints';
import ThinButton from '../../elements/Buttons/ThinButton';

const mock = new MockAdapter(axios);
const testPropId = '111';

const URL = `${HOMEPAIRS_SERVICE_REQUEST_ENDPOINT}${testPropId}/`;


const data = {
    reqs: [
        {
            appFixed: undefined,
            location: '3333 Richman Drive, USA',
            serviceDate: '09-19-2019',
            status: 'InProgress',
            serviceCompany: 'Cool Doods',
            serviceCategory: 'Plumbing',
            details: 'Nothing here',
        },
        {
            appFixed: undefined,
            location: '3333 Richman Drive, USA',
            serviceDate: '09-19-2019',
            status: 'Scheduled',
            serviceCompany: 'Cool Doodettes',
            serviceCategory: 'Plumbing',
            details: 'Nothing here',
        },
        {
            appFixed: undefined,
            location: '3333 Richman Drive, USA',
            serviceDate: '09-19-2019',
            status: 'Pending',
            serviceCompany: 'Cool NonBinarys',
            serviceCategory: 'Plumbing',
            details: 'Nothing here',
        },
    ],
};


describe('Test suite for Service Request Count', () => {
    
    it('Default Props are functioning', () => {
        // We test the default property functions in here
        expect(ServiceRequestCount.defaultProps.hasEdit).toBeTruthy();
        expect(ServiceRequestCount.defaultProps.onClick).toBeDefined();
    });

    mock.onGet(URL).replyOnce(200, data);

    it('Rendering with Has Edit', () => {
        const rendered = render(<ServiceRequestCount propId={testPropId} />);

        const {queryAllByType, getAllByText} = rendered;
        expect(queryAllByType(ThinButton)).toHaveLength(1);
        expect(getAllByText('0')).toHaveLength(3);

    });
    it('Rendering with Without Edit', () => {
        const rendered = render(<ServiceRequestCount propId={testPropId} hasEdit={false}/>);

        const {queryAllByType, getAllByText} = rendered;

        expect(queryAllByType(ThinButton)).toHaveLength(0);
        expect(getAllByText('0')).toHaveLength(3);

    });

});