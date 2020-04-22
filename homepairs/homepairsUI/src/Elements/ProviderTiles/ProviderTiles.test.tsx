import React from 'react';
import {Image} from 'react-native';
import { render } from 'react-native-testing-library';
import {ProviderTiles} from './ProviderTiles';
import {bolt} from 'homepairs-images';

jest.mock('homepairs-images');

describe('A very simple test just making sure that ProviderTiles is rendered properly', () => {
    const rendered = render(<ProviderTiles image={bolt} />);
    const {getByType} = rendered;

    it('Check if all properties render', () => {
        expect(getByType(Image)).toBeDefined();
    });

});
