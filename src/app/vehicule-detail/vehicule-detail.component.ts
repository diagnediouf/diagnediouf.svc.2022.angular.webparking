import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogueService } from '../catalogue.service';
import { Vehicule } from '../model/vehicule.model';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-vehicule-detail',
  templateUrl: './vehicule-detail.component.html',
  styleUrls: ['./vehicule-detail.component.css']
})
export class VehiculeDetailComponent implements OnInit {

  currentVehicule:Vehicule;
  editPhoto: boolean;
  selectedFiles: any;
  progress: number;
  currentFileUpload;
  currentTime:number;
  mode:number=0;
  //timestamp:number=0;
  
  constructor(private router:Router, private route:ActivatedRoute,
              public catService:CatalogueService, public authService:AuthentificationService) { }

  ngOnInit(): void {
    let url=atob(this.route.snapshot.params.url);
    this.catService.getVehiDetail(url)
      .subscribe(data=>{
        this.currentVehicule=data;
      })
  }

  onEditPhoto(veh){
    this.currentVehicule=veh;
    this.editPhoto=true;
  }

  onSelectedFile(event){
    this.selectedFiles=event.target.files;
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
          this.currentTime=Date.now();
          this.editPhoto=false;
      }
    },err=>{
      alert("Probleme de chargement");      
    })
    this.selectedFiles = undefined;
  }

  getTS(){
    return this.currentTime;
  }

  onEditVehicule(){
    this.mode=1;
  }

  onUpdateVehicule(data){
    
  }

  onAddVehiculeToHangar(currentVehicule){

  }


}
