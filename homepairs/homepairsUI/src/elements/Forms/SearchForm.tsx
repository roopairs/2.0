import React from 'react';
import {filterList, isNullOrUndefined} from 'src/utility';
import { InputForm, InputFormProps } from './InputForm';


export type SearchFormProps<T> = InputFormProps & {
    /**
     * The list of items that the component will filter through. Pass this value into the 
     * component every time an update list or new list has been instantiated. 
     */
    objects: T[];

    /**
     * Callback method for whenever the filteredArray is updated. This will typically be 
     * used to set/return the results back to the parent component. 
     */
    filter: (filtredArray: T[], ...rest) => void;

    /**
     * A optional parameter that can be used to define which keys to search while filtering 
     * a list of objects. Currently, the search function used only examines keys at the 
     * highest level.
     */
    keys?: string[];
};

type State = {
    /**
     * The input text state is saved into this component since it will be needed for new 
     * new objects are passed into. This can occur during a refresh, or an async fetch 
     * request. The text allows access to the inputform text for filtering as soon as 
     * an update has occured.
     */
    text: string;
}

const initialState: State = { text: "" };


/**
 * ----------------------------------------------------
 * Search Form
 * ----------------------------------------------------
 * A component that wraps around the Input Form as a base. It queries all values that 
 * include the text passed into the Input Form and returns a filtered array as the 
 * result. To use the component you must define a type as it is a generic function. 
 * 
 * EX: 
 *  <SearchForm<any> ...props>
 * 
 */
export class SearchForm<T> extends React.Component<SearchFormProps<T>, State>{
    
    constructor(props: Readonly<SearchFormProps<T>>){
        super(props);
        this.state= initialState;
        this.invokeSearchFromInputForm = this.invokeSearchFromInputForm.bind(this);
    }

    /**
     * If an update occurs with outside of this component, invoke a filter to respond 
     * to the new updates.
     */
    componentDidUpdate(prevProps: SearchFormProps<T>){
        const {objects} = this.props;
        const {text} = this.state;
        if(objects !== prevProps.objects)
            this.invokeSearchFromInputForm(text);
    }

    /**
     * Callback method intended that occurs when the input form has mutated. This function will 
     * invoke a search and set the state new state of this component the filtered data
     * @param {string} text -text state of the input form 
     */
    invokeSearchFromInputForm(text: string){
        const {objects, keys, filter} = this.props;
        let filteredArray;
        if(isNullOrUndefined(objects))
            filteredArray = [];
        else
            filteredArray = filterList<T>(text, objects, keys);
        this.setState({text});
        filter(filteredArray);
    }

    render(){
        return (
            <InputForm 
                {...(this.props as InputFormProps)}
                parentCallBack={this.invokeSearchFromInputForm} 
                />
        );
    }
}
