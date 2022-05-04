import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { CatalogueService } from '../catalogue.service';
import { TypeVehicule } from '../model/typeVehicule.model';
import { Vehicule } from '../model/vehicule.model';

@Component({
  selector: 'app-vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.css']
})
export class VehiculeComponent implements OnInit {
  vehicule:Vehicule;
  typeVehicules:TypeVehicule;
  typeVehList;

  constructor(public catService:CatalogueService) {}

  ngOnInit(): void {
   
    this.catService.getVehiculeCategorie().subscribe((data:any)=>{
      this.typeVehList=data;
      console.log(data);
    })
    
  }

  onSaveVehicule(data:any){
    this.catService.saveVehicule(this.catService.host+"/vehicules",data)
      .subscribe(data=>{
        this.vehicule=data;
      },err=>{
        console.log(err);
      })
      
  }

  /*getTypeVehicule(){
    this.catService.getVehiculeCategorie()
      .subscribe(data => {
        console.log('TypeVehicule' + JSON.stringify(data));
        this.typeVehicules = data;
      },err=>{
        console.log(err);
      })
  }*/

  
  
}
