import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogueService } from '../catalogue.service';

@Component({
  selector: 'app-agences',
  templateUrl: './agences.component.html',
  styleUrls: ['./agences.component.css']
})
export class AgencesComponent implements OnInit {
  listAgences;
  listAgents;
  public size:number=2;
  public currentPage:number=0;
  public totalPages:number;
  public pages: Array<number>;
  private currentKeyword: string="";

  constructor(private catService:CatalogueService, private router:Router) {
  }

  ngOnInit(): void {
  }
  myimage:string = "assets/image/car-4309348_1920.png";


 onGetAgences() {
   this.catService.getAgences(this.currentPage,this.size)
   .subscribe(data => {
     console.log(data);
     this.totalPages= data["page"].totalPages;
     this.pages=new Array<number>(this.totalPages);
     this.listAgences = data;
   },err => {
     console.log(err);
   });
  }

  onPageAgence(i){
    this.currentPage=i;
    this.chercherAgences();
  }

  onChercher(form: any){
    this.currentPage=0;
    this.currentKeyword=form.keyword;
    this.chercherAgences();
  }

  chercherAgences(){
    this.catService.getAgencesByKeyword(this.currentKeyword,this.currentPage,this.size)
    .subscribe(data=> {
    this.totalPages=data["page"].totalPages;
    this.pages=new Array<number>(this.totalPages);
    this.listAgences = data;
   },err => {
     console.log(err);
   });
  }
  onDeleteAgence(agce){
    let conf=confirm("Etes-vous sure?");
    if(conf){
      this.catService.deleteRessource(agce._links.self.href)
        .subscribe(data=>{
          this.chercherAgences();
        },err=>{
          console.log(err);
        })
    }
  }
  onEditAgence(agce){
    let url=agce._links.self.href;
    this.router.navigateByUrl("/edit-agence/"+btoa(url));
  }
}
