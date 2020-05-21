/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import {TextInput} from 'react-native';
import {fireEvent, render} from 'react-native-testing-library';
import {SearchForm} from '../SearchForm';
import InputForm from '../InputForm';

type TestType = {
    name: string,
    address: string,
    id: number,
}

const testData: TestType[] = [
    {
        name: 'Eeron',
        address: 'None of my business',
        id: 4,
    },
    {
        name: 'Tony',
        address: 'Same as Eeron',
        id: 13,
    },
    {
        name: 'Dylan',
        address: 'Same as Eeron',
        id: 24,
    },
];

describe("SearchForm Tests", () => {
  const testfunc = (child: TestType[]) => {return child;};

  const spyFunction = jest.fn(testfunc);

  const rendered = render(<SearchForm<TestType> objects={testData} parentCallBack={spyFunction}/>);
  
  it("Test for proper behavior", () => {
    const {getByType} = rendered;

    expect(getByType(InputForm)).toBeDefined();
    fireEvent.changeText(getByType(TextInput), 'Same as Eeron');
    
    // Text Change should invoke 
    expect(spyFunction).toHaveBeenCalled();
    expect(spyFunction).toHaveReturnedWith([
        {
            name: 'Tony',
            address: 'Same as Eeron',
            id: 13,
        },
        {
            name: 'Dylan',
            address: 'Same as Eeron',
            id: 24,
        },
    ]);
    spyFunction.mockClear();

    // Test if the update invoked the correct call.
    rendered.update(<SearchForm<TestType> objects={[testData[0], testData[1]]} parentCallBack={spyFunction}/>);
    expect(spyFunction).toHaveBeenCalled();

  });
  
});