
import { isNullOrUndefined } from './ParameterChecker';

/**
 * ----------------------------------------------------
 * convertObjectValuesToArray
 * ----------------------------------------------------
 * Converts an object into a list of its values. It removes the 
 * key from each pair. 
 * @param {[key: string] : any} dict -The object to remove the 
 * keys from and make a list out of.
 */
export function convertObjectValuesToArray<T>(dict: {[val:string] : T}) : T[]{
  const arrayVals: T[] = Object.entries(dict).map(([,value]) => {
    return value;
  });
  return arrayVals.length === 0 ? [] : arrayVals;
}

/**
 * ----------------------------------------------------
 * nested Filter
 * ----------------------------------------------------
 * Helper function used to search within nested objects. 
 * @param {string} search - The parameter used to filter indicate if a object contains something with the substring
 * @param {any} item - The object to compare to. If it is an object, recursively call this function 
 * but if it is a primitive, convert it into a string and compare. 
 */
function nestedFilter(search: string, item : any) : boolean {
  // Check if the value is an object
  const isObject : boolean = typeof item === 'object' && item !== null;
  let foundMatch : boolean = false;

  if(isObject){
    // If the item is an object, get all its key value pairs
    const itemArray : any[] = Object.entries(item);
    // Iterate through each item and return if the result has been passed 
    for(let i: number = 0; i < itemArray.length; i++){
      const [, value] = itemArray[i];
      foundMatch = nestedFilter(search, value);
      if(foundMatch){
        // Break from the loop and return true for the entire function
        break;
      }
    }
  }else if (!isNullOrUndefined(item)){
    // Otherwise the object may be null or a primitive. Check to see if it matches the search condition
    foundMatch = item.toString().includes(search.trim());
  }
  return foundMatch;
}

/**
 * ----------------------------------------------------
 * filterList 
 * ----------------------------------------------------
 * Takes in an array of any type and returns a list of items in the array 
 * that match the search parameter. This function will search for the specified keys 
 * in an object defined by the keys parameter. If keys is not defined, the function will 
 * recursively go through key objects in the list.  
 * @param {string} search - The parameter used to filter values from the result. 
 * @param {T[]} list - This list of objects to filter from. Consider this the original list 
 * @param {string[]} keys - Optional parameter that limits to search to specified keys within object of T, this does 
 * NOT support searching for specific keys within nested objects.
 */
export function filterList<T>(search: string, list: T[], keys?: string[]) : T[]{
  const originalList : T[] = list;
  let newList: T[] = [];

  // Case 1: Keys is undefined, null, or empty then simply pass the original list and conduct a nested search
  if(isNullOrUndefined(keys) || keys.length === 0){
    newList = originalList.filter((item) => nestedFilter(search, item));
  }
  // Case 2: Keys is defined or null, all key,value pairs that match the search criteria 
  else {
    // Loop through entire list of potential items 
    originalList.forEach(item => {
      // Only check if the keys per item matches, the nestedFilter object should take care of this
      let isMatched : boolean = false;
      for(let i: number = 0; i < keys.length; i++){
        const key: string = keys[i];
        isMatched = nestedFilter(search, item[key]);
        if(isMatched){
          break;
        }
      };
      // If a match is found, add it to the results
      if(isMatched)
        newList.push(item);  
    });
  }
  
  return newList;
}


