/** TODO: Create a module and possibly HOC/HOOK for validating user input!! */
export default function isEmptyOrSpaces(str:String){
    return str === null || str.match(/^ *$/) !== null;
}

export function isNumber(str: String) {
    return str === null || str.match(/^[0-9]*$/) !== null;
}
