import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogueService } from './catalogue.service';
import { AuthentificationService } from './services/authentification.service';
import { GarageService } from './services/garage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentTypeVehicule;
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  typeVehicules;

  constructor(public catService:CatalogueService,
     private router:Router, 
     public authService:AuthentificationService,
     public garageService:GarageService){}
  ngOnInit(): void {
    this.getTypeVehicule();
  }
  private getTypeVehicule() {
    this.catService.getTypeVehicule("/typeVehicules")
      .subscribe(data=>{
        this.typeVehicules=data;
      },err=>{
        console.log(err);
      })
  }

  onLogOut(){
    this.authService.removeTokenFromLocalStorage();
    this.router.navigateByUrl("/login");
  }
  
}
