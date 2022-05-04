import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CatalogueService } from '../catalogue.service';
import { Vehicule } from '../model/vehicule.model';
import { AuthentificationService } from '../services/authentification.service';
import { GarageService } from '../services/garage.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  typeVehicules;
  vehicule;
  currentTypeVehicule;
  editPhoto: boolean;
  currentVehicule: any;
  selectedFiles;
  progress: number;
  currentFileUpload: any;
  title:string;
  timestamp:number=0;

  constructor(public catService:CatalogueService, 
    private route:ActivatedRoute, private router:Router,
    public authService:AuthentificationService,
    public garageService:GarageService) { }
  
    ngOnInit(): void {
      this.authService.loadAuthenticatedUserFromLocalStorage();
    this.router.events.subscribe((val) =>{
      if (val instanceof NavigationEnd){
        let url = val.url;
        console.log(url);
        let p1=this.route.snapshot.params.p1;
        if(p1==1){
          this.title="Selection";
          this.getVehicule('/vehicules/search/selectedVehicule');
        }
        else if (p1==2){
          let idTypeV=this.route.snapshot.params.p2;
          this.title="Modele de Voiture"+idTypeV;
          this.getVehicule('/typeVehicules/'+idTypeV+'/vehicules');
        }
        else if (p1==3){
          this.title="Voutures en Promotion";
          this.getVehicule('/vehicules/search/promoVehicule');
        }
        else if (p1==4){
          this.title="Voutures Disponibles";
          this.getVehicule('/vehicules/search/dispoVehicule');
        }
        else if (p1==5){
          this.title="Recherche..";
          this.getVehicule('/vehicules/search/dispoVehicule');
        }
      }
    });
    let p1=this.route.snapshot.params.p1;
    if(p1==1){
      this.getVehicule('/vehicules/search/selectedVehicule');
    }
    this.getTypeVehicule();
  }
  private getTypeVehicule(){
    this.catService.getTypeVehicule("/typeVehicules")
      .subscribe(data=>{
        this.typeVehicules=data;
      },err=>{
        console.log(err);
      })
  }
  getVehicule(url) {
    this.catService.getVehiculeRessource(url)
      .subscribe(data=>{
        this.vehicule=data;
      },err=>{
        console.log(err);
      })
  }

  getVehiculeByType(typeV){
    this.currentTypeVehicule=typeV;
    console.log(typeV)
    this.router.navigateByUrl('/home/2/'+typeV.id);
  }

  onSelectedVehicule(){
    this.currentTypeVehicule=undefined;
    this.router.navigateByUrl("/home/1/0");
  }

  onEditPhoto(veh){
    this.currentVehicule=veh;
    this.editPhoto=true;
  }

  onSelectedFile(event){
    this.selectedFiles = event.target.files;
  }

  uploadPhoto(){
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.catService.uploadPhotoVehicule(this.currentFileUpload, this.currentVehicule.matricule)
      .subscribe(event => {
        if(event.type === HttpEventType.UploadProgress){
          this.progress = Math.round(100 * event.loaded / event.total);
          console.log(this.progress);
       }else if (event instanceof HttpResponse){
          //this.getVehicule('/vehicules/search/selectedVehicule');
          this.timestamp=Date.now();
      }
    },err=>{
      alert("Probleme de chargement");      
    })
    this.selectedFiles = undefined;
  }

  onVehiculesPromo(){
    this.currentTypeVehicule=undefined;
    this.router.navigateByUrl("/home/3/0");
  }

  onVehiculesDispo(){
    this.currentTypeVehicule=undefined;
    this.router.navigateByUrl("/home/4/0");
  }

  getTS(){
    return this.timestamp;
  }

  public isAdmin(){
    return this.authService.isAdmin();
  }

  onVehiculeDetails(veh:Vehicule){
    let url=btoa(veh._links.vehicule.href);
    this.router.navigateByUrl("vehicule-detail/"+url);
  }

  onAddVehiculeToHangar(veh:Vehicule){
    this.garageService.addVehiculeToHangarService(veh);
  }

  myimage:string = "assets/image/car-4309348_1920.png";
 // myimage1:string = "assets/image/corvette-3864797_1920.jpg";

}
