import { Client } from "./client.model";
import { VehiculeItem } from "./item-Vehicule.model";

export class Garage{
    public name: string;
    public items:Map<string,VehiculeItem>=new Map();
    public client:Client;
    constructor(name:string){
        this.name=name;
    }
}