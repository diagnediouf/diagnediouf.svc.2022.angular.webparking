import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogueService } from '../catalogue.service';
import { Agent } from '../model/agent.modal';

@Component({
  selector: 'app-new-agent',
  templateUrl: './new-agent.component.html',
  styleUrls: ['./new-agent.component.css']
})
export class NewAgentComponent implements OnInit {

  public currentAgent: Agent;
  public mode:number=1;
  listeAgent;

  constructor(private catService:CatalogueService, private router:Router) { }

  ngOnInit(): void {
  }

  onSaveAgent(data:any){
    this.catService.saveAgent(this.catService.host+"/agents",data)
      .subscribe(res=>{
        //this.router.navigateByUrl("/agent")
        this.currentAgent=res;
        this.mode=2;
      },err=>{
        console.log(err);
      })
  }

  onNewAgent(){
    this.mode=1;
  }

}
