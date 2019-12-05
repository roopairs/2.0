export class AccountDetailsModel{
    protected username: String;
    static roopairsToken: String = null;

    static setToken(data:String){
        AccountDetailsModel.roopairsToken = data
    }

}