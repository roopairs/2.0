/**
 * @jest-environment jsdom
 */

import {Sticker} from 'homepairs-elements';
import { shallow } from 'enzyme';
import * as React from 'react';
import { View, Text} from 'react-native';


describe("Sticker", () => {
  
    const rendered = shallow(<Sticker><Text>Hello World!</Text></Sticker>);
    const rendered2 = shallow(<Sticker><Text>Hello World!</Text><View/><View/></Sticker>);

    it("Method Test", () => {
      expect(rendered.find(Text)).toHaveLength(1);
      expect(rendered2.find(View)).toHaveLength(3);
      expect(rendered2.find(Text)).toHaveLength(1);
    });
    
  });