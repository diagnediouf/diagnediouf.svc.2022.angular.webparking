import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogueService } from '../catalogue.service';
import { Agent } from '../model/agent.modal';

@Component({
  selector: 'app-edit-agent',
  templateUrl: './edit-agent.component.html',
  styleUrls: ['./edit-agent.component.css']
})
export class EditAgentComponent implements OnInit {
  currentAgent: Agent;
  url: string;

  constructor(private catService:CatalogueService, private router:Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.url=atob(this.activatedRoute.snapshot.params.id)
    this.catService.getAgent(this.url)
      .subscribe(data=>{
        this.currentAgent=data;
      },err=>{
        console.log(err);
      })
  }

  onUpdateAgent(value:any){
    this.catService.updateRessource(this.url,value)
      .subscribe(data=>{
        alert("Mise à jour effectué avec succés")
        this.router.navigateByUrl("/agents");
      },err=>{
        console.log(err);
      })
  }

}
