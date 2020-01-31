const reg = new RegExp("^([A-Za-z0-9]{6,25})$");

export default function isPasswordValid(input:string) : boolean {
    return reg.test(input);
}