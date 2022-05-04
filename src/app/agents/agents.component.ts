import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogueService } from '../catalogue.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements OnInit {
  public currentPage:number=0;
  public size:number=2;
  public totalPages:number;
  public pages: Array<number>;
  private currentKeyword: string="";
  listAgents;
  constructor(private catService:CatalogueService, private router:Router) { }

  ngOnInit(): void {
  }

  getAgent(){
    this.catService.getAgents(this.currentPage,this.size)
      .subscribe(data =>{
        this.totalPages= data["page"].totalPages;
        this.pages=new Array<number>(this.totalPages);
        this.listAgents=data;
    },err=>{
      console.log(err);
    })
  }

  onPageAgent(i){
    this.currentPage=i;
    this.chercherAgents();
  }

  onChercher(form: any){
    this.currentPage=0;
    this.currentKeyword=form.keyword;
    this.chercherAgents();
  }

  chercherAgents(){
    this.catService.getAgentByKeyword(this.currentKeyword,this.currentPage,this.size)
    .subscribe(data=> {
    this.totalPages=data["page"].totalPages;
    this.pages=new Array<number>(this.totalPages);
    this.listAgents = data;
   },err => {
     console.log(err);
   });
  }

  onDeleteAgent(agt){
    let conf=confirm("Etes-vous sure?");
    if(conf){
      this.catService.deleteRessource(agt._links.self.href)
        .subscribe(data=>{
          this.chercherAgents();
        },err=>{
          console.log(err);
        })
    }
  }

  onEditAgent(agt){
    let url=agt._links.self.href;
    this.router.navigateByUrl("/edit-agent/"+btoa(url));
  }

}
