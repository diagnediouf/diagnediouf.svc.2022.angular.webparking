import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogueService } from '../catalogue.service';
import { Client } from '../model/client.model';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {

  public currentClient: Client;
  public mode:number=1;

  constructor(private catService:CatalogueService, private router:Router) { }

  ngOnInit(): void {
  }

  onSaveClient(data:any){
    this.catService.saveClient(this.catService.host+"/clients",data)
      .subscribe(res=>{
        //this.router.navigateByUrl("/agent")
        this.currentClient=res;
        this.mode=2;
      },err=>{
        console.log(err);
      })
  }

  onNewClient(){
    this.mode=1;
  }
}
