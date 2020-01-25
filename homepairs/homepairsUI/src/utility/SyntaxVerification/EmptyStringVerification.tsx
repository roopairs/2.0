/** TODO: Create a module and possibly HOC/HOOK for validating user input!! */
export default function isEmptyOrSpaces(str:String){
    return str === null || str.match(/^ *$/) !== null;
}