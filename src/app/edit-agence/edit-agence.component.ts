import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogueService } from '../catalogue.service';
import { Agence } from '../model/agence.model';

@Component({
  selector: 'app-edit-agence',
  templateUrl: './edit-agence.component.html',
  styleUrls: ['./edit-agence.component.css']
})
export class EditAgenceComponent implements OnInit {
  currentAgence: Agence;
  url: string;

  constructor(private router:Router, private activatedRoute:ActivatedRoute,
              private catService:CatalogueService) { }

  ngOnInit(): void {
    this.url=atob(this.activatedRoute.snapshot.params.id)
    this.catService.getRessource(this.url)
      .subscribe(data=>{
        this.currentAgence=data;
      },err=>{
        console.log(err);
      })
  }

  onUpdateAgence(value:any){
    this.catService.updateRessource(this.url,value)
      .subscribe(data=>{
        alert("Mise à jour effectué avec succés")
        this.router.navigateByUrl("/agences");
      },err=>{
        console.log(err);
      })
  }

}
