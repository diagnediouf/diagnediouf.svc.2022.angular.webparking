import { Injectable } from '@angular/core';
import { Garage } from '../model/garage.model';
import { VehiculeItem } from '../model/item-Vehicule.model';
import { Vehicule } from '../model/vehicule.model';

@Injectable({
  providedIn: 'root'
})
export class GarageService {
  currentGarageName:string="garage1";
  public garages:Map<string,Garage> = new Map();
  constructor() { 
    let garage=new Garage(this.currentGarageName);
    this.garages.set(this.currentGarageName,garage);
   }

  public addVehiculeToHangarService(vehicule:Vehicule):void{
    let garage=this.garages.get(this.currentGarageName);
    let vehiculeItem:VehiculeItem=garage.items.get(vehicule.matricule);
    if(vehiculeItem){
      vehiculeItem.quantity+=vehicule.quantity;
    }else{
      vehiculeItem=new VehiculeItem();
      vehiculeItem.matricule=vehicule.matricule;
      vehiculeItem.currentprice=vehicule.currentprice;
      vehiculeItem.prixParJour=vehicule.prixParJour;
      vehiculeItem.quantity=vehicule.quantity;
      vehiculeItem.vehicule=vehicule;
      garage.items.set(vehicule.matricule,vehiculeItem);
    }
  }
  public saveGarage(){
    localStorage.setItem('myHangars',JSON.stringify(this.garages))
  }

  getCurrentGarage():Garage{
    return this.garages.get(this.currentGarageName);
  }

  getTotal(){
    /*let garage=this.garages[this.currentGarageName];
    let total=0;
    for(let vehItem in garage.items){
      total+=garage.items[vehItem].currentprice*garage.items[vehItem].quantity;
      //total+=garage.items[vehItem].prixParJour*garage.items[vehItem].quantity;
    }
    return total;*/
  }
}
