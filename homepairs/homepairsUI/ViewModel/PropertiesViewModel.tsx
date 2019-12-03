
class Property {
    property : {any: any}
 
    constructor(data:any){
        this.property = {
            address : data[1],
            tenants: data[5],
            bedrooms : data[3],
            bathrooms : data[4]
        }
    }

}
export class PropertiesViewModel{
    protected username: String;
    static properties: Array<any> = new Array()

    static initProperties(data){
        const values = data[1]
        values.forEach(element => {
            PropertiesViewModel.properties.push((new Property(element)).property)
        });
        console.log(this.properties)
    }


}