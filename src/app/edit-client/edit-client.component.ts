import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogueService } from '../catalogue.service';
import { Client } from '../model/client.model';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  currentClient: Client;
  url: string;

  constructor(private catService:CatalogueService, private router:Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.url=atob(this.activatedRoute.snapshot.params.id)
    this.catService.getClient(this.url)
      .subscribe(data=>{
        this.currentClient=data;
      },err=>{
        console.log(err);
      })
  }

  onUpdateClient(value:any){
    this.catService.updateRessource(this.url,value)
      .subscribe(data=>{
        alert("Mise à jour effectué avec succés")
        this.router.navigateByUrl("/clients");
      },err=>{
        console.log(err);
      })
  }

}
