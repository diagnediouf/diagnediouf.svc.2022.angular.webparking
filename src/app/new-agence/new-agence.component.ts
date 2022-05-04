import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogueService } from '../catalogue.service';
import { Agence } from '../model/agence.model';

@Component({
  selector: 'app-new-agence',
  templateUrl: './new-agence.component.html',
  styleUrls: ['./new-agence.component.css']
})
export class NewAgenceComponent implements OnInit {

  public currentAgence: Agence;
  public mode:number=1;
  listeAgences;

  constructor(private catService:CatalogueService, private router:Router) { }

  ngOnInit(): void {
  }

  onSaveAgence(data:any){
    this.catService.saveRessource(this.catService.host+"/agences",data)
      .subscribe(res=>{
        //this.router.navigateByUrl("/agences")
        this.currentAgence=res;
        this.mode=2;
      },err=>{
        console.log(err);
      })
  }

  onNewAgence(){
    this.mode=1;
  }

}
