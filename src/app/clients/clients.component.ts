import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogueService } from '../catalogue.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  public currentPage:number=0;
  public size:number=2;
  public totalPages:number;
  public pages: Array<number>;
  private currentKeyword: string="";
  listClients;

  constructor(private catService:CatalogueService, private router:Router) { }

  ngOnInit(): void {
  }

  getClients(){
    this.catService.getClients(this.currentPage,this.size)
      .subscribe(data =>{
        this.totalPages= data["page"].totalPages;
        this.pages=new Array<number>(this.totalPages);
        this.listClients=data;
    },err=>{
      console.log(err);
    })
  }

  onPageClient(i){
    this.currentPage=i;
    this.chercherClient();
  }

  onChercher(form: any){
    this.currentPage=0;
    this.currentKeyword=form.keyword;
    this.chercherClient();
  }

  chercherClient(){
    this.catService.getClientByKeyword(this.currentKeyword,this.currentPage,this.size)
    .subscribe(data=> {
    this.totalPages=data["page"].totalPages;
    this.pages=new Array<number>(this.totalPages);
    this.listClients = data;
   },err => {
     console.log(err);
   });
  }

  onDeleteClient(cli){
    let conf=confirm("Etes-vous sure?");
    if(conf){
      this.catService.deleteRessource(cli._links.self.href)
        .subscribe(data=>{
          this.chercherClient();
        },err=>{
          console.log(err);
        })
    }
  }

  onEditClient(cli){
    let url=cli._links.self.href;
    this.router.navigateByUrl("/edit-client/"+btoa(url));
  }

}
