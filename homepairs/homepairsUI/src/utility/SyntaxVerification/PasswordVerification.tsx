var reg = new RegExp("^([A-Za-z0-9]{6,25})$");

export function isPasswordValid(input:string) : boolean {
    return reg.test(input)
}