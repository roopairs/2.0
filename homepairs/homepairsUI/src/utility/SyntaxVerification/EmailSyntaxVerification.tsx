export function isEmailSyntaxValid(email: string) : Boolean {
    //TO DO: verify email
    //how to work with strings in JS https://www.digitalocean.com/community/tutorials/how-to-work-with-strings-in-javascript
    if(!email.includes("@")){
        return false;
    }
    let prefix: string = email.trim()
    return true;
}