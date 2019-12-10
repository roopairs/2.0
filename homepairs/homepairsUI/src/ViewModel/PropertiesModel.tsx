
class Property {
    property : {address: String, tenants : number, bedrooms: number, bathrooms: number}
 
    constructor(data:any){
        this.property = {
            address: data['address'],
            tenants: data['maxTenants'],
            bedrooms : data['numBed'],
            bathrooms : data['numBath']
        }
    }

}

export class PropertiesModel{
    protected username: String;
    static properties: Array<any> = new Array()

    static initProperties(data:any){
        const values = data
        values.forEach((element: any) => {
            PropertiesModel.properties.push((new Property(element)).property)
        });
    }

    static clearContent(){
        PropertiesModel.properties = new Array()
    }

}